"use client";

import React, { useMemo, useState } from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import FiveStars from "@/components/common/FiveStars";
import { Poppins } from "next/font/google";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Testimonials28({ content }) {
  const data = content?.testimonials ?? {};
  const testimonials = Array.isArray(data.list) ? data.list : [];
  const sectionTitle = data.heading ?? data.title ?? "Our Happy Clients";
  const sectionSubtitle = data.subtitle;
  const sourcePrefix = data.sourcePrefix;
  const sourceName = data.sourceName;
  const sourceIcon = data.sourceIcon;
  const [activeIndex, setActiveIndex] = useState(0);
  const cardsPerView = 2;
  const maxIndex = Math.max(0, testimonials.length - cardsPerView);

  if (!testimonials.length) return null;

  const handleNext = () => {
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const translateValue = useMemo(
    () => `${-(activeIndex * (100 / cardsPerView))}%`,
    [activeIndex],
  );

  return (
    <FullContainer className="bg-[#f3f3f3] py-14 md:py-20" id="testimonials">
      <Container className="mx-auto px-4">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mb-10 text-center">
            {sectionTitle ? (
              <h2
                className={`${poppins.className} text-4xl font-extrabold text-black md:text-5xl`}
              >
                {sectionTitle}
              </h2>
            ) : null}
            {sectionSubtitle ? (
              <p
                className={`${poppins.className} mt-2 text-sm font-medium text-[#262626] md:text-lg`}
              >
                {sectionSubtitle}
              </p>
            ) : null}
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(${translateValue})` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full shrink-0 px-3 md:w-1/2">
                    <div className="rounded-2xl border border-[#e5e5e5] bg-[#f7f7f7] p-5 md:p-6">
                      <h3
                        className={`${poppins.className} text-lg font-bold leading-tight text-black`}
                      >
                        {testimonial.name}
                      </h3>
                      <FiveStars
                        className="mt-2 justify-start"
                        starClassName="text-[#efa536]"
                      />
                      <p
                        className={`${poppins.className} mt-3 text-[16px] font-medium leading-snug text-[#222]`}
                      >
                        {testimonial.quote || testimonial.text}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-3 pl-3">
                      {sourceIcon ? (
                        <span
                          className={`${poppins.className} text-5xl font-bold leading-none text-[#4285F4]`}
                          aria-hidden
                        >
                          {sourceIcon}
                        </span>
                      ) : null}
                      {sourcePrefix || sourceName ? (
                        <p
                          className={`${poppins.className} text-2xl font-semibold leading-6 text-[#212121]`}
                        >
                          {sourcePrefix}
                          {sourcePrefix ? <br /> : null}
                          <span className="font-normal text-[#5f6368]">
                            {sourceName}
                          </span>
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {testimonials.length > cardsPerView ? (
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous testimonials"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4d4d4] bg-white text-black transition hover:bg-neutral-100"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next testimonials"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4d4d4] bg-white text-black transition hover:bg-neutral-100"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
