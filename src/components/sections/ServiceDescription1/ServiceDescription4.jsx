"use client";

import React from "react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins, Inter } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const contentStyles =
  "[&_h1]:text-[#212020] [&_h1]:font-bold [&_h1]:text-3xl md:[&_h1]:text-4xl [&_h1]:text-center [&_h1]:mb-3 " +
  "[&_h2]:text-[#212020] [&_h2]:font-bold [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:text-center [&_h2]:mb-3 [&_h2]:mt-4 " +
  "[&_h3]:text-[#212020] [&_h3]:font-semibold [&_h3]:text-xl [&_h3]:text-center [&_h3]:mb-2 [&_h3]:mt-3 " +
  "[&_p]:text-[#6e6e6e] [&_p]:text-[16px] [&_p]:leading-[21px] [&_p]:text-center [&_p]:mb-3 " +
  "[&_li]:text-[#6e6e6e] [&_li]:text-[16px] [&_li]:leading-[21px] " +
  "[&_ul]:pl-5 [&_ul]:list-disc [&_ul]:mb-3 [&_ol]:pl-5 [&_ol]:list-decimal [&_ol]:mb-3 " +
  "[&_strong]:text-[#212020] [&_strong]:font-semibold " +
  "[&_a]:text-[#f59403] [&_a]:underline";

export default function ServiceDescription4({ content }) {
  const title = content?.service_description1?.title ?? "";
  const text = content?.service_description1?.description ?? "";
  const html = text ? md.render(text) : "";
  if (!html && !text) return null;

  return (
    <FullContainer id="service_description1" className="py-6 md:py-8 bg-white">
      <Container>
        <div className="py-5 max-w-5xl mx-auto">

          {/* Title (optional, same theme) */}
          {title ? (
            <h2 className={`${poppins.className} text-3xl md:text-5xl font-extrabold tracking-tight text-[#212020] mb-6 md:mb-8 text-center`}>
              {title}
            </h2>
          ) : null}

          {/* Content */}
          <div
            className={`${inter.className} ${contentStyles} mx-auto`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </Container>
    </FullContainer>
  );
}