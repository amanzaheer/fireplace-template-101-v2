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
import { cn } from "@/lib/utils";
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

function ArrowIcon({ direction = "right" }) {
  const isLeft = direction === "left";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-4 w-4", isLeft && "rotate-180")}
      aria-hidden
    >
      <path
        d="M8 5l8 7-8 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
      className="relative mx-auto h-[315.29px] w-full max-w-[472.94px] overflow-hidden rounded-[21.41px] border-[1.34px] border-white/80"
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
          className={`${isHover ? "opacity-100" : "opacity-0"} transition-all duration-500 absolute top-32 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded z-10`}
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
            className={`${isHover ? "opacity-100" : "opacity-0"} transition-all duration-500 absolute top-32 left-4 bg-black bg-opacity-70 z-10 text-white px-3 py-1 rounded`}
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

export default function BeforeAfter19({ content }) {
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
  const touchStartXRef = useRef(null);
  const dragStartXRef = useRef(null);

  const title = block.title ?? "Before And After Results";
  const subTitle = block.sub_title ?? "Restoration Services Today";
  const imageBase = IMAGE_BASE;
  const featureItems = Array.isArray(content?.features)
    ? content.features
        .map((item) => item?.text?.trim())
        .filter(Boolean)
    : [];

  const items = rawItems
    .map((item) => ({
      before: buildImageSrc(imageBase, item.before),
      after: buildImageSrc(imageBase, item.after),
      before_alt: item.before_alt ?? "Before",
      after_alt: item.after_alt ?? "After",
    }))
    .filter((item) => item.before && item.after);
  if (items.length === 0) return null;

  const maxIndex = Math.max(0, items.length - 1);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
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

  return (
    <FullContainer id="before_after" className="w-full bg-[#1a75bb]">
      <Container className="mx-auto w-full px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <div
            className="text-[#fff4e6]"
          >
            <h2
              className={cn(
                "mb-5 text-[36px] leading-[1.1] font-semibold lg:text-[52px]",
                "font-['Berlin_Sans_FB_Demi','Berlin_Sans_FB',sans-serif]"
              )}
            >
              {subTitle}
            </h2>
            <ul className={`${poppins.className} space-y-1.5 text-[24px] font-normal`}>
              {featureItems.map((feature, index) => (
                <li key={`before-after-feature-${index}`} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1.5 text-[18px] leading-none">
                    ✪
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full lg:self-center  mt-20">
            <h3
              className={`${poppins.className} mb-4 text-center text-[36px] leading-[1.1] font-semibold text-white lg:text-[35px]`}
            >
              {title}
            </h3>
            <div
              className="relative overflow-hidden"
              onContextMenu={(e) => e.preventDefault()}
              onMouseDown={handleMouseDragStart}
              onMouseUp={handleMouseDragEnd}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {items.map((item, index) => (
                  <div key={index} className="w-full shrink-0">
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
            <div className="mt-4 flex items-center justify-center  gap-4">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous slide"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-white transition hover:bg-white hover:text-[#1a75bb]"
              >
                <ArrowIcon direction="left" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next slide"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-white transition hover:bg-white hover:text-[#1a75bb]"
              >
                <ArrowIcon direction="right" />
              </button>
            </div>
          </div>
        </div>

       
      </Container>
    </FullContainer>
  );
}
