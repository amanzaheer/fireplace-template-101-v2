"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import {
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

const ACCENT = "#FF6611";

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

const QuoteForm6 = dynamic(() => import("@/components/sections/Banner/QuoteForm/QuoteForm6"), {
  loading: () => (
    <div
      className="h-[420px] w-full max-w-md rounded-xl border border-[#FF6611] bg-black/60 animate-pulse mx-auto md:mx-0"
      aria-hidden
    />
  ),
  ssr: false,
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

const headingH1Class =
  "font-montserrat font-bold uppercase tracking-tight text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] leading-[1.1] text-center md:text-left";

/**
 * Renders hero heading with white / accent segments.
 * - Four pipe-separated parts: "A|B|C|D" → line1: white A + accent B; line2: accent C + white D.
 * - Two pipe-separated parts: "A|B" → line1 white A, line2 accent B.
 * - Plain text (no pipes): first half of words white, second half accent (two lines).
 */
function HeroHeading({ text }) {
  if (!text || typeof text !== "string") return null;
  const parts = text
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);

  if (parts.length === 4) {
    return (
      <h1 className={headingH1Class}>
        <span className="block">
          <span className="text-white">{parts[0]}</span>{" "}
          <span style={{ color: ACCENT }}>{parts[1]}</span>
        </span>
        <span className="block mt-1">
          <span style={{ color: ACCENT }}>{parts[2]}</span>{" "}
          <span className="text-white">{parts[3]}</span>
        </span>
      </h1>
    );
  }

  if (parts.length === 2) {
    return (
      <h1 className={headingH1Class}>
        <span className="block">
          <span className="text-white">{parts[0]}</span>
        </span>
        <span className="block mt-1">
          <span style={{ color: ACCENT }}>{parts[1]}</span>
        </span>
      </h1>
    );
  }

  if (parts.length === 3) {
    return (
      <h1 className={headingH1Class}>
        <span className="block">
          <span className="text-white">
            {parts[0]} {parts[1]}
          </span>
        </span>
        <span className="block mt-1">
          <span style={{ color: ACCENT }}>{parts[2]}</span>
        </span>
      </h1>
    );
  }

  const single = parts[0] ?? text.trim();
  const words = single.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    const mid = Math.ceil(words.length / 2);
    const lineWhite = words.slice(0, mid).join(" ");
    const lineAccent = words.slice(mid).join(" ");
    return (
      <h1 className={headingH1Class}>
        <span className="block">
          <span className="text-white">{lineWhite}</span>
        </span>
        <span className="block mt-1">
          <span style={{ color: ACCENT }}>{lineAccent}</span>
        </span>
      </h1>
    );
  }

  return (
    <h1
      className={`font-montserrat font-bold uppercase tracking-tight text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] leading-tight text-white text-center md:text-left`}
    >
      {single}
    </h1>
  );
}

export default function Banner6({ content }) {
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
    title: content?.banner?.form_title || "Get in touch with us",
    sub_title:
      content?.banner?.form_description || "10% Off for Online Booking",
  };
  const features = resolveRefArray(content, banner, "features");
  const phone =
    banner.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";

  const headingText = data?.heading || data?.title || "";

  return (
    <FullContainer 
      id="banner"
      className=" relative overflow-hidden w-full md:min-h-[640px]! lg:min-h-[600px]! max-h-[680px]!"
    >
      <div className="absolute inset-0 min-h-[560px] md:min-h-full">
        <Image
          src={image}
          title={data?.imageTitle || data?.title || "Banner"}
          alt={data?.altImage || data?.tagline || "Banner"}
          priority
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden />
      </div>
      <Container className="relative z-10 py-12 md:py-16 lg:py-20 pt-40 ">
        <div className="flex flex-col lg:flex-row lg:items-stretch  pt-10 lg:justify-between gap-12 lg:gap-14 xl:gap-20">
          <div className="flex flex-col justify-center w-full lg:max-w-xl xl:max-w-2xl ">
            <HeroHeading text={headingText}/>

            <div
              className="mt-5 h-[3px] w-full max-w-md mx-auto md:mx-0 rounded-full overflow-hidden"
              aria-hidden
            >
              <div
                className="h-full w-full"
                style={{
                  background: `linear-gradient(90deg, ${ACCENT} 0%, ${ACCENT} 38%, rgba(255,255,255,0.95) 38%, rgba(255,255,255,0.95) 100%)`,
                }}
              />
            </div>

            {data?.tagline ? (
              <p className="mt-4 font-montserrat text-lg sm:text-xl font-semibold uppercase tracking-wide text-center md:text-left text-white/90">
                {data.tagline}
              </p>
            ) : null}

            {data?.description ? (
              <p className="mt-3 text-base md:text-lg text-white/85 text-center md:text-left max-w-xl">
                {data.description}
              </p>
            ) : null}

            {features?.length > 0 ? (
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 w-full max-w-xl mx-auto md:mx-0">
                {features.map((feature, idx) => {
                  const IconComponent = ICON_MAP[feature.icon] ?? Shield;
                  return (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-white font-medium text-sm sm:text-base"
                    >
                      <span
                        className="flex shrink-0 w-7 h-7 rounded-md items-center justify-center"
                        style={{ backgroundColor: `${ACCENT}33` }}
                        aria-hidden
                      >
                        <IconComponent
                          className="w-4 h-4"
                          style={{ color: ACCENT }}
                          strokeWidth={2.25}
                        />
                      </span>
                      <span>{feature.text}</span>
                    </li>
                  );
                })}
              </ul>
            ) : null}

            {phone ? (
              <div className="mt-10 flex justify-center md:justify-start">
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center bg-gradient-to-l from-[#FF6611] to-transparent gap-3 pl-2 pr-6 py-1 rounded-md font-montserrat font-bold text-white text-lg sm:text-xl shadow-lg transition-opacity hover:opacity-95"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/95 text-black">
                    <Phone className="w-5 h-5" style={{ color: ACCENT }} aria-hidden />
                  </span>
                  {phone}
                </a>
              </div>
            ) : null}
          </div>

          <div className="w-full lg:w-auto lg:min-w-[380px] lg:max-w-md flex justify-center lg:justify-end shrink-0">
            <QuoteForm6
              data={data}
              form_head={form_head}
              showArrowInButton={false}
            />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
