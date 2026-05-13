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

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** Before / After hover badge — Poppins 700, 17px, line-height 34px, centered. */
const LABEL_BADGE =
  "text-center text-[17px] font-bold leading-[34px] tracking-normal text-black";

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
  beforeLabel,
  afterLabel,
}) {
  const [isHover, setIsHover] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const containerRectRef = useRef(null);

  const updateContainerRect = useCallback(() => {
    if (containerRef.current) {
      containerRectRef.current = containerRef.current.getBoundingClientRect();
    }
  }, []);

  const docListenersRef = useRef({
    mouseMove: null,
    mouseUp: null,
    touchMove: null,
    touchEnd: null,
  });

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      updateContainerRect();

      const onMouseMove = (ev) => {
        if (containerRectRef.current) {
          const { left, width } = containerRectRef.current;
          const position = ((ev.clientX - left) / width) * 100;
          setSliderPosition(Math.max(0, Math.min(100, position)));
        }
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        docListenersRef.current.mouseMove = null;
        docListenersRef.current.mouseUp = null;
      };

      docListenersRef.current.mouseMove = onMouseMove;
      docListenersRef.current.mouseUp = onMouseUp;

      document.addEventListener("mousemove", onMouseMove, { passive: false });
      document.addEventListener("mouseup", onMouseUp, { passive: true });
    },
    [updateContainerRect],
  );

  const handleTouchStart = useCallback(() => {
    updateContainerRect();

    const onTouchMove = (ev) => {
      if (containerRectRef.current && ev.touches[0]) {
        const { left, width } = containerRectRef.current;
        const position = ((ev.touches[0].clientX - left) / width) * 100;
        setSliderPosition(Math.max(0, Math.min(100, position)));
      }
    };

    const onTouchEnd = () => {
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      docListenersRef.current.touchMove = null;
      docListenersRef.current.touchEnd = null;
    };

    docListenersRef.current.touchMove = onTouchMove;
    docListenersRef.current.touchEnd = onTouchEnd;

    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
  }, [updateContainerRect]);

  useEffect(() => {
    return () => {
      const l = docListenersRef.current;
      if (l.mouseMove) document.removeEventListener("mousemove", l.mouseMove);
      if (l.mouseUp) document.removeEventListener("mouseup", l.mouseUp);
      if (l.touchMove) document.removeEventListener("touchmove", l.touchMove);
      if (l.touchEnd) document.removeEventListener("touchend", l.touchEnd);
    };
  }, []);

  return (
    <div
      className={`${poppins.className} relative w-full aspect-square overflow-hidden`}
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
        {afterLabel ? (
          <div
            className={`${poppins.className} ${LABEL_BADGE} ${isHover ? "opacity-100" : "opacity-0"} transition-all duration-500 absolute top-32 right-4 z-10 rounded bg-white bg-opacity-70 px-3 py-1`}
          >
            {afterLabel}
          </div>
        ) : null}
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
          {beforeLabel ? (
            <div
              className={`${poppins.className} ${LABEL_BADGE} ${isHover ? "opacity-100" : "opacity-0"} transition-all duration-500 absolute top-32 left-4 z-10 rounded bg-white bg-opacity-70 px-3 py-1`}
            >
              {beforeLabel}
            </div>
          ) : null}
        </div>
      </div>
      <div
        className={`${poppins.className} absolute top-0 bottom-0 w-[3px] bg-white cursor-ew-resize z-10`}
        style={{ left: `${sliderPosition}%`, marginLeft: "-2px" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-transparent border-[3px] border-white shadow-md flex items-center justify-center">
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

export default function BeforeAfter9({ content }) {
  const block = content?.before_after ?? {};
  const rawItems = Array.isArray(block.items) ? block.items : [];
  if (rawItems.length === 0) return null;

  const title = typeof block.title === "string" ? block.title.trim() : "";
  const subTitle =
    typeof block.sub_title === "string" ? block.sub_title.trim() : "";

  const beforeLabel =
    typeof block.before_label === "string" && block.before_label.trim()
      ? block.before_label.trim()
      : "";
  const afterLabel =
    typeof block.after_label === "string" && block.after_label.trim()
      ? block.after_label.trim()
      : "";

  const imageBase = IMAGE_BASE;
  const arrowPath =
    typeof block.arrow_icon === "string" && block.arrow_icon.trim()
      ? block.arrow_icon.trim()
      : "";
  const arrowSrc = arrowPath ? buildImageSrc(imageBase, arrowPath) : "";

  const items = rawItems
    .map((item) => ({
      before: buildImageSrc(imageBase, item.before),
      after: buildImageSrc(imageBase, item.after),
      before_alt:
        typeof item.before_alt === "string" ? item.before_alt.trim() : "",
      after_alt:
        typeof item.after_alt === "string" ? item.after_alt.trim() : "",
    }))
    .filter((item) => item.before && item.after);
  if (items.length === 0) return null;

  return (
    <FullContainer id="before_after">
      <Container className="pb-16 pt-6">
        {title ? (
          <h2
            className={`text-center text-2xl font-bold text-neutral-900 md:text-3xl lg:text-[50px] ${subTitle ? "mb-2 md:mb-3" : "mb-4 md:mb-5"}`}
          >
            {title}
          </h2>
        ) : null}
        {subTitle ? (
          <p className="mb-4 text-center text-sm text-neutral-600 md:mb-5 md:text-base">
            {subTitle}
          </p>
        ) : null}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={`${item.before}-${item.after}-${index}`}
              className={index >= 2 ? "hidden md:block" : ""}
            >
              <BeforeAfterSlider
                beforeImage={item.before}
                afterImage={item.after}
                beforeAlt={item.before_alt}
                afterAlt={item.after_alt}
                arrowSrc={arrowSrc}
                beforeLabel={beforeLabel}
                afterLabel={afterLabel}
              />
            </div>
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}
