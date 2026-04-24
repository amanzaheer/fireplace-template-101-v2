"use client";

import React, { useState } from "react";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal"],
});

/** Plus (collapsed) or horizontal bar (expanded) inside a thin circle — matches FAQ bar spec. */
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
export default function FAQs16({ content }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqsBlock = content?.faqs ?? {};
  const faqItems = Array.isArray(faqsBlock)
    ? faqsBlock
    : (faqsBlock?.items ?? faqsBlock?.value ?? []);
  const faqTitle = faqsBlock?.title ?? "FAQs";
  if (!Array.isArray(faqItems) || faqItems.length === 0) return null;
  return (
    <FullContainer className="bg-white py-8 md:py-12" id="faqs">
      <Container className="px-4 sm:px-6">
        <div className="mx-auto w-full max-w-[1109px]">
          <h2
            className={`${poppins.className} text-center text-[36px] font-medium leading-[53px] text-[#000000]`}
          >
            {faqTitle}
          </h2>

          <div className={`mt-8 flex flex-col gap-[26px] ${poppins.className}`}>
            {faqItems.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <div key={`faq-item-${index}`}>
                  <button
                    type="button"
                    id={`faq-button-${index}`}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 rounded-none border-0 py-4 pl-5 pr-4 text-left text-[18px] font-normal leading-[140%] transition-colors focus:outline-none focus-visible:outline `focus-visible:outline-2 focus-visible:outline-offset-2",
                      isOpen
                        ? "bg-[#01306E] text-white focus-visible:outline-white/70"
                        : "bg-[#E3E3E3] text-[#000000] focus-visible:outline-[#000000]/35",
                    )}
                    onClick={() =>
                      setActiveIndex(activeIndex === index ? null : index)
                    }
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${index}-content`}
                  >
                    <span className="min-w-0 flex-1 pr-2">
                      {faq?.question ?? faq?.q ?? ""}
                    </span>
                    <FaqToggleGlyph
                      open={isOpen}
                      className="h-7 w-7 shrink-0 text-current"
                    />
                  </button>
                  <div
                    id={`faq-content-${index}-content`}
                    role="region"
                    aria-labelledby={`faq-btn-${index}`}
                    className={cn(
                      "overflow-hidden border-x border-b border-[#E3E3E3] bg-[#E3E3E3] transition-all duration-300 ease-in-out",
                      isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    <div className="px-5 py-4 text-left text-[18px] font-normal leading-[140%] text-[#000000]">
                      <p>{faq?.answer ?? faq?.a ?? ""}</p>
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
