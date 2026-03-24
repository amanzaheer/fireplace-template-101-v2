"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Phone } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function ServiceBenefits3({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.service_benefits ?? {};
  const heading = block.heading ?? "";
  const rightTitle = block?.right_title ?? "";
  const rightSubtitle = block?.right_subtitle ?? "";
  const description = block?.description ?? "";
  const list = Array.isArray(block.list) ? block.list : [];
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);

  if (list.length === 0) return null;

  return (
    <FullContainer id="service_benefits" className="py-10 md:py-14 overflow-hidden bg-[#efefef]">
      <Container>
        <div className="max-w-6xl mx-auto bg-transparent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#212020] mb-5">
                {heading}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-[46%_54%] gap-4 items-start">
                <div className="relative w-full min-h-[210px] md:min-h-[260px] rounded-sm overflow-hidden bg-gray-200">
                  {imageSrc ? (
                    <Image
                      title="Service Background"
                      src={imageSrc}
                      alt="Service Benefits"
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 24vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-300" />
                  )}
                </div>

                <div>
                  <p className="text-[#212020] text-sm md:text-base leading-relaxed">
                    {description}
                  </p>

                  <a
                    href={`tel:${phone}`}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#f3a008] text-white font-extrabold px-4 py-2.5 text-xl md:text-2xl leading-none"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{phone || "(888)-249-0566"}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="md:border-l md:border-[#bfbfbf] md:pl-8">
              <h3 className="text-4xl md:text-5xl font-extrabold text-black leading-none">
                {rightTitle}
              </h3>
              <p className="text-3xl md:text-4xl text-[#212020] font-medium mt-1 mb-4 leading-none">
                {rightSubtitle}
              </p>

              <div className="flex flex-col w-fit space-y-[8px]">
                {list.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#d39b3e] shrink-0 mt-px" />
                    <span className="text-[#212020] text-base md:text-lg leading-snug">
                      {typeof benefit === "object" ? benefit?.title : benefit}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={`tel:${phone}`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f3a008] text-white font-extrabold uppercase tracking-wide px-6 py-2.5 text-sm"
              >
                Call Us Today
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
