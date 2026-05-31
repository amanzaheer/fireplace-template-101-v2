"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function scrollToQuote() {
  const offset = 80;
  const scrollToEl = (el) => {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth",
    });
  };

  const targets = [
    document.getElementById("quote-form-section"),
    document.getElementById("contact-us"),
    document.getElementById("banner-quote-form"),
  ].filter((el) => el instanceof HTMLElement);

  const anchorY = window.scrollY + offset + 40;
  const below = targets.find((el) => {
    const top = el.getBoundingClientRect().top + window.scrollY;
    return top >= anchorY - 20;
  });

  if (below) {
    scrollToEl(below);
    return;
  }

  if (targets.length > 0) {
    scrollToEl(targets[targets.length - 1]);
    return;
  }

  const fallback = document.querySelector('[class*="quote-form"]');
  if (fallback instanceof HTMLElement) {
    scrollToEl(fallback);
  }
}

function normalizeGalleryEntry(entry) {
  if (typeof entry === "string") {
    const path = entry.trim();
    return path ? { path, alt: "" } : null;
  }
  if (entry && typeof entry === "object") {
    const raw = entry.file_name ?? entry.path ?? entry.src ?? entry.url ?? "";
    const path = typeof raw === "string" ? raw.trim() : "";
    const alt = typeof entry.alt === "string" ? entry.alt.trim() : "";
    return path ? { path, alt } : null;
  }
  return null;
}

