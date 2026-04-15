"use client";

import React, { useState } from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Contact14 from "@/components/sections/Contact/Contact14";

function PlusMinusIcon({ open }) {
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-neutral-600"
      aria-hidden
    >
      {open ? (
        <svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="14" height="2" rx="1" fill="currentColor" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 1v12M1 7h12"
            stroke="currentColor"
            strokeWidth="2"
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
    typeof rawTitle === "string" && rawTitle.trim() ? rawTitle.trim() : "FAQs";

  const [activeIndex, setActiveIndex] = useState(0);

  if (!faqItems.length) return null;

  return (
    <FullContainer className="bg-[#1C1C1C] py-10 md:py-16" id="faqs">
      <Container className="px-4">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="lg:col-span-7">
            <h2 className="font-montserrat text-3xl font-bold leading-tight text-[#F59402] md:text-4xl">
              {faqTitle}
            </h2>
            <a
              href="#faq-contact-form"
              className="mt-5 inline-block rounded-lg bg-[#F59402] px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:brightness-95"
            >
              Ask a question
            </a>

            <div className="mt-8 flex flex-col gap-3 font-barlow">
              {faqItems.map((faq, index) => {
                const q = faq?.question ?? faq?.q ?? "";
                const a = faq?.answer ?? faq?.a ?? "";
                const open = activeIndex === index;
                return (
                  <div
                    key={faq?.id ?? index}
                    className="overflow-hidden rounded-lg border border-neutral-300 bg-white shadow-sm"
                  >
                    <button
                      type="button"
                      id={`faq-btn-${index}`}
                      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-neutral-50 md:px-5"
                      onClick={() => setActiveIndex(open ? null : index)}
                      aria-expanded={open}
                      aria-controls={`faq-content-${index}`}
                    >
                      <span
                        className={`text-[15px] text-neutral-900 md:text-base ${open ? "font-bold" : "font-medium"}`}
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
                        <div className="border-t border-neutral-200 px-4 pb-4 pt-0 md:px-5 md:pb-5">
                          <p className="pt-3 text-sm leading-relaxed text-neutral-600 md:text-[15px]">{a}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              id="faq-contact-form"
              className="lg:sticky lg:top-24"
            >
              <Contact14 content={content} embedded />
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
