"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

const ACCENT = "#D35400";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function aspectClass(index) {
  const m = index % 4;
  if (m === 0) return "aspect-3/4";
  if (m === 1) return "aspect-square";
  if (m === 2) return "aspect-4/5";
  return "aspect-5/4";
}

export default function Gallery6({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const telHref = phone ? `tel:${String(phone).replace(/\s/g, "")}` : "";
  const block = content?.gallery ?? null;

  if (!block) return null;

  const title = block.title ?? "";
  const html = block.description ? md.render(block.description) : "";
  const files = Array.isArray(block.file_name) ? block.file_name : [];

  if (!title && !html && files.length === 0) return null;

  return (
    <FullContainer
      id="gallery"
      className="font-barlow bg-linear-to-b from-stone-200/40 via-stone-50 to-white py-12 md:py-20 lg:py-24"
    >
      <Container className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8 lg:px-10">
        {/* Header */}
        {(title || html) && (
          <div className="mb-10 grid gap-8 lg:mb-14 lg:grid-cols-12 lg:gap-10">
            {title ? (
              <div className="lg:col-span-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-stone-500">
                  Gallery
                </p>
                <h2 className="text-balance text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.02]">
                  <span style={{ color: ACCENT }}>{title}</span>
                </h2>
                <div
                  className="mt-5 h-1.5 w-16 rounded-full"
                  style={{ backgroundColor: ACCENT }}
                  aria-hidden
                />
              </div>
            ) : null}

            {html ? (
              <div
                className={
                  title
                    ? "flex items-start lg:col-span-7 lg:border-l lg:border-stone-200 lg:pl-10"
                    : "lg:col-span-12"
                }
              >
                <div
                  className={
                    title
                      ? "w-full max-w-2xl text-left prose prose-gray prose-accent-d354 prose-sm sm:prose-base prose-p:leading-relaxed lg:max-w-none"
                      : "prose prose-gray prose-accent-d354-center prose-sm sm:prose-base prose-p:leading-relaxed mx-auto max-w-3xl text-center"
                  }
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>
            ) : null}
          </div>
        )}

        {/* Images — masonry columns */}
        {files.length > 0 ? (
          <>
            <div className="columns-2 gap-3 sm:gap-4 md:columns-3 md:gap-5 lg:gap-6">
              {files.map((fileName, index) => {
                const src = buildImageSrc(IMAGE_BASE, fileName);
                const label = title
                  ? `${title} — image ${index + 1} of ${files.length}`
                  : `Gallery image ${index + 1} of ${files.length}`;
                return (
                  <div
                    key={index}
                    className="mb-3 break-inside-avoid sm:mb-4 md:mb-5"
                  >
                    <div
                      className={`group relative w-full overflow-hidden rounded-2xl bg-stone-300 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.35)] ring-1 ring-black/5 transition-shadow duration-500 hover:shadow-[0_28px_64px_-24px_rgba(0,0,0,0.4)] ${aspectClass(index)}`}
                    >
                      <Image
                        title={label}
                        src={src}
                        alt={label}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 380px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        aria-hidden
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {phone ? (
              <div className="mt-12 flex flex-col items-center border-t border-stone-200/80 pt-10 md:mt-16 md:pt-14">
                <p className="mb-4 text-center text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
                  Ready to get started?
                </p>
                <Link
                  href={telHref}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-base font-bold text-white shadow-lg transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    backgroundColor: ACCENT,
                    outlineColor: ACCENT,
                  }}
                >
                  <Phone className="h-5 w-5 shrink-0" strokeWidth={2.25} aria-hidden />
                  {phone}
                </Link>
              </div>
            ) : null}
          </>
        ) : null}

        {/* CTA when there are no images but we have copy */}
        {files.length === 0 && phone ? (
          <div className="flex flex-col items-center pt-4">
            <Link
              href={telHref}
              className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-base font-bold text-white shadow-lg transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                backgroundColor: ACCENT,
                outlineColor: ACCENT,
              }}
            >
              <Phone className="h-5 w-5 shrink-0" strokeWidth={2.25} aria-hidden />
              {phone}
            </Link>
          </div>
        ) : null}
      </Container>
    </FullContainer>
  );
}
