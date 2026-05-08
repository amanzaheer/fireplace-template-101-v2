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
 
const ROW_BLUE = "";
const CTA_RED = "#c41e3a";
const OPEN_QUESTION = "#cc3333";
 
/** Plus (collapsed) or minus (expanded) in a thin circle. */
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
        r="11"
        stroke="currentColor"
        strokeWidth={1}
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
            y1="9"
            x2="14"
            y2="19"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <line
            x1="9"
            y1="14"
            x2="19"
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
 
export default function FAQs19({ content }) {
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
    <FullContainer className="bg-white py-10 md:py-14 lg:py-20 " id="faqs">
      <Container className="px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16",
            poppins.className,
          )}
        >
          {/* Left: intro + CTA */}
          <div className="flex min-w-0 w-full flex-col items-start text-start lg:max-w-lg lg:justify-self-start lg:self-start xl:max-w-xl mt-14">
            <h2 className="w-full text-start text-3xl font-extrabold leading-tight tracking-tight text-black md:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
              {faqTitle}
            </h2>
            {introText ? (
              <p className="mt-4 w-full max-w-lg text-start text-base font-normal leading-relaxed text-black md:text-[20px]">
                {introText}
              </p>
            ) : null}
            {ctaLabel && ctaHref ? (
              <a
                href={ctaHref}
                className="mt-8 inline-flex min-h-[48px] w-fit items-center justify-center  rounded px-10 py-3 text-[27px] font-bold uppercase tracking-wide text-white transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  backgroundColor: CTA_RED,
                  outlineColor: CTA_RED,
                }}
              >
                {ctaLabel}
              </a>
            ) : null}
          </div>
 
          {/* Right: accordion */}
          <div className="flex min-w-0 flex-col gap-3 md:gap-3.5">
            {faqItems.map((faq, index) => {
              const isOpen = activeIndex === index;
              const question = faq?.question ?? faq?.q ?? "";
              const answer = faq?.answer ?? faq?.a ?? "";
 
              return (
                <div
                  key={faq?.id ?? `faq-item-${index}`}
                  className="overflow-hidden rounded-md border border-[#e0e0e0] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                >
                  <button
                    type="button"
                    id={`faq-button-${index}`}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[]/40 focus-visible:ring-offset-2 md:px-6 md:py-[20px]",
                      isOpen ? "bg-white" : "text-black",
                    )}
                    style={!isOpen ? { backgroundColor: ROW_BLUE } : undefined}
                    onClick={() =>
                      setActiveIndex(activeIndex === index ? null : index)
                    }
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${index}-content`}
                  >
                    <span
                      className={cn(
                        "min-w-0 flex-1 pr-2 text-[18px] font-semibold leading-snug",
                        poppins.className,
                      )}
                      style={isOpen ? { color: OPEN_QUESTION } : undefined}
                    >
                      {question}
                    </span>
                    <FaqToggleGlyph
                      open={isOpen}
                      className={cn(
                        "h-7 w-7 shrink-0",
                        isOpen ? "text-black" : "text-black",
                      )}
                    />
                  </button>
                  <div
                    id={`faq-content-${index}-content`}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                    className={cn(
                      "border-t border-[#e8e8e8] bg-white transition-all duration-300 ease-in-out",
                      isOpen
                        ? "max-h-[800px] opacity-100"
                        : "max-h-0 overflow-hidden border-t-0 opacity-0",
                    )}
                  >
                    <div className="px-5 py-4 text-left text-[18px] font-normal leading-[1.65] text-black md:px-6 md:leading-7">
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