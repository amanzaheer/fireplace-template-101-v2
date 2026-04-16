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
import FiveStars from "@/components/common/FiveStars";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
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

function QuoteIcon({ className = "w-14 h-14 text-[#f59a00]" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1200"
      height="1200"
      viewBox="0 0 1200 1200"
      fill="currentColor"
      className={className}
    >
      <path d="M681.526 1094.657c212.643-14.942 518.306-48.892 518.474-465.344v-523.97H725.496v560.61h157.559c9.98 149.693-113.285 188.346-247.329 218.017zm-635.724 0c212.644-14.942 518.307-48.894 518.474-465.344v-523.97H89.77v560.61h157.559C257.311 815.647 134.044 854.3 0 883.971z" />
    </svg>
  );
}

export default function Testimonials15({ content }) {
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

  const getSlideSize = () => 100;

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
    <FullContainer className="py-10 md:py-14 lg:py-22  bg-[#172b60] " id="testimonials">
      <Container className="max-w-[880px] mx-auto px-4 lg:px-0! ">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          <div className="w-full lg:w-[240px] h-full shrink-0 text-white ">
            <div className="mb-2">
              <QuoteIcon className="w-10 h-10 text-[#f59a00] rotate-180" />
            </div>
            <p className={`${poppins.className} font-extrabold text-[24px] leading-tight mb-3 capitalize`}>
              {logo?.logoText}
            </p>
            <FiveStars className="mb-2" starClassName="text-[#f59a00] text-[16px]!" />
            <p className={`${archivo.className} text-white font-extrabold text-[18px] leading-none`}>
              {testimonialsWithAvatars[activeIndex]?.name}
            </p>
            <p className={`${archivo.className} text-white/80 text-[12px] font-semibold uppercase tracking-[0.12em]`}>
              Clients
            </p>
          </div>

          <div className="w-full flex-1">
            <h2 className={`${poppins.className} text-[#ffffff] text-[24px] md:text-[32px]  w-full font-semibold mb-4 md:mb-6`}>
              Our Happy Clients
            </h2>

            <div className="relative">
            <div className="testimonial-slider-container overflow-x-hidden w-full max-w-[600px] mx-auto rounded-lg">
                <div
                  ref={sliderRef}
                  className={`testimonial-slider ${
                    isDragging ? "grabbing" : ""
                  }`}
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
                      <div className="bg-white/90 border border-[#d7d7d7] p-5 md:p-7 min-h-[220px] md:min-h-[230px] flex flex-col">
                        <FiveStars className="mb-4" starClassName="text-[#f59a00] text-[16px]!" />

                        <p className={`${archivo.className} text-[#545454] italic text-[16px] leading-[1.45] flex-1`}>
                          &ldquo;{testimonial.quote || testimonial.text}&rdquo;
                        </p>

                        <div className="flex items-center justify-between mt-5">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden relative">
                              <Image
                                src={testimonial.avatar || defaultAvatar}
                                alt={testimonial.name}
                                width={48}
                                height={48}
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                            <div>
                              <h3 className={`${archivo.className} text-black font-extrabold text-[18px] leading-none`}>
                                {testimonial.name}
                              </h3>
                              <p className={`${archivo.className} text-black/70 text-[12px] font-semibold uppercase tracking-widest`}>
                                Clients
                              </p>
                            </div>
                          </div>
                           
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => handleArrowClick("prev")}
                              className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black text-black hover:bg-black hover:text-white transition-colors"
                              aria-label="Previous testimonial"
                            >
                              <ChevronLeftIcon className="w-5 h-5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleArrowClick("next")}
                              className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black text-black hover:bg-black hover:text-white transition-colors"
                              aria-label="Next testimonial"
                            >
                              <ChevronRightIcon className="w-5 h-5" />
                            </button>
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
            width: 100%;
            box-sizing: border-box;
            flex-shrink: 0;
          }
        `}</style>
      </Container>
    </FullContainer>
  );
}
