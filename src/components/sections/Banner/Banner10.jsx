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

  const phoneHref = phone ? `tel:${phone}` : "#";

  return (
    <FullContainer
      id="banner"
      className={`relative bg-transparent overflow-hidden w-full px-0 ${poppins.className}`}
    >
      <div className="w-full">
        <div className="relative grid w-full min-h-[480px] grid-cols-1 bg-neutral-900 lg:min-h-[560px] lg:grid-cols-2">
          {image ? (
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
          ) : null}
          <div className="pointer-events-none absolute inset-0 bg-black/50" />

          <div className="relative z-10 flex min-h-[420px] lg:min-h-full">

            <div className="relative z-10 mx-auto flex h-full w-full max-w-[620px] flex-col items-center justify-center px-4 py-10 text-center md:ml-auto md:items-start md:py-14 md:pl-16 md:pr-8 lg:pl-20 lg:pr-6 md:text-left">
              <div className="mb-3 flex items-center justify-center gap-2.5 self-center md:self-start md:justify-start">
                {phone ? (
                  <a
                    href={phoneHref}
                    className="inline-flex items-start gap-2.5 text-black hover:opacity-90"
                  >
                    <span className="bg-linear-to-r from-[#f20508] to-[#b12224] rounded p-2 flex shrink-0 items-center justify-center mt-0.5">
                      <Phone className="w-3 h-4 text-white" strokeWidth={2.5} />
                    </span>
                    <div className="flex min-w-0 flex-col items-center leading-none md:items-start">
                      <span className="font-bold uppercase tracking-wide text-xs md:text-sm text-black">
                        {contactLabel || "Contact"}
                      </span>
                      <span className="mt-1 text-xl font-bold text-black md:text-3xl">
                        {phone}
                      </span>
                    </div>
                  </a>
                ) : (
                  <div className="inline-flex items-start gap-2.5 text-black">
                    <span className="bg-linear-to-r from-[#f20508] to-[#b12224] rounded p-2 flex shrink-0 items-center justify-center mt-0.5">
                      <Phone className="w-3 h-4 text-white" strokeWidth={2.5} />
                    </span>
                    <div className="flex min-w-0 flex-col items-center leading-none md:items-start">
                      <span className="font-bold uppercase tracking-wide text-xs md:text-[16px] text-black">
                        {contactLabel || "Contact"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {(headingLine1 || headingAccent) && (
              <div className="mt-4 md:mt-6 self-center md:self-start">
                {headingLine1 ? (
                <h2 className="text-center text-white uppercase font-bold  text-2xl leading-tight sm:text-3xl md:text-left md:text-4xl lg:text-5xl">
                  {headingLine1}
                </h2>
                ) : null}

                {headingAccent ? (
                <div className="mt-2">
                  <span className="inline-block bg-[#e20c0e] rounded-xl text-white px-5 py-2 md:px-6 md:py-3 text-lg md:text-2xl lg:text-4xl font-black uppercase">
                    {headingAccent}
                  </span>
                </div>
                ) : null}
              </div>
              )}

              {data?.description && (
                <p className="mt-3 max-w-xl text-center text-sm text-white md:text-left md:text-base">
                  {data.description}
                </p>
              )}

              {features?.length > 0 && (
                <ul className="mt-5 md:mt-6 grid max-w-xl grid-cols-1 gap-x-6 gap-y-3 justify-items-center sm:grid-cols-2 md:justify-items-start self-center md:self-start">
                  {features.map((feature, idx) => {
                    const IconComponent =
                      feature?.icon && ICON_MAP[feature.icon]
                        ? ICON_MAP[feature.icon]
                        : CheckCircle;
                    return (
                    <li
                      key={idx}
                      className="flex w-full max-w-[260px] items-start justify-start gap-2.5 text-left text-sm font-medium text-white md:max-w-none md:text-[15px]"
                    >
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#e20c0e]">
                        <IconComponent className="h-4 w-4 text-white" aria-hidden />
                      </span>
                      <span className="leading-snug text-left">
                        {feature.text}
                      </span>
                    </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          <div className={`relative z-10 w-full min-h-[400px] justify-center px-5 py-10 md:px-8 md:py-14 lg:px-10 ${poppins.className}`}>
            <div className="w-full max-w-sm mx-auto">
              <QuoteForm10
                data={data}
                form_head={form_head}
                showArrowInButton={false}
              />
            </div>
          </div>
        </div>
      </div>
    </FullContainer>
  );
}
    