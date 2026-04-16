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
import QuoteForm15 from "./QuoteForm/QuoteForm15";
import { FiveStars } from "@/components/common";
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
      className={cn("h-[28px] w-[29px] shrink-0", className)}
      aria-hidden
    >
      <path
        d="M15.9343 0H5.37446e-05V1.80952C-0.0121365 8.77558 2.04963 15.5955 5.93547 21.4428C8.79926 25.7545 12.5677 29.4264 16.9929 32.2167C22.994 36.0029 29.9935 38.0118 37.1429 37.9999H39V22.4743L26.5757 19.7835L23.1215 23.1492C19.9606 21.1703 17.2737 18.5517 15.2435 15.4714L18.6959 12.1057L15.9343 0Z"
        fill="#F29100"
      />
    </svg>
  );
}

const Quote15 = dynamic(() => import("./QuoteForm/QuoteForm15"), {
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

export default function Banner15({ content }) {
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
      <div className="relative h-full w-full py-6 lg:py-0 max-h-full overflow-hidden lg:h-[480px] lg:max-h-[480px]">
        <Image
          src={imageSrc}
          alt={headline || "Hero"}
          priority
          className="object-cover object-center absolute inset-0 h-full w-full "
          width={10000}
          height={480}
          unoptimized={useUnoptimized}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/35" aria-hidden />

        <Container className="relative lg:px-0! z-10 mx-auto max-w-[880px] flex flex-col items-center justify-center h-full">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_min(420px,38vw)] lg:gap-12 xl:gap-0 w-full  ">
            <div className="max-w-2xl text-white md:max-w-none flex flex-col items-center lg:items-start justify-center gap-4 w-full">
              <h1 className="font-montserrat font-bold leading-tight tracking-tight text-4xl md:text-5xl lg:text-[2.75rem] lg:leading-[1.12]">
                <div className="inline-flex flex-wrap justify-center lg:justify-start items-center gap-x-2 gap-y-1 ">
                  {(() => {
                    const words = headline.trim().split(/\s+/).filter(Boolean);
                    const lead = words.slice(0, 2).join(" ");
                    const tail = words.slice(2).join(" ");
                    return (
                      <>
                        <span>{lead || headline}</span>
                        <div className="mt-2">

                        <FiveStars className="" starClassName="text-[#f59a00] text-[16px]!" />
                        </div>
                        {tail ? <span>{tail}</span> : null}
                      </>
                    );
                  })()}
                </div>
              </h1>

              <p className="max-w-xl font-barlow font-medium items-center justify-center text-center md:text-left leading-relaxed text-white/90 text-lg md:text-xl">
                {subhead}
              </p>

              <ul className="grid max-w-lg grid-cols-1 gap-x-10 gap-y-1.5 sm:grid-cols-2 sm:gap-y-2">
                {features.slice(0, 6).map((feature, idx) => {
                  const key = feature?.icon;
                  const Icon = (key && ICON_MAP[key]) || FileText;
                  const text = feature?.text ?? feature?.title ?? "";
                  if (!text) return null;
                  return (
                    <li
                      key={`${text}-${idx}`}
                      className="flex items-start gap-3 font-barlow font-medium text-white/95 text-[15px]"
                    >
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" strokeWidth={2} aria-hidden />
                      <span>{text}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="">
                <Link
                  href={tel}
                  className="inline-flex items-center gap-3 rounded-xl bg-white px-5 py-2 shadow-[0_0_10px_1px_rgba(0,0,0,0.4)] shadow-white transition hover:bg-neutral-100 sm:px-6 sm:py-2.5 "
                >
                  <BannerCtaIcon />
                  <span
                    className={`${rubik.className} text-[24px] font-bold not-italic leading-normal text-[#F29100]`}
                  >
                    {phone}
                  </span>
                </Link>
              </div>
            </div>

            <div className="w-full max-w-[360px] justify-self-center px-0 md:px-5 lg:justify-self-end lg:px-8">
              <QuoteForm15
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
        className="relative z-10 w-full border-t bg-[#62370c] border-black/10 px-4 py-4 sm:px-6 lg:px-8"
       
      >
        <Container className="mx-auto  flex max-w-[880px] flex-col items-center justify-between gap-4 md:flex-row md:gap-6">
          <p className="text-center font-barlow text-base flex flex-col items-start text-white md:text-left md:text-lg">
            <span className="font-bold text-2xl md:text-3xl lg:text-4xl">Professional Fireplace Service</span>{" "}
            <span className="font-medium text-white/90 text-xl md:text-2xl lg:text-3xl">in the Comfort of Your Home</span>
          </p> 
          <Link
                  href={tel}
                  className="inline-flex items-center gap-3 rounded-xl bg-white px-5 py-2  transition hover:bg-neutral-100 sm:px-6 sm:py-2.5 "
                >
                  <BannerCtaIcon />
                  <span
                    className={`${rubik.className} text-[24px] font-bold not-italic leading-normal text-[#F29100]`}
                  >
                    {phone}
                  </span>
                </Link>
        </Container>
      </div>
    </FullContainer>
  );
}
