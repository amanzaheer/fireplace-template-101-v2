"use client";

import React from "react";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Poppins } from "next/font/google";

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

export default function ServiceBenefits18({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.service_benefits ?? {};
  const heading = block.heading ?? "";
  const intro = block.description ?? "";
  const list = Array.isArray(block.list) ? block.list : [];
  const sectionTitle = block.title ?? "";
  const filePath = block.file_name ?? "";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);
  const normalizedBenefits = list
    .map((benefit) =>
      typeof benefit === "object" ? benefit?.title ?? benefit?.text : benefit,
    )
    .filter(Boolean);
  const leftBenefits = normalizedBenefits.slice(0, 2);
  const rightBenefits = normalizedBenefits.slice(2);

  if (normalizedBenefits.length === 0) return null;

  return (
    <FullContainer id="service_benefits" className="overflow-hidden bg-black py-10 md:py-14">
      <Container>
        <div className={`mx-auto grid max-w-[1220px] grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_356px_minmax(0,1fr)] md:items-center md:gap-8 ${poppins.className}`}>
          <div className="order-1 w-full max-w-[380px] gap-4 justify-self-center md:ml-8 md:justify-self-end">
            {heading ? (
              <p className="mb-10 text-[36px] leading-tight text-white">
                {heading}
              </p>
            ) : null}
            {sectionTitle ? (
              <h3 className="mb-8 text-[36px] leading-[1.02] text-white">
                {sectionTitle}
              </h3>
            ) : null}
            {intro ? (
              <p className="mb-4 max-w-[95%] text-[16px]  border leading-tight text-white">
                {intro}
              </p>
            ) : null}
            <div className="mb-6 flex flex-col gap-2">
              {leftBenefits.map((text, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Image
                    src="/st-icons/Temp10/shield.png"
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 shrink-0 object-contain"
                    aria-hidden
                  />
                  <p className="text-[16px] leading-tight text-white">{text}</p>
                </div>
              ))}
            </div>
            {phone ? (
              <a
                href={`tel:${phone}`}
                className="inline-flex h-[54px] w-[217px] flex-nowrap items-center justify-center gap-2 rounded bg-[#FF2A2A] px-4 text-[19px] leading-none text-white whitespace-nowrap"
              >
                <Image
                  src="/st-icons/Temp10/call2.png"
                  alt="Phone"
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
                <span>{phone}</span>
              </a>
            ) : null}
          </div>

          <div className="order-2 flex w-full items-center justify-center">
            <div className="relative h-[320px] w-full max-w-[356px] overflow-hidden rounded-[11px] bg-gray-100 sm:h-[400px] md:h-[462px] md:w-[356px]">
              {imageSrc ? (
                <Image
                  title="Service Background"
                  src={imageSrc}
                  alt="Service Benefits"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 92vw, 356px"
                />
              ) : (
                <div className="h-full w-full bg-gray-200" />
              )}
            </div>
          </div>

          <div className="order-3 flex w-full max-w-[380px]  flex-col gap-3 justify-self-center md:justify-self-start">
            {rightBenefits.map((text, idx) => (
              <div key={idx} className="flex items-center   gap-2">
                <Image
                  src="/st-icons/Temp10/shield.png"
                  alt=""
                  width={24}
                  height={24}
                  className="h-7 w-7 shrink-0 object-contain"
                  aria-hidden
                />
                <p className="text-[22px] leading-tight text-white">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
