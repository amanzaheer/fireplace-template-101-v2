"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import FullContainer from "@/components/common/FullContainer";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Rubik, Inter, Lexend, DM_Sans, Poppins } from "next/font/google";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSansFont = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
/** Reference palette */
const ORANGE = "#E65100";
const ORANGE_DEEP = "#BF360C";
const GRAY_PANEL = "#F5F5F5";
const GOLD = "#FFB300";

function StarRow({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-0.5 ${className}`} aria-hidden>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="text-[17px] md:text-xl leading-none" style={{ color: GOLD }}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonials6({ content }) {
  const data = content?.testimonials ?? {};
  const testimonials = Array.isArray(data.list) ? data.list : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const autoSlideRef = useRef(null);

  const orangeTitle = data.sidebarTitle ?? data.serviceTitle ?? "Chimney Maintenance";
  const orangeAuthor = data.sidebarAuthor ?? "Mr. John Doe";
  const orangeLabel = (data.sidebarLabel ?? "CLIENTS").toUpperCase();
  const sectionTitle = data.title ?? "Our Happy Clients";

  const testimonialsWithAvatars = useMemo(() => {
    const getRandomAvatar = (seed) =>
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;

    return testimonials.map((testimonial, index) => ({
      ...testimonial,
      avatar: testimonial.avatar || getRandomAvatar(testimonial.name || `user-${index}`),
      role: (testimonial.role ?? testimonial.label ?? "CLIENTS").toUpperCase(),
    }));
  }, [testimonials]);

  const defaultAvatar =
    "https://api.dicebear.com/7.x/avataaars/svg?seed=default";

  const n = Math.max(testimonialsWithAvatars.length, 1);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    autoSlideRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev >= testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [testimonials.length]);

  const handleArrowClick = (direction) => {
    if (testimonials.length <= 1) return;
    if (direction === "next") {
      setActiveIndex((i) => (i >= testimonials.length - 1 ? 0 : i + 1));
    } else {
      setActiveIndex((i) => (i <= 0 ? testimonials.length - 1 : i - 1));
    }
  };

  if (!testimonials.length) return null;

  return (
    <FullContainer
      className= {`${poppins.className} bg-white font-montserrat py-10 md:py-14 !px-0 !items-stretch`} 
      id="testimonials"
    >
      <div className="w-full overflow-x-hidden">
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:gap-0 min-h-[min(100%,420px)] lg:min-h-[400px] w-full">
          {/* Left: fixed width on lg so gray panel can grow to fill the rest */}
          <aside
            className="w-full lg:w-[min(100%,440px)] px-[25px] flex flex-col items-end justify-center text-center shadow-none "
            style={{ backgroundColor: ORANGE }}
          >
            <div className="flex flex-col items-start justify-start  gap-5">

                <Quote
                  className="w-14 rotate-180 text-[#f59402] h-14 md:w-16 md:h-16 opacity-90 shrink-0"
                  style={{ color: ORANGE_DEEP }}
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3 className="text-white text-start font-bold text-2xl md:text-[33px] leading-tight  max-w-[240px]">
                  {orangeTitle}
                </h3>
                <StarRow className="justify-center" />
                <div className=" w-full text-start">
                  <p className="text-white font-bold text-lg md:text-xl">{orangeAuthor}</p>
                  <p className="text-white/95 text-xs md:text-sm font-semibold tracking-[0.2em]">
                    {orangeLabel}
                  </p>
              </div>


            </div>
          </aside>

          {/* Right: grows to fill remaining row width; all content centered */}
          <div
            className= {`${dmSansFont.className} w-full flex-1 min-w-0 flex flex-col items-center text-center relative border-0 border-l border-black/10 lg:rounded-none rounded-lg lg:rounded-tl-none lg:rounded-bl-none lg:rounded-tr-lg lg:rounded-br-lg px-6 py-8 md:px-10 md:py-10 min-h-[360px] md:min-h-[400px] shadow-none`}
            style={{ backgroundColor: GRAY_PANEL }}
          >
            <h2 className="text-center text-neutral-900 font-semibold w-full text-2xl md:text-3xl lg:text-[55px] mb-4 md:mb-5">
              {sectionTitle}
            </h2>
            <StarRow className="mb-6 md:mb-8 justify-center" />

            <div className="relative flex-1 overflow-hidden w-full max-w-full">
              <div
                className="flex h-full transition-transform duration-500 ease-out"
                style={{
                  width: `${n * 100}%`,
                  transform: `translateX(-${(activeIndex / n) * 100}%)`,
                }}
              >
                {testimonialsWithAvatars.map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center gap-5 px-2 md:px-4 box-border shrink-0"
                    style={{ width: `${100 / n}%`, flexBasis: `${100 / n}%` }}
                  >
                    <p className="text-center text-neutral-900 text-lg md:text-[22px] leading-relaxed w-full max-w-2xl mx-auto">
                      <span className="text-neutral-800">&ldquo;</span>
                      {testimonial.quote || testimonial.text}
                      <span className="text-neutral-800">&rdquo;</span>
                    </p>

                    <div className="flex flex-col items-center gap-4 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center items-center justify-center gap-3 sm:gap-4">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-neutral-300 bg-neutral-200 shrink-0 relative">
                          <Image
                            src={testimonial.avatar || defaultAvatar}
                            alt={testimonial.name ? `Photo of ${testimonial.name}` : "Client"}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-neutral-900 text-base md:text-xl leading-tight">
                            {testimonial.name}
                          </p>
                          <p className="text-neutral-800 text-xs md:text-sm font-semibold tracking-[0.15em] mt-1">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {testimonials.length > 1 ? (
              <div className="flex justify-center items-center gap-4 mt-8 pt-2">
                <button
                  type="button"
                  onClick={() => handleArrowClick("prev")}
                  className="w-11 h-11 rounded-full border-2 border-neutral-900 bg-transparent flex items-center justify-center text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className="w-8 h-8" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={() => handleArrowClick("next")}
                  className="w-11 h-11 rounded-full border-2 border-neutral-900 bg-transparent flex items-center justify-center text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
                  aria-label="Next testimonial"
                >
                  <ArrowRight className="w-8 h-8" strokeWidth={2} />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </FullContainer>
  );
}
