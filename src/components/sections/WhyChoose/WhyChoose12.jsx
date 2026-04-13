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
  const subHeading = block?.title ?? "Who We Are";
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  if (features.length === 0) return null;

  return (
    <FullContainer
      id="whychooseus"
      className="overflow-x-hidden bg-white py-12 md:py-16 lg:py-20"
    >
      <Container>
        <div className="grid grid-cols-1 items-start  gap-1 md:grid-cols-2 md:items-stretch md:gap-2">
          {/* Image — desktop: right edge of cell touches text column */}
          <div className="order-2 flex w-full min-w-0 justify-center md:order-2 md:justify-start mr-3 ">
            <div className="relative h-[526px] rounded-xl w-full max-w-[540px] shrink-0 overflow-hidden bg-gray-200 ">
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
            className={`order-1 flex min-w-0 flex-col justify-center bg-white py-2 pl-0 pr-0 text-left md:order-1 md:min-h-[444px] md:pl-2 md:pr-0 md:pt-0 lg:pl-3 mt-12 ${montserrat.className}`}
          >
            <p className="mb-2 text-sm font-medium text-[#6b7280] md:text-[26px]">
              {subHeading}
            </p>
            <h2 className="mb-8 text-[28px] font-extrabold leading-tight text-black sm:text-[36px] md:text-[44px] lg:text-[44px]">
              {heading}
            </h2>

            <div className="mb-8  gap-x-1 gap-y-2 sm:gap-x-2 sm:gap-y-2">
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
                    <p className="text-[18px] font-medium leading-snug text-black sm:text-base">
                      {text}
                    </p>
                  </div>
                );
              })}
            </div>

            <a
              href={phone ? `tel:${phone}` : "#"}
              className="inline-flex  items-center gap-2 bg-[#da4909] border-3 border-white shadow-lg   rounded-full  w-[323px] h-[46px] px-8 py-3.5 text-[16px] font-semibold uppercase  tracking-wide text-white transition-opacity hover:opacity-95 sm:px-10 sm:py-4 sm:text-base"
            >
              CALL NOW
              <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
             
            </a>
            
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
