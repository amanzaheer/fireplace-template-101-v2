"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { ShieldCheck, Phone, Star } from "lucide-react";
import { Poppins } from "next/font/google";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { cn } from "@/lib/utils";
import QuoteForm16 from "./QuoteForm/QuoteForm16";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function renderWithBoldSegments(text) {
  if (text == null || typeof text !== "string") return null;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function Banner16({ content }) {
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
    title: banner.form_title,
    sub_title: banner.form_description,
    select_label: banner.form_select_label,
    select_options: banner.form_select_options,
    submit_label: banner.form_submit_label,
  };

  const features = resolveRefArray(content, banner, "features");

  const phone =
    banner.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";

  const ctaLabel = banner.cta_label;
  const rating = 5;
  const showFiveStars = banner.show_five_stars !== false;

  const line1 = (banner.heading || banner.title || "").trim();
  const line2 = (banner.tagline || "").trim();
  const description = (banner.description || "").trim();

  // Change these only when you want a new background style
  const bannerBgColor = "bg-[#c8b7a9]";
  const bannerOverlay =
    "bg-gradient-to-r from-black/55 via-black/35 to-black/10";

  return (
    <FullContainer
      id="banner"
      className={`relative w-full overflow-hidden ${bannerBgColor} ${poppins.className}`}
    >
      <div className={`absolute inset-0 w-full h-full ${bannerBgColor}`}>
        <Image
          src={image}
          title={data?.imageTitle || data?.title || "Banner"}
          alt={data?.altImage || data?.tagline || "Banner"}
          priority
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className={`pointer-events-none absolute inset-0 ${bannerOverlay}`}
        />
      </div>

      <Container className="relative z-10 py-20 md:py-24 lg:py-16">
        <div className="mx-auto flex w-full flex-col items-stretch gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-[84px]">
          <div className="min-h-0 flex w-full min-w-0 flex-1 flex-col items-center px-0 py-1 text-left md:px-0 lg:justify-start">
            <div className="mx-auto h-auto min-h-[80px] w-full max-w-[1000px] scale-x-105 scale-y-95 rounded-none border border-white/10 bg-black px-8 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
              {showFiveStars ? (
                <div
                  className="mb-3 inline-flex items-center justify-start gap-1"
                  role="img"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5 md:h-6 md:w-6",
                        i < rating
                          ? "fill-[#EFA536] text-[#FFC812]"
                          : "fill-neutral-200 text-neutral-200",
                      )}
                      strokeWidth={0}
                    />
                  ))}
                </div>
              ) : null}

              {line1 ? (
                <h1 className="text-balance text-xl font-bold uppercase leading-tight tracking-wide text-white md:text-2xl lg:text-3xl">
                  {line1}
                </h1>
              ) : null}

              {line2 ? (
                <p className="mt-1.5 text-balance text-2xl font-extrabold uppercase leading-[1.1] tracking-tight text-[#FF4811] md:text-3xl lg:text-4xl">
                  {line2}
                </p>
              ) : null}

              {description ? (
                <p className="mt-3 text-pretty text-[15px] font-medium leading-relaxed text-white/95 md:text-[16px]">
                  {description}
                </p>
              ) : null}

              {features?.length > 0 ? (
                <ul className="mt-4 space-y-3 md:mt-4 md:space-y-3.5">
                  {features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-[15px] font-medium leading-snug text-white md:text-[16px]"
                    >
                      <ShieldCheck
                        className="mt-0.5 h-6 w-6 shrink-0 text-[#FF4811]"
                        aria-hidden="true"
                        strokeWidth={2}
                      />
                      <span className="[&_strong]:font-bold [&_strong]:text-white">
                        {renderWithBoldSegments(feature?.text)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {phone ? (
              <div className="mt-5 flex justify-start md:mt-5">
                <a
                  href={`tel:${phone}`}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-none bg-[#FF4811] px-6 py-3 text-base font-bold text-white shadow-md transition hover:opacity-90 sm:w-auto"
                >
                  <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>{ctaLabel || phone}</span>
                </a>
              </div>
            ) : null}
          </div>

          <div className="w-full max-w-[380px] shrink-0 lg:w-[min(100%,380px)]">
            <QuoteForm16 form_head={form_head} showArrowInButton={false} />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
