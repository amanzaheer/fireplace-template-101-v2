"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Poppins, Montserrat, Inter } from "next/font/google";

import FullContainer from "@/components/common/FullContainer";

import { IMAGE_BASE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const FAQS_GRADIENT = "linear-gradient(180deg, #BF1309 0%, #131314 100%)";

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

export default function FAQs26({ content }) {
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
      className={poppins.className}
      style={{ background: FAQS_GRADIENT }}
    >
      <div className="mx-auto flex w-full max-w-[1530px] flex-col items-start gap-8 px-4 py-10 sm:gap-10 sm:px-6 md:px-8 lg:flex-row lg:gap-[55px] lg:px-[170px] lg:py-[88px]">
          {/* LEFT SIDE */}
          <div className="flex min-w-0 w-full flex-col gap-6 lg:mt-8 lg:max-w-[380px] lg:shrink-0 xl:mt-10">
            
            {leftHeading ? (
              <h2
                className={cn(
                  inter.className,
                  "max-w-[350px] text-[24px] font-bold leading-[100%] tracking-normal text-white sm:text-[28px] md:text-[30px]",
                )}
              >
                {leftHeading}
              </h2>
            ) : null}

            {imageSrc ? (
              <div className="relative mx-auto aspect-[4/3] h-[240px] w-full max-w-[320px] overflow-hidden border-[6px] border-white sm:h-[300px] sm:max-w-[363px] sm:border-[8px] lg:mx-0 lg:h-[340px] lg:max-w-none">
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
          <div className="min-w-0 w-full flex-1 lg:mt-8 xl:mt-10">
            
            {faqTitle ? (
              <h3 className={`mb-6 max-w-[715px] font-montserrat text-[28px] font-bold leading-[127%] tracking-normal text-white sm:text-[32px] md:mb-8 md:text-[36px] ${montserrat.className}`}>
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
                      className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#131314] md:py-5"
                      onClick={() =>
                        setActiveIndex(
                          activeIndex === index ? null : index
                        )
                      }
                      aria-expanded={isOpen}
                      aria-controls={`faq-content-${index}`}
                    >
                      <span
                        className={cn(
                          montserrat.className,
                          "min-w-0 max-w-[463px] flex-1 pr-2 text-[18px] font-semibold leading-[140%] tracking-normal text-white sm:text-[20px]",
                        )}
                      >
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
                          <p
                            className={cn(
                              montserrat.className,
                              "max-w-[492px] text-[16px] font-normal leading-[160%] tracking-normal text-white",
                            )}
                          >
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
    </FullContainer>
  );
}