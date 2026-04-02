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
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function BeforeAfterSlider({ beforeImage, afterImage, beforeAlt, afterAlt }) {
  return (
    <div className="relative w-full aspect-2/1 bg-transparent">
      <div className="grid grid-cols-2 gap-1 w-full h-full">
        <div className="relative w-full h-full overflow-hidden bg-white">
          <Image
            src={beforeImage}
            alt={beforeAlt}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded font-semibold text-sm z-10">
            Before
          </div>
        </div>
        <div className="relative w-full h-full overflow-hidden bg-white">
          <Image
            src={afterImage}
            alt={afterAlt}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded font-semibold text-sm z-10">
            After
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfter7({ content }) {
  const block = content?.before_after ?? {};
  const rawItems = Array.isArray(block.items) ? block.items : [];
  if (rawItems.length === 0) return null;
  const [activeIndex, setActiveIndex] = useState(0);

  const title = block.title ?? "Before And After Results";
  const imageBase = IMAGE_BASE;
  const items = rawItems.map((item) => ({
    before: buildImageSrc(imageBase, item.before),
    after: buildImageSrc(imageBase, item.after),
    before_alt: item.before_alt ?? "Before",
    after_alt: item.after_alt ?? "After",
  })).filter((item) => item.before && item.after);
  if (items.length === 0) return null;
  const currentItem = items[activeIndex] ?? items[0];

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <FullContainer id="before_after">
      <Container className="pb-16 pt-6">
        <h2 className="text-4xl md:text-5xl font-medium text-[#151515] mb-1 w-full text-center pb-6">
          {title}
        </h2>

        <div className="w-full flex items-center justify-center gap-4 md:gap-8">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous"
            className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-black text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="w-full max-w-[640px]">
            <BeforeAfterSlider
              key={activeIndex}
              beforeImage={currentItem.before}
              afterImage={currentItem.after}
              beforeAlt={currentItem.before_alt}
              afterAlt={currentItem.after_alt}
            />
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next"
            className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-black text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </Container>
    </FullContainer>
  );
}
