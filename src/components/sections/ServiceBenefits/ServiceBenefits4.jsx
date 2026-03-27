"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Phone } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function ServiceBenefits4({ content }) {
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
              <div className="space-y-2.5">
                {list.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2.5">
                    <ShieldCheck className="w-7 h-7 min-w-6 mt-[2px] text-[#f59402] shrink-0" />
                    <span className="text-ink text-[18px] leading-snug">
                      {typeof benefit === "object" ? benefit?.title : benefit}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-start gap-4">
                {/* Icon */}
                <div className="w-9 h-9 rounded-full bg-[#f59402] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-black" />
                </div>

                {/* Text */}
                <div>
                  <p className="text-lg tracking-widest text-black uppercase">
                    Contact
                  </p>
                  <a
                    href={`tel:${phone}`}
                    className="text-3xl md:text-4xl font-extrabold text-black leading-tight"
                  >
                    {phone || "(123)-456-7890"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
