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
import QuoteForm9 from "./QuoteForm/QuoteForm9";

const ACCENT = "#F0A535";

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

export default function Banner24({ content }) {
  const banner = content?.banner ?? {};

  const data = {
    title: banner.title,
    label:banner.label,
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
    <FullContainer className="relative -mt-[82px] w-full overflow-hidden pt-[calc(82px+2.5rem)] md:-mt-[112px] md:pt-[calc(112px+3.5rem)]">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#3F269A] via-[#3d4cab] to-[#2B6CB0]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-full max-w-[85%] opacity-[0.22] [-webkit-mask-image:linear-gradient(to_right,black_0%,black_38%,transparent_78%)] [mask-image:linear-gradient(to_right,black_0%,black_38%,transparent_78%)] sm:max-w-[72%] md:max-w-[62%] lg:max-w-[54%]"
        aria-hidden
      >
        <Image
          src={image}
          alt={data.altImage || banner.alt || "Hero"}
          fill
          className="object-cover object-[68%_center] grayscale sm:object-[62%_center]"
          sizes="(max-width: 768px) 75vw, (max-width: 1024px) 56vw, 48vw"
          priority
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/[0.07] via-transparent to-transparent"
        aria-hidden
      />

      <Container className="relative z-10 py-12 md:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0 pl-3 md:pl-5 lg:pl-8">
            <div className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#EFA536] shadow-sm">
                <Phone className="h-4 w-4 text-[#000] capitalize" strokeWidth={2.25} />
              </div>
              {data.label}
            </div>

            <a
              href={phone ? `tel:${phone}` : "#"}
              className="text-3xl font-extrabold leading-tight text-white md:text-4xl"
            >
              {phone}
            </a>

            <h1 className="mt-4 text-3xl font-extrabold uppercase leading-[1.12] tracking-tight text-white md:text-5xl lg:text-[52px]">
              {data?.heading || data?.title}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-white/90 md:text-lg">
              {data?.description}
            </p>

            {features?.length > 0 && (
              <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
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
          </div>

          <div className="flex w-full min-w-0 justify-center lg:justify-end">
            <QuoteForm9
              data={data}
              form_head={form_head}
              showArrowInButton={false}
            />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
