"use client";

import Image from "next/image";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { ShieldCheck, Phone } from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { cn } from "@/lib/utils";
import QuoteForm19 from "./QuoteForm/QuoteForm19";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function GoogleWordmark() {
  return (
    <div className="flex flex-wrap items-baseline gap-0.5 font-semibold tracking-tight">
      <span className="text-[26px] text-[#4285F4]">G</span>
      <span className="text-[26px] text-[#EA4335]">o</span>
      <span className="text-[26px] text-[#FBBC05]">o</span>
      <span className="text-[26px] text-[#4285F4]">g</span>
      <span className="text-[26px] text-[#34A853]">l</span>
      <span className="text-[26px] text-[#EA4335]">e</span>
    </div>
  );
}

export default function Banner19({ content }) {
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
    title: content?.banner?.form_title,
    sub_title: content?.banner?.form_description,
  };
  const features = resolveRefArray(content, banner, "features");
  const phone =
    banner.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";
  const telHref = phone ? `tel:${String(phone).replace(/\s/g, "")}` : "#";

  const ratingLine =
    typeof banner.rating_line === "string" ? banner.rating_line.trim() : "";
  const contactSubheading =
    typeof banner.contact_subheading === "string"
      ? banner.contact_subheading.trim()
      : "";
  const needHelpLabel =
    typeof banner.need_help_label === "string"
      ? banner.need_help_label.trim()
      : "Need Help?";
  const googleReviewsTitle =
    typeof banner.google_reviews_title === "string"
      ? banner.google_reviews_title.trim()
      : "Verified Customer Reviews";

  const mainHeadline = (data?.heading || data?.title || "").trim();

  return (
    <FullContainer
      id="banner"
      className="relative w-full min-h-[520px] bg-sky-100 md:min-h-[500px]"
    >
      <div className="absolute inset-0 h-full">
        <Image
          src={image}
          title={data?.imageTitle || data?.title || "Banner"}
          alt={data?.altImage || data?.tagline || "Banner"}
          priority
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0" aria-hidden />
      </div>

      <Container className="relative z-10 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(300px,420px)] lg:items-start lg:gap-12">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {mainHeadline ? (
              <h1
                className={cn(
                  "max-w-xl text-[36px] font-semibold leading-[1.1] text-[#cc3333] lg:max-w-none lg:text-[50px]",
                  "font-['Berlin_Sans_FB_Demi','Berlin_Sans_FB',sans-serif]"
                )}
              >
                {mainHeadline}
              </h1>
            ) : null}

            {ratingLine ? (
              <p className="mt-3 text-lg font-semibold text-[#094370] md:text-[32px] font-sans">
                {ratingLine}
              </p>
            ) : null}

            {contactSubheading ? (
              <p className="mt-4 max-w-xl text-lg font-bold text-black md:text-[24px] font-sans">
                {contactSubheading}
              </p>
            ) : null}

            {features?.length > 0 ? (
              <ul className="mt-4 max-w-xl space-y-2 text-left text-base font-medium text-black md:text-[17px]">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <ShieldCheck
                      className="mt-0.5 h-6 w-6 shrink-0 text-[#f0520e]"
                      strokeWidth={2.4}
                      aria-hidden
                    />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-8 inline-flex flex-col items-center rounded-[21px] border h-[137px] w-[208px] bg-white px-6 py-4 text-center shadow-md lg:items-start lg:text-left">
              <GoogleWordmark />
              <p className="mt-1 text-sm font-normal text-[#316efc] md:text-[13px] font-['Roboto',sans-serif]">
                {googleReviewsTitle}
              </p>
              <div
                className="mt-2 flex justify-center gap-0.5 text-amber-400 lg:justify-start"
                aria-hidden
              >
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} className="text-xl leading-none">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="z-10 mb-0 flex w-full flex-col gap-4 lg:mt-24 lg:mb-[-130px] lg:max-w-[420px] lg:justify-self-end">
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <a
                href={telHref}
                className="flex h-18 w-18 shrink-0 items-center justify-center rounded-full bg-[#cc3333] text-white shadow-md ring-2 ring-white/80"
                aria-label="Call us"
              >
                <Phone className="h-6 w-6" strokeWidth={2.5} />
              </a>
              <div className="text-left leading-tight">
                <div className="text-base font-regular text-black md:text-[20px] font-['Roboto',sans-serif]">
                  {needHelpLabel}
                </div>
                {phone ? (
                  <a
                    href={telHref}
                    className="text-lg font-semibold text-[#cc3333] md:text-[24px] font-['Roboto',sans-serif]"
                  >
                    {phone}
                  </a>
                ) : null}
              </div>
            </div>

            <QuoteForm19
              form_head={form_head}
              showArrowInButton={false}
            />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
