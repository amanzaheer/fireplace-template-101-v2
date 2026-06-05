"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins, Inter, Rubik } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const rubik = Rubik({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});
export default function FAQs30({ content }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqsBlock = content?.faqs ?? {};
  const faqItems = Array.isArray(faqsBlock)
    ? faqsBlock
    : (faqsBlock?.items ?? faqsBlock?.value ?? []);
  const faqTitle = faqsBlock?.title ?? "FAQs";
  const faqSubTitle =
    faqsBlock?.description ??
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  if (!Array.isArray(faqItems) || faqItems.length === 0) return null;

  return (
    <FullContainer className="py-8 md:py-14 bg-white" id="faqs">
      <Container className="px-4">
        <div className="text-center max-w-5xl mx-auto">
          <h2 className={`${rubik.className} text-center text-3xl md:text-[44px] font-bold text-ink tracking-tight mb-8 md:mb-10`}>
            {faqTitle}
          </h2>
          <p className={`${rubik.className} mt-3 mb-8 md:mb-10 text-[14px] md:text-[16px] leading-relaxed text-[#000000] max-w-2xl mx-auto`}>
            {faqSubTitle}
          </p>
          <div className="mx-auto w-full max-w-3xl text-[16px]">
            {faqItems.map((faq, index) => (
              <div key={faq?.id ?? index} className="mb-4">
                <button
                  type="button"
                  id={`faq-btn-${index}`}
                  className="w-full text-left py-4 md:py-5 px-6 md:px-8 rounded-full flex items-center justify-between bg-[#f5f5f5] text-ink hover:bg-[#eeeeee] transition-colors duration-200 focus:outline-none"
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-content-${index}`}
                >
                  <span className={`${rubik.className} font-bold text-[16px] md:text-[20px] text-left`}>
                    {faq?.question ?? faq?.q ?? ""}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 min-w-6 text-ink transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  id={`faq-content-${index}`}
                  role="region"
                  aria-labelledby={`faq-btn-${index}`}
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="bg-white px-6 py-4 border border-[#e5e7eb] rounded-2xl">
                    <p className={`${rubik.className} text-[14px] md:text-[16px] leading-relaxed text-[#000000] text-left`}>
                      {faq?.answer ?? faq?.a ?? ""}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
