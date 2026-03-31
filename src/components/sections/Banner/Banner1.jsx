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

const QuoteForm = dynamic(() => import("@/components/common/QuoteForm"), {
  loading: () => (
    <div className="bg-white shadow-lg rounded-md h-[400px] w-full md:w-[360px] animate-pulse" />
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
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";

  return (
    <FullContainer className="w-full bg-[#0b2a57] overflow-hidden relative">

      {/* BACKGROUND DESIGN */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 w-[48%] h-full bg-gradient-to-br from-[#0b2a57] to-[#052046]" />
        <div className="absolute left-[-220px] top-[-160px] w-[520px] h-[520px] bg-[#f07a13] rotate-45" />
      </div>

      <Container className="relative z-10 py-14 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div className="pl-4 md:pl-10 lg:pl-16">

            {/* CONTACT */}
            <div className="flex items-center gap-3 text-white/80 text-xs font-bold uppercase tracking-widest mb-2">
              <div className="w-8 h-8 bg-[#0a2042] flex items-center justify-center rounded-md">
                <Phone className="w-4 h-4 text-white" />
              </div>
              Contact
            </div>

            <a
              href={phone ? `tel:${phone}` : "#"}
              className="text-white text-4xl font-extrabold leading-tight"
            >
              {phone}
            </a>

            {/* HEADING */}
            <h1 className="mt-3 text-white font-extrabold uppercase text-[48px] md:text-[56px] leading-[1.1] tracking-tight">
              {data?.heading || data?.title}
            </h1>

            {/* TAGLINE */}
            {data?.tagline && (
              <h2 className="text-xl md:text-2xl uppercase font-bold text-[#f07a13] mt-2">
                {data.tagline}
              </h2>
            )}

            {/* DESCRIPTION */}
            <p className="text-white/90 text-base md:text-lg mt-4 mb-4">
              {data?.description}
            </p>

            {/* FEATURES */}
            {features?.length > 0 && (
              <ul className="space-y-3">
                {features.map((feature, idx) => {
                  const IconComponent = ICON_MAP[feature.icon];
                  return (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-white text-sm"
                    >
                      <span className="w-5 h-5 bg-[#f07a13] flex items-center justify-center rounded-sm mt-1">
                        {IconComponent ? (
                          <IconComponent className="w-4 h-4 text-white" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </span>
                      {feature.text}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex justify-center lg:justify-end">

            {/* IMAGE */}
            <div className="absolute inset-0 hidden lg:block">
              <Image
                src={image}
                alt="banner"
                fill
                className="object-cover object-right rounded-md opacity-90"
              />
            </div>

            {/* FORM */}
            <div className="relative w-full max-w-[360px] bg-white rounded-md shadow-lg overflow-hidden">
              <div className="bg-[#0b2a57] text-white text-center py-3 font-extrabold uppercase text-sm tracking-wide">
                {form_head.title}
              </div>

              <div className="p-4">
                <QuoteForm
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