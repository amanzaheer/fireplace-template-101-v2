"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Phone, TextQuote } from "lucide-react";

const galleryHeadingFont = Poppins({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const galleryBodyFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
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

export default function Gallery20({ content }) {
  const phoneRaw = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const phone = typeof phoneRaw === "string" ? phoneRaw.trim() : "";
  const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#";
  const block = content?.gallery ?? null;

  if (!block) return null;

  const title = typeof block.title === "string" ? block.title.trim() : "";
  const html = block.description ? md.render(block.description) : "";
  const files = resolveGalleryFiles(block);

  if (!title && !html && files.length === 0) return null;

  const handleQuoteClick = () => {
    const el =
      document.getElementById("quote-form-section") ??
      document.querySelector('.quote-form, [id*="quote"], [class*="quote-form"]');
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <FullContainer id="gallery" className="bg-[#f8fafc] py-10 md:py-14">
      <Container className="px-4 md:px-8">
        <div className="mx-auto max-w-[1180px] rounded-[24px] border border-[#e8ecf3] bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] md:p-8">
        {title ? (
          <h2
            className={cn(
              galleryHeadingFont.className,
              "mb-4 text-center text-[42px] font-bold leading-[45px] tracking-[0] text-[#1a1a1a]",
            )}
          >
            {title}
          </h2>
        ) : null}

        {html ? (
          <div
            className={cn(
              galleryBodyFont.className,
              "prose mx-auto max-w-[900px] w-full text-center text-[16px] font-normal leading-[1.65] text-[#475569]",
              "prose-headings:text-center prose-p:text-center prose-li:text-center",
              "**:text-[#475569]!",
              "[&_p]:text-[16px]! [&_p]:leading-[1.65]! [&_p]:mb-4!",
              "[&_li]:text-[16px]! [&_li]:leading-[1.65]!",
              "[&_h1]:text-[18px]! [&_h2]:text-[18px]! [&_h3]:text-[16px]!",
              "[&_h1]:font-bold! [&_h2]:font-bold! [&_h3]:font-semibold!",
              "[&_a]:text-[#0f172a]! [&_strong]:font-semibold! [&_strong]:text-[#0f172a]!",
            )}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : null}

        {files.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {files.map((item, index) => {
              const src = buildImageSrc(IMAGE_BASE, item.path);
              const label = title
                ? `${title} - image ${index + 1} of ${files.length}`
                : `Gallery image ${index + 1} of ${files.length}`;
              return (
                <div
                  key={`${item.path}-${index}`}
                  className="group overflow-hidden rounded-[16px] border border-[#e5e7eb] bg-white shadow-[0_6px_20px_rgba(15,23,42,0.08)]"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      title={label}
                      src={src}
                      alt={item.alt || label}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {phone ? (
            <Link
              href={phoneHref}
              className="inline-flex h-[48px] min-w-[180px] items-center justify-center gap-2 rounded-xl border-0 bg-[#3A5FB6] px-6 py-2.5 text-[15px] font-semibold text-white shadow-md shadow-[#3A5FB6]/30 transition hover:bg-[#2d4d9e]"
            >
              <Phone className="h-5 w-5" />
              {phone}
            </Link>
          ) : null}
          <button
            type="button"
            onClick={handleQuoteClick}
            className="inline-flex h-[48px] min-w-[170px] items-center justify-center gap-2 rounded-xl border-0 bg-[#BF1309] px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white shadow-md shadow-[#BF1309]/25 transition hover:bg-[#a61008]"
          >
            <TextQuote className="h-5 w-5" />
            Get a Quote
          </button>
        </div>
        </div>
      </Container>
    </FullContainer>
  );
}
