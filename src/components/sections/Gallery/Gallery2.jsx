"use client";

import React from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import {Poppins, Inter, Rubik } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const rubik = Rubik({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const proseV2 =
  "prose max-w-none prose-headings:font-extrabold prose-headings:text-ink prose-p:text-[#4b5563] prose-li:text-[#4b5563] prose-strong:text-ink prose-a:text-[#d62828]";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Gallery2({ content }) {
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
            <h2 className={`${poppins.className} text-3xl md:text-5xl font-extrabold tracking-tight text-ink text-center mb-4 md:mb-6`}>
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
                    className={`${inter.className} flex flex-col items-center gap-4 md:gap-5`}
                  >
                    <div className="w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm border border-[#e5e7eb]">
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
                        className={`${rubik.className} inline-flex items-center justify-center gap-2 rounded-full bg-[#d62828] text-white font-semibold text-base md:text-lg px-8 py-3 min-w-[220px] shadow-md hover:bg-[#bf1f1f] transition-colors duration-200`}
                      >
                        <Image src="/st-icons/Temp2/call1.png" alt="Phone" width={16} height={16} className="w-auto h-4 md:h-[21px]" />
                        <span className={`${rubik.className} text-white font-normal md:text-lg`}>{phone}</span>
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
