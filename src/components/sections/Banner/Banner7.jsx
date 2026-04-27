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

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const QuoteForm7 = dynamic(
  () => import("@/components/sections/Banner/QuoteForm/QuoteForm7"),
  {
    loading: () => (
      <div className="bg-white/90 shadow-lg rounded-[14.8px] h-[370px] w-[320px] max-w-full animate-pulse" />
    ),
    ssr: false,
  },
);

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Banner7({ content }) {
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
  const overlayImage = buildImageSrc(IMAGE_BASE, banner.file_name2);
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

  return (
    <FullContainer
      id="banner"
      className="relative bg-white overflow-hidden w-full min-h-[550px]"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src={image}
          title={data?.imageTitle || data?.title || "Banner"}
          alt={data?.altImage || data?.tagline || "No Banner Found"}
          priority
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        {overlayImage ? (
          <div className="absolute inset-y-0 right-0 z-30 hidden w-[42%] lg:block pointer-events-none mr-30">
            <Image
              src={overlayImage}
              alt={data?.altImage || "Banner overlay"}
              fill
              sizes="42vw"
              style={{
                objectFit: "contain",
                objectPosition: "right bottom",
              }}
              unoptimized
            />
          </div>
        ) : null}
      </div>
       
      <Container className="relative z-10 font-barlow py-8 md:py-10 lg:py-0 mt-8 md:mt-2 lg:mt-1">
        <div className="w-full min-h-[450px] flex flex-col lg:flex-row items-center justify-start gap-8 lg:gap-0 text-white">
          <div className="relative w-full max-w-[640px] lg:-mt-6">
            <div className="w-full flex flex-col items-center justify-center lg:items-start lg:justify-start">
              <a
                href={phone ? `tel:${phone}` : "#"}
                className={`${poppins.className} group mb-3 md:mb-4 inline-flex w-auto max-w-max flex-nowrap items-center justify-center gap-3 rounded-full border border-white/25 bg-[#ff4d4d] px-5 py-3 text-white shadow-[inset_0_4px_6px_rgba(0,0,0,0.35),inset_0_-4px_6px_rgba(0,0,0,0.35)] transition-opacity hover:opacity-95 sm:justify-start sm:px-8 sm:py-3.5`}
              >
                <Image
                  src="/st-icons/Temp7/call1.1.png"
                  alt="altimage"
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
              <h1
                className={`${poppins.className} font-black uppercase text-[40px] mt-1 md:mt-2 lg:mt-2 sm:text-[40px] lg:text-[50px] leading-[0.95] text-white text-center lg:text-left max-w-[15ch]`}
              >
                {data?.heading || data?.title}
              </h1>

              {features?.length > 0 ? (
                <ul className="mt-5 md:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  {features?.map((feature, idx) => {
                    const IconComponent = ICON_MAP[feature.icon];
                    return (
                      <li
                        key={idx}
                        className={`${inter.className} flex items-center gap-2 text-white font-medium text-base md:text-xl text-[14px] md:text-[16px] leading-tight`}
                      >
                        {IconComponent ? (
                          <IconComponent className="w-5 h-5 text-white shrink-0" />
                        ) : null}
                        {feature.text}
                      </li>
                    );
                  })}
                </ul>
              ) : null}
              <a
                href={phone ? `tel:${phone}` : "#"}
                className={`${poppins.className} group mb-0 md:mb-5 inline-flex w-auto border mt-6 md:mt-8 lg:mt-8 max-w-max flex-nowrap items-center justify-center gap-3 rounded-full border-white/25 bg-[#3e8aea] px-5 py-3 text-white shadow-[inset_0_2px_0_rgba(255,255,255,0.12),inset_0_-2px_0_rgba(0,0,0,0.12)] transition-opacity hover:opacity-95 sm:justify-start sm:px-8 sm:py-3.5`}
              >
                <Image
                  src="/st-icons/Temp7/call1.1.png"
                  alt=""
                  width={32}
                  height={32}
                  className="h-7 w-auto shrink-0 sm:h-8"
                  unoptimized
                />
                <span className="min-w-0 text-left text-[14px] font-extrabold leading-none tracking-tight sm:text-[16px] md:text-[18px] lg:text-[19px]">
                  <span className="whitespace-nowrap">
                    <span className="uppercase">Get Your Offer Today</span>
                  </span>
                </span>
              </a>
            </div>
          </div>
          <div className="w-full lg:w-auto flex justify-center lg:justify-left lg:pr-8 xl:pr-16">
            <div className="overflow-hidden">
              <div className="bg-transparent px-0 pb-10">
                <QuoteForm7
                  data={data}
                  form_head={form_head}
                  showArrowInButton={false}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
