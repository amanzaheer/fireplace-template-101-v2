"use client";

import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { ShieldCheck } from "lucide-react";

/* helper */
function buildImageSrc(base, filePath) {
  if (!filePath) return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function CompanyProfile16({ content }) {
  const data = content?.company_profile ?? {};

  const title = data.sub_title;
  const description = data.description;
  const button = data.button;

  const features = Array.isArray(data.features) ? data.features : [];

  const mainImage = buildImageSrc(IMAGE_BASE, data.large_image);
  const smallImage = buildImageSrc(IMAGE_BASE, data.small_image);

  return (
    <FullContainer className="bg-white py-12 md:py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT: stacked images ── */}
          <div className="relative w-full h-[420px] md:h-[540px]">

            {/* MAIN LARGE IMAGE — fills entire left column */}
            {mainImage && (
              <Image
                src={mainImage}
                alt={data.large_image_alt || "Company Profile"}
                fill
                className="object-cover"
                priority
              />
            )}

            {/* SMALL OVERLAY IMAGE — sits INSIDE bottom-right of main image */}
            {smallImage && (
              <div className="absolute bottom-4 right-4 w-[170px] md:w-[210px] border-4 border-white shadow-2xl z-10">
                <div className="relative w-full h-[130px]  md:h-[170px]">
                  <Image
                    src={smallImage}
                    alt={data.small_image_alt || "Company Profile Preview"}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: content ── */}
          <div className="flex flex-col justify-center pt-8 lg:pt-4">

            {/* HEADING */}
            {title && (
              <h2 className="text-3xl md:text-[42px] font-extrabold text-[#111] leading-tight tracking-tight">
                {title}
              </h2>
            )}

            {/* SUB HEADING */}
            <h3 className="mt-5 text-[17px] font-bold text-[#111]">
              What Our Job Entails:
            </h3>

            {/* DESCRIPTION */}
            {description && (
              <p className="mt-3 text-[15px] md:text-[16px] text-[#555] leading-relaxed">
                {description}
              </p>
            )}

            {/* FEATURES — 2-col grid with ShieldCheck icons */}
            {features.length > 0 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {features.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#234281] shrink-0">
                      <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[15px] text-[#222] font-medium">
                      {item?.text}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* BUTTON */}
            {button?.text && (
              <div className="mt-8">
                <a
                  href={button.link || "#"}
                  className="inline-flex items-center justify-center bg-[#F5521B] hover:bg-[#d94510] text-white px-8 py-3 text-[16px] font-bold transition-colors duration-200"
                >
                  {button.text}
                </a>
              </div>
            )}

          </div>
        </div>
      </Container>
    </FullContainer>
  );
}