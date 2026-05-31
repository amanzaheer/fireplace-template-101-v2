"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Poppins } from "next/font/google";
import { IMAGE_BASE } from "@/lib/constants";

config.autoAddCss = false;

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function RatingStars({ value }) {
  const safeValue = Math.min(5, Math.max(0, Number(value) || 0));
  return (
    <div
      className="mt-2 flex items-center justify-center gap-1"
      aria-label={`${safeValue} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <FontAwesomeIcon
          key={`rating-${index + 1}`}
          icon={faStar}
          className={`text-[20px] ${index < safeValue ? "text-[#f6b400]" : "text-[#d8d8d8]"}`}
        />
      ))}
    </div>
  );
}

function pad(value) {
  return String(value).padStart(2, "0");
}

export default function ReviewandRating1({ content }) {
  const section = content?.reviewandrating ?? {};
  const title = section?.title ?? "";
  const description = section?.description ?? "";
  const reviews = Array.isArray(section?.list) ? section.list : [];
  const countdown = section?.countdown ?? {};

  const [activeIndex, setActiveIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [timer, setTimer] = useState({
    days: Number(countdown.days) || 3,
    hours: Number(countdown.hours) || 12,
    minutes: Number(countdown.minutes) || 42,
    seconds: Number(countdown.seconds) || 21,
  });

  useEffect(() => {
    const updateViewport = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 768);
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          return prev;
        }
        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days -= 1;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const logoSlides = useMemo(() => {
    const logos = [1, 2, 3, 4, 5].map((n) =>
      buildImageSrc(IMAGE_BASE, `footer/footer${n}.webp`),
    );
    const dataSource = reviews.length
      ? reviews
      : [{ name: "Customer", text: "", rating: 5 }];

    return logos.map((logo, index) => {
      const entry = dataSource[index % dataSource.length] ?? {};
      return {
        id: `${entry?.name ?? "review"}-${index}`,
        logo,
        name: entry?.name ?? "Customer",
        rating: Number(entry?.rating) || 5,
      };
    });
  }, [reviews]);

  const total = logoSlides.length || 1;
  const getIndex = (offset) => (activeIndex + offset + total) % total;
  const visibleSlides = isMobile
    ? [logoSlides[getIndex(0)]]
    : [logoSlides[getIndex(-1)], logoSlides[getIndex(0)], logoSlides[getIndex(1)]];

  return (
    <FullContainer
      id="reviewandrating"
      className={`bg-white py-10 md:py-14 ${poppins.className}`}
    >
      <Container>
        <div className="mx-auto max-w-[730px]">
          <div className="text-center">
            <h2 className="text-[15px] font-semibold leading-tight text-black md:text-[21px]">
              {title || "The Most Trusted and 5-Star Rated Services"}
            </h2>
            {description ? (
              <p className="mx-auto mt-2 max-w-[700px] text-[16px] text-[#4a4a4a] md:text-[18px]">
                {description}
              </p>
            ) : null}
          </div>

          <div className="mt-7 flex justify-center">
            <div className="grid w-full max-w-[520px] grid-cols-2 place-items-center gap-1 sm:grid-cols-4 md:gap-10">
            <div className="rounded-xl bg-white py-4 w-[120px] h-[114px] text-center shadow-[0_2px_7px_rgba(0,0,0,0.15)]">
              <p className="text-[70px] font-semibold leading-none">
                
                {pad(timer.hours)}
              </p>
              <p className="text-[21px] font-semibold leading-none">Hours</p>
            </div>
            <div className="rounded-xl bg-white py-4 text-center w-[120px] h-[114px] shadow-[0_2px_7px_rgba(0,0,0,0.15)]">
              <p className="text-[70px] font-semibold leading-none">
                {pad(timer.days)}
              </p>
              <p className="text-[21px] font-semibold leading-none">Days</p>
            </div>
            <div className="rounded-xl bg-white py-4 text-center w-[120px] h-[114px] shadow-[0_2px_7px_rgba(0,0,0,0.15)]">
              <p className="text-[70px] font-semibold leading-none">
                {pad(timer.minutes)}
              </p>
              <p className="text-[21px] font-semibold leading-none">Minutes</p>
            </div>
            <div className="rounded-xl bg-white py-4 text-center w-[120px] h-[114px] shadow-[0_2px_7px_rgba(0,0,0,0.15)]">
              <p className="text-[70px] font-semibold leading-none">
                {pad(timer.seconds)}
              </p>
              <p className="text-[21px] font-semibold leading-none">Seconds</p>
            </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-2">
            <button
              type="button"
              aria-label="Previous logo"
              onClick={() => setActiveIndex((prev) => (prev - 1 + total) % total)}
              className="h-10 w-10 rounded-full text-black transition hover:bg-white"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <div className="grid w-full grid-cols-1 items-center gap-6 md:grid-cols-3">
              {visibleSlides.map((slide, idx) =>
                slide ? (
                  <div
                    key={`${slide.id}-${idx}`}
                    className="flex flex-col items-center justify-center"
                  >
                    <div className="relative h-[90px] w-[220px]">
                      <Image
                        src={slide.logo}
                        alt={`${slide.name} review platform`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <RatingStars value={slide.rating} />
                  </div>
                ) : null,
              )}
            </div>

            <button
              type="button"
              aria-label="Next logo"
              onClick={() => setActiveIndex((prev) => (prev + 1) % total)}
              className="h-10 w-10 rounded-full text-black transition hover:bg-white"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {logoSlides.map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to logo ${index + 1}`}
                className={`h-2.5 w-2.5 rounded-full ${index === activeIndex ? "bg-[#f36d21]" : "bg-[#d0d0d0]"}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}