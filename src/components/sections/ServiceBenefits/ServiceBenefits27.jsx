"use client";

import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ACCENT_RED = "#BF1309";
const NAVY_BADGE = "#082A51";
const BAR_W = "w-7 md:w-8";
const BAR_H = "h-7 md:h-8";
const IMAGE_W = "w-full max-w-[544px]";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function benefitTitle(item) {
  if (typeof item === "object" && item !== null) return item.title ?? "";
  if (typeof item === "string") return item;
  return "";
}

function benefitDescription(item) {
  if (typeof item === "object" && item !== null) return item.description ?? "";
  return "";
}

export default function ServiceBenefits27({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.service_benefits ?? {};
  const heading = block.heading ?? "";
  const sectionTitle = block.title ?? "";
  const intro = block.description ?? "";
  const list = Array.isArray(block.list) ? block.list : [];
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);
  const imageAlt = block.image_alt ?? "Service Benefits";
  const shieldIcon = block.shield_icon ?? "/st-icons/Temp12/shield.png";
  const shieldIconAlt = block.shield_icon_alt ?? "Check";
  const callNowLabel = block.call_now_label ?? "CALL NOW:";

  if (list.length === 0) return null;

  const telHref = phone ? `tel:${String(phone).replace(/[^\d+]/g, "")}` : "#";

  return (
    <FullContainer
      id="service_benefits"
      className={`bg-[#e8e8e8] py-10 md:py-12 lg:py-14 ${poppins.className}`}
    >
      <Container className="px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-x-10 xl:gap-x-12">
          {/* Left: image + red L accent */}
          <div className="flex w-full justify-center lg:justify-start">
            <div className={`relative ${IMAGE_W} shrink-0`}>
              <div
                className={`pointer-events-none absolute bottom-5 left-0    top-8 z-0 ${BAR_W} md:bottom-8`}
                style={{ backgroundColor: ACCENT_RED }}
                aria-hidden
              />
              <div
                className={`pointer-events-none absolute bottom-0 left-0 z-0 ${BAR_H} w-full`}
                style={{ backgroundColor: ACCENT_RED }}
                aria-hidden
              />
              <div className="relative z-10 mb-7 ml-7 aspect-544/488 w-full overflow-hidden bg-neutral-300 md:mb-8 md:ml-8">
                {imageSrc ? (
                  <Image
                    title={imageAlt}
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 544px"
                  />
                ) : (
                  <div className="absolute inset-0 bg-neutral-300" />
                )}
              </div>
            </div>
          </div>

          {/* Right: copy, badges, call CTA */}
          <div className="flex flex-col items-start text-left">
            {heading ? (
              <p className="text-sm font-medium text-black/85 md:text-base">
                {heading}
              </p>
            ) : null}

            {sectionTitle ? (
              <h2
                className={`max-w-xl text-[26px] font-bold leading-[1.12] text-black sm:text-[32px] md:text-[38px] lg:text-[40px] ${
                  heading ? "mt-1" : ""
                }`}
              >
                {sectionTitle}
              </h2>
            ) : null}

            {intro ? (
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-black md:text-[15px]">
                {intro}
              </p>
            ) : null}

            <div className="mt-5 grid w-full max-w-xl grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-2.5 sm:gap-y-2">
              {list.map((benefit, index) => {
                const title = benefitTitle(benefit);
                const description = benefitDescription(benefit);
                if (!title) return null;
                return (
                  <div
                    key={index}
                    className="inline-flex min-h-[40px] w-full items-center gap-2 rounded-sm px-3 py-2 sm:min-h-[42px] sm:px-3.5 sm:py-2.5"
                    style={{ backgroundColor: NAVY_BADGE }}
                    title={description || undefined}
                  >
                    <svg
                      width="29"
                      height="29"
                      viewBox="0 0 29 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25.375 13.2916C25.375 19.9978 20.735 26.2691 14.5 27.7916C8.265 26.2691 3.625 19.9978 3.625 13.2916V6.04159L14.5 1.20825L25.375 6.04159V13.2916ZM14.5 25.3749C19.0313 24.1666 22.9583 18.7774 22.9583 13.5574V7.61242L14.5 3.84242L6.04167 7.61242V13.5574C6.04167 18.7774 9.96875 24.1666 14.5 25.3749ZM12.0833 20.5416L7.25 15.7083L8.95375 14.0045L12.0833 17.122L20.0463 9.15909L21.75 10.8749"
                        fill="white"
                      />
                    </svg>

                    <span className="text-[13px] font-medium leading-snug text-white sm:text-sm">
                      {title}
                    </span>
                    {description ? (
                      <span className="sr-only">{description}</span>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {phone ? (
              <a
                href={telHref}
                className="mt-6 inline-flex w-full max-w-[300px] flex-col items-center px-6 py-4 text-center text-white transition-opacity hover:opacity-95 sm:min-w-[260px] md:px-8 md:py-5"
                style={{ backgroundColor: ACCENT_RED }}
              >
                <span className="text-sm font-semibold uppercase tracking-wide md:text-base">
                  {callNowLabel}
                </span>
                <span className="mt-1 text-xl font-bold leading-none sm:text-2xl md:text-[30px]">
                  {phone}
                </span>
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
