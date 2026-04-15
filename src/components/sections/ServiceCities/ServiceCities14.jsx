"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

function trimStr(v) {
  return typeof v === "string" && v.trim() ? v.trim() : "";
}

/** Supports mixed CMS keys for image path fields. */
function pickImageFromObject(obj) {
  if (!obj || typeof obj !== "object") return "";
  const nestedImage =
    trimStr(obj?.Image?.url) ||
    trimStr(obj?.Image?.src) ||
    trimStr(obj?.image?.url) ||
    trimStr(obj?.image?.src) ||
    trimStr(obj?.file_name?.url) ||
    trimStr(obj?.file_name?.src) ||
    trimStr(obj?.file?.url) ||
    trimStr(obj?.file?.src) ||
    "";
  if (nestedImage) return nestedImage;

  const direct =
    trimStr(obj.Image) ||
    trimStr(obj.image) ||
    trimStr(obj.file_name) ||
    trimStr(obj.filename) ||
    trimStr(obj.file) ||
    trimStr(obj.src) ||
    trimStr(obj.url) ||
    trimStr(obj.map_image) ||
    trimStr(obj.location_image) ||
    "";
  if (direct) return direct;

  // Fallback for unpredictable key casing from CMS exports.
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value !== "string") continue;
    const normalizedKey = key.toLowerCase().replace(/\s+/g, "");
    if (
      normalizedKey.includes("image") ||
      normalizedKey.includes("file") ||
      normalizedKey === "src" ||
      normalizedKey === "url"
    ) {
      const candidate = trimStr(value);
      if (candidate) return candidate;
    }
  }
  return "";
}

