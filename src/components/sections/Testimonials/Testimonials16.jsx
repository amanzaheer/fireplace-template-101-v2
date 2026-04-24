"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Image from "next/image";
import { Star } from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal"],
});

function str(v) {
  if (v == null) return "";
  return String(v).trim();
}

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  if (/^https?:\/\//i.test(filePath)) return filePath;
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  return `${basePath}/${filePath.replace(/^\//, "")}`;
}

/** Two-line brand (e.g. "Fireplace Built" → "Fireplace\nBuilt"); respects explicit `\n`. */
function brandHeadlineFromLogo(logoText) {
  const t = str(logoText);
  if (!t) return "";
  if (t.includes("\n")) return t;
  const i = t.indexOf(" ");
  if (i > 0) return `${t.slice(0, i)}\n${t.slice(i + 1).trim()}`;
  return t;
}

/** Prev/next control from design asset (35×35, ring + arrow). */
function TestimonialNavArrowIcon({ className, direction = "prev" }) {
  const paths = (
    <>
      <path
        d="M27.6759 17.9473C27.165 23.8373 21.9898 28.1864 16.0999 27.6755C10.2099 27.1646 5.8608 21.9895 6.37168 16.0995C6.88255 10.2095 12.0577 5.86043 17.9477 6.3713C23.8377 6.88218 28.1867 12.0573 27.6759 17.9473ZM7.62487 16.2082C7.17377 21.4089 11.0078 25.9712 16.2085 26.4223C21.4093 26.8734 25.9716 23.0394 26.4227 17.8386C26.8738 12.6379 23.0397 8.07558 17.839 7.62449C12.6383 7.1734 8.07596 11.0074 7.62487 16.2082Z"
        fill="currentColor"
      />
      <path
        d="M18.5399 11.915L12.8881 16.6647L17.6377 22.3165L16.6844 23.1176L11.1336 16.5125L17.7388 10.9617L18.5399 11.915Z"
        fill="currentColor"
      />
      <path
        d="M11.9565 17.2154L12.0652 15.9622L22.7173 16.8862L22.6086 18.1394L11.9565 17.2154Z"
        fill="currentColor"
      />
    </>
  );
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={35}
      height={35}
      viewBox="0 0 35 35"
      fill="none"
      aria-hidden
    >
      {direction === "next" ? (
        <g transform="translate(35 0) scale(-1 1)">{paths}</g>
      ) : (
        paths
      )}
    </svg>
  );
}

/** Verified badge next to reviewer name (CMS SVG). */
function VerifiedBadgeIcon({ className }) {
  return (
    <svg
      className={className}
      width={27}
      height={27}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12.0573 13.9842L10.4607 12.4151C10.2588 12.2132 10.0066 12.1123 9.7042 12.1123C9.40176 12.1123 9.14006 12.2224 8.9191 12.4426C8.71722 12.6445 8.61629 12.9014 8.61629 13.2134C8.61629 13.5254 8.71722 13.7823 8.9191 13.9842L11.2865 16.3516C11.5067 16.5718 11.7637 16.6819 12.0573 16.6819C12.3509 16.6819 12.6079 16.5718 12.8281 16.3516L17.5079 11.6718C17.7281 11.4516 17.8334 11.1947 17.8239 10.901C17.8143 10.6074 17.709 10.3505 17.5079 10.1303C17.2876 9.91003 17.0263 9.79551 16.7239 9.7867C16.4214 9.77789 16.1597 9.88324 15.9388 10.1027L12.0573 13.9842ZM8.97415 23.9494L7.37752 21.2516L4.34943 20.5909C4.07415 20.5359 3.85393 20.3938 3.68876 20.1648C3.52359 19.9358 3.45936 19.6832 3.49606 19.4072L3.79887 16.2965L1.73427 13.9291C1.55074 13.7273 1.45898 13.4887 1.45898 13.2134C1.45898 12.9381 1.55074 12.6995 1.73427 12.4977L3.79887 10.1303L3.49606 7.01958C3.45936 6.7443 3.52359 6.49177 3.68876 6.26201C3.85393 6.03224 4.07415 5.89019 4.34943 5.83587L7.37752 5.1752L8.97415 2.47745C9.12097 2.23887 9.32284 2.0781 9.57977 1.99515C9.8367 1.9122 10.0936 1.92615 10.3506 2.037L13.2135 3.24823L16.0764 2.037C16.3333 1.92688 16.5903 1.91294 16.8472 1.99515C17.1041 2.07737 17.306 2.23813 17.4528 2.47745L19.0494 5.1752L22.0775 5.83587C22.3528 5.89093 22.573 6.03334 22.7382 6.26311C22.9034 6.49288 22.9676 6.74503 22.9309 7.01958L22.6281 10.1303L24.6927 12.4977C24.8762 12.6995 24.968 12.9381 24.968 13.2134C24.968 13.4887 24.8762 13.7273 24.6927 13.9291L22.6281 16.2965L22.9309 19.4072C22.9676 19.6825 22.9034 19.935 22.7382 20.1648C22.573 20.3946 22.3528 20.5366 22.0775 20.5909L19.0494 21.2516L17.4528 23.9494C17.306 24.1879 17.1041 24.3487 16.8472 24.4316C16.5903 24.5146 16.3333 24.5007 16.0764 24.3898L13.2135 23.1786L10.3506 24.3898C10.0936 24.4999 9.8367 24.5139 9.57977 24.4316C9.32284 24.3494 9.12097 24.1887 8.97415 23.9494Z"
        fill="#0F9E5B"
      />
    </svg>
  );
}

