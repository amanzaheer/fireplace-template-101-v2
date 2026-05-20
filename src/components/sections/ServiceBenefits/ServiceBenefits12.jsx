"use client";

import React from "react";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Montserrat } from "next/font/google";
import { ArrowRight } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function ServiceBenefits12({ content }) {
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
    <FullContainer id="service_benefits" className="py-10 md:py-14 overflow-hidden bg-white">
      <Container className="px-4 sm:px-6">
        <div className="mx-auto">
          <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div className="relative order-2 flex w-full min-w-0 justify-center lg:order-2 lg:justify-end">
              <div className="relative h-[280px] w-full max-w-[540px] shrink-0 overflow-hidden rounded bg-gray-100 sm:h-[360px] md:h-[440px] lg:h-[526px]">
                {imageSrc ? (
                  <Image
                    title="Service Background"
                    src={imageSrc}
                    alt="Service Benefits"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 540px"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200" />
                )}
              </div>
            </div>

            <div className={`order-1 min-w-0 lg:order-1 ${montserrat.className}`}>
              <p className="mt-2 text-lg font-medium leading-tight text-[#4a4a4a] sm:mt-4 sm:text-xl md:text-2xl lg:text-3xl">
                {heading}
              </p>
              <h3 className="mb-3 mt-4 w-full max-w-[433px] text-2xl font-bold leading-[0.95] text-black sm:mb-4 sm:mt-6 sm:text-3xl md:text-[35px]">
                {sectionTitle}
              </h3>

              <div className="grid grid-cols-1 gap-y-2 sm:gap-y-2.5">
                {list.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div className="h-7 w-7 shrink-0 whitespace-nowrap">
                      <Image
                        src="/st-icons/Temp12/shield.png"
                        alt="Check"
                        width={28}
                        height={28}
                        className="h-7 w-7 object-contain"
                      />
                    </div>
                    <span className="text-sm leading-snug text-[#222222] sm:text-[16px] md:text-[18px]">
                      {typeof benefit === "object" ? benefit?.title : benefit}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-4 sm:mt-7 sm:flex-row sm:gap-8">
                {/* <a
                  href={`tel:${phone}`}
                  className="inline-flex h-[46px] min-w-[219px] items-center justify-center gap-2 bg-[#da4909] px-8 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-yellow-600"
                >
                  Call Us Today
                  <span aria-hidden="true">→</span>
                </a> */}
                
                <a
              href={phone ? `tel:${phone}` : "#"}
              className="inline-flex h-auto min-h-[46px] w-full max-w-[323px] shrink-0 flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border-3 border-white bg-[#da4909] px-4 py-[11px] font-normal uppercase tracking-wide text-white shadow-lg transition-opacity hover:opacity-95 sm:w-auto sm:px-6"
            >
              <span className="text-sm sm:text-[16px]">CALL NOW:</span>
              <span className="text-base font-bold sm:text-[20px]">
                {phone || "(888)-249-0566"}
              </span>
            </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
