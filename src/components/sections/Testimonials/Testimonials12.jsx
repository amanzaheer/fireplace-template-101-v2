"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";

import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import FiveStars from "@/components/common/FiveStars";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Image from "next/image";

import {
  Poppins,
  Archivo,
} from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const archivo = Archivo({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export default function Testimonials12({
  content,
  embedded = false,
}) {
  const data = content?.testimonials ?? {};

  const testimonials = Array.isArray(data.list)
    ? data.list
    : [];

  const [activeIndex, setActiveIndex] = useState(0);

  const autoSlideRef = useRef(null);

  const testimonialsWithAvatars = useMemo(() => {
    const getRandomAvatar = (seed) => 
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
        seed,
      )}`;

    return testimonials.map((testimonial, index) => ({
      ...testimonial,
      avatar:
        testimonial.avatar ||
        getRandomAvatar(
          testimonial.name || `user-${index}`,
        ),
    }));
  }, [testimonials]);

  const defaultAvatar = useMemo(
    () =>
      "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
    [],
  );

  const maxIndex = Math.max(
    0,
    testimonials.length - 1,
  );

  // AUTO SLIDE
  useEffect(() => {
    if (testimonials.length <= 1) return;

    autoSlideRef.current = setInterval(() => {
      setActiveIndex((prev) =>
        prev >= maxIndex ? 0 : prev + 1,
      );
    }, 5000);

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [testimonials.length, maxIndex]);

  // PREV / NEXT
  const handleArrowClick = (direction) => {
    if (direction === "next") {
      setActiveIndex((prev) =>
        prev >= maxIndex ? 0 : prev + 1,
      );
    } else {
      setActiveIndex((prev) =>
        prev <= 0 ? maxIndex : prev - 1,
      );
    }
  };

  if (!testimonials.length) return null;

  const sectionHeading = embedded
    ? data.heading ||
    "Our Happy Clients"
    : data.heading || "Our Happy Clients";

  const testimonialsContent = (
    <div
      className={`flex flex-col ${embedded
          ? "w-full "
          : ""
        }`}
    >
      <div className="w-full ">
        {/* HEADING */}
        <h2
          className={`${poppins.className} text-black font-bold leading-[110%] tracking-[-0.02em] ${embedded
              ? "mb-0 text-center text-[28px] sm:mb-8 sm:text-[32px] md:text-[48px]"
              : "mb-2 text-center text-[32px] md:text-[48px]"
            }`}
        >
          {sectionHeading}
        </h2>

        {/* SLIDER */}
        <div className="relative ">
          {/* WRAPPER */}
          <div
            className={`mx-auto w-full overflow-hidden ${embedded ? "ml-0 sm:ml-2 md:ml-4" : "ml-4"}`}
          >
            {/* TRACK */}
            <div
              className="flex transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `translateX(-${activeIndex * 100
                  }%)`,
              }}
            >
              {testimonialsWithAvatars.map(
                (testimonial, index) => (
                  <div
                    key={index}
                    className="w-full shrink-0"
                  >
                    {/* CARD */}
                    <div
                  className={`mx-auto flex h-full w-full flex-col gap-4 rounded-[12px] border border-[#ECECEC] bg-white p-4 shadow-[0_10px_18px_-8px_rgba(0,0,0,0.25)] sm:gap-5 sm:p-5 ${
                    embedded
                      ? "min-h-[240px] translate-x-0 scale-100 sm:min-h-[280px] md:scale-90 md:translate-x-[-4%]"
                      : "min-h-[280px] scale-90 translate-x-[-4%]"
                  }`}
                    >


                      {/* TOP */}
                      <div className="flex items-center gap-3 sm:gap-4">

                        {/* AVATAR */}
                        <div className={`relative shrink-0 overflow-hidden rounded-full ${embedded ? "h-20 w-20 sm:h-[108px] sm:w-[108px]" : "h-[108px] w-[108px]"}`}>
                          <Image
                            src={
                              testimonial.avatar ||
                              defaultAvatar
                            }
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>

                        {/* CONTENT */}
                        <div className="min-w-0  ">
                          {/* NAME */}
                          <h3
                            className={`${archivo.className} text-xl font-bold leading-[100%] text-black sm:text-[25.53px]`}
                          >
                            {testimonial.name}
                          </h3>

                          {/* CLIENT LABEL */}
                          <p
                            className={`${archivo.className} mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-black sm:text-[17px]`}
                          >
                            CLIENTS
                          </p>
                          {/* STARS */}
                          <FiveStars
                            className="mt-2"
                            starClassName={`text-[#F5A623] !text-[16px] ${embedded ? "h-4 w-4 sm:h-5 sm:w-5 sm:!text-[20px]" : "h-5 w-5 !text-[20px]"}`}
                          />
                        </div>
                      </div>

                      {/* REVIEW */}
                      <p
                        className={`${archivo.className} text-base italic leading-[150%] text-[#707070] sm:text-[20px]`}
                      >
                        &ldquo;{" "}
                        {testimonial.text ||
                          testimonial.quote}
                        {" "}&rdquo;
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* BUTTONS — centered under card */}
          <div className="mx-auto mt-6 flex w-full max-w-[504px] items-center justify-center gap-4 sm:mt-8 sm:gap-5">
            {/* PREV */}
            {/* PREV */}
            <button
              type="button"
              onClick={() => handleArrowClick("prev")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#000000] text-black shadow-[0_4px_18px_rgba(0,0,0,0.08)] transition-all duration-300 sm:h-[52px] sm:w-[52px]"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>

            {/* NEXT */}
            <button
              type="button"
              onClick={() => handleArrowClick("next")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#000000] text-black shadow-[0_4px_18px_rgba(0,0,0,0.08)] transition-all duration-300 sm:h-[52px] sm:w-[52px]"
              aria-label="Next testimonial"
            >
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return testimonialsContent;
  }

  return (
    <FullContainer
      className="bg-white py-10 md:py-14"
      id="testimonials"
    >
      <Container className="mx-auto px-4">
        {testimonialsContent}
      </Container>
    </FullContainer>
  );
}