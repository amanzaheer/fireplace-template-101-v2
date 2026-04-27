"use client";

import React from "react";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import {Poppins, Inter, Rubik} from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const rubik = Rubik({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function ServiceBenefits7({ content }) {
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
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 md:gap-10 lg:gap-14 items-center">
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[546px] h-[544px] overflow-hidden rounded-br-[123px] border-l-11 border-b-11 border-[#3a8ffb] bg-gray-100">
                {imageSrc ? (
                  <Image
                    title="Service Background"
                    src={imageSrc}
                    alt="Service Benefits"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-200" />
                )}
              </div>
            </div>

            <div>
              <p className={`${inter.className} text-xl md:text-3xl font-medium text-[#4a4a4a] leading-tight mt-6`}>
                {heading}
              </p>
              <h3 className={`${poppins.className} text-[35px] w-[433px] h-[106px] font-bold text-black leading-[0.95] mb-2 mt-6`}>
                {sectionTitle}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-1 ">
                {list.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div className="w-7 h-7 whitespace-nowrap shrink-0">
                      <Image
                        src="/st-icons/Temp7/shield icon.png"
                        alt="Check"
                        width={28}
                        height={28}
                        className="w-7 h-7 object-contain"
                      />
                    </div>
                    <span className={`${inter.className} text-[#222222] text-[16px] md:text-[18px] leading-snug`}>
                      {typeof benefit === "object" ? benefit?.title : benefit}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col sm:flex-row gap-8">
                <a
                  href={`tel:${phone}`}
                  className={`${poppins.className} inline-flex items-center justify-center gap-2 bg-[#3a8ffb] text-white uppercase tracking-wide  px-8 h-[46px] min-w-[219px] text-[19px]  font-bold rounded-full  hover:bg-[#111827] transition-colors duration-200`}
                >
                  Call Us Today
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href={`tel:${phone}`}
                  className={`${poppins.className} inline-flex items-center justify-center gap-2 bg-[#fe4c4c] text-white px-6 h-[46px] min-w-[217px] text-xl md:text-[19px] font-bold    leading-none rounded-full hover:bg-red-700 transition-colors duration-200`}
                >
                  <Image
                    src="/st-icons/Temp7/call1.1.png"
                    alt="Phone"
                    width={16}
                    height={16}
                    className="w-auto h-4 md:h-8"
                  />
                  <span>{phone || "(888)-249-0566"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
