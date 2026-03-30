"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Rubik } from "next/font/google";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function FAQs3({ content }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const faqsBlock = content?.faqs ?? {};
  const faqItems = Array.isArray(faqsBlock)
    ? faqsBlock
    : (faqsBlock?.items ?? faqsBlock?.value ?? []);
  const faqTitle = faqsBlock?.title ?? "FAQs";
  const faqSubTitle =
    faqsBlock?.description ??
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquams.";

  if (!Array.isArray(faqItems) || faqItems.length === 0) return null;

  return (
    <FullContainer className="py-10 md:py-14 bg-[#efefef]" id="faqs">
      <Container className="px-4">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className={`${rubik.className} text-center text-3xl md:text-[44px] font-bold text-[#212020] tracking-tight`}>
            {faqTitle}
          </h2>
          <p className={`${rubik.className} mt-3 mb-8 md:mb-10 text-[#6b7280] text-sm md:text-base max-w-2xl mx-auto leading-relaxed`}>
            {faqSubTitle}
          </p>

          <div className="w-full">
            {faqItems.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <div key={faq?.id ?? index} className="mb-4">
                  <button
                    type="button"
                    id={`faq-btn-${index}`}
                    className={`w-full text-left py-4 md:py-5 px-6 md:px-8 rounded-[20px] flex items-start justify-between transition-colors duration-200 focus:outline-none ${
                      isOpen
                        ? "bg-[#f3a73b] text-[#212020]"
                        : "bg-[#1f2126] text-white hover:bg-[#2b2d33]"
                    }`}
                    onClick={() =>
                      setActiveIndex(activeIndex === index ? null : index)
                    }
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${index}`}
                  >
                    <div className="pr-4">
                      <span className="font-bold text-xl md:text-2xl block">
                        {faq?.question ?? faq?.q ?? ""}
                      </span>
                      {isOpen ? (
                        <div className="mt-3 pt-3 border-t border-white/70 text-start">
                          <p className="text-[#212020] text-sm md:text-base leading-relaxed">
                            {faq?.answer ?? faq?.a ?? ""}
                          </p>
                        </div>
                      ) : null}
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 min-w-6 mt-0.5 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    id={`faq-content-${index}`}
                    role="region"
                    aria-labelledby={`faq-btn-${index}`}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-0 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
