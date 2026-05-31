"use client";

import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";

export default function FAQs18({ content }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqsBlock = content?.faqs ?? {};
  const faqItems = Array.isArray(faqsBlock)
    ? faqsBlock
    : (faqsBlock?.items ?? faqsBlock?.value ?? []);
  const faqTitle =
    faqsBlock?.title ?? "Frequently Asked Questions";
  const faqSubTitle = faqsBlock?.description ?? "";

  if (!Array.isArray(faqItems) || faqItems.length === 0) return null;

  return (
    <FullContainer className="bg-black py-10 md:py-14 lg:py-16" id="faqs">
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-montserrat text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
            {faqTitle}
          </h2>
          {faqSubTitle ? (
            <p className="mx-auto mt-3 max-w-3xl text-center font-barlow text-sm leading-relaxed text-white/85 md:mt-4 md:text-base">
              {faqSubTitle}
            </p>
          ) : null}

          <div
            className={cn(
              "mt-8 grid grid-cols-1 gap-3 sm:gap-4 md:mt-10 md:grid-cols-2 md:gap-4 lg:gap-5",
              faqSubTitle ? "md:mt-10" : "md:mt-12",
            )}
          >
            {faqItems.map((faq, index) => {
              const isOpen = activeIndex === index;
              const question = faq?.question ?? faq?.q ?? "";
              const answer = faq?.answer ?? faq?.a ?? "";

              return (
                <div key={faq?.id ?? index} className="min-w-0">
                  {isOpen ? (
                    <div className="rounded-xl bg-white px-4 py-4 shadow-sm sm:px-5 sm:py-5">
                      <button
                        type="button"
                        id={`faq-btn-${index}`}
                        className="flex w-full items-center justify-between gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0011] focus-visible:ring-offset-2"
                        onClick={() => setActiveIndex(null)}
                        aria-expanded={true}
                        aria-controls={`faq-content-${index}`}
                      >
                        <span className="min-w-0 flex-1 pr-2 text-left text-sm font-semibold leading-snug text-black sm:text-base md:text-[17px]">
                          {question}
                        </span>
                        <span
                          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-black text-black sm:h-8 sm:w-8"
                          aria-hidden
                        >
                          <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.5} />
                        </span>
                      </button>
                      {answer ? (
                        <div
                          id={`faq-content-${index}`}
                          role="region"
                          aria-labelledby={`faq-btn-${index}`}
                          className="mt-3 border-t border-black/10 pt-3 text-left text-sm leading-relaxed text-black/85 sm:text-[15px]"
                        >
                          {answer}
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <button
                      type="button"
                      id={`faq-btn-${index}`}
                      className="flex min-h-[52px] w-full items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 text-left text-black shadow-sm transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0011] focus-visible:ring-offset-2 sm:min-h-[56px] sm:px-5 sm:py-4"
                      onClick={() => setActiveIndex(index)}
                      aria-expanded={false}
                      aria-controls={`faq-content-${index}`}
                    >
                      <span className="min-w-0 flex-1 pr-2 text-sm font-semibold leading-snug sm:text-base md:text-[17px]">
                        {question}
                      </span>
                      <span
                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-black text-black sm:h-8 sm:w-8"
                        aria-hidden
                      >
                        <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.5} />
                      </span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
