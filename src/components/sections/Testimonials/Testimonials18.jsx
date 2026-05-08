"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function Testimonials1({ content }) {
  const logo = content?.navbar?.logo ?? {};
  const data = content?.testimonials ?? {};
  const testimonials = Array.isArray(data.list) ? data.list : [];
  const reviewCount = data.reviewCount ?? "150+";

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);
  const autoSlideRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const slideSize = isMobile ? 100 : 20;

  useEffect(() => {
    setPrevTranslate(activeIndex * -slideSize);
    setCurrentTranslate(activeIndex * -slideSize);
  }, [activeIndex, slideSize]);

  useEffect(() => {
    if (!isDragging && testimonials.length > 1) {
      autoSlideRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const maxIdx = Math.max(0, testimonials.length - (isMobile ? 1 : 5));
          return prev >= maxIdx ? 0 : prev + 1;
        });
      }, 5000);
    }
    return () => clearInterval(autoSlideRef.current);
  }, [isDragging, testimonials.length, isMobile]);



  const getPositionX = (e) => (e.type.includes("mouse") ? e.pageX : e.touches[0].pageX);

  const handleDragStart = (e) => {
    if (testimonials.length <= 1) return;
    setIsDragging(true);
    setStartX(getPositionX(e));
    clearInterval(autoSlideRef.current);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentX = getPositionX(e);
    const movePercent = ((currentX - startX) / (sliderRef.current?.clientWidth || 1)) * 100;
    setCurrentTranslate(movePercent + prevTranslate);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    const movedPercent = currentTranslate - prevTranslate;
    const maxIdx = Math.max(0, testimonials.length - (isMobile ? 1 : 2));
    if (movedPercent < -15 && activeIndex < maxIdx) setActiveIndex(activeIndex + 1);
    else if (movedPercent > 15 && activeIndex > 0) setActiveIndex(activeIndex - 1);
    else setCurrentTranslate(prevTranslate);
    setIsDragging(false);
  };

  if (!testimonials.length) return null;

  return (
    <FullContainer className="py-16 bg-white" id="testimonials">
      <Container>
        <h2 className="text-4xl font-extrabold text-black text-center mb-16">Our Happy Clients</h2>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 relative">
          
          {/* Sidebar - Vertically centered with cards */}
          

          {/* Slider and Centered Arrows */}
          <div className="relative w-full  flex items-center">
            
            {/* Prev Arrow - Centered on Card */}
           
            <div className="overflow-hidden w-full py-4">
              <div
                ref={sliderRef}
                className={`flex transition-transform duration-500 ease-out ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                style={{ transform: `translateX(${currentTranslate}%)` }}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
              >
                {testimonials.map((t, i) => (
                  <div key={i} className="flex-shrink-0 px-2" style={{ width: `${slideSize}%` }}>
                    <div className="bg-[#f9f9f9] p-5 rounded-2xl shadow-xl border border-gray-100 h-[270px] flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                              <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.name}`} alt={t.name} width={48} height={48} unoptimized />
                            </div>
                            <div>
                              <h3 className="text-black font-bold text-base">{t.name}</h3>
                              <div className="flex text-[#EFA536] text-[20px] font-extrabold gap-1">
                                {[1, 2, 3, 4, 5].map((s) => <span key={s}>★</span>)}
                              </div>
                              <p className="text-black text-[15px] mt-1">2023-08-31</p>
                            </div>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] font-bold border border-black shadow-sm">G</div>
                        </div>
                        <p className="text-black text-lg leading-relaxed font-poppins  line-clamp-5">
                          &quot;{t.quote || t.text}&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Arrow - Centered on Card */}
           
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}