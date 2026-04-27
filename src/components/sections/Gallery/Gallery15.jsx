"use client";

import React from "react";
import Image from "next/image";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Poppins, Rubik } from "next/font/google";
import { TextQuote } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

function BannerCtaIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={39}
      height={38}
      viewBox="0 0 39 38"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M15.9343 0H5.37446e-05V1.80952C-0.0121365 8.77558 2.04963 15.5955 5.93547 21.4428C8.79926 25.7545 12.5677 29.4264 16.9929 32.2167C22.994 36.0029 29.9935 38.0118 37.1429 37.9999H39V22.4743L26.5757 19.7835L23.1215 23.1492C19.9606 21.1703 17.2737 18.5517 15.2435 15.4714L18.6959 12.1057L15.9343 0Z"
        fill="#FFFFFF"
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

export default function Gallery15({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.gallery ?? null;

  if (!block) return null;

  const title = block.title ?? "";
  const html = block.description ? md.render(block.description) : "";
  const files = Array.isArray(block.file_name) ? block.file_name : [];

  if (!title && !html && files.length === 0) return null;

  return (
    <FullContainer id="gallery" className="bg-[#f4f5f7] py-10 md:py-14">
      <Container className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {title ? (
          <h2
            className={`${rubik.className} mb-4 text-center text-[30px] font-bold leading-tight tracking-tight text-[#2d2d2d] md:mb-5 md:text-[40px]`}
          >
            {title}
          </h2>
        ) : null}

        {html ? (
          <div
            className={[
              poppins.className,
              "mx-auto max-w-none text-center text-[13px] font-normal leading-[1.65] text-[#4a4a4a]",
              "[&_p]:m-0 [&_p]:text-center [&_p]:text-[13px] [&_p]:font-normal [&_p]:leading-[1.65] [&_p]:text-[#4a4a4a]",
              "[&_p+p]:mt-3",
              "[&_li]:text-[13px] [&_li]:leading-[1.65] [&_li]:text-[#4a4a4a] [&_li]:marker:text-[#4a4a4a]",
              "[&_h1]:text-center [&_h1]:text-[20px] [&_h1]:font-semibold [&_h1]:text-[#2d2d2d]",
              "[&_h2]:text-center [&_h2]:text-[18px] [&_h2]:font-semibold [&_h2]:text-[#2d2d2d]",
              "[&_h3]:text-center [&_h3]:text-[16px] [&_h3]:font-semibold [&_h3]:text-[#2d2d2d]",
              "[&_a]:text-[#f59402] hover:[&_a]:underline",
            ].join(" ")}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : null}

        {files.length > 0 ? (
          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {files.map((fileName, index) => {
              const src = buildImageSrc(IMAGE_BASE, fileName);
              const label = title
                ? `${title} - image ${index + 1} of ${files.length}`
                : `Gallery image ${index + 1} of ${files.length}`;
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-[10px] border border-black/5 bg-white shadow-[0_2px_14px_rgba(0,0,0,0.06)]"
                >
                  <div className="relative aspect-4/3">
                    <Image
                      title={label}
                      src={src}
                      alt={label}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-3">
                    {phone ? (
                      <div className="flex flex-col items-center gap-2 pt-1">
                        <a
                          href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                          className={`${rubik.className} inline-flex h-[40px] w-full max-w-[196px] items-center justify-center gap-2 rounded-[8px] bg-[#f59402] px-3 text-[15px] font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition-colors hover:bg-[#df8801]`}
                        >
                          <BannerCtaIcon className="h-4 w-4 shrink-0" />
                          {phone}
                        </a>
                        {/* <button
                          type="button"
                          className={`${rubik.className} inline-flex h-[40px] w-full max-w-[160px] items-center justify-center gap-2 rounded-[8px] bg-[#f59402] px-4 text-[13px] font-bold uppercase text-white shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition-colors hover:bg-[#df8801]`}
                        >
                          <TextQuote className="h-4 w-4 shrink-0" strokeWidth={2.25} />
                          Quote
                        </button> */}
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
