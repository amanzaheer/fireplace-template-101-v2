"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";

import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

import { IMAGE_BASE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});

const SECTION_BG = "#0483B2";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";

  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");

  return `${basePath}/${segment}`;
}

/* FAQ ICON */
function FaqToggleGlyph({ open, className }) {
  return (
    <svg
      className={className}
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle
        cx="14"
        cy="14"
        r="12"
        stroke="currentColor"
        strokeWidth={1.5}
        fill="none"
      />

      {open ? (
        <line
          x1="8"
          y1="14"
          x2="20"
          y2="14"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
      ) : (
        <>
          <line
            x1="14"
            y1="8"
            x2="14"
            y2="20"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <line
            x1="8"
            y1="14"
            x2="20"
            y2="14"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

export default function FAQs23({ content }) {
  const [activeIndex, setActiveIndex] = useState(null);

  /* FAQ DATA */
  const faqsBlock = content?.faqs ?? {};

  const faqItems = Array.isArray(faqsBlock)
    ? faqsBlock
    : (faqsBlock?.items ?? faqsBlock?.value ?? []);

  const faqTitle = faqsBlock?.title ?? "FAQs";

  /* LEFT HEADING */
  const leftHeading =
    typeof faqsBlock?.description === "string"
      ? faqsBlock.description.trim()
      : typeof faqsBlock?.subtitle === "string"
        ? faqsBlock.subtitle.trim()
        : "";

  /* IMAGE */
  const imagePath =
    (typeof faqsBlock?.side_image === "string" &&
      faqsBlock.side_image.trim()) ||
    (typeof faqsBlock?.file_name === "string" &&
      faqsBlock.file_name.trim()) ||
    (typeof faqsBlock?.filename2 === "string" &&
      faqsBlock.filename2.trim()) ||
    (typeof faqsBlock?.image === "string" &&
      faqsBlock.image.trim()) ||
    "";

  const imageAlt =
    (typeof faqsBlock?.side_image_alt === "string" &&
      faqsBlock.side_image_alt.trim()) ||
    (typeof faqsBlock?.image_alt === "string" &&
      faqsBlock.image_alt.trim()) ||
    leftHeading ||
    faqTitle ||
    "";

  const imageSrc = imagePath
    ? buildImageSrc(IMAGE_BASE, imagePath)
    : "";

  if (!Array.isArray(faqItems) || faqItems.length === 0) return null;

  return (
    <FullContainer
      id="faqs"
      className={cn(
        "py-10 md:py-14 lg:py-16",
        poppins.className
      )}
      style={{ backgroundColor: SECTION_BG }}
    >
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)] xl:gap-14">
          
          {/* LEFT SIDE */}
          <div className="flex min-w-0 flex-col gap-6">
            
            {leftHeading ? (
              <h2 className="text-xl font-bold leading-snug text-white sm:text-2xl md:text-[26px] md:leading-[1.25]">
                {leftHeading}
              </h2>
            ) : null}

            {imageSrc ? (
              <div className="relative aspect-[4/3] w-full h-[340px] max-w-[363px] overflow-hidden border-[8px] border-white lg:max-w-none">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  unoptimized
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 90vw, 380px"
                  loading="lazy"
                />
              </div>
            ) : null}
          </div>

          {/* RIGHT SIDE */}
          <div className="min-w-0">
            
            {faqTitle ? (
              <h3 className="mb-6 text-2xl font-bold leading-tight text-white sm:text-3xl md:mb-8 md:text-[34px] lg:text-[36px]">
                {faqTitle}
              </h3>
            ) : null}

            <div className="border-t border-white/35">
              {faqItems.map((faq, index) => {
                const isOpen = activeIndex === index;

                return (
                  <div
                    key={faq?.id ?? index}
                    className="border-b border-white/35"
                  >
                    {/* QUESTION */}
                    <button
                      type="button"
                      id={`faq-btn-${index}`}
                      className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0483B2] md:py-5"
                      onClick={() =>
                        setActiveIndex(
                          activeIndex === index ? null : index
                        )
                      }
                      aria-expanded={isOpen}
                      aria-controls={`faq-content-${index}`}
                    >
                      <span className="min-w-0 flex-1 pr-2 text-base font-semibold leading-snug text-white sm:text-lg md:text-xl">
                        {faq?.question ?? faq?.q ?? ""}
                      </span>

                      <FaqToggleGlyph
                        open={isOpen}
                        className="h-7 w-7 shrink-0 text-white"
                      />
                    </button>

                    {/* ANSWER */}
                    <div
                      id={`faq-content-${index}`}
                      role="region"
                      aria-labelledby={`faq-btn-${index}`}
                      className={cn(
                        "grid transition-all duration-300 ease-out",
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="pb-5 pr-2 md:pb-6">
                          <p className="text-sm leading-relaxed text-white/95 sm:text-base">
                            {faq?.answer ?? faq?.a ?? ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}