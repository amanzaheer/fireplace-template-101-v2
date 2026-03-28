"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function BeforeAfterSlider({ beforeImage, afterImage, beforeAlt, afterAlt }) {
  const [sliderPosition, setSliderPosition] = useState(50);
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
      className="relative w-full aspect-[3/4] sm:aspect-square overflow-hidden"
      ref={containerRef}
    >
      {/* After (full background) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={afterAlt}
          fill
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute top-4 right-4 z-20 rounded-md bg-white px-3 py-1.5 text-center text-sm font-semibold text-neutral-900 shadow-md">
          After
        </div>
      </div>

      {/* Before (clipped) */}
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
            sizes="(max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute top-4 left-4 z-20 rounded-md bg-white px-3 py-1.5 text-center text-sm font-semibold text-neutral-900 shadow-md">
            Before
          </div>
        </div>
      </div>

      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 z-30 w-[2px] cursor-ew-resize bg-white"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-white shadow-lg">
          <div className="flex items-center gap-0.5 text-neutral-900">
            <ChevronLeft className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden />
            <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfter6({ content }) {
  const block = content?.before_after ?? {};
  const rawItems = Array.isArray(block.items) ? block.items : [];
  if (rawItems.length === 0) return null;

  const title = block.title ?? "Before And After Results Chimney";
  const imageBase = IMAGE_BASE;

  const items = rawItems
    .map((item) => ({
      before: buildImageSrc(imageBase, item.before),
      after: buildImageSrc(imageBase, item.after),
      before_alt: item.before_alt ?? "Before",
      after_alt: item.after_alt ?? "After",
    }))
    .filter((item) => item.before && item.after);
  if (items.length === 0) return null;

  return (
    <FullContainer id="before_after" className="px-30 bg-white overflow-x-hidden">
      <h2 className="mx-auto max-w-5xl px-4 pb-8 pt-8 text-center text-3xl font-extrabold  tracking-tight text-neutral-900 md:text-4xl">
        {title}
      </h2>

      {/* Full width, flush to viewport sides, zero gutters between sliders */}
      <div className="grid w-full grid-cols-2 px-5 lg:grid-cols-4 gap-5">
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
    </FullContainer>
  );
}
