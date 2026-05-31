"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Montserrat } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { Inter } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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

/** Same red pill CTA as WhyChoose12 / ServiceDescription12 */
const ctaButtonClass =
  "inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-[#D32F2F] px-6 py-3 text-base font-bold uppercase tracking-wide text-white shadow-lg transition-colors duration-200 hover:bg-[#bf1f1f] sm:px-8";

export default function WhyChoose23({ content, embedded = false }) {
  const phone =
    content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  const block = content?.why_choose ?? {};

  const features = resolveRefArray(content, block, "features");

  const heading = block.heading ?? "Why Choose Us";

  const description =
    block?.description ??
    block?.discription ??
    block?.title ??
    block?.sub_title ??
    "";

  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);
  if (features.length === 0 && !embedded) return null;
  const inner = (
    <div className="relative w-full min-w-0 text-left wrap-break-word">
      <h2 className="mb-3 text-2xl font-extrabold uppercase leading-tight tracking-wide text-black sm:text-[28px] lg:text-[32px]">
        {heading}
      </h2>
      {description ? (
        <p
          className={`mb-6 max-w-xl text-base leading-relaxed text-gray-600 ${montserrat.className}`}
        >
          {description}
        </p>
      ) : null}

      <ul className="mb-8 max-w-xl space-y-3">
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
              className={`flex items-start gap-3 text-base font-medium text-black sm:text-lg ${inter.className}`}
            >
              <svg width="31" height="37" viewBox="0 0 31 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30.0176 16.6765C30.0176 25.9319 23.6139 34.587 15.0088 36.6882C6.40376 34.587 0 25.9319 0 16.6765V6.67059L15.0088 0L30.0176 6.67059V16.6765ZM15.0088 33.3529C21.2625 31.6853 26.6824 24.2476 26.6824 17.0434V8.83853L15.0088 3.63547L3.33529 8.83853V17.0434C3.33529 24.2476 8.75515 31.6853 15.0088 33.3529ZM11.6735 26.6824L5.00294 20.0118L7.35432 17.6604L11.6735 21.9629L22.6633 10.9731L25.0147 13.3412" fill="#BF1309" />
              </svg>
              <span className="leading-snug">{text}</span>
            </li>
          );
        })}
      </ul>

      <a href={phone ? `tel:${phone}` : "#"} className={ctaButtonClass}>
        Call Us Today
        <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
      </a>
    </div>
  );

  if (embedded) {
    if (features.length === 0) {
      return (
        <div className={montserrat.className}>
          <h2 className="text-2xl font-extrabold uppercase text-black sm:text-3xl">
            {heading}
          </h2>
          {description ? (
            <p className="mt-3 text-base text-black">{description}</p>
          ) : null}
        </div>
      );
    }
    return <div className={montserrat.className}>{inner}</div>;
  }

  if (features.length === 0) return null;

  return (
    <FullContainer
      id="whychooseus"
      className={`${montserrat.className} mt-20 bg-white py-8 md:py-12`}
    >
      <Container>{inner}</Container>
    </FullContainer>
  );
}