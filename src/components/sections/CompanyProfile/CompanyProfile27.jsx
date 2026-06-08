"use client";

import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ACCENT_RED = "#BF1309";
const NAVY = "#001633";
const CTA_WIDTH = 258;
const CTA_HEIGHT = 73.33;
const CTA_PADDING = { top: 2.72, right: 1.36, bottom: 2.72, left: 1.36 };

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

function telHref(phone) {
  if (!phone || typeof phone !== "string") return "#";
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "#";
}

function HighlightCircle({ item, featured, index, className, style }) {
  const iconSrc = buildImageSrc(IMAGE_BASE, item?.icon);
  const label = item?.text ?? item?.title ?? "";
  const iconAlt = item?.icon_alt ?? item?.alt ?? label ?? `Highlight ${index + 1}`;
  const isFeatured = featured ?? item?.featured ?? index === 0;

  if (!label && !iconSrc) return null;

  return (
    <div
      className={cn(
        "flex h-[96px] w-[96px] shrink-0 flex-col items-center justify-center rounded-full px-1.5 text-center sm:h-[120px] sm:w-[120px] md:h-[240px] md:w-[240px] lg:h-[280px] lg:w-[280px]",
        isFeatured
          ? "border-2 border-white bg-transparent"
          : "bg-white/6 backdrop-blur-[1px]",
        className,
      )}
      style={style}
    >
      {iconSrc ? (
        <div className="relative mb-1 h-[38px] w-[30px] sm:mb-1.5 sm:h-[48px] sm:w-[38px] md:mb-2 md:h-[90px] md:w-[71px]">
          <Image
            src={iconSrc}
            alt={iconAlt}
            fill
            className="object-contain"
            sizes="71px"
          />
        </div>
      ) : null}
      {label ? (
        <p className="max-w-[72px] text-[9px] font-medium leading-tight text-white sm:max-w-[90px] sm:text-[10px] md:max-w-[120px] md:text-[22px]">
          {label}
        </p>
      ) : null}
    </div>
  );
}

export default function CompanyProfile27({ content }) {
  const data = content?.company_profile ?? {};

  const title = data.sub_title;
  const description = data.description;
  const button = data.button;
  const jobsHeading = data.jobs_heading ?? "What Our Job Entails:";

  const highlights = Array.isArray(data.highlights) ? data.highlights : [];
  const features =
    resolveRefArray(content, data, "features").length > 0
      ? resolveRefArray(content, data, "features")
      : Array.isArray(data.features)
        ? data.features
        : [];

  const backgroundImage = buildImageSrc(
    IMAGE_BASE,
    data.background_image ?? data.large_image ?? "hero/hero.webp",
  );
  const backgroundAlt =
    data.background_image_alt ?? data.large_image_alt ?? "Company profile background";

  const mainImage = buildImageSrc(IMAGE_BASE, data.large_image);
  const smallImage = buildImageSrc(IMAGE_BASE, data.small_image);

  const phone =
    content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const phoneDisplay = typeof phone === "string" ? phone.trim() : "";
  const callNowLabel =
    (typeof data.call_now_label === "string" && data.call_now_label.trim()) ||
    (typeof content?.service_benefits?.call_now_label === "string" &&
      content.service_benefits.call_now_label.trim()) ||
    "CALL NOW:";

  const showLegacySection = data.show_legacy_section !== false;
  const showHighlights = highlights.length > 0;
  const hasLegacyContent =
    title ||
    description ||
    features.length > 0 ||
    button?.text ||
    mainImage ||
    smallImage;

  if (!showHighlights && !(showLegacySection && hasLegacyContent)) return null;

  return (
    <FullContainer id="company_profile" className={poppins.className}>
      {showHighlights ? (
        <section className="relative w-full overflow-hidden mb-20 py-14 md:h-[644px] md:min-h-[644px] md:py-0">
          {backgroundImage ? (
            <div className="absolute inset-0">
              <Image
                src={backgroundImage}
                alt={backgroundAlt}
                fill
                className="scale-105 object-cover blur-[2px]"
                priority
                sizes="100vw"
              />
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(0, 22, 51, 0.88)" }}
                aria-hidden
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-[#001633]" aria-hidden />
          )}
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-between px-4 py-10 sm:px-6 md:px-10 md:py-12 lg:px-14">
            <div className="flex w-full flex-1 items-center justify-center">
              <div className="flex max-w-[1447px] flex-row items-center justify-center">
                {highlights.map((item, index) => (
                  <HighlightCircle
                    key={`highlight-${index}`}
                    item={item}
                    index={index}
                    className={index > 0 ? "-ml-4 sm:-ml-10  md:-ml-20 lg:-ml-2" : undefined}
                    style={{ zIndex: index + 1 }}
                  />
                ))}
              </div>
            </div>
            {phoneDisplay ? (
              <div className="relative z-20 mt-6 flex w-full shrink-0 justify-center md:-mt-6">
                <Link
                  href={telHref(phoneDisplay)}
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
                  aria-label={`Call ${phoneDisplay}`}
                >
                  <span className="text-[18px] font-meduim uppercase leading-none tracking-wide md:text-[21px]">
                    {callNowLabel}
                  </span>
                  <span className="mt-1 text-[22px] font-bold leading-none md:text-[27px]">
                    {phoneDisplay}
                  </span>
                </Link>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
    </FullContainer>
  );
}
