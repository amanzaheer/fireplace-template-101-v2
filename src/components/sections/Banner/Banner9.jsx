"use client";

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

export default function Banner9({ content }) {
  const banner = content?.banner ?? {};

  /** Same `data` shape as Banner1 — drives hero copy + QuoteForm9. */
  const data = {
    title: banner.title,
    tagline: banner.tagline,
    description: banner.description,
    heading: banner.heading,
    list: banner.list,
    imageTitle: banner.imageTitle,
    altImage: banner.altImage ?? banner.alt,
  };

  const image =
    buildImageSrc(IMAGE_BASE, banner.file_name) ||
    buildImageSrc(IMAGE_BASE, "hero/hero.webp");

  const formLabels = content?.form_labels ?? {};

  /** Same defaults as Banner1 `form_head`. */
  const form_head = {
    title: banner.form_title || "Get Your Free Quote",
    sub_title: banner.form_description || "10% Off for Online Booking",
  };

  const phoneHelpLabel =
    (typeof banner.label === "string" && banner.label.trim()) ||
    (typeof banner.need_help_label === "string" && banner.need_help_label.trim()) ||
    "";

  const features = resolveRefArray(content, banner, "features");

  const phone =
    banner.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";

  const phoneHref = phone ? `tel:${phone}` : "#";

  const ctaAvatarPath =
    typeof banner.cta_avatar === "string" && banner.cta_avatar.trim()
      ? banner.cta_avatar.trim()
      : "";
  const ctaAvatarSrc = ctaAvatarPath ? buildImageSrc(IMAGE_BASE, ctaAvatarPath) : "";

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
          title={data?.imageTitle || data?.title || "Banner"}
          alt={data?.altImage || data?.tagline || "No Banner Found"}
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
            <h1 className="text-3xl font-extrabold uppercase leading-[1.12] tracking-tight text-white md:text-5xl lg:text-[52px]">
              {data?.heading || data?.title}
            </h1>

            {data?.tagline && (
              <h2
                className="mt-3 text-xl font-bold uppercase md:text-2xl"
                style={{ color: ACCENT }}
              >
                {data.tagline}
              </h2>
            )}

            {data?.description ? (
              <p className="mt-4 text-base leading-relaxed text-white/90 md:text-lg">
                {data.description}
              </p>
            ) : null}

            {features?.length > 0 && (
              <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {features.map((feature, idx) => {
                  const iconKey =
                    typeof feature?.icon === "string"
                      ? feature.icon.trim()
                      : "";
                  const IconComponent = ICON_MAP[iconKey] ?? CheckCircle;

                  return (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-white md:text-[15px]"
                    >
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-white/85 bg-white/10"
                        aria-hidden
                      >
                        <IconComponent
                          className="h-3 w-3 text-white"
                          strokeWidth={2.5}
                        />
                      </span>

                      <span className="font-medium leading-snug">
                        {feature.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}

            {(phone || phoneHelpLabel || ctaAvatarSrc) && (
              <div className="mt-8 flex min-w-0 items-center gap-3 sm:mt-10 sm:gap-4">
                <div className="relative flex shrink-0 items-center">
                  <div
                    className="relative z-1 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#EFA536] shadow-md"
                    aria-hidden
                  >
                    <Phone
                      className="h-6 w-6 text-white"
                      strokeWidth={2.25}
                    />
                  </div>

                  {ctaAvatarSrc ? (
                    <div className="relative z-2 -ml-3 h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full border-[3px] border-white shadow-md md:-ml-3.5">
                      <Image
                        src={ctaAvatarSrc}
                        alt={
                          banner.cta_avatar_alt ||
                          data.altImage ||
                          banner.alt ||
                          ""
                        }
                        fill
                        className="object-cover"
                        sizes="52px"
                      />
                    </div>
                  ) : null}
                </div>

                <div className="min-w-0 flex-1">
                  {phoneHelpLabel ? (
                    <p className="text-sm font-medium leading-snug text-white/90 md:text-[15px]">
                      {phoneHelpLabel}
                    </p>
                  ) : null}

                  <a
                    href={phoneHref}
                    className={`block font-extrabold leading-tight text-white md:text-4xl ${
                      phoneHelpLabel ? "mt-0.5 text-2xl" : "text-3xl md:text-4xl"
                    }`}
                  >
                    {phone}
                  </a>
                </div>
              </div>
            )}

          </div>

          <div className="flex w-full min-w-0 justify-center lg:justify-end">
            <QuoteForm9
              data={data}
              form_head={form_head}
              form_labels={formLabels}
              showArrowInButton={false}
            />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}