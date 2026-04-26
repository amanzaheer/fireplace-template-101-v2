"use client";

import React, { useMemo } from "react";
import QuoteButton from "@/components/common/QuoteButton";
import { ShieldCheck } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import PrimaryPhone from "@/components/common/PrimaryPhone";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
  
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function normalizeHeadingText(value) {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function featureItemText(feature) {
  if (typeof feature === "object") return String(feature?.text ?? "").trim();
  if (typeof feature === "string") return feature.trim();
  return "";
}

export default function WhyChoose8({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.why_choose ?? {};
  const featuresResolved = resolveRefArray(content, block, "features");
  const features = Array.isArray(featuresResolved)
    ? featuresResolved
    : Array.isArray(content?.features)
      ? content.features
      : [];
  const heading = block.heading ?? "Why Choose Us";
  const subHeadingRaw = String(block?.title ?? "").trim();
  const showSubHeading =
    subHeadingRaw.length > 0 &&
    normalizeHeadingText(subHeadingRaw) !== normalizeHeadingText(heading);
  const featuresUnique = useMemo(() => {
    const seen = new Set();
    return features.filter((feature) => {
      const text = featureItemText(feature);
      if (!text) return false;
      const key = text.replace(/\s+/g, " ").toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [features]);
  const description = block?.description ?? "";
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);

  return (
    <FullContainer id="whychooseus" className="bg-white py-12 md:py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="w-full">
            {showSubHeading ? (
              <p className="mb-2 text-[16px] font-medium leading-normal text-[#6b6e74]">
                {subHeadingRaw}
              </p>
            ) : null}
            <h2
              className={cn(
                montserrat.className,
                "mb-4 max-w-[560px] text-[44px] font-bold leading-[53px] text-black not-italic",
              )}
            >
              {heading}
            </h2>
            {description ? (
              <p className="mb-8 max-w-[620px] text-[16px] leading-[1.65] text-[#4a4d52]">
                {description}
              </p>
            ) : null}
            <ul className="mb-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {featuresUnique.map((feature, idx) => {
                const text = featureItemText(feature);
                return (
                  <li
                    key={idx}
                    className="flex items-center gap-3.5 text-[18px] font-medium text-[#252930]"
                  >
                    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                      <span
                        className="absolute inset-0 bg-[#ff6600]"
                        style={{
                          clipPath:
                            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                        }}
                        aria-hidden
                      />
                      <span
                        className="relative flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center bg-white"
                        style={{
                          clipPath:
                            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                        }}
                      >
                        <ShieldCheck
                          className="h-[18px] w-[18px] text-[#ff6600]"
                          strokeWidth={2.5}
                          aria-hidden
                        />
                      </span>
                    </span>
                    {text}
                  </li>
                );
              })}
            </ul>
            <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <div
                className="[&_button]:!min-h-[48px] [&_button]:!rounded-none [&_button]:!border-0 [&_button]:!bg-[#FF0504] [&_button]:!px-7 [&_button]:!py-3 [&_button]:!text-sm [&_button]:!font-bold [&_button]:!uppercase [&_button]:!tracking-wide [&_button]:!text-white [&_button]:!shadow-none [&_button]:hover:!bg-[#E00403] [&_button]:!transition-colors [&_svg]:!text-white"
              >
                <PrimaryPhone phone={phone} variant="orange" />
              </div>
              <div
                className="[&_button]:!min-h-[48px] [&_button]:!w-auto [&_button]:!min-w-[160px] [&_button]:!rounded-none [&_button]:!border-0 [&_button]:!bg-[#FF0504] [&_button]:!px-7 [&_button]:!py-3 [&_button]:!text-sm [&_button]:!font-bold [&_button]:!uppercase [&_button]:!tracking-wide [&_button]:!text-white [&_button]:!shadow-none [&_button]:hover:!bg-[#E00403] [&_button]:!transition-colors [&_h2]:!text-white [&_h2]:!font-bold [&_h2]:!text-sm [&_svg]:!text-white"
              >
                <QuoteButton phone={phone} variant="orange" />
              </div>
            </div>
          </div>
          <div className="relative mt-4 flex w-full justify-center lg:mt-0 lg:justify-end">
            <div className="relative h-[300px] w-full max-w-[520px] md:h-[360px] lg:h-[400px]">
              <div className="absolute left-0 top-0 z-10 h-[88%] w-[58%] overflow-hidden rounded-2xl bg-[#e8eaed] shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
                {imageSrc ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${imageSrc})` }}
                    role="img"
                    aria-label="Why choose us"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-400">
                    Why Choose Us
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 right-0 z-0 h-[82%] w-[52%] overflow-hidden rounded-2xl bg-[#e8eaed] shadow-[0_12px_32px_rgba(0,0,0,0.1)]">
                {imageSrc ? (
                  <div
                    className="absolute inset-0  bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${imageSrc})` }}
                    role="img"
                    aria-label="Why choose us"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-400">
                    Why Choose Us
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
