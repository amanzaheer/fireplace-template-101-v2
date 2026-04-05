"use client";

import React from "react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

const ACCENT = "#D35400";

export default function ServiceDescription6({ content }) {
  const text = content?.service_description1?.description ?? "";
  const html = text ? md.render(text) : "";
  if (!html && !text) return null;

  return (
    <FullContainer
      id="service_description1"
      className="font-barlow bg-linear-to-b from-stone-50 to-white py-10 md:py-14 lg:py-16"
    >
      <Container className="px-5 sm:px-2 md:px-4 lg:px-6 ">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-stone-200/90 bg-white p-8 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.15)] md:p-10 lg:p-12">
            <div
              className="mx-auto mb-2 h-1 w-14 rounded-full md:mb-3"
              style={{ backgroundColor: ACCENT }}
              aria-hidden
            />
            <div
              className="mx-auto max-w-7xl text-center font-barlow prose prose-gray prose-accent-d354-center prose-h1:text-2xl prose-h1:leading-snug md:prose-h1:text-3xl lg:prose-h1:text-[2.25rem] prose-h2:text-xl md:prose-h2:text-3xl lg:prose-h2:text-4xl prose-h3:text-lg md:prose-h3:text-2xl lg:prose-h3:text-3xl prose-headings:font-extrabold prose-headings:leading-tight md:prose-headings:text-4xl lg:prose-headings:text-[2.5rem] prose-p:text-lg prose-p:leading-relaxed md:prose-p:text-xl lg:prose-p:text-[1.35rem] prose-li:text-lg md:prose-li:text-xl prose-li:leading-relaxed prose-headings:text-center prose-p:text-center prose-li:text-center"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
