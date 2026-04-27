"use client";

import React from "react";
import Image from "next/image";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Poppins, Inter, Rubik } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const contentStyles =
  "[&_h1]:text-[#212020] [&_h1]:font-bold [&_h1]:text-3xl md:[&_h1]:text-4xl [&_h1]:mb-3 " +
  "[&_h2]:text-[#212020] [&_h2]:font-bold [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:mb-3 [&_h2]:mt-4 " +
  "[&_h3]:text-[#212020] [&_h3]:font-semibold [&_h3]:text-xl [&_h3]:mb-2 [&_h3]:mt-3 " +
  "[&_p]:text-[#6e6e6e] [&_p]:text-[16px] [&_p]:leading-[21px] [&_p]:mb-3 " +
  "[&_li]:text-[#6e6e6e] [&_li]:text-[16px] [&_li]:leading-[21px] " +
  "[&_ul]:pl-5 [&_ul]:list-disc [&_ul]:mb-3 [&_ol]:pl-5 [&_ol]:list-decimal [&_ol]:mb-3 " +
  "[&_strong]:text-[#212020] [&_strong]:font-semibold " +
  "[&_a]:text-[#f59403] [&_a]:underline";

function PhoneCallIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        fill="currentColor"
        d="M1 2h8.58l1.487 6.69l-1.86 1.86a14.1 14.1 0 0 0 4.243 4.242l1.86-1.859L22 14.42V23h-1a19.9 19.9 0 0 1-10.85-3.196a20.1 20.1 0 0 1-5.954-5.954A19.9 19.9 0 0 1 1 3z"
      />
    </svg>
  );
}

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function ServiceDescription4({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  if (!content?.service_description?.description) return null;

  const title = content?.service_description?.title ?? "Our Service";

  const description =
    content?.service_description?.description ||
    "Professional, reliable service from experienced local technicians.";

  const imageSrc = content?.service_description?.file_name
    ? buildImageSrc(IMAGE_BASE, content?.service_description?.file_name)
    : buildImageSrc(IMAGE_BASE, "hero/hero.webp");

  return (
    <FullContainer id="service_description" className="py-10 md:py-14 bg-white">
      <Container>
        <div className="max-w-6xl mx-auto">
          <h2 className={`${poppins.className} text-3xl md:text-5xl font-extrabold tracking-tight text-[#212020] text-center mb-8 md:mb-10`}>
            {title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 order-2 md:order-1">
              <div
                className={`${inter.className} ${contentStyles} w-full text-left`}
                dangerouslySetInnerHTML={{ __html: md.render(description) }}
              />
              {phone ? (
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={`tel:${phone}`}
                  className={`${rubik.className} inline-flex max-w-full items-center justify-center gap-2 bg-[#212020] text-white uppercase tracking-wide font-bold px-7 py-3 text-sm hover:bg-[#111827] transition-colors duration-200`}
                  >
                    Call Us Today
                    <span aria-hidden="true">→</span>
                  </a>
                  <a
                    href={`tel:${phone}`}
                  className={`${rubik.className} inline-flex max-w-full items-center justify-center gap-2 bg-[#f59402] text-white font-bold px-6 py-3 text-base hover:bg-[#bf1f1f] transition-colors duration-200`}
                  >
                  <PhoneCallIcon className="w-4 h-4 shrink-0" />
                    <span>{phone}</span>
                  </a>
                </div>
              ) : null}
            </div>

            <div className="relative w-full min-h-[260px] md:min-h-[340px] rounded-2xl overflow-hidden bg-gray-100 shadow-sm order-1 md:order-2">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
