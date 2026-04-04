"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone, TextQuote } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { IMAGE_BASE } from "@/lib/constants";
import { cn } from "@/lib/utils";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function ServiceBenefits8({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.service_benefits ?? {};
  const heading = block.heading ?? "";
  const list = Array.isArray(block.list) ? block.list : [];
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);

  const handleQuoteClick = () => {
    if (typeof window === "undefined") return;
    const el =
      document.getElementById("quote-form-section") ??
      document.querySelector('.quote-form, [id*="quote"], [class*="quote-form"]');

    if (el) {
      const offset = 80;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - offset,
        behavior: "smooth",
      });
    }
  };

  if (list.length === 0) return null;

  /** Same footprint for phone + quote (aligned pair); vivid orange like Navbar / promos. */
  const ctaButtonClass =
    "flex h-12 w-[205px] shrink-0 items-center justify-center gap-2 rounded-full bg-[#ff6600] px-3 text-sm font-semibold text-white shadow transition-colors hover:bg-[#e65c00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6600]";

  return (
    <FullContainer id="service_benefits" className="py-0 md:py-8 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:w-[111%] rounded-md relative bg-blue-500 h-full overflow-hidden min-h-[200px] md:min-h-[320px]">
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
              <div className="absolute inset-0 bg-blue-200" />
            )}
          </div>
          <div className="px-4 md:px-10 py-8 flex flex-col gap-4 rounded-2xl shadow-[0_0_5px_rgba(0,0,0,0.5)] bg-white z-10 my-7">
            {heading ? (
              <Heading text={heading} className="text-center md:text-start" />
            ) : null}
            <div className="flex flex-row items-center justify-center md:justify-start">
              <div className="flex flex-col w-fit space-y-[6px]">
                {list.map((benefit, index) => (
                  <div key={index} className="flex px-4 items-start">
                    <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 stroke-[4] mt-1" />
                    <span className="ml-2 text-xl font-barlow text-blue-900">
                      {typeof benefit === "object" ? benefit?.title : benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full gap-2 justify-start hidden md:flex flex-col lg:flex-row items-start lg:items-center lg:gap-4">
              <Link href={`tel:${phone}`} className="inline-flex">
                <button type="button" className={ctaButtonClass}>
                  <Phone className="h-5 w-5 shrink-0" strokeWidth={2} />
                  <span className="min-w-0 truncate">{phone}</span>
                </button>
              </Link>
              <button
                type="button"
                onClick={handleQuoteClick}
                className={cn(ctaButtonClass, "uppercase tracking-wide")}
              >
                <TextQuote className="h-5 w-5 shrink-0" strokeWidth={2} />
                <span>Get a quote</span>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
