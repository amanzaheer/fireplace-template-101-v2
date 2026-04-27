"use client";

import React from "react";
import Image from "next/image";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import PrimaryPhone from "@/components/common/PrimaryPhone";
import QuoteButton from "@/components/common/QuoteButton";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Gallery14({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.gallery ?? null;

  if (!block) return null;

  const title = block.title ?? "";
  const html = block.description ? md.render(block.description) : "";
  const files = Array.isArray(block.file_name) ? block.file_name : [];

  if (!title && !html && files.length === 0) return null;

  return (
    <FullContainer
      id="gallery"
      className="w-full bg-gradient-to-t from-[#fffdfb] via-white to-[#f5f2ee] py-10 md:py-14 lg:py-16"
    >
      <Container className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-4 shadow-[0_12px_36px_rgba(0,0,0,0.07)] ring-1 ring-black/5 md:p-6 lg:p-8">
          <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-2 lg:gap-10">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {files.map((fileName, index) => {
                const src = buildImageSrc(IMAGE_BASE, fileName);
                const useUnoptimized =
                  src.startsWith("/api/") ||
                  src.startsWith("http://") ||
                  src.startsWith("https://");
                const label = title
                  ? `${title} - image ${index + 1} of ${files.length}`
                  : `Gallery image ${index + 1} of ${files.length}`;
                return (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-xl bg-neutral-200"
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        title={label}
                        src={src}
                        alt={label}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        loading="lazy"
                        unoptimized={useUnoptimized}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex h-full flex-col justify-center">
              {title ? (
                <h2 className="text-left font-montserrat text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-[2.4rem] lg:leading-tight">
                  {title}
                </h2>
              ) : null}

              {html ? (
                <div
                  className="mt-4 w-full text-left font-barlow prose max-w-none prose-h1:!text-left prose-h2:!text-left prose-h3:!text-left prose-p:!text-left prose-p:!text-[#5c6778] prose-p:!text-[15px] md:prose-p:!text-[18px] prose-p:!leading-relaxed prose-p:!mb-4 [&_p:last-child]:!mb-0"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ) : null}

              {phone ? (
                <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                  <div className="[&_button]:!h-[46px] [&_button]:!min-w-[170px] [&_button]:!rounded-[10px] [&_button]:!bg-[#F59402] [&_button]:hover:!bg-[#df8601] [&_button]:!px-5 [&_button]:!py-2 [&_button]:!text-[16px] [&_button]:!font-semibold [&_button]:!shadow-none">
                    <PrimaryPhone phone={phone} />
                  </div>
                  <QuoteButton phone={phone} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
