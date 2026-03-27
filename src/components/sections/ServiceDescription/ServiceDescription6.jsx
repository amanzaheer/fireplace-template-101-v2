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

export default function ServiceDescription6({ content }) {
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
    <FullContainer id="service_description" className="py-8 md:py-12 bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div
              className="w-full prose text-primary text-start prose-h1:!text-start prose-h2:!text-start prose-h3:!text-start"
              dangerouslySetInnerHTML={{ __html: md.render(description) }}
            />
            {phone ? (
              <div className="w-full pt-2 gap-2 justify-start hidden md:flex flex-col lg:flex-row items-start lg:items-center lg:gap-4">
                <PrimaryPhone phone={phone} />
                <QuoteButton phone={phone} />
              </div>
            ) : null}
          </div>

          <div className="relative w-full min-h-[260px] md:min-h-[320px] rounded-xl overflow-hidden bg-gray-100">
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
