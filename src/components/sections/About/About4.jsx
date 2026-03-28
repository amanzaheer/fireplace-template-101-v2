"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function About4({ content }) {
  const about = content?.about ?? {};
  const heading = about.heading ?? "About Chimney pro";
  const description1 = about.description1 ?? "";
  const description2 = about.description2 ?? "";
  const label = about.label ?? "ABOUT US";
  const image =
    buildImageSrc(IMAGE_BASE, about.file_name) ||
    buildImageSrc(IMAGE_BASE, "about/about.webp");
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  return (
    <FullContainer className="py-10 md:py-14 bg-white mt-12" id="about">
      

      <Container className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.04fr_1fr] gap-8 md:gap-10 lg:gap-12 items-start">
          <div className="relative order-2 lg:order-1 lg:-mt-4">
            <div className="absolute right-[-12px] md:right-[-16px] top-3 md:top-4 bottom-3 md:bottom-4 w-6 md:w-8 bg-[#efa536] rounded-r-[18px] z-0" />
            <div className="relative min-h-[280px] sm:min-h-[350px] md:min-h-[400px] rounded-[22px] overflow-hidden z-10">
              {image ? (
                <Image
                  title="About Image"
                  src={image}
                  alt="About"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-xs md:text-sm font-medium tracking-wide text-[#111111] mb-2">
              {label}
            </p>
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-extrabold leading-[0.95] text-[#111111] mb-3">
              {heading}
            </h2>

            <p className="text-sm md:text-base lg:text-lg leading-normal text-[#212020]">
              {description1}
            </p>
            {description2 ? (
              <p className="mt-3 text-sm md:text-base lg:text-lg leading-normal text-[#212020]">
                {description2}
              </p>
            ) : null}

            <a
              href={phone ? `tel:${phone}` : "#"}
              className="mt-4 inline-flex items-center gap-2 text-[#111111] font-semibold text-xs md:text-sm uppercase tracking-wide"
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#E9A61A] text-black">
                <Phone className="w-3.5 h-3.5" />
              </span>
              Contact
            </a>
            <a
              href={phone ? `tel:${phone}` : "#"}
              className="block text-[#111111] text-[26px] sm:text-[32px] md:text-[40px] font-extrabold leading-none mt-1"
            >
              {phone || "(888)-249-0566"}
            </a>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
