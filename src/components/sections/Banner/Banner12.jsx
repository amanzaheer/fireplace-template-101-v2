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

import QuoteForm12 from "./QuoteForm/QuoteForm12";

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
export default function Banner12({ content }) {
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
        <div className="relative grid w-full min-h-[480px] grid-cols-1 bg-neutral-900 lg:min-h-[560px]">
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
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent " />

          <div className="relative z-10 flex min-h-[420px] lg:min-h-full ">
            <div className="relative z-10 mx-auto flex h-full w-full  flex-col items-center justify-center px-4 py-10 text-center md:ml-auto md:items-start md:py-14 md:pl-16 md:pr-8 lg:pl-20 lg:pr-6 md:text-left">
              <div className="mb-3 flex  w-full items-center justify-center gap-2.5">
                {phone ? (
                  <a
                    href={phoneHref}
                    className="inline-flex items-center justify-center width-[292px] shadow-lg bg-[#da4909] rounded-full py-2 px-5 gap-2.5 border-3 h-[46px] border-white text-white hover:opacity-90"
                  >
                    {/* <span className="bg-linear-to-r from-[#f20508] to-[#b12224] rounded p-2 flex shrink-0 items-center justify-center mt-0.5">
                      <Phone className="w-3 h-4 text-white" strokeWidth={2.5} />
                    </span> */}
                    <div className="flex min-w-0 items-center gap-2 leading-none">
                      <span className="font-norml uppercase tracking-wide text-[14px] md:text-[16px] text-white">
                        {contactLabel || "Contact"}
                      </span>
                      <span className="text-[20px] font-bold text-white md:text-[22px]">
                        {phone}
                      </span>
                    </div>
                  </a>
                ) : (
                  <div className="inline-flex items-start gap-2.5 text-black">
                    <span className="bg-[#da4909] rounded p-2 flex shrink-0 items-center justify-center mt-0.5">
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

             {data?.tagline && (
              <p className=" w-full  text-center text-black  mx-auto max-w-[820px]  uppercase font-bold text-2xl leading-tight sm:text-3xl md:text-center md:text-4xl lg:text-4xl">
                {data.tagline}
              </p>
             )}

              {data?.description && (
                <p className="mt-3   text-center text-sm text-white md:text-left md:text-base">
                  {data.description}
                </p>
              )}
            </div>
          </div>

          <div
            className={`relative z-10 w-full min-h-[400px]    flex items-center justify-center  md:px-8 md:lg: ${poppins.className}`}
          >
            <QuoteForm12
              data={data}
              form_head={form_head}
              showArrowInButton={false}
            />
          </div>
          <div>
            
          </div>
          <div className="relative z-10 w-full flex items-center justify-center border-white/30 ">
            {features?.length > 0 && (
              <ul className="my-5 z-50 max-w-2xl  flex flex-row flex-wrap gap-4">
                {features.map((feature, idx) => {
                  const IconComponent =
                    feature?.icon && ICON_MAP[feature.icon]
                      ? ICON_MAP[feature.icon]
                      : CheckCircle;
                  return (
                    <li
                      key={idx}
                      className="flex w-fit max-w-[260px]  items-start justify-start gap-2.5 text-left text-sm font-medium text-white md:max-w-none md:text-[17px]"
                    >
                      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded">
                        <IconComponent
                          className="h-5 w-5 text-[#da4909]"
                          aria-hidden
                        />
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
      </div>
    </FullContainer>
  );
}
