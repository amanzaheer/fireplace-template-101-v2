"use client";
import React from "react";
import Image from "next/image";
import {Montserrat} from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import PrimaryPhone from "@/components/common/PrimaryPhone";
import { IMAGE_BASE } from "@/lib/constants";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

import { cn } from "@/lib/utils";

    function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}
export default function Slogan8({ content }) {
  const block = content?.slogan ?? {};
  const title = block.title ?? "";
  const description = block.description ?? "";
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const imageSrc = buildImageSrc(IMAGE_BASE, block.file_name);
  if (!title && !description) return null;
  return (
    <FullContainer id="slogan" className="bg-[#f0f2f5] py-8 md:py-12 lg:py-16">
      <Container className="w-full">
        <div className="w-full rounded-[20px] border border-black/[0.06] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] sm:p-7 md:p-9 lg:p-10">
          <div
            className={`grid w-full items-center gap-8 md:gap-10 lg:gap-12 ${imageSrc ? "lg:grid-cols-2" : ""}`}
          >
            {imageSrc ? (
              <div className="order-2 w-full lg:order-1">
                <div className="relative mx-auto aspect-[4/3] w-full max-w-[520px] overflow-hidden rounded-xl bg-[#e8eaed] lg:mx-0">
                  <Image
                    src={imageSrc}
                    alt={title ? String(title).slice(0, 120) : "Slogan"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
              </div>
            ) : null}

            <div
              className={`order-1 w-full text-left ${imageSrc ? "lg:order-2" : "mx-auto max-w-2xl lg:mx-0"}`}
            >
              {title ? (
                <h2 className={cn(montserrat.className, "mb-3 w-full max-w-[526px]  text-[28px] font-bold leading-tight text-black not-italic sm:text-[36px] sm:leading-[44px] md:text-[40px] md:leading-[48px] lg:text-[44px] lg:leading-[53px]")}>
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p className="mb-6 max-w-[620px] text-sm leading-[1.65] text-[#4a4d52] sm:text-base md:mb-8 md:text-[17px]">
                  {description}
                </p>
              ) : null}
              {phone ? (
                <div className="[&_button]:!min-h-[48px] [&_button]:!rounded-none  [&_button]:!border-0 [&_button]:!bg-[#FF0504] [&_button]:!px-7 [&_button]:!py-3 [&_button]:!text-sm [&_button]:!font-bold [&_button]:!uppercase [&_button]:!tracking-wide [&_button]:!text-white [&_button]:!shadow-none [&_button]:hover:!bg-[#E00403] [&_button]:!transition-colors [&_svg]:!text-white">
                  <PrimaryPhone phone={phone} variant="orange" />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
