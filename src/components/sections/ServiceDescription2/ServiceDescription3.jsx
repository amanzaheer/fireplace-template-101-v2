"use client";

import React from "react";
import Image from "next/image";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Inter, Rubik, Archivo } from "next/font/google";

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

export default function ServiceDescription3({ content }) {
  const text = content?.service_description2?.description ?? "";
  const html = text ? md.render(text) : "";
  if (!html && !text) return null;

  const title = content?.service_description2?.title ?? "";
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  return (
    <FullContainer id="service_description2" className="py-10 md:py-14 bg-[#efefef]">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-[24px] shadow-sm border border-[#e7e7e7] overflow-hidden">
            <div className="h-1 w-full bg-[#f59403]" aria-hidden />
            <div className="p-6 md:p-10">
              {title ? (
                <h2
                  className={`${rubik.className} text-3xl md:text-[44px] font-bold tracking-tight text-[#212020] text-center mb-6 md:mb-8`}
                >
                  {title}
                </h2>
              ) : null}
              <div
                className={`${inter.className} ${prose} prose-headings:text-center prose-p:text-center prose-li:text-center prose-ul:mx-auto prose-ol:mx-auto`}
                style={{ ["--prose-primary"]: "#212020" }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
              {phone ? (
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-8 mt-6 border-t border-[#e7e7e7]">
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
                    <span>{phone}</span>
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
