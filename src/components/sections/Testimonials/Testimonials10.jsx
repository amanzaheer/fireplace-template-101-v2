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
import { IMAGE_BASE } from "@/lib/constants";
import Contact10 from "@/components/sections/Contact/Contact10";
import { Poppins } from "next/font/google";
import { Archivo } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const archivo = Archivo({
  subsets: ["latin", "italian"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

/** Optional `reviewLine` from `content.testimonials.google_review_line`; else default strip. */
function GoogleReviewStrip({ reviewLine }) {
  const line =
    typeof reviewLine === "string" && reviewLine.trim()
      ? reviewLine.trim()
      : "4.9 | 6/9 reviews";

  return (
    <div
      className={`flex w-full max-w-xl items-center gap-2 rounded-2xl border ml-4 border-white/40 bg-white px-4 py-3 shadow-md sm:gap-3 sm:px-6 ${poppins.className}`}
    >
      <div className="flex shrink-0 items-center gap-2" aria-hidden>
        <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" role="img">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span className="text-[15px] font-semibold tracking-tight text-gray-800">
          Google
        </span>
      </div>
      <FiveStars className="shrink-0 sm:ml-1" starClassName="text-[#fbbc04]" />
      <p className="shrink-0 text-[13px] font-semibold tabular-nums text-gray-800 sm:ml-2 sm:text-sm">
        {line}
      </p>
    </div>
  );
}

export default function Testimonials10({ content }) {
  const data = content?.testimonials ?? {};
  const testimonials = Array.isArray(data.list) ? data.list : [];
  const sectionTitle =
    (typeof data.section_title === "string" && data.section_title.trim()
      ? data.section_title.trim()
      : null) ||
    (typeof data.title === "string" && data.title.trim()
      ? data.title.trim()
      : null) ||
    "Our Happy Clients";

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);
  const autoSlideRef = useRef(null);
  const animationRef = useRef(null);

  const testimonialsWithAvatars = useMemo(() => {
    const getRandomAvatar = (seed) =>
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
        seed,
      )}`;

    return testimonials.map((testimonial, index) => ({
      ...testimonial,
      avatar:
        testimonial.avatar ||
        getRandomAvatar(testimonial.name || `user-${index}`),
    }));
  }, [testimonials]);

  const defaultAvatar = useMemo(
    () => "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
    [],
  );

  const testimonialsBg =
    buildImageSrc(IMAGE_BASE, data?.file_name) ||
    buildImageSrc(IMAGE_BASE, "testimonials/testimonials10.jpg");

  const hasTestimonials = testimonials.length > 0;
  const footerColors = ["bg-[#4685ac]", "bg-[#ee4545]"];

  useEffect(() => {
    const checkScreenSize = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const visibleSlides = isMobile ? 1 : 2;
  const slideStep = testimonials.length > 0 ? 100 / visibleSlides : 0;

  useEffect(() => {
    const max = Math.max(0, testimonials.length - visibleSlides);
    setActiveIndex((i) => Math.min(i, max));
  }, [testimonials.length, visibleSlides]);

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
  }, [isDragging, testimonials.length, visibleSlides]);

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

  return (
    <FullContainer
      className="relative overflow-hidden py-10 md:py-14"
      id="testimonials"
    >
      {testimonialsBg ? (
        <div className="absolute inset-0">
          <Image
            src={testimonialsBg}
            alt="Testimonials background"
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center bottom" }}
            priority={false}
          />
        </div>
      ) : null}
      <div className="absolute inset-0 bg-sky-950/75" />

      <Container className="relative z-10 mx-auto max-w-[1280px] px-4">
        <div className="flex flex-col items-stretch gap-8 lg:flex-row lg:items-center lg:gap-10">
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <GoogleReviewStrip reviewLine={data.google_review_line} />

            {hasTestimonials ? (
              <>
               

                <div className="relative w-full">
                  <div className="testimonial-slider-container mx-auto w-full max-w-[1020px] overflow-x-hidden">
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
                        <div
                          key={`${testimonial.name}-${index}`}
                          className="testimonial-slide px-2 md:px-3"
                        >
                          <article className="overflow-hidden rounded-b-0 rounded-t-[14px] shadow-lg">
                            <div className="flex min-h-[180px] flex-col border border-[#d7d7d7] border-b-0 bg-[#f5f5f5] p-5 sm:min-h-[200px] sm:p-6 md:min-h-[205px] md:p-7">
                              <FiveStars
                                className="mb-3 md:mb-4"
                                starClassName="text-[#f59a00]"
                              />
                              <p
                                className={`${archivo.className} flex-1 text-[16px] italic leading-snug text-[#545454] md:text-[18px] md:leading-[1.4] lg:text-[20px]`}
                              >
                                &ldquo;
                                {testimonial.quote || testimonial.text}
                                &rdquo;
                              </p>
                            </div>
                            <div
                              className={`px-3 py-2.5 md:py-3 ${footerColors[index % footerColors.length]}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                                  <Image
                                    src={testimonial.avatar || defaultAvatar}
                                    alt={testimonial.name || "Client"}
                                    width={44}
                                    height={44}
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                                <div className="min-w-0">
                                  <h3
                                    className={`${archivo.className} truncate text-[17px] font-extrabold leading-tight text-white md:text-[18px] lg:text-[20px]`}
                                  >
                                    {testimonial.name}
                                  </h3>
                                  <p
                                    className={`${archivo.className} text-[11px] font-semibold uppercase tracking-widest text-white/85 md:text-[12px]`}
                                  >
                                    Clients
                                  </p>
                                </div>
                              </div>
                            </div>
                          </article>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>

          <div className="flex w-full shrink-0 justify-center lg:w-[439px] lg:justify-end">
            <Contact10 content={content} embedded />
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
      </Container>
    </FullContainer>
  );
}
