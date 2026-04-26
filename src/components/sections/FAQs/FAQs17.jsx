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

export default function FAQs8({ content }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqsBlock = content?.faqs ?? {};
  const faqItems = Array.isArray(faqsBlock)
    ? faqsBlock
    : (faqsBlock?.items ?? faqsBlock?.value ?? []);
  const faqTitle = faqsBlock?.title ?? "Frequently Asked Questions";

  if (!Array.isArray(faqItems) || faqItems.length === 0) return null;

  return (
    /* Background set to match the dark navy in Figma */
    <FullContainer className="bg-[#16243E] mt-16  py-12 md:py-20" id="faqs">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT SIDE: FAQ CONTENT */}
          <div className="w-full">
            <h2 className={cn(
              faqsHeadingFont.className,
              "text-3xl md:text-4xl font-bold text-white mb-10 text-left"
            )}>
              {faqTitle}
            </h2>

            <div className="flex flex-col border-t border-white/20">
              {faqItems.map((faq, index) => {
                const open = activeIndex === index;
                const q = faq?.question ?? faq?.q ?? "";
                const a = faq?.answer ?? faq?.a ?? "";
                return (
                  <div key={index} className="border-b border-white/20">
                    <button
                      type="button"
                      className="flex w-full items-center justify-start gap-4 py-5 text-left focus:outline-none group"
                      onClick={() => setActiveIndex(open ? null : index)}
                    >
                      <span className={cn(
                        faqsQuestionFont.className,
                        "text-lg md:text-xl font-medium text-white transition-colors group-hover:text-white/80"
                      )}>
                        {q}
                      </span>

                      {/* Icon sits close to the text because of justify-start and gap-4 */}
                      <span className="shrink-0 flex items-center justify-center border-2 border-white rounded-full w-6 h-6">
                        {open ? (
                          <Minus className="h-3 w-3 text-white" strokeWidth={3} />
                        ) : (
                          <Plus className="h-3 w-3 text-white" strokeWidth={3} />
                        )}
                      </span>
                    </button>
                    
                    <div className={cn(
                      "grid transition-all duration-300 ease-in-out", 
                      open ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
                    )}>
                      <div className="overflow-hidden">
                        <p className="text-white text-base leading-relaxed max-w-[90%]">
                          {a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE: EMPTY FOR IMAGE */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
            {/* This space is reserved for your technician image and red phone button */}
            <div className="w-full h-full border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center">
                <span className="text-white/20 italic">Place Image & CTA Here</span>
            </div>
          </div>

        </div>
      </Container>
    </FullContainer>
  );
}