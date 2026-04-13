"use client";

import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function FAQs10({ content }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqsBlock = content?.faqs ?? {};
  const faqItems = Array.isArray(faqsBlock)
    ? faqsBlock
    : (faqsBlock?.items ?? faqsBlock?.value ?? []);
  const faqTitle = faqsBlock?.title ?? "FAQs";
  

  if (!Array.isArray(faqItems) || faqItems.length === 0) return null;

  return (
    <FullContainer className="py-10 md:py-14 bg-white" id="faqs">
      <Container className="px-4">
        <div className={`mx-auto max-w-5xl text-center ${poppins.className}`}>
          <h2 className="text-3xl md:text-5xl mb-4 font-extrabold text-[#212020] tracking-tight">
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
                        ? " border-2 text-black"
                        : "border-2 text-[#2d2d2d] hover:bg-[]"
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
                          <p className="text-black text-sm md:text-base leading-relaxed">
                            {faq?.answer ?? faq?.a ?? ""}
                          </p>
                        </div>
                      ) : null}
                    </div>
                    <span className="mt-0.5 inline-flex h-10 w-10 min-w-10 items-center justify-center rounded-full border-2 border-black text-black">
                      {isOpen ? (
                        <Minus className="h-5 w-5" />
                      ) : (
                        <Plus className="h-5 w-5" />
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
