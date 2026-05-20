"use client";

import Image from "next/image";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";

import {
  Check,
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
import { Poppins } from "next/font/google";
import QuoteForm22 from "./QuoteForm/QuoteForm22";
import { Cta22 } from "../Cta";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const ACCENT = "#F0A535";
const CALL_ICON_SRC = "/st-icons/Temp13/call2.png";
/** Matches Navbar13 phone chip (empty = no fill, same as navbar). */
const PHONE_ICON_RING_BG = "";

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

function renderHeadingWithAccent(headingText) {
  const text = (headingText || "").trim();
  if (!text) return null;

  const accentWords = [
    "chimney",
    "chimneys",
    "service",
    "services",
    "repair",
    "cleaning",
    "inspection",
  ];
  const accentRegex =
    /\b(chimney|chimneys|service|services|repair|cleaning|inspection)\b/gi;
  const parts = text.split(accentRegex);

  return parts.map((part, idx) =>
    accentWords.includes(part.toLowerCase()) ? (
      <span key={`accent-${idx}`} className="text-[#f0520e]">
        {part}
      </span>
    ) : (
      <span key={`normal-${idx}`} className="text-white">
        {part}
      </span>
    ),
  );
}

export default function Banner22({ content }) {
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

  const phoneLink = phone ? `tel:${phone}` : "#";

  return (
    <>
    
    <FullContainer className="relative -mt-[82px] w-full overflow-hidden pt-[calc(82px+2.5rem)] md:-mt-[112px] md:pt-[calc(112px+3.5rem)]">
      <Image
        src={image}
        alt={data.altImage || banner.alt || "Hero"}
        fill
        className="absolute inset-0 object-cover object-center"
        sizes="100vw"
        priority
      />
      <div
        className="pointer-events-none absolute inset-0  bg-black/70"
        aria-hidden
      />
      <div
        className=""
        aria-hidden
      />
      <Container className="relative z-10 pt-2 pb-12 md:pt-0  md:pb-12 lg:pt-5 lg:pb-14 ">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-2 md:gap-4">
          <div className="min-w-0 pl-3 md:pl-5 lg:pl-8">
            <div className="mb-4 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2.5 sm:gap-x-5 sm:gap-y-3 md:gap-x-8 lg:gap-x-10">
              <div className="inline-flex w-fit max-w-full shrink-0 items-center gap-2 rounded-full border border-white/80 px-3 py-1.5 font-poppins text-xs font-medium uppercase tracking-widest text-white sm:gap-3 sm:px-4 sm:py-2 sm:text-sm md:text-[20px]">
                <div className="flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-full bg-[#f0520e] shadow-sm" />
                <span className="font-poppins">Let’s Call Connect</span>
              </div>

            </div>

            <h1 className="mt-4 text-3xl font-extrabold uppercase leading-[1.12] tracking-tight md:text-5xl lg:text-[52px]">
              {renderHeadingWithAccent(data?.heading || data?.title)}
            </h1>
            <div className="text-white font-poppins font-bold   text-[16px] md:text-[18px]">
              {data.tagline}
            </div>
            <p className="mt-4 max-w-[620px] text-base leading-relaxed text-white/90 md:text-lg">
              {data?.description}
            </p>

            {features?.length > 0 && (
              <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2.5  sm:grid-cols-2">
                {features.map((feature, idx) => {
                  const IconComponent = ICON_MAP[feature.icon];
                  return (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-white md:text-[15px]"
                    >
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-white/85 bg-white/10"
                        aria-hidden
                      >
                        {IconComponent ? (
                          <IconComponent
                            className="h-3 w-3 text-white"
                            strokeWidth={2.5}
                          />
                        ) : (
                          <Check
                            className="h-3 w-3 text-white"
                            strokeWidth={3}
                          />
                        )}
                      </span>
                      <span className="font-medium leading-snug">
                        {feature.text}
                        
                      </span>
                    
                    </li>
                  
                  );
                })}
              </ul>
            
            )}
             <div className="flex w-full max-w-[554px] pt-4 flex-wrap items-center justify-start gap-3 px-1">
             

             <a
               href={phoneLink}
               className="inline-flex min-h-[52px] items-center gap-2.5 text-white"
               aria-label={phone ? `Call ${phone}` : "Need help"}
             >
               <span className="inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#f0520e]">
                 <Image
                   src={"/st-icons/Temp13/call3.png"}
                   alt=""
                   width={24}
                   height={24}
                   className="h-[24px] w-[24px] object-contain"
                   aria-hidden
                 />
               </span>
               <span className="relative h-[46px]  w-[46px] shrink-0 overflow-hidden rounded-full border -ml-4 z-20 ">
                 <Image
                   src={"/st-icons/Temp13/profile.png"}
                   alt={data.altImage || banner.alt || "Support"}
                   fill
                   className="object-cover object-[60%_15%]"
                   sizes="46px"
                 />
               </span>
               <span className="flex flex-col leading-tight">
                 <span className="text-[15px] font-medium font-poppins">
                   Need Help?
                 </span>
                 <span className="text-[20px] font-bold leading-none font-poppin text-[#f0520e]">
                   {phone}
                 </span>
               </span>
             </a>
           </div>
          </div>

          <div className="mt-2 flex w-full min-w-0 flex-col items-start justify-center gap-4 md:mt-3 lg:items-end lg:justify-center">
            <div className="flex w-full justify-center">
              <QuoteForm22
                data={data}
                form_head={form_head}
                showArrowInButton={false}
              />
            </div>

            <div className="flex w-full max-w-[554px] flex-wrap items-center justify-center gap-3 px-1">
              ...
            </div>

           
          </div>
        </div>
      
      </Container>
    </FullContainer>
    <Cta22/>   
    </>
  );
}
