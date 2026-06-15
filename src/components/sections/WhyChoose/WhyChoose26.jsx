"use client";

import React from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import { Montserrat, Inter } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const phoneButtonClass =
  "inline-flex max-w-full items-center justify-center gap-2.5 rounded-full bg-[#D32F2F] px-6 py-3.5 text-base font-bold text-white shadow-lg transition-colors duration-200 hover:bg-[#bf1f1f] sm:px-8 sm:text-lg";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function firstImageSrc(...paths) {
  for (const path of paths) {
    const src = buildImageSrc(IMAGE_BASE, path);
    if (src) return src;
  }
  return "";
}

function FeatureText({ text }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function ShieldCheckIcon() {
  return (
    <svg
      width="31"
      height="37"
      viewBox="0 0 31 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-0.5 h-[34px] w-[28px] shrink-0 sm:h-[37px] sm:w-[31px]"
      aria-hidden
    >
      <path
        d="M30.0176 16.6765C30.0176 25.9319 23.6139 34.587 15.0088 36.6882C6.40376 34.587 0 25.9319 0 16.6765V6.67059L15.0088 0L30.0176 6.67059V16.6765ZM15.0088 33.3529C21.2625 31.6853 26.6824 24.2476 26.6824 17.0434V8.83853L15.0088 3.63547L3.33529 8.83853V17.0434C3.33529 24.2476 8.75515 31.6853 15.0088 33.3529ZM11.6735 26.6824L5.00294 20.0118L7.35432 17.6604L11.6735 21.9629L22.6633 10.9731L25.0147 13.3412"
        fill="#BF1309"
      />
    </svg>
  );
}

export default function WhyChoose26({ content, embedded = false }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.why_choose ?? {};
  const slogan = content?.slogan ?? {};
  const cmsFeatures = resolveRefArray(content, block, "features");
  const topFeatures = Array.isArray(content?.features) ? content.features : [];
  const features = (
    cmsFeatures.length > 0 ? cmsFeatures : topFeatures
  ).slice(0, 4);

  const subLabel =
    block.label ?? block.sub_title ?? block.section_title ?? "";
  const heading = block.heading ?? block.heading_main ?? "";
  const description =
    block?.description ??
    block?.discription ??
    slogan?.description ??
    "";

  const imageSrc = firstImageSrc(
    block.file_name,
    block.main_image,
    block.file_name_main,
  );
  const hasImage = Boolean(imageSrc);

  const body = (
    <div
      className={cn(
        "grid grid-cols-1 items-center gap-10",
        hasImage
          ? "lg:grid-cols-[minmax(0,1.05fr)_280px_minmax(0,1fr)] lg:gap-6 xl:gap-10"
          : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10 xl:gap-14",
      )}
    >
      {/* Left — copy + CTA */}
      <div className="order-1 flex min-w-0 flex-col items-start text-left lg:order-1">
        {subLabel ? (
          <p
            className={`mb-2 text-sm font-medium text-white/90 sm:text-base ${inter.className}`}
          >
            {subLabel}
          </p>
        ) : null}
        <h2
          className={`mb-4 max-w-md text-[28px] font-extrabold leading-[1.12] text-white sm:text-[34px] lg:text-[38px] xl:text-[42px] ${montserrat.className}`}
        >
          {heading}
        </h2>
        {description ? (
          <p
            className={`mb-8 max-w-md text-[15px] leading-relaxed text-white/75 sm:text-base ${inter.className}`}
          >
            {description}
          </p>
        ) : null}
        {phone ? (
          <a
            href={`tel:${String(phone).replace(/\s/g, "")}`}
            className={phoneButtonClass}
          >
            <Phone className="h-5 w-5 shrink-0" strokeWidth={2.5} aria-hidden />
            <span>{phone}</span>
          </a>
        ) : null}
      </div>

      {/* Center — hero image from CMS / default data */}
      {hasImage ? (
        <div className="order-2 flex min-w-0 items-center justify-center lg:order-2">
          <div className="relative mx-auto h-[320px] w-[180px] max-w-full shrink-0 sm:h-[420px] sm:w-[230px] md:h-[480px] md:w-[260px] lg:h-[540px] lg:w-[280px]">
            <Image
              src={imageSrc}
              alt={block.image_alt ?? heading ?? block.heading ?? ""}
              fill
              className="object-contain object-center"
              sizes="280px"
              loading="lazy"
            />
          </div>
        </div>
      ) : null}

      {/* Right — feature list */}
      <ul
        className={cn(
          "order-3 flex min-w-0 flex-col gap-5 sm:gap-6",
          hasImage ? "lg:order-3" : "lg:order-2 lg:justify-center",
        )}
      >
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
              className={`flex items-start gap-3 text-[15px] font-medium leading-snug text-white/90 sm:text-base ${inter.className}`}
            >
              <ShieldCheckIcon />
              <span>
                <FeatureText text={text} />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );

  if (embedded) {
    return (
      <div className={`${montserrat.className} bg-black px-4 py-8 text-white`}>
        {body}
      </div>
    );
  }

  return (
    <FullContainer
      id="whychooseus"
      className={`${montserrat.className} bg-black py-12 md:py-16 lg:py-20`}
    >
      <Container className="px-4 sm:px-6 lg:px-8">{body}</Container>
    </FullContainer>
  );
}
