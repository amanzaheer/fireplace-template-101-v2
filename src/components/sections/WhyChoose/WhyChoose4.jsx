"use client";

import React from "react";
import Image from "next/image";
import {
  Phone,
  ShieldCheck,
} from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function WhyChoose4({ content }) {
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
    <FullContainer id="whychooseus" className="bg-[#e9e9e9]  py-12 overflow-x-hidden">
      <Container>
        <div className="grid md:grid-cols-2 items-center gap-10">

          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6">
              {heading}
            </h2>

            <div className="space-y-4 mb-6">
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
                    <ShieldCheck className="w-6 h-6 text-[#f59402] shrink-0 mt-[2px]" />
                    <p className="text-gray-700 text-lg leading-snug">
                      {text}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CONTACT */}
            <div className="flex items-start gap-4 mt-6">
              <div className="w-8 h-8 rounded-full  bg-[#f59e0b] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-black" />
              </div>

              <div>
                <p className="text-lg uppercase tracking-widest text-black">
                  Contact
                </p>
                <a
                  href={`tel:${phone}`}
                  className="text-4xl md:text-3xl font-extrabold text-[#212121] leading-tight"
                >
                  {phone || "(123)-456-7890"}
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            {/* ORANGE FRAME */}
            <div className="absolute -top-6 -left-6 w-full h-full border-[30px] border-[#f59402] z-0"></div>

            {/* IMAGE */}
            <div className="relative z-10 overflow-hidden">
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
          </div>

        </div>
      </Container>
    </FullContainer>
  );
}