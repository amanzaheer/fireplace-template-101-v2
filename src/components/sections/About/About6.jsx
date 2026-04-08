"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Rubik, Inter, Poppins } from "next/font/google";

const PANEL_BG = "#121212";
const ACCENT = "#D35400";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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

export default function About6({ content }) {
  const about = content?.about ?? {};
  const points = Array.isArray(about.points) ? about.points : [];
  const data = {
    heading: about.heading,
    description1: about.description1,
    description2: about.description2,
    points,
  };
  const image =
    buildImageSrc(IMAGE_BASE, about.file_name) ||
    buildImageSrc(IMAGE_BASE, "about/about.webp");
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const telHref = phone ? `tel:${String(phone).replace(/\s/g, "")}` : "";

  return (
    <FullContainer className="bg-gray-50 py-10 md:py-14" id="about">
      <Container className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid min-h-0 grid-cols-1 overflow-hidden rounded-xl shadow-xl lg:grid-cols-2 lg:min-h-[420px]">
          {/* Image — top on mobile, right on desktop */}
          <div className="relative order-1 min-h-[260px] w-full sm:min-h-[300px] lg:order-2 lg:min-h-0 lg:h-full">
            {image ? (
              <Image
                title="About Image"
                src={image}
                alt={about.altImage ?? about.heading ?? "About"}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 bg-neutral-700" />
            )}
          </div>

          {/* Copy + CTA — black panel */}
          <div
            className="order-2 flex flex-col justify-center px-8 py-10 sm:px-10 sm:py-12 md:px-12 md:py-14 lg:order-1 lg:px-14 lg:py-16"
            style={{ backgroundColor: PANEL_BG }}
          >
            {data.heading ? (
              <h2 className="mb-4 text-2xl font-bold leading-tight text-white md:text-3xl">
                {data.heading}
              </h2>
            ) : null}

            <div className="space-y-4 text-base leading-[1.6] text-white md:text-lg">
              {data.description1 ? <p>{data.description1}</p> : null}
              {data.description2 ? <p>{data.description2}</p> : null}
            </div>

            {data.points.length > 0 ? (
              <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-6">
                {data.points.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-white/90 md:text-base"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: ACCENT }}
                      aria-hidden
                    />
                    {String(point)}
                  </li>
                ))}
              </ul>
            ) : null}

            {phone ? (
              <Link
                href={telHref}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-md px-5 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: ACCENT, outlineColor: ACCENT }}
              >
                <Phone className="h-5 w-5 shrink-0 text-white" strokeWidth={2.25} aria-hidden />
                {phone}
              </Link>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
