"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function ServiceBenefits1({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.service_benefits ?? {};
  const heading = block.heading ?? "";
  const description = block.description ?? block.subtitle ?? "";
  const list = Array.isArray(block.list) ? block.list : [];
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);
  const callHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#";

  if (list.length === 0) return null;

  return (
    <FullContainer id="service_benefits" className="overflow-hidden py-6 md:py-10">
      <Container>
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-14">
          <div className="relative h-full min-h-[260px] overflow-hidden rounded bg-[#dbeeff] shadow-[0_12px_34px_rgba(0,0,0,0.12)] md:min-h-[400px]">
            {imageSrc ? (
              <Image
                title="Service Background"
                src={imageSrc}
                alt="Service Benefits"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 bg-[#cfe8ff]" />
            )}
          </div>

          <div className="flex flex-col gap-4 rounded bg-white p-1 md:pl-4 lg:pl-6">
            {heading ? (
              <Heading
                text={heading}
                className="text-start text-[36px] font-extrabold leading-[1.1] tracking-tight text-black md:text-[46px]"
              />
            ) : null}

            {description ? (
              <p className="max-w-2xl text-[17px] leading-relaxed text-black/85 md:text-[19px]">
                {description}
              </p>
            ) : null}

            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
              {list.map((benefit, index) => (
                <div
                  key={index}
                  className="inline-flex items-center rounded px-3 py-0.5 text-black font-poppins"
                >
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span className="ml-2 text-[20px] font-normal leading-tight">
                    {typeof benefit === "object" ? benefit?.title : benefit}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-1">
              <a
                href={callHref}
                className="inline-flex min-h-[74px] min-w-[210px] flex-col items-center justify-center rounded bg-[#cc3333] px-6 py-3 text-white shadow-[0_8px_22px_rgba(241,90,16,0.35)] transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f15a10] focus-visible:ring-offset-2"
              >
                <span className="text-[18px] font-black leading-none uppercase  font-normal tracking-tight">
                  Call Now:
                </span>
                <span className="mt-1 text-[30px] font-extrabold leading-none tracking-tight">
                  {phone || "(123)-456-7890"}
                </span>
              </a>
            </div>

          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
