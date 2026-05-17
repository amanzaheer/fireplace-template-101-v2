"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import {
  Phone,
  CheckCircle,
  Clock,
  Star,
  Shield,
  Award,
  Trophy,
  ThumbsUp,
  FileText,
  MessageSquare,
} from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";


import QuoteForm10 from "./QuoteForm/QuoteForm10";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}
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
/** Split hero + form — copy from `content.banner` (CMS). */
export default function Banner10({ content }) {
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

  const image = buildImageSrc(IMAGE_BASE, banner.file_name) || "";

  const contactLabel = banner.contact_label ?? "";
  const headingLine1 =
    banner.heading_primary ??
    banner.heading_line1 ??
    banner.heading ??
    data.title ??
    "";
  const headingAccent =
    banner.heading_accent ?? banner.heading_line2 ?? banner.tagline ?? "";

  const form_head = {
    title: banner.form_title ?? "",
    sub_title: banner.form_description ?? "",
  };

  const features = resolveRefArray(content, banner, "features");

  const phone =
    banner.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";

  const form_labels = content?.form_labels ?? {};

  const phoneHref = phone ? `tel:${String(phone).replace(/[^\d+]/g, "")}` : "#";

  const callButtonPrefix =
    typeof banner.call_button_prefix === "string" &&
      banner.call_button_prefix.trim()
      ? banner.call_button_prefix.trim()
      : "";

  return (
    <FullContainer
      id="banner"
      className={`z-10 relative isolate -mt-[82px] w-full overflow-hidden bg-transparent px-0 pt-[calc(82px+2.75rem)] md:-mt-[120px] md:pt-[calc(120px+3.75rem)] ${poppins.className}`}
    >
      <div className="w-full">
        <div className="relative w-full min-h-[460px] overflow-hidden bg-neutral-900 pb-8 lg:min-h-[520px] lg:pb-12">
          {/* {image ? (
            <Image
              src={image}
              title={data?.imageTitle || data?.title || ""}
              alt={data?.altImage || data?.tagline || ""}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "center" }}
            />
          ) : null} */}
          <div className="pointer-events-none absolute inset-0 bg-white" />

          <div className="relative z-10 mx-auto grid min-h-0 w-full max-w-[1270px] grid-cols-1 items-start gap-10 px-3 py-10 md:px-4 md:py-14 lg:min-h-[480px] lg:grid-cols-2 lg:gap-10 xl:gap-12">
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center md:items-start md:text-left">
              {(headingLine1 || headingAccent) && (
                <div className="self-center md:self-start">
                  {headingLine1 ? (
                    <h2 className="text-center text-2xl font-bold uppercase leading-tight text-black sm:text-3xl md:text-left md:text-4xl lg:text-5xl">
                      {headingLine1}
                    </h2>
                  ) : null}

                  {headingAccent ? (
                    <p className="mt-2 text-center text-base font-medium text-black/80 md:text-left">
                      {headingAccent}
                    </p>
                  ) : null}
                </div>
              )}

              {data?.description && (
                <p className="mt-3 max-w-xl text-center text-sm text-black md:text-left md:text-base">
                  {data.description}
                </p>
              )}

              {features?.length > 0 && (
                <ul className="mt-5 grid max-w-xl grid-cols-1 justify-items-center gap-x-6 gap-y-3 self-center sm:grid-cols-2 md:mt-6 md:justify-items-start md:self-start">
                  {features.map((feature, idx) => {
                    const IconComponent =
                      feature?.icon && ICON_MAP[feature.icon]
                        ? ICON_MAP[feature.icon]
                        : CheckCircle;
                    return (
                      <li
                        key={idx}
                        className="flex w-full max-w-[260px] items-start justify-start gap-2.5 text-left text-sm font-medium text-black md:max-w-none md:text-[15px]"
                      >
                        <span className="mt-0.5 inline-flex shrink-0 items-center justify-center rounded">
                          <IconComponent className="h-5 w-5 text-emerald-600" aria-hidden />
                        </span>
                        <span className="leading-snug text-left">
                          {feature.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}

              {phone ? (
                <a
                  href={phoneHref}
                  className="group mb-0 mt-6 inline-flex w-auto max-w-max flex-nowrap items-center justify-center gap-3 self-center rounded-full border border-white/25 bg-[#ff4d4d] px-5 py-3 text-white shadow-[inset_0_4px_6px_rgba(0,0,0,0.15),inset_0_-4px_6px_rgba(0,0,0,0.15)] transition-opacity hover:opacity-95 sm:justify-start sm:px-8 sm:py-3.5 md:mt-8 md:self-start lg:mt-8"
                >
                  <Image
                    src="/st-icons/Temp7/call1.1.png"
                    alt=""
                    width={32}
                    height={32}
                    className="h-7 w-auto shrink-0 sm:h-8"
                    unoptimized
                  />
                  <span className="min-w-0 text-left text-[14px] font-extrabold leading-none tracking-tight sm:text-[16px] md:text-[26px] lg:text-[20px]">
                    <span className="whitespace-nowrap">
                      {callButtonPrefix ? (
                        <span className="uppercase">{callButtonPrefix}</span>
                      ) : null}
                      {callButtonPrefix ? " " : null}
                      {phone}
                    </span>
                  </span>
                </a>
              ) : null}
            </div>
            <div
              className="
    relative
    z-10
    flex
    w-full
    justify-center
    ml-0
    sm:ml-4
    md:ml-8
    lg:ml-4
    lg:w-full
    lg:justify-start
    lg:pt-2
  "
            >
              <QuoteForm10
                data={data}
                form_head={form_head}
                form_labels={form_labels}
                showArrowInButton={false}
              />
            </div>
          </div>

        </div>
      </div>
    </FullContainer>
  );
}