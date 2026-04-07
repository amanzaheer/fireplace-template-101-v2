"use client";

import React from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

export default function Slogan9({ content }) {
  const block = content?.slogan ?? {};
  const title = block.title ?? "";
  const description = block.description ?? "";

  if (!title && !description) return null;

  return (
    <FullContainer id="slogan" className="bg-white pt-6 md:pt-12 pb-10 flex flex-col items-center justify-center">
      <Container className="text-center flex flex-col items-center justify-center">
        {title ? (
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#212020] mb-4">
            {title}
          </h2>
        ) : null}
        {description ? (
          <p className="text-base md:text-lg text-[#212020] mb-4">
            {description}
          </p>
        ) : null}
      </Container>
    </FullContainer>
  );
}
