"use client";

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Archivo, Poppins } from "next/font/google";
import FiveStars from "@/components/common/FiveStars";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const poppinsEmbeddedTitle = Poppins({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

const DEFAULT_AVATAR =
  "https://api.dicebear.com/7.x/avataaars/svg?seed=default";

const EMBEDDED_CARD_GAP_PX = 12;

export default function Testimonials9({
  content,
  embedded = false,
  chevronIconClassName,
}) {
  const logo = content?.navbar?.logo ?? {};
  const data = content?.testimonials ?? {};
  const testimonials = Array.isArray(data.list) ? data.list : [];
  const reviewCount = data.reviewCount ?? "";
  const heading = data.heading ?? "";
  const googleReviewsLabel =
    typeof data.google_reviews_label === "string" && data.google_reviews_label.trim()
      ? data.google_reviews_label.trim()
      : "";
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);
  const autoSlideRef = useRef(null);
  const animationRef = useRef(null);
  const embeddedTouchX = useRef(null);
  const embeddedViewportRef = useRef(null);
  const [embeddedCarousel, setEmbeddedCarousel] = useState({
    slideW: 0,
    stepPx: 0,
  });

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

  useEffect(() => {
    const onResize = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 768);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const getSlideSize = () => (isMobile ? 100 : 50);

  const slideSize = getSlideSize();

  const embeddedVisible = embedded ? (isMobile ? 1 : 2) : null;

  const visibleSlides = embedded ? embeddedVisible : isMobile ? 1 : 2;

  useEffect(() => {
    setPrevTranslate(activeIndex * -slideSize);
    setCurrentTranslate(activeIndex * -slideSize);
  }, [activeIndex, slideSize]);

  useEffect(() => {
    const startAutoSlide = () => {
      autoSlideRef.current = setInterval(() => {
        if (testimonials.length > 1) {
          setActiveIndex((prev) => {
            const maxAllowedIndex = Math.max(
              0,
              testimonials.length - visibleSlides,
            );
            return prev >= maxAllowedIndex ? 0 : prev + 1;
          });
        }
      }, 5000);
    };

    if (!isDragging) {
      startAutoSlide();
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [isDragging, testimonials.length, visibleSlides]);

  useEffect(() => {
    if (!embedded) return;
    const maxIdx = Math.max(0, testimonials.length - visibleSlides);
    setActiveIndex((i) => Math.min(i, maxIdx));
  }, [embedded, isMobile, testimonials.length, visibleSlides]);

  useLayoutEffect(() => {
    if (!embedded) return;
    const el = embeddedViewportRef.current;
    if (!el) return;

    const v = isMobile ? 1 : 2;
    const g = EMBEDDED_CARD_GAP_PX;

    const measure = () => {
      const w = el.getBoundingClientRect().width;
      if (w <= 0) return;
      const slideW = (w - g * Math.max(0, v - 1)) / v;
      setEmbeddedCarousel({ slideW, stepPx: slideW + g });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [embedded, isMobile, testimonials.length]);

  const animation = useCallback(() => {
    if (!sliderRef.current || !isDragging) return;

    animationRef.current = requestAnimationFrame(() => {
      if (!sliderRef.current || !isDragging) return;
      sliderRef.current.style.transform = `translateX(${currentTranslate}%)`;
    });
  }, [isDragging, currentTranslate]);
  const setSliderPosition = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(${currentTranslate}%)`;
    }
  }, [currentTranslate]);

  const getPositionX = (e) =>
    e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;

  const handleDragStart = (e) => {
    e.preventDefault();
    if (embedded || testimonials.length <= 1) return;
    setIsDragging(true);
    setStartX(getPositionX(e));
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
    animationRef.current = requestAnimationFrame(animation);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentX = getPositionX(e);
    const moveX = currentX - startX;
    const containerWidth = sliderRef.current?.clientWidth || 1;
    const movePercent = (moveX / containerWidth) * 100;
    setCurrentTranslate(movePercent + prevTranslate);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    cancelAnimationFrame(animationRef.current);
    const movedPercent = currentTranslate - prevTranslate;
    const threshold = -15;
    const maxAllowedIndex = Math.max(0, testimonials.length - visibleSlides);

    if (movedPercent < threshold) {
      if (activeIndex >= maxAllowedIndex) {
        setActiveIndex(0);
      } else {
        setActiveIndex(activeIndex + 1);
      }
    } else if (movedPercent > Math.abs(threshold)) {
      if (activeIndex <= 0) {
        setActiveIndex(maxAllowedIndex);
      } else {
        setActiveIndex(activeIndex - 1);
      }
    } else {
      setCurrentTranslate(prevTranslate);
      setSliderPosition();
    }

    setIsDragging(false);
  };

  const handleArrowClick = (direction) => {
    const maxAllowedIndex = Math.max(0, testimonials.length - visibleSlides);

    if (direction === "next") {
      if (activeIndex >= maxAllowedIndex) {
        setActiveIndex(0);
      } else {
        setActiveIndex(activeIndex + 1);
      }
    } else if (direction === "prev") {
      if (activeIndex <= 0) {
        setActiveIndex(maxAllowedIndex);
      } else {
        setActiveIndex(activeIndex - 1);
      }
    }
  };

  if (!testimonials.length) return null;

  const n = testimonialsWithAvatars.length;

  const embeddedTouchStart = (e) => {
    embeddedTouchX.current = e.touches[0].clientX;
  };
  const embeddedTouchEnd = (e) => {
    const v = isMobile ? 1 : 2;
    const maxSwipe = Math.max(0, n - v);
    if (embeddedTouchX.current == null || maxSwipe < 1) return;
    const dx = e.changedTouches[0].clientX - embeddedTouchX.current;
    if (dx < -56) handleArrowClick("next");
    else if (dx > 56) handleArrowClick("prev");
    embeddedTouchX.current = null;
  };

  if (embedded) {
    const vShow = isMobile ? 1 : 2;
    const trackWidthPct = n * (100 / vShow);
    const embeddedMaxIdx = Math.max(0, n - vShow);
    const usePixelTrack = embeddedCarousel.stepPx > 0 && embeddedCarousel.slideW > 0;
    const trackTransform = usePixelTrack
      ? `translateX(-${activeIndex * embeddedCarousel.stepPx}px)`
      : `translateX(-${(activeIndex * 100) / n}%)`;

    const embeddedClientLabel =
      typeof data.client_label === "string" && data.client_label.trim()
        ? data.client_label.trim().toUpperCase()
        : "";
    return (
      <div
        className="box-border w-full min-w-0 max-w-[628px] rounded-[20px] bg-transparent p-4 sm:p-5"
      >
        {heading ? (
          <h2
            className={`${poppinsEmbeddedTitle.className} mb-4 w-full text-center font-extrabold tracking-tight text-white`}
            style={{
              fontSize: "31.398px",
              lineHeight: 1.2,
              textAlign: "center",
            }}
          >
            {heading}
          </h2>
        ) : null}

        <div className="flex w-full min-w-0 flex-col gap-3">
          <div className="flex w-full min-w-0 items-center gap-2">
            <div
              ref={embeddedViewportRef}
              className="min-w-0 flex-1 overflow-hidden"
              onTouchStart={embeddedTouchStart}
              onTouchEnd={embeddedTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                style={{
                  gap: `${EMBEDDED_CARD_GAP_PX}px`,
                  ...(usePixelTrack
                    ? {}
                    : { width: `${trackWidthPct}%` }),
                  transform: trackTransform,
                }}
              >
                {testimonialsWithAvatars.map((testimonial, index) => {
                  const quoteText =
                    testimonial.quote || testimonial.text || "";
                  const avatarSrc =
                    typeof testimonial.avatar === "string" && testimonial.avatar
                      ? testimonial.avatar
                      : DEFAULT_AVATAR;
                  return (
                    <div
                      key={index}
                      className="box-border flex min-w-0 shrink-0 flex-col overflow-hidden rounded-[22px] shadow-[0_8px_30px_-8px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.06]"
                      style={{
                        width: usePixelTrack
                          ? embeddedCarousel.slideW
                          : `${100 / n}%`,
                      }}
                    >
                      <div
                        className="flex min-h-[132px] flex-1 flex-col items-center justify-center px-4 pb-5 pt-5 text-center sm:min-h-[152px] sm:px-6 sm:pb-6 sm:pt-6"
                        style={{
                          background:
                            "linear-gradient(180deg, #FFFFFF 0%, #EEF1F8 100%)",
                        }}
                      >
                        <FiveStars className="justify-center" />
                        <blockquote
                          className={`${archivo.className} mt-4 w-full max-w-none text-balance break-words text-center italic font-medium text-[#6E6E6E]`}
                          style={{
                            fontSize: "18.578px",
                            lineHeight: "24.152px",
                          }}
                        >
                          &ldquo;{quoteText}&rdquo;
                        </blockquote>
                      </div>
                      <div
                        className="flex min-h-[56px] shrink-0 items-center gap-2.5 px-3.5 py-3 sm:min-h-[60px] sm:px-4"
                        style={{
                          background:
                            "linear-gradient(180deg, #4F3FB5 0%, #2F5CAC 42%, #156BB8 100%)",
                        }}
                      >
                        <img
                          src={avatarSrc}
                          alt=""
                          className="h-10 w-10 shrink-0 rounded-full border-2 border-white/45 bg-white object-cover sm:h-11 sm:w-11"
                          width={44}
                          height={44}
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="min-w-0 flex-1 text-left leading-tight">
                          <p className="truncate text-sm font-bold text-white sm:text-[15px]">
                            {testimonial.name}
                          </p>
                          <p className="mt-0.5 truncate text-[9px] font-semibold uppercase tracking-wider text-white/90 sm:text-[10px]">
                            {embeddedClientLabel}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {embeddedMaxIdx > 0 ? (
            <div className="flex justify-center gap-2 px-1 pt-1">
              {Array.from({ length: embeddedMaxIdx + 1 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Reviews page ${i + 1} of ${embeddedMaxIdx + 1}`}
                  aria-current={i === activeIndex ? "true" : undefined}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-8 bg-[#EFA536]"
                      : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  const inner = (
    <>
      {heading ? (
        <div className="mb-6 w-full text-center">
          <h2 className="mb-2 text-center text-4xl font-extrabold text-[#002B5B]">
            {heading}
          </h2>
        </div>
      ) : null}

      <div className="relative flex min-h-0 flex-col gap-8 md:flex-row md:items-start md:gap-10">
        <div className="flex shrink-0 items-center justify-between md:mb-0 md:w-48 md:flex-col md:items-start">
          <div className="flex items-center gap-4 md:w-full">
            <div className="flex min-w-0 flex-1 flex-col md:w-full">
              <p className="text-gray-600 font-bold text-xl md:text-3xl capitalize">
                {logo?.logoText}
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="text-yellow-400 text-base md:text-lg"
                  >
                    ★
                  </span>
                ))}
              </div>
              {reviewCount || googleReviewsLabel ? (
                <p className="text-gray-600 text-xs md:text-sm font-medium">
                  {[reviewCount, googleReviewsLabel].filter(Boolean).join(" ")}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="relative min-h-[280px] w-full min-w-0 flex-1 md:min-h-[320px]">
            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 hidden items-center justify-between md:flex">
              <button
                type="button"
                onClick={() => handleArrowClick("prev")}
                className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-gray-100 shadow-md transition-colors hover:bg-primary hover:text-white md:h-10 md:w-10"
                aria-label="Previous testimonial"
              >
                <ChevronLeftIcon className="h-5 w-5 md:h-6 md:w-6" />
              </button>
              <button
                type="button"
                onClick={() => handleArrowClick("next")}
                className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-gray-100 shadow-md transition-colors hover:bg-primary hover:text-white md:h-10 md:w-10"
                aria-label="Next testimonial"
              >
                <ChevronRightIcon className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>

            <div className="testimonial-slider-container relative w-full overflow-hidden pb-2 pt-1 md:px-12">
              <div
                ref={sliderRef}
                className={`testimonial-slider ${
                  isDragging ? "grabbing" : ""
                } gap-3 md:gap-5`}
                style={{ transform: `translateX(${currentTranslate}%)` }}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
              >
                {testimonialsWithAvatars.map((testimonial, index) => (
                  <div key={index} className="testimonial-slide px-1 md:px-1.5">
                    <div className="flex h-full min-h-[260px] flex-1 flex-col rounded-xl border border-gray-100 bg-[#f4f4f4] p-4 shadow-md transition-shadow duration-300 hover:shadow-lg md:min-h-[280px] md:p-5">
                      <div className="flex items-center justify-between mb-2 md:mb-3">
                        <div className="flex gap-2 md:gap-3">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden relative border-2 border-primary">
                            <Image
                              src={testimonial.avatar || DEFAULT_AVATAR}
                              alt={testimonial.name}
                              width={48}
                              height={48}
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-gray-800 font-semibold text-sm md:text-base">
                              {testimonial.name}
                            </h3>
                            <div className="flex gap-0.5 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                  key={star}
                                  className="text-yellow-500 text-sm md:text-base"
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <p className="text-gray-500 text-xs">
                              {testimonial.date}
                            </p>
                          </div>
                        </div>
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#4285F4] font-bold text-xs md:text-sm">
                          G
                        </div>
                      </div>

                      <p className="text-gray-800 text-xs md:text-sm leading-relaxed line-clamp-5 md:line-clamp-none">
                        &quot;{testimonial.quote || testimonial.text}&quot;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .testimonial-slider {
            display: flex;
            transition: ${isDragging ? "none" : "transform 0.5s ease"};
            cursor: grab;
            will-change: transform;
          }

          .testimonial-slider.grabbing {
            cursor: grabbing;
            transition: none;
          }

          .testimonial-slide {
            width: ${isMobile ? "100%" : "50%"};
            box-sizing: border-box;
            flex-shrink: 0;
          }
        `}</style>
    </>
  );

  return (
    <FullContainer className="bg-white pt-6" id="testimonials">
      <Container className="mx-auto px-4">{inner}</Container>
    </FullContainer>
  );
}
