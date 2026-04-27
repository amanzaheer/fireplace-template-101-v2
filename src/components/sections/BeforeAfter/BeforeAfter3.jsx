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
import { IMAGE_BASE } from "@/lib/constants";
import { Poppins } from "next/font/google";
import { ChevronLeft, ChevronRight } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function BeforeAfterSlider({ beforeImage, afterImage, beforeAlt, afterAlt, arrowSrc }) {
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
      className="relative w-full aspect-square overflow-hidden"
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/95 border-[3px] border-white shadow-md flex items-center justify-center gap-0.5 pointer-events-none">
          
              <ChevronLeft className="w-5 h-5 text-[#1f1f1f] shrink-0" aria-hidden />
              <ChevronRight className="w-5 h-5 text-[#1f1f1f] shrink-0" aria-hidden />
        </div>
      </div>
    </div>
  );
}

function BeforeAfterCarousel({ items, arrowSrc }) {
  const scrollRef = useRef(null);

  const scrollByStep = useCallback((direction) => {
    const el = scrollRef.current;
    if (!el?.firstElementChild) return;
    const slide = el.firstElementChild;
    const gap = 20;
    const step = slide.getBoundingClientRect().width + gap;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  return (
    <div className="relative">

      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-1 pl-10 pr-10 [-ms-overflow-style:none] [scrollbar-width:none] md:pl-12 md:pr-12 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="w-[calc(50%-0.625rem)] shrink-0 snap-start min-w-0 md:w-[calc((100%-3.75rem)/4)]"
          >
            <BeforeAfterSlider
              beforeImage={item.before}
              afterImage={item.after}
              beforeAlt={item.before_alt}
              afterAlt={item.after_alt}
              arrowSrc={arrowSrc}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BeforeAfter3({ content }) {
  const block = content?.before_after ?? {};
  const rawItems = Array.isArray(block.items) ? block.items : [];
  if (rawItems.length === 0) return null;

  const title = block.title ?? "Before And After Results";
  const imageBase = IMAGE_BASE;
  const arrowSrc = buildImageSrc(imageBase, block.arrow_icon ?? "icons/arrowhead.webp");

  const items = rawItems.map((item) => ({
    before: buildImageSrc(imageBase, item.before),
    after: buildImageSrc(imageBase, item.after),
    before_alt: item.before_alt ?? "Before",
    after_alt: item.after_alt ?? "After",
  })).filter((item) => item.before && item.after);
  if (items.length === 0) return null;

  return (
    <FullContainer id="before_after">
      <Container className="pb-12 md:py-18">
        <h2 className={`${poppins.className} text-3xl md:text-[32px] font-bold text-center text-[#1f1f1f] white mb-6`}>
          {title}kk
        </h2>
        <BeforeAfterCarousel items={items} arrowSrc={arrowSrc} />
      </Container>
    </FullContainer>
  );
}
