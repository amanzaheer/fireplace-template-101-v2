"use client";
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import FiveStars from "@/components/common/FiveStars";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Testimonials22({ content }) {
  const data = content?.testimonials ?? {};
  const testimonials = Array.isArray(data.list) ? data.list : [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const sliderRef = useRef(null);
  const autoSlideRef = useRef(null);
  const animationRef = useRef(null);

  /** Gap matches `.testimonial-slider` `gap` in styled-jsx (0.75rem ≈ 12px). */
  const slideGapPx = 12;

  useLayoutEffect(() => {
    const checkScreenSize = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  /** Slides visible at once — must match flex basis below (desktop = 5 × ~20% viewport). */
  const visibleSlides = isMobile ? 1 : isTablet ? 2 : 5;
  const count = testimonials.length;
  const effectiveVisible =
    count > 0 ? Math.min(visibleSlides, count) : visibleSlides;
  /** One index step = this % of the inner track. */
  const slideStepPercent = count > 0 ? 100 / count : 100;
  const maxAllowedIndex = Math.max(0, count - visibleSlides);
  const dotCount = maxAllowedIndex + 1;
  const innerTrackWidthPercent =
    count > 0 ? (count / effectiveVisible) * 100 : 100;

  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, maxAllowedIndex));
  }, [maxAllowedIndex]);

  useEffect(() => {
    const t = activeIndex * -slideStepPercent;
    setPrevTranslate(t);
    setCurrentTranslate(t);
  }, [activeIndex, slideStepPercent]);

  useEffect(() => {
    const startAutoSlide = () => {
      autoSlideRef.current = setInterval(() => {
        if (count > 1) {
          setActiveIndex((prev) => {
            const maxIdx = Math.max(0, count - visibleSlides);
            return prev >= maxIdx ? 0 : prev + 1;
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
  }, [isDragging, count, visibleSlides]);
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
    if (count <= 1) return;
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
    const trackWidth = sliderRef.current?.clientWidth || 1;
    const movePercent = (moveX / trackWidth) * 100;
    setCurrentTranslate(movePercent + prevTranslate);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    cancelAnimationFrame(animationRef.current);
    const movedPercent = currentTranslate - prevTranslate;
    const threshold = -Math.max(8, slideStepPercent * 0.25);
    const maxAllowedIndex = Math.max(0, count - visibleSlides);

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
    const maxAllowedIndex = Math.max(0, count - visibleSlides);

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

  return (
    <FullContainer className="py-10 md:py-14 bg-white" id="testimonials">
      <Container className="mx-auto px-4">
        <div className="w-full">
            <h2 className={`${poppins.className} text-black text-4xl md:text-5xl font-extrabold mb-4 md:mb-8 text-center justify-center`}>
              Our Happy Clients
            </h2>

            <div className="relative">
              <button
                type="button"
                onClick={() => handleArrowClick("prev")}
                className="hidden lg:flex absolute -left-14 top-1/2 z-20 h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-black shadow-sm transition hover:bg-neutral-50"
                aria-label="Previous testimonial"
              >
                <ChevronLeftIcon className="h-6 w-6" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => handleArrowClick("next")}
                className="hidden lg:flex absolute -right-14 top-1/2 z-20 h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-black shadow-sm transition hover:bg-neutral-50"
                aria-label="Next testimonial"
              >
                <ChevronRightIcon className="h-6 w-6" aria-hidden />
              </button>

            <div className="testimonial-slider-container w-full mx-auto overflow-hidden">
                <div
                  ref={sliderRef}
                  className={`testimonial-slider ${
                    isDragging ? "grabbing" : ""
                  }`}
                  style={{
                    width: `${innerTrackWidthPercent}%`,
                    transform: `translateX(${currentTranslate}%)`,
                  }}
                  onTouchStart={handleDragStart}
                  onTouchMove={handleDragMove}
                  onTouchEnd={handleDragEnd}
                  onMouseDown={handleDragStart}
                  onMouseMove={handleDragMove}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                >
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="testimonial-slide flex min-h-0 min-w-0 flex-col"
                      style={{
                        flex: `0 0 calc((100% - ${Math.max(0, count - 1) * slideGapPx}px) / ${count})`,
                      }}
                    >
                      <div
                        className={`flex h-full min-h-[260px] w-full flex-1 flex-col rounded-2xl border  border-neutral-200 bg-white p-5 text-left shadow-sm md:min-h-[240px] md:p-8 ${poppins.className}`}
                      >
                        <h3 className="shrink-0 text-lg font-extrabold leading-snug text-black md:text-xl">
                          {testimonial.name}
                        </h3>

                        <FiveStars
                          className="mt-3 shrink-0 justify-start md:mt-1"
                          starClassName="text-[#f59a00]"
                        />

                        <p className="mt-1 min-h-0 flex-1 text-base font-poppins leading-relaxed text-black md:text-[15px] lg:line-clamp-6">
                          &ldquo;{testimonial.quote || testimonial.text}&rdquo;
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {dotCount > 0 ? (
                <div
                  className="mt-8 flex flex-wrap items-center justify-center gap-2 md:mt-10"
                  role="tablist"
                  aria-label="Testimonial slides"
                >
                  {Array.from({ length: dotCount }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={activeIndex === i}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => setActiveIndex(i)}
                      className={`h-4 w-4 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59a00] focus-visible:ring-offset-2 ${
                        activeIndex === i
                          ? "bg-[#f59a00]"
                          : "bg-neutral-300 hover:bg-neutral-400"
                      }`}
                    />
                  ))}
                </div>
              ) : null}
            </div>
        </div>

        <style jsx>{`
          .testimonial-slider {
            display: flex;
            align-items: stretch;
            gap: 0.75rem;
            transition: ${isDragging ? "none" : "transform 0.5s ease"};
            cursor: grab;
            will-change: transform;
          }

          .testimonial-slider.grabbing {
            cursor: grabbing;
            transition: none;
          }

          .testimonial-slide {
            box-sizing: border-box;
          }
        `}</style>
      </Container>
    </FullContainer>
  );
}
