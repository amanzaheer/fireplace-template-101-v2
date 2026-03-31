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
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Testimonials8({ content }) {
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
  const active =
    testimonialsWithAvatars[activeIndex] ?? testimonialsWithAvatars[0];
  const quoteText = active?.quote || active?.text || "";
  const words = String(quoteText).split(" ").filter(Boolean);
  const leftTitle = words.slice(0, 1).join(" ") || "Chimney";
  const leftSubtitle = words.slice(1, 2).join(" ") || "Maintenance";

  return (
    <FullContainer className="relative overflow-hidden py-10 md:py-14" id="testimonials">
      <div className="absolute inset-0">
        <Image
          src={buildImageSrc(IMAGE_BASE, "why-us/why-us.avif")}
          alt="Testimonials background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#072755]/85" />
      </div>
      <Container className="mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-2">
            Our Happy Clients
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.45fr] gap-6 md:gap-8 items-center">
          <div className="text-white px-2 md:px-4">
            <div className="text-[#ffb13a] text-7xl font-bold leading-none">“</div>
            <h3 className="text-5xl md:text-6xl font-extrabold leading-[0.95]">
              {leftTitle}
            </h3>
            <p className="text-4xl md:text-5xl text-white/95">{leftSubtitle}</p>

            <div className="flex items-center gap-1 mt-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-[#ffb13a] text-2xl">
                  ★
                </span>
              ))}
            </div>
            <p className="mt-4 text-3xl font-bold">{active?.name || "Mr. John Doe"}</p>
            <p className="text-sm md:text-base font-semibold text-white/85 uppercase">
              Clients
            </p>
          </div>

          <div className="bg-[#f3f3f3] rounded-[18px] p-5 md:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-[#f4a52f] text-2xl">
                  ★
                </span>
              ))}
            </div>
            <p className="text-[#5a5a5a] text-2xl md:text-3xl italic leading-[1.35] min-h-[84px]">
              &ldquo;{quoteText}&rdquo;
            </p>

            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-3 bg-[#e35b00] text-white px-4 py-2 rounded-xl min-w-[250px]">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={active?.avatar || defaultAvatar}
                    alt={active?.name || "avatar"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="text-2xl font-bold leading-tight">
                    {active?.name || "Mr. John Doe"}
                  </p>
                  <p className="text-sm font-semibold uppercase leading-tight">Clients</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleArrowClick("prev")}
                  className="w-10 h-10 rounded-full bg-white border shadow flex items-center justify-center text-[#0a2a57]"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleArrowClick("next")}
                  className="w-10 h-10 rounded-full bg-white border shadow flex items-center justify-center text-[#0a2a57]"
                  aria-label="Next testimonial"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          /* keep responsive logic hooks active without altering functionality contracts */
        `}</style>
      </Container>
    </FullContainer>
  );
}
