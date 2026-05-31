"use client";

import React from "react";
import Image from "next/image";
import Icon from "@mdi/react";
import { mdiShieldCheckOutline } from "@mdi/js";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
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

function PhoneCallIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
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

export default function WhyChoose32({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.why_choose ?? {};
  const features = resolveRefArray(content, block, "features");
  const heading = block.heading ?? "Why Choose Us";
  const description =
    block.description ??
    "Professional Chimney Sweep Clean ensures that your chimney or fireplace meets safety and building code standards, which is important if you're planning to sell your home or undergo renovations. A properly maintained fireplace or chimney also adds to your home's aesthetic appeal and resale value.";
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);

  if (features.length === 0) return null;

  return (
    <FullContainer id="whychooseus" className="bg-[#e9e9e9] overflow-visible relative py-10 md:py-14">
      <Container>
        <div className="grid md:grid-cols-2 items-center gap-10">

          <div>
            <h2 className={`${poppins.className} text-3xl md:text-[44px] font-extrabold text-[#212020] mb-6`}>
              {heading}
            </h2>

            <div className="space-y-0.5 mb-6">
              {features.map((feature, idx) => {
                const text =
                  typeof feature === "object"
                    ? feature?.text
                    : typeof feature === "string"
                      ? feature
                      : "";
                if (!text) return null;

                return (
                  <div key={idx} className="flex items-start gap-3">
                    <Icon path={mdiShieldCheckOutline} size={1} className="text-[#f59402] shrink-0 mt-[1px]" />
                    <p className={`${inter.className} text-[#6e6e6e] text-[16px] leading-[21px]`}>
                      {text}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CONTACT */}
            <div className="mt-6">
              <a
                href={phone ? `tel:${phone}` : "#"}
                className="inline-flex items-center gap-2 text-[#111111] font-semibold text-xs md:text-sm uppercase tracking-wide"
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
      </Container>
      <div className="absolute top-0 right-0 w-[50%] h-full bg-[#f59402] z-0 px-6">
      </div>
      <div className=" z-10 absolute top-0 right-0 w-[50%] px-7 h-full translate-y-7">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="Why choose us"
              width={700}
              height={600}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-[300px] bg-gray-300" />
          )}
        </div>
    </FullContainer>
  );
}