"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import Link from "next/link";
import { Rubik } from "next/font/google";
import { cn } from "@/lib/utils";

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
      className={cn(
        "  h-[22px] lg:h-[38px]  w-[22px] lg:w-[39px] shrink-0",
        className,
      )}
      aria-hidden
    >
      <path
        d="M15.9343 0H5.37446e-05V1.80952C-0.0121365 8.77558 2.04963 15.5955 5.93547 21.4428C8.79926 25.7545 12.5677 29.4264 16.9929 32.2167C22.994 36.0029 29.9935 38.0118 37.1429 37.9999H39V22.4743L26.5757 19.7835L23.1215 23.1492C19.9606 21.1703 17.2737 18.5517 15.2435 15.4714L18.6959 12.1057L15.9343 0Z"
        fill="#ffffff"
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

function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  arrowSrc,
}) {
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
      document.addEventListener("mousemove", handleMouseMove, {
        passive: false,
      });
      document.addEventListener("mouseup", handleMouseUp, { passive: true });
    },
    [handleMouseMove, handleMouseUp, updateContainerRect],
  );

  const handleTouchStart = useCallback(
    (e) => {
      setIsActive(true);
      updateContainerRect();
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd, { passive: true });
    },
    [handleTouchMove, handleTouchEnd, updateContainerRect],
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
      className="relative w-full overflow-hidden rounded-[28px] aspect-[1.35/1] shadow-[0_10px_28px_rgba(0,0,0,0.14)]"
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
          className={`${isHover ? "opacity-100" : "opacity-100"} transition-all duration-300 absolute bottom-2.5 right-3 bg-black/55 text-white px-3 py-1 rounded-md z-10 text-[10px] font-semibold tracking-[0.08em] uppercase`}
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
            className={`${isHover ? "opacity-100" : "opacity-100"} transition-all duration-300 absolute bottom-2.5 left-3 bg-black/55 z-10 text-white px-3 py-1 rounded-md text-[10px] font-semibold tracking-[0.08em] uppercase`}
          >
            Before
          </div>
        </div>
      </div>
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white/90 cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%`, marginLeft: "-2px" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 border-2 border-white shadow-md backdrop-blur-[1px]">
          <div className="flex items-center gap-2">
            {arrowSrc ? (
              <>
                <Image
                  src={arrowSrc}
                  alt=""
                  width={20}
                  height={20}
                  className="w-2.5 h-2.5"
                />
                <Image
                  src={arrowSrc}
                  alt=""
                  width={20}
                  height={20}
                  className="rotate-180 w-2.5 h-2.5"
                />
              </>
            ) : (
              <>
                <span className="text-white text-xs">◀</span>
                <span className="text-white text-xs">▶</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfter14({ content }) {
  const block = content?.before_after ?? {};
  const rawItems = Array.isArray(block.items) ? block.items : [];
  if (rawItems.length === 0) return null;

  const title = block.title ?? "Before And After Results";
  const imageBase = IMAGE_BASE;
  const arrowSrc = buildImageSrc(
    imageBase,
    block.arrow_icon ?? "icons/arrowhead.webp",
  );
  const banner = content?.banner ?? {};
  const phone =
    banner?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";
  const telHref = phone ? `tel:${phone}` : "#";

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
    <FullContainer id="before_after">
      <Container className="py-10 md:py-14 lg:py-16">
        <h2 className="mb-4 text-center font-montserrat text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-[54px] lg:leading-[1.12]">
          {title}
        </h2>
        {block?.sub_title ? (
          <p className="mx-auto mb-8 max-w-4xl text-center font-barlow text-base font-semibold leading-snug text-black/90 md:mb-10 md:text-[29px] md:leading-[1.25]">
            {block.sub_title}
          </p>
        ) : null}
        <div className="hidden md:grid grid-cols-4 gap-5 lg:gap-6">
          {items.map((item, index) => (
            <BeforeAfterSlider
              key={index}
              beforeImage={item.before}
              afterImage={item.after}
              beforeAlt={item.before_alt}
              afterAlt={item.after_alt}
              arrowSrc={arrowSrc}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
          {items.slice(0, 2).map((item, index) => (
            <BeforeAfterSlider
              key={index}
              beforeImage={item.before}
              afterImage={item.after}
              beforeAlt={item.before_alt}
              afterAlt={item.after_alt}
              arrowSrc={arrowSrc}
            />
          ))}
        </div>

        {phone ? (
          <div className="mt-8 flex w-full justify-center md:mt-10">
            <Link
              href={telHref}
              className="inline-flex w-fit  items-center justify-center gap-3 rounded-[10px] bg-[#8f888a] px-6 py-3 shadow-md transition hover:bg-[#7d7678]"
            >
              <BannerCtaIcon className="h-9 w-9  " />
              <span
                className={`${rubik.className}  text-[24px] lg:text-[38px] font-bold not-italic leading-none text-white`}
              >
                {phone}
              </span>
            </Link>
          </div>
        ) : null}
      </Container>
    </FullContainer>
  );
}
