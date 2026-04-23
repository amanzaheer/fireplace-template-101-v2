"use client";

import Image from "next/image";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import {
  Check,
  CheckCircle,
  Clock,
  Star,
  Shield,
  Award,
  Trophy,
  ThumbsUp,
  Phone,
  FileText,
  MessageSquare,
} from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { Poppins } from "next/font/google";
import QuoteForm13 from "./QuoteForm/QuoteForm13";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const ACCENT = "#F0A535";
const CALL_ICON_SRC = "/st-icons/Temp13/call2.png";
/** Matches Navbar13 phone chip (empty = no fill, same as navbar). */
const PHONE_ICON_RING_BG = "";

const ICON_MAP = {
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

function renderHeadingWithAccent(headingText) {
  const text = (headingText || "").trim();
  if (!text) return null;

  const accentWords = [
    "chimney",
    "chimneys",
    "service",
    "services",
    "repair",
    "cleaning",
    "inspection",
  ];
  const accentRegex =
    /\b(chimney|chimneys|service|services|repair|cleaning|inspection)\b/gi;
  const parts = text.split(accentRegex);

  return parts.map((part, idx) =>
    accentWords.includes(part.toLowerCase()) ? (
      <span key={`accent-${idx}`} className="text-[#CCDE1F]">
        {part}
      </span>
    ) : (
      <span key={`normal-${idx}`} className="text-white">
        {part}
      </span>
    ),
  );
}

export default function Banner13({ content }) {
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

  const phone =
    banner.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";

  const phoneLink = phone ? `tel:${phone}` : "#";

  return (
    <FullContainer className="relative -mt-[82px] w-full overflow-hidden pt-[calc(82px+2.5rem)] md:-mt-[112px] md:pt-[calc(112px+3.5rem)]">
      <Image
        src={image}
        alt={data.altImage || banner.alt || "Hero"}
        fill
        className="absolute inset-0 object-cover object-center"
        sizes="100vw"
        priority
      />
      <div
        className="pointer-events-none absolute inset-0  bg-black/70"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-t from-[#2F1458]/90 via-[#3A1A70]/55 to-transparent"
        aria-hidden
      />
      <Container className="relative z-10 pt-2 pb-12 md:pt-0  md:pb-12 lg:pt-5 lg:pb-14 ">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-2 md:gap-4">
          <div className="min-w-0 pl-3 md:pl-5 lg:pl-8">
            <div className="mb-4 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2.5 sm:gap-x-5 sm:gap-y-3 md:gap-x-8 lg:gap-x-10">
              <div className="inline-flex w-fit max-w-full shrink-0 items-center gap-2 rounded-full border border-white/80 px-3 py-1.5 font-poppins text-xs font-medium uppercase tracking-widest text-white sm:gap-3 sm:px-4 sm:py-2 sm:text-sm md:text-[20px]">
                <div className="flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-full bg-[#ffc117] shadow-sm" />
                <span className="font-poppins">Let’s Call Connect</span>
              </div>

              <a
                href={phoneLink}
                className="flex min-w-0 max-w-full items-center gap-1.5 sm:shrink-0"
                aria-label={phone ? `Call ${phone}` : "Phone"}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-9 sm:w-9"
                  style={{ backgroundColor: PHONE_ICON_RING_BG }}
                >
                  <Image
                    src={CALL_ICON_SRC}
                    alt=""
                    width={20}
                    height={20}
                    className="h-8 w-12 object-contain sm:h-[40px] sm:w-[60px]"
                    aria-hidden
                  />
                </span>
                <div
                  className={`${poppins.className} flex min-h-[26px] min-w-0 max-w-[min(100%,14rem)] flex-col justify-end text-left text-[#FFFFFF] sm:max-w-[11.2rem] sm:text-center md:max-w-none md:w-[179px] md:shrink-0`}
                  style={{
                    fontSize: "clamp(0.9375rem, 3.5vw, 1.25rem)",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                  }}
                >
                  <span className="block min-w-0 whitespace-normal wrap-break-word sm:whitespace-nowrap sm:truncate mr-2 md:mr-6 sm:text-center">
                    {phone}
                  </span>
                </div>
              </a>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold uppercase leading-[1.12] tracking-tight md:text-5xl lg:text-[52px]">
              {renderHeadingWithAccent(data?.heading || data?.title)}
            </h1>

            <div className="mt-5 flex w-full justify-start">
              <QuoteForm13
                data={data}
                form_head={form_head}
                showArrowInButton={false}
              />
            </div>

            {/* {data?.tagline && (
              <h2
                className="mt-3 text-xl font-bold uppercase md:text-2xl"
                style={{ color: ACCENT }}
              >
                {data.tagline}
              </h2>
            )} */}

            <p className="mt-4 max-w-[620px] text-base leading-relaxed text-white/90 md:text-lg">
              {data?.description}
            </p>

            {/* {features?.length > 0 && (
              <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {features.map((feature, idx) => {
                  const IconComponent = ICON_MAP[feature.icon];
                  return (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-white md:text-[15px]"
                    >
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-white/85 bg-white/10"
                        aria-hidden
                      >
                        {IconComponent ? (
                          <IconComponent
                            className="h-3 w-3 text-white"
                            strokeWidth={2.5}
                          />
                        ) : (
                          <Check
                            className="h-3 w-3 text-white"
                            strokeWidth={3}
                          />
                        )}
                      </span>
                      <span className="font-medium leading-snug">
                        {feature.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )} */}
          </div>

          <div className="mt-2 flex w-full min-w-0 flex-col items-start justify-center gap-4 md:mt-3 lg:items-end lg:justify-end">
            <div className="relative h-[526px] w-full max-w-[554px] overflow-hidden rounded-[24px] border-[3px] border-[#D4ECFF] shadow-[0_24px_55px_rgba(24,10,49,0.45)] md:h-[526px]">
              <Image
                src={image}
                alt={data.altImage || banner.alt || "Hero"}
                fill
                className="object-cover object-center"
                sizes="(max-width: 554px) 100vw, (max-width: 1200px) 50vw, 560px"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent"
                aria-hidden
              />
            </div>

            <div className="flex w-full max-w-[554px] flex-wrap items-center justify-center gap-3 px-1">
              <a
                href={phoneLink}
                className="inline-flex min-h-[44px] items-center justify-center  rounded-full border border-white/80 px-7 text-[16px] font-medium font-poppins text-white transition-colors hover:bg-white/10"
              >
                Connect Call
              </a>

              <a
                href={phoneLink}
                className="inline-flex min-h-[52px] items-center gap-2.5 text-white"
                aria-label={phone ? `Call ${phone}` : "Need help"}
              >
                <span className="inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#CCDE1F]">
                  <Image
                    src={"/st-icons/Temp13/call3.png"}
                    alt=""
                    width={24}
                    height={24}
                    className="h-[24px] w-[24px] object-contain"
                    aria-hidden
                  />
                </span>
                <span className="relative h-[46px] w-[46px] shrink-0 overflow-hidden rounded-full border -ml-4 z-20 ">
                  <Image
                    src={"/st-icons/Temp13/profile.png"}
                    alt={data.altImage || banner.alt || "Support"}
                    fill
                    className="object-cover object-[60%_15%]"
                    sizes="46px"
                  />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[15px] font-medium font-poppins">Need Help?</span>
                  <span className="text-[20px] font-bold leading-none font-poppin">
                    {phone}
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
        
      </Container>
    </FullContainer>
  );
}
