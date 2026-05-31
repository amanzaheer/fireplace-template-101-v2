"use client";

import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** Downloaded icons in /public/ReviewRating (same pattern as icon4) */
const DEFAULT_ITEMS = [
  {
    icon: "/ReviewRating/icon1.png",
    label: "Certified Technicians",
    flip: null,
  },
  {
    icon: "/ReviewRating/icon2.png",
    label: "48+ Years Experience",
    flip: "y",
  },
  {
    icon: "/ReviewRating/icon3.png",
    label: "Fully Insured",
    flip: "y",
  },
  {
    icon: "/ReviewRating/icon4.png",
    label: "Award-Winning Service",
    flip: null,
  },
];

const LEGACY_ICON_PATHS = {
  "ReviewRating/icon1 (2).png": "/ReviewRating/icon1.png",
  "ReviewRating/icon2 (2).png": "/ReviewRating/icon2.png",
  "ReviewRating/icon3 (2).png": "/ReviewRating/icon3.png",
  "ReviewRating/icon4.png": "/ReviewRating/icon4.png",
  "/ReviewRating/icon1.png": "/ReviewRating/icon1.png",
  "/ReviewRating/icon2.png": "/ReviewRating/icon2.png",
  "/ReviewRating/icon3.png": "/ReviewRating/icon3.png",
  "/ReviewRating/icon4.png": "/ReviewRating/icon4.png",
  "ReviewRating/icon1.png": "/ReviewRating/icon1.png",
  "ReviewRating/icon2.png": "/ReviewRating/icon2.png",
  "ReviewRating/icon3.png": "/ReviewRating/icon3.png",
};

function buildIconSrc(filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const segment = filePath.replace(/^\//, "").trim();
  if (!segment) return "";
  const base = (IMAGE_BASE ?? "/api/image").replace(/\/$/, "");
  return `${base}/${segment}`;
}

function iconFlipClass(flip) {
  const mode = String(flip ?? "")
    .trim()
    .toLowerCase();
  if (mode === "x" || mode === "horizontal") return "-scale-x-100";
  if (mode === "y" || mode === "vertical") return "-scale-y-100";
  if (mode === "xy" || mode === "both") return "-scale-x-100 -scale-y-100";
  return "";
}

function resolveIconSrc(iconPath) {
  if (!iconPath || typeof iconPath !== "string") return "";

  const trimmed = iconPath.trim();
  if (!trimmed) return "";

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  if (trimmed.startsWith("/api/image/")) {
    return trimmed;
  }

  const mapped = LEGACY_ICON_PATHS[trimmed] ?? trimmed;

  if (mapped.startsWith("/ReviewRating/")) {
    return mapped;
  }

  if (mapped.startsWith("ReviewRating/")) {
    return `/${mapped}`;
  }

  return buildIconSrc(mapped);
}

function normalizeItems(raw) {
  if (!Array.isArray(raw)) return DEFAULT_ITEMS;

  const items = raw
    .map((item) => {
      if (typeof item === "string") {
        return { icon: "", label: item.trim() };
      }
      if (!item || typeof item !== "object") return null;

      const label = (item.label ?? item.title ?? item.text ?? "")
        .toString()
        .trim();

      const icon = (item.icon ?? item.file_name ?? item.image ?? "")
        .toString()
        .trim();

      if (!label && !icon) return null;
      const flip = item.flip ?? item.icon_flip ?? null;
      return { icon, label, flip };
    })
    .filter(Boolean);

  return items.length > 0 ? items : DEFAULT_ITEMS;
}

function TrustIcon({ src, flip }) {
  const flipClass = iconFlipClass(flip);
  if (!src) return null;
  return (
    <Image
      src={src}
      alt=""
      width={96}
      height={96}
      unoptimized
      className={cn("h-full w-full object-contain", flipClass)}
      aria-hidden
    />
  );
}
export default function ReviewandRating23({ content }) {
  const block = content?.review_and_rating ?? {};
  const items = normalizeItems(block.reviews ?? block.list ?? block.features);
  const review_title = block.review_title ?? "";
  const review_subtitle = block.review_subtitle ?? "";
  return (
    <FullContainer
      id="review-and-rating"
      className={cn("bg-white py-10 md:py-14 lg:py-16", poppins.className)}
    >
      <Container className="px-4 sm:px-6 lg:px-8">
        {review_title ? (
        <p
        className={cn(
          "mx-auto max-w-4xl text-center text-[16px] font-medium leading-[33px] tracking-normal text-black",
          poppins.className
        )}
      >
        {review_title}
      </p>
        ) : null}
        <ul
          className={cn(
            "mx-auto flex w-full max-w-[896px] flex-row flex-wrap items-center justify-center gap-[60px] p-0 lg:flex-nowrap lg:justify-between lg:gap-[107px]",
            review_title || review_subtitle ? "mt-8 md:mt-10" : "",
          )}
        >
          {items.map((item, idx) => {
            const iconSrc =
              resolveIconSrc(DEFAULT_ITEMS[idx]?.icon ?? "") ||
              resolveIconSrc(item.icon) ||
              "";
            const flip = item.flip ?? DEFAULT_ITEMS[idx]?.flip ?? null;

            return (
              <li
                key={`${item.label}-${idx}`}
                className="flex flex-col items-center text-center"
              >
                {iconSrc ? (
                  <div className="mb-4 flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
                    <TrustIcon src={iconSrc} flip={flip} />
                  </div>
                ) : null}
                {item.label ? (
                 <p
                 className={cn(
                   "text-[24px] font-medium leading-[27.1px] tracking-normal text-center capitalize text-black",
                   poppins.className
                 )}
               >
                 {item.label}
               </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </Container>
    </FullContainer>
  );
}
