"use client";

import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Montserrat, Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";

const faqsHeadingFont = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const faqsQuestionFont = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const ACCENT = "#D98200";
/** Plus / minus + circle ring */
const FAQ_TOGGLE_ICON_COLOR = "#24232A";

/** Circle ring for accordion toggle (20×20px). */
function FAQsToggleCircleRing({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 22 22"
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <path
        d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
        stroke={FAQ_TOGGLE_ICON_COLOR}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FAQs8({ content }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqsBlock = content?.faqs ?? {};
  const faqItems = Array.isArray(faqsBlock)
    ? faqsBlock
    : (faqsBlock?.items ?? faqsBlock?.value ?? []);
  const faqTitle = faqsBlock?.title ?? "FAQs";
  const faqKicker =
    typeof faqsBlock?.subheading === "string"
      ? faqsBlock.subheading.trim()
      : typeof faqsBlock?.eyebrow === "string"
        ? faqsBlock.eyebrow.trim()
        : typeof faqsBlock?.kicker === "string"
          ? faqsBlock.kicker.trim()
          : "";

  if (!Array.isArray(faqItems) || faqItems.length === 0) return null;

  return (
    <FullContainer className="bg-neutral-50 py-12 md:py-16 lg:py-20" id="faqs">
      <Container className="w-full">
        <div
          className={cn(
            "w-full rounded-2xl border border-neutral-200/90 bg-white",
            "p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)] md:p-8 lg:p-10",
          )}
        >
          <header className="mb-8 text-left md:mb-10">
            {faqKicker ? (
              <p
                className="mb-3 text-xs font-bold uppercase tracking-[0.12em] md:text-sm"
                style={{ color: ACCENT }}
              >
                {faqKicker.startsWith("/") ? faqKicker : `/ ${faqKicker}`}
              </p>
            ) : null}
            <h2
              className={cn(
                faqsHeadingFont.className,
                "text-[clamp(1.75rem,3.8vw,44px)] font-bold leading-tight tracking-tight text-neutral-900",
              )}
            >
              {faqTitle}
            </h2>
          </header>

          <div className="flex flex-col">
            {faqItems.map((faq, index) => {
              const open = activeIndex === index;
              const q = faq?.question ?? faq?.q ?? "";
              const a = faq?.answer ?? faq?.a ?? "";
              return (
                <div key={faq?.id ?? index}>
                  <button
                    type="button"
                    id={`faq-btn-${index}`}
                    className={cn(
                      "flex w-full items-start justify-between gap-4 py-5 text-left md:items-center",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
                    )}
                    onClick={() => setActiveIndex(open ? null : index)}
                    aria-expanded={open}
                    aria-controls={`faq-content-${index}`}
                  >
                    <span
                      className={cn(
                        faqsQuestionFont.className,
                        "min-w-0 flex-1 text-2xl font-semibold leading-snug text-neutral-900",
                      )}
                    >
                      {q}
                    </span>
                    <span
                      className="grid h-5 w-5 shrink-0 place-items-center"
                      style={{ color: FAQ_TOGGLE_ICON_COLOR }}
                      aria-hidden
                    >
                      <FAQsToggleCircleRing className="col-start-1 row-start-1" />
                      {open ? (
                        <Minus
                          className="col-start-1 row-start-1 z-[1] h-3 w-3"
                          stroke={FAQ_TOGGLE_ICON_COLOR}
                          strokeWidth={2}
                        />
                      ) : (
                        <Plus
                          className="col-start-1 row-start-1 z-[1] h-3 w-3"
                          stroke={FAQ_TOGGLE_ICON_COLOR}
                          strokeWidth={2}
                        />
                      )}
                    </span>
                  </button>
                  <div
                    id={`faq-content-${index}`}
                    role="region"
                    aria-labelledby={`faq-btn-${index}`}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="max-w-[42rem] pb-6 pr-9 text-left text-[17px] leading-relaxed text-neutral-600 md:pr-10">
                        {a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
