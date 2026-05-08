"use client";
import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

const poppins = Poppins({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  return `${basePath}/${filePath.replace(/^\//, "")}`;
}

export default function OurWorkingProcess20({ content }) {
  const data = content?.our_process ?? content?.process ?? {};
  const heading = data?.title ?? "Our Reliable Working Process";
  const description =
    data?.description ??
    "We follow a proven chimney service process—easy booking, on-time arrival, thorough cleaning, and final inspection to ensure consistent, high-quality results you can trust.";

  const steps = Array.isArray(data?.list) ? data.list.slice(0, 3) : [];
  if (!steps.length) return null;

  const connectorImage = buildImageSrc(
    IMAGE_BASE,
    data?.side_image ?? data?.arrow_image ?? "process/process20.png"
  );

  const decorationSrc = data?.decoration_image
    ? buildImageSrc(IMAGE_BASE, data.decoration_image)
    : "";

  const decorationAlt =
    (typeof data?.decoration_alt === "string" && data.decoration_alt.trim()) ||
    (typeof data?.side_image_alt === "string" && data.side_image_alt.trim()) ||
    "";

  const stepRowLayout = [
    "flex w-full justify-start",
    "flex w-full justify-start md:justify-center",
    "flex w-full justify-start md:justify-end",
  ];

  const sideImageSlot =
    "h-[90.52358031778707px] w-[150.8726465786357px] overflow-visible";

  const sideImageClass = "h-full w-full object-contain opacity-100";

  const processCardClass =
    "box-border flex h-auto min-h-[134px] w-full flex-col justify-center gap-3 overflow-hidden rounded-[19px] bg-[#415FB0] px-5 py-5 text-white opacity-100 sm:px-7 sm:py-6 md:h-[134px] md:gap-[18px] md:px-[42px] md:py-[22px]";

  return (
    <FullContainer
      id="our_process"
      className="bg-[#ffffff] py-8 sm:py-10 md:py-14"
    >
      <Container>
        {/* Header */}
        <div className="mx-auto mb-8 max-w-[700px] px-1 text-center sm:mb-9 md:mb-10 md:px-0">
          <h2
            className={`text-[45px] font-extrabold tracking-tight text-[#0a0a0a] md:text-4xl ${poppins.className}`}
          >
            {heading}
          </h2>

          <p className="mx-auto mt-3 max-w-[560px] text-sm leading-relaxed text-[#444] md:text-[15px]">
            {description}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[947px] overflow-visible">
          {decorationSrc ? (
            <div
              className="pointer-events-none absolute right-0 top-3 z-20 hidden min-w-[72px] max-w-[180px] md:block md:right-3 lg:right-4 lg:top-3"
              style={{
                width:
                  "min(180px, max(72px, calc((100% - 598px) / 2 - 12px)))",
              }}
              aria-hidden
            >
              <Image
                src={decorationSrc}
                alt={decorationAlt || ""}
                width={240}
                height={240}
                unoptimized
                className="h-auto w-full object-contain object-right"
                sizes="(min-width:1024px) 180px, (min-width:768px) 160px, 0px"
              />
            </div>
          ) : null}

          {/* Connector 1 */}
          <div
            className={`pointer-events-none absolute z-11 hidden md:block left-4 top-[140px] ${sideImageSlot} rotate-0 origin-left`}
            aria-hidden
          >
            <Image
              src={connectorImage}
              alt=""
              width={209}
              height={239}
              unoptimized
              className={sideImageClass}
              sizes="151px"
            />
          </div>

          {/* Connector 2 */}
          <div
            className={`pointer-events-none absolute z-12 hidden md:block left-[calc((100%-598px)/2+1rem)] top-[calc(134px+2rem+134px+6px)] ${sideImageSlot} rotate-0 origin-left`}
            aria-hidden
          >
            <Image
              src={connectorImage}
              alt=""
              width={209}
              height={239}
              unoptimized
              className={sideImageClass}
              sizes="151px"
            />
          </div>

          <div className="relative z-10 flex flex-col space-y-5 md:space-y-8">
            {steps.map((step, idx) => (
              <div
                key={`step-${idx}`}
                className={stepRowLayout[idx] ?? stepRowLayout[0]}
              >
                <div className="relative w-full max-w-[598px] md:w-[598px] md:max-w-none">
                  <div className={processCardClass}>
                    <h3
                      className={`text-lg font-extrabold leading-tight md:text-[16px] ${poppins.className}`}
                    >
                      {step?.title}
                    </h3>

                    {step?.description && (
                      <p
                        className={`text-sm leading-[1.55] text-white/90 md:text-sm ${poppins.className}`}
                      >
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}