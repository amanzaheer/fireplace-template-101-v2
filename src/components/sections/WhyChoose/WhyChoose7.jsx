"use client";

import React from "react";
import Image from "next/image";
import { Poppins, Inter } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function WhyChoose7({ content }) {
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
    <FullContainer
      id="whychooseus"
      className="bg-[linear-gradient(188deg,#ffffff_0%,#ffffff_50%,#f0f0f0_50%,#f0f0f0_100%)] pt-16 pb-12 md:pt-20 md:pb-16 overflow-x-hidden"
    >
      <Container>
        <div className="grid md:grid-cols-2 items-center gap-10 md:gap-14">
          {/* LEFT CONTENT */}
          <div className="order-2 md:order-1">
            <div className="-mt-2">
              <p
                className={`${poppins.className} text-sm md:text-2xl font-medium text-black mb-2`}
              >
                Why Choose Us
              </p>
              <h2
                className={`${poppins.className} text-[32px] sm:text-[40px] md:text-[46px] font-extrabold text-black leading-tight mb-6 max-w-[430px]`}
              >
                {heading}
              </h2>
            </div>

            <div className="space-y-4 mb-6">
              {features.map((feature, idx) => {
                const text =
                  typeof feature === "object"
                    ? feature?.text
                    : typeof feature === "string"
                    ? feature
                    : "";
                if (!text) return null;

                return (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-7 h-7 whitespace-nowrap shrink-0 mt-0.5">
                      <Image
                        src="/st-icons/Temp7/shield icon.png"
                        alt="Check"
                        width={28}
                        height={28}
                        className="w-7 h-7 object-contain"
                      />
                    </div>
                    <p
                      className={`${inter.className} text-black text-base md:text-lg leading-snug max-w-[430px]`}
                    >
                      {text}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CONTACT */}
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-[546px] h-[544px] overflow-hidden rounded-bl-[123px] border-r-11 border-b-11 border-[#3a8ffb] bg-gray-200">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt="Why choose us"
                  fill
                  className="object-cover"
                  priority={false}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-300" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}