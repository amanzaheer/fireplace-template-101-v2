"use client";

import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const NAVY_BADGE = "#001633";
const ACCENT_RED = "#BF1309";
const SECTION_WIDTH = 544;
const SECTION_GAP = 17;
const CTA_WIDTH = 258;
const CTA_HEIGHT = 73.33;
const CTA_PADDING = { top: 2.72, right: 1.36, bottom: 2.72, left: 1.36 };

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  if (segment.startsWith("http") || segment.startsWith("/st-icons")) return segment;
  return `${basePath}/${segment}`;
}

function resolveShieldIcon(path) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("/")) return path;
  return path;
}

function featureText(feature) {
  if (typeof feature === "object" && feature !== null) return feature.text ?? "";
  if (typeof feature === "string") return feature;
  return "";
}

function WhyChoose27Content({ content, embedded = false }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.why_choose ?? {};
  const features = resolveRefArray(content, block, "features");
  const heading = block.heading ?? "";
  const title = block.title ?? block.heading ?? "";
  const description = block.description ?? "";
  const imagePath =
    block.main_image ?? block.file_name ?? "why-us/why-us.avif";
  const imageSrc = buildImageSrc(IMAGE_BASE, imagePath);
  const imageAlt = block.image_alt ?? heading ?? "Why choose us";
  const imageHeight = block.image_height ?? 280;
  const shieldIcon = resolveShieldIcon(
    block.shield_icon ??
      content?.service_benefits?.shield_icon ??
      "/st-icons/Temp12/shield.png",
  );
  const shieldAlt =
    block.shield_icon_alt ??
    content?.service_benefits?.shield_icon_alt ??
    "Check";
  const callNowLabel =
    block.call_now_label ??
    content?.service_benefits?.call_now_label ??
    "CALL NOW:";
  const telHref = phone ? `tel:${String(phone).replace(/[^\d+]/g, "")}` : "#";

  if (!title && !description && features.length === 0 && !imageSrc) return null;

  const titleLines = String(title).split("\n").filter(Boolean);

  return (
    <div
      className={`flex h-auto w-full max-w-full flex-col bg-white ${poppins.className} ${
        embedded ? "lg:w-[544px] lg:max-w-[544px]" : "mx-auto lg:w-[544px] lg:max-w-[544px]"
      }`}
      style={{ gap: SECTION_GAP }}
    >
      {imageSrc ? (
        <div
          className="relative w-full shrink-0 overflow-hidden bg-neutral-200"
          style={{ height: imageHeight }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes={`${SECTION_WIDTH}px`}
            priority={false}
          />
        </div>
      ) : null}

      {titleLines.length > 0 ? (
        <h2 className="text-[42px] font-bold  font-poppins leading-[1.2] text-black">
          {titleLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>
      ) : null}

      {description ? (
        <p className="text-[14px] font-regular font-poppins text-black">{description}</p>
      ) : null}

      {features.length > 0 ? (
        <div
          className="grid w-full grid-cols-2"
          style={{ gap: SECTION_GAP }}
        >
          {features.map((feature, idx) => {
            const text = featureText(feature);
            if (!text) return null;
            return (
              <div
                key={idx}
                className="inline-flex min-h-[40px] items-center gap-2 px-3 py-2"
                style={{ backgroundColor: NAVY_BADGE }}
              >
                {shieldIcon ? (
                 <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M25.375 13.2916C25.375 19.9978 20.735 26.2691 14.5 27.7916C8.265 26.2691 3.625 19.9978 3.625 13.2916V6.04159L14.5 1.20825L25.375 6.04159V13.2916ZM14.5 25.3749C19.0313 24.1666 22.9583 18.7774 22.9583 13.5574V7.61242L14.5 3.84242L6.04167 7.61242V13.5574C6.04167 18.7774 9.96875 24.1666 14.5 25.3749ZM12.0833 20.5416L7.25 15.7083L8.95375 14.0045L12.0833 17.122L20.0463 9.15909L21.75 10.8749" fill="white"/>
                 </svg>
                 
                ) : null}
                <span className="text-[16px] font-regular font-poppins leading-snug text-white">
                  {text}
                </span>
              </div>
            );
          })}
        </div>
      ) : null}

      {phone ? (
        <a
          href={telHref}
          className="inline-flex shrink-0 flex-col items-center justify-center text-center text-white transition-opacity hover:opacity-95"
          style={{
            backgroundColor: ACCENT_RED,
            width: CTA_WIDTH,
            height: CTA_HEIGHT,
            paddingTop: CTA_PADDING.top,
            paddingRight: CTA_PADDING.right,
            paddingBottom: CTA_PADDING.bottom,
            paddingLeft: CTA_PADDING.left,
          }}
        >
          <span className="text-[21px] font-medium uppercase leading-none tracking-wide">
            {callNowLabel}
          </span>
          <span className="mt-1 text-[27px] font-bold leading-none">{phone}</span>
        </a>
      ) : null}
    </div>
  );
}
export default function WhyChoose27({ content, embedded = false }) {
  const block = content?.why_choose ?? {};
  const features = resolveRefArray(content, block, "features");
  const hasContent =
    block.title ||
    block.heading ||
    block.description ||
    features.length > 0 ||
    block.main_image ||
    block.file_name;

  if (!hasContent) return null;

  if (embedded) {
    return (
      <div className="flex h-full min-h-full w-full items-start justify-center px-4 py-10 lg:justify-start lg:px-8 lg:py-12 xl:px-10">
        <WhyChoose27Content content={content} embedded />
      </div>
    );
  }
  return (
    <FullContainer id="whychooseus" className="bg-white py-8 md:py-12">
      <Container className="flex justify-center px-4">
        <WhyChoose27Content content={content} />
      </Container>
    </FullContainer>
  );
}
