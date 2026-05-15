"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

function buildImageSrc(filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (IMAGE_BASE ?? "").replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function CircleIcon({ open }) {
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1f1f1f] bg-white text-[#1f1f1f]"
      aria-hidden
    >
      {open ? (
        <Minus className="h-4 w-4" strokeWidth={2.5} />
      ) : (
        <Plus className="h-4 w-4" strokeWidth={2.5} />
      )}
    </span>
  );
}

export default function FAQs24({ content }) {
  const faqsBlock = content?.faqs ?? {};

  const faqItems = Array.isArray(faqsBlock)
    ? faqsBlock
    : (faqsBlock?.items ?? faqsBlock?.value ?? []);

  const faqTitle = faqsBlock?.title ?? "";

  const imageFile =
    faqsBlock?.side_image ??
    faqsBlock?.image ??
    faqsBlock?.file_name ??
    "";

  const imageAlt =
    faqsBlock?.side_image_alt ??
    faqsBlock?.image_alt ??
    faqTitle ??
    "FAQs";

  const imageSrc = imageFile ? buildImageSrc(imageFile) : "";

  const [activeIndex, setActiveIndex] = useState(0);

  if (!Array.isArray(faqItems) || faqItems.length === 0) return null;

  return (
    <FullContainer id="faqs" className="bg-white">
      <Container>
        <div className="w-full py-12 md:py-16 lg:py-20">
          <div
            className={`grid items-start gap-10 ${
              imageSrc
                ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16"
                : ""
            }`}
          >
            {/* Left Content Column */}
            <div className="min-w-0">
              {faqTitle ? (
                <h2
                  className={`${poppins.className} text-[34px] font-extrabold leading-[1.1] tracking-tight text-[#1B1B1B] sm:text-[40px] lg:text-[44px]`}
                >
                  {faqTitle}
                </h2>
              ) : null}

              <div className="mt-7 border-t border-[#1B1B1B]/80" />

              <div className="mt-6 flex flex-col gap-4 md:gap-5">
                {faqItems.map((faq, index) => {
                  const isOpen = activeIndex === index;
                  const q = faq?.question ?? faq?.q ?? "";
                  const a = faq?.answer ?? faq?.a ?? "";
                  return (
                    <div
                      key={faq?.id ?? index}
                      className="w-full rounded-[10px] border border-[#1B1B1B]/85 bg-white"
                    >
                      <button
                        type="button"
                        id={`faq-btn-${index}`}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:px-6"
                        onClick={() =>
                          setActiveIndex(activeIndex === index ? null : index)
                        }
                        aria-expanded={isOpen}
                        aria-controls={`faq-content-${index}`}
                      >
                        <span
                          className={`${poppins.className} min-w-0 flex-1 wrap-break-word text-[16px] font-semibold leading-snug text-[#1B1B1B] sm:text-[17px]`}
                        >
                          {q}
                        </span>

                        <CircleIcon open={isOpen} />
                      </button>
                      {isOpen && a ? (
                        <div
                          id={`faq-content-${index}`}
                          role="region"
                          aria-labelledby={`faq-btn-${index}`}
                          className={`${poppins.className} px-5 pb-5 -mt-1 text-[14px] leading-relaxed text-[#5C5C5C] sm:px-6 sm:text-[15px]`}
                        >
                          {a}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Image Column */}
            {imageSrc ? (
              <div className="relative mx-auto w-full max-w-[482.73px] lg:mx-0 lg:-mt-10">
                <div
                  className="flex aspect-[482.73/617.31] w-full max-w-[482.73px] flex-none flex-row items-center gap-[14.51px] overflow-hidden rounded-[2px] sm:aspect-auto sm:h-[617.31px] sm:w-[482.73px]"
                >
                  <div className="relative min-h-0 min-w-0 flex-1 self-stretch">
                    <div
                      className="absolute inset-0 overflow-hidden  rounded-[16px]"
                      style={{
                        clipPath:
                          "polygon(6% 19%, 9% 18%, 92% 6%, 96% 7%, 96% 11%, 96% 93%, 95% 96%, 92% 96%, 9% 82%, 6% 81%, 5% 78%, 5% 28%, 5% 21%)",
                      }}
                    >
                      <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        className="object-cover border-4  object-[50%_58%]"
                        sizes="(max-width: 1024px) 90vw, 45vw"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}