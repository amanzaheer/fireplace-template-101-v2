"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import FiveStars from "@/components/common/FiveStars";
import { Archivo, Poppins } from "next/font/google";

const SECTION_BG = "#F86503";
const CARD_FOOTER = "#082A51";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function QuoteIcon({ className = "h-14 w-14 text-white" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M681.526 1094.657c212.643-14.942 518.306-48.892 518.474-465.344v-523.97H725.496v560.61h157.559c9.98 149.693-113.285 188.346-247.329 218.017zm-635.724 0c212.644-14.942 518.307-48.894 518.474-465.344v-523.97H89.77v560.61h157.559C257.311 815.647 134.044 854.3 0 883.971z" />
    </svg>
  );
}

function getInitials(name) {
  if (!name || typeof name !== "string") return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.trim().slice(0, 2).toUpperCase() || "?";
}

export default function Testimonials21({ content }) {
  const logo = content?.navbar?.logo ?? {};
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

  useEffect(() => {
    const checkScreenSize = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const visibleSlides = isMobile ? 1 : isTablet ? 2 : 3;
  const slideStep = testimonials.length > 0 ? 100 / visibleSlides : 0;

  useEffect(() => {
    const nextTranslate = activeIndex * -slideStep;
    setPrevTranslate(nextTranslate);
    setCurrentTranslate(nextTranslate);
    if (sliderRef.current && !isDragging) {
      sliderRef.current.style.transform = `translateX(${nextTranslate}%)`;
    }
  }, [activeIndex, slideStep, isDragging]);

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
  }, [isDragging, testimonials.length, isMobile, isTablet]);

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
    if (testimonials.length <= 1) return;
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

  useEffect(
    () => () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    },
    [],
  );

  if (!testimonials.length) return null;

  const spotlight = testimonials[activeIndex];

  return (
    <FullContainer
      id="testimonials"
      style={{ backgroundColor: SECTION_BG }}
      className="relative overflow-hidden py-10 md:py-14"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 20% 30%, white, transparent 45%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.15), transparent 40%)",
        }}
      />

      <Container className="relative z-10 mx-auto flex min-h-[500px] max-w-[1200px] items-center justify-center px-4">
        <div className="flex w-full flex-col items-center justify-center gap-8 lg:flex-row lg:gap-10">
          <div className="flex w-full shrink-0 flex-col items-center justify-center text-center text-white lg:w-[240px]">
            <div className="mb-2 flex justify-center">
              <QuoteIcon className="h-14 w-14 rotate-180 text-white" />
            </div>
            <p
              className={`${poppins.className} mb-3 text-[34px] font-extrabold capitalize leading-tight`}
            >
              {logo?.logoText ?? "Reviews"}
            </p>
            <FiveStars className="mb-2" starClassName="!text-white" />
            <p
              className={`${archivo.className} text-[28px] font-extrabold leading-none`}
            >
              {spotlight?.name}
            </p>
          </div>

          <div className="flex w-full flex-1 flex-col justify-center">
            <h2
              className={`${poppins.className} mb-4 text-center text-4xl font-extrabold text-white md:mb-6 md:text-5xl`}
            >
              {data.heading ?? "Our Happy Clients"}
            </h2>

            <div className="relative">
              <div className="testimonial-slider-container mx-auto w-full max-w-[1020px] overflow-x-hidden">
                <div
                  ref={sliderRef}
                  className={`testimonial-slider ${isDragging ? "grabbing" : ""}`}
                  style={{ transform: `translateX(${currentTranslate}%)` }}
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
                      key={`${testimonial.name}-${index}`}
                      className="testimonial-slide px-2 md:px-3"
                    >
                      <div className="overflow-hidden rounded-t-[14px] rounded-b-none bg-transparent">
                        <div className="flex min-h-[205px] flex-col rounded-t-[14px] bg-[#f5f5f5] p-5 md:min-h-[220px] md:p-7">
                          <FiveStars
                            className="mb-4"
                            starClassName="text-[#F86503]"
                          />
                          <p
                            className={`${archivo.className} flex-1 text-[18px] italic leading-[1.4] text-[#545454] md:text-[20px]`}
                          >
                            &ldquo;{testimonial.quote || testimonial.text}
                            &rdquo;
                          </p>
                        </div>
                        <div
                          className="rounded-b-xl px-3 py-2.5 md:py-3"
                          style={{ backgroundColor: CARD_FOOTER }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-white/30 bg-white/15 text-[15px] font-extrabold uppercase leading-none tracking-wide text-white ring-2 ring-white/20"
                              aria-hidden
                            >
                              {getInitials(testimonial.name)}
                            </div>
                            <div className="min-w-0 text-left">
                              <h3
                                className={`${archivo.className} text-[18px] font-extrabold leading-none text-white md:text-[20px]`}
                              >
                                {testimonial.name}
                              </h3>
                              <p
                                className={`${archivo.className} text-[12px] font-semibold uppercase tracking-widest text-white/80`}
                              >
                                Client
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
            width: ${isMobile ? "100%" : isTablet ? "50%" : "33.3333%"};
            box-sizing: border-box;
            flex-shrink: 0;
          }
        `}</style>
      </Container>
    </FullContainer>
  );
}
