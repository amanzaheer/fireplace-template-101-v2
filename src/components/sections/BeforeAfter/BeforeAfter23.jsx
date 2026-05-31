"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
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

  const handleMouseMove = useCallback((e) => {
    if (containerRectRef.current) {
      const { left, width } = containerRectRef.current;
      const position = ((e.clientX - left) / width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, position)));
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      updateContainerRect();
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [handleMouseMove, handleMouseUp, updateContainerRect]
  );

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      className="relative mx-auto aspect-[353/236] w-full max-w-[353px] overflow-hidden rounded-[42px] border border-white bg-neutral-900/20"
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
      />
    </div>
  );
}

export default function BeforeAfter23({ content }) {
  const block = content?.before_after ?? {};
  const rawItems = Array.isArray(block.items) ? block.items : [];

  if (rawItems.length === 0) return null;

  const title = block.title ?? "Before And After Results";
  const beforeLabel =
    typeof block.before_label === "string" && block.before_label.trim()
      ? block.before_label.trim()
      : "Before";
  const afterLabel =
    typeof block.after_label === "string" && block.after_label.trim()
      ? block.after_label.trim()
      : "After";
  const phone =
    content?.contact_info?.phone?.trim() ||
    content?.navbar?.phone?.trim() ||
    "";
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
    <FullContainer id="before_after" className="bg-[#0483B2] py-10 md:py-14">
      <Container className="pb-4 md:pb-6">
        <h2
          className={`${poppins.className} mx-auto mb-8 max-w-4xl text-center text-[28px] font-bold leading-tight tracking-tight text-white sm:mb-10 sm:text-[34px] md:text-[40px]`}
        >
          {title}
        </h2>

        <div className="hidden justify-items-center gap-6 md:grid md:grid-cols-2 md:gap-7 lg:grid-cols-4 lg:gap-8">
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

        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:hidden">
          {items.map((item, index) => (
            <BeforeAfterSlider
              key={`ba-mobile-${index}`}
              beforeImage={item.before}
              afterImage={item.after}
              beforeAlt={item.before_alt}
              afterAlt={item.after_alt}
              beforeLabel={beforeLabel}
              afterLabel={afterLabel}
            />
          ))}
        </div>

        {phone ? (
          <div className="mt-10 flex justify-center md:mt-12">
            <Link
              href={`tel:${phone.replace(/\s/g, "")}`}
              className={`${poppins.className} inline-flex h-[62px] w-[294px] items-center justify-center rounded-[100px] bg-[#D32F2F] px-[28px] text-white shadow-lg transition-colors hover:bg-[#b71c1c]`}
            >
              <span className="flex flex-col items-center justify-center text-center leading-none">
                <span
                  className={`${poppins.className} text-[16px] font-medium leading-none tracking-normal text-white`}
                >
                  Call Now
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
      </Container>
    </FullContainer>
  );
}