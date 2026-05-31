"use client";

import React from "react";
import Image from "next/image";
import Icon from "@mdi/react";
import { mdiShieldCheckOutline } from "@mdi/js";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function PhoneCallIcon({ className = "w-3.5 h-3.5" }) {
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
        d="m17.018 2.048l-.965-.261l-.523 1.93l.966.262a5 5 0 0 1 3.521 3.524l.26.965l1.931-.521l-.26-.965a7 7 0 0 0-4.93-4.934m-.914 3.378l-.965-.261l-.523 1.93l.966.262a1.5 1.5 0 0 1 1.056 1.057l.26.965l1.931-.52l-.26-.966a3.5 3.5 0 0 0-2.465-2.467"
      />
      <path
        fill="currentColor"
        d="M9.58 2H1v1a19.9 19.9 0 0 0 3.196 10.85a20.1 20.1 0 0 0 5.954 5.954A19.9 19.9 0 0 0 21 23h1v-8.58l-6.69-1.487l-1.86 1.86a14.1 14.1 0 0 1-4.242-4.243l1.859-1.86z"
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

export default function ServiceBenefits32({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.service_benefits ?? {};
  const heading = block.heading ?? "Committed to Excellence";
  const intro =
    block.description ??
    "Chimney One provides top-quality chimney maintenance and repair services with precision and care. From cleaning and inspections to expert repairs, our experienced team ensures safety, efficiency, and long-lasting performance for your chimney.";
  const list = Array.isArray(block.list) ? block.list : [];
  const sectionTitle = block.title ?? "Chimney Service CO Benefits";
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);

  if (list.length === 0) return null;

  return (
    <FullContainer
      id="service_benefits"
      className="py-10 md:py-14 overflow-hidden bg-white relative  "
    >
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-black">
              {heading}
            </h2>
            <p className="mt-4 text-ink text-sm md:text-base max-w-4xl mx-auto">
              {intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ">
            <div className="relative w-full min-h-[300px] md:min-h-[380px] rounded-full overflow-hidden bg-gray-100">
              {imageSrc ? (
                <Image
                  title="Service Background"
                  src={imageSrc}
                  alt="Service Benefits"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 780px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-200" />
              )}
            </div>

            <div>
              <h3 className="text-3xl md:text-5xl font-extrabold text-black leading-tight mb-5">
                {sectionTitle}
              </h3>
              <div className="space-y-0.5">
                {list.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2.5">
                    <Icon path={mdiShieldCheckOutline} size={1} className="text-[#f59402] shrink-0 mt-[2px]" />
                    <span className="text-ink text-[18px] leading-snug">
                      {typeof benefit === "object" ? benefit?.title : benefit}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href={phone ? `tel:${phone}` : "#"}
                  className="mt-4 inline-flex items-center gap-2 text-[#111111] font-semibold text-xs md:text-sm uppercase tracking-wide"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#E9A61A] text-black">
                    <PhoneCallIcon className="w-3.5 h-3.5" />
                  </span>
                  <span className={`${poppins.className} text-[#111111] font-normal text-sm md:text-base uppercase tracking-wide`}>
                    Contact
                  </span>
                </a>
                <a
                  href={phone ? `tel:${phone}` : "#"}
                  className={`${poppins.className} block text-[#111111] text-[24px] sm:text-[28px] md:text-[30px] font-extrabold leading-none mt-1`}
                >
                  {phone || "(123)-456-7890"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
