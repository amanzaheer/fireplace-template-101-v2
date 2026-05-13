"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone, TextQuote } from "lucide-react";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

function scrollToQuoteForm() {
  const el = document.getElementById("quote-form-section");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function trimStr(v) {
  if (typeof v !== "string") return "";
  return v.trim();
}

function benefitLabel(benefit) {
  if (typeof benefit === "string") return benefit.trim();
  if (benefit && typeof benefit === "object") {
    return (
      trimStr(benefit.title) ||
      trimStr(benefit.text) ||
      ""
    );
  }
  return "";
}

export default function ServiceBenefits9({ content }) {
  const contentSafe = content ?? {};
  const phone =
    contentSafe?.contact_info?.phone ?? contentSafe?.navbar?.phone ?? "";
  const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#";

  const block = contentSafe?.service_benefits ?? {};
  const headingRaw = block.heading ?? "";
  const headingStr =
    typeof headingRaw === "string" ? headingRaw.trim() : "";
  const list = Array.isArray(block.list) ? block.list : [];
  const filePath = trimStr(block.file_name);
  const imageSrc = filePath ? buildImageSrc(IMAGE_BASE, filePath) : "";

  const imageTitle =
    trimStr(block.title) ||
    trimStr(block.image_title) ||
    headingStr ||
    "";
  const imageAlt =
    trimStr(block.image_alt) ||
    trimStr(block.alt) ||
    headingStr ||
    trimStr(block.title) ||
    trimStr(block.image_title) ||
    "";

  const quoteLabel =
    trimStr(block.cta_label) || trimStr(block.quote_cta_label);

  if (list.length === 0) return null;

  return (
    <FullContainer id="service_benefits" className="overflow-hidden py-0 md:py-8">
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-stretch md:gap-6 lg:gap-8">
          <div className="relative order-2 min-h-[220px] w-full overflow-hidden rounded-md bg-blue-500 sm:min-h-[260px] md:order-1 md:min-h-[320px]">
            {imageSrc ? (
              <Image
                {...(imageTitle ? { title: imageTitle } : {})}
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 bg-blue-200" />
            )}
          </div>
          <div className="order-1 z-10 my-4 flex flex-col gap-4 rounded-2xl bg-white px-4 py-6 shadow-[0_0_5px_rgba(0,0,0,0.5)] sm:px-6 sm:py-8 md:order-2 md:my-7 md:px-10">
            {headingStr ? (
              <h2 className="text-center text-2xl font-bold uppercase leading-tight tracking-tight text-[#000000] sm:text-3xl md:text-left md:text-4xl lg:text-[2.35rem] lg:leading-[1.12]">
                {headingStr}
              </h2>
            ) : null}
            <div className="flex w-full justify-center md:justify-start">
              <ul className="mt-8 grid w-full max-w-xl grid-cols-1 gap-x-10 gap-y-4 sm:max-w-none sm:grid-cols-2 sm:gap-y-3.5">
                {list.map((benefit, index) => {
                  const label = benefitLabel(benefit);
                  if (!label) return null;
                  return (
                    <li
                      key={index}
                      className="flex items-start px-4 text-left"
                    >
                      <ChevronRight className="mt-1 h-5 w-5 shrink-0 stroke-[4] text-[#EFA536]" />
                      <span
                        className={`${poppins.className} ml-2 pt-1 text-base font-normal leading-normal text-[#000]`}
                      >
                        {label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="mt-8 flex w-full flex-col items-stretch justify-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              {phone ? (
                <Link href={phoneHref} className="inline-flex w-full sm:w-auto">
                  <button
                    type="button"
                    className="flex w-full min-w-0 items-center justify-center gap-2 rounded-none bg-[#EFA536] px-6 py-3 font-barlow text-lg font-semibold text-white shadow transition-colors hover:bg-[#EFA536]/85 sm:min-w-[205px] sm:justify-start"
                  >
                    <Phone
                      className="h-5 w-5 shrink-0 text-white"
                      strokeWidth={2.25}
                    />
                    <span className="truncate">{phone}</span>
                  </button>
                </Link>
              ) : null}
              {quoteLabel ? (
                <button
                  type="button"
                  onClick={scrollToQuoteForm}
                  className="inline-flex w-full min-w-0 max-w-full items-center justify-center gap-2 rounded-none bg-[#EFA536] px-6 py-3 font-barlow text-base font-bold text-white uppercase tracking-wide transition-colors hover:bg-[#EFA536]/85 sm:w-auto sm:min-w-[160px] sm:max-w-[280px] md:text-base"
                >
                  <div className="flex items-center gap-2">
                    <TextQuote
                      className="h-6 w-6 shrink-0 text-white"
                      strokeWidth={2.25}
                    />
                    <span className="text-md ml-2 font-thin tracking-widest md:text-xl md:tracking-normal">
                      {quoteLabel}
                    </span>
                  </div>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
