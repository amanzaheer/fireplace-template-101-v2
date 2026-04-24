"use client";

import React from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

export default function Slogan16({ content }) {
  const block = content?.slogan ?? {};
  const title = block.title ?? "";
  const description = block.description ?? "";

  if (!title && !description) return null;

  return (
    <FullContainer
      id="slogan"
      className="bg-transparent p-0 m-0 flex items-start justify-start"
    >
      <Container className="p-0 m-0">
        <div className="max-w-xl">

          {title ? (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-black mb-4">
              {title}
            </h2>
          ) : null}

          {description ? (
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {description}
            </p>
          ) : null}

        </div>
      </Container>
    </FullContainer>
  );
}