"use client";

import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function FAQs12({ content }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqsBlock = content?.faqs ?? {};
  const faqItems = Array.isArray(faqsBlock)
    ? faqsBlock
    : (faqsBlock?.items ?? faqsBlock?.value ?? []);
  const faqTitle = faqsBlock?.title ?? "FAQs";
  

  if (!Array.isArray(faqItems) || faqItems.length === 0) return null;

  return (
    <FullContainer className="py-10 md:py-14 bg-[#da4909]" id="faqs">
      <Container className="px-4">
      <div className={`mx-auto max-w-5xl text-center ${montserrat.className}`}>
          <h2 className="text-3xl md:text-5xl mb-4 font-extrabold [text-shadow:0_2px_4px_rgba(0,0,0,0.4)] text-white tracking-tight">
            {faqTitle}
          </h2>

            <div className="w-full">
            {faqItems.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <div key={faq?.id ?? index} className="mb-4">
                  <button
                    type="button"
                    id={`faq-btn-${index}`}
                    className={`w-full text-left py-3 md:py-3.5 px-6 md:px-8 rounded flex items-start justify-between transition-colors duration-200 focus:outline-none ${
                      isOpen
                        ? " border-t text-white"
                        : "border-t text-white hover:cursor-pointer"
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
                          <p className="text-white text-sm md:text-base leading-relaxed">
                            {faq?.answer ?? faq?.a ?? ""}
                          </p>
                        </div>
                      ) : null}
                    </div>
                    <span className="mt-0.5 inline-flex h-5 w-5 min-w-5 items-center justify-center rounded-full border-2 border-white text-white">
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
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
