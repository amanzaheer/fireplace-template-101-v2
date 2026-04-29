"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import {
  Award,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  Phone,
  Shield,
  ShieldCheck,
  Star,
  ThumbsUp,
  Trophy,
} from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import { cn } from "@/lib/utils";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import QuoteForm11 from "./QuoteForm/QuoteForm11";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/** Orange used in reference: contact tile, feature tiles, headline band. */
const BRAND_ORANGE = "#f2a93b";

/** Left “border” shape (Figma) — more area visible on the content side. */
const LEFT_ACCENT = {
  width: 636,
  height: 535,
  top: 93,
  left: -511,
  borderRadius: 23,
  opacity: 1,
};

/** Same icon keys as Banner1 — CMS `feature.icon` names */
const FEATURE_ICON_MAP = {
  Clock,
  Star,
  Shield,
  Award,
  CheckCircle,
  Trophy,
  ThumbsUp,
  Phone,
  FileText,
  MessageSquare,
};

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Banner11({ content }) {
  const banner = content?.banner ?? {};
  const data = {
    title: banner.title,
    tagline: banner.tagline,
    description: banner.description,
    heading: banner.heading,
    list: banner.list,
    imageTitle: banner.imageTitle,
    altImage: banner.altImage,
  };

  const image =
    buildImageSrc(IMAGE_BASE, banner.file_name) ||
    buildImageSrc(IMAGE_BASE, "hero/hero.webp");

  const form_head = {
    title: content?.banner?.form_title || "Get Your Free Quote",
    sub_title:
      content?.banner?.form_description || "10% Off for Online Booking",
  };

  const features = resolveRefArray(content, banner, "features");
  /** Phone resolution matches Banner1 */
  const phone =
    banner.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";
  const phoneHref = phone ? `tel:${String(phone).replace(/\s/g, "")}` : "#";

  const primaryHeadline = String(data?.heading ?? data?.title ?? "").trim();
  const accentLine = String(data?.tagline ?? "").trim();
  /** Like Banner1: show tagline block whenever tagline exists (not only when ≠ headline) */
  const showTaglineBand = accentLine.length > 0;
  const contactLabel = String(
    banner.contact_label ?? banner.cta_label ?? "Contact",
  ).trim();
  return (
    <FullContainer
      id="banner"
      className="relative isolate z-0 w-full min-w-0 max-w-full overflow-x-clip overflow-y-visible bg-white px-0 self-stretch"
    >
      {/* Full-bleed row; x-clip: stops decorative left: -500px and form translate from causing page scroll */}
      <div
        className={cn(
          "relative w-full min-w-0 max-w-full self-stretch overflow-x-clip overflow-y-visible",
          poppins.className,
        )}
      >
        <div className="flex w-full min-w-0 max-w-full flex-col overflow-y-visible sm:overflow-x-clip lg:overflow-x-visible min-[1024px]:min-h-[min(640px,90vh)] lg:flex-row lg:items-stretch">
          {/* —— Left: clip + responsive padding; pr scales so text clears the straddled form on xl+ —— */}
          <div
            className={cn(
              "relative min-w-0 flex-1 overflow-x-clip overflow-y-visible bg-white font-sans",
              "pl-[max(1.25rem,env(safe-area-inset-left,0px))] pr-[max(1.25rem,env(safe-area-inset-right,0px))]",
              "py-8 sm:py-10 md:pl-10 md:pr-10 md:py-12",
              "lg:flex-none lg:w-[56%] lg:max-w-[56%] lg:shrink-0",
              "lg:pl-[max(1.25rem,calc((100%-1440px)/2+2.5rem))] lg:pr-8 lg:pt-10 lg:pb-12",
              "xl:pr-14 2xl:pr-20",
            )}
          >
            <div
              className="pointer-events-none absolute z-0 hidden lg:block bg-[#A7A7A7] ring-1 ring-inset ring-[#cfcfcf]"
              style={{
                width: "220px",
                height: "600px",
                top: "14px",
                left: "0px", // 👈 full touch left side
                borderTopLeftRadius: "0px",
                borderBottomLeftRadius: "0px",
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "20px",
                opacity: 0.5,
              }}
              aria-hidden
            />

            <div className={cn(
              "relative z-10 flex w-full min-w-0 max-w-[min(100%,40rem)] flex-col justify-center pl-0 pr-0",
              "min-[1024px]:min-h-[min(28rem,52vh)] min-[1280px]:min-h-[32rem]' '2xl:min-h-[34rem]",
              "lg:pl-20 lg:pr-0 xl:pl-24 2xl:pl-28",
            )}
            >
            {/* row 1 = icon + label; row 2 = phone — Poppins 16/400, contact label as per spec */}
            <div
              className={cn("mb-5 w-full text-[#111] sm:mb-6", poppins.className)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm shadow-sm"
                  style={{ backgroundColor: BRAND_ORANGE }}
                >
                  <Phone
                    className="h-5 w-5 text-[#111]"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                </div>
                <span className="text-base font-normal uppercase leading-[100%] tracking-normal text-black">
                  {contactLabel}
                </span>
              </div>
              {phone ? (
                <a
                  href={phoneHref}
                  className="mt-1.5 block w-full 'break-words' text-left text-xl font-extrabold leading-tight tracking-tight text-[#111] hover:opacity-80 sm:mt-2 sm:text-2xl sm:leading-none md:mt-2.5 md:text-3xl min-[1024px]:text-3xl min-[1280px]:text-4xl"
                >
                  {phone}
                </a>
              ) : null}
            </div>

            {primaryHeadline ? (
              <div className="space-y-2 sm:space-y-2.5">
                <h1 className="text-balance break-words' text-[clamp(1.5rem,1.1rem+2.2vw,2.4rem)] font-extrabold uppercase leading-[1.12] tracking-tight text-[#111] sm:leading-[1.1] min-[1024px]:text-[2.1rem] min-[1024px]:leading-[1.1] min-[1280px]:text-[2.4rem]">
                  {primaryHeadline}
                </h1>
                {showTaglineBand ? (
                  <p className="inline-block w-full max-w-full min-w-0 sm:w-fit">
                    <span
                      className="inline-block max-w-full px-3 py-2.5 text-left text-sm font-extrabold uppercase leading-tight 'break-words' text-[#111] shadow-sm sm:px-4 sm:py-2.5 sm:text-base sm:leading-tight md:px-5 md:py-3 md:text-lg md:leading-tight min-[1024px]:text-xl 2xl:text-2xl 2xl:leading-tight"
                      style={{ backgroundColor: BRAND_ORANGE }}
                    >
                      {accentLine}
                    </span>
                  </p>
                ) : null}
              </div>
            ) : null}

            {data?.description ? (
              <p className="mt-3 max-w-xl text-pretty text-[0.94rem] leading-relaxed text-[#333] '[overflow-wrap:break-word]' sm:mt-4 sm:text-[15px] sm:leading-[1.65] md:text-base">
                {data.description}
              </p>
            ) : null}

            {features?.length > 0 ? (
              <ul className="mt-5 grid max-w-xl grid-cols-1 gap-x-4 gap-y-3 sm:mt-6 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-3.5 md:gap-x-6">
                {features.map((feature, idx) => {
                  const FeatureIcon =
                    (feature?.icon && FEATURE_ICON_MAP[feature.icon]) ||
                    ShieldCheck;
                  return (
                    <li
                      key={idx}
                      className="flex min-w-0 items-start gap-2.5 text-[13px] font-medium text-[#111] '[overflow-wrap:break-word]' sm:text-[14px] sm:leading-snug min-[1280px]:text-[15px]"
                    >
                      <span
                        className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[3px] shadow-sm"
                        style={{ backgroundColor: BRAND_ORANGE }}
                      >
                        <FeatureIcon
                          className="h-[17px] w-[17px] shrink-0 text-[#111]"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                      </span>
                      <span className="leading-snug pt-0.5">
                        {feature.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </div>

        {/* —— Right: form must not be overflow-x-clip (it straddles seam via translate); higher z so card isn’t “cut” —— */}
        <div
          className={cn(
            "relative z-0 flex w-full min-h-0 min-w-0 max-w-full flex-1 flex-col overflow-x-visible overflow-y-visible pb-6",
            "lg:z-10 lg:flex-none lg:w-[44%] lg:max-w-[44%] lg:shrink-0 lg:min-w-0",
            "lg:min-h-[min(100vh-6rem,640px)] lg:pr-0 lg:pb-0",
          )}
        >
          <div
            className={cn(
              "order-1 mx-3 mt-3 min-h-0 sm:mx-4 sm:mt-4",
              "md:mx-6",
              "lg:order-1 lg:mx-0 lg:mb-0 lg:mt-8 lg:min-h-[min(25rem,48vh)] lg:h-[min(100%,37.5rem)] xl:min-h-[28rem] 2xl:min-h-[31.25rem]",
            )}
          >
            <div className="relative h-full w-full min-h-4 overflow-visible">
              <div
                className={cn(
                  "relative h-56 w-full min-h-0 overflow-hidden border border-[#b8b8b8] bg-[#d9d9d9] shadow-inner sm:h-64 md:h-80 lg:h-full",
                  "rounded-2xl",
                  "lg:rounded-l-2xl lg:rounded-r-none lg:border-r-0",
                )}
              >
                {image ? (
                  <div className="relative h-full w-full min-h-0">
                    <Image
                      src={image}
                      title={data?.imageTitle || data?.title || "Banner"}
                      alt={
                        data?.altImage ||
                        data?.tagline ||
                        "No Banner Found"
                      }
                      fill
                      priority
                      className="object-cover object-right"
                      sizes="(max-width: 640px) 100vw, (max-width: 1023px) 100vw, (max-width: 1280px) 46vw, 44vw"
                    />
                  </div>
                ) : null}
              </div>

              {/* Below image on sm; on lg, anchored into image a bit (left-12) so it doesn’t sit on the orange block */}
              <div
                className={cn(
                  "pointer-events-auto relative z-10 mx-auto mt-6 w-full max-w-[min(100%,332px)] px-2 sm:px-0",
                  "lg:absolute lg:top-1/2 lg:z-20 lg:mt-0 lg:max-w-[332px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:px-0",
                  "lg:left-4 min-[1100px]:left-6 xl:left-8 2xl:left-10 min-[1600px]:left-12",
                )}
              >
                <QuoteForm11
                  data={data}
                  phone={phone}
                  form_head={form_head}
                  showArrowInButton={false}
                  variant="banner11"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </FullContainer >
  );
}
