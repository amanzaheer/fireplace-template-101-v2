"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Poppins, Inter } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  if (
    filePath.startsWith("/") ||
    filePath.startsWith("http://") ||
    filePath.startsWith("https://")
  ) {
    return filePath;
  }
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function ServiceBenifits18({ content }) {
  const phone =
    content?.contact_info?.phone?.trim() ||
    content?.navbar?.phone?.trim() ||
    "";
  const tel = phone ? `tel:${phone.replace(/\s/g, "")}` : "#";
  const block = content?.service_benefits ?? {};
  const heading = typeof block.heading === "string" ? block.heading.trim() : "";
  const list = Array.isArray(block.list) ? block.list : [];
  const filePath =
    typeof block.file_name === "string" ? block.file_name.trim() : "";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);
  const benefits = list
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (item && typeof item === "object") {
        const title = typeof item.title === "string" ? item.title.trim() : "";
        const description =
          typeof item.description === "string" ? item.description.trim() : "";
        return [title, description].filter(Boolean).join(" - ").trim();
      }
      return "";
    })
    .filter(Boolean);

  if (!heading && benefits.length === 0 && !imageSrc) return null;

  return (
    <FullContainer id="service_benefits" className="py-10 md:py-14 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          <div className="relative min-h-[260px] overflow-hidden rounded-[24px] bg-neutral-200 md:min-h-[380px]">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={heading || "Service benefits image"}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
            ) : (
              <div className="absolute inset-0 bg-neutral-200" />
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent" aria-hidden />
          </div>

          <div className="flex flex-col rounded-[24px] border border-black/5 bg-white p-5 md:p-8">
            {heading ? (
              <h2 className={`${poppins.className} text-center text-[30px] font-bold leading-tight text-[#2d2d2d] md:text-left md:text-[38px]`}>
                {heading}
              </h2>
            ) : null}

            {benefits.length ? (
              <ul className="mt-5 space-y-3 md:mt-6">
                {benefits.map((benefit, index) => (
                  <li
                    key={`${benefit}-${index}`}
                    className={`${inter.className} flex items-start gap-3 text-[15px] font-medium leading-relaxed text-[#222] md:text-base`}
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[#F0520E]">
                      <ShieldCheck className="h-6 w-6" strokeWidth={2.5} aria-hidden />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              {phone ? (
                <Link
                  href={tel}
                  className={`${poppins.className} inline-flex h-[50px] items-center justify-center gap-2 rounded-[10px] bg-[#F0520E] px-5 text-[17px] font-semibold text-white transition-colors `}
                >
                  <PhoneCall className="h-6 w-6" strokeWidth={2.5} aria-hidden />
                  <span>{phone}</span>
                </Link>
              ) : null}

              <Link
                href={phone ? tel : "#"}
                className={`${inter.className} inline-flex h-[50px] items-center justify-center gap-2 rounded-[10px] bg-[#F0520E] px-6 text-sm font-semibold uppercase tracking-wide text-white transition-colors `}
              >
                <span>Call Us Today</span>
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
