"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import md from "@/lib/markdown";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
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
function galleryAlt(item, index, titleTrim, total) {
  return (
    item.alt ||
    (titleTrim
      ? `${titleTrim} — ${index + 1} of ${total}`
      : `Gallery image ${index + 1} of ${total}`)
  );
}
const galleryImageCardClass =
  "relative aspect-[4/3] w-full overflow-hidden rounded-[28px] bg-black shadow-[0_20px_50px_rgba(0,0,0,0.12)] md:aspect-[5/4]";

const galleryImageCardFillClass =
  "relative h-full min-h-[160px] w-full overflow-hidden rounded-[28px] bg-black shadow-[0_20px_50px_rgba(0,0,0,0.12)]";

function GalleryImageCard({ src, alt, label, fill = false }) {
  if (!src) return null;
  return (
    <div className={cn("relative w-full", fill && "min-h-0 flex-1")}>
      {label ? (
        <span className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
          {label}
        </span>
      ) : null}
      <div className={fill ? galleryImageCardFillClass : galleryImageCardClass}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          loading="lazy"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-[#F59402]/10"
          aria-hidden
        />
      </div>
    </div>
  );
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

export default function Gallery26({ content }) {
  const phoneRaw = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const phone = typeof phoneRaw === "string" ? phoneRaw.trim() : "";
  const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#";

  const block = content?.gallery ?? null;
  if (!block) return null;

  const title =
    typeof block.title === "string" ? block.title : String(block.title ?? "");
  const titleTrim = title.trim();
  const label =
    typeof block.label === "string"
      ? block.label.trim()
      : String(block.label ?? "").trim();
  const ctaLabel =
    typeof block.cta_label === "string" ? block.cta_label.trim() : "";
  const html = block.description ? md.render(block.description) : "";

  const rawFiles = Array.isArray(block.file_name) ? block.file_name : [];
  const files = rawFiles.map(normalizeGalleryEntry).filter(Boolean);

  if (!titleTrim && !html && files.length === 0) return null;

  const beforeItem = files[0];
  const afterItem = files[1];
  const rest = files.slice(2);
  const beforeSrc = beforeItem ? buildImageSrc(IMAGE_BASE, beforeItem.path) : "";
  const afterSrc = afterItem ? buildImageSrc(IMAGE_BASE, afterItem.path) : "";

  const ba = content?.before_after ?? {};
  const beforeLabel =
    (typeof block.before_label === "string" && block.before_label.trim()) ||
    (typeof ba.before_label === "string" && ba.before_label.trim()) ||
    "";
  const afterLabel =
    (typeof block.after_label === "string" && block.after_label.trim()) ||
    (typeof ba.after_label === "string" && ba.after_label.trim()) ||
    "";

  return (
    <FullContainer
      id="gallery"
      className={cn(poppins.className, "bg-[#ffffff] py-12 md:py-16 lg:py-20")}
    >
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center lg:col-span-6 xl:col-span-7">
            {label ? (
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-black">
                {label}
              </p>
            ) : null}

            {titleTrim ? (
              <h2 className="mb-6 text-[30px] font-extrabold leading-[1.12] tracking-tight text-black sm:text-[36px] lg:text-[42px]">
                {titleTrim}
              </h2>
            ) : null}

            {html ? (
              <div
                className={cn(
                  "prose prose-neutral max-w-none text-[15px] leading-relaxed text-black sm:text-base",
                  "prose-p:my-3 prose-p:!text-black prose-headings:!text-black prose-strong:!text-black prose-li:!text-black prose-a:!text-black",
                  titleTrim ? "" : "mt-0",
                )}
                style={{ "--prose-primary": "#000000", color: "#000000" }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : null}

            {ctaLabel || phone ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                {ctaLabel ? (
                  <button
                    type="button"
                    onClick={scrollToQuote}
                    className="inline-flex min-h-[48px] w-full max-w-[320px] items-center justify-center gap-2 rounded-2xl bg-[#CC3333] px-6 py-3 text-base font-extrabold uppercase tracking-wide text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-[#D32F2F] sm:min-h-[52px] sm:w-auto sm:max-w-none sm:px-8 sm:text-lg"
                  >
                    {ctaLabel}
                    <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
                  </button>
                ) : null}

                {phone ? (
                  <Link
                    href={phoneHref}
                    className="inline-flex min-h-[48px] w-full max-w-[320px] items-center justify-center gap-2.5 rounded-2xl bg-[#D32F2F] px-6 py-3 text-base font-extrabold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-[#b71c1c] sm:min-h-[52px] sm:w-auto sm:max-w-none sm:px-8 sm:text-lg"
                  >
                    <Phone className="h-5 w-5 shrink-0" strokeWidth={2.25} aria-hidden />
                    <span>{phone}</span>
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>

          {beforeSrc || afterSrc ? (
            <div className="flex h-full min-h-0 flex-col lg:col-span-6 xl:col-span-5">
              <div className="mx-auto flex h-full min-h-[280px] w-full max-w-[440px] flex-col gap-4 sm:min-h-[360px] lg:ml-auto lg:mr-0 lg:max-w-[400px] lg:min-h-0">
                {beforeSrc ? (
                  <GalleryImageCard
                    fill
                    src={beforeSrc}
                    alt={galleryAlt(beforeItem, 0, titleTrim, files.length)}
                    label={afterSrc ? beforeLabel : null}
                  />
                ) : null}
                {afterSrc ? (
                  <GalleryImageCard
                    fill
                    src={afterSrc}
                    alt={galleryAlt(afterItem, 1, titleTrim, files.length)}
                    label={beforeSrc ? afterLabel : null}
                  />
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        {rest.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
            {rest.map((item, i) => {
              const idx = i + 2;
              const src = buildImageSrc(IMAGE_BASE, item.path);
              if (!src) return null;
              return (
                <GalleryImageCard
                  key={`${item.path}-${idx}`}
                  src={src}
                  alt={galleryAlt(item, idx, titleTrim, files.length)}
                />
              );
            })}
          </div>
        ) : null}
      </Container>
    </FullContainer>
  );
}
