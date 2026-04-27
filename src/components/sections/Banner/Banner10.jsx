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
        <div className="relative w-full min-h-[480px] bg-neutral-900 lg:min-h-[550px]">
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

          <div className="relative z-10 mx-auto flex min-h-[420px] w-full max-w-[1200px] flex-col items-center justify-between gap-8 px-4 py-10 md:py-14 lg:min-h-[560px] lg:flex-row lg:items-start lg:px-8">
            <div className="relative z-10 flex h-full w-full max-w-[620px] flex-col items-center justify-center text-center md:items-start md:pl-8 md:pr-6 md:text-left lg:pl-4 lg:pr-2">
              <div className="mb-3 flex items-center justify-center gap-2.5 self-center md:self-start md:justify-start">
                {phone ? (
                  <a
                    
                
                  >
                    
              
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
                <h2 className="text-center text-black uppercase font-bold  text-2xl leading-tight sm:text-3xl md:text-left md:text-4xl lg:text-5xl">
                  {headingLine1}
                </h2>
                ) : null}

                {headingAccent ? (
                <div className="mt-2">
                 
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
                      className="flex w-full max-w-[260px] items-start justify-start gap-2.5 text-left text-sm font-medium text-black md:max-w-none md:text-[15px]"
                    >
                      <span className="mt-0.5 inline-flex  shrink-0 items-center justify-center rounded">
                        <IconComponent className="h-5 w-5 text-" aria-hidden />
                      </span>
                      <span className="leading-snug text-left">
                        {feature.text}
                      </span>
                    </li>
                    );
                  })}
                </ul>
              )}

              <a
                href={phone ? `tel:${phone}` : "#"}
                className="group mb-0 mt-6 inline-flex w-auto max-w-max flex-nowrap items-center justify-center gap-3 self-center rounded-full border border-white/25 bg-[#ff4d4d] px-5 py-3 text-white shadow-[inset_0_4px_6px_rgba(0,0,0,0.15),inset_0_-4px_6px_rgba(0,0,0,0.15)] transition-opacity hover:opacity-95 sm:justify-start sm:px-8 sm:py-3.5 md:mt-8 md:self-start lg:mt-8"
              >
                <Image
                  src="/st-icons/Temp7/call1.1.png"
                  alt="Call us"
                  width={32}
                  height={32}
                  className="h-7 w-auto shrink-0 sm:h-8"
                  unoptimized
                />
                <span className="min-w-0 text-left text-[14px] font-extrabold leading-none tracking-tight sm:text-[16px] md:text-[26px] lg:text-[20px]">
                  <span className="whitespace-nowrap">
                    <span className="uppercase">CALL US 24/7-</span>{" "}
                    {phone}
                  </span>
                </span>
              </a>
            </div>
            <div className="w-full md:w-[444px] md:shrink-0 flex justify-center lg:justify-end">
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
    