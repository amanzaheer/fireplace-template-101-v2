"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Poppins } from "next/font/google";
import QuoteButton from "@/components/common/QuoteButton";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal"],
});

function str(v) {
  if (v == null) return "";
  return String(v).trim();
}

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

/** Shield + checkmark — same for every card (design SVG). */
function FeatureShieldIcon({ className }) {
  return (
    <svg
      className={className}
      width={41}
      height={40}
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="40.5752" height="39.4575" rx="6.70665" fill="#234281" />
      <path
        d="M29.8444 18.667C29.8444 24.5604 25.7668 30.0716 20.2874 31.4096C14.8081 30.0716 10.7305 24.5604 10.7305 18.667V12.2956L20.2874 8.0481L29.8444 12.2956V18.667ZM20.2874 29.2858C24.2695 28.2239 27.7207 23.4879 27.7207 18.9006V13.6761L20.2874 10.363L12.8542 13.6761V18.9006C12.8542 23.4879 16.3054 28.2239 20.2874 29.2858ZM18.1637 25.0383L13.9161 20.7907L15.4134 19.2935L18.1637 22.0331L25.1615 15.0353L26.6588 16.5432"
        fill="white"
      />
    </svg>
  );
}

/**
 * Same content wiring as WhyChoose1: `content.why_choose`, `resolveRefArray(…, "features")`,
 * `block.file_name` image URL, `phone` for actions.
 */
export default function WhyChoose16({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.why_choose ?? {};
  const features = resolveRefArray(content, block, "features");
  const heading = block.heading ?? "Why Choose Us";
  const sub = str(block.description ?? block.subtitle);
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);

  if (features.length === 0) return null;

  return (
    <FullContainer
      id="whychooseus"
      className="mt-4 bg-neutral-50 py-10 md:py-14 lg:py-16"
    >
      <Container className="max-w-6xl px-4 sm:px-6">
        <h2
          className={cn(
            "mb-4 text-center text-[36px] font-medium leading-normal tracking-normal `text-[#000]` not-italic md:mb-5",
            poppins.className,
          )}
        >
          {heading}
        </h2>
        {sub ? (
          <p className="mx-auto mb-10 max-w-3xl text-center text-base font-normal leading-relaxed text-neutral-900 md:mb-12 md:text-lg">
            {sub}
          </p>
        ) : (
          <div className="mb-10 md:mb-12" aria-hidden />
        )}

        <ul className="mx-auto grid list-none grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {features.map((feature, idx) => {
            const text =
              typeof feature === "object"
                ? str(feature?.text ?? feature?.title)
                : typeof feature === "string"
                  ? str(feature)
                  : "";
            const key =
              typeof feature === "object" && feature?.id != null
                ? String(feature.id)
                : `${idx}-${text.slice(0, 32)}`;

            return (
              <li key={key} className="flex shrink-0 justify-center">
                <article
                  className={cn(
                    /* Fixed card: 350.348px × 204px (Figma) */
                    "box-border flex direction-column: `flex` h-[204px] min-h-[204px] max-h-[204px] w-[350.348px] min-w-[350.348px] max-w-[350.348px] shrink-0 flex-col items-center justify-center overflow-hidden bg-[#FFF] px-[13.413px]",
                    "shadow-[0_4.435px_16.63px_0_rgba(0,0,0,0.08)]",
                  )}
                >
                  {/* Icon then text, 13.413px gap — matches reference vertical stack */}
                  <div className="flex min-h-0 w-full max-w-[300px] flex-col items-center justify-center gap-[13.413px] text-center">
                    <div className="flex shrink-0 justify-center">
                      <FeatureShieldIcon className="h-10 w-[41px] shrink-0" />
                    </div>
                    <p
                      className={cn(
                        "w-full max-w-[268px] text-pretty text-center text-[21.461px] font-normal leading-normal tracking-normal `text-[#000]` not-italic",
                        "whitespace-pre-line `[overflow-wrap:anywhere]`",
                        poppins.className,
                      )}
                    >
                      {text}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        <div className="mx-auto mt-10 flex w-full max-w-md flex-col gap-4 sm:mt-12 sm:max-w-none sm:flex-row sm:justify-center">
          {phone ? (
            <Link href={`tel:${phone}`}>
              <button className="flex w-full min-w-[205px] items-center justify-center gap-2 rounded-none bg-[#F5521B] px-6 py-3 text-lg font-semibold text-white shadow transition-all hover:bg-[#e04d19] sm:w-auto">
                <Phone className="h-5 w-5" />
                {phone}
              </button>
            </Link>
          ) : null}
          {/* <QuoteButton
            phone={phone}
            className="w-full max-w-none rounded-xl bg-[#F5521B]! px-6 py-3 hover:bg-[#e04d19] sm:w-[217.278px]"
          /> */}
        </div>

        {/* Why choose image: same as WhyChoose1 — wrapped in `false &&` so it stays in code but does not render; set to `true` to show. */}
        {false &&
          (imageSrc ? (
            <div className="mx-auto mt-10 w-full max-w-3xl">
              <div className="relative mt-6 h-[250px] w-full overflow-hidden rounded-lg bg-gray-200 sm:h-[280px] md:h-[320px]">
                <Image
                  src={imageSrc}
                  alt={heading}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 58vw"
                  loading="lazy"
                />
              </div>
            </div>
          ) : (
            <div className="mx-auto mt-10 w-full max-w-3xl">
              <div className="relative mt-6 flex h-[250px] w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200 sm:h-[280px] md:h-[320px]">
                <span className="font-medium text-gray-400">{heading}</span>
              </div>
            </div>
          ))}
      </Container>
    </FullContainer>
  );
}
