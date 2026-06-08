"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ACCENT_RED = "#BF1309";
const NAVY = "#001633";
const CTA_WIDTH = 258;
const CTA_HEIGHT = 73.33;
const CTA_PADDING = { top: 2.72, right: 1.36, bottom: 2.72, left: 1.36 };

const prose =
  "prose max-w-none text-[#333333] prose-headings:font-bold prose-headings:text-[#001633] prose-p:leading-relaxed prose-li:text-[#333333] prose-strong:text-[#001633] prose-a:text-[#BF1309] [&_ul]:list-none [&_ul]:space-y-2 [&_ul]:pl-0 [&_ul>li]:relative [&_ul>li]:pl-7 [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-[0.55em] [&_ul>li]:before:h-1.5 [&_ul>li]:before:w-1.5 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-[#BF1309] [&_ul>li]:before:content-['']";

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
    const rawPath =
      entry.file_name ?? entry.path ?? entry.src ?? entry.url ?? "";
    const path = typeof rawPath === "string" ? rawPath.trim() : "";
    const alt = typeof entry.alt === "string" ? entry.alt.trim() : "";
    return path ? { path, alt } : null;
  }

  return null;
}

function resolveGalleryFiles(block) {
  const fromFileName = block?.file_name;
  const fromImages = block?.images ?? block?.value?.images;
  const fromList = block?.list ?? block?.value?.list;
  const source = fromFileName ?? fromImages ?? fromList;

  if (Array.isArray(source)) {
    return source.map(normalizeGalleryEntry).filter(Boolean);
  }

  if (typeof source === "string") {
    return source
      .split(/[\n,]/)
      .map((item) => normalizeGalleryEntry(item))
      .filter(Boolean);
  }

  return [];
}

function GalleryImageCard({ src, alt, label }) {
  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute bottom-3 left-0 top-0 z-0 w-5 md:w-6"
        style={{ backgroundColor: ACCENT_RED }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-0 h-5 w-full md:h-6"
        style={{ backgroundColor: ACCENT_RED }}
        aria-hidden
      />
      <div className="relative z-10 mb-4 ml-4 aspect-4/3 overflow-hidden bg-neutral-200 md:mb-5 md:ml-5">
        <Image
          title={label}
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default function Gallery27({ content }) {
  const phoneRaw = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const phone = typeof phoneRaw === "string" ? phoneRaw.trim() : "";
  const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#";
  const block = content?.gallery ?? null;

  if (!block) return null;

  const title = typeof block.title === "string" ? block.title.trim() : "";
  const eyebrow = block.label ?? block.eyebrow ?? block.sub_title ?? "";
  const html = block.description ? md.render(block.description) : "";
  const files = resolveGalleryFiles(block);
  const ctaLabel = block.cta_label ?? "GET A QUOTE";
  const callNowLabel =
    block.call_now_label ??
    content?.service_benefits?.call_now_label ??
    "CALL NOW:";

  if (!title && !html && files.length === 0) return null;

  const scrollToQuoteForm = useCallback(() => {
    const el =
      document.getElementById("quote-form-section") ??
      document.getElementById("contact-us") ??
      document.querySelector(
        '.quote-form, [id*="quote"], [class*="quote-form"]',
      );
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <FullContainer
      id="gallery"
      className={`bg-[#ececec] py-10 md:py-14 lg:py-16 ${poppins.className}`}
    >
      <Container className="px-4 sm:px-6">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_18px_40px_-16px_rgba(0,22,51,0.18)]">
          <div
            className="h-1.5 w-full"
            style={{
              background: `linear-gradient(90deg, ${NAVY} 0%, ${ACCENT_RED} 100%)`,
            }}
            aria-hidden
          />

          <div className="p-6 sm:p-8 lg:p-10 xl:p-12">
            {eyebrow ? (
              <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#BF1309] md:text-sm">
                {eyebrow}
              </p>
            ) : null}

            {title ? (
              <h2
                className={`text-center text-[28px] font-bold leading-tight text-[#001633] sm:text-[34px] md:text-[38px] ${
                  eyebrow ? "mt-2" : ""
                }`}
              >
                {title}
              </h2>
            ) : null}

            {title ? (
              <div
                className="mx-auto mt-4 h-1 w-14 rounded-full"
                style={{ backgroundColor: ACCENT_RED }}
                aria-hidden
              />
            ) : null}

            {html ? (
              <div
                className={`${prose} mx-auto mt-6 max-w-3xl text-center text-sm md:text-[15px] prose-p:text-center prose-li:text-center`}
                dangerouslySetInnerHTML={{ __html: html }}              />
            ) : null}
            {files.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                {files.map((item, index) => {
                  const src = buildImageSrc(IMAGE_BASE, item.path);
                  const label = title
                    ? `${title} - image ${index + 1} of ${files.length}`
                    : `Gallery image ${index + 1} of ${files.length}`;
                  return (
                    <GalleryImageCard
                      key={`${item.path}-${index}`}
                      src={src}
                      alt={item.alt || label}
                      label={label}
                    />
                  );
                })}
              </div>
            ) : null}

            <div className="mt-8 flex flex-col items-center justify-center gap-4 border-t border-black/8 pt-6 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={scrollToQuoteForm}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-sm bg-[#001633] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </button>
              {phone ? (
                <a
                  href={phoneHref}
                  className="inline-flex shrink-0 flex-col items-center justify-center text-center text-white transition-opacity hover:opacity-95"
                  style={{
                    backgroundColor: ACCENT_RED,
                    width: CTA_WIDTH,
                    height: CTA_HEIGHT,
                    paddingTop: CTA_PADDING.top,
                    paddingRight: CTA_PADDING.right,
                    paddingBottom: CTA_PADDING.bottom,
                    paddingLeft: CTA_PADDING.left,
                  }}
                >
                  <span className="text-[11px] font-semibold uppercase leading-none tracking-wide">
                    {callNowLabel}
                  </span>
                  <span className="mt-0.5 text-[22px] font-bold leading-none">
                    {phone}
                  </span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
