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

export default function Testimonials20({ content }) {
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
  const visibleSlides = isMobile ? 1 : isTablet ? 2 : 3;
  const maxAllowedIndex = Math.max(0, testimonials.length - visibleSlides);
  const totalDots = Math.max(1, maxAllowedIndex + 1);

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
    <FullContainer className="bg-[#4561AF] py-12 md:py-16" id="testimonials">
      <Container className="mx-auto px-5">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="text-4xl font-extrabold text-white md:text-5xl">
            Our Happy Customers
          </h2>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="testimonial-slider-container overflow-hidden">
            <div className="mb-8 h-auto min-h-[270px] w-full">
              <div
                ref={sliderRef}
                className={`testimonial-slider ${
                  isDragging ? "grabbing" : ""
                } gap-6`}
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
                  <div key={index} className="testimonial-slide">
                    <div className="h-full rounded-lg p-1 text-left">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="h-12 w-12 overflow-hidden rounded-md relative">
                            <Image
                              src={testimonial.avatar || defaultAvatar}
                              alt={testimonial.name}
                              width={48}
                              height={48}
                              className="h-full w-full object-cover"
                              unoptimized
                            />
                          </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white md:text-[26px]">
                              {testimonial.name}
                            </h3>
                          </div>
                      </div>
                      <div className="mb-2 flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                  key={star}
                            className="text-3xl leading-none text-[#F2B13D]"
                                >
                                  ★
                                </span>
                              ))}
                      </div>
                      <p className="max-w-[95%] text-lg leading-9 text-[#E8ECFF]">
                        {testimonial.quote || testimonial.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-2 flex justify-center gap-2">
            {Array.from({ length: totalDots }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`h-3 w-3 rounded-full transition-colors ${
                  idx === activeIndex ? "bg-[#F2B13D]" : "bg-white/70"
                }`}
                aria-label={`Go to testimonial page ${idx + 1}`}
              />
            ))}
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