export default function Gallery23({ content }) {
  const phoneRaw = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const phone = typeof phoneRaw === "string" ? phoneRaw.trim() : "";
  const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#";

  const block = content?.gallery ?? null;
  if (!block) return null;

  const title = typeof block.title === "string" ? block.title : String(block.title ?? "");
  const titleTrim = title.trim();
  const ctaLabel =
    typeof block.cta_label === "string" && block.cta_label.trim()
      ? block.cta_label.trim()
      : "GET A QUOTE";
  const html = block.description ? md.render(block.description) : "";

  const rawFiles = Array.isArray(block.file_name) ? block.file_name : [];
  const files = rawFiles.map(normalizeGalleryEntry).filter(Boolean);

  if (!titleTrim && !html && files.length === 0) return null;

  const firstImageSrc = files[0] ? buildImageSrc(IMAGE_BASE, files[0].path) : "";
  const secondImageSrc = files[1] ? buildImageSrc(IMAGE_BASE, files[1].path) : "";

  return (
    <FullContainer
      id="gallery"
      className={cn(poppins.className, "bg-[#0483B2] py-14 md:py-20 text-white")}
    >
      <Container className="relative z-10 mx-auto">
        {/* Same 12-col grid as About23 — aligns with navbar logo / site edges */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-5 lg:col-span-7">
            {titleTrim ? (
              <h2 className="text-[32px] font-bold leading-[1.15] tracking-tight sm:text-[40px] md:text-[46px]">
                {titleTrim}
              </h2>
            ) : null}

            {html ? (
              <div
                className="max-w-[620px] text-[15px] leading-relaxed text-white/90 md:text-base prose-p:my-2 prose-p:text-white/90"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : null}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={scrollToQuote}
                className={`
    inline-flex
    h-[48px]
    items-center
    justify-center
    rounded-full
    bg-[#D32F2F]
    px-6
    text-center
    text-[16px]
    font-medium
    leading-normal
    text-white
    transition-colors
    hover:bg-[#b71c1c]
    ${poppins.className}
  `}
              >
                {ctaLabel}
              </button>

              {phone ? (
                <Link
                  href={phoneHref}
                  className="inline-flex h-[48px] items-center gap-2.5 rounded-full bg-[#D32F2F]  px-4 transition-colors"
                >
                  <svg width="35" height="35" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M33.0357 19.9253C32.5397 19.4293 32.2917 18.8153 32.2917 18.0833C32.2917 17.3514 32.5397 16.7383 33.0357 16.244C33.5317 15.7497 34.1448 15.5017 34.875 15.5C35.6052 15.4983 36.2192 15.7463 36.7169 16.244C37.2146 16.7417 37.4618 17.3548 37.4583 18.0833C37.4549 18.8118 37.2069 19.4258 36.7143 19.9253C36.2218 20.4247 35.6087 20.6718 34.875 20.6667C34.1413 20.6615 33.5282 20.4135 33.0357 19.9227M28.4167 14.3375L25.7042 11.625C26.9528 10.3764 28.3633 9.41883 29.9357 8.75233C31.5081 8.08583 33.1545 7.75172 34.875 7.75C36.5955 7.74828 38.2428 8.08239 39.8169 8.75233C41.391 9.42228 42.8007 10.3798 44.0458 11.625L41.3333 14.3375C40.4722 13.4764 39.4931 12.809 38.3961 12.3354C37.299 11.8618 36.1253 11.625 34.875 11.625C33.6247 11.625 32.4518 11.8618 31.3565 12.3354C30.2612 12.809 29.2812 13.4764 28.4167 14.3375ZM43.7875 46.5C38.4056 46.5 33.0882 45.3272 27.8354 42.9815C22.5826 40.6358 17.8035 37.3094 13.4979 33.0021C9.19236 28.6948 5.86675 23.9156 3.52108 18.6646C1.17542 13.4135 0.00172222 8.09617 0 2.7125C0 1.9375 0.258333 1.29167 0.775 0.775C1.29167 0.258333 1.9375 0 2.7125 0H13.175C13.7778 0 14.316 0.204944 14.7896 0.614833C15.2632 1.02472 15.5431 1.50867 15.6292 2.06667L17.3083 11.1083C17.3944 11.7972 17.3729 12.3785 17.2437 12.8521C17.1146 13.3257 16.8778 13.7347 16.5333 14.0792L10.2687 20.4083C11.1299 22.0014 12.152 23.5402 13.3352 25.0247C14.5183 26.5093 15.8212 27.9413 17.2437 29.3208C18.5785 30.6556 19.9778 31.8938 21.4417 33.0357C22.9056 34.1775 24.4556 35.2212 26.0917 36.1667L32.1625 30.0958C32.55 29.7083 33.0563 29.4181 33.6815 29.2252C34.3067 29.0324 34.9198 28.9781 35.5208 29.0625L44.4333 30.8708C45.0361 31.0431 45.5312 31.3556 45.9187 31.8086C46.3062 32.2615 46.5 32.767 46.5 33.325V43.7875C46.5 44.5625 46.2417 45.2083 45.725 45.725C45.2083 46.2417 44.5625 46.5 43.7875 46.5Z" fill="white" />
                  </svg>
                  <span className="flex flex-col text-left leading-none">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                      Call Now:
                    </span>
                    <span className="mt-1 text-[18px] font-extrabold tracking-tight  text-white sm:text-[20px]">
                      {phone}
                    </span>
                  </span>
                </Link>
              ) : null}
            </div>
          </div>
          {(firstImageSrc || secondImageSrc) && (
            <div className="flex justify-center lg:col-span-5 lg:justify-end">
              <div className="relative w-full max-w-[520px] min-h-[320px] sm:min-h-[360px] lg:max-w-none lg:min-h-[400px]">
                <div className="relative ml-auto aspect-4/3 w-[88%] overflow-hidden rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                  {firstImageSrc ? (
                    <Image
                      src={firstImageSrc}
                      alt={files[0]?.alt || titleTrim || "Gallery"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 90vw, 42vw"
                    />
                  ) : null}
                </div>

                {secondImageSrc ? (
                  <div className="absolute bottom-0 right-0 aspect-4/3 w-[58%] overflow-hidden rounded-[20px] shadow-[0_24px_60px_rgba(0,0,0,0.35)] ring-2 ring-[#0483B2]">
                    <Image
                      src={secondImageSrc}
                      alt={files[1]?.alt || titleTrim || "Gallery"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 55vw, 28vw"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </Container>
    </FullContainer>
  );
}