export default function Testimonials16({ content }) {
  const data = content?.testimonials ?? {};
  const logo = content?.navbar?.logo ?? {};
  const testimonials = Array.isArray(data.list) ? data.list : [];
  const sectionTitle = str(data.title) || str(data.heading);
  const summaryLabel = str(data.summary_label);
  const summaryNote = str(data.summary_note);
  const reviewCountStr = str(data.reviewCount);
  const summaryRating = Math.min(
    5,
    Math.max(0, Number.parseInt(String(data.summary_rating ?? ""), 10) || 0),
  );
  const summaryImageRaw = str(data.summary_image);
  const summaryImageResolved = summaryImageRaw
    ? buildImageSrc(IMAGE_BASE, summaryImageRaw)
    : "";
  /** Left column headline: CMS `summary_label`, else navbar `logoText` (split for two-line brand). */
  const sidebarHeadline = summaryLabel || brandHeadlineFromLogo(logo?.logoText);
  /** Aggregate stars in sidebar: `summary_rating` from CMS, else 5. */
  const sidebarStarCount = summaryRating > 0 ? summaryRating : 5;
  const showSidebar = testimonials.length > 0;

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
    <FullContainer className="bg-neutral-50 py-10 md:py-14" id="testimonials">
      <Container className="mx-auto max-w-6xl px-4 sm:px-6">
        {sectionTitle ? (
          <h2
            className={cn(
              "mb-10 text-center text-3xl font-bold leading-tight tracking-tight `text-[#000]` md:mb-12 md:text-4xl",
              poppins.className,
            )}
          >
            {sectionTitle}
          </h2>
        ) : null}

        <div
          className={cn(
            "flex flex-col gap-10 lg:items-stretch lg:gap-12",
            showSidebar ? "lg:flex-row" : "",
          )}
        >
          {showSidebar ? (
            <aside className="flex shrink-0 flex-col items-center gap-3 border-neutral-200 text-center lg:w-[220px] lg:items-start lg:border-r lg:pr-10 lg:text-left">
              {sidebarHeadline ? (
                <p
                  className={cn(
                    "whitespace-pre-line text-2xl font-bold leading-tight tracking-tight text-[#02050a] md:text-3xl",
                    poppins.className,
                  )}
                >
                  {sidebarHeadline}
                </p>
              ) : null}
              <div
                className="flex justify-center gap-0.5 lg:justify-start"
                aria-hidden
              >
                {Array.from({ length: sidebarStarCount }, (_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 fill-[#EFA536] text-[#EFA536] md:h-7 md:w-7"
                    strokeWidth={0}
                  />
                ))}
              </div>
              {summaryNote ? (
                <p
                  className={cn(
                    "text-base font-normal leading-snug text-[#3182CE] md:text-lg",
                    poppins.className,
                  )}
                >
                  {summaryNote}
                </p>
              ) : reviewCountStr ? (
                <p
                  className={cn(
                    "text-base font-normal leading-snug text-[#3182CE] md:text-lg",
                    poppins.className,
                  )}
                >
                  {reviewCountStr} Google Reviews
                </p>
              ) : null}
              {summaryImageResolved ? (
                <div className="flex w-full max-w-[200px] justify-center lg:justify-start">
                  <Image
                    src={summaryImageResolved}
                    alt=""
                    width={160}
                    height={48}
                    className="h-auto w-auto max-w-full object-contain object-left"
                    unoptimized={/^https?:\/\//i.test(summaryImageResolved)}
                  />
                </div>
              ) : null}
            </aside>
          ) : null}

          {/* Slider + controls */}
          <div className="relative min-h-0 flex-1 pb-14 selection:bg-transparent selection:text-[#000000]">
            <div className="testimonial-slider-container overflow-hidden pb-2">
              <div
                ref={sliderRef}
                className={cn(
                  "testimonial-slider gap-4 md:gap-5",
                  isDragging ? "grabbing" : "",
                )}
                style={{ transform: `translateX(${currentTranslate}%)` }}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
              >
                {testimonialsWithAvatars.map((testimonial, index) => {
                  const quote = str(testimonial.quote ?? testimonial.text);
                  const rating = Math.min(
                    5,
                    Math.max(0, Number(testimonial.rating) || 5),
                  );
                  return (
                    <div key={index} className="testimonial-slide px-1 md:px-0">
                      <article
                        className={cn(
                          "box-border flex h-[204px] w-full max-w-[350.348px] flex-col gap-[13.413px] overflow-hidden bg-[#FFF] p-[13.413px] shadow-[0_4.435px_16.63px_0_rgba(0,0,0,0.08)] lg:mx-0",
                          "mx-auto",
                          poppins.className,
                        )}
                      >
                        <div className="flex min-h-0 flex-1 flex-col gap-2">
                          <div className="flex items-center gap-2.5">
                            <div
                                                className="relative shrink-0 overflow-hidden ` bg-lightgray` ring-1 ring-black/10"
                              style={{
                                width: "63.865px",
                                height: "63.865px",
                                borderRadius: "63.865px",
                              }}
                            >
                              <Image
                                src={testimonial.avatar || defaultAvatar}
                                alt={str(testimonial.name) ? str(testimonial.name) : ""}
                                fill
                                sizes="64px"
                                className="object-cover object-center"
                                unoptimized
                              />
                            </div>
                            <div className="min-w-0 flex-1 text-left">
                              <div className="flex flex-wrap items-center gap-1">
                                <h3 className="text-sm font-bold `text-[#000]` md:text-base">
                                  {testimonial.name}
                                </h3>
                                {testimonial.verified === false ? null : (
                                  <VerifiedBadgeIcon className="h-[27px] w-[27px] shrink-0" />
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-0.5" aria-hidden>
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-3.5 w-3.5 md:h-4 md:w-4",
                                  i < rating
                                    ? "fill-[#EFA536] text-[#EFA536]"
                                    : "fill-neutral-200 text-neutral-200",
                                )}
                                strokeWidth={0}
                              />
                            ))}
                          </div>
                          <p
                            className={cn(
                              "min-h-0 flex-1 overflow-hidden text-left text-[21.461px] font-normal leading-normal `text-[#000]`",
                              "line-clamp-4",
                            )}
                          >
                            {quote}
                          </p>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className="testimonials-nav pointer-events-none absolute z-10 flex items-start gap-[22px] text-[#000000] max-lg:left-1/2 max-lg:right-auto max-lg:-translate-x-1/2 lg:left-auto lg:right-[399.055px] lg:translate-x-0"
              style={{ bottom: "-17.047px" }}
            >
              <button
                type="button"
                onClick={() => handleArrowClick("prev")}
                className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center bg-transparent p-0 text-[#000000] shadow-none transition hover:opacity-80 focus-visible:outline `focus-visible:outline-2` focus-visible:outline-offset-2 focus-visible:outline-[#000000]"
                aria-label="Previous testimonial"
              >
                <TestimonialNavArrowIcon
                  direction="prev"
                  className="h-[35px] w-[35px] shrink-0"
                />
              </button>
              <button
                type="button"
                onClick={() => handleArrowClick("next")}
                className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center bg-transparent p-0 text-[#000000] shadow-none transition hover:opacity-80 focus-visible:outline `focus-visible:outline-2` focus-visible:outline-offset-2 focus-visible:outline-[#000000]"
                aria-label="Next testimonial"
              >
                <TestimonialNavArrowIcon
                  direction="next"
                  className="h-[35px] w-[35px] shrink-0"
                />
              </button>
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
