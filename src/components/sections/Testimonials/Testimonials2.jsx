"use client";

import React, { useEffect, useMemo, useState } from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {Rubik, Archivo} from "next/font/google";

const rubik = Rubik({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const archivo = Archivo({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export default function Testimonials2({ content }) {
  const logo = content?.navbar?.logo ?? {};
  const data = content?.testimonials ?? {};
  const testimonials = Array.isArray(data.list) ? data.list : [];
  const reviewCount = data.reviewCount ?? "150+";
  const sectionTitle = data?.title || "Our Happy Clients";
  const companyName = logo?.logoText || data?.company || "Chimney Service Co";

  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  const testimonialsWithAvatars = useMemo(() => {
    const getAvatar = (seed) =>
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;

    return testimonials.map((testimonial, index) => ({
      ...testimonial,
      avatar: testimonial.avatar || getAvatar(testimonial.name || `client-${index}`),
      role: testimonial.role || "CLIENTS",
    }));
  }, [testimonials]);

  const maxIndex = useMemo(
    () => Math.max(0, testimonialsWithAvatars.length - visibleSlides),
    [testimonialsWithAvatars.length, visibleSlides],
  );

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 768) {
        setVisibleSlides(1);
      } else {
        setVisibleSlides(2);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (activeIndex > maxIndex) {
      setActiveIndex(maxIndex);
    }
  }, [activeIndex, maxIndex]);

  const handleArrowClick = (direction) => {
    if (direction === "next") {
      if (activeIndex >= maxIndex) {
        setActiveIndex(0);
      } else {
        setActiveIndex((prev) => prev + 1);
      }
    } else if (direction === "prev") {
      if (activeIndex <= 0) {
        setActiveIndex(maxIndex);
      } else {
        setActiveIndex((prev) => prev - 1);
      }
    }
  };

  useEffect(() => {
    if (isPaused || testimonialsWithAvatars.length <= visibleSlides) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, testimonialsWithAvatars.length, visibleSlides, maxIndex]);

  if (!testimonials.length) return null;

  return (
    <FullContainer className="bg-[#ffffff] py-12 md:py-16" id="testimonials">
      <Container className="mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <h2 className={`${rubik.className} font-regular text-4xl md:text-[44px] font-normal text-[#151515] mb-1`}>
            {sectionTitle}
          </h2>
          <p className={`${rubik.className} text-[20px] md:text-[26px] font-normal text-[#1f1f1f]`}>{companyName}</p>
          <div className="mt-2 flex items-center justify-center gap-3">
            <div className="flex items-center gap-1 text-[#E5A326]">
              <Image src="/st-icons/Temp2/fiveStar.png" alt="Google" width={150} height={150} className="h-auto w-[150px] md:w-[160px]" />
            </div>
            <span className="rounded-lg bg-white border border-[#d9d9d9] px-3 py-1 text-sm text-[#555]">
              {reviewCount} Google Reviews
            </span>
          </div>
        </div>

        <div
          className="relative w-full max-w-[1000px] mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="hidden md:flex absolute inset-y-0 -left-3 -right-3 items-center justify-between z-10 pointer-events-none">
            <button
              type="button"
              onClick={() => handleArrowClick("prev")}
              className="w-10 h-10 rounded-full bg-white border border-[#d9d9d9] text-[#252525] shadow-sm hover:bg-[#f7f7f7] transition pointer-events-auto"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon className="w-5 h-5 mx-auto" />
            </button>
            <button
              type="button"
              onClick={() => handleArrowClick("next")}
              className="w-10 h-10 rounded-full bg-white border border-[#d9d9d9] text-[#252525] shadow-sm hover:bg-[#f7f7f7] transition pointer-events-auto"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon className="w-5 h-5 mx-auto" />
            </button>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${activeIndex * (100 / visibleSlides)}%)`,
              }}
            >
              {testimonialsWithAvatars.map((testimonial, index) => (
                <div
                  key={`${testimonial.name || "testimonial"}-${index}`}
                  className="shrink-0 px-3"
                  style={{ width: `${100 / visibleSlides}%` }}
                >
                  <article className="h-full rounded-[26px] border  border-gray-500 bg-[#ffffff] px-8 py-8 md:py-9 lg:py-14 text-center">
                    <Image src="/st-icons/Temp2/fiveStar.png" alt="Google" width={150} height={150} className="h-auto w-[150px] md:w-[160px] mx-auto mb-4" />

                    <p className={`${rubik.className} text-[16px] md:text-[20px] leading-[1.28] italic text-[#5b5b5b] max-w-[520px] mx-auto`}>
                      &ldquo; {testimonial.quote || testimonial.text} &rdquo;
                    </p>

                    <div className="mt-4 md:mt-6 flex justify-center">
                      <div className="w-[78px] h-[78px] rounded-full overflow-hidden border border-[#d8d8d8]">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name || "Client"}
                          width={78}
                          height={78}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      </div>
                    </div>
                    <h3 className={`${archivo.className} mt-3 text-[18px] md:text-[20px] font-semibold text-[#212121]`}>
                      {testimonial.name || "Client"}
                    </h3>
                    <p className={`${rubik.className} mt-1 text-sm md:text-base uppercase tracking-wide text-[#7cc4d6] font-semibold`}>
                      {testimonial.role}
                    </p>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex justify-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => handleArrowClick("prev")}
              className="w-9 h-9 rounded-full bg-white border border-[#d9d9d9] text-[#252525]"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon className="w-5 h-5 mx-auto" />
            </button>
            <button
              type="button"
              onClick={() => handleArrowClick("next")}
              className="w-9 h-9 rounded-full bg-white border border-[#d9d9d9] text-[#252525]"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon className="w-5 h-5 mx-auto" />
            </button>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 767px) {
            article p {
              font-size: 22px;
            }
            article h3 {
              font-size: 28px;
            }
            article p + div + h3 + p {
              font-size: 18px;
            }
          }
        `}</style>
      </Container>
    </FullContainer>
  );
}
