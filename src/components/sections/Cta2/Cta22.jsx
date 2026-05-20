"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Cta13CallNowButton } from "@/components/sections/Cta/Cta22";
import { IMAGE_BASE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const trimmed = filePath.trim();
  if (!trimmed) return "";
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/images/") ||
    trimmed.startsWith("/st-icons/")
  ) {
    return trimmed;
  }
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = trimmed.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function resolveImagePath(raw) {
  if (typeof raw !== "string" || !raw.trim()) return "";
  const trimmed = raw.trim();
  if (trimmed.startsWith("/images/") || trimmed.startsWith("/st-icons/")) {
    return trimmed;
  }
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return buildImageSrc(IMAGE_BASE, trimmed);
}

function resolveBlockImage(block, ...keys) {
  if (!block || typeof block !== "object") return "";
  const fields =
    keys.length > 0
      ? keys
      : ["file_name", "image", "src", "overlay_image"];
  for (const key of fields) {
    const src = resolveImagePath(block[key]);
    if (src) return src;
  }
  return "";
}

export default function Cta22({ content }) {
  const block = content?.cta2 ?? {};
  const ctaBgBlock = content?.cta ?? {};

  const title =
    typeof block.title === "string" && block.title.trim()
      ? block.title.trim()
      : "";
  const description =
    typeof block.description === "string" && block.description.trim()
      ? block.description.trim()
      : "";

  const phone =
    (typeof block.phone === "string" && block.phone.trim()) ||
    content?.banner?.cta_phone ||
    content?.contact_info?.phone ||
    content?.navbar?.phone ||
    "";

  const phoneDisplay = typeof phone === "string" ? phone.trim() : "";
  /** Rounded-frame background: cta2.file_name2 first, then cta fallback */
  const bgFrameSrc =
    resolveBlockImage(
      block,
      "file_name2",
      "image2",
      "file_name_2",
      "bg_image",
    ) || resolveBlockImage(ctaBgBlock, "image", "file_name", "src");
  /** Foreground cutout on top of bg */
  const overlaySrc = resolveBlockImage(block, "file_name", "overlay_image");

  const hasImages = !!(bgFrameSrc || overlaySrc);

  if (!title && !description && !phoneDisplay && !hasImages) {
    return null;
  }

  return (
    <FullContainer id="cta2" className="bg-white py-8 md:py-12 lg:py-14">
      <Container className="px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            poppins.className,
            "relative mx-auto flex max-w-[1180px] flex-col overflow-hidden rounded-[32px] bg-[#f0520e] shadow-[0_18px_50px_rgba(240,82,14,0.28)]",
            "lg:min-h-[340px] lg:flex-row lg:items-stretch lg:overflow-visible",
          )}
        >
          {/* Left — copy + call */}
          <div className="relative z-20 flex flex-1 flex-col justify-center px-6 py-8 sm:px-8 md:px-10 lg:max-w-[52%] lg:py-10 lg:pr-4">
            {title ? (
              <h2 className="text-[26px] font-bold leading-[1.2]   text-white sm:text-[30px] md:text-[34px] lg:text-[38px]">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-4 max-w-xl text-[14px] font-normal leading-[1.65] text-white/95 sm:text-[15px] md:mt-5 md:text-[16px] md:leading-[1.7]">
                {description}
              </p>
            ) : null}
            {phoneDisplay ? (
              <div className="mt-6 md:mt-8  flex justify-center md:justify-start">
                <Cta13CallNowButton
                  phone={phoneDisplay}
                  wrapperClassName="flex justify-start"
                />
              </div>
            ) : null}
          </div>

          {/* Right — bg (cta2.file_name2) + overlay (cta2.file_name) */}
          {hasImages && (
            <div className="relative w-full min-h-[240px] shrink-0 sm:min-h-[280px] lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-[30%] lg:min-h-0">
              {bgFrameSrc ? (
                <div className="absolute inset-x-4 top-4 bottom-3 z-0 overflow-hidden rounded-[22px] sm:inset-x-5 sm:bottom-4 lg:inset-x-auto lg:right-8 lg:top-6 lg:bottom-6 lg:w-[78%]">
                  <Image
                    src={bgFrameSrc}
                    alt={title ? `${title} background` : "Service background"}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 420px"
                    unoptimized={bgFrameSrc.startsWith("/api/image")}
                  />
                </div>
              ) : null}

              {overlaySrc ? (
                <div
                  className={cn(
                    "pointer-events-none absolute bottom-0 z-10 hidden",
                    "lg:left-[-12%] lg:block lg:h-[125%] lg:w-[76%] lg:max-w-none",
                  )}
                >
                  <Image
                    src={overlaySrc}
                    alt={title ? `${title} technician` : "Service expert"}
                    fill
                    className={cn(
                      "object-contain object-bottom",
                      "lg:object-left-bottom lg:-translate-x-[30%]",
                    )}
                    sizes="(max-width: 1024px) 72vw, 520px"
                    unoptimized={overlaySrc.startsWith("/api/image")}
                    priority
                  />
                </div>
              ) : null}
            </div>
          )}
        </div>
      </Container>
    </FullContainer>
  );
}
