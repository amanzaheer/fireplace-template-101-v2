"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import { IMAGE_BASE } from "@/lib/constants";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

const LABEL_GRADIENT =
  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.65) 25%, rgba(0,0,0,0.65) 75%, transparent 100%)";

function BeforeAfterLabel({ children }) {
  return (
    <span
      className={`${poppins.className} inline-block whitespace-nowrap px-4 py-1.5 text-center text-xs font-bold uppercase tracking-[0.12em] text-white md:px-5 md:py-2 md:text-sm`}
      style={{
        background: LABEL_GRADIENT,
        textShadow: "0 1px 2px rgba(0,0,0,0.4)",
      }}
    >
      {children}
    </span>
  );
}

function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  beforeLabel,
  afterLabel,
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const containerRectRef = useRef(null);

  const updateContainerRect = useCallback(() => {
    if (containerRef.current) {
      containerRectRef.current =
        containerRef.current.getBoundingClientRect();
    }
  }, []);

  const handlePointerMove = useCallback(
    (clientX) => {
      if (containerRectRef.current) {
        const { left, width } = containerRectRef.current;
        const position = ((clientX - left) / width) * 100;
        setSliderPosition(Math.max(0, Math.min(100, position)));
      }
    },
    [],
  );

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      updateContainerRect();
      const onMove = (moveEvent) => handlePointerMove(moveEvent.clientX);
      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [handlePointerMove, updateContainerRect],
  );

  const handleTouchStart = useCallback(
    (e) => {
      updateContainerRect();
      const onMove = (moveEvent) => {
        if (moveEvent.touches[0]) {
          handlePointerMove(moveEvent.touches[0].clientX);
        }
      };
      const onEnd = () => {
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onEnd);
      };
      document.addEventListener("touchmove", onMove, { passive: true });
      document.addEventListener("touchend", onEnd);
    },
    [handlePointerMove, updateContainerRect],
  );

  return (
    <div
      className="relative mx-auto aspect-[353/236] w-full max-w-[280px] overflow-hidden rounded-[32px] border border-white bg-neutral-900/20 sm:max-w-[320px] sm:rounded-[38px] lg:max-w-[353px] lg:rounded-[42px]"
      ref={containerRef}
    >
      {/* AFTER IMAGE */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={afterAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 45vw, 353px"
        />
      </div>

      {/* BEFORE IMAGE */}
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
            sizes="(max-width: 768px) 45vw, 353px"
          />
        </div>
      </div>

      {/* BEFORE LABEL — centered in visible left half (outside clip so gradient isn't cut) */}
      <div
        className="pointer-events-none absolute bottom-4 z-20 -translate-x-1/2"
        style={{ left: `${sliderPosition / 2}%` }}
      >
        <BeforeAfterLabel>{beforeLabel}</BeforeAfterLabel>
      </div>

      {/* AFTER LABEL — centered in visible right half */}
      <div
        className="pointer-events-none absolute bottom-4 z-20 -translate-x-1/2"
        style={{ left: `${50 + sliderPosition / 2}%` }}
      >
        <BeforeAfterLabel>{afterLabel}</BeforeAfterLabel>
      </div>

      {/* SLIDER LINE */}
      <div
        className="absolute top-0 bottom-0 z-10 w-px cursor-ew-resize bg-white shadow-[1px_0_0_rgba(255,255,255,0.35)]"
        style={{ left: `${sliderPosition}%`, marginLeft: "-0.5px" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
    </div>
  );
}

export default function BeforeAfter26({ content }) {
  const block = content?.before_after ?? {};
  const rawItems = Array.isArray(block.items) ? block.items : [];

  if (rawItems.length === 0) return null;

  const title = block.title ?? "";
  const beforeLabel =
    typeof block.before_label === "string" ? block.before_label.trim() : "";
  const afterLabel =
    typeof block.after_label === "string" ? block.after_label.trim() : "";
  const phone =
    content?.contact_info?.phone?.trim() ||
    content?.navbar?.phone?.trim() ||
    "";
  const callNowLabel =
    content?.banner?.cta_strip?.phone_label?.trim() ||
    content?.service_benefits?.call_now_label?.trim() ||
    "";
  const imageBase = IMAGE_BASE;

  const items = rawItems
    .map((item) => ({
      before: buildImageSrc(imageBase, item.before),
      after: buildImageSrc(imageBase, item.after),
      before_alt: item.before_alt ?? beforeLabel,
      after_alt: item.after_alt ?? afterLabel,
    }))
    .filter((item) => item.before && item.after);

  if (items.length === 0) return null;

  return (
    <FullContainer
      id="before_after"
      style={{
        background: "linear-gradient(180deg, #BF1309 0%, #020202 100%)",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col px-4 py-10 sm:px-6 md:px-8 lg:min-h-[691px] lg:px-[170px] lg:py-[72px]">
        {title ? (
          <h2
            className={`${poppins.className} mx-auto max-w-4xl text-center text-[24px] font-bold leading-tight tracking-tight text-white sm:text-[30px] md:text-[36px] lg:text-[40px]`}
          >
            {title}
          </h2>
        ) : null}

        <div className="mt-10 grid grid-cols-1 justify-items-center gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-[23px] md:mt-20 lg:mt-[125px] lg:grid-cols-4">
          {items.map((item, index) => (
            <BeforeAfterSlider
              key={index}
              beforeImage={item.before}
              afterImage={item.after}
              beforeAlt={item.before_alt}
              afterAlt={item.after_alt}
              beforeLabel={beforeLabel}
              afterLabel={afterLabel}
            />
          ))}
        </div>

        {phone && callNowLabel ? (
          <div className="mt-6 flex justify-center sm:mt-[23px]">
            <Link
              href={`tel:${phone.replace(/\s/g, "")}`}
              className={`${poppins.className} inline-flex h-[56px] w-full max-w-[294px] items-center justify-center rounded-[100px] bg-[#D32F2F] px-6 text-white shadow-lg transition-colors hover:bg-[#b71c1c] sm:h-[62px] sm:px-[28px]`}
            >
              <span className="flex flex-col items-center justify-center text-center leading-none">
                <span
                  className={`${poppins.className} text-[16px] font-medium leading-none tracking-normal text-white`}
                >
                  {callNowLabel}
                </span>
                <span
                  className={`${poppins.className} mt-0.5 max-w-full truncate text-center text-[20px] font-bold leading-none tracking-normal text-white`}
                >
                  {phone}
                </span>
              </span>
            </Link>
          </div>
        ) : null}
      </div>
    </FullContainer>
  );}