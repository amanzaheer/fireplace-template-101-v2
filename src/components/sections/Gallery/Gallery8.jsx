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
  "[&_button]:!min-h-[48px] [&_button]:!rounded-none [&_button]:!border-0 [&_button]:!bg-[#ff6600] [&_button]:!px-7 [&_button]:!py-3 [&_button]:!text-sm [&_button]:!font-bold [&_button]:!uppercase [&_button]:!tracking-wide [&_button]:!text-white [&_button]:!shadow-none [&_button]:hover:!bg-[#e65c00] [&_button]:!transition-colors [&_svg]:!text-white";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Gallery8({ content }) {
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
          <h2
            className={cn(
              montserratGalleryTitle.className,
              "mb-4 text-center text-[44px] font-bold leading-[53px] text-[#000000] not-italic",
            )}
          >
            {title}
          </h2>
        ) : null}

        {html ? (
          <div
            className={cn(
              montserratGalleryBody.className,
              "prose max-w-none w-full text-center text-[16px] leading-[1.65] text-[#000000]",
              "prose-headings:text-center prose-p:text-center prose-li:text-center",
              "[&_*]:!text-[#000000]",
              "[&_p]:!text-[16px] [&_p]:!leading-[1.65] [&_p]:!mb-8",
              "[&_li]:!text-[16px] [&_li]:!leading-[1.65]",
              "[&_h1]:!text-[16px] [&_h2]:!text-[16px] [&_h3]:!text-[16px]",
              "[&_h1]:!font-bold [&_h2]:!font-bold [&_h3]:!font-semibold",
              "[&_a]:!text-[#000000] [&_strong]:!font-semibold [&_strong]:!text-[#000000]",
            )}
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
                      <div className="flex justify-center pt-2">
                        <div className={galleryPhoneButtonWrap}>
                          <PrimaryPhone phone={phone} variant="orange" />
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
