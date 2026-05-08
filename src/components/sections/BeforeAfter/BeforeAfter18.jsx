"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins, Rubik } from "next/font/google";
import { IMAGE_BASE } from "@/lib/constants";
import { cn } from "@/lib/utils"
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "700"],
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["700"],
});

function BannerCtaIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={39}
      height={38}
      viewBox="0 0 39 38"
      fill="none"
      className={cn("h-[28px] w-[29px] shrink-0", className)}
      aria-hidden
    >
      <path
        d="M15.9343 0H5.37446e-05V1.80952C-0.0121365 8.77558 2.04963 15.5955 5.93547 21.4428C8.79926 25.7545 12.5677 29.4264 16.9929 32.2167C22.994 36.0029 29.9935 38.0118 37.1429 37.9999H39V22.4743L26.5757 19.7835L23.1215 23.1492C19.9606 21.1703 17.2737 18.5517 15.2435 15.4714L18.6959 12.1057L15.9343 0Z"
        fill="#fff4e6"
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

function BeforeAfterSlider({ beforeImage, afterImage, beforeAlt, afterAlt }) {
  const [isHover, setIsHover] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef(null);
  const containerRectRef = useRef(null);

  const updateContainerRect = useCallback(() => {
    if (containerRef.current) {
      containerRectRef.current = containerRef.current.getBoundingClientRect();
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (containerRectRef.current) {
      const { left, width } = containerRectRef.current;
      const position = ((e.clientX - left) / width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, position)));
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (containerRectRef.current && e.touches[0]) {
      const { left, width } = containerRectRef.current;
      const position = ((e.touches[0].clientX - left) / width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, position)));
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsActive(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const handleTouchEnd = useCallback(() => {
    setIsActive(false);
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  }, [handleTouchMove]);

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      setIsActive(true);
      updateContainerRect();
      document.addEventListener("mousemove", handleMouseMove, { passive: false });
      document.addEventListener("mouseup", handleMouseUp, { passive: true });
    },
    [handleMouseMove, handleMouseUp, updateContainerRect]
  );

  const handleTouchStart = useCallback(
    (e) => {
      setIsActive(true);
      updateContainerRect();
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleTouchEnd, { passive: true });
    },
    [handleTouchMove, handleTouchEnd, updateContainerRect]
  );

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div
      className="relative w-full aspect-3/2 overflow-hidden rounded-[35px]"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      ref={containerRef}
    >
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={afterAlt}                  
          fill
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <div
          className="opacity-100 transition-all duration-500 absolute bottom-0 sm:right-14 bg-black bg-opacity-70 text-white px-3 py-1 rounded z-10"
        >
          After
        </div>
      </div>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative w-full h-full">
          <Image
            src={beforeImage}
            alt={beforeAlt}
            fill
            className="object-cover object-left"
            loading="lazy"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div
            className="opacity-100 transition-all duration-500 absolute bottom-0 sm:left-14 bg-black bg-opacity-70 z-10 text-white px-3 py-1 rounded"
          >
            Before
          </div>
        </div>
      </div>
      <div
        className="absolute top-0 bottom-0 w-[3px] bg-white cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%`, marginLeft: "-2px" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >

      </div>
    </div>
  );
}

