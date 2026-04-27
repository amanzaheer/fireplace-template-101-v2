"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function ServiceBenefits5({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.service_benefits ?? {};
  const heading = block.heading ?? "";
  const list = Array.isArray(block.list) ? block.list : [];
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);

  if (list.length === 0) return null;

  const handleQuoteClick = () => {
    if (typeof window === "undefined") return;
    const el =
      document.getElementById("quote-form-section") ??
      document.querySelector('.quote-form, [id*="quote"], [class*="quote-form"]');
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 80,
      behavior: "smooth",
    });
  };
  const ctaClass =
    "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-[3px] border-white !bg-[#D35400] px-6 py-3 font-semibold !text-white shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-colors hover:!bg-[#b84700] active:!bg-[#a03d00] hover:shadow-[0_10px_28px_rgba(0,0,0,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D35400]";

  return (
    <FullContainer id="service_benefits" className="py-0 md:py-8 overflow-hidden">
      <Container className="mx-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <div className="z-10 my-4 flex flex-col gap-4 rounded-2xl bg-white px-4 py-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5 md:my-7 md:px-10">
            {heading ? (
              <Heading text={heading} className="text-center text-black md:text-start" />
            ) : null}
            <div className="flex flex-row items-center justify-center md:justify-start">
              <div className="flex w-fit flex-col space-y-[6px]">
                {list.map((benefit, index) => (
                  <div key={index} className="flex items-start px-2 md:px-4">
                    <ChevronRight className="mt-1 h-5 w-5 flex-shrink-0 stroke-[3] text-[#D35400]" />
                    <span className="ml-2 text-xl font-barlow text-black">
                      {typeof benefit === "object" ? benefit?.title : benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-full flex-col items-stretch justify-start gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:gap-4">
              {phone ? (
                <a
                  href={`tel:${phone}`}
                  className={`${ctaClass} w-full min-w-0 text-center text-base sm:w-auto sm:min-w-[205px]`}
                >
                  {phone}
                </a>
              ) : null}
              <button
                type="button"
                onClick={handleQuoteClick}
                className={`${ctaClass} w-full font-barlow text-base font-bold uppercase tracking-wide sm:w-auto sm:min-w-[205px]`}
              >
                GET A QUOTE
              </button>
            </div>
          </div>
          <div className="relative min-h-[200px] overflow-hidden rounded-xl bg-[#D35400]/20 md:min-h-[320px] md:w-[111%] md:max-w-none md:justify-self-end">
            {imageSrc ? (
              <Image
                title="Service Background"
                src={imageSrc}
                alt="Service Benefits"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 bg-[#f4e8e0]" />
            )}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}