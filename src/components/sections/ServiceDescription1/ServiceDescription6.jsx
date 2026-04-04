"use client";

import React from "react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

export default function ServiceDescription6({ content }) {
  const text = content?.service_description1?.description ?? "";
  const html = text ? md.render(text) : "";
  if (!html && !text) return null;

  return (
    <FullContainer
      id="service_description1"
      className="font-barlow bg-white py-10 md:py-14 lg:py-16"
    >
      <Container className="px-5 sm:px-6 md:px-8 lg:px-10">
        <div
          className="mx-auto max-w-4xl text-center font-barlow prose prose-headings:font-barlow prose-headings:text-center prose-p:text-center prose-li:text-center prose-headings:text-3xl prose-headings:font-extrabold prose-headings:text-black prose-headings:leading-tight md:prose-headings:text-4xl lg:prose-headings:text-[2.5rem] prose-h1:text-2xl prose-h1:leading-snug md:prose-h1:text-3xl lg:prose-h1:text-[2.25rem] prose-h2:text-xl md:prose-h2:text-3xl lg:prose-h2:text-4xl prose-h3:text-lg md:prose-h3:text-2xl lg:prose-h3:text-3xl prose-p:text-lg prose-p:leading-relaxed prose-p:text-gray-600 md:prose-p:text-xl lg:prose-p:text-[1.35rem] prose-li:text-lg md:prose-li:text-xl prose-li:leading-relaxed prose-li:text-gray-600 prose-strong:font-bold prose-strong:text-gray-900 prose-a:text-lg prose-a:font-semibold prose-a:text-[#002B5B] prose-a:underline-offset-2 md:prose-a:text-xl hover:prose-a:text-[#001f42]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Container>
    </FullContainer>
  );
}
