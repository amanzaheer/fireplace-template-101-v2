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
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Center-weighted horizontal fade: dark in middle, transparent at left/right (linear, symmetric). */
const LABEL_BG_GRADIENT =
  "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.28) 28%, rgba(0,0,0,0.78) 50%, rgba(0,0,0,0.28) 72%, rgba(0,0,0,0) 100%)";

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
      className="group relative mx-auto aspect-[175/117] w-full max-w-[353px] overflow-hidden rounded-[42px] border border-white bg-neutral-200"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      ref={containerRef}
    >
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={afterAlt}
          fill
          className="object-cover object-center"
          loading="lazy"
          sizes="(max-width: 768px) 90vw, 353px"
        />
        <div
          className="pointer-events-none absolute bottom-4 z-20 -translate-x-1/2"
          style={{ left: `${(sliderPosition + 100) / 2}%` }}
        >
          <span
            className="inline-block whitespace-nowrap rounded-full px-3 py-1.5 text-center text-xs font-bold uppercase tracking-[0.12em] text-white md:px-4 md:py-2 md:text-sm"
            style={{
              background: LABEL_BG_GRADIENT,
              textShadow: "0 1px 2px rgba(0,0,0,0.4)",
            }}
          >
            After
          </span>
        </div>
      </div>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative h-full w-full">
          <Image
            src={beforeImage}
            alt={beforeAlt}
            fill
            className="object-cover object-left"
            loading="lazy"
            sizes="(max-width: 768px) 90vw, 353px"
          />
          <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2">
            <span
              className="inline-block whitespace-nowrap rounded-full px-3 py-1.5 text-center text-xs font-bold uppercase tracking-[0.12em] text-white md:px-4 md:py-2 md:text-sm"
              style={{
                background: LABEL_BG_GRADIENT,
                textShadow: "0 1px 2px rgba(0,0,0,0.4)",
              }}
            >
              Before
            </span>
          </div>
        </div>
      </div>
      <div
        className="absolute top-0 bottom-0 z-10 w-px cursor-ew-resize bg-white shadow-[1px_0_0_rgba(255,255,255,0.35)]"
        style={{ left: `${sliderPosition}%`, marginLeft: "-0.5px" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className={`pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-0.5 rounded-full border-[3px] border-white bg-white/95 shadow-md transition-opacity duration-300 ${isHover || isActive ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}`}
        >
          <ChevronLeft className="h-5 w-5 shrink-0 text-[#1f1f1f]" aria-hidden />
          <ChevronRight className="h-5 w-5 shrink-0 text-[#1f1f1f]" aria-hidden />
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfter21({ content }) {
  const block = content?.before_after ?? {};
  const rawItems = Array.isArray(block.items) ? block.items.slice(0, 3) : [];
  if (rawItems.length === 0) return null;

  const title = block.title ?? "Before And After Results";
  const imageBase = IMAGE_BASE;

  const items = rawItems.map((item) => ({
    before: buildImageSrc(imageBase, item.before),
    after: buildImageSrc(imageBase, item.after),
    before_alt: item.before_alt ?? "Before",
    after_alt: item.after_alt ?? "After",
  })).filter((item) => item.before && item.after);
  if (items.length === 0) return null;

  return (
    <FullContainer id="before_after" className="bg-white">
      <Container className="pb-16 pt-10 md:pb-20 md:pt-14">
        <h2 className="mx-auto mb-5 max-w-4xl text-center text-3xl font-bold leading-tight tracking-tight text-black md:mb-7 md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <div className="hidden justify-items-center gap-6 md:grid md:grid-cols-3 md:gap-7 lg:gap-8">
          {items.map((item, index) => (
            <BeforeAfterSlider
              key={index}
              beforeImage={item.before}
              afterImage={item.after}
              beforeAlt={item.before_alt}
              afterAlt={item.after_alt}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:hidden">
          {items.map((item, index) => (
            <BeforeAfterSlider
              key={`ba-sm-${index}`}
              beforeImage={item.before}
              afterImage={item.after}
              beforeAlt={item.before_alt}
              afterAlt={item.after_alt}
            />
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}
