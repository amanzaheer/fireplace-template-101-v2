"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

/** Brand quote mark — path fill from CMS color via CSS */
function TestimonialsQuoteMark({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="52"
      height="43"
      viewBox="0 0 52 43"
      fill="none"
      className={`shrink-0 text-[#F59402] ${className ?? ""}`}
      aria-hidden
    >
      <path
        d="M22.3301 0C13.1718 0.643535 0.00723556 2.10572 0 20.0418V42.6086H20.4363V18.4637H13.6505C13.2206 12.0166 18.5295 10.3519 24.3026 9.074L22.3301 0ZM49.71 0C40.5517 0.643535 27.3871 2.10576 27.3799 20.0418V42.6086H47.8163V18.4637H41.0305C40.6005 12.0166 45.9095 10.3519 51.6826 9.074L49.71 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function StarRow({ rating, className = "", onDarkBackground = true }) {
  const n = Math.min(5, Math.max(0, Number.isFinite(Number(rating)) ? Number(rating) : 5));
  const emptyClass = onDarkBackground ? "text-white/25" : "text-neutral-300";
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-lg leading-none md:text-xl ${i <= n ? "text-[#F59402]" : emptyClass}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function initialsFromName(name) {
  if (!name || typeof name !== "string") return "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

function normalizeTestimonialsBlock(raw) {
  if (raw == null) return {};
  if (Array.isArray(raw)) return { list: raw };
  if (typeof raw === "object") {
    const list = Array.isArray(raw.list)
      ? raw.list
      : Array.isArray(raw.items)
        ? raw.items
        : Array.isArray(raw.value)
          ? raw.value
          : [];
    return { ...raw, list };
  }
  return {};
}

export default function Testimonials14({ content }) {
  const data = normalizeTestimonialsBlock(content?.testimonials);
  const rawList = Array.isArray(data.list) ? data.list : [];

  const sidebarObj = data.sidebar && typeof data.sidebar === "object" ? data.sidebar : {};
  const sidebarTitle =
    (typeof data.sidebarTitle === "string" && data.sidebarTitle.trim()
      ? data.sidebarTitle.trim()
      : null) ??
    (typeof data.serviceTitle === "string" && data.serviceTitle.trim()
      ? data.serviceTitle.trim()
      : null) ??
    (typeof sidebarObj.title === "string" && sidebarObj.title.trim()
      ? sidebarObj.title.trim()
      : null);

  const sidebarAuthor =
    (typeof data.sidebarAuthor === "string" && data.sidebarAuthor.trim()
      ? data.sidebarAuthor.trim()
      : "") ||
    (typeof sidebarObj.name === "string" && sidebarObj.name.trim() ? sidebarObj.name.trim() : "");

  const sidebarLabelRaw =
    data.sidebarLabel ?? sidebarObj.role ?? sidebarObj.label ?? "";
  const sidebarLabel =
    typeof sidebarLabelRaw === "string" && sidebarLabelRaw.trim()
      ? sidebarLabelRaw.trim().toUpperCase()
      : "";

  const sidebarRating = Number(data.sidebarRating ?? sidebarObj.rating);
  const hasSidebar = Boolean(sidebarTitle || sidebarAuthor);

  const items = useMemo(
    () =>
      rawList.map((t) => ({
        ...t,
        quote: typeof t?.quote === "string" ? t.quote : typeof t?.text === "string" ? t.text : "",
        name: typeof t?.name === "string" ? t.name : "",
        avatar: typeof t?.avatar === "string" && t.avatar.trim() ? t.avatar.trim() : "",
        role:
          typeof t?.role === "string" && t.role.trim()
            ? t.role.trim()
            : typeof t?.label === "string" && t.label.trim()
              ? t.label.trim()
              : "",
        rating: Number(t?.rating),
      })),
    [rawList],
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex((i) => Math.min(i, Math.max(0, items.length - 1)));
  }, [items.length]);

  const maxIndex = Math.max(0, items.length - 1);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(goNext, 5500);
    return () => clearInterval(t);
  }, [items.length, goNext]);

  const bgPath =
    typeof data.file_name === "string" && data.file_name.trim()
      ? data.file_name.trim()
      : typeof data.background_image === "string" && data.background_image.trim()
        ? data.background_image.trim()
        : "";
  const bgSrc = bgPath ? buildImageSrc(IMAGE_BASE, bgPath) : "";

  const sectionTitle =
    typeof data.title === "string" && data.title.trim() ? data.title.trim() : null;

  const current = items[activeIndex];

  if (!items.length) return null;

  const quoteText = current?.quote ?? "";
  const starCount = Math.min(5, Math.max(0, Number.isFinite(current?.rating) ? Number(current.rating) : 5));

  return (
    <FullContainer className="relative overflow-hidden py-12 md:py-16" id="testimonials">
      {bgSrc ? (
        <div className="absolute inset-0">
          <Image src={bgSrc} alt="" fill className="object-cover" sizes="100vw" priority={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/35" aria-hidden />
        </div>
      ) : (
        <div className="absolute inset-0 bg-neutral-900" aria-hidden />
      )}

      <Container className="relative z-10 mx-auto max-w-6xl px-4">
        {sectionTitle ? (
          <h2 className="font-montserrat mb-10 text-center text-2xl font-medium text-white md:mb-12 md:text-3xl">
            {sectionTitle}
          </h2>
        ) : null}

        <div
          className={`grid gap-8 md:gap-10 lg:items-center ${hasSidebar ? "lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)]" : "lg:grid-cols-1"}`}
        >
          {hasSidebar ? (
            <aside className="flex flex-col gap-4 text-white lg:max-w-md">
              <TestimonialsQuoteMark className="h-[43px] w-[52px]" />
              {sidebarTitle ? (
                <h3 className="font-montserrat text-2xl font-bold leading-tight md:text-3xl">{sidebarTitle}</h3>
              ) : null}
              <StarRow
                rating={Number.isFinite(sidebarRating) ? sidebarRating : 5}
                className="justify-start"
                onDarkBackground
              />
              {sidebarAuthor ? (
                <p className="font-montserrat text-lg font-bold md:text-xl">{sidebarAuthor}</p>
              ) : null}
              {sidebarLabel ? (
                <p className="text-xs font-semibold tracking-[0.2em] text-white/90 md:text-sm">{sidebarLabel}</p>
              ) : null}
            </aside>
          ) : null}

          <div className={`min-w-0 ${hasSidebar ? "" : "mx-auto max-w-3xl"}`}>
            <article
              className="rounded-2xl border border-white/40 bg-white/65 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-md md:p-8"
              key={activeIndex}
            >
              <div className="mb-4 flex justify-start">
                <StarRow rating={starCount} className="justify-start" onDarkBackground={false} />
              </div>

              {quoteText ? (
                <p className="font-barlow text-base leading-relaxed text-neutral-900 md:text-lg">{quoteText}</p>
              ) : null}

              <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-neutral-200 bg-neutral-100">
                    {current?.avatar ? (
                      <Image
                        src={current.avatar}
                        alt={current.name ? `Photo of ${current.name}` : ""}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center font-montserrat text-sm font-semibold text-neutral-600">
                        {initialsFromName(current?.name)}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    {current?.name ? (
                      <p className="font-montserrat font-bold text-neutral-900">{current.name}</p>
                    ) : null}
                    {current?.role ? (
                      <p className="font-montserrat text-xs font-semibold uppercase tracking-wide text-neutral-800">
                        {current.role}
                      </p>
                    ) : null}
                  </div>
                </div>

                {items.length > 1 ? (
                  <div className="flex shrink-0 justify-end gap-2 sm:ml-auto">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-900 bg-white/80 text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="h-5 w-5" strokeWidth={2} />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-900 bg-white/80 text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="h-5 w-5" strokeWidth={2} />
                    </button>
                  </div>
                ) : null}
              </div>
            </article>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
