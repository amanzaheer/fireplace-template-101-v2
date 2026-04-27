"use client";

import React from "react";
import Image from "next/image";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Poppins, Inter, Rubik } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function PhoneCallIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        fill="currentColor"
        d="M1 2h8.58l1.487 6.69l-1.86 1.86a14.1 14.1 0 0 0 4.243 4.242l1.86-1.859L22 14.42V23h-1a19.9 19.9 0 0 1-10.85-3.196a20.1 20.1 0 0 1-5.954-5.954A19.9 19.9 0 0 1 1 3z"
      />
    </svg>
  );
}

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Gallery4({ content }) {
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
            <h2 className={`${poppins.className} text-3xl md:text-5xl font-extrabold tracking-tight text-[#212020] text-center mb-4 md:mb-6`}>
              {title}
            </h2>
          ) : null}

          {html ? (
            <div
              className={`${inter.className} w-full text-center max-w-4xl mx-auto mb-8 md:mb-12 text-[#6e6e6e] prose-headings:text-center prose-p:text-center prose-p:text-base md:prose-p:text-lg prose-p:leading-relaxed prose-p:text-[#6e6e6e]`}
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
                    <div className="w-full overflow-hidden  bg-gray-100 shadow-sm border border-[#e5e7eb]">
                      <div className="aspect-4/3 relative">
                        <Image
                          title={label}
                          src={src}
                          alt={label}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-300 hover:scale-[1.01]"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    {phone ? (
                      <a
                        href={`tel:${phone}`}
                        className={`${rubik.className} inline-flex items-center justify-center gap-2 bg-[#f59402] text-white font-semibold text-base md:text-lg px-8 py-3 min-w-[220px] shadow-md hover:bg-[#2a2a2a] transition-colors duration-200`}
                      >
                        <PhoneCallIcon className="w-5 h-5 shrink-0" />
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
