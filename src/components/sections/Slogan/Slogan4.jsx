"use client";

import React from "react";
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

export default function Slogan4({ content }) {
  const block = content?.slogan ?? {};
  const title = block.title ?? "";
  const description = block.description ?? "";

  if (!title && !description) return null;

  return (
    <FullContainer
      id="slogan"
      className="bg-[#f59402] py-8 md:py-10 flex flex-col items-center justify-center"
    >
      <Container className="text-center flex flex-col items-center justify-center">
        {title ? (
          <h2 className={`${poppins.className} text-3xl md:text-[44px] font-extrabold text-white mb-3 tracking-tight leading-tight`}>
            {title}
          </h2>
        ) : null}
        {description ? (
          <p className={`${inter.className} text-[16px] md:text-[18px] leading-[21px] md:leading-[26px] text-white/95 mb-0 max-w-4xl`}>
            {description}
          </p>
        ) : null}
      </Container>
    </FullContainer>
  );
}
