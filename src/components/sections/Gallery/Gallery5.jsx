"use client";

import React from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Gallery5({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.gallery ?? null;

  if (!block) return null;

  const title = block.title ?? "";
  const html = block.description ? md.render(block.description) : "";
  const rawFiles = block.file_name;
  const files = Array.isArray(rawFiles)
    ? rawFiles
    : typeof rawFiles === "string" && rawFiles.trim()
      ? [rawFiles.trim()]
      : [];

  if (!title && !html && files.length === 0) return null;

  const ctaClass =
    "gallery5-tel-cta mx-auto inline-flex w-full max-w-[min(100%,280px)] min-h-[48px] items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-base font-semibold shadow-[0_8px_24px_rgba(234,88,12,0.35)] transition-[box-shadow,transform] hover:shadow-[0_10px_28px_rgba(234,88,12,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fb923c] md:text-lg";

  return (
    <FullContainer
      id="gallery"
      className="bg-stone-50 pt-12 pb-12 md:pt-16 md:pb-16"
    >
      {/* Same width + padding as Navbar5 (Container default max-w-[1270px], px-3 md:px-4) */}
      <Container className="mx-auto">
        {title ? (
          <header className="mb-8 text-center md:mb-12">
            <h2 className="mx-auto max-w-4xl px-3 text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl md:text-[2.65rem] md:leading-[1.1]">
              <span className="bg-gradient-to-br' from-gray-900 via-gray-800 to-[#b45309] bg-clip-text text-transparent drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
                {title}
              </span>
            </h2>
            <div
              className="mx-auto mt-5 flex justify-center gap-1.5 md:mt-6"
              aria-hidden
            >
              <span className="h-1 w-10 rounded-full bg-gradient-to-r' from-transparent via-[#D35400] to-[#ea580c]" />
              <span className="h-1 w-3 rounded-full bg-[#fb923c]" />
            </div>
          </header>
        ) : null}

        {html ? (
          <div
            className="prose prose-gray mx-auto mb-10 max-w-3xl text-center text-[15px] leading-[1.75] text-gray-600 prose-p:mb-4 prose-p:last:mb-0 prose-headings:mt-6 prose-headings:mb-3 prose-headings:text-gray-900 prose-headings:font-bold prose-strong:text-gray-900 prose-a:font-medium prose-a:text-[#D35400] prose-a:no-underline hover:prose-a:underline prose-li:marker:text-gray-400 md:mb-12 md:text-[17px]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : null}

        {files.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 lg:gap-10">
            {files.map((fileName, index) => {
              const src = buildImageSrc(IMAGE_BASE, fileName);
              const label = title
                ? `${title} - image ${index + 1} of ${files.length}`
                : `Gallery image ${index + 1} of ${files.length}`;
              return (
                <div
                  key={index}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[4/3]' shrink-0">
                    <Image
                      title={label}
                      src={src}
                      alt={label}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>

                  {phone ? (
                    <div className="mt-auto flex flex-1 flex-col justify-end border-t border-stone-100/90 bg-stone-50/40 p-4 md:p-5">
                      <a
                        href={`tel:${phone}`}
                        className={ctaClass}
                        style={{
                          backgroundColor: "#ea580c",
                          color: "#fff",
                          border: "3px solid #fb923c",
                        }}
                      >
                        <Phone className="h-5 w-5 shrink-0" aria-hidden />
                        <span className="min-w-0 'break-words">{phone}</span>
                      </a>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}
      </Container>
    </FullContainer>
  );
}