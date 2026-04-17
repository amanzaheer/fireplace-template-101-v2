"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { Rubik } from "next/font/google";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export default function FAQs6({ content }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqsBlock = content?.faqs ?? {};
  const faqItems = Array.isArray(faqsBlock)
    ? faqsBlock
    : (faqsBlock?.items ?? faqsBlock?.value ?? []);
  const faqTitle = faqsBlock?.title ?? "FAQs";

  if (!Array.isArray(faqItems) || faqItems.length === 0) return null;

  return (
    <FullContainer className="bg-white py-10 px-0  md:py-14" id="faqs">
      <Container className="px-2  max-w-5xl ">
          <div className={`${rubik.className} text-center font-bold text-5xl`}>
          <Heading
            text={faqTitle}
            className="pb-4 md:pb-12 color-black  text-5xl text-black-500"
          />
          <div className={`${rubik.className} mx-auto space-y-4 md:space-y-4 font-bold text-[20px]`}>
            {faqItems.map((faq, index) => (
              <div key={faq?.id ?? index}>
                <button
                  type="button"
                  id={`faq-btn-${index}`}
                  className={`${rubik.className} w-full text-left py-3.5 px-4 md:px-8 md:py-6 rounded-lg flex items-center justify-between gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary bg-[#F5F5F5] text-black text-[30px]`}
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-content-${index}`}
                >
                  <span className={`${rubik.className} font-bold text-[5px] md:text-xl pr-14`}>
                    {faq?.question ?? faq?.q ?? ""}
                  </span>
                  <span
                    className={cn(
                      `${rubik.className} shrink-0 text-black transition-transform duration-300`,
                      activeIndex === index && "rotate-180"
                    )}
                    aria-hidden
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </button>
                <div
                  id={`faq-content-${index}`}
                  role="region"
                  aria-labelledby={`faq-btn-${index}`}
                  className={cn(
                    "overflow-hidden transition-all duration-500 ease-in-out",
                    activeIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  )}
                >
                    <div className={`${rubik.className} bg-white p-4 border border-gray-200 border-t-0 rounded-b`}>
                    <p className={`${rubik.className} text-gray-900 text-start font-normal`}>
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
