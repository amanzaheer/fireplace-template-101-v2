

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins } from "next/font/google";
import { IMAGE_BASE } from "@/lib/constants";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function FAQs13({ content }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqsBlock = content?.faqs ?? {};

  const faqItems = Array.isArray(faqsBlock)
    ? faqsBlock
    : faqsBlock?.items ?? faqsBlock?.value ?? [];

  const faqTitle = faqsBlock?.title ?? "FAQs";

  const imagePath = faqsBlock?.imagePath ?? IMAGE_BASE;
  const imageFile =
    faqsBlock?.image ?? faqsBlock?.file_name ?? faqsBlock?.image_file ?? "";

  const faqImageSrc = imageFile
    ? buildImageSrc(imagePath, imageFile)
    : "";

  if (!Array.isArray(faqItems) || faqItems.length === 0) return null;

  return (
    <FullContainer className="bg-[#f3e8ff] py-10 md:py-14" id="faqs">
      <Container className="px-4 sm:px-6">
        <div className={`mx-auto max-w-6xl ${poppins.className}`}>
          <h2 className="mb-6 text-center text-3xl font-extrabold tracking-tight text-black md:mb-8 md:text-4xl lg:mb-6 lg:text-5xl">
            {faqTitle}
          </h2>

          <div className="grid items-start gap-0 lg:grid-cols-[420px_1fr] lg:gap-x-3 xl:grid-cols-[460px_1fr]">
            {faqImageSrc ? (
              <div className="relative mx-auto flex w-full max-w-full items-center justify-center overflow-hidden rounded-2xl aspect-[4/5] md:max-w-md lg:mx-0 lg:h-[min(452px,48vh)] lg:w-full lg:aspect-auto">
                <Image
                  src={faqImageSrc}
                  alt={faqsBlock?.image_alt ?? "Customer support"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 45vw"
                />
              </div>
            ) : null}

            <div
              className={`min-w-0 w-full border-t border-black text-left ${
                !faqImageSrc ? "lg:col-span-2" : ""
              }`}
            >
              {faqItems.map((faq, index) => {
                const isOpen = activeIndex === index;
                const question = faq?.question ?? faq?.q ?? "";
                const answer = faq?.answer ?? faq?.a ?? "";

                return (
                  <div
                    key={faq?.id ?? index}
                    className="border-b border-black"
                  >
                    {isOpen ? (
                      <div className="my-2 rounded-xl bg-[#4B2475] p-4 shadow-md sm:my-3 sm:p-5 md:my-4 md:p-8">
                        <button
                          type="button"
                          id={`faq-btn-${index}`}
                          className="flex w-full min-h-[44px] items-start justify-between gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#4B2475] sm:gap-4"
                          onClick={() => setActiveIndex(null)}
                          aria-expanded={true}
                          aria-controls={`faq-content-${index}`}
                        >
                          <span className="min-w-0 flex-1 text-base font-bold leading-snug text-white sm:text-lg md:text-xl">
                            {question}
                          </span>

                          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white text-white">
                            <Minus className="h-4 w-4" strokeWidth={2.5} />
                          </span>
                        </button>

                        <div
                          id={`faq-content-${index}`}
                          role="region"
                          aria-labelledby={`faq-btn-${index}`}
                          className="mt-3 border-t border-white/25 pt-3 text-sm font-normal leading-relaxed text-white/95 sm:mt-4 sm:pt-4 sm:text-base md:text-[17px]"
                        >
                          {answer}
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        id={`faq-btn-${index}`}
                        className="flex min-h-[48px] w-full items-start justify-between gap-3 bg-transparent py-4 text-left text-black transition-colors hover:bg-black/3 sm:gap-4 sm:py-5 md:py-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4B2475] focus-visible:ring-offset-2"
                        onClick={() => setActiveIndex(index)}
                        aria-expanded={false}
                        aria-controls={`faq-content-${index}`}
                      >
                        <span className="min-w-0 flex-1 text-left text-base font-bold leading-snug text-shadow-[0_2px_4px_rgba(0,0,0,0.06)] sm:text-lg md:text-xl">
                          {question}
                        </span>

                        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-black text-black">
                          <Plus className="h-4 w-4" strokeWidth={2.5} />
                        </span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}

