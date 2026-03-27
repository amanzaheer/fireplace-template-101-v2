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
  const heading = block.heading ?? "Why Choose Us";
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);

  if (features.length === 0) return null;

  return (
    <FullContainer id="whychooseus" className="py-8 md:py-12 bg-white mt-4">
      <Container>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-5/12 flex flex-col items-start justify-center">
            <h2 className="text-4xl font-extrabold text-[#1A2956] mb-4">
              {heading}
            </h2>
            <ul className="mb-6 space-y-3">
              {features.map((feature, idx) => {
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
                    className="flex items-center gap-3 text-[#1A2956] font-medium text-base md:text-[17px]"
                  >
                    {IconComponent && (
                      <IconComponent className="min-w-5 w-5 h-5 text-[#1A2956] shrink-0" />
                    )}
                    {text}
                  </li>
                );
              })}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 w-full mt-2">
              <PrimaryPhone phone={phone} />
              <QuoteButton phone={phone} />
            </div>
          </div>
          <div className="w-full md:w-7/12 flex justify-center relative mt-6 md:mt-0">
            <div className="rounded-lg overflow-hidden w-full h-[250px] sm:h-[280px] md:h-[320px] bg-gray-200 relative">
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
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                  Why Choose Us
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
