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
import { Poppins, Inter } from "next/font/google";
import { Rubik } from "next/font/google";

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

const QuoteForm = dynamic(() => import("./QuoteForm/QuoteForm8"), {
  loading: () => (
    <div className="bg-white shadow-lg h-[120px] w-[280px] animate-pulse" />
  ),
  ssr: false,
});

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
    content?.CONTACT_info?.phone ??
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

  return (
    <FullContainer className="relative w-auto mt-[57.8px] md:mt-[84px] min-h-[600px] md:h-auto pb-10 overflow-visible">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-2 w-32.5 sm:w-[140px] md:w-[200px]"></div>

      <Container className="relative z-10 pt-20 md:pt-32 pb-0">
        <div className="flex flex-col items-center text-center">
          <div className="min-w-0 max-w-full w-full pb-2 md:pb-4 flex flex-col items-center">
            <div className="mb-1.5 flex h-6.75 w-full justify-center  items-center gap-1.5">
              <div className="flex h-6.75 w-6.75 shrink-0 items-center justify-center rounded-[2px] bg-[#FF0504]">
                <Phone className="h-4 w-4 text-white" aria-hidden />
              </div>
              <span
                className={`${poppin.className} w-[96px] shrink-0 truncate text-left text-[16px] font-normal uppercase leading-normal not-italic text-white`}
                style={{ color: "#FFF", lineHeight: "normal" }}
              >
                {(banner.contact_label || "Contact").trim()}
              </span>
            </div>

            <a
              href={phone ? `tel:${phone}` : "#"}
              className={` ${poppin.className} block max-w-full break-words font-bold leading-none text-white text-[clamp(1.375rem,5vw,1.75rem)] sm:text-[28px] lg:text-[30px]`}
            >
              {phone}
            </a>

            {showTagline ? (
              <p
                className={`${poppin.className} mt-2 max-w-full text-base font-bold not-italic text-white sm:text-lg md:text-xl lg:max-w-[26rem] lg:text-2xl xl:text-[30px]`}
                style={{ lineHeight: "normal", color: "#FFF" }}
              >
                {cmsTagline}  
              </p>
            ) : null}

            <h1
              className={`${poppin.className} mt-4 text-[clamp(1.375rem,5.5vw,1.75rem)] font-bold uppercase leading-[1.08] text-white sm:text-[28px] md:text-[36px]`}
            >
              {headingTop}
            </h1>
            {headingBottom ? (
              <div className="mt-[9px] box-border mx-auto w-fit max-w-full min-w-0 bg-[#FF0504] px-3 py-2 sm:px-4 sm:py-2.5 md:px-4 md:py-3">
                <span
                  className={`${poppin.className} block max-w-full text-left font-bold uppercase not-italic leading-[1.2] tracking-tight text-white text-[clamp(1.25rem,5vw,1.875rem)] sm:text-3xl md:text-[44px]`}
                  style={{ color: "#FFF" }}
                >
                  {headingBottom}
                </span>
              </div>
            ) : null}

            {/* 1. Adjusted padding to standard Tailwind values (p-6 to p-10) and removed flex-row-reverse for better control */}
            <div className="mt-8 flex flex-col bg-white gap-10 sm:flex-row sm:items-start sm:justify-between w-full max-w-3xl p-8 md:py-24 md:p-12 rounded-2xl shadow-2xl mx-auto relative z-20 -mb-58">
              {/* 2. Form Container: Increased max-width from 320px to 450px so inputs have room to breathe */}
              <div className="flex w-[65%] min-w-0 flex-col text-left [&_button]:!w-full [&_button]:!rounded-full [&_button]:!py-3 [&_button]:!mt-1 [&_button]:!font-bold [&_button_*]:!font-bold [&_input]:!placeholder-black [&_input]:placeholder-opacity-100 [&_textarea]:!placeholder-black [&_textarea]:placeholder-opacity-100">
                <h3
                  className={`${poppin.className} mb-4 shrink-0 text-[clamp(1.25rem,4vw,1.5rem)] font-bold uppercase not-italic text-black`}
                  style={{ color: "#000", lineHeight: "1.2" }}  spacing
                >
                  {(banner.cta_heading || "GET IN TOUCH WITH US").trim()}
                </h3>
                <QuoteForm
                  data={data}
                  form_head={form_head}
                  showArrowInButton={false}
                  compact
                />
              </div>

              {/* 3. Features List: Removed max-w-[190px] so it can occupy the remaining space naturally */}
              {features?.length > 0 && (
                <ul className="w-fit shrink-0 space-y-3 sm:mt-2">
                  {features.map((feature, idx) => {
                    const IconComponent = ICON_MAP[feature.icon];
                    return (
                      <li key={idx} className="flex items-center gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[2px] bg-[#FF0504]">
                          {IconComponent ? (
                            <IconComponent className="h-3 w-3 text-white" />
                          ) : (
                            <CheckCircle className="h-3 w-3 text-white" />
                          )}
                        </span>

                        <span
                          className={`${poppin.className} text-[14px] font-normal leading-tight text-[#000]`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          <div className="relative mx-auto hidden h-full w-full max-w-md pb-6 sm:pb-8 md:pb-24 lg:mx-0 lg:block lg:max-w-none lg:justify-self-end"></div>
        </div>
      </Container>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-auto z-[1] h-[min(38vh,280px)] min-h-[600px] w-full max-md:max-h-[320px] md:inset-x-auto md:inset-y-0 md:bottom-auto md:left-auto md:right-0 md:top-0 md:h-full md:max-h-none w-full md:min-h-[280px]">
        <div className="relative h-full min-h-[200px] w-full md:min-h-[280px]">
          <div className="block md:hidden absolute top-0 left-0 w-full h-full bg-[#00142c] opacity-30 z-10" />
          <Image
            src={image}
            alt={data?.altImage || "banner"}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </FullContainer>
  );
}
