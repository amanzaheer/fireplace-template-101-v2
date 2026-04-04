"use client";

import React from "react";
import Image from "next/image";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import PrimaryPhone from "@/components/common/PrimaryPhone";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Gallery6({ content }) {
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
      className="font-barlow bg-white py-10 md:py-16"
    >
      <Container className="px-5 sm:px-6 md:px-8 lg:px-10">
        {title ? (
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold text-black tracking-tight leading-tight">
              {title}
            </h2>
          </div>
        ) : null}

        {html ? (
          <div
            className="w-full max-w-4xl mx-auto mb-8 md:mb-12 text-center prose prose-headings:text-center prose-p:text-center prose-li:text-center prose-headings:text-black prose-headings:font-bold prose-h1:text-2xl md:prose-h1:text-3xl prose-h2:text-xl md:prose-h2:text-2xl prose-h3:text-lg md:prose-h3:text-xl prose-p:text-gray-600 prose-p:text-base md:prose-p:text-lg prose-p:leading-relaxed prose-strong:text-gray-900 prose-a:text-[#002B5B] prose-a:font-semibold"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : null}

        {files.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {files.map((fileName, index) => {
              const src = buildImageSrc(IMAGE_BASE, fileName);
              const label = title
                ? `${title} - image ${index + 1} of ${files.length}`
                : `Gallery image ${index + 1} of ${files.length}`;
              return (
                <div key={index} className="flex flex-col">
                  <div className="group relative w-full aspect-4/3 overflow-hidden rounded-xl bg-gray-100 shadow-md">
                    <Image
                      title={label}
                      src={src}
                      alt={label}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="pt-4 md:pt-5 flex justify-center">
                    {phone ? <PrimaryPhone phone={phone} /> : null}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </Container>
    </FullContainer>
  );
}
