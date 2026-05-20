"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import Image from "next/image";
import Link from "next/link";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Poppins } from "next/font/google";

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

function telHref(phone) {
  if (!phone || typeof phone !== "string") return "#";
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "#";
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
      className="relative w-full aspect-[1.35/1] overflow-hidden rounded-[43px]"
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
        <div className="relative w-full h-full ">
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-transparent  border-white shadow-md flex items-center justify-center">
          <div className="flex items-center gap-2">
            {arrowSrc ? (
              <>
                <Image src={arrowSrc} alt="" width={20} height={20} className="w-2.5 h-2.5" />
                <Image src={arrowSrc} alt="" width={20} height={20} className="rotate-180 w-2.5 h-2.5" />
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

export default function BeforeAfter22({ content }) {
  const block = content?.before_after ?? {};
  const rawItems = Array.isArray(block.items) ? block.items : [];
  if (rawItems.length === 0) return null;

  const phone =
    content?.banner?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";
  const phoneDisplay = typeof phone === "string" ? phone.trim() : "";
  const callHref = telHref(phoneDisplay);
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
      <Container className="pb-16 pt-6">
        <h2 className="text-4xl text-center pb-6 font-extrabold text-black mb-2">
          {title}
        </h2>
        <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-5">
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
        <div className="md:hidden grid grid-cols-2 md:grid-cols-4 gap-5">
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

        {phoneDisplay ? (
          <div className="mt-8 flex justify-center md:mt-10">
            <Link
              href={callHref}
              className="inline-flex h-[73.33px] w-[258px] shrink-0 flex-col items-center justify-center rounded-[15px] bg-[#f0520e] pt-[2.72px] pr-[1.36px] pb-[2.72px] pl-[1.36px] text-center shadow-md transition hover:bg-black"
            >
              <p
                className={`${poppins.className} text-[21px] font-medium leading-none text-white`}
              >
                CALL NOW:
              </p>
              <p
                className={`${poppins.className} mt-2 text-[27px] font-bold leading-none text-white`}
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
