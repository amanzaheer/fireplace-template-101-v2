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

const QuoteForm2 = dynamic(() => import("@/components/sections/Banner/QuoteForm/QuoteForm2"), {
  loading: () => (
    <div className="bg-white shadow-lg rounded-[15px] h-[400px] w-full md:w-[370px] animate-pulse" />
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

export default function Banner1({ content }) {
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

  return (
    <FullContainer
      id="banner"
      className="relative bg-white overflow-hidden w-full min-h-[520px] md:min-h-[600px] lg:min-h-[640px]"
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
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/55 to-black/20" />
      </div>

      <Container className="relative z-10 font-barlow py-10 md:py-14 lg:py-16">
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-10 text-white">
          <div className="relative w-full max-w-[640px]">
            <div className="w-full flex flex-col items-start justify-center">
              <div className="font-black max-w-[560px] inline-block uppercase text-[34px] sm:text-[42px] lg:text-[52px] leading-[1.04] text-left text-shadow-lg">
                {data?.heading || data?.title}
              </div>
              {data?.tagline ? (
                <h2 className="text-xl md:text-2xl uppercase font-extrabold leading-tight text-[#A8E6F3] text-left mt-2">
                  {data?.tagline}
                </h2>
              ) : null}

              <p className="text-base md:text-lg text-left mt-3 mb-2 text-white/90 max-w-[520px]">
                {data?.description}
              </p>
              {features?.length > 0 ? (
                <ul className="mb-6 w-fit space-y-1 md:space-y-1.5">
                  {features?.map((feature, idx) => {
                    const IconComponent = ICON_MAP[feature.icon];
                    return (
                      <li
                        key={idx}
                        className="flex items-center gap-2.5 text-white font-medium text-lg md:text-2xl"
                      >
                        {IconComponent ? (
                          <IconComponent className="w-5 h-5 text-[#c92028] shrink-0" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-[#c92028] shrink-0" />
                        )}
                        {feature.text}
                      </li>
                    );
                  })}
                </ul>
              ) : null}

              <div className="w-fit">
              <div className="flex flex-col gap-0.5 md:gap-1 justify-center items-center">
            <div className="text-xs">
              <a
                href={phone ? `tel:${phone}` : "#"}
                className="flex items-center justify-center sm:justify-start gap-2 px-5 lg:px-6 py-1.5 lg:py-2 rounded-full text-white font-semibold text-sm lg:text-lg shadow-lg hover:opacity-90 transition-all bg-[#c92028]"
              >
                <Phone className="w-3.5 h-3.5 lg:w-5 lg:h-5" />
                {phone}
              </a>
            </div>
          </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-fit max-w-[380px]">
            <div className="rounded-[18px] shadow-[0_16px_40px_rgba(0,0,0,0.32)] overflow-hidden">
              <div className="bg-white px-0 pb-0">
                <QuoteForm2
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
