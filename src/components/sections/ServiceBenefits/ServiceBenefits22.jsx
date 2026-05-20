"use client";

import React from "react";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { IMAGE_BASE } from "@/lib/constants";

function ShieldCheckIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M12 3.19 5 6.3V11c0 4.52 3.12 8.72 7 9.8 3.88-1.08 7-5.28 7-9.8V6.3l-7-3.11z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function ServiceBenefits22({ content }) {
  const block = content?.service_benefits ?? {};
  const heading = block.heading ?? "";
  const description = block.description ?? "";
  const list = Array.isArray(block.list) ? block.list : [];
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);
  const phone =
    content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const useUnoptimized =
    imageSrc.startsWith("/api/") ||
    imageSrc.startsWith("http://") ||
    imageSrc.startsWith("https://");

  if (list.length === 0) return null;

  return (
    <FullContainer
      id="service_benefits"
      className="bg-white py-12 md:py-16 overflow-hidden"
    >
      <Container>
        <div className="mx-auto grid w-full max-w-[1080px] grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10">
          <div className="relative w-full min-h-[280px] md:h-[478px] md:min-h-[478px]">
            <div className="relative h-full w-full min-h-[280px] overflow-hidden rounded-[32px] bg-neutral-200 md:min-h-[478px]">
              {imageSrc ? (
                <Image
                  title="Service Background"
                  src={imageSrc}
                  alt="Service Benefits"
                  fill
                  className="object-cover object-center"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized={useUnoptimized}
                />
              ) : (
                <div className="absolute inset-0 bg-blue-200" />
              )}
            </div>
          </div>

          <div className="flex flex-col">
            {heading ? (
              <Heading
                text={heading}
                className="mb-4 text-left! text-3xl font-bold text-black! md:mb-5 md:text-4xl md:leading-tight"
              />
            ) : null}
            {description ? (
              <p className="mb-6 font-poppins text-base leading-relaxed text-black md:mb-8">
                {description}
              </p>
            ) : null}
            <ul className="mb-6 grid list-none grid-cols-2 gap-3 p-0 md:mb-8 md:gap-4">
              {list.map((benefit, index) => {
                const label =
                  typeof benefit === "object"
                    ? benefit?.title ?? benefit?.heading ?? benefit?.text ?? ""
                    : benefit;
                if (!label) return null;

                return (
                  <li
                    key={index}
                    className="flex items-center gap-2 rounded-md bg-[#f15a24]  h-11 px-2 py-2.5 md:gap-2.5   md:px-4 md:py-3"
                  >
                    <ShieldCheckIcon className=" shrink-0 text-white  h-7 w-7 md:h-8  md:w-8" />
                    <p className="text-sm font-medium leading-tight text-white  text-[13px]  md:text-[16px]  font-poppins">
                      {label}
                    </p>
                  </li>
                );
              })}
            </ul>
            {phone ? (
              <a
                href={`tel:${phone}`}
                className="inline-flex md:mx-0 mx-auto w-full max-w-[280px] flex-col items-center justify-center rounded-xl h-18 bg-[#f15a24] px-6 py-4 text-center text-white transition-opacity hover:opacity-95"
                >
                <span className="font-poppins text-[21px] font-medium uppercase tracking-wide">
                  Call Now:
                </span>
                <span className="font-poppins text-xl font-bold leading-tight md:text-[27px]">
                  {phone}
                </span>
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
