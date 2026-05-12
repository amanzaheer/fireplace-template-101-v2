"use client";

import React, { useState } from "react";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});

const CTA_ORANGE = "#F0520E";

/** Plus (collapsed) or minus (expanded) in a thin circle. */
function FaqToggleGlyph({ open, className }) {
  return (
    <svg
      className={className}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth={1.5}
        fill="none"
      />
      {open ? (
        <line
          x1="7"
          y1="12"
          x2="17"
          y2="12"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
        />
      ) : (
        <>
          <line
            x1="12"
            y1="7"
            x2="12"
            y2="17"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
          />
          <line
            x1="7"
            y1="12"
            x2="17"
            y2="12"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

export default function FAQs21({ content }) {
  const faqsBlock = content?.faqs ?? {};
  const faqItems = Array.isArray(faqsBlock)
    ? faqsBlock
    : (faqsBlock?.items ?? faqsBlock?.value ?? []);

  const defaultOpenRaw =
    Array.isArray(faqsBlock) ? null : faqsBlock?.default_open_index;
  const initialOpen =
    typeof defaultOpenRaw === "number" &&
    defaultOpenRaw >= 0 &&
    defaultOpenRaw < faqItems.length
      ? defaultOpenRaw
      : null;

  const [activeIndex, setActiveIndex] = useState(initialOpen);

  const faqTitle = faqsBlock?.title ?? "FAQs";
  const introText =
    faqsBlock?.description ??
    faqsBlock?.subtitle ??
    faqsBlock?.intro ??
    "";
  const ctaLabel =
    faqsBlock?.cta_label ??
    faqsBlock?.cta_text ??
    faqsBlock?.button_text ??
    "";
  const ctaHref =
    faqsBlock?.cta_href ??
    faqsBlock?.cta_url ??
    faqsBlock?.button_link ??
    faqsBlock?.button_url ??
    "";

  if (!Array.isArray(faqItems) || faqItems.length === 0) return null;

  return (
    <FullContainer className="bg-[#ffffff] py-10 md:py-14 lg:py-16" id="faqs">
      <Container className="px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-6 xl:gap-8",
            poppins.className,
          )}
        >
          {/* Left: heading + support card */}
          <div className="flex min-w-0 flex-col gap-5 lg:gap-6">
            <h2 className={`${poppins.className} max-w-[520px] pb-0 text-[58px] font-medium leading-[1.08] tracking-[0] capitalize text-black`}>
              {faqTitle}
            </h2>
            <div className="-mt-1 w-full max-w-[520px] rounded-2xl bg-[#e7e8ed] p-6 md:p-8 lg:-mt-2">
              {introText ? (
                <p className="text-[17px] font-normal leading-relaxed text-[#2a2a2a] md:text-[19px]">
                  {introText}
                </p>
              ) : null}
              {ctaLabel && ctaHref ? (
                <a
                  href={ctaHref}
                  className="mt-7 inline-flex min-h-[52px] w-fit items-center justify-center rounded-xl px-9 py-3 text-[22px] font-bold uppercase leading-none text-white transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F86503]/40 focus-visible:ring-offset-2"
                  style={{
                    backgroundColor: CTA_ORANGE,
                    outlineColor: CTA_ORANGE,
                  }}
                >
                  {ctaLabel}
                </a>
              ) : null}
            </div>
          </div>

          {/* Right: accordion */}
          <div className="flex min-w-0 flex-col gap-2.5 md:gap-3">
            {faqItems.map((faq, index) => {
              const isOpen = activeIndex === index;
              const question = faq?.question ?? faq?.q ?? "";
              const answer = faq?.answer ?? faq?.a ?? "";

              return (
                <div
                  key={faq?.id ?? `faq-item-${index}`}
                  className="overflow-hidden rounded-xl border border-[#e3e3e3] bg-[#e7e8ed]"
                >
                  <button
                    type="button"
                    id={`faq-button-${index}`}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 md:px-5 md:py-[16px]",
                      isOpen ? "bg-[#e7e8ed]" : "bg-[#e7e8ed]",
                    )}
                    onClick={() =>
                      setActiveIndex(activeIndex === index ? null : index)
                    }
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${index}-content`}
                  >
                    <span
                      className={`${poppins.className} min-w-0 flex-1 pr-2 text-[20px] font-semibold leading-[140%] tracking-[0] text-[#111]`}
                    >
                      {question}
                    </span>
                    <FaqToggleGlyph
                      open={isOpen}
                      className="h-6 w-6 shrink-0 text-black"
                    />
                  </button>
                  <div
                    id={`faq-content-${index}-content`}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                    className={cn(
                      "border-t border-[#d8d9de] bg-[#e7e8ed] transition-all duration-300 ease-in-out",
                      isOpen
                        ? "max-h-[800px] opacity-100"
                        : "max-h-0 overflow-hidden border-t-0 opacity-0",
                    )}
                  >
                    <div className="px-4 pb-6 pt-3 text-left text-[17px] font-normal leading-[1.45] text-[#2f2f2f] md:px-5 md:text-[18px]">
                      <p>{answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
