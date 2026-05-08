"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { Inter, Montserrat, Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
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

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function FAQs8({ content }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqsBlock = content?.faqs ?? {};
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const faqItems = Array.isArray(faqsBlock)
    ? faqsBlock
    : (faqsBlock?.items ?? faqsBlock?.value ?? []);
  const faqTitle = faqsBlock?.title ?? "Frequently Asked Questions";
  const bgImageSrc = buildImageSrc(
    IMAGE_BASE,
    faqsBlock?.filename2 ?? faqsBlock?.file_name ?? faqsBlock?.image ?? "",
  );
  const phoneLink = phone ? `tel:${phone}` : "#";
  const phoneButtonClass =
    "h-[54px] w-[220px] inline-flex flex-row items-center justify-center gap-2 rounded-full bg-[#ff0504] text-white shadow-lg transition-all hover:opacity-80";
  const phoneTextClass = `${inter.className} text-sm md:text-[20px] lg:text-lg font-bold text-white mt-1 leading-none`;

  if (!Array.isArray(faqItems) || faqItems.length === 0) return null;

  return (
    <FullContainer className="relative overflow-hidden bg-[#16243E] py-12 md:py-20" id="faqs">
      {bgImageSrc ? (
        <Image
          src={bgImageSrc}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
      ) : null}
      <div className="absolute inset-0 bg-[#102447]/80" aria-hidden />

      <Container className="relative z-10">
        <div className="w-full">
          <div className="mx-auto max-w-[760px]">
            <h2 className={cn(
              faqsHeadingFont.className,
              "mb-10 text-left text-3xl font-bold text-white md:text-4xl"
            )}>
              {faqTitle}
            </h2>

            <div className="flex flex-col border-t border-white/20 text-left">
              {faqItems.map((faq, index) => {
                const open = activeIndex === index;
                const q = faq?.question ?? faq?.q ?? "";
                const a = faq?.answer ?? faq?.a ?? "";
                return (
                  <div key={index} className="border-b border-white/20">
                    <button
                      type="button"
                      className="group flex w-full items-center justify-between gap-4 py-5 text-left focus:outline-none"
                      onClick={() => setActiveIndex(open ? null : index)}
                    >
                      <span className={cn(
                        faqsQuestionFont.className,
                        "min-w-0 flex-1 pr-2 text-left text-lg font-medium text-white transition-colors group-hover:text-white/80 md:text-xl"
                      )}>
                        {q}
                      </span>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-white">
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
                        <p className="w-full text-left text-base leading-relaxed text-white">
                          {a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {phone ? (
              <div className="mt-8 flex justify-center">
                <a href={phoneLink} className={phoneButtonClass}>
                  <span className="flex h-[30px] w-[30px] items-center justify-center">
                    <Image
                      src="/st-icons/Temp17/call17.png"
                      alt="Phone"
                      width={18}
                      height={18}
                      className="h-[30px] w-[30px] shrink-0"
                    />
                  </span>
                  <span className="flex flex-col items-center leading-none">
                    <span className={`${inter.className} text-[16px] font-normal text-white`}>
                      CLICK TO CALL
                    </span>
                    <span className={phoneTextClass}>{phone}</span>
                  </span>
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}