"use client";

import React from "react";
import Image from "next/image";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import PrimaryPhone from "@/components/common/PrimaryPhone";
import { IMAGE_BASE } from "@/lib/constants";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserratGalleryTitle = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const montserratGalleryBody = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const galleryPhoneButtonWrap =
"[&_button]:!min-h-[48px] [&_button]:!rounded [&_button]:!border-0 [&_button]:!bg-[#e55b20] [&_button]:!px-7 [&_button]:!py-3 [&_button]:!text-sm [&_button]:!font-bold [&_button]:!uppercase [&_button]:!tracking-[0.14em] [&_button]:!text-white [&_button]:!shadow-[0_10px_25px_rgba(0,0,0,0.2)] [&_button]:hover:!bg-[#b71f1f] [&_button]:!transition-all [&_svg]:!text-white";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Gallery22({ content }) {
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
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,5,4,0.08),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(0,0,0,0.08),_transparent_40%)] py-12 md:py-20"
    >
      <Container className="!px-4 md:!px-8">
        {title ? (
          <h2
            className={cn(
              montserratGalleryTitle.className,
              "mx-auto mb-5 max-w-4xl text-center text-[34px] font-bold uppercase tracking-[0.06em] leading-[1.2] text-[#101010] md:text-[46px]",
            )}
          >
            {title}
          </h2>
        ) : null}

        {html ? (
          <div
            className={cn(
              montserratGalleryBody.className,
              "prose mx-auto mb-4 max-w-3xl w-full text-center text-[16px] leading-[1.75] text-[#1e1e1e]",
              "prose-headings:text-center prose-p:text-center prose-li:text-center",
              "[&_*]:!text-[#1e1e1e]",
              "[&_p]:!text-[16px] [&_p]:!leading-[1.75] [&_p]:!mb-7",
              "[&_li]:!text-[16px] [&_li]:!leading-[1.75]",
              "[&_h1]:!text-[16px] [&_h2]:!text-[16px] [&_h3]:!text-[16px]",
              "[&_h1]:!font-bold [&_h2]:!font-bold [&_h3]:!font-semibold",
              "[&_a]:!text-[#111111] [&_strong]:!font-semibold [&_strong]:!text-[#111111]",
            )}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : null}

        {files.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {files.map((fileName, index) => {
              const src = buildImageSrc(IMAGE_BASE, fileName);
              const label = title
                ? `${title} - image ${index + 1} of ${files.length}`
                : `Gallery image ${index + 1} of ${files.length}`;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-[24px]  bg-white/90 p-3 shadow-[0_14px_35px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
                    <Image
                      title={label}
                      src={src}
                      alt={label}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  <div className="p-5">
                    {phone ? (
                      <div className="flex justify-center pt-1">
                        <div className={galleryPhoneButtonWrap}>
                          <PrimaryPhone phone={phone} variant="red" />
                        </div>
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
