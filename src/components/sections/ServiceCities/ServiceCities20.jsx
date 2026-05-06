"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";
import { IMAGE_BASE } from "@/lib/constants";

const serviceCitiesHeadingFont = Poppins({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});
const DEFAULT_SLIDER_ICON = "Servicecities/locationsslider.png";
function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  const encoded = segment
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
  return `${basePath}/${encoded}`;
}

function getLocationsList(content, block) {
  const direct = block?.list ?? block?.value?.list;
  if (Array.isArray(direct)) return direct;
  const ref = block?.childrenRef && content?.[block.childrenRef];
  if (Array.isArray(ref)) return ref;
  if (ref && Array.isArray(ref.list)) return ref.list;
  return [];
}

function cityLabel(city) {
  return typeof city === "string"
    ? city
    : (city?.name ?? city?.title ?? String(city));
}

function cityImagePath(city) {
  if (typeof city === "string" || !city) return "";
  const p = city.image ?? city.file_name ?? city.fileName;
  return typeof p === "string" ? p : "";
}

function chunkArray(items, size) {
  const out = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

const PAGE_SIZE = 12;
const EMPTY_LOCATIONS_BLOCK = {};

export default function ServiceCities20({ content }) {
  const block = content?.locations ?? EMPTY_LOCATIONS_BLOCK;

  const cities = useMemo(
    () => getLocationsList(content, block),
    [content, block]
  );

  const pages = useMemo(() => chunkArray(cities, PAGE_SIZE), [cities]);

  const title = (
    block?.title ??
    block?.value?.title ??
    ""
  ).trim();

  const ctaLabel = block?.cta_label ?? block?.value?.cta_label ?? "";
  const ctaHref = block?.cta_href ?? block?.value?.cta_href ?? "/#contact-us";

  const sliderIconRel =
    (block?.slider_icon ?? block?.value?.slider_icon ?? "").trim() ||
    DEFAULT_SLIDER_ICON;
  const sliderIconSrc = buildImageSrc(IMAGE_BASE, sliderIconRel);

  // 🔥 NEW STATE
  const [slideIndex, setSlideIndex] = useState(0);

  if (cities.length === 0) return null;

  const hasMultipleSlides = pages.length > 1;

  // 🔥 Progress
  const progress = (slideIndex + 1) / pages.length;
  const thumbWidthPct = progress * 100;

  return (
    <FullContainer className="bg-white py-10  md:py-14" id="locations">
      <Container className="relative">
        <div className="relative z-10 mx-auto max-w-[1200px]">

          {title ? (
            <h2
              className={cn(
                serviceCitiesHeadingFont.className,
                "mb-6 text-center text-[42px] font-bold leading-[45px] tracking-[0] text-[#1a1a1a]",
              )}
            >
              {title}
            </h2>
          ) : null}

          {/* SLIDER */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${slideIndex * 100}%)` }}
            >
              {pages.map((page, pageIndex) => (
                <div key={pageIndex} className="w-full shrink-0 flex justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px] max-w-[1108px]">

                    {page.map((city, index) => {
                      const label = cityLabel(city);
                      const imgRel = cityImagePath(city);
                      const imgSrc =
                        imgRel && buildImageSrc(IMAGE_BASE, imgRel);

                      const bgLayerStyle = imgSrc
                        ? { backgroundImage: `url("${imgSrc}")` }
                        : { backgroundColor: "#ccc" };

                      return (
                        <div
                          key={`${pageIndex}-${index}`}
                          className="group relative flex h-[118px] w-[262px] flex-col items-center justify-start overflow-hidden rounded-[14px] pt-2.5 shadow"
                        >
                          <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-out group-hover:scale-180 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                            style={bgLayerStyle}
                            aria-hidden
                          />
                          <span
                            className="relative z-10 inline-flex w-fit max-w-[calc(100%-20px)] min-w-0 shrink-0 items-center justify-center gap-[10px] truncate rounded-[5px] px-[8px] py-[6px] text-xs font-bold leading-tight text-[#1a1a1a]"
                            style={{
                              background: "rgba(255, 255, 255, 0.60)",
                            }}
                          >
                            {label}
                          </span>
                        </div>
                      );
                    })}

                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* 🔥 CONTROLS */}
          {hasMultipleSlides && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Previous locations"
                onClick={() =>
                  setSlideIndex((prev) => (prev - 1 + pages.length) % pages.length)
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-neutral-100"
              >
                {sliderIconSrc ? (
                  <Image
                    src={sliderIconSrc}
                    alt=""
                    width={14}
                    height={14}
                    className="-scale-x-100 select-none object-contain"
                  />
                ) : (
                  <span aria-hidden className="text-sm">
                    ‹
                  </span>
                )}
              </button>
              <div className="relative isolate h-[8px] w-[561px] max-w-[min(561px,calc(100vw-120px))] shrink-0 overflow-hidden rounded-[20px]  shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_2px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.12)]  ">
                <div
                  className="absolute inset-y-0 left-0 h-full rounded-[20px] bg-[#818181] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-[width] duration-300 ease-out"
                  style={{ width: `${thumbWidthPct}%` }}
                  aria-hidden
                />
              </div>

              <button
                type="button"
                aria-label="Next locations"
                onClick={() =>
                  setSlideIndex((prev) => (prev + 1) % pages.length)
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-neutral-100"
              >
                {sliderIconSrc ? (
                  <Image
                    src={sliderIconSrc}
                    alt=""
                    width={14}
                    height={14}
                    className="select-none object-contain"
                  />
                ) : (
                  <span aria-hidden className="text-sm">
                    ›
                  </span>
                )}
              </button>

            </div>
          )}

          {/* CTA */}
          {ctaLabel && (
            <div className="mt-8 flex justify-center">
              <Link
                href={ctaHref}
                className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700"
              >
                {ctaLabel}
              </Link>
            </div>
          )}

        </div>
      </Container>
    </FullContainer>
  );
}