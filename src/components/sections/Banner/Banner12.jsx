"use client";

import Image from "next/image";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { CheckCircle } from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import QuoteForm23 from "./QuoteForm/QuoteForm23";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const BANNER_BLUE = "#0088CC";
const BANNER_YELLOW = "#FFD700";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Banner23({ content }) {
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

  const overlayImage =
    buildImageSrc(IMAGE_BASE, banner.file_name2) ||
    buildImageSrc(IMAGE_BASE, banner.overlay_image) ||
    image;

  const form_head = {
    title: banner.form_title ?? "Get Your Free Quote",
    sub_title: banner.form_description ?? "",
  };

  const features = resolveRefArray(content, banner, "features");

  const featuresHeading =
    banner.features_heading ??
    banner.trust_heading ??
    banner.list_title ??
    "";

  const phone =
    banner.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";

  return (
    <FullContainer
      id="banner"
      className={`relative w-full overflow-hidden pt-[118px] ${poppins.className}`}
      style={{
        background: `linear-gradient(
          170deg,
          ${BANNER_BLUE} 0%,
          ${BANNER_BLUE} 62%,
          #000000 62%,
          #000000 100%
        )`,
      }}
    >
      {/* White floating dot */}
      <span
        className="pointer-events-none absolute right-[8%] top-[42%] z-[1] hidden h-4 w-4 rounded-full bg-white lg:block"
        aria-hidden
      />

      <Container className="relative z-10 px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:py-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-10 xl:gap-16">
          {/* LEFT CONTENT */}
          <div className="order-2 min-w-0 lg:order-1">
            <h1 className="text-3xl font-extrabold leading-[1.08] text-white sm:text-4xl md:text-[42px] lg:text-[52px]">
              {data?.heading || data?.title}
            </h1>

            {data?.tagline ? (
              <p className="mt-3 text-base font-medium leading-snug text-white/95 sm:text-lg md:text-xl">
                {data.tagline}
              </p>
            ) : null}

            {data?.description ? (
              <p className="mt-3 max-w-[560px] text-sm leading-relaxed text-white/85 sm:text-base">
                {data.description}
              </p>
            ) : null}

            {/* FORM */}
            <div className="mt-4 w-full max-w-[500px]">
              <QuoteForm23
                data={data}
                form_head={form_head}
                phone={phone}
                showArrowInButton={false}
              />
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative order-1 mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:order-2 lg:mx-0 lg:ml-auto lg:max-w-[470px] xl:max-w-[520px]">
            {/* MAIN OVAL IMAGE */}
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[999px] border-[6px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
              {image ? (
                <Image
                  src={image}
                  title={data?.imageTitle || data?.title || "Banner"}
                  alt={data?.altImage || data?.tagline || "Banner"}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 340px, 520px"
                />
              ) : (
                <div className="h-full w-full bg-neutral-800" />
              )}
            </div>

            {/* BOTTOM LEFT SMALL CIRCLE */}
            {overlayImage ? (
              <div className="absolute -bottom-4 left-4 z-20 h-[100px] w-[100px] overflow-hidden rounded-full border-[4px] border-white shadow-xl sm:h-[120px] sm:w-[120px]">
                <Image
                  src={overlayImage}
                  alt="Overlay"
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </div>
            ) : null}

            {/* TOP RIGHT SECOND CIRCLE */}
            {overlayImage ? (
              <div className="absolute top-10 -right-6 z-20 h-[70px] w-[70px] overflow-hidden rounded-full border-[4px] border-white shadow-xl sm:h-[90px] sm:w-[90px]">
                <Image
                  src={overlayImage}
                  alt="Decorative"
                  fill
                  className="object-cover"
                  sizes="90px"
                />
              </div>
            ) : null}
          </div>
        </div>

        {/* FEATURES SECTION */}
        {features?.length > 0 ? (
          <div className="mt-12 border-t border-white/10 pt-8 md:mt-14 md:pt-10">
            {featuresHeading ? (
              <h2
                className="text-center text-xl font-extrabold uppercase tracking-wide sm:text-2xl md:text-left md:text-3xl"
                style={{ color: BANNER_YELLOW }}
              >
                {featuresHeading}
              </h2>
            ) : null}

            <ul
              className={cn(
                "mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3",
                featuresHeading ? "" : "mt-0"
              )}
            >
              {features.map((feature, idx) => {
                const text =
                  typeof feature === "object" ? feature?.text : feature;

                if (!text) return null;

                return (
                  <li
                    key={idx}
                    className="flex items-center gap-2.5 text-sm font-medium text-white sm:text-base"
                  >
                    <CheckCircle
                      className="h-5 w-5 shrink-0 text-white"
                      strokeWidth={2.5}
                      aria-hidden
                    />

                    <span className="leading-snug">{text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </Container>
    </FullContainer>
  );
}