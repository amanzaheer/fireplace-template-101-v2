"use client";

import Image from "next/image";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import {
  CheckCircle,
  Clock,
  Star,
  Shield,
  ShieldCheck,
  Award,
  Trophy,
  ThumbsUp,
  Phone,
  FileText,
  MessageSquare,
} from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { Poppins, Inter } from "next/font/google";
import { Rubik } from "next/font/google";
import QuoteForm8 from "./QuoteForm/QuoteForm8";

const poppin = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const rubik = Rubik({
  subsets: ["regular"],
  weight: ["400", "500", "600", "700"],
});

const ICON_MAP = {
  Clock,
  Star,
  Shield,
  ShieldCheck,
  Award,
  CheckCircle,
  Trophy,
  ThumbsUp,
  Phone,
  FileText,
  MessageSquare,
};

function isLicensedInsuredLabel(text) {
  const t = String(text ?? "").toLowerCase();
  return t.includes("licensed") && t.includes("insured");
}

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function normText(s) {
  return String(s ?? "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** Remove "#1 ", "1# ", etc. from CMS banner titles so the hero does not show a rank/hash prefix. */
function stripBannerRankPrefix(raw) {
  const original = String(raw ?? "").trim();
  let t = original.replace(/^#+\s*\d+\s*/i, "").trim();
  t = t.replace(/^\d+\s*#+\s*/i, "").trim();
  return t.length ? t : original;
}

export default function Banner8({ content }) {
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

  const headingText = data?.heading || data?.title || "CHIMNEY SERVICES";
  const headingStr = stripBannerRankPrefix(String(headingText).trim());
  const cmsTagline = data?.tagline?.trim();
  const showTagline =
    Boolean(cmsTagline) && normText(cmsTagline) !== normText(headingStr);

  const headingWords = headingStr.split(/\s+/).filter(Boolean);
  const splitIndex = Math.max(1, Math.ceil(headingWords.length / 2));
  const headingTop = headingWords.slice(0, splitIndex).join(" ");
  const headingBottom = headingWords.slice(splitIndex).join(" ");
  const ratingValue = String(
    banner?.rating_value ?? banner?.rating ?? "",
  ).trim();
  const ratingText = String(banner?.rating_text ?? "").trim();
  const ratingStars = Number(banner?.rating_stars ?? 5);
  const showRating = Boolean(ratingValue || ratingText);

  return (
    <FullContainer className="relative mt-[57.8px] w-full bg-[#ececec] py-10 md:mt-[84px] md:py-12">
      <Container className="relative">
        <div className="relative ml-4 mr-4 overflow-hidden rounded-[25px] bg-white shadow-[0_8px_60px_rgba(0,0,0,0.06)] lg:w-[1206px]">
          <div className="absolute inset-0">
            <Image
              src={image}
              alt={data?.altImage || "banner"}
              fill
              priority
              sizes="(max-width: 880px) 100vw, 880px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(248deg,rgba(255,255,255,0.66)_24.27%,rgba(255,255,255,0.66)_87.59%)]" />
          </div>
          <div className="relative z-10 grid grid-cols-1 gap-6 p-5 md:grid-cols-[1fr_330px] md:gap-7 md:pb-5 md:pl-7 md:pr-5 md:pt-5 lg:pl-8 lg:pr-6 lg:pt-5">
            <div className="min-w-0 md:pt-10 lg:pt-12">
              {(data?.title || cmsTagline) && (
                <p
                  className={`${inter.className} text-[26px] leading-none text-[#111] md:text-[38px]`}
                >
                  {data?.title || cmsTagline}
                </p>
              )}

              <h1
                className={`${rubik.className} mt-1 text-[44px] font-bold leading-[0.95] text-[#ff5a00] md:text-[58px] lg:text-[66px]`}
              >
                {headingTop}
              </h1>
              {headingBottom ? (
                <h2
                  className={`${rubik.className} text-[44px] font-bold leading-[0.95] text-[#ff5a00] md:text-[58px] lg:text-[66px]`}
                >
                  {headingBottom}
                </h2>
              ) : null}

              {showTagline ? (
                <p className={`${inter.className} mt-2 text-[16px] text-[#1c1c1c] md:text-[18px]`}>
                  {cmsTagline}
                </p>
              ) : null}

              {showRating ? (
                <div className="mt-4 inline-flex items-center overflow-hidden rounded-full bg-black pr-4 shadow-[0_6px_14px_rgba(0,0,0,0.2)]">
                  <span className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5">
                    <span className="inline-flex text-[#f6a623]">
                      {[...Array(Math.max(1, Math.min(5, ratingStars)))].map((_, idx) => (
                        <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </span>
                  </span>
                  {ratingValue ? (
                    <span
                      className={`${inter.className} ml-2 text-[16px] font-semibold text-white`}
                    >
                      {ratingValue}
                    </span>
                  ) : null}
                  {ratingText ? (
                    <span className={`${inter.className} ml-1 text-[13px] text-white/90`}>
                      {ratingText}
                    </span>
                  ) : null}
                </div>
              ) : null}

              {features?.length > 0 && (
                <ul className="mt-4 grid max-w-[660px] grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                  {features.map((feature, idx) => {
                    const IconComponent = isLicensedInsuredLabel(feature.text)
                      ? ShieldCheck
                      : ICON_MAP[feature.icon];
                    return (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] bg-[#FF0504]">
                          {IconComponent ? (
                            <IconComponent className="h-3.5 w-3.5 text-white" />
                          ) : (
                            <CheckCircle className="h-3.5 w-3.5 text-white" />
                          )}
                        </span>
                        <span
                          className={`${inter.className} text-[15px] leading-tight text-[#1c1c1c]`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}

              <a
                href={phone ? `tel:${phone}` : "#"}
                className={`${poppin.className} mt-5 inline-flex items-center gap-2 rounded-[12px] bg-[#ff5a00] px-5 py-3 text-[32px] font-bold leading-none text-white shadow-[0_8px_18px_rgba(255,90,0,0.35)] transition hover:opacity-90 md:text-[38px]`}
              >
                <span
                  className="flex shrink-0 items-center justify-center self-center"
                  style={{ width: 34, height: 34 }}
                >
                  <Phone
                    className="h-full w-full fill-white stroke-white text-white"
                    strokeWidth={2.25}
                    aria-hidden
                  />
                </span>
                {phone}
              </a>
            </div>

            <div className="w-full h-full md:-translate-x-12 md:-translate-y-8 md:justify-self-start md:pl-0 lg:-translate-x-16">
              <QuoteForm8
                data={data}
                form_head={form_head}
                showArrowInButton={false}
                compact={false}
                variant="banner8"
              />
            </div>
          <div className="relative hidden min-h-[420px] w-full md:block">
            <div
              className="absolute inset-y-0 left-0 h-full w-[110px] bg-[#FF5D00]"
              style={{ clipPath: "polygon(0% 0%, 100% 100%, 0% 100%)" }}
            />
            <div className="relative h-full w-full" />
          </div>
        </div>
      </div>
    </Container>
    </FullContainer>
  );
}
