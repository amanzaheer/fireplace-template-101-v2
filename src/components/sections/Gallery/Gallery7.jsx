"use client";

import React from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

const proseV2 =
  "prose max-w-none prose-headings:font-extrabold prose-headings:text-ink prose-p:text-[#4b5563] prose-li:text-[#4b5563] prose-strong:text-ink prose-a:text-[#d62828]";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Gallery7({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.gallery ?? null;

  if (!block) return null;

  const title = block.title ?? "";
  const html = block.description ? md.render(block.description) : "";
  const files = Array.isArray(block.file_name) ? block.file_name : [];

  if (!title && !html && files.length === 0) return null;

  return (
    <FullContainer id="gallery" className="py-10 md:py-14 bg-white">
      <Container>
        <div className="max-w-6xl mx-auto">
          {title ? (
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-ink text-center mb-4 md:mb-6">
              {title}
            </h2>
          ) : null}

          {html ? (
            <div
              className={`w-full text-center max-w-4xl mx-auto mb-8 md:mb-12 text-[#212020] prose-headings:text-center prose-p:text-center prose-p:text-base md:prose-p:text-lg prose-p:leading-relaxed`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : null}

          {files.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {files.map((fileName, index) => {
                const src = buildImageSrc(IMAGE_BASE, fileName);
                const label = title
                  ? `${title} - image ${index + 1} of ${files.length}`
                  : `Gallery image ${index + 1} of ${files.length}`;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-4 md:gap-5"
                  >
                    <div className="relative z-10 w-full overflow-hidden bg-gray-100 rounded-br-[48px] md:rounded-br-[80px] lg:rounded-br-[123px] border-l-11 border-b-11 border-solid border-[#3a8ffb] shadow-lg ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-xl">
                      <div className="aspect-4/3 relative">
                        <Image
                          title={label}
                          src={src}
                          alt={label}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    {phone ? (
                      <a
                        href={`tel:${phone}`}
                        className="inline-flex items-center justify-center gap-2  bg-[#054390] rounded  text-white font-semibold text-base md:text-lg px-8 py-3 min-w-[220px] shadow-md hover:bg-[#2a2a2a] transition-colors duration-200"
                      >
                        <Phone className="w-5 h-5 shrink-0" aria-hidden />
                        <span>{phone}</span>
                      </a>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </Container>
    </FullContainer>
  );
}
