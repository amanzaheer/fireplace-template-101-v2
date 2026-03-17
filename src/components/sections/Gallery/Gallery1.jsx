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

export default function Gallery1({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.gallery ?? null;

  if (!block) return null;

  const title = block.title ?? "";
  const html = block.description ? md.render(block.description) : "";
  const files = Array.isArray(block.file_name) ? block.file_name : [];

  if (!title && !html && files.length === 0) return null;

  return (
    <FullContainer id="gallery" className="pt-10 md:pt-16 pb-10 md:pb-16">
      <Container className="!px-4 md:!px-8">
        {title ? (
          <h2 className="text-2xl md:text-[32px] font-bold text-[#01306e] text-center mb-4">
            {title}
          </h2>
        ) : null}

        {html ? (
          <div
            className="w-full text-center prose prose-h1:!text-center prose-h2:!text-center prose-h3:!text-center prose-p:!text-center max-w-none text-primary prose-h1:!text-4xl md:prose-h1:!text-5xl prose-h1:!font-bold prose-h1:!text-blue-900 prose-p:!text-lg prose-p:!leading-relaxed prose-p:!mb-8"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : null}

        {files.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8">
            {files.map((fileName, index) => {
              const src = buildImageSrc(IMAGE_BASE, fileName);
              const label = title
                ? `${title} - image ${index + 1} of ${files.length}`
                : `Gallery image ${index + 1} of ${files.length}`;
              return (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-lg"
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      title={label}
                      src={src}
                      alt={label}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4">
                    {phone ? (
                      <div className="flex justify-center">
                        <PrimaryPhone phone={phone} />
                      </div>
                    ) : null}
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
