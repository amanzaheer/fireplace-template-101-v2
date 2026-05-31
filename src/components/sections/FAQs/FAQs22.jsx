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

export default function FAQs22({ content }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqsBlock = content?.faqs ?? {};

  const faqItems = Array.isArray(faqsBlock)
    ? faqsBlock
    : (faqsBlock?.items ?? faqsBlock?.value ?? []);

  const faqTitle = faqsBlock?.title ?? "FAQs";
  const faqDescription =
    faqsBlock?.description ??
    "Our technicians know every inch of your system and have years of hands-on experience in spotting problem areas and faulty components.";

  const imageFile =
    faqsBlock?.file_name ??
    faqsBlock?.image_file ??
    "";

  const faqImageSrc = imageFile ? buildImageSrc(IMAGE_BASE, imageFile) : "";
  const useUnoptimized =
    faqImageSrc.startsWith("/api/") ||
    faqImageSrc.startsWith("http://") ||
    faqImageSrc.startsWith("https://");

  if (!Array.isArray(faqItems) || faqItems.length === 0) return null;

  return (
    <FullContainer className="bg-white py-10 md:py-14" id="faqs">
      <Container className="px-4 sm:px-6">
        <div className={`mx-auto max-w-6xl ${poppins.className}`}>
          <div className="grid items-center gap-10 lg:grid-cols-[430px_1fr] lg:gap-10">
            <div>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-black md:text-4xl">
                {faqTitle}
              </h2>

              {faqImageSrc ? (
                <div className="relative mt-5 h-[224px] aspect-16/10 w-full overflow-hidden  rounded-[28px]">
                  <Image
                    src={faqImageSrc}
                    alt={faqsBlock?.image_alt ?? faqsBlock?.side_image_alt ?? "Customer support"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 430px"
                    unoptimized={useUnoptimized}
                  />

                  <div className="pointer-events-none absolute left-3 top-20 z-10 -translate-y-1/2  sm:left-5 md:left-6">
                    <svg
                      width="92"
                      height="92"
                      viewBox="0 0 92 92"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="92"
                        height="92"
                        rx="12.3008"
                        fill="#F0520E"
                      />
                      <path
                        d="M46.0004 10.7632C26.585 10.7632 10.7637 26.5845 10.7637 46V63.6183C10.7637 65.5564 12.3493 67.142 14.2873 67.142H24.8584C26.7964 67.142 28.3821 65.5564 28.3821 63.6183V46C28.3821 44.0619 26.7964 42.4763 24.8584 42.4763H18.0577C19.7843 28.593 31.6591 17.8105 46.0004 17.8105C60.3418 17.8105 72.2166 28.593 73.9432 42.4763H67.1425C65.2045 42.4763 63.6188 44.0619 63.6188 46V63.6183C63.6188 65.5564 65.2045 67.142 67.1425 67.142H74.1898V70.6657C74.1898 72.6037 72.6042 74.1894 70.6662 74.1894H56.5715C56.5715 72.2513 54.9858 70.6657 53.0478 70.6657H38.9531C37.0151 70.6657 35.4294 72.2513 35.4294 74.1894V77.713C35.4294 79.6511 37.0151 81.2367 38.9531 81.2367H70.6662C76.4802 81.2367 81.2372 76.4798 81.2372 70.6657V46C81.2372 26.5845 65.4159 10.7632 46.0004 10.7632Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              ) : null}

              <p className="mt-6 text-[18px] font-normal leading-tight text-black lg:text-[20px]">
                {faqDescription}
              </p>
            </div>

            <div
              className={`min-w-0 w-full text-left ${
                !faqImageSrc ? "lg:col-span-2" : ""
              }`}
            >
              {faqItems.map((faq, index) => {
                const isOpen = activeIndex === index;
                const question = faq?.question ?? faq?.q ?? "";
                const answer = faq?.answer ?? faq?.a ?? "";
                return (
                  <div key={faq?.id ?? index} className="mb-3">
                    {isOpen ? (
                      <div className="rounded-xl bg-[#f25c05] px-4 py-3 md:px-5 md:py-4">
                        <button
                          type="button"
                          id={`faq-btn-${index}`}
                          className="flex w-full items-start justify-between gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:gap-3"
                          onClick={() => setActiveIndex(null)}
                          aria-expanded={true}
                          aria-controls={`faq-content-${index}`}
                        >
                          <span className="min-w-0 flex-1 text-[16px] font-bold leading-snug text-white md:text-[22px]">
                            {question}
                          </span>

                          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-white text-white md:h-7 md:w-7">
                            <Minus
                              className="h-3.5 w-3.5 md:h-4 md:w-4"
                              strokeWidth={2.5}
                            />
                          </span>
                        </button>

                        <div
                          id={`faq-content-${index}`}
                          role="region"
                          aria-labelledby={`faq-btn-${index}`}
                          className="mt-2 text-[14px] font-medium leading-relaxed text-white md:mt-3 md:text-base"
                        >
                          {answer}
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        id={`faq-btn-${index}`}
                        className="flex min-h-[52px] w-full items-center justify-between gap-2 rounded-xl bg-[#fff0ea] px-4 py-2.5 text-left text-black transition-colors hover:bg-[#efdfd3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f25c05] focus-visible:ring-offset-2 md:min-h-[62px] md:gap-3 md:px-5 md:py-3"
                        onClick={() => setActiveIndex(index)}
                        aria-expanded={false}
                        aria-controls={`faq-content-${index}`}
                      >
                        <span className="min-w-0 flex-1 text-left text-[16px] font-bold leading-snug md:text-[22px]">
                          {question}
                        </span>

                        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-black text-black md:h-7 md:w-7">
                          <Plus
                            className="h-3.5 w-3.5 md:h-4 md:w-4"
                            strokeWidth={2.5}
                          />
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
