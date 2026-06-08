"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";
import { IMAGE_BASE } from "@/lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** Call Now button — same tokens as ServiceCities27 */
const CALL_NOW_BUTTON = {
  background: "#C1272D",
  textColor: "#ffffff",
  label: "CALL NOW",
  height: "62px",
  maxWidth: "294px",
  paddingX: "28px",
  gap: "8px",
  shadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
  iconSize: 40,
};

function CallNowPhoneIcon({ size = CALL_NOW_BUTTON.iconSize, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <path
        d="M33.0357 19.9253C32.5397 19.4293 32.2917 18.8153 32.2917 18.0833C32.2917 17.3514 32.5397 16.7383 33.0357 16.244C33.5317 15.7497 34.1448 15.5017 34.875 15.5C35.6052 15.4983 36.2192 15.7463 36.7169 16.244C37.2146 16.7417 37.4618 17.3548 37.4583 18.0833C37.4549 18.8118 37.2069 19.4258 36.7143 19.9253C36.2218 20.4247 35.6087 20.6718 34.875 20.6667C34.1413 20.6615 33.5282 20.4135 33.0357 19.9227M28.4167 14.3375L25.7042 11.625C26.9528 10.3764 28.3633 9.41883 29.9357 8.75233C31.5081 8.08583 33.1545 7.75172 34.875 7.75C36.5955 7.74828 38.2428 8.08239 39.8169 8.75233C41.391 9.42228 42.8007 10.3798 44.0458 11.625L41.3333 14.3375C40.4722 13.4764 39.4931 12.809 38.3961 12.3354C37.299 11.8618 36.1253 11.625 34.875 11.625C33.6247 11.625 32.4518 11.8618 31.3565 12.3354C30.2612 12.809 29.2812 13.4764 28.4167 14.3375ZM43.7875 46.5C38.4056 46.5 33.0882 45.3272 27.8354 42.9815C22.5826 40.6358 17.8035 37.3094 13.4979 33.0021C9.19236 28.6948 5.86675 23.9156 3.52108 18.6646C1.17542 13.4135 0.00172222 8.09617 0 2.7125C0 1.9375 0.258333 1.29167 0.775 0.775C1.29167 0.258333 1.9375 0 2.7125 0H13.175C13.7778 0 14.316 0.204944 14.7896 0.614833C15.2632 1.02472 15.5431 1.50867 15.6292 2.06667L17.3083 11.1083C17.3944 11.7972 17.3729 12.3785 17.2437 12.8521C17.1146 13.3257 16.8778 13.7347 16.5333 14.0792L10.2687 20.4083C11.1299 22.0014 12.152 23.5402 13.3352 25.0247C14.5183 26.5093 15.8212 27.9413 17.2437 29.3208C18.5785 30.6556 19.9778 31.8938 21.4417 33.0357C22.9056 34.1775 24.4556 35.2212 26.0917 36.1667L32.1625 30.0958C32.55 29.7083 33.0563 29.4181 33.6815 29.2252C34.3067 29.0324 34.9198 28.9781 35.5208 29.0625L44.4333 30.8708C45.0361 31.0431 45.5312 31.3556 45.9187 31.8086C46.3062 32.2615 46.5 32.767 46.5 33.325V43.7875C46.5 44.5625 46.2417 45.2083 45.725 45.725C45.2083 46.2417 44.5625 46.5 43.7875 46.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BeforeAfterCallNowButton({ phone, label = CALL_NOW_BUTTON.label }) {
  if (!phone) return null;

  return (
    <a
      href={`tel:${phone}`}
      className={cn(
        inter.className,
        "inline-flex w-fit flex-row items-center justify-center transition-opacity hover:opacity-90",
      )}
      style={{
        height: CALL_NOW_BUTTON.height,
        maxWidth: CALL_NOW_BUTTON.maxWidth,
        paddingLeft: CALL_NOW_BUTTON.paddingX,
        paddingRight: CALL_NOW_BUTTON.paddingX,
        gap: CALL_NOW_BUTTON.gap,
        backgroundColor: CALL_NOW_BUTTON.background,
        color: CALL_NOW_BUTTON.textColor,
        boxShadow: CALL_NOW_BUTTON.shadow,
      }}
      aria-label={`Call ${phone}`}
    >
      <CallNowPhoneIcon />
      <span className="flex flex-col items-start justify-center leading-none">
        <span className="text-[16px] font-normal leading-none">{label}</span>
        <span className="text-sm font-bold leading-none md:text-[22px]">
          {phone}
        </span>
      </span>
    </a>
  );
}


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
      className="group relative mx-auto aspect-[175/117] w-full max-w-[353px] overflow-hidden  border border-white bg-neutral-200"
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

export default function BeforeAfter27({ content }) {
  const block = content?.before_after ?? {};
  const rawItems = Array.isArray(block.items) ? block.items.slice(0, 3) : [];
  if (rawItems.length === 0) return null;

  const title = block.title ?? "Before And After Results";
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const callNowLabel =
    (typeof block?.call_now_label === "string" && block.call_now_label.trim()) ||
    (typeof content?.service_benefits?.call_now_label === "string" &&
      content.service_benefits.call_now_label.trim()) ||
    CALL_NOW_BUTTON.label;
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
        <div className="mt-8 flex justify-center md:mt-10">
          <BeforeAfterCallNowButton phone={phone} label={callNowLabel} />
        </div>
      </Container>
    </FullContainer>
  );
}
