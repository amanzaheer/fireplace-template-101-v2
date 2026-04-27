"use client";

import React from "react";
import Image from "next/image";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Poppins, Inter, Rubik, Archivo } from "next/font/google";

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

const archivo = Archivo({
  subsets: ["latin", "italian"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const prose =
  "prose max-w-none text-[#171717] prose-headings:font-extrabold prose-headings:text-[#171717] prose-p:text-[#212020] prose-li:text-[#212020] prose-strong:text-[#212020] prose-a:text-[#f59403] prose-h1:!text-3xl md:prose-h1:!text-4xl prose-h2:!text-2xl md:prose-h2:!text-3xl";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function ServiceDescription3({ content }) {
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
    <FullContainer id="service_description" className="py-10 md:py-14 bg-[#efefef]">
      <Container>
        <div className="max-w-6xl mx-auto">
          <h2
            className={`${rubik.className} text-3xl md:text-[44px] font-bold tracking-tight text-[#212020] text-center mb-8 md:mb-10`}
          >
            {title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
            <div className={`${poppins.className} space-y-4 order-2 md:order-1`}>
              <div
                className={`${prose} w-full text-left text-[#212020] prose-h1:!text-start prose-h2:!text-start prose-h3:!text-start`}
                style={{ ["--prose-primary"]: "#212020" }}
                dangerouslySetInnerHTML={{ __html: md.render(description) }}
              />
              {phone ? (
                <div className={`${rubik.className} flex flex-col sm:flex-row gap-3 pt-2`}>
                  <a
                    href={`tel:${phone}`}
                    className={`${archivo.className} inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-[#f59403] text-white uppercase tracking-wide font-bold px-7 py-3 text-xs md:text-sm hover:bg-[#e39a00] transition-colors duration-200`}
                  >
                    Call Us Today
                    <span aria-hidden="true">→</span>
                  </a>
                  <a
                    href={`tel:${phone}`}
                    className={`${inter.className} inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-white text-[#212020] border border-[#e7e7e7] font-semibold px-5 py-3 text-sm md:text-base hover:bg-[#f7f7f7] transition-colors duration-200 shadow-sm`}
                  >
                    <Image
                      src="/st-icons/Temp3/call2.png"
                      alt=""
                      width={18}
                      height={18}
                      className="w-auto h-4 md:h-[18px] shrink-0"
                    />
                    <span className="truncate">{phone}</span>
                  </a>
                </div>
              ) : null}
            </div>

            <div
              className={`${inter.className} relative w-full min-h-[260px] md:min-h-[340px] rounded-[24px] overflow-hidden bg-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#e7e7e7] order-1 md:order-2`}
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
  );
}
