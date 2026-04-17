"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const ACCENT_RING =
  "rounded-full border-2 border-[#EFA536] text-[#EFA536]";

function CircleIcon({ open }) {
  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center ${ACCENT_RING}`}
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

export default function FAQs9({ content }) {
  const faqsBlock = content?.faqs ?? {};
  const faqItems = Array.isArray(faqsBlock)
    ? faqsBlock
    : (faqsBlock?.items ?? faqsBlock?.value ?? []);
  const faqTitle = faqsBlock?.title ?? "FAQs";

  const [activeIndex, setActiveIndex] = useState(null);

  if (!Array.isArray(faqItems) || faqItems.length === 0) return null;

  return (
    <section
      id="faqs"
      className="bg-neutral-50 py-12 md:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1270px] px-4 md:px-6">
        <div className="rounded-2xl bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)] md:p-8 lg:p-10">
          <h2
            className={`${poppins.className} mb-8 text-left font-semibold not-italic tracking-tight text-[#24232A] md:mb-10`}
            style={{
              width: "505.668px",
              maxWidth: "100%",
              fontSize: "45.875px",
              lineHeight: "127%",
            }}
          >
            {faqTitle}
          </h2>

          <div className="flex flex-col gap-3 md:gap-4">
            {faqItems.map((faq, index) => {
              const isOpen = activeIndex === index;
              const q = faq?.question ?? faq?.q ?? "";
              const a = faq?.answer ?? faq?.a ?? "";

              const questionClass = `${poppins.className} min-w-0 flex-1 break-words text-left font-semibold not-italic text-[#24232A]`;
              const questionStyle = {
                fontSize: "25.023px",
                lineHeight: "140%",
              };

              if (isOpen) {
                return (
                  <div
                    key={faq?.id ?? index}
                    className="box-border flex w-full flex-col rounded-[5.213px] border-[1.043px] border-solid border-black px-[9.384px] py-[8.341px] pb-6 md:pb-8"
                  >
                    <button
                      type="button"
                      id={`faq-btn-${index}`}
                      className="flex w-full min-w-0 items-start gap-[36.491px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      onClick={() =>
                        setActiveIndex(activeIndex === index ? null : index)
                      }
                      aria-expanded
                      aria-controls={`faq-content-${index}`}
                    >
                      <span
                        className={questionClass}
                        style={questionStyle}
                      >
                        {q}
                      </span>
                      <CircleIcon open />
                    </button>
                    <div
                      id={`faq-content-${index}`}
                      role="region"
                      aria-labelledby={`faq-btn-${index}`}
                      className="mt-4 text-left text-sm leading-relaxed text-neutral-600 md:text-base"
                    >
                      <p>{a}</p>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={faq?.id ?? index}
                  className="box-border flex w-full items-center rounded-[5.213px] border-[1.043px] border-solid border-black px-[9.384px] py-[8.341px]"
                >
                  <button
                    type="button"
                    id={`faq-btn-${index}`}
                    className="flex w-full min-w-0 items-center gap-[36.491px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    onClick={() => setActiveIndex(index)}
                    aria-expanded={false}
                    aria-controls={`faq-content-${index}`}
                  >
                    <span
                      className={questionClass}
                      style={questionStyle}
                    >
                      {q}
                    </span>
                    <CircleIcon open={false} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
