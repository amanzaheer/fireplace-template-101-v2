"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Poppins } from "next/font/google";
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

const poppinsBanner = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const QuoteForm = dynamic(() => import("./QuoteForm/QuoteForm8"), {
  loading: () => (
    <div className="bg-white shadow-lg h-[190px] w-[280px] animate-pulse" />
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
    Boolean(cmsTagline) &&
    normText(cmsTagline) !== normText(headingStr);

  const headingWords = headingStr.split(/\s+/).filter(Boolean);
  const splitIndex = Math.max(1, Math.ceil(headingWords.length / 2));
  const headingTop = headingWords.slice(0, splitIndex).join(" ");
  const headingBottom = headingWords.slice(splitIndex).join(" ");

  return (
    <FullContainer className="relative w-auto overflow-hidden bg-[#08285a]">
      <div className="pointer-events-none translate-y-[-10px] absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#061f4a] via-[#072a62] to-[#072b5f]" />
        <div className="absolute left-[-158px] top-0 h-[120px] w-[597px] bg-[#ff6a00] [clip-path:polygon(0_0,100%_0,0_100%)] sm:h-[180px] sm:w-[170px] md:h-[240px] md:w-[230px] lg:h-[300px] lg:w-[290px]" />
        <div className="absolute left-0 bottom-[-10px] h-[100px] w-[997px] bg-[#ff6a00] [clip-path:polygon(0_0,100%_100%,0_100%)] sm:h-[180px] sm:w-[280px] md:h-[200px] md:w-[90px] lg:h-[250px] lg:w-[108px]" />
      </div>
      <Container className="relative z-10 px-100 pb-30 pt-3  md:pb-10 md:pt-5 ">
        <div className="grid items-center justify-between gap-5 sm:gap-8 lg:items-center lg:grid-cols-2 lg:gap-8 xl:gap-10">

          <div className="min-w-0 pb-2 pt-0 sm:pt-4 md:pl-60 md:pt-6 lg:pl-4 lg:pt-8 xl:pl-40">
            <div className="mb-1.5 flex h-[27px] w-fit max-w-full shrink-0 items-center gap-1.5">
              <div className="flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-[2px] bg-[#ff4800]">
                <Phone className="h-4 w-4 text-white" aria-hidden />
              </div>
              <span
                className={`${poppinsBanner.className} w-[96px] shrink-0 truncate text-left text-[16px] font-normal uppercase leading-normal not-italic text-white`}
                style={{ color: "#FFF", lineHeight: "normal" }}
              >
                {(banner.contact_label || "Contact").trim()}
              </span>
            </div>

            <a
              href={phone ? `tel:${phone}` : "#"}
              className="block max-w-full break-words text-[1.75rem] font-semibold leading-tight text-white sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]"
            >
              {phone}
            </a>

            {showTagline ? (
              <p
                className={`${poppinsBanner.className} mt-2 max-w-full text-base font-bold not-italic text-white sm:text-lg md:text-xl lg:max-w-[26rem] lg:text-2xl xl:text-[30px]`}
                style={{ lineHeight: "normal", color: "#FFF" }}
              >
                {cmsTagline}
              </p>
            ) : null}

            <h1
              className={`${poppinsBanner.className} mt-2 text-[1.75rem] font-bold uppercase leading-[1.08] tracking-tight text-white sm:text-2xl md:text-5xl lg:text-[2.75rem] lg:leading-[1.05] xl:text-[3.25rem] 2xl:text-[3.75rem]`}
            >
              {headingTop}
            </h1>
            {headingBottom ? (
              <div className="mt-2 box-border w-fit max-w-full min-w-0 bg-[#ff4800] px-4 py-2.5 sm:px-5 sm:py-2 md:px-6 md:py-2.5 lg:px-7 lg:py-3">
                <span
                  className={`${poppinsBanner.className} block max-w-full text-left text-[clamp(1.125rem,3.8vw,2.75rem)] font-bold uppercase not-italic leading-[1.1] tracking-tight text-white sm:text-3xl sm:leading-[1.12] md:text-4xl md:leading-[1.1] lg:text-[2.65rem] lg:leading-[1.08] xl:text-[2.75rem]`}
                  style={{ color: "#FFF" }}
                >
                  {headingBottom}
                </span>
              </div>
            ) : null}

            <div className="mt-4 flex flex-col items-stretch gap-3 sm:mt-5 sm:flex-row sm:items-start sm:gap-4">
              {features?.length > 0 && (
                <ul className="w-full shrink-0 space-y-1 sm:mt-[30px] sm:max-w-[190px]">
                  {features.map((feature, idx) => {
                    const IconComponent = ICON_MAP[feature.icon];
                    return (
                      <li
                        key={idx}
                        className="flex items-center gap-1.5"
                      >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] bg-[#ff4800]">
                          {IconComponent ? (
                            <IconComponent className="h-2.5 w-2.5 text-white" />
                          ) : (
                            <CheckCircle className="h-2.5 w-2.5 text-white" />
                          )}
                        </span>
                        <span
                          className={`${poppinsBanner.className} text-[10px] font-normal leading-normal not-italic text-white`}
                          style={{ color: "#FFF", lineHeight: "normal" }}
                        >
                          {feature.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}

              <div className="flex w-full min-w-0 max-w-full flex-col overflow-visible sm:max-w-[min(100%,320px)] sm:self-start">
                <h3
                  className={`${poppinsBanner.className} mb-2 shrink-0 text-[20px] font-bold uppercase not-italic text-white`}
                  style={{ color: "#FFF", lineHeight: "16px" }}
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
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md pb-6 sm:pb-8 md:pb-30 lg:mx-0 lg:max-w-none lg:justify-self-end lg:pb-12 lg:-mt-5 lg:self-start xl:pb-14">
            <div className="relative h-[280px] w-full overflow-hidden rounded-md sm:h-[325px] sm:rounded-lg md:h-[375px] lg:h-[460px] lg:rounded-t-none lg:rounded-r-none xl:h-[520px] 2xl:h-[580px]">
              <Image
                src={image}
                alt={data?.altImage || "banner"}
                fill
                priority
                sizes="(max-width: 680px) 100vw, (max-width: 1024px) 90vw, 42vw"
                className="object-cover object-[82%_center]"
              />
            </div>
          </div>

        </div>
      </Container>
    </FullContainer>
  );
}