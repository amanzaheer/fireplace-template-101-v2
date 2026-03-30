"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import FiveStars from "@/components/common/FiveStars";
import { Poppins, Inter, Rubik } from "next/font/google";
import { Archivo } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const archivo = Archivo({
  subsets: ["latin", "italian"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});
export default function Testimonials3({ content }) {
  const data = content?.testimonials ?? {};
  const testimonials = Array.isArray(data.list) ? data.list : [];
  const reviewCount = data.reviewCount ?? "150+";

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const autoSlideRef = useRef(null);
  const animationRef = useRef(null);

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

  // Returns the exact pixel distance for one slide step:
  // slideWidth + gap, measured from the real container width.
  // This avoids the cumulative drift that happens with %-based translateX
  // (which is relative to the track element, not the container).
  const getStepPx = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth;
    if (!containerWidth) return 0;
    const visibleSlides = isMobile ? 1 : isTablet ? 2 : 3;
    const gapPx = isMobile ? 12 : 16; // gap-3 = 12px, md:gap-4 = 16px
    const slideWidth =
      (containerWidth - (visibleSlides - 1) * gapPx) / visibleSlides;
    return slideWidth + gapPx;
  }, [isMobile, isTablet]);

  useEffect(() => {
    const stepPx = getStepPx();
    if (!stepPx) return;
    const translatePx = activeIndex * -stepPx;
    setPrevTranslate(translatePx);
    setCurrentTranslate(translatePx);
  }, [activeIndex, getStepPx]);

  useEffect(() => {
    const startAutoSlide = () => {
      autoSlideRef.current = setInterval(() => {
        if (testimonials.length > 1) {
          setActiveIndex((prev) => {
            const visibleSlides = isMobile ? 1 : isTablet ? 2 : 3;
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
      sliderRef.current.style.transform = `translateX(${currentTranslate}px)`;
    });
  }, [isDragging, currentTranslate]);

  const setSliderPosition = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(${currentTranslate}px)`;
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
    setCurrentTranslate(moveX + prevTranslate);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    cancelAnimationFrame(animationRef.current);
    const movedPx = currentTranslate - prevTranslate;
    const threshold = Math.max(50, (getStepPx() || 200) * 0.2);
    const visibleSlides = isMobile ? 1 : isTablet ? 2 : 3;
    const maxAllowedIndex = Math.max(0, testimonials.length - visibleSlides);

    if (movedPx < -threshold) {
      if (activeIndex >= maxAllowedIndex) {
        setActiveIndex(0);
      } else {
        setActiveIndex(activeIndex + 1);
      }
    } else if (movedPx > threshold) {
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
    const visibleSlides = isMobile ? 1 : isTablet ? 2 : 3;
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

  const leftTitle =
    data?.title ??
    testimonialsWithAvatars?.[0]?.title ??
    "Chimney Maintenance";
  const leftName = testimonialsWithAvatars?.[0]?.name ?? "Mr. John Doe";

  return (
    <FullContainer className="py-10 md:py-14 bg-[#6b6b6b] overflow-hidden" id="testimonials">
      <Container className="mx-auto px-4">
        <div className="text-center mb-8 md:mb-10">
          <h2 className={`${poppins.className} text-3xl md:text-[32px] font-bold text-center text-white mb-2`}>
            Our Happy Clients
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-7 relative overflow-hidden">
          <div className="md:w-[22%] lg:w-[24%] text-white pt-2 min-w-0 ">
           <Image src="/st-icons/Temp3/quote.png" alt="Quote" width={100} height={100} className="w-auto h-8 md:h-10 mb-10" />
            <h3 className={`${poppins.className} text-2xl md:text-[32px] font-bold leading-tight capitalize wrap-break-word mb-8`}>
              {leftTitle}
            </h3>
            <FiveStars
              className="mb-4"
              starClassName="text-[#f3a008]"
            />
            <p className={`${archivo.className} text-lg md:text-[20px] font-bold leading-tight wrap-break-word`}>{leftName}</p>
            <p className={`${archivo.className} text-white/90 text-xs md:text-sm font-semibold uppercase tracking-wider`}>
              Clients
            </p>
          </div>

          <div className="relative md:h-[395px] w-full md:w-[78%] lg:w-[80%] min-w-0">
            <div className="hidden md:flex w-full absolute items-center justify-between z-10 h-full pointer-events-none">
              <button
                type="button"
                onClick={() => handleArrowClick("prev")}
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/70 border border-white/60 hover:bg-white transition-colors shadow-md pointer-events-auto"
                aria-label="Previous testimonial"
              >
                <ChevronLeftIcon className="w-6 h-6 text-[#1f1f1f]" />
              </button>
              <button
                type="button"
                onClick={() => handleArrowClick("next")}
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/70 border border-white/60 hover:bg-white transition-colors shadow-md pointer-events-auto"
                aria-label="Next testimonial"
              >
                <ChevronRightIcon className="w-6 h-6 text-[#1f1f1f]" />
              </button>
            </div>

            <div ref={containerRef} className="testimonial-slider-container overflow-hidden relative md:h-[395px] w-full">
              <div
                ref={sliderRef}
                className={`testimonial-slider ${
                  isDragging ? "grabbing" : ""
                } gap-3 md:gap-4`}
                style={{ transform: `translateX(${currentTranslate}px)` }}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
              >
                {testimonialsWithAvatars.map((testimonial, index) => (
                  <div key={index} className="testimonial-slide">
                    <div className="flex flex-col h-full rounded-t-[14px] bg-white overflow-hidden border border-[#444] shadow-sm">
                      <div className="flex-1 p-8 md:p-12">
                        <FiveStars
                          className="mb-3"
                          starClassName="text-[#f3a008]"
                        />
                        <p className={`${archivo.className} italic text-[#5f5f5f] text-lg md:text-xl leading-tight line-clamp-5`}>
                          &ldquo;{testimonial.quote || testimonial.text}&rdquo;
                        </p>
                      </div>

                      <div className="bg-[#1b1b1b] p-2  flex items-center gap-2">
                        <div className="w-12 h-12 rounded-full overflow-hidden relative border border-[#3d3d3d] bg-white">
                          <Image
                            src={testimonial.avatar || defaultAvatar}
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="leading-tight">
                          <h4 className={`${archivo.className}  text-white text-base md:text-[20px] font-bold wrap-break-word`}>
                            {testimonial.name || "Mr. John Doe"}
                          </h4>
                          <p className={`${archivo.className} text-[#75d6f1] text-xs md:text-sm font-semibold uppercase tracking-wide`}>
                            Clients
                          </p>
                        </div>
                      </div>
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
            width: ${isMobile
              ? "100%"
              : isTablet
                ? "calc((100% - 1rem) / 2)"
                : "calc((100% - 2rem) / 3)"};
            box-sizing: border-box;
            flex-shrink: 0;
            min-width: 0;
          }
        `}</style>
      </Container>
    </FullContainer>
  );
}
