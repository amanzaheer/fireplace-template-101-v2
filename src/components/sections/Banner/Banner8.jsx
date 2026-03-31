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

const QuoteForm = dynamic(() => import("./QuoteForm/QuoteForm8"), {
  loading: () => (
    <div className="bg-white shadow-lg rounded-md h-[400px] w-120px md:w-[360px] animate-pulse" />
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

  const headingText = data?.heading || data?.title || "CHIMNEY SERVICES";
  const headingWords = String(headingText).trim().split(/\s+/).filter(Boolean);
  const splitIndex = Math.max(1, Math.ceil(headingWords.length / 2));
  const headingTop = headingWords.slice(0, splitIndex).join(" ");
  const headingBottom = headingWords.slice(splitIndex).join(" ");

  return (
    <FullContainer className="relative w-full overflow-hidden bg-[#08285a]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#061f4a] via-[#072a62] to-[#072b5f]" />
        <div className="absolute left-0 top-0 h-full w-[120px] bg-[#f57a0a] [clip-path:polygon(0_0,100%_0,52%_100%,0_100%)]" />
        <div className="absolute left-[58px] top-[90px] h-[118px] w-[152px] bg-[#f57a0a] [clip-path:polygon(0_20%,90%_0,100%_52%,16%_100%)] opacity-95" />
        <div className="absolute left-[138px] top-[172px] h-[62px] w-[88px] bg-[#f57a0a] [clip-path:polygon(0_26%,86%_0,100%_62%,16%_100%)] opacity-90" />
      </div>

      <Container className="relative z-10 pt-4 pb-0 md:pt-6">
        <div className="grid items-stretch gap-5 md:gap-7 lg:grid-cols-2">

          <div className="pb-3 pl-3 pt-4 md:pl-8 md:pt-8 lg:pl-12 xl:pl-14">
            <div className="flex items-center gap-2 text-white/90 text-xs font-semibold uppercase tracking-[0.12em] mb-1.5">
              <div className="w-5 h-5 bg-[#f57a0a] flex items-center justify-center rounded-[2px]">
                <Phone className="w-4 h-4 text-white" />
              </div>
              Contact
            </div>

            <a
              href={phone ? `tel:${phone}` : "#"}
              className="text-white text-[44px] md:text-[56px] font-extrabold leading-[1.04]"
            >
              {phone}
            </a>

            <h1 className="mt-3 text-white font-extrabold uppercase text-[50px] md:text-[62px] leading-[0.98] tracking-tight">
              {headingTop}
            </h1>
            <div className="mt-2 inline-block bg-[#f57a0a] px-4 md:px-5 py-1.5 md:py-2">
              <span className="text-white font-extrabold uppercase text-[46px] md:text-[58px] leading-none">
                {headingBottom || headingTop}
              </span>
            </div>

            <div className="mt-6 flex flex-col items-start gap-4 md:mt-7 md:gap-5 sm:flex-row sm:items-stretch">
              {features?.length > 0 && (
                <ul className="w-full space-y-2 rounded-md border border-white/15 bg-[#0a2f67] p-3 sm:max-w-[248px]">
                  {features.map((feature, idx) => {
                    const IconComponent = ICON_MAP[feature.icon];
                    return (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-white text-sm"
                      >
                        <span className="w-5 h-5 bg-[#f57a0a] flex items-center justify-center rounded-sm mt-0.5 flex-shrink-0">
                          {IconComponent ? (
                            <IconComponent className="w-3.5 h-3.5 text-white" />
                          ) : (
                            <CheckCircle className="w-3.5 h-3.5 text-white" />
                          )}
                        </span>
                        <span>{feature.text}</span>
                      </li>
                    );
                  })}
                </ul>
              )}

              <div className="w-full overflow-hidden rounded-md border border-[#e8edf7] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.35)] sm:max-w-[340px]">
                <div className="bg-[#0b2a57] text-white text-center py-2.5 font-extrabold uppercase text-sm tracking-wide">
                  {form_head.title}
                </div>

                <div className="p-3 md:p-3.5">
                  <QuoteForm
                    data={data}
                    form_head={form_head}
                    showArrowInButton={false}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[330px] md:min-h-[460px] lg:min-h-[610px]">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={image}
                alt={data?.altImage || "banner"}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center md:object-left"
              />
            </div>
          </div>

        </div>
      </Container>
    </FullContainer>
  );
}