"use client";
import { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import QuoteForm18 from "./QuoteForm/QuoteForm18";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const SCROLL_OFFSET = 100;
const ACCENT = "#F0A535";
const CALL_ICON_SRC = "/st-icons/Temp13/call2.png";

function scrollToWorkingProcessForm() {
  const el =
    document.querySelector("#working_process #quote-form-section") ??
    document.getElementById("working_process") ??
    document.getElementById("quote-form-section") ??
    document.getElementById("contact-us");
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
  return true;
}
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
      <span key={`accent-${idx}`} className="text-[#FF0011]">
        {part}
      </span>
    ) : (
      <span key={`normal-${idx}`} className="text-white">
        {part}
      </span>
    ),
  );
}
export default function Banner18({ content }) {
  const router = useRouter();
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

  const handleGetStartedClick = useCallback(() => {
    if (scrollToWorkingProcessForm()) return;
    router.push("/#working_process");
    setTimeout(() => scrollToWorkingProcessForm(), 500);
  }, [router]);

  return (
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

            </div>

            <h1 className="mt-4 text-3xl font-normal uppercase leading-[1.12]   tracking-tight font-poppins md:text-[55px] lg:text-[52px]">
              {renderHeadingWithAccent(data?.heading || data?.title)}
            </h1>
            <div className="text-white font-poppins font-normal font-roboto   text-[16px] md:text-[20px]">
              {data.tagline}
            </div>
            <p className="mt-4 max-w-[620px] text-base leading-relaxed font-normal text-white/90 md:text-[16px] font-roboto">
              {data?.description}
            </p>
            <button
              type="button"
              onClick={handleGetStartedClick}
              className="inline-flex w-fit max-w-full shrink-0 cursor-pointer items-center mt-4 gap-2 rounded bg-[#FF0011] px-3 py-1.5 font-poppins text-xs font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-90 sm:gap-3 sm:px-4 sm:py-2 sm:text-sm md:text-[20px]"
              aria-label="Get started — go to contact form"
            >
                <div className="flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-full bg-[#FF0011] shadow-sm" />
                <span className="font-poppins">GET STARTED</span>
              </button>

          {/* {features?.length > 0 && (
              <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2.5  border sm:grid-cols-2">
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
            
            )} */}
             <div className="flex w-full max-w-[554px] pt-4 flex-wrap items-center justify-start gap-3 px-1">
             <a
               href={phoneLink}
               className="inline-flex min-h-[52px] items-center gap-2.5 text-white"
               aria-label={phone ? `Call ${phone}` : "Need help"}
             >
               <span className="inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#FF0011]">
                 <Image
                   src={"/st-icons/Temp18/phone.png"}
                   alt=""
                   width={24}
                   height={24}
                   className="h-[24px] w-[24px] object-contain"
                   aria-hidden
                 />
               </span>
               
               <span className="flex flex-col leading-tight">
                 <span className="text-[15px] font-medium font-poppins">
                   Need Help?
                 </span>
                 <span className="text-[20px] font-bold leading-none font-poppin text-[#FF0011]">  
                   {phone}
                 </span>
               </span>
             </a>
           </div>
          
          </div>
          <div className="mt-2 flex w-full min-w-0 flex-col items-start justify-center gap-4 md:mt-3 lg:items-end lg:justify-center">
            <div className="flex w-full justify-center">
              {/* <QuoteForm18
                data={data}
                form_head={form_head}
                showArrowInButton={false}
              /> */}
            </div>
          </div>
          
        </div>
        
      
      </Container>
    </FullContainer>
  );
}
