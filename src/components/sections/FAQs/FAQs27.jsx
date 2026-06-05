"use client";

import React, { useState } from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";

export default function FAQs27({ content }) {
    const [activeIndex, setActiveIndex] = useState(null);
    const faqsBlock = content?.faqs ?? {};
    const faqItems = Array.isArray(faqsBlock) ? faqsBlock : (faqsBlock?.items ?? faqsBlock?.value ?? []);
    const faqTitle = faqsBlock?.title ?? "FAQs";

    if (!Array.isArray(faqItems) || faqItems.length === 0) return null;

    return (
        <FullContainer className="py-8 bg-black" id="faqs">
            <Container className="px-4">
                <div className="text-center">
                    <Heading text={faqTitle} className="pb-6 text-white" />
                    {/* CHANGE 3: max-w-3xl to reduce overall width, mx-auto to center it */}
                    <div className="mx-auto font-barlow text-[20px] max-w-3xl">
                        {/* CHANGE 2: grid grid-cols-2 gap-3 for 2 boxes per row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {faqItems.map((faq, index) => (
                                <div key={faq?.id ?? index}>
                                    <button
                                        type="button"
                                        id={`faq-btn-${index}`}
                                        className={`w-full text-left py-3.5 px-4 rounded-lg flex items-center justify-between focus:outline-none bg-white text-black`}
                                        onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                        aria-expanded={activeIndex === index}
                                        aria-controls={`faq-content-${index}`}
                                    >
                                        {/* CHANGE 1: icon span moved after the question text, ml-3 instead of mr-3 */}
                                        <span className="font-thin text-xl font-medium">{faq?.question ?? faq?.q ?? ""}</span>
                                        <span className="flex-shrink-0 ml-3 text-lg border-2 border-black rounded-full self-center">
                                            {activeIndex === index ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="5" y1="12" x2="19" y2="12" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="12" y1="5" x2="12" y2="19" />
                                                    <line x1="5" y1="12" x2="19" y2="12" />
                                                </svg>
                                            )}
                                        </span>
                                    </button>
                                    <div
                                        id={`faq-content-${index}`}
                                        role="region"
                                        aria-labelledby={`faq-btn-${index}`}
                                        className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                                    >
                                        <div className="bg-white p-4 border border-gray-200 border-t-0 rounded-b">
                                            <p className="text-black text-start text-lg">{faq?.answer ?? faq?.a ?? ""}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </FullContainer>
    );
}