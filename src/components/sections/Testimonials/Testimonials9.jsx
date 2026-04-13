"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";

import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function Testimonials9({ content }) {
  const data = content?.testimonials ?? {};
  const testimonials = Array.isArray(data.list) ? data.list : [];
  const sectionTitle =
    typeof data.title === "string" && data.title.trim()
      ? data.title.trim()
      : "Our Happy Clients";

  const [activeIndex, setActiveIndex] = useState(0);
  const autoSlideRef = useRef(null);

  const testimonialsWithAvatars = useMemo(() => {
    const getRandomAvatar = (seed) =>
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
        seed,
      )}`;

    const getRandomDate = (index) => {
      const start = new Date("2023-01-01").getTime();
      const end = new Date("2023-12-31").getTime();
      const length = Math.max(testimonials.length, 1);

      const seed = (index * 2654435761) % length;
      const offset = (seed / length) * (end - start);
      const randomTime = start + offset;

      const date = new Date(randomTime);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    };

    return testimonials.map((testimonial, index) => ({
      ...testimonial,
      avatar:
        testimonial.avatar ||
        getRandomAvatar(testimonial.name || `user-${index}`),
      date: getRandomDate(index),
    }));
  }, [testimonials]);

  const defaultAvatar = useMemo(
    () => "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
    [],
  );

  const maxIndex = Math.max(0, testimonials.length - 1);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  useEffect(() => {
    if (testimonials.length <= 1) return;

    autoSlideRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [testimonials.length, maxIndex]);

  const current = testimonialsWithAvatars[activeIndex];
  const quoteText = current?.quote || current?.text || "";
  const starCount = Math.min(5, Math.max(0, Number(current?.rating) || 5));

  if (!testimonials.length) return null;

  return (
    <FullContainer id="testimonials" className="py-14 md:py-20 bg-stone-100">
      <Container className="mx-auto">
        <div className="w-full  bg-[#f4aa2a] px-6 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col">
          <h2 className="text-center text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-black tracking-tight leading-[1.15] px-1">
            {sectionTitle}
          </h2>

          <div
            key={activeIndex}
            className="flex flex-col flex-1 mt-7 md:mt-9 transition-all duration-500 ease-out"
          >
            <div className="flex justify-center gap-1" aria-hidden>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 md:h-6 md:w-6 ${
                    star <= starCount
                      ? "fill-amber-300 text-amber-300"
                      : "fill-transparent text-white/35"
                  }`}
                  strokeWidth={star <= starCount ? 0 : 1.5}
                />
              ))}
            </div>

            <blockquote className="text-center text-black text-base md:text-lg leading-[1.75] font-normal max-w-3xl mx-auto mt-6 md:mt-8 px-1">
              <span className="text-black">&ldquo;</span>
              {quoteText}
              <span className="text-black">&rdquo;</span>
            </blockquote>

            <div className="mt-10 md:mt-12 flex flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 md:gap-4 min-w-0">
                <div className="relative h-12 w-12 md:h-14 md:w-14 shrink-0 rounded-full overflow-hidden bg-white/30 ring-2 ring-white/50">
                  <Image
                    src={current?.avatar || defaultAvatar}
                    alt={current?.name || "Client"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="text-left min-w-0">
                  <p className="font-bold text-black text-sm md:text-base truncate">
                    {current?.name}
                  </p>
                  <p className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-black uppercase mt-0.5">
                    Clients
                  </p>
                </div>
              </div>

              {testimonials.length > 1 ? (
                <div className="flex items-center gap-4 md:gap-5 shrink-0">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous testimonial"
                    className="h-10 w-10 md:h-11 md:w-11 flex items-center justify-center rounded-full border-2 border-white text-white hover:bg-white/10 transition-colors"
                  >
                    <ChevronLeft
                      className="w-5 h-5 md:w-6 md:h-6"
                      strokeWidth={2}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next testimonial"
                    className="h-10 w-10 md:h-11 md:w-11 flex items-center justify-center rounded-full border-2 border-white text-white hover:bg-white/10 transition-colors"
                  >
                    <ChevronRight
                      className="w-5 h-5 md:w-6 md:h-6"
                      strokeWidth={2}
                    />
                  </button>
                </div>
              ) : (
                <span className="w-0 shrink-0" aria-hidden />
              )}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
