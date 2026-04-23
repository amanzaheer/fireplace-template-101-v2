"use client";

import React from "react";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { IMAGE_BASE } from "@/lib/constants";

function StepCheckIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={46}
      height={46}
      viewBox="0 0 46 46"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M0 10.9474C0 4.9013 4.9013 0 10.9474 0H36.4211C41.7114 0 46 4.28864 46 9.57895V36.4211C46 41.7114 41.7114 46 36.4211 46H9.57895C4.28864 46 0 41.7114 0 36.4211V10.9474Z"
        fill="#C8E215"
      />
      <path
        d="M32.5286 11.9808C32.0885 11.7362 31.6046 11.5807 31.1044 11.5232C30.6042 11.4656 30.0976 11.5072 29.6134 11.6455C29.1293 11.7838 28.6772 12.0161 28.2829 12.3292C27.8885 12.6422 27.5597 13.0299 27.3153 13.47L20.1987 26.2772L16.1258 22.2043C15.7721 21.8382 15.3492 21.5461 14.8815 21.3452C14.4138 21.1443 13.9108 21.0386 13.4018 21.0342C12.8928 21.0297 12.388 21.1267 11.9169 21.3195C11.4458 21.5122 11.0178 21.7968 10.6579 22.1568C10.298 22.5167 10.0134 22.9447 9.82061 23.4158C9.62787 23.8869 9.53088 24.3917 9.5353 24.9007C9.53972 25.4096 9.64547 25.9127 9.84637 26.3803C10.0473 26.848 10.3393 27.271 10.7054 27.6246L18.3721 35.2913C19.0966 36.0177 20.0741 36.4164 21.0823 36.4164L21.6132 36.378C22.2007 36.2958 22.7612 36.0784 23.2504 35.7428C23.7397 35.4072 24.1443 34.9627 24.4326 34.4441L34.0159 17.1941C34.2606 16.7541 34.4162 16.2703 34.4739 15.7702C34.5315 15.2701 34.4901 14.7635 34.352 14.2794C34.2139 13.7953 33.9818 13.3431 33.6689 12.9487C33.3561 12.5543 32.9686 12.2254 32.5286 11.9808Z"
        fill="#0A0A0A"
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

export default function ServiceBenefits13({ content }) {
  const block = content?.service_benefits ?? {};
  const heading = block.heading ?? "";
  const list = Array.isArray(block.list) ? block.list : [];
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);
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
        {heading ? <Heading text={heading} className="mb-8 text-center md:mb-10 text-black" /> : null}
        <div className="mx-auto grid w-full max-w-[1080px] gap-8 md:grid-cols-2 md:items-center md:gap-10">
          <div className="relative border-l-4 border-[#4c2477] py-4">
            <div className="absolute bottom-0 left-0 h-[30%] w-[3px] -translate-x-[3px] bg-[#c8e215]" />
            <div className="flex flex-col gap-5 pl-4 md:pl-5">
              <ul className="flex list-none flex-col gap-6  p-0">
                {list.map((benefit, index) => {
                  const label =
                    typeof benefit === "object"
                      ? benefit?.title ?? benefit?.heading ?? benefit?.text ?? ""
                      : benefit;
                  if (!label) return null;
                    
                  return (
                    <li key={index} className="flex items-center gap-3.5 sm:gap-4">
                      <StepCheckIcon className="h-[46px] w-[46px] shrink-0" />
                      <p className="text-2xl md:text-[19.9px] leading-tight  font-medium font-poppins text-black">
                        {label}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="relative w-full min-h-[280px] md:h-[478px] md:min-h-[478px]">
            <div className="relative h-full w-full overflow-hidden rounded-[24px] bg-neutral-200 shadow-[0_12px_40px_rgba(0,0,0,0.08)] md:rounded-[36px]">
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
        </div>
      </Container>
    </FullContainer>
  );
}