/** `/images/...` → public · relative paths → `/api/image/...` · absolute URLs as-is */
function resolveLocationImageSrc(path) {
  const t = trimStr(path).replace(/\\/g, "/");
  if (!t) return "";
  if (t.startsWith("/") || t.startsWith("http://") || t.startsWith("https://")) {
    return t;
  }
  const basePath = (IMAGE_BASE ?? "/api/image").replace(/\/$/, "");
  const segment = t.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

/**
 * Collects the locations array from `content` (supports both `locations` and `location`).
 */
function getLocationsList(content) {
  const locs = content?.locations;
  const loc = content?.location;

  if (Array.isArray(locs)) return locs;
  if (Array.isArray(loc)) return loc;

  const fromLocs = locs?.list ?? locs?.value?.list;
  if (Array.isArray(fromLocs)) return fromLocs;

  const fromLoc = loc?.list ?? loc?.value?.list;
  if (Array.isArray(fromLoc)) return fromLoc;

  const refKey = locs?.childrenRef || loc?.childrenRef;
  if (refKey && content?.[refKey]) {
    const ref = content[refKey];
    if (Array.isArray(ref)) return ref;
    if (ref && Array.isArray(ref.list)) return ref.list;
  }

  return [];
}

/** Reference layout: 4×3 grid = 12 cards per horizontal “page” */
const LOCATIONS_PAGE_SIZE = 12;

function chunkLocations(list, size) {
  const chunks = [];
  for (let i = 0; i < list.length; i += size) {
    chunks.push(list.slice(i, i + size));
  }
  return chunks;
}

/** Normalizes one row → { id, label, imageSrc } for rendering inside `.map()` */
function normalizeCityEntry(raw, fallbackImage) {
  const fallback = trimStr(fallbackImage);

  if (typeof raw === "string") {
    const t = raw.trim();
    return {
      id: t,
      label: t,
      imageSrc: fallback ? resolveLocationImageSrc(fallback) : "",
    };
  }

  if (raw && typeof raw === "object") {
    const label =
      trimStr(raw.name) ||
      trimStr(raw.title) ||
      trimStr(raw.label) ||
      trimStr(raw.city) ||
      trimStr(raw.city_name) ||
      trimStr(raw.location) ||
      "";
    const explicit = pickImageFromObject(raw);
    const resolved = explicit || fallback;
    const id = trimStr(raw.id) || trimStr(raw.slug) || label || String(raw);
    return {
      id,
      label,
      imageSrc: resolved ? resolveLocationImageSrc(resolved) : "",
    };
  }

  return {
    id: String(raw ?? ""),
    label: String(raw ?? ""),
    imageSrc: fallback ? resolveLocationImageSrc(fallback) : "",
  };
}

export default function ServiceCities14({ content }) {
  const locationsBlock = content?.locations ?? {};
  const locationMeta = content?.location ?? {};
  const rawList = useMemo(() => getLocationsList(content), [content]);

  const listFallbackImage = useMemo(() => {
    for (const row of rawList) {
      const candidate = pickImageFromObject(row);
      if (candidate) return candidate;
    }
    return "";
  }, [rawList]);

  const defaultLocationImage =
    pickImageFromObject(content) ||
    pickImageFromObject(locationsBlock) ||
    pickImageFromObject(locationMeta) ||
    listFallbackImage ||
    "";

  const cities = useMemo(
    () => rawList.map((row) => normalizeCityEntry(row, defaultLocationImage)),
    [rawList, defaultLocationImage],
  );

  const pages = useMemo(() => chunkLocations(cities, LOCATIONS_PAGE_SIZE), [cities]);

  const title =
    trimStr(locationsBlock.title) ||
    trimStr(locationMeta.title) ||
    trimStr(locationsBlock?.value?.title) ||
    "";

  const subTitle =
    trimStr(locationsBlock.sub_title) ||
    trimStr(locationsBlock.subtitle) ||
    trimStr(locationsBlock.description) ||
    trimStr(locationMeta.sub_title) ||
    trimStr(locationMeta.subtitle) ||
    trimStr(locationMeta.description) ||
    "";

  const scrollRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollUi, setScrollUi] = useState({
    canScroll: false,
    thumbW: 100,
    thumbLeft: 0,
  });
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0 });
  const [thumbDragging, setThumbDragging] = useState(false);

  const readScrollUi = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const hasOverflow = max > 4;
    if (!hasOverflow) {
      setScrollUi({ canScroll: false, thumbW: 100, thumbLeft: 0 });
      return;
    }
    const clientW = el.clientWidth;
    const scrollW = el.scrollWidth;
    const thumbW = Math.min(92, Math.max(14, (clientW / scrollW) * 100));
    const thumbTravel = 100 - thumbW;
    const thumbLeft = thumbTravel > 0 ? (el.scrollLeft / max) * thumbTravel : 0;
    setScrollUi({ canScroll: true, thumbW, thumbLeft });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    readScrollUi();
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(readScrollUi);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(readScrollUi);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [readScrollUi, cities.length, pages.length]);

  const scrollByDir = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const page = Math.max(1, el.clientWidth) * dir;
    el.scrollBy({ left: page, behavior: "smooth" });
  };

  const onTrackPointerDown = (e) => {
    if (e.target !== e.currentTarget) return;
    const el = scrollRef.current;
    if (!el || !scrollUi.canScroll) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    el.scrollTo({ left: Math.max(0, Math.min(max, ratio * max)), behavior: "smooth" });
  };

  const onThumbPointerDown = (e) => {
    const el = scrollRef.current;
    const track = trackRef.current;
    if (!el || !track || !scrollUi.canScroll) return;
    e.preventDefault();
    e.stopPropagation();
    setThumbDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
    };
  };

  const onThumbPointerMove = (e) => {
    if (!dragRef.current.active) return;
    const el = scrollRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;
    const trackW = track.getBoundingClientRect().width;
    const thumbTravelPx = trackW * (1 - scrollUi.thumbW / 100);
    if (thumbTravelPx <= 1) return;
    const dx = e.clientX - dragRef.current.startX;
    const next = dragRef.current.startScroll + (dx / thumbTravelPx) * max;
    el.scrollLeft = Math.max(0, Math.min(max, next));
  };

  const endThumbDrag = (e) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    setThumbDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  if (cities.length === 0) return null;

  const { canScroll, thumbW, thumbLeft } = scrollUi;

  return (
    <FullContainer className="bg-white py-10 md:py-14 lg:py-16" id="locations">
      <Container className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {title ? (
          <h2 className="font-montserrat text-center text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl lg:text-[2rem] lg:leading-tight">
            {title}
          </h2>
        ) : null}
        {subTitle ? (
          <p className="mx-auto mt-4 max-w-3xl text-center font-barlow text-sm leading-relaxed text-neutral-600 sm:text-[15px] sm:leading-relaxed md:text-base">
            {subTitle}
          </p>
        ) : null}

        <div className="mt-10 md:mt-12 lg:mt-14">
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory flex-nowrap gap-0 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {pages.map((page, pageIndex) => (
              <div
                key={`locations-page-${pageIndex}`}
                className="w-full min-w-full shrink-0 snap-center snap-always pr-0"
              >
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-5">
                  {page.map((city, index) => {
                    const globalIndex = pageIndex * LOCATIONS_PAGE_SIZE + index;
                    const src = city.imageSrc;
                    const useUnoptimized =
                      src.startsWith("/api/") ||
                      src.startsWith("http://") ||
                      src.startsWith("https://");
                    return (
                      <div
                        key={city.id ? `${city.id}-${globalIndex}` : `loc-${globalIndex}`}
                        className="relative min-w-0"
                      >
                        <div className="relative w-full overflow-hidden rounded-3xl ring-1 ring-black/5">
                          <div className="relative aspect-[2/1] w-full min-h-[120px] bg-neutral-200 sm:min-h-[140px]">
                            {src ? (
                              <Image
                                src={src}
                                alt={
                                  city.label ? `Service area: ${city.label}` : "Service location"
                                }
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 639px) 45vw, (max-width: 1023px) 31vw, 24vw"
                                unoptimized={useUnoptimized}
                                priority={globalIndex < 12}
                              />
                            ) : (
                              <div className="h-full w-full bg-neutral-200" aria-hidden />
                            )}
                            <div
                              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10"
                              aria-hidden
                            />
                          </div>
                          <div className="pointer-events-none absolute inset-x-0 top-3 z-10 flex justify-center px-2 sm:top-4 sm:px-3">
                            <div className="w-fit max-w-full rounded-md bg-[#FFFFFF99] px-3 py-1.5 text-center shadow-sm backdrop-blur-md sm:rounded-lg sm:px-4 sm:py-2">
                              <span className="block font-montserrat text-[13px] font-bold leading-tight text-neutral-900 [overflow-wrap:anywhere] sm:text-sm">
                                {city.label}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div
            className={`mt-9 flex items-center gap-4 sm:mt-10 lg:mt-12 ${canScroll ? "" : "opacity-60"}`}
            aria-hidden={!canScroll}
          >
            <button
              type="button"
              onClick={() => scrollByDir(-1)}
              disabled={!canScroll}
              className="shrink-0 p-0.5 text-[#818181] transition hover:text-neutral-700 disabled:pointer-events-none disabled:opacity-30"
              aria-label="Scroll locations left"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={2.25} />
            </button>
            <div
              ref={trackRef}
              role="presentation"
              onPointerDown={onTrackPointerDown}
              className="relative h-[5px] min-w-0 flex-1 cursor-pointer rounded-full bg-[#818181]"
            >
              <div
                role="presentation"
                onPointerDown={onThumbPointerDown}
                onPointerMove={onThumbPointerMove}
                onPointerUp={endThumbDrag}
                onPointerCancel={endThumbDrag}
                className="absolute top-0 h-full cursor-grab touch-none rounded-full bg-[#d4d4d4] active:cursor-grabbing"
                style={{
                  width: `${thumbW}%`,
                  left: `${thumbLeft}%`,
                  transitionProperty: thumbDragging ? "none" : "left,width",
                  transitionDuration: "150ms",
                  transitionTimingFunction: "ease-out",
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => scrollByDir(1)}
              disabled={!canScroll}
              className="shrink-0 p-0.5 text-[#818181] transition hover:text-neutral-700 disabled:pointer-events-none disabled:opacity-30"
              aria-label="Scroll locations right"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={2.25} />
            </button>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
