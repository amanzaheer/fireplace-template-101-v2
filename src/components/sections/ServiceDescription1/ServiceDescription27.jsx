"use client";

import React from "react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ACCENT_RED = "#BF1309";
const NAVY = "#001633";

const prose =
  "prose max-w-none text-[#1a1a1a] prose-headings:font-bold prose-headings:text-[#001633] prose-p:text-[#333333] prose-p:leading-relaxed prose-li:text-[#333333] prose-strong:text-[#001633] prose-a:text-[#BF1309] prose-a:font-medium prose-h1:!text-2xl md:prose-h1:!text-3xl prose-h2:!text-xl md:prose-h2:!text-2xl [&_ul]:list-none";
export default function ServiceDescription27({ content }) {
  const title = content?.service_description1?.title ?? "";
  const text = content?.service_description1?.description ?? "";
  const html = text ? md.render(text) : "";
  if (!html && !text) return null;

  return (
    <FullContainer
      id="service_description1"
      className={`bg-[#ececec] py-10 md:py-14 lg:py-16 ${poppins.className}`}
    >
      <Container className="px-4 sm:px-6">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_18px_40px_-16px_rgba(0,22,51,0.18)]">
          <div
            className="h-1.5 w-full"
            style={{
              background: `linear-gradient(90deg, ${NAVY} 0%, ${ACCENT_RED} 100%)`,
            }}
            aria-hidden
          />

          <div className="p-6 sm:p-8 lg:p-10 xl:p-12">
            <div
              className={`${prose} mx-auto max-w-full w-full text-left prose-h1:!text-start prose-h2:!text-start prose-h3:!text-start`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
