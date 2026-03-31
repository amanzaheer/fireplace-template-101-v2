"use client";

import React, { useState } from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";

export default function FAQs5({ content }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqsBlock = content?.faqs ?? {};
  const faqItems = Array.isArray(faqsBlock) ? faqsBlock : (faqsBlock?.items ?? faqsBlock?.value ?? []);
  const faqTitle = faqsBlock?.title ?? "FAQs";

  if (!Array.isArray(faqItems) || faqItems.length === 0) return null;

  return (
    <FullContainer className="py-4" id="faqs">
      <Container className="px-4">
        <div className="text-center">
          <Heading text={faqTitle} className="pb-6 text-black" />
          <div className="mx-auto font-barlow text-[16px]">
            {faqItems.map((faq, index) => (
              <div key={faq?.id ?? index} className="mb-2">
                <button
                  type="button"
                  id={`faq-btn-${index}`}
                  className={`w-full text-left py-4 px-5 rounded-lg flex items-center focus:outline-none bg-[#d95411] hover:bg-[#b8470e] text-white transition-colors`}
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-content-${index}`}
                >
                  <span className="flex-shrink-0 mr-3 text-lg text-white">
                    {activeIndex === index ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    )}
                  </span>
                  <span className="font-thin">{faq?.question ?? faq?.q ?? ""}</span>
                </button>
                <div
                  id={`faq-content-${index}`}
                  role="region"
                  aria-labelledby={`faq-btn-${index}`}
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    activeIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="bg-white p-5 border border-[#e8c990] border-t-0 rounded-b">
                    <p className="text-gray-900 text-start">{faq?.answer ?? faq?.a ?? ""}</p>
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