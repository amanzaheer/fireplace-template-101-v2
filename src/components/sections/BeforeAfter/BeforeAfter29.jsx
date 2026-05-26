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

function BeforeAfterSlider({ beforeImage, afterImage, beforeAlt, afterAlt, arrowSrc, isMiddle = false }) {
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
            className="relative w-full h-full overflow-hidden"
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
                <div className="absolute top-4 right-4 bg-white text-black px-4 py-1.5 font-bold rounded-lg text-sm z-10 shadow-md">
                    {afterAlt}
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
                    <div className="absolute top-4 left-4 bg-white text-black px-4 py-1.5 font-bold rounded-lg text-sm z-10 shadow-md">
                        {beforeAlt}
                    </div>
                </div>
            </div>
            <div
                className="absolute top-0 bottom-0 w-[3px] bg-white cursor-ew-resize z-10"
                style={{ left: `${sliderPosition}%`, marginLeft: "-2px" }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            >
            </div>
        </div>
    );
}

export default function BeforeAfter29({ content }) {
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
    })).filter((item) => item.before && item.after).slice(0, 3);
    if (items.length === 0) return null;

    return (
        <FullContainer id="before_after">
            <Container className="pb-16 pt-6">
                <h2 className="text-4xl md:text-5xl font-medium text-[#151515] mb-1 w-full text-center pb-10">
                    {title}
                </h2>

                {/* Desktop layout */}
                <div className="hidden md:flex items-center justify-center gap-0 relative">

                    {/* Left arrow */}
                    <button className="shrink-0 w-11 h-11 rounded-full border border-black flex items-center justify-center mr-4 z-10">
                        <ChevronLeft className="h-5 w-5 text-black" strokeWidth={2} />
                    </button>

                    {/* Cards row */}
                    <div className="flex items-center justify-center">
                        {items.map((item, index) => {
                            const isMiddle = index === 1;
                            return (
                                <div
                                    key={index}
                                    className={`relative overflow-hidden transition-all duration-300 ${isMiddle
                                        ? "w-[320px] h-[480px] z-20 shadow-2xl"
                                        : "w-[240px] h-[380px] z-10 opacity-90"
                                        } ${index === 0 ? "translate-x-6" : ""} ${index === 2 ? "-translate-x-6" : ""}`}
                                >
                                    <BeforeAfterSlider
                                        beforeImage={item.before}
                                        afterImage={item.after}
                                        beforeAlt={item.before_alt}
                                        afterAlt={item.after_alt}
                                        arrowSrc={arrowSrc}
                                        isMiddle={isMiddle}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Right arrow */}
                    <button className="shrink-0 w-11 h-11 rounded-full border border-black flex items-center justify-center ml-4 z-10">
                        <ChevronRight className="h-5 w-5 text-black" strokeWidth={2} />
                    </button>

                </div>

                {/* Mobile layout — show 2 cards */}
                <div className="md:hidden grid grid-cols-2 gap-4">
                    {items.slice(0, 2).map((item, index) => (
                        <div key={index} className=" overflow-hidden">
                            <BeforeAfterSlider
                                beforeImage={item.before}
                                afterImage={item.after}
                                beforeAlt={item.before_alt}
                                afterAlt={item.after_alt}
                                arrowSrc={arrowSrc}
                                isMiddle={false}
                            />
                        </div>
                    ))}
                </div>

            </Container>
        </FullContainer>
    );
}
