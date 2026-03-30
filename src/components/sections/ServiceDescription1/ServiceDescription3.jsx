"use client";

import React from "react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins, Rubik } from "next/font/google";

const poppins = Poppins({
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
  "prose max-w-none text-[#171717] prose-headings:font-extrabold prose-headings:text-[#171717] prose-p:text-[#212020] prose-li:text-[#212020] prose-strong:text-[#212020] prose-a:text-[#f59403] prose-h1:!text-3xl md:prose-h1:!text-4xl prose-h2:!text-2xl md:prose-h2:!text-3xl";

export default function ServiceDescription3({ content }) {
  const title = content?.service_description1?.title ?? "";
  const text = content?.service_description1?.description ?? "";
  const html = text ? md.render(text) : "";
  if (!html && !text) return null;

  return (
    <FullContainer id="service_description1" className="py-10 md:py-14 bg-[#efefef]">
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
                className={`${poppins.className} ${prose} prose-headings:text-center prose-p:text-center prose-li:text-center prose-ul:mx-auto prose-ol:mx-auto`}
                style={{ ["--prose-primary"]: "#212020" }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
