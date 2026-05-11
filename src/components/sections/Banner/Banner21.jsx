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
import QuoteForm21 from "./QuoteForm/QuoteForm21";

const ACCENT = "#F86503";

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
export default function Banner21({ content }) {
  const banner = content?.banner ?? {};
  const data = {
    title: banner.title,
    label: banner.label,
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
      content?.banner?.form_description ||
      "10% Off for Online Booking",
  };
  const features = resolveRefArray(content, banner, "features");
  const phone =
    banner.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";
  const strip = banner?.cta_strip ?? {};
  const stripSubheading =
    strip?.subheading ??
    "Extend Your Home With A Beautiful Cleaning";
  const stripHeading =
    strip?.heading ??
    "It's Easy! Call Now.";
  const stripPhoneLabel =
    strip?.phone_label ??
    "CALL NOW:";
  const stripPhone =
    strip?.phone ??
    banner.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "(123)-456-7890";
  return (
    <>
      <FullContainer className="relative -mt-[82px] w-full overflow-hidden pt-[calc(82px+2.5rem)] md:-mt-[112px] md:pt-[calc(112px+2.3rem)]">
        
        {/* BG COLOR */}
        <div
          className="pointer-events-none absolute inset-0 bg-[#6f8fbd]"
          aria-hidden
        />

        {/* BG IMAGE */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
        >
          <Image
            src={image}
            alt={data.altImage || banner.alt || "Hero"}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </div>
        {/* OVERLAY */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[62%] bg-linear-to-r from-[#234281CC] to-[#FFFFFF00]"
          aria-hidden
        />

        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0f2459]/30 via-transparent to-transparent"
          aria-hidden
        />
        {/* MAIN CONTENT */}
        <Container className="relative z-10 py-9 md:py-12 lg:py-14">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
            
            {/* LEFT SIDE */}
            <div className="min-w-0 pl-3 md:pl-4 lg:pl-5">

              {/* STARS */}
              <div className="mb-2 flex items-center gap-2 text-[#ffd12f]">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 fill-current stroke-current"
                  />
                ))}
              </div>

              {/* TITLE */}
              <h2 className="text-[30px] font-semibold leading-[1.05] text-white/90 md:text-[40px]">
                {data?.title}
              </h2>

              {/* HEADING */}
              <h1 className="mt-1 text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-[#F86503] md:text-5xl lg:text-[56px]">
                {data?.heading || data?.title}
              </h1>

              {/* TAGLINE */}
              {data?.tagline && (
                <h2
                  className="mt-3 text-xl font-bold uppercase md:text-2xl"
                  style={{ color: ACCENT }}
                >
                  {data.tagline}
                </h2>
              )}
              {/* DESCRIPTION */}
              <p className="mt-3 max-w-[580px] text-base font-medium leading-snug text-white/95 md:text-[18px]">
                {data?.description}
              </p>
              {/* FEATURES */}
              {features?.length > 0 && (
                <ul className="mt-5 grid grid-cols-1 gap-y-1">
                  {features.map((feature, idx) => {
                    const IconComponent =
                      ICON_MAP[feature.icon];
                    return (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-white"
                      >
                        <span
                          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#F86503] bg-[#ffffff10]"
                          aria-hidden
                        >
                          {IconComponent ? (
                            <IconComponent
                              className="h-3.5 w-3.5 text-[#F86503]"
                              strokeWidth={2.5}
                            />
                          ) : (
                            <Check
                              className="h-3.5 w-3.5 text-[#F86503]"
                              strokeWidth={3}
                            />
                          )}
                        </span>
                        <span className="text-[18px] font-semibold leading-snug md:text-[20px]">
                          {feature.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            {/* RIGHT FORM */}
            <div className="flex w-full min-w-0 justify-center lg:justify-end lg:pr-5">
              <QuoteForm21
                data={data}
                form_head={form_head}
                showArrowInButton={false}
              />
            </div>
          </div>
        </Container>
      </FullContainer>
      {/* CTA STRIP */}
      <div className="relative z-20 -mt-1 overflow-x-hidden bg-[#ffffff] pb-3">
        <div className="w-full min-w-0 px-3 sm:px-4 md:px-0">
          <div className="mx-auto w-full min-w-0 max-w-[1190px]">
            <div className="relative min-h-[118px] overflow-hidden bg-[#F86503] px-4 py-5 sm:min-h-[128px] sm:px-6 sm:py-6 md:min-h-[142px] md:px-8 md:py-7 lg:min-h-[150px] lg:px-10 lg:py-8 [clip-path:polygon(0_0,100%_0,96%_100%,4%_100%)]">
              <div className="flex w-full min-h-0 flex-col items-stretch justify-center gap-5 text-center sm:gap-6 md:flex-row md:items-center md:justify-between md:gap-8 md:text-left">
                {/* LEFT TEXT */}
                <div className="min-w-0 flex-1 md:pr-4">
                  <p className="text-sm font-medium leading-snug text-white sm:text-base md:text-lg lg:text-xl">
                    {stripSubheading}
                  </p>
                  <h3 className="mt-1.5 text-2xl font-bold leading-[1.08] tracking-tight text-white sm:text-3xl md:mt-2 md:ml-2 md:text-4xl md:leading-[1.06] lg:ml-4 lg:text-5xl xl:text-6xl">
                    {stripHeading}
                  </h3>
                </div>
                {/* PHONE BUTTON */}
                <div className="flex w-full shrink-0 justify-center md:w-auto md:justify-end">
                  <a
                    href={
                      stripPhone
                        ? `tel:${String(stripPhone).replace(
                            /[^\d+]/g,
                            ""
                          )}`
                        : "#"
                    }
                    className="inline-flex w-full max-w-[312px] min-h-[64px] flex-col items-center justify-center rounded-[12px] bg-[#ececec] px-4 py-3 text-[#222] sm:min-h-[72px] sm:px-5 md:min-h-[80px] lg:h-[87px] lg:min-h-0 lg:py-0"
                  >
                    <span className="text-xs font-medium uppercase leading-none tracking-wide sm:text-sm md:text-base">
                      {stripPhoneLabel}
                    </span>
                    <span className="mt-1 text-xl font-extrabold leading-none text-[#F86503] sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[39px]">
                      {stripPhone}
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div
              className="mx-auto box-border h-[10px] shrink-0 bg-[#082A51] opacity-100"
              style={{ width: "92%", maxWidth: 1094 }}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </>
  );
}