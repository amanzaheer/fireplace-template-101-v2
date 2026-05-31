"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PhoneCall, Check } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Poppins, Inter } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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

export default function ServiceBenifits14({ content }) {
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
    <FullContainer id="service_benefits" className="bg-[#0483B2] py-16 lg:py-20 text-white overflow-hidden">
      <Container>
        {/* Reconstructed True 3-Column Grid Matrix matching layout blueprint */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1.2fr_1fr] lg:gap-12">
          
          {/* COLUMN 1: LEFT CONTENT BLOCK */}
          <div className="flex flex-col space-y-8 lg:space-y-12">
            {heading ? (
              <h2 className={`${poppins.className} text-[34px] sm:text-[44px] md:text-[48px] font-bold leading-[1.15] tracking-tight text-white`}>
                {heading}
              </h2>
            ) : null}

            {phone ? (
              <div>
                <Link
                  href={tel}
                  className={`${poppins.className} inline-flex items-center gap-4 rounded-[24px] bg-white px-6 py-3.5 text-[#20222c] transition-transform duration-300 hover:scale-[1.02] shadow-xl w-full sm:w-auto`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0483B2] text-white">
                    <PhoneCall className="h-6 w-6" strokeWidth={2.5} aria-hidden />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 leading-none mb-1">
                      CALL NOW:
                    </span>
                    <span className="text-[22px] sm:text-[26px] font-extrabold leading-none tracking-tight text-black">
                      {phone}
                    </span>
                  </div>
                </Link>
              </div>
            ) : null}
          </div>

          {/* COLUMN 2: CENTER BIG IMAGE BLOCK */}
          <div className="w-full flex justify-center">
            {imageSrc ? (
              <div className="relative w-full aspect-[4/5] sm:aspect-[4/5] max-h-[500px] overflow-hidden rounded-[4px] shadow-2xl border border-white/10">
                <Image
                  src={imageSrc}
                  alt={heading || "Service benefits image"}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 35vw"
                />
              </div>
            ) : (
              <div className="w-full aspect-[4/5] rounded-[4px] bg-white/10" />
            )}
          </div>

          {/* COLUMN 3: RIGHT BENEFITS & ACTION CTA BLOCK */}
          <div className="flex flex-col space-y-8 lg:space-y-10">
            {benefits.length ? (
              <ul className="space-y-5">
                {benefits.map((benefit, index) => (
                  <li
                    key={`${benefit}-${index}`}
                    className={`${inter.className} flex items-start gap-3.5 text-[16px] sm:text-[18px] font-medium text-white leading-snug`}
                  >
                    <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center text-white">
                      <Check className="h-5 w-5 text-white" strokeWidth={3} aria-hidden />
                    </span>
                    <span className="tracking-wide">{benefit}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <div>
              <Link
                href={phone ? tel : "#"}
                className={`${poppins.className} w-full inline-flex min-h-[64px] py-3 flex-col items-center justify-center rounded-[18px] bg-white text-[#E65100] px-6 transition-transform duration-300 hover:scale-[1.02] shadow-2xl text-center`}
              >
                <span className="text-[22px] font-black leading-tight tracking-tight uppercase">
                  Get a Free
                </span>
                <span className="text-[22px] font-black leading-none tracking-tight uppercase">
                  Estimate
                </span>
              </Link>
            </div>
          </div>

        </div>
      </Container>
    </FullContainer>
  );
}