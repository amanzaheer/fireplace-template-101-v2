"use client";

import React from "react";
import Image from "next/image";
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

export default function WhyChoose10({ content }) {
  const block = content?.why_choose ?? {};
  const features = resolveRefArray(content, block, "features");
  const heading = block.heading ?? "Why Choose Us";
  const subHeading = block?.title ?? "Who We Are";
  const description = block?.description ?? "";
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const normalizedFeatures = features
    .map((feature) =>
      typeof feature === "object"
        ? feature?.text
        : typeof feature === "string"
          ? feature
          : "",
    )
    .filter(Boolean);
  const leftFeatures = normalizedFeatures.slice(0, 2);
  const rightFeatures = normalizedFeatures.slice(2);

  if (normalizedFeatures.length === 0) return null;

  return (
    <FullContainer
      id="whychooseus"
      className="overflow-x-hidden bg-white py-12 md:py-16 lg:py-20"
    >
      <Container>
        <div className={`mx-auto grid max-w-[1220px] grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_356px_minmax(0,1fr)] md:items-center md:gap-8 ${montserrat.className}`}>
          <div className="order-1 w-full max-w-[380px] justify-self-center md:justify-self-end">
            <p className="mb-2 text-[26px] font-medium leading-tight text-black">
              {subHeading}
            </p>
            <h2 className="mb-4 text-[36px] font-bold leading-[1.02] text-black">
              {heading}
            </h2>
            {description ? (
              <p className="mb-4 max-w-[95%] text-[36px] leading-[1.2] text-black">
                {description}
              </p>
            ) : null}
            <div className="mb-6 flex flex-col gap-2">
              {leftFeatures.map((text, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Image
                    src="/st-icons/Temp10/shield.png"
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 shrink-0 object-contain"
                    aria-hidden
                  />
                  <p className="text-[16px] leading-tight text-black">{text}</p>
                </div>
              ))}
            </div>
            {phone ? (
              <a
                href={`tel:${phone}`}
                className="inline-flex h-[47px] max-w-[217px] items-center justify-center gap-3 rounded-[8px] bg-[#ff4b4d] px-6 text-[19px]  leading-none text-white"
              >
                <Image
                  src="/st-icons/Temp2/call2.png"
                  alt="Phone"
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
                <span>{phone}</span>
              </a>
            ) : null}
          </div>

          <div className="order-2 flex w-full items-center justify-center">
            <div className="relative h-[320px] w-full max-w-[356px] ml-8 overflow-hidden rounded-[11px] bg-gray-200 sm:h-[400px] md:h-[462px] md:w-[356px]">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt="Why choose us"
                  fill
                  className="object-cover"
                  priority={false}
                  sizes="(max-width: 768px) 92vw, 356px"
                />
              ) : (
                <div className="h-full w-full bg-gray-300" />
              )}
            </div>
          </div>

          <div className="order-3 flex w-full max-w-[380px] flex-col gap-2 justify-self-center md:justify-self-start">
            {rightFeatures.map((text, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Image
                  src="/st-icons/Temp10/shield.png"
                  alt=""
                  width={24}
                  height={24}
                  className="h-7 w-7 shrink-0 object-contain"
                  aria-hidden
                />
                <p className="text-[22px] leading-tight text-black">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
