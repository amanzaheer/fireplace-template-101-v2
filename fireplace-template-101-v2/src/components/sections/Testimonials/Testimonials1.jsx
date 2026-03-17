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
import Logo from "@/components/common/Logo";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function Testimonials1({ content }) {
  const logo = content?.navbar?.logo ?? {};
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

  const getSlideSize = () => {
    if (isMobile) return 100;
    if (isTablet) return 50;
    return 33.333;
  };

  const slideSize = getSlideSize();

  useEffect(() => {
    setPrevTranslate(activeIndex * -slideSize);
    setCurrentTranslate(activeIndex * -slideSize);
  }, [activeIndex, slideSize]);

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
    const visibleSlides = isMobile ? 1 : isTablet ? 2 : 3;
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

  return (
    <FullContainer className="pt-6 md:pt-6 bg-white" id="testimonials">
      <Container className="mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-[#002B5B] mb-2">
            Our Happy Clients
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-10 relative h-[340px]">
          <div className="flex items-center justify-between mb-1 md:mb-8">
            <div className="flex items-center gap-4">
              <div className="flex flex-col flex-1 md:w-32">
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
                <p className="text-gray-600 text-xs md:text-sm font-medium">
                  {reviewCount} Google Reviews
                </p>
              </div>
            </div>
          </div>

          <div className="relative md:h-80 w-full flex-1">
            <div className="hidden md:flex w-full absolute items-center justify-between z-10 h-full pointer-events-none">
              <button
                type="button"
                onClick={() => handleArrowClick("prev")}
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-gray-100 border border-gray-300 hover:bg-primary hover:text-white transition-colors shadow-md pointer-events-auto"
                aria-label="Previous testimonial"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() => handleArrowClick("next")}
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-gray-100 border border-gray-300 hover:bg-primary hover:text-white transition-colors shadow-md pointer-events-auto"
                aria-label="Next testimonial"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="testimonial-slider-container overflow-hidden mb-80 md:mb-8 absolute h-[280px] md:h-72 top-0 w-full">
              <div
                ref={sliderRef}
                className={`testimonial-slider ${
                  isDragging ? "grabbing" : ""
                } gap-3 md:gap-4`}
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
                  <div key={index} className="testimonial-slide px-1 md:px-2">
                    <div className="flex-1 p-4 md:p-5 rounded-xl bg-[#f4f4f4] shadow-md h-full border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-center justify-between mb-2 md:mb-3">
                        <div className="flex gap-2 md:gap-3">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden relative border-2 border-primary">
                            <Image
                              src={testimonial.avatar || defaultAvatar}
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
            width: ${isMobile ? "100%" : isTablet ? "50%" : "33.333%"};
            box-sizing: border-box;
            flex-shrink: 0;
          }
        `}</style>
      </Container>
    </FullContainer>
  );
}
