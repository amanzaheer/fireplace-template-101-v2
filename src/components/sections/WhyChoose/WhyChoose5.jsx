"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
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

export default function WhyChoose5({ content }) {
  const block = content?.why_choose ?? {};
  const features = resolveRefArray(content, block, "features");
  const heading = block.heading ?? "Chimney Service CO Benefits";
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);
  const years = block.experience_years ?? block.years ?? "22";
  const ctaText = block.cta_text ?? "Contact Us";

  if (features.length === 0) return null;

  return (
    <FullContainer id="whychooseus" className="bg-[#d95a07] py-14 md:py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 md:gap-14">
          <div className="relative w-full max-w-[560px] mx-auto lg:mx-0">
            <div className="relative overflow-hidden rounded-xl h-[360px] sm:h-[430px] md:h-[500px]">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt="Why choose us"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 bg-white/20" />
              )}
            </div>
            <div className="absolute right-[-8px] top-[44px] sm:right-[-20px] sm:top-[58px] bg-white rounded-lg px-8 py-7 h-[200px] md:h-[230px] min-w-[170px] md:min-w-[190px] flex flex-col items-center justify-center text-center shadow-md">
              <span className="absolute top-4 right-4 text-[#d95a07] text-xl">✦</span>
              <p className="text-black text-6xl leading-none font-black">{years}</p>
              <p className="text-black text-[22px] leading-tight font-semibold mt-3">Years of</p>
              <p className="text-black text-[22px] leading-tight font-semibold">Experience</p>
            </div>
          </div>

          <div className="text-white max-w-[620px]">
            <p className="uppercase tracking-[0.45em] text-sm md:text-base font-semibold mb-3">
              Why Choose Us
            </p>
            <h2 className="text-[44px] sm:text-[52px] md:text-[64px] leading-[1.05] font-extrabold mb-6">
              {heading}
            </h2>

            <ul className="space-y-3 mb-8">
              {features.map((feature, idx) => {
                const text =
                  typeof feature === "object"
                    ? feature?.text
                    : typeof feature === "string"
                      ? feature
                      : "";

                return (
                  <li key={idx} className="flex items-center gap-3 text-white text-[28px] md:text-[30px] font-semibold leading-tight">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm border border-[#efc688] bg-white/95 text-[#dba246] shrink-0">
                      <ShieldCheck className="h-4 w-4" />
                    </span>
                    <span>{text}</span>
                  </li>
                );
              })}
            </ul>

            <Link
              href="#contact-us"
              className="inline-flex items-center justify-center bg-white text-black text-[30px] font-semibold px-12 py-3 leading-none hover:bg-white/90 transition-colors"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}