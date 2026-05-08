"use client";

import React from "react";
import Image from "next/image";
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

export default function WhyChoose1({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.why_choose ?? {};
  const features = resolveRefArray(content, block, "features");
  const heading = block.heading ?? "Why Choose Us";
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);
  const ctaText = block.button_text ?? "CONTACT NOW";
  const ctaHref = block.button_link?.trim() || (phone ? `tel:${phone}` : "");

  const handleCtaClick = () => {
    const el =
      document.getElementById("quote-form-section") ??
      document.querySelector('.quote-form, [id*="quote"], [class*="quote-form"]');

    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  if (features.length === 0) return null;

  return (
    <FullContainer id="whychooseus" className="mt-4 overflow-hidden py-6 md:py-10">
      <Container>
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-14">
          <div className="relative h-full min-h-[260px]  overflow-hidden rounded bg-[#dbeeff] shadow-[0_12px_34px_rgba(0,0,0,0.12)] md:min-h-[360px]">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt="Why choose us"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 bg-[#cfe8ff]" />
            )}
          </div>

          <div className="flex flex-col rounded-2xl bg-white p-1 md:pl-4 lg:pl-6">
            <h2 className="text-start text-[36px] font-extrabold leading-[1.1] tracking-tight text-black md:text-[46px]">
              {heading}
            </h2>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-">
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
                  <div
                    key={idx}
                    className="inline-flex min-h-[46px] items-center rounded-lg px-3 py-2 text-black font-poppins"
                  >
                    {IconComponent ? (
                      <IconComponent className="h-4 w-4 shrink-0" />
                    ) : null}
                    <span className="ml-2 text-[20px] font-regular font-poppins leading-tight">
                      {text}
                    </span>
                  </div>
                );
              })}
            </div>

            {ctaHref ? (
              <a
                href={ctaHref}
                className="mt-3 inline-flex h-[73.33px] w-[258px] flex-col items-center justify-center bg-[#c92d2d] pt-[2.72px] pr-[1.36px] pb-[2.72px] pl-[1.36px] text-center text-[27px] font-extrabold uppercase leading-none tracking-[0.5px] text-white transition-colors hover:bg-[#b92828]"
              >
                {ctaText}
              </a>
            ) : (
              <button
                type="button"
                onClick={handleCtaClick}
                className="mt-3 inline-flex h-[73.33px] w-[258px] flex-col items-center justify-center bg-[#c92d2d] pt-[2.72px] pr-[1.36px] pb-[2.72px] pl-[1.36px] text-center text-[27px] font-extrabold uppercase leading-none tracking-[0.5px] text-white transition-colors hover:bg-[#b92828]"
              >
                {ctaText}
              </button>
            )}

          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
