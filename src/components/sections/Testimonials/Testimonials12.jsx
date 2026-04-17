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
import QuoteForm12 from "../Banner/QuoteForm/QuoteForm12";
import Contact12 from "../Contact/Contact12";


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

export default function Testimonials12({ content }) {
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
    <FullContainer className="py-10 md:py-14 bg-white" id="testimonials">
      <Container className="mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 lg:gap-10">
          <div>
         <Contact12/>
          </div>
          <div className="flex flex-col ">
            <p
              className={`${archivo.className} text-white font-extrabold text-[28px] leading-none`}
            >
              {testimonialsWithAvatars[activeIndex]?.name}
            </p>
            <p
              className={`${archivo.className} text-white/80 text-[14px] font-semibold uppercase tracking-[0.12em]`}
            >
              Clients
            </p>

            <div className="w-full flex-1">
              <h2
                className={`${poppins.className} text-black text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 ml-22`}
              >
                Our Happy Clients
              </h2>

              <div className="relative">
                <div className="testimonial-slider-container overflow-hidden w-full max-w-[580px] p-1 mx-auto">
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
                        <div className="bg-white p-6 md:p-8 rounded-2xl min-h-[280px] md:min-h-[300px] flex flex-col shadow-[0_5px_10px_rgba(0,0,0,0.15)]">
                          <div className="flex items-center gap-4 mb-5">
                            <div className="w-20 h-20 rounded-full overflow-hidden relative shrink-0">
                              <Image
                                src={testimonial.avatar || defaultAvatar}
                                alt={testimonial.name}
                                width={80}
                                height={80}
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                            <div className="min-w-0">
                              <h3
                                className={`${archivo.className} text-black font-extrabold text-[20px] md:text-[25px] leading-tight wrap-break-word`}
                              >
                                {testimonial.name}
                              </h3>
                              <p
                                className={`${archivo.className} text-black text-[20px] md:text-[25px] leading-none font-extrabold uppercase tracking-[0.08em]`}
                              >
                                CLIENTS
                              </p>
                              <FiveStars
                                className="mt-2"
                                starClassName="text-[#f59a00]"
                              />
                            </div>
                          </div>

                          <p
                            className={`${archivo.className} text-[#666666] italic text-[15px] md:text-[20px] leading-[1.2] flex-1 wrap-break-word`}
                          >
                            &ldquo; {testimonial.quote || testimonial.text}{" "}
                            &rdquo;
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-5 mt-6">
                  <button
                    type="button"
                    onClick={() => handleArrowClick("prev")}
                    className="w-14 h-14 flex items-center justify-center rounded-full border-[3px] border-black text-black hover:bg-black hover:text-white transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeftIcon className="w-8 h-8" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleArrowClick("next")}
                    className="w-14 h-14 flex items-center justify-center rounded-full border-[3px] border-black text-black hover:bg-black hover:text-white transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRightIcon className="w-8 h-8" />
                  </button>
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
            touch-action: pan-y;
          }

          .testimonial-slider.grabbing {
            cursor: grabbing;
            transition: none;
          }

          .testimonial-slide {
            width: 100%;
            box-sizing: border-box;
            flex-shrink: 0;
            padding: 10px;
          }
        `}</style>
      </Container>
    </FullContainer>
  );
}
