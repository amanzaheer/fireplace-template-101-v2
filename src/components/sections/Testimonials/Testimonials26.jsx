"use client";

import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useRef,
    useMemo,
    useCallback,
} from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import FiveStars from "@/components/common/FiveStars";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export default function Testimonials26({ content }) {
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

    const getSlideSize = () => {
        if (isMobile) return 100;
        if (isTablet) return 50;
        return 25;
    };

    const slideSize = getSlideSize();

    const visibleSlides = isMobile ? 1 : isTablet ? 2 : 4;
    const maxAllowedIndex = Math.max(0, testimonials.length - visibleSlides);
    const dotCount = maxAllowedIndex + 1;

    useEffect(() => {
        setActiveIndex((prev) => Math.min(prev, maxAllowedIndex));
    }, [maxAllowedIndex]);

    useEffect(() => {
        setPrevTranslate(activeIndex * -slideSize);
        setCurrentTranslate(activeIndex * -slideSize);
    }, [activeIndex, slideSize]);

    useEffect(() => {
        const startAutoSlide = () => {
            autoSlideRef.current = setInterval(() => {
                if (testimonials.length > 1) {
                    setActiveIndex((prev) => {
                        const visibleSlides = isMobile ? 1 : isTablet ? 2 : 4;
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
        const visibleSlides = isMobile ? 1 : isTablet ? 2 : 4;
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
        const visibleSlides = isMobile ? 1 : isTablet ? 2 : 4;
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
                <div className="w-full">
                    <h2 className={`${poppins.className} text-black text-4xl  md:text-5xl font-extrabold mb-4 md:mb-8 text-center justify-center`}>
                        Our Happy Clients
                    </h2>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => handleArrowClick("prev")}
                            className="hidden lg:flex absolute -left-14 top-1/2 z-20 h-11 w-11 -translate-y-1/2 items-center justify-center"
                            aria-label="Previous testimonial"
                        >

                        </button>
                        <button
                            type="button"
                            onClick={() => handleArrowClick("next")}
                            className="hidden lg:flex absolute -right-14 top-1/2 z-20 h-11 w-11 -translate-y-1/2 items-center justify-center"
                            aria-label="Next testimonial"
                        >

                        </button>

                        <div className="testimonial-slider-container overflow-x-hidden w-full max-w-[1020px] mx-auto">
                            <div
                                ref={sliderRef}
                                className={`testimonial-slider ${isDragging ? "grabbing" : ""
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
                                        key={index}
                                        className="testimonial-slide flex h-full  px-2 md:px-3"
                                    >
                                        <div
                                            className={`flex h-full min-h-[280px] w-full flex-col   bg-white p-4 text-left  md:min-h-[300px] md:p-4  ${poppins.className}`}
                                        >
                                            <div className="flex min-h-20 shrink-0 items-center gap-3">
                                                <div className="relative h-12 w-12 shrink-0  overflow-hidden rounded-md bg-[#e4c59f]">
                                                    <Image
                                                        src={testimonial.avatar || defaultAvatar}
                                                        alt={testimonial.name || ""}
                                                        fill
                                                        className="object-cover"
                                                        sizes="48px"
                                                        unoptimized
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1 self-center ">
                                                    <h3 className="line-clamp-2 text-left text-[18px] font-extrabold leading-snug text-black md:text-[20px]">
                                                        {testimonial.name}
                                                    </h3>
                                                    <p className="mt-0.5 text-left text-[11px] font-semibold uppercase tracking-widest text-neutral-500">
                                                        Clients
                                                    </p>
                                                </div>
                                            </div>

                                            <FiveStars
                                                className="mt-4 shrink-0 justify-start"
                                                starClassName="text-[#f59a00]"
                                            />

                                            <p className="mt-4 flex-1 text-left text-[18px] italic leading-relaxed text-black md:text-[16px]">
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
                                        className={`h-4 w-4 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59a00] focus-visible:ring-offset-2 ${activeIndex === i
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
            flex-shrink: 0;
            width: 100%;
          }
          @media (min-width: 768px) {
            .testimonial-slide {
              width: 50%;
            }
          }
                    @media (min-width: 1024px) {
                        .testimonial-slide {
                            width: 25%;
                        }
                    }
        `}</style>
            </Container>
        </FullContainer>
    );
}
