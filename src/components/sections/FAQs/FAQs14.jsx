"use client";

import React, { useState } from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Contact14 from "@/components/sections/Contact/Contact14";

function PlusMinusIcon({ open }) {
  return (
    <span
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-neutral-500 text-neutral-700"
      aria-hidden
    >
      {open ? (
        <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="10" height="2" rx="1" fill="currentColor" />
        </svg>
      ) : (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5 1v8M1 5h8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </span>
  );
}

export default function FAQs14({ content }) {
  const faqsBlock = content?.faqs ?? {};
  const fromCms = Array.isArray(faqsBlock)
    ? faqsBlock
    : (faqsBlock?.items ?? faqsBlock?.value ?? []);
  const faqItems = Array.isArray(fromCms) ? fromCms : [];
  const rawTitle = faqsBlock?.title;
  const faqTitle =
    typeof rawTitle === "string" && rawTitle.trim() ? rawTitle.trim() : "Frequently Asked Questions";

  const [activeIndex, setActiveIndex] = useState(0);

  if (!faqItems.length) return null;

  return (
    <FullContainer className="bg-[#ffffff] py-10 md:py-16" id="faqs">
      <Container className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[55%_45%]">
          <div className="">
            <h2 className="font-montserrat text-3xl font-bold leading-tight text-neutral-900 md:text-[42px]">
              {faqTitle}
            </h2>
            <a
              href="#faq-contact-form"
              className="mt-5 inline-block rounded-md bg-[#6e625e] px-6 py-3 font-montserrat text-lg md:text-2xl font-bold uppercase tracking-wide text-white transition hover:brightness-95"
            >
              Ask a question
            </a>

            <div className="mt-7 space-y-2 border-neutral-300 font-barlow">
              {faqItems.map((faq, index) => {
                const q = faq?.question ?? faq?.q ?? "";
                const a = faq?.answer ?? faq?.a ?? "";
                const open = activeIndex === index;
                return (
                  <div
                    key={faq?.id ?? index}
                    className="overflow-hidden border p-2 rounded-md border-neutral-300"
                  >
                    <button
                      type="button"
                      id={`faq-btn-${index}`}
                      className="flex w-full items-start justify-between gap-4  text-left transition hover:bg-neutral-100/60"
                      onClick={() => setActiveIndex(open ? null : index)}
                      aria-expanded={open}
                      aria-controls={`faq-content-${index}`}
                    >
                      <span
                        className={`pr-3 font-montserrat text-[16px] leading-[1.2] text-neutral-900 md:text-[22px] font-semibold`}
                      >
                        {q}
                      </span>
                      <PlusMinusIcon open={open} />
                    </button>
                    <div
                      id={`faq-content-${index}`}
                      role="region"
                      aria-labelledby={`faq-btn-${index}`}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="pb-4 pr-8 pt-0">
                          <p className="text-[10px] leading-relaxed text-neutral-600 md:text-[12px]">{a}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="">
            <div
              id="faq-contact-form"
              className="w-full "
            >
              <Contact14 content={content} embedded />
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
