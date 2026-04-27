"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { Clock, FileText, Shield, Star, Wrench } from "lucide-react";
import { Rubik } from "next/font/google";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { cn } from "@/lib/utils";
import QuoteForm14 from "./QuoteForm/QuoteForm14";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["700"],
});

function BannerCtaIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={39}
      height={38}
      viewBox="0 0 39 38"
      fill="none"
      className={cn(
        "  h-[20px] lg:h-[38px]  w-[20] lg:w-[39px] shrink-0",
        className,
      )}
      aria-hidden
    >
      <path
        d="M15.9343 0H5.37446e-05V1.80952C-0.0121365 8.77558 2.04963 15.5955 5.93547 21.4428C8.79926 25.7545 12.5677 29.4264 16.9929 32.2167C22.994 36.0029 29.9935 38.0118 37.1429 37.9999H39V22.4743L26.5757 19.7835L23.1215 23.1492C19.9606 21.1703 17.2737 18.5517 15.2435 15.4714L18.6959 12.1057L15.9343 0Z"
        fill="#F29100"
      />
    </svg>
  );
}

const ICON_MAP = {
  Wrench,
  Clock,
  Star,
  Shield,
  FileText,
  Award: Star,
  Trophy: Star,
};

const BAR_GRADIENT =
  "linear-gradient(90deg, #675B57 0%, #7a6f6a 38%, #867b75 68%, #958983 100%)";
function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  if (
    filePath.startsWith("/") ||
    filePath.startsWith("http://") ||
    filePath.startsWith("https://")
  ) {
    return filePath;
  }
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Banner14({ content }) {
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
  const listItems =
    features?.length > 0
      ? features
      : Array.isArray(data?.list)
        ? data.list
            .map((item) => {
              if (typeof item === "string") return { text: item };
              if (item && typeof item === "object") return item;
              return null;
            })
            .filter(Boolean)
        : [];
  const phone =
    banner.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";
  const telHref = phone ? `tel:${phone}` : "#";
  const barTitle = data?.title?.trim() || data?.heading?.trim() || "";
  const subhead = data?.description?.trim() || data?.tagline?.trim() || "";

  return (
    <FullContainer
      id="banner"
      className="relative w-full overflow-hidden bg-neutral-900"
    >
      <div className="relative min-h-[640px] w-full lg:min-h-[720px]">
        <Image
          src={image}
          title={data?.imageTitle || data?.title || "Banner"}
          alt={data?.altImage || data?.tagline || "No Banner Found"}
          priority
          fill
          className="object-cover object-center"
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/35"
          aria-hidden
        />

        <Container className="relative z-10 mx-auto max-w-7xl px-4 pb-28 pt-14 sm:px-6 sm:pb-32 sm:pt-16 lg:px-8 lg:pb-36 lg:pt-20">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_min(420px,38vw)] lg:gap-12 xl:gap-16">
            <div className="max-w-2xl text-white lg:max-w-none">
              <h1 className="font-montserrat text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[2.75rem] lg:leading-[1.12]">
                {data?.heading || data?.title}
              </h1>

              <p className="mt-4 max-w-xl font-barlow text-base font-medium leading-relaxed text-white/90 sm:text-lg md:mt-5 md:text-xl">
                {data?.tagline}
              </p>

              <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2 sm:gap-y-3.5 md:mt-10">
                {listItems.slice(0, 6).map((feature, idx) => {
                  const key = feature?.icon;
                  const Icon = (key && ICON_MAP[key]) || FileText;
                  const text = feature?.text ?? feature?.title ?? "";
                  if (!text) return null;
                  return (
                    <li
                      key={`${text}-${idx}`}
                      className="flex items-start gap-3 font-barlow text-sm font-medium text-white/95 sm:text-[15px]"
                    >
                      <Icon
                        className="mt-0.5 h-5 w-5 shrink-0 text-amber-400"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span>{text}</span>
                    </li>
                  );
                })}
              </ul>

              {phone ? (
                <div className="mt-8 md:mt-10">
                  <Link
                    href={telHref}
                    className="inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3 shadow-lg transition hover:bg-neutral-100 sm:px-6 sm:py-3.5"
                  >
                    <BannerCtaIcon />
                    <span
                      className={`${rubik.className} text-[32px] font-bold not-italic leading-normal text-[#F29100]`}
                    >
                      {phone}
                    </span>
                  </Link>
                </div>
              ) : null}
            </div>

            <div className="w-full justify-self-center lg:justify-self-end">
              <QuoteForm14
                data={{}}
                form_head={form_head}
                showArrowInButton={false}
                surface="hero"
              />
            </div>
          </div>
        </Container>
      </div>

      <div
        className="relative z-5 w-full border-t border-black/10 px-4 py-4 sm:px-6 lg:px-8"
        style={{ background: BAR_GRADIENT }}
      >
        <Container className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row md:gap-6">
          {barTitle || subhead ? (
            <div className="text-center md:text-left">
              {barTitle ? (
                <p className="font-montserrat text-2xl lg:text-5xl font-bold leading-tight text-white">
                  {barTitle}
                </p>
              ) : null}
              {subhead ? (
                <p className="font-barlow   text-xl lg:text-2xl my-4 leading-snug text-white/95 ">
                  {subhead}
                </p>
              ) : null}
            </div>
          ) : null}
          {phone ? (
            <Link
              href={telHref}
              className="inline-flex shrink-0 items-center gap-2.5 rounded-xl bg-white px-5 py-2.5 shadow-md transition hover:bg-neutral-100"
            >
              <BannerCtaIcon />
              <span
                className={`${rubik.className}  text-[16px] lg:text-[32px] font-bold not-italic leading-normal text-[#F29100]`}
              >
                {phone}
              </span>
            </Link>
          ) : null}
        </Container>
      </div>
    </FullContainer>
  );
}
