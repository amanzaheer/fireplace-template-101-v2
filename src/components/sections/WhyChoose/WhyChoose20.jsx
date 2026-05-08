"use client";

import React from "react";
import Image from "next/image";
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

export default function WhyChoose20({ content }) {
  const block = content?.why_choose ?? {};
  const features = resolveRefArray(content, block, "features");
  const heading = block.heading ?? "Why Choose Us";
  const description = block.description ?? "";
  const mainImagePath =
    block.main_image ?? block.file_name_main ?? block.file_name ?? "why-us/whychoose1.png";
  const collageImagePath =
    block.collage_image ?? block.file_name2 ?? "why-us/whychoose2.png";
  const mainImageSrc = buildImageSrc(IMAGE_BASE, mainImagePath);
  const collageImageSrc = buildImageSrc(IMAGE_BASE, collageImagePath);
  const labels = features
    .map((feature) =>
      typeof feature === "object"
        ? feature?.text
        : typeof feature === "string"
          ? feature
          : "",
    )
    .filter(Boolean)
    .slice(0, 5);

  if (!heading && labels.length === 0) return null;

  return (
    <FullContainer id="whychooseus" className="bg-[#FFFFFF] py-10 md:py-14">
      <Container className="max-w-6xl">
        <div className="mx-auto text-center">
          <h2 className="text-4xl font-extrabold leading-tight text-[#111111] md:text-5xl">
            {heading}
          </h2>
          {description ? (
            <p className="mx-auto mt-3 max-w-4xl text-sm leading-6 text-[#222222] md:text-base">
              {description}
            </p>
          ) : null}
        </div>
        <div className="relative mx-auto mt-8 max-w-[760px]">
          <div className="relative overflow-hidden rounded-[24px] bg-[#e8ecef]">
            <div className="relative h-[430px] w-full md:h-[480px]">
              {mainImageSrc ? (
                <Image
                  src={mainImageSrc}
                  alt="Why choose us"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 760px"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-200" />
              )}
            </div>
          </div>

          <div className="absolute -right-8 top-5 h-[96px] w-[96px] overflow-hidden rounded-[10px] border-2 border-white md:-right-12 md:top-6 md:h-[124px] md:w-[124px]">
            {collageImageSrc ? (
              <Image
                src={collageImageSrc}
                alt="Collage"
                fill
                className="object-cover"
                sizes="160px"
                loading="lazy"
              />
            ) : null}
          </div>

          {labels[0] ? (
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
              <BadgeLabel label={labels[0]} />
            </div>
          ) : null}
          {labels[1] ? (
            <div className="absolute -left-2 top-[55%] -translate-y-1/2 md:-left-14">
              <BadgeLabel label={labels[1]} />
            </div>
          ) : null}
          {labels[2] ? (
            <div className="absolute -right-2 top-[58%] -translate-y-1/2 md:-right-16">
              <BadgeLabel label={labels[2]} />
            </div>
          ) : null}
          {labels[3] ? (
            <div className="absolute -bottom-4 left-0 md:-left-10">
              <BadgeLabel label={labels[3]} />
            </div>
          ) : null}
          {labels[4] ? (
            <div className="absolute -bottom-6 right-0 md:-right-12">
              <BadgeLabel label={labels[4]} />
            </div>
          ) : null}
        </div>
      </Container>
    </FullContainer>
  );
}

function BadgeLabel({ label }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl bg-[#3f5fb4] px-3 py-2 text-sm font-semibold text-white shadow-md md:text-base">
      <ShieldCheck className="h-4 w-4 shrink-0" />
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}
