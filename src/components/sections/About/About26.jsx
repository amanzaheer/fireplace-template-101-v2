"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, ShieldCheck } from "lucide-react";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const ACCENT_RED = "#D32F2F";
const TEXT_BLACK = "#0B0B0B";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function telHref(phone) {
  if (!phone) return "#";
  const digits = String(phone).replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "#";
}

export default function About26({ content }) {
  const about = content?.about ?? {};
  const heading = about.heading ?? "";
  const description1 = about.description1 ?? "";
  const description2 = about.description2 ?? "";
  const label = about.label ?? "";
  const points = Array.isArray(about.points)
    ? about.points.filter(Boolean)
    : [];
  const image =
    buildImageSrc(IMAGE_BASE, about.file_name) ||
    buildImageSrc(IMAGE_BASE, "about/about.webp");
  const phone =
    content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  return (
    <FullContainer
      id="about"
      className={cn("bg-white py-10 md:py-14 lg:py-16", poppins.className)}
    >
      <Container className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[4px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] lg:mx-0 lg:max-w-none">
              <div className="relative min-h-[300px] sm:min-h-[380px] lg:min-h-[460px]">
                {image ? (
                  <Image
                    src={image}
                    alt={about.alt || heading || ""}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  /> 
                ) : (
                  <div className="h-full w-full bg-gray-200" />
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 flex flex-col items-start text-left lg:order-2">
            {label ? (
              <p
                className="mb-3 text-sm font-semibold uppercase tracking-[0.18em]"
                style={{ color: ACCENT_RED }}
              >
                {label}
              </p>
            ) : null}

            {heading ? (
              <h2
                className="mb-6 max-w-xl text-[30px] font-extrabold leading-[1.12] tracking-tight sm:text-[36px] lg:text-[42px]"
                style={{ color: TEXT_BLACK }}
              >
                {heading}
              </h2>
            ) : null}

            <div className="max-w-xl space-y-4">
              {description1 ? (
                <p className="text-[15px] leading-relaxed text-black/80 sm:text-base">
                  {description1}
                </p>
              ) : null}
              {description2 ? (
                <p className="text-[15px] leading-relaxed text-black/80 sm:text-base">
                  {description2}
                </p>
              ) : null}
            </div>

            {points.length > 0 ? (
              <ul className="mt-6 grid w-full max-w-xl grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {points.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2.5 text-[14px] font-medium text-black sm:text-[15px]"
                  >
                    <span
                      className="relative mt-0.5 inline-block h-4 w-4 shrink-0"
                      aria-hidden
                    >
                      <ShieldCheck
                        className="absolute left-[12.5%] right-[12.5%] top-[4.17%] bottom-[4.17%] h-full w-full text-black"
                        strokeWidth={2.5}
                      />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {phone ? (
              <div className="mt-8">
                <Link
                  href={telHref(phone)}
                  className="inline-flex max-w-full items-center justify-center gap-2.5 rounded-2xl px-6 py-3.5 text-base font-bold text-white shadow-lg transition-colors hover:opacity-90 sm:px-8 sm:text-lg"
                  style={{ backgroundColor: ACCENT_RED }}
                >
                  <Phone className="h-5 w-5 shrink-0" strokeWidth={2.5} aria-hidden />
                  <span>{phone}</span>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
