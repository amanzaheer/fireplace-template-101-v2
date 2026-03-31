"use client";

import React from "react";
import Image from "next/image";
import QuoteButton from "@/components/common/QuoteButton";
import {
  Clock,
  Star,
  Shield,
  Award,
  CheckCircle,
  Trophy,
  ThumbsUp,
  Phone,
  FileText,
  MessageSquare,
} from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import PrimaryPhone from "@/components/common/PrimaryPhone";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";

const iconMap = {
  Clock,
  Star,
  Shield,
  Award,
  CheckCircle,
  Trophy,
  ThumbsUp,
  Phone,
  FileText,
  MessageSquare,
};

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function WhyChoose6({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.why_choose ?? {};
  const features = resolveRefArray(content, block, "features");
  const heading = block.heading ?? "We Choose Us";
  const subHeading =
    block?.title ?? block?.sub_heading ?? "Professional Chimney for Home";
  const description =
    block?.description ??
    "Chimney sweep or cleaning is essential for maintaining a safe and efficient fireplace system. Over time, soot, creosote, and debris accumulate in the chimney, creating fire hazards and reducing airflow.";
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);

  if (features.length === 0) return null;

  const leftFeatures = features.slice(0, 2);
  const rightFeatures = features.slice(2);

  return (
    <FullContainer id="whychooseus" className="bg-white py-8 md:py-12 mt-4">
  <Container className="px-4 sm:px-5 md:px-12">

    
    {(() => {
      const firstFeatures = leftFeatures.slice(0, -2);
      const lastFeatures = leftFeatures.slice(-2);

      return (
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_1.2fr_1fr] lg:gap-6 xl:gap-8">

          {/* LEFT SIDE */}
          <div className="w-full">
            <p className="text-3xl leading-tight font-semibold text-black md:text-4.5xl">
              {heading}
            </p>

            <h2 className="mt-2 text-4xl leading-[0.95] font-extrabold text-black md:text-4.5xl">
              {subHeading}
            </h2>

            <p className="mt-4 max-w-[420px] text-base leading-[1.35] text-black md:text-xl">
              {description}
            </p>

            {/* FIRST FEATURES ONLY */}
            <ul className="mt-4 space-y-2.5">
              {firstFeatures.map((feature, idx) => {
                const iconName =
                  typeof feature === "object" ? feature?.icon : null;
                const text =
                  typeof feature === "object"
                    ? feature?.text
                    : typeof feature === "string"
                      ? feature
                      : "";
                const IconComponent = iconName ? iconMap[iconName] : CheckCircle;

                return (
                  <li
                    key={idx}
                    className="flex items-start gap-3text-lg leading-tight text-black md:text-2xl"
                  >
                    {IconComponent && (
                      <IconComponent className="mt-0.5 h-6 w-6 shrink-0 text-[#F97316]" />
                    )}
                    <span>{text}</span>
                   
                  </li>
                );
              })}
            </ul>
            <PrimaryPhone phone={phone} />
          </div>
      

          
          <div className="w-full">
            <div className="relative h-[420px] w-full overflow-hidden rounded-xl bg-gray-200 sm:h-[480px] lg:h-[560px]">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt="Why choose us"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 58vw"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-large">
                  Why Choose Us
                </div>
              )}
            </div>
          </div>

        
          <div className="w-full">
            <ul className="space-y-4 lg:pt-2">

              
              {lastFeatures.map((feature, idx) => {
                const iconName =
                  typeof feature === "object" ? feature?.icon : null;
                const text =
                  typeof feature === "object"
                    ? feature?.text
                    : typeof feature === "string"
                      ? feature
                      : "";
                const IconComponent = iconName ? iconMap[iconName] : CheckCircle;

                return (
                  <li
                    key={`moved-${idx}`}
                    className="flex items-start gap-2.5 text-lg leading-tight text-black md:text-2xl"
                  >
                    {IconComponent && (
                      <IconComponent className="mt-0.5 h-6 w-6 shrink-0 text-[#F97316]" />
                    )}
                    <span>{text}</span>
                  </li>
                );
              })}

              
              {rightFeatures.map((feature, idx) => {
                const iconName =
                  typeof feature === "object" ? feature?.icon : null;
                const text =
                  typeof feature === "object"
                    ? feature?.text
                    : typeof feature === "string"
                      ? feature
                      : "";
                const IconComponent = iconName ? iconMap[iconName] : CheckCircle;

                return (
                  <li
                    key={`right-${idx}`}
                    className="flex items-start gap-2.5 text-lg leading-tight text-black md:text-2xl"
                  >
                    {IconComponent && (
                      <IconComponent className="mt-0.5 h-6 w-6 shrink-0 text-[#F97316]" />
                    )}
                    <span>{text}</span>
                  </li>
                );
              })}
            </ul>

           
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              
              <QuoteButton phone={phone} />
            </div>
          </div>

        </div>
      );
    })()}

  </Container>
</FullContainer>
  );
}
