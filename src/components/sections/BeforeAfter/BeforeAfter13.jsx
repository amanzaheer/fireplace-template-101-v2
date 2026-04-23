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
import { Poppins } from "next/font/google";
import { IMAGE_BASE } from "@/lib/constants";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "700"],
});

function telHref(phone) {
  if (!phone || typeof phone !== "string") return "#";
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "#";
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
      className="relative w-full aspect-4/3 overflow-hidden rounded-[35px]"
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

export default function BeforeAfter13({ content }) {
  /** Same phone + CTA button as Cta13 */
  const phone =
    content?.banner?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";
  const phoneDisplay = typeof phone === "string" ? phone.trim() : "";
  const callHref = telHref(phoneDisplay);

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
      <Container className="max-w-[880px]  pb-16 pt-6 lg:px-0!">
        <h2 className={`${poppins.className} text-center  text-4xl md:text-[35.5px] font-bold text-[#2d2d2d] tracking-tight mb-8 md:mb-10`}>
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
              className="flex gap-5  transition-transform duration-500 ease-out"
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
            <div className="mt-6 flex items-center  justify-center gap-3">
              {Array.from({ length: maxIndex + 1 }).map((_, dotIndex) => (
                <button
                  key={`before-after-dot-${dotIndex}`}
                  type="button"
                  onClick={() => handleDotClick(dotIndex)}
                  aria-label={`Go to slide ${dotIndex + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${currentIndex === dotIndex ? "bg-[#7a7471] w-6" : "bg-[#c9c3bf] hover:bg-[#a8a19d]"
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
        {phoneDisplay ? (
          <div className="flex w-full shrink-0 items-center justify-center pt-6">
            <Link
              href={callHref}
              className="inline-flex h-[73.33px] w-[258px] shrink-0 flex-col items-center justify-center rounded-[15px] bg-[#CDE02E] pt-[2.72px] pr-[1.36px] pb-[2.72px] pl-[1.36px] text-center shadow-md transition hover:bg-[#c2d52a]"
            >
              <p
                className={`${poppins.className} text-[21px] font-medium leading-none text-black`}
              >
                CALL NOW:
              </p>
              <p
                className={`${poppins.className} mt-2 text-[27px] font-bold leading-none text-black`}
              >
                {phoneDisplay}
              </p>
            </Link>
          </div>
        ) : null}
      </Container>
    </FullContainer>
  );
}
