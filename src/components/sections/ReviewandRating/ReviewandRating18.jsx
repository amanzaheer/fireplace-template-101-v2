"use client";

import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins } from "next/font/google";

config.autoAddCss = false;

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** Layout / colors live in component only — JSON is text only. */
const SECTION_BG = "#FF0011";
const STAR_RATING = 5;

function normalizeItem(raw, index) {
  if (typeof raw === "string") {
    const text = raw.trim();
    return text ? { id: `trust-${index}`, title: text, subtitle: "" } : null;
  }
  if (!raw || typeof raw !== "object") return null;
  const title = String(raw.title ?? raw.label ?? raw.name ?? "").trim();
  const subtitle = String(
    raw.subtitle ?? raw.sub_title ?? raw.description ?? raw.comment ?? "",
  ).trim();
  if (!title && !subtitle) return null;
  return {
    id: raw.id ?? `trust-${index}`,
    title,
    subtitle,
  };
}

function ShieldIcon({ className = "h-10 w-10 shrink-0 text-white" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M24 4L8 10v12c0 11.1 7.2 21.5 16 24 8.8-2.5 16-12.9 16-24V10L24 4z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M17 24l5 5 9-10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrustStars() {
  return (
    <div
      className="flex shrink-0 items-center gap-0.5"
      aria-label={`${STAR_RATING} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <FontAwesomeIcon
          key={`star-${index}`}
          icon={faStar}
          className={`text-[18px] md:text-[20px] ${
            index < STAR_RATING ? "text-[#FFB800]" : "text-white/35"
          }`}
        />
      ))}
    </div>
  );
}

function TrustItem({ item, showStars }) {
  return (
    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
      {showStars ? <TrustStars /> : <ShieldIcon />}
      <div className="min-w-0 text-left">
        {item.title ? (
          <p className="text-base font-normal font-poppins  leading-tight text-white md:text-[18px">
            {item.title}
          </p>
        ) : null}
        {item.subtitle ? (
          <p className="mt-0.5 text-sm  border-black font-normal font-poppins leading-snug text-white/95 md:text-[10px]">
            {item.subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default function ReviewandRating18({ content }) {
  const section = content?.reviewandrating ?? {};
  const rawItems = Array.isArray(section.items)
    ? section.items
    : Array.isArray(section.list)
      ? section.list
      : [];

  const items = useMemo(
    () =>
      rawItems
        .map((entry, index) => normalizeItem(entry, index))
        .filter(Boolean),
    [rawItems],
  );

  if (items.length === 0) return null;

  return (
    <FullContainer
      id="reviewandrating"
      className={`bg-[#FF0011] py-0 ${poppins.className}`}
    >
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-6 sm:grid-cols-2 sm:gap-8 sm:py-8 lg:grid-cols-4 lg:gap-6 lg:py-10">
          {items.map((item, index) => (
            <TrustItem key={item.id} item={item} showStars={index === 0} />
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}
