"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import QuoteForm from "./QuoteForm8";
import {
  CheckCircle as CheckCircleIcon,
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
import { Poppins } from "next/font/google";
import { IMAGE_BASE } from "@/lib/constants";
import Navbar17CallButton from "@/components/sections/Navbar/Navbar17CallButton";


const poppin = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ICON_MAP = {
  Clock,
  Star,
  Shield,
  Award,
  CheckCircle: CheckCircleIcon,
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

export default function QuoteForm17({ banner, data, form_head, features }) {
  const formBackgroundImage =
    buildImageSrc(IMAGE_BASE, banner?.file_name) ||
    buildImageSrc(IMAGE_BASE, "hero/hero.webp");
  const phone = banner?.cta_phone ?? "";

  return (
    
    <div className="relative z-20 mx-auto mt-8 w-full max-w-5xl -mb-58 lg:w-[1005px]">
      <div className="absolute inset-0 rounded-[28px] bg-white" />
      <div className="relative flex flex-col gap-[14px] overflow-hidden rounded-[28px] bg-white p-[26px] shadow-2xl lg:h-[482px] lg:flex-row">
        <div className="relative flex min-h-[360px] items-end p-4 sm:p-5 md:min-h-[400px] md:p-6 lg:h-[428px] lg:min-h-[428px] lg:w-[471px] lg:shrink-0">
          {formBackgroundImage ? (
            <Image
              src={formBackgroundImage}
              alt={banner?.altImage || data?.altImage || "form background"}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 70vw"
            />
          ) : null}
          <div className="absolute inset-0 bg-black/15" />

          <div className="relative z-10 mx-auto w-full max-w-xl  rounded-xl bg-white/92 p-4 sm:p-5 md:p-6 [&_button]:!mt-1 [&_button]:!w-full [&_button]:!rounded-full [&_button]:!py-3 [&_button]:!font-bold [&_button_*]:!font-bold [&_input]:!placeholder-black [&_input]:placeholder-opacity-100 [&_textarea]:!placeholder-black [&_textarea]:placeholder-opacity-100">
            <h3
              className={`${poppin.className} mb-4 shrink-0 text-[clamp(1.25rem,4vw,1.5rem)] font-bold uppercase not-italic text-black`}
              style={{ color: "#000", lineHeight: "1.2" }}
            >
              {(banner?.cta_heading || "GET IN TOUCH WITH US").trim()}
            </h3>
            <QuoteForm
              data={data}
              form_head={form_head}
              showArrowInButton={false}
              compact
            />
          </div>
        </div>

        <div className="flex h-full flex-col justify-center bg-white px-4 py-5 sm:px-5 sm:py-6 md:px-6 md:py-7">
          {features?.length > 0 ? (
            <ul className="space-y-3">
              {features.map((feature, idx) => {
                const IconComponent = ICON_MAP[feature?.icon];
                return (
                  <li key={idx} className="flex items-center gap-2.5 ">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[2px] ">
                      {IconComponent ? (
                        <IconComponent className="h-5 w-5 text-[#ff0504]" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-white" />
                      )}
                    </span>
                    <span
                      className={`font-poppins text-[14px] font-normal leading-tight text-[#000]`}
                    >
                      {feature?.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : null}
          <div className="mt-6">
            <Navbar17CallButton phone={phone} />
          </div>
        </div>
      </div>
    </div>
   
  );
}
