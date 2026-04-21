"use client";

import React from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export default function Slogan15({ content }) {
  const block = content?.slogan ?? {};
  const title = block.title ?? "";
  const description = block.description ?? "";

  if (!title && !description) return null;

  return (
    <FullContainer id="slogan" className="bg-white pt-6 md:pt-12 pb-10 flex flex-col items-center justify-center">
      <Container className="text-center flex flex-col items-center justify-center">
        {title ? (
          <h2 className={`${poppins.className} text-black text-center text-[32px] lg:text-[44px]  w-full font-semibold mb-4 md:mb-6`}>
            {title}
          </h2>
        ) : null}
        {description ? (
          <p className={`${poppins.className} text-[16px] md:text-[20px] text-black mb-4`}>
            {description}
          </p>
        ) : null}
      </Container>
    </FullContainer>
  );
}
