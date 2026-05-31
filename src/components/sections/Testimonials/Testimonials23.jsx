"use client";

import React, { useEffect, useMemo, useState } from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import FiveStars from "@/components/common/FiveStars";
import { Poppins } from "next/font/google";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const STAR_GOLD = "#f5a623";

function formatRating(value) {
  if (value == null || Number.isNaN(value)) return "";
  return Number(value).toFixed(1);
}

function getCardsPerView(width) {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 4;
}

export default function Testimonials23({ content }) {
  const data = content?.testimonials ?? {};
  const testimonials = Array.isArray(data.list) ? data.list : [];
  const sectionTitle = data.heading ?? data.title ?? "";
  const sectionSubtitle = data.subtitle;
  const reviewCount = data.reviewCount ?? "";
  const googleReviewsLabel = data.google_reviews_label ?? "";
  const summaryRatingRaw = data.average_rating ?? data.summary_rating;
  const sourcePrefix = data.sourcePrefix;
  const sourceName = data.sourceName;
  const sourceIcon = data.sourceIcon;

  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);

  const computedAverageRating = useMemo(() => {
    if (!testimonials.length) return null;
    const rated = testimonials.filter(
      (item) => item.rating != null && !Number.isNaN(Number(item.rating)),
    );
    if (!rated.length) return null;
    const total = rated.reduce((sum, item) => sum + Number(item.rating), 0);
    return total / rated.length;
  }, [testimonials]);

  const displayRating = useMemo(() => {
    if (summaryRatingRaw != null && String(summaryRatingRaw).trim() !== "") {
      return formatRating(Number(summaryRatingRaw));
    }
    return formatRating(computedAverageRating);
  }, [summaryRatingRaw, computedAverageRating]);

  const maxIndex = Math.max(0, testimonials.length - cardsPerView);

  useEffect(() => {
    const updateCardsPerView = () => {
      setCardsPerView(getCardsPerView(window.innerWidth));
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const translateValue = useMemo(
    () => `${-(activeIndex * (100 / cardsPerView))}%`,
    [activeIndex, cardsPerView],
  );

  const reviewSummary = [reviewCount, googleReviewsLabel]
    .filter(Boolean)
    .join(" ");
  const summaryLine = sectionSubtitle || reviewSummary || sectionTitle;

  if (!testimonials.length) return null;

  const handleNext = () => {
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const showSlider = testimonials.length > cardsPerView;

  return (
    <FullContainer className="bg-white py-14 md:py-20" id="testimonials">
      <Container className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* Overall rating header */}
          <div className="mb-12 text-center md:mb-14">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <span
                className={`${poppins.className} text-[52px] font-bold leading-none sm:text-[60px] md:text-[68px]`}
                style={{ color: STAR_GOLD }}
              >
                {displayRating}
              </span>
              {displayRating ? (
                <FiveStars
                  className="gap-1 sm:gap-1.5"
                  starClassName="!text-[28px] sm:!text-[32px] md:!text-[36px]"
                />
              ) : null}
            </div>

            {summaryLine ? (
              <p
                className={`${poppins.className} mt-4 text-base font-normal leading-relaxed text-black sm:text-lg md:text-[20px]`}
              >
                {summaryLine}
              </p>
            ) : null}
          </div>

          {/* Slider — 4 visible on desktop */}
          <div className="relative">
            <div className="overflow-hidden">
              <ul
                className="flex items-start transition-transform duration-500 ease-out"
                style={{ transform: `translateX(${translateValue})` }}
              >
                {testimonials.map((testimonial, index) => {
                  const quote = testimonial.quote || testimonial.text;

                  return (
                    <li
                      key={index}
                      className="w-full shrink-0 px-3 sm:w-1/2 lg:w-1/4"
                    >
                      <div className="flex flex-col text-left">
                        <FiveStars
                          className="justify-start gap-1"
                          starClassName="!text-[18px] md:!text-[20px]"
                        />

                        {quote ? (
                          <p
                            className={`${poppins.className} mt-4 line-clamp-5 min-h-[7.5rem] text-[15px] font-normal leading-[1.65] text-black sm:min-h-[8rem] sm:text-base md:line-clamp-6 md:min-h-[9rem] md:text-[17px]`}
                          >
                            {quote}
                          </p>
                        ) : null}

                        {testimonial.name ? (
                          <p
                            className={`${poppins.className} mt-3 text-[15px] font-semibold leading-snug text-black sm:text-base`}
                          >
                            - {testimonial.name}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {showSlider ? (
              <div className="mt-8 flex items-center justify-center gap-3 md:mt-10">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous testimonials"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4d4d4] bg-white text-black shadow-sm transition hover:bg-neutral-100"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next testimonials"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4d4d4] bg-white text-black shadow-sm transition hover:bg-neutral-100"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            ) : null}
          </div>

          {sourcePrefix || sourceName || sourceIcon ? (
            <div className="mt-12 flex items-center justify-center gap-3">
              {sourceIcon ? (
                <span
                  className={`${poppins.className} text-4xl font-bold leading-none text-[#4285F4]`}
                  aria-hidden
                >
                  {sourceIcon}
                </span>
              ) : null}
              {sourcePrefix || sourceName ? (
                <p
                  className={`${poppins.className} text-center text-lg font-semibold leading-6 text-[#212121] sm:text-xl`}
                >
                  {sourcePrefix}
                  {sourcePrefix && sourceName ? <br /> : null}
                  {sourceName ? (
                    <span className="font-normal text-[#5f6368]">
                      {sourceName}
                    </span>
                  ) : null}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </FullContainer>
  );
}
