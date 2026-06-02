"use client";

import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

export default function FAQs33({ content }) {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqsBlock = content?.faqs ?? {};

    const faqItems = Array.isArray(faqsBlock)
        ? faqsBlock
        : (faqsBlock?.items ?? faqsBlock?.value ?? []);

    const faqTitle = faqsBlock?.title ?? "FAQs";

    if (!Array.isArray(faqItems) || faqItems.length === 0) return null;

    return (
        <FullContainer
            className="bg-[#da4909] py-10 md:py-14"
            id="faqs"
        >
            <Container className="px-4">
                <div className={`mx-auto w-full ${montserrat.className}`}>

                    {/* Heading */}
                    <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-white md:text-5xl [text-shadow:0_2px_4px_rgba(0,0,0,0.4)]">
                        {faqTitle}
                    </h2>

                    {/* FAQs */}
                    <div className="w-full border-t border-white/40">
                        {faqItems.map((faq, index) => {
                            const isOpen = activeIndex === index;

                            return (
                                <div
                                    key={faq?.id ?? index}
                                    className="border-b border-white/40"
                                >
                                    {/* Question */}
                                    <button
                                        type="button"
                                        id={`faq-btn-${index}`}
                                        onClick={() =>
                                            setActiveIndex(isOpen ? null : index)
                                        }
                                        aria-expanded={isOpen}
                                        aria-controls={`faq-content-${index}`}
                                        className="flex w-full items-start justify-between px-6 py-5 text-left text-white transition-all duration-300 hover:cursor-pointer md:px-8"
                                    >
                                        <span className="pr-4 text-xl font-bold md:text-2xl">
                                            {faq?.question ?? faq?.q ?? ""}
                                        </span>

                                        <span className="mt-1 inline-flex h-6 w-6 min-w-6 items-center justify-center rounded-full border border-white text-white">
                                            {isOpen ? (
                                                <Minus className="h-4 w-4" />
                                            ) : (
                                                <Plus className="h-4 w-4" />
                                            )}
                                        </span>
                                    </button>

                                    {/* Answer */}
                                    <div
                                        id={`faq-content-${index}`}
                                        role="region"
                                        aria-labelledby={`faq-btn-${index}`}
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen
                                                ? "max-h-[300px] opacity-100 pb-5"
                                                : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        <div className="px-6 md:px-8">
                                            <p className="text-sm leading-relaxed text-white/90 md:text-base">
                                                {faq?.answer ?? faq?.a ?? ""}
                                            </p>
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