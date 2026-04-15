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
      className={cn("h-[38px] w-[39px] shrink-0", className)}
      aria-hidden
    >
      <path
        d="M15.9343 0H5.37446e-05V1.80952C-0.0121365 8.77558 2.04963 15.5955 5.93547 21.4428C8.79926 25.7545 12.5677 29.4264 16.9929 32.2167C22.994 36.0029 29.9935 38.0118 37.1429 37.9999H39V22.4743L26.5757 19.7835L23.1215 23.1492C19.9606 21.1703 17.2737 18.5517 15.2435 15.4714L18.6959 12.1057L15.9343 0Z"
        fill="#F29100"
      />
    </svg>
  );
}

const QuoteForm14 = dynamic(() => import("./QuoteForm/QuoteForm14"), {
  loading: () => (
    <div className="h-[420px] w-full max-w-[420px] animate-pulse rounded-2xl bg-white/80 shadow-xl lg:min-w-[360px]" />
  ),
  ssr: false,
});

const ICON_MAP = {
  Wrench,
  Clock,
  Star,
  Shield,
  FileText,
  Award: Star,
  Trophy: Star,
};

const DEFAULT_HERO_FEATURES = [
  { icon: "Wrench", text: "Fire Place & Repair" },
  { icon: "Clock", text: "Same Day Service" },
  { icon: "Star", text: "5 Star Rated On Google" },
  { icon: "Star", text: "10+ Years Of Experience" },
  { icon: "Shield", text: "Licensed And Insured" },
];

const DEFAULT_HEADLINE = "Top-Rated Fireplace Repair & Maintenance Experts";
const DEFAULT_SUBHEAD =
  "Trusted Professionals in Fireplace Installation, Cleaning & Repair";

/** Left se right tak linear sweep — left thoda gehra, seedha right ki taraf khulta hai */
const BAR_GRADIENT =
  "linear-gradient(90deg, #675B57 0%, #7a6f6a 38%, #867b75 68%, #958983 100%)";
function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Banner14({ content }) {
  const banner = content?.banner ?? {};
  const headline = (banner.heading || banner.title || DEFAULT_HEADLINE).trim();
  const subhead = (banner.tagline || banner.description || DEFAULT_SUBHEAD).trim();
  const imageSrc =
    buildImageSrc(IMAGE_BASE, banner.file_name) ||
    buildImageSrc(IMAGE_BASE, "hero/hero.webp");
  const useUnoptimized =
    imageSrc.startsWith("/api/") ||
    imageSrc.startsWith("http://") ||
    imageSrc.startsWith("https://");

  const form_head = {
    title: banner.form_title || "Get Your Fireplace Fixed Today",
    sub_title: banner.form_description || "Fast & Reliable Service",
  };

  let features = resolveRefArray(content, banner, "features");
  if (!Array.isArray(features) || features.length < 4) {
    features = DEFAULT_HERO_FEATURES;
  }

  const phone =
    banner.cta_phone?.trim() ||
    content?.contact_info?.phone?.trim() ||
    content?.navbar?.phone?.trim() ||
    "(800) 555-1212";
  const tel = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <FullContainer id="banner" className="relative w-full overflow-hidden bg-neutral-900">
      <div className="relative min-h-[640px] w-full lg:min-h-[720px]">
        <Image
          src={imageSrc}
          alt={headline || "Hero"}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          unoptimized={useUnoptimized}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/35" aria-hidden />

        <Container className="relative z-10 mx-auto max-w-7xl px-4 pb-28 pt-14 sm:px-6 sm:pb-32 sm:pt-16 lg:px-8 lg:pb-36 lg:pt-20">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_min(420px,38vw)] lg:gap-12 xl:gap-16">
            <div className="max-w-2xl text-white lg:max-w-none">
              <h1 className="font-montserrat text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[2.75rem] lg:leading-[1.12]">
                <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
                  {(() => {
                    const words = headline.trim().split(/\s+/).filter(Boolean);
                    const lead = words.slice(0, 2).join(" ");
                    const tail = words.slice(2).join(" ");
                    return (
                      <>
                        <span>{lead || headline}</span>
                        <Star
                          className="inline-block h-7 w-7 shrink-0 fill-amber-400 text-amber-400 sm:h-8 sm:w-8 md:h-9 md:w-9"
                          aria-hidden
                        />
                        {tail ? <span>{tail}</span> : null}
                      </>
                    );
                  })()}
                </span>
              </h1>

              <p className="mt-4 max-w-xl font-barlow text-base font-medium leading-relaxed text-white/90 sm:text-lg md:mt-5 md:text-xl">
                {subhead}
              </p>

              <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2 sm:gap-y-3.5 md:mt-10">
                {features.slice(0, 6).map((feature, idx) => {
                  const key = feature?.icon;
                  const Icon = (key && ICON_MAP[key]) || FileText;
                  const text = feature?.text ?? feature?.title ?? "";
                  if (!text) return null;
                  return (
                    <li
                      key={`${text}-${idx}`}
                      className="flex items-start gap-3 font-barlow text-sm font-medium text-white/95 sm:text-[15px]"
                    >
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" strokeWidth={2} aria-hidden />
                      <span>{text}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 md:mt-10">
                <Link
                  href={tel}
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
        className="relative z-20 w-full border-t border-black/10 px-4 py-4 sm:px-6 lg:px-8"
        style={{ background: BAR_GRADIENT }}
      >
        <Container className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row md:gap-6">
          <p className="text-center font-barlow text-base text-white md:text-left md:text-lg">
            <span className="font-bold">Professional Fireplace Service</span>{" "}
            <span className="font-medium text-white/90">in the Comfort of Your Home</span>
          </p>
          <Link
            href={tel}
            className="inline-flex shrink-0 items-center gap-2.5 rounded-xl bg-white px-5 py-2.5 shadow-md transition hover:bg-neutral-100"
          >
            <BannerCtaIcon />
            <span
              className={`${rubik.className} text-[32px] font-bold not-italic leading-normal text-[#F29100]`}
            >
              {phone}
            </span>
          </Link>
        </Container>
      </div>
    </FullContainer>
  );
}
