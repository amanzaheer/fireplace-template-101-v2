"use client";

import React from "react";
import Image from "next/image";
import { Phone, CheckCircle2 } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function WhyChoose31({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.why_choose ?? {};
  const features = resolveRefArray(content, block, "features");
  const heading = block.heading ?? "Why Choose Us";
  const description =
    block.description ??
    "Professional Chimney Sweep Clean ensures that your chimney or fireplace meets safety and building code standards, which is important if you're planning to sell your home or undergo renovations. A properly maintained fireplace or chimney also adds to your home's aesthetic appeal and resale value.";
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);

  if (features.length === 0) return null;

  return (
    <FullContainer id="whychooseus" className="py-0 overflow-x-hidden">
      <div className="w-full grid grid-cols-1 md:grid-cols-[38%_62%] min-h-[360px] md:min-h-[440px]">
        <div className="relative min-h-[260px] md:min-h-[440px]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="Why choose us"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 38vw"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-300" />
          )}
        </div>

        <div className="bg-[#f3a008] text-white px-5 md:px-8 lg:px-10 py-6 md:py-8 flex flex-col justify-center">
          <h2 className="text-center text-4xl md:text-5xl font-extrabold leading-none mb-6 md:mb-7">
            {heading}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-start">
            <div>
              <ul className="space-y-2.5">
                {features.map((feature, idx) => {
                  const text =
                    typeof feature === "object"
                      ? feature?.text
                      : typeof feature === "string"
                        ? feature
                        : "";
                  if (!text) return null;
                  return (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-white text-sm md:text-base leading-snug"
                    >
                      <CheckCircle2 className="w-5 h-5 min-w-5 mt-[2px] text-white shrink-0" />
                      <span>{text}</span>
                    </li>
                  );
                })}
              </ul>

              <a
                href={`tel:${phone}`}
                className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full bg-white text-[#d39b3e] px-4 md:px-5 py-2.5 text-xl md:text-2xl leading-none"
              >
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full  text-[#d39b3e]">
                  <Phone className="w-6 h-6 text-[#d39b3e] font-extrabold" />
                </span>
                <span className="truncate">{phone || "(888)-249-0566"}</span>
              </a>
            </div>

            <div className="md:border-l md:border-white/60 md:pl-6">
              <p className="text-white text-sm md:text-base leading-relaxed">
                {description}
              </p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </FullContainer>
  );
}
