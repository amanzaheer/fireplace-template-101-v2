"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Phone,
  ArrowRight,
  Flame,
  Wind,
  Zap,
  Home,
  ShieldCheck,
  Heart,
  Shield,
  Award,
  Sparkles,
} from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

/** CMS: optional `icon` string per benefit item (Lucide component name). */
const benefitIconMap = {
  Check,
  Flame,
  Wind,
  Zap,
  Home,
  ShieldCheck,
  Heart,
  Shield,
  Award,
  Sparkles,
};

function BenefitIcon({ benefit }) {
  const name =
    typeof benefit === "object" && benefit?.icon ? benefit.icon : "Check";
  const Icon = benefitIconMap[name] ?? Check;
  return (
    <span
      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F97316]"
      aria-hidden
    >
      <Icon className="h-4 w-4 text-white" strokeWidth={2.5} />
    </span>
  );
}

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function ServiceBenefits6({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.service_benefits ?? {};
  const subHeading = block.sub_heading ?? block.subtitle ?? "";
  const heading = block.heading ?? "";
  const list = Array.isArray(block.list) ? block.list : [];
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);

  const mid = Math.ceil(list.length / 2);
  const leftCol = list.slice(0, mid);
  const rightCol = list.slice(mid);

  const scrollToQuote = useCallback(() => {
    const el =
      document.getElementById("quote-form-section") ??
      document.querySelector(
        '.quote-form, [id*="quote"], [class*="quote-form"]'
      );

    if (el) {
      const offset = 80;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - offset,
        behavior: "smooth",
      });
    }
  }, []);

  if (list.length === 0) return null;

  const benefitLabel = (benefit) =>
    typeof benefit === "object" ? benefit?.title : benefit;

  return (
    <FullContainer
  id="service_benefits"
  className="overflow-hidden bg-white py-10 md:py-14 lg:py-16"
>
  <Container>
    <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-10">
      
      {/* Left: copy + benefits + CTAs */}
      <div className="flex flex-col pl-4 sm:pl-6 md:pl-10 lg:pl-12 max-w-[600px]">
        
        {subHeading ? (
          <p className="font-barlow text-lg font-semibold text-black md:text-3xl">
            {subHeading}
          </p>
        ) : null}

        {heading ? (
          <h2
            className={`font-barlow font-extrabold text-black ${
              subHeading ? "mt-2" : ""
            } text-3xl leading-tight tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]`}
          >
            {heading}
          </h2>
        ) : null}

        <div className="mt-8 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 sm:gap-y-4">
          
          {/* Left column */}
          <ul className="space-y-4 sm:space-y-1">
            {leftCol.map((benefit, index) => (
              <li
                key={`b-l-${index}`}
                className="flex items-start gap-4 font-barlow text-base text-black md:text-lg"
              >
                <BenefitIcon benefit={benefit} />
                <span className="leading-snug">
                  {benefitLabel(benefit)}
                </span>
              </li>
            ))}
          </ul>

          
          <ul className="space-y-4 sm:space-y-1">
            {rightCol.map((benefit, index) => (
              <li
                key={`b-r-${index}`}
                className="flex items-start gap-4 font-barlow text-base text-black md:text-lg"
              >
                <BenefitIcon benefit={benefit} />
                <span className="leading-snug">
                  {benefitLabel(benefit)}
                </span>
              </li>
            ))}
          </ul>

        </div>

        
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-9">
          
          <button
            type="button"
            onClick={scrollToQuote}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-black px-13 py-3 font-barlow text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            Call us today
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>

          <Link
            href={phone ? `tel:${phone}` : "#"}
            className="inline-flex min-h-[48px] min-w-[220px] items-center justify-center gap-2 rounded-lg bg-[#F97316] px-6 py-3 font-barlow text-base font-bold text-white shadow-sm transition-colors hover:bg-[#ea580c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2"
          >
            <Phone className="h-5 w-5 shrink-0" aria-hidden />
            {phone || "—"}
          </Link>

        </div>
      </div>

      {/* Right: image */}
      <div>
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-gray-100 shadow-sm sm:aspect-5/4 lg:aspect-5/4">
          {imageSrc ? (
            <Image
              title="Service benefits"
              src={imageSrc}
              alt="Professional chimney service on a residential roof"
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-200" />
          )}
        </div>
      </div>

    </div>
  </Container>
</FullContainer>
  );
}
