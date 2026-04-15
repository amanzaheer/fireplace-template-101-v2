"use client";

import React from "react";
import Image from "next/image";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import PrimaryPhone from "@/components/common/PrimaryPhone";
import { IMAGE_BASE } from "@/lib/constants";
import QuoteButton from "@/components/common/QuoteButton";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function ServiceDescription14({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  if (!content?.service_description?.description) return null;

  const title = content?.service_description?.title ?? "Our Service";

  // Fallback chain:
  // 1. service_description from per-service file  (services/<slug>.json)
  // 2. service_description from shared defaults   (service/data.json)
  //    — layers 1 & 2 are already deep-merged into content by getServiceData()
  // 3. serviceDetail.description                  (short card text from home/data.json)
  // 4. hard-coded fallback
  const description =
    content?.service_description?.description ||
    "Professional, reliable service from experienced local technicians.";

  const imageSrc = content?.service_description?.file_name
    ? buildImageSrc(IMAGE_BASE, content?.service_description?.file_name)
    : buildImageSrc(IMAGE_BASE, "hero/hero.webp");

  return (
    <FullContainer id="service_description" className="bg-white py-10 md:py-14 lg:py-16">
      <Container className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
          <div className="space-y-5">
            {title ? (
              <h2 className="text-left font-montserrat text-3xl font-bold tracking-tight text-[#212020] md:text-4xl lg:text-[2.2rem]">
                {title}
              </h2>
            ) : null}
            <div
              className="w-full prose max-w-none text-center font-poppins  prose-headings:font-poppins prose-headings:text-black prose-p:!text-[14px] prose-p:!leading-[22.15px] prose-p:!font-normal prose-p:!text-red-600 prose-p:!text-center prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg"
              dangerouslySetInnerHTML={{ __html: md.render(description) }}
            />
            {phone ? (
              <div className="w-full pt-1 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4">
                <div className="[&_button]:!h-[46px] [&_button]:!min-w-[170px] [&_button]:!rounded-[10px] [&_button]:!bg-[#F59402] [&_button]:hover:!bg-[#df8601] [&_button]:!px-5 [&_button]:!py-2 [&_button]:!text-[16px] [&_button]:!font-semibold [&_button]:!shadow-none [&_svg]:!h-4 [&_svg]:!w-4">
                  <PrimaryPhone phone={phone} />
                </div>
                <div className="[&_button]:!h-[46px] [&_button]:!rounded-[10px] [&_button]:!px-5 [&_button]:!py-2 [&_button]:!text-sm [&_button]:!font-semibold [&_button]:!shadow-none">
                  <QuoteButton phone={phone} />
                </div>
              </div>
            ) : null}
          </div>

          <div className="relative w-full min-h-[280px] md:min-h-[360px] overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-black/5 shadow-sm">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