export default function BeforeAfter15({ content }) {
  const banner = content?.banner ?? {};
  const phone =
  banner.cta_phone?.trim() ||
  content?.contact_info?.phone?.trim() ||
  content?.navbar?.phone?.trim() ||
  "(800) 555-1212";
const tel = `tel:${phone.replace(/\s/g, "")}`;


  const block = content?.before_after ?? {};
  const rawItems = Array.isArray(block.items) ? block.items : [];
  if (rawItems.length === 0) return null;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const dragStartXRef = useRef(null);
  const touchStartXRef = useRef(null);
  const wheelDeltaXRef = useRef(0);

  const title = block.title ?? "Before And After Results";
  const imageBase = IMAGE_BASE;

  const items = rawItems.map((item) => ({
    before: buildImageSrc(imageBase, item.before),
    after: buildImageSrc(imageBase, item.after),
    before_alt: item.before_alt ?? "Before",
    after_alt: item.after_alt ?? "After",
  })).filter((item) => item.before && item.after);
  if (items.length === 0) return null;
  const maxMdIndex = Math.max(0, items.length - 2);
  const maxLgIndex = Math.max(0, items.length - 3);
  const maxIndex = slidesPerView === 3 ? maxLgIndex : maxMdIndex;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handleMouseDragStart = (e) => {
    if (e.button !== 0 && e.button !== 2) return;
    dragStartXRef.current = e.clientX;
  };

  const handleMouseDragEnd = (e) => {
    if (dragStartXRef.current === null) return;
    const deltaX = e.clientX - dragStartXRef.current;
    dragStartXRef.current = null;
    if (Math.abs(deltaX) < 50) return;
    if (deltaX < 0) handleNext();
    if (deltaX > 0) handlePrev();
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches?.[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches?.[0]?.clientX ?? touchStartXRef.current;
    const deltaX = touchEndX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (Math.abs(deltaX) < 50) return;
    if (deltaX < 0) handleNext();
    if (deltaX > 0) handlePrev();
  };

  const handleWheel = (e) => {
    // Trackpad two-finger swipe usually emits wheel deltaX.
    wheelDeltaXRef.current += Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(wheelDeltaXRef.current) < 60) return;
    if (wheelDeltaXRef.current > 0) handleNext();
    if (wheelDeltaXRef.current < 0) handlePrev();
    wheelDeltaXRef.current = 0;
  };

  useEffect(() => {
    const resizeReset = () => {
      const nextSlides = window.innerWidth >= 1024 ? 3 : 2;
      const nextMaxIndex = nextSlides === 3 ? maxLgIndex : maxMdIndex;
      setSlidesPerView(nextSlides);
      setCurrentIndex((prev) => Math.min(prev, nextMaxIndex));
    };
    resizeReset();
    window.addEventListener("resize", resizeReset);
    return () => window.removeEventListener("resize", resizeReset);
  }, [maxLgIndex, maxMdIndex]);

  return (
    <FullContainer id="before_after">
      <Container className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-6 ">
        <h2 className={`${poppins.className} text-center text-[32px] lg:text-[44px] font-bold text-[#000] tracking-tight mb-8 md:mb-10`}>
          {title}
        </h2>
        <div className="hidden md:block">
          <div
            className="relative overflow-hidden"
            onContextMenu={(e) => e.preventDefault()}
            onMouseDown={handleMouseDragStart}
            onMouseUp={handleMouseDragEnd}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
          >
            <div
              className="flex gap-5 transition-transform duration-500 ease-out"
              style={{
                transform:
                  slidesPerView === 3
                    ? `translateX(calc(-${currentIndex} * ((100% - 40px) / 3 + 20px)))`
                    : `translateX(calc(-${currentIndex} * ((100% - 20px) / 2 + 20px)))`,
              }}
            >
              {items.map((item, index) => (
                <div key={index} className="w-[calc(50%-10px)] shrink-0 lg:w-[calc((100%-40px)/3)]">
                  <BeforeAfterSlider
                    beforeImage={item.before}
                    afterImage={item.after}
                    beforeAlt={item.before_alt}
                    afterAlt={item.after_alt}
                  />
                </div>
              ))}
            </div>
          </div>
          {items.length > 3 && (
            <div className="mt-6 flex items-center justify-center gap-3">
              {Array.from({ length: maxIndex + 1 }).map((_, dotIndex) => (
                <button
                  key={`before-after-dot-${dotIndex}`}
                  type="button"
                  onClick={() => handleDotClick(dotIndex)}
                  aria-label={`Go to slide ${dotIndex + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${currentIndex === dotIndex ? "bg-[#F0520E] w-6" : "bg-[#F0520E]"
                    }`}
                />
              ))}
            </div>
          )}
        </div>
        <div className="md:hidden grid grid-cols-2 md:grid-cols-4 gap-5">
          {items.slice(0, 2).map((item, index) => (
            <BeforeAfterSlider
              key={index}
              beforeImage={item.before}
              afterImage={item.after}
              beforeAlt={item.before_alt}
              afterAlt={item.after_alt}
            />
          ))}
        </div>
        <div className="w-full flex items-center pt-6 justify-center">
          <Link
            href={tel}
            className="inline-flex items-center gap-3 rounded-xl bg-[#F0520E] px-5 py-2  transition  sm:px-6 sm:py-2.5 "
          >
            <BannerCtaIcon />
            <span
              className={`${rubik.className} text-[24px] font-bold not-italic leading-normal text-[#fff4e6]`}
            >
              {phone}
            </span>
          </Link>
        </div>
      </Container>
    </FullContainer>
  );
}
