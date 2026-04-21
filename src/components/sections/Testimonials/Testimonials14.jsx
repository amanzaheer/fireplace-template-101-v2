"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Montserrat, Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import FiveStars from "@/components/common/FiveStars";
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
const testimonialsHeadingFont = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const chimneyFont = Poppins({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const testimonialsReviewFont = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});

/** Decorative quote mark (brand asset, 49×41 viewBox, #F59402) */
function TestimonialsQuoteIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={49}
      height={41}
      viewBox="0 0 49 41"
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <path
        d="M21.171 0C12.4881 0.610132 0.00686 1.99642 0 19.0015V40.3969H19.3756V17.5054H12.942C12.5344 11.3929 17.5677 9.81458 23.0412 8.60301L21.171 0ZM47.1297 0C38.4468 0.610132 25.9656 1.99646 25.9588 19.0015V40.3969H45.3344V17.5054H38.9008C38.4931 11.3929 43.5265 9.81458 49 8.60301L47.1297 0Z"
        fill="#F59402"
      />
    </svg>
  );
}

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Testimonials14({ content }) {
  const data = content?.testimonials ?? {};
  const logo = content?.navbar?.logo ?? {};
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
  const file_name = buildImageSrc(IMAGE_BASE, data.file_name);

  return (
    <FullContainer
      className="relative overflow-hidden py-10 md:py-20"
      id="testimonials"
    >
      <div className="absolute inset-0">
        <Image
          src={file_name}
          alt="Testimonials background"
          fill
          className="object-cover"
        />
      </div>
      <Container className="relative z-10 mx-auto max-w-[1274px] px-4">
        <div className="mb-8 text-center md:mb-10">
          <h2
            className={cn(
              testimonialsHeadingFont.className,
              "mb-2 text-[44px] font-extrabold leading-tight tracking-tight text-[#FFFFFF]",
            )}
          >
            Our Happy Clients
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.45fr] gap-6 md:gap-8 items-center">
          <div className="w-full lg:w-[240px] h-full shrink-0 text-white mt-10 lg:mt-20 ">
            <div className="mb-2">
              <TestimonialsQuoteIcon className="w-10 h-10 text-[#f59a00]" />
            </div>
            <p className={`${poppins.className} font-extrabold text-[24px] md:text-[33px] leading-tight mb-3 capitalize`}>
              {logo?.logoText}
            </p>
            <FiveStars className="mb-2" starClassName="text-[#f59a00] text-[21px]!" />
            <p className={`${archivo.className} text-white font-extrabold text-[18px] md:text-[21px] leading-none`}>
              {testimonialsWithAvatars[activeIndex]?.name}
            </p>
            <p className={`${archivo.className} text-white/80 text-[12px] md:text-[14px] font-semibold uppercase tracking-[0.12em]`}>
              Clients
            </p>
          </div>

          <div className="bg-[#e7e5e4]/80 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.18)] backdrop-blur-[2px] rounded-[18px]  md:p-7 ">
            <FiveStars className="mb-2" starClassName="text-[#f59a00] text-[21px]!" />
            <p className={`${archivo.className} text-black italic font-normal text-[16px] md:text-[18px]  leading-[1.45] flex-1`}>
              &ldquo;{active?.quote || active?.text}&rdquo;
            </p>

            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-3  text-black px-4 py-2 rounded-xl min-w-[250px]">
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
                  <p className="text-sm font-semibold uppercase leading-tight">
                    Clients
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleArrowClick("prev")}
                  className="w-10 h-10 rounded-full  border shadow flex items-center justify-center text-[#0a2a57]"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleArrowClick("next")}
                  className="w-10 h-10 rounded-full  border shadow flex items-center justify-center text-[#0a2a57]"
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
