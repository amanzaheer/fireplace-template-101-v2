"use client";

import React from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Poppins, Inter, Rubik } from "next/font/google";
import ServiceBenefits2 from "@/components/sections/ServiceBenefits/ServiceBenefits2";

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
const prose =
  "prose max-w-none text-[#171717] prose-headings:font-extrabold prose-headings:text-[#171717] prose-p:text-[#212020] prose-li:text-[#212020] prose-strong:text-[#212020] prose-a:text-[#212020] prose-h1:!text-3xl md:prose-h1:!text-4xl prose-h2:!text-2xl md:prose-h2:!text-3xl";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function ServiceDescription2({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  if (!content?.service_description?.description) return null;

  const title = content?.service_description?.title ?? "Our Service";

  const description =
    content?.service_description?.description ||
    "Professional, reliable service from experienced local technicians.";

  const imageSrc = content?.service_description?.file_name
    ? buildImageSrc(IMAGE_BASE, content?.service_description?.file_name)
    : buildImageSrc(IMAGE_BASE, "hero/hero.webp");

  return (
    <>
      <FullContainer id="service_description" className="py-10 md:py-14 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2
              className={`${rubik.className} text-3xl md:text-5xl font-extrabold tracking-tight text-[#212020] text-center mb-8 md:mb-10`}
            >
              {title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div
                className={`${poppins.className} space-y-4 order-2 md:order-1`}
              >
                <div
                  className={`${prose} w-full text-left text-[#212020] prose-h1:!text-start prose-h2:!text-start prose-h3:!text-start`}
                  style={{ ["--prose-primary"]: "#212020" }}
                  dangerouslySetInnerHTML={{ __html: md.render(description) }}
                />
                {phone ? (
                  <div
                    className={`${rubik.className} flex flex-col sm:flex-row gap-3 pt-2`}
                  >
                    <a
                      href={`tel:${phone}`}
                      className="inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-black text-white uppercase tracking-wide font-bold px-7 py-3 text-sm hover:bg-[#111827] transition-colors duration-200"
                    >
                      Call Us Today
                      <span aria-hidden="true">→</span>
                    </a>
                    <a
                      href={`tel:${phone}`}
                      className="inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-[#d62828] text-white font-bold px-6 py-3 text-base hover:bg-[#bf1f1f] transition-colors duration-200"
                    >
                      <svg
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.58003 0H2.89394e-05V1C-0.00653503 4.84967 1.10365 8.6186 3.19603 11.85C4.73807 14.2328 6.76725 16.262 9.15003 17.804C12.3814 19.8964 16.1504 21.0066 20 21H21V12.42L14.31 10.933L12.45 12.793C10.748 11.6994 9.30126 10.2523 8.20803 8.55L10.067 6.69L8.58003 0Z"
                          fill="white"
                        />
                      </svg>

                      <span
                        className={`${rubik.className} text-white font-normal md:text-lg`}
                      >
                        {phone}
                      </span>
                    </a>
                  </div>
                ) : null}
              </div>

              <div
                className={`${inter.className} relative w-full min-h-[260px] md:min-h-[340px] rounded-2xl overflow-hidden bg-gray-100 shadow-sm order-1 md:order-2`}
              >
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
          </div>
        </Container>
      </FullContainer>

      <ServiceBenefits2 content={content} />
    </>
  );
}
