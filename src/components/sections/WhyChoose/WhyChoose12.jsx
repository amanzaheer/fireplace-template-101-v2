"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Montserrat } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function WhyChoose12({ content }) {
  const block = content?.why_choose ?? {};
  const features = resolveRefArray(content, block, "features");
  const heading = block.heading ?? "Why Choose Us";
  const subHeading = block?.title ?? "";
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  if (features.length === 0) return null;
  
  return (
    <FullContainer
      id="whychooseus"
      className="overflow-x-hidden bg-white py-12 md:py-16 lg:py-20"
    >
      <Container className="px-4 sm:px-6">
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:items-stretch md:gap-8 lg:gap-10">
          {/* Image — desktop: right edge of cell touches text column */}
          <div className="order-2 flex w-full min-w-0 justify-center md:order-2 md:justify-end">
            <div className="relative h-[280px] w-full max-w-[540px] shrink-0 overflow-hidden rounded-xl bg-gray-200 sm:h-[360px] md:h-[440px] lg:h-[526px]">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt="Why choose us"
                  fill
                  className="object-cover"
                  priority={false}
                  sizes="(max-width: 768px) 100vw, 540px"
                />
              ) : (
                <div className="h-full w-full bg-gray-300" />
              )}
            </div>
          </div>

          {/* Content — left on desktop */}
          <div
            className={`order-1 flex min-w-0 flex-col justify-center bg-white py-2 pl-0 pr-0 text-left md:order-1 md:min-h-[444px] md:pl-2 md:pr-0 md:pt-0 lg:pl-3 ${montserrat.className}`}
          >
            <p className="mb-2 text-base font-medium text-[#6b7280] sm:text-lg md:text-2xl lg:text-[26px]">
              {subHeading}
            </p>
            <h2 className="mb-6 text-[26px] font-extrabold leading-tight text-black sm:mb-8 sm:text-[32px] md:text-[40px] lg:text-[44px]">
              {heading}
            </h2>

            <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:gap-4">
              {features.map((feature, idx) => {
                const text =
                  typeof feature === "object"
                    ? feature?.text
                    : typeof feature === "string"
                      ? feature
                      : "";
                if (!text) return null;

                return (
                  <div key={idx} className="flex items-start  gap-3">
                    <div className="gap-1 h-8 w-8 shrink-0">
                      <Image
                        src="/st-icons/Temp12/shield.png"
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 object-contain"
                        aria-hidden
                      />
                    </div>
                    <p className="text-base font-medium leading-snug text-black sm:text-lg">
                      {text}
                    </p>
                  </div>
                );
              })}
            </div>

            <a
              href={phone ? `tel:${phone}` : "#"}
              className="inline-flex h-auto min-h-[46px] w-full max-w-[323px] shrink-0 flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border-3 border-white bg-[#da4909] px-4 py-[11px] font-normal uppercase tracking-wide text-white shadow-lg transition-opacity hover:opacity-95 sm:w-auto sm:px-6"
            >
              <span className="text-sm sm:text-[16px]">CALL NOW:</span>
              <span className="text-base font-bold sm:text-[20px]">
                {phone || "(888)-249-0566"}
              </span>
            </a>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
