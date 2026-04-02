"use client";

import React from "react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

const prose =
  "prose text-[#212020] max-w-none prose-headings:font-extrabold prose-headings:text-[#171717] prose-p:text-[#212020] prose-li:text-[#212020] prose-strong:text-[#212020] prose-a:text-[#212020] prose-h1:!text-3xl md:prose-h1:!text-4xl prose-h2:!text-2xl md:prose-h2:!text-3xl";

export default function ServiceDescription7({ content }) {
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
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#210202] mb-6 md:mb-8 text-center">
              {title}
            </h2>
          ) : null}

          {/* Content */}
          <div
            className={`${prose} mx-auto prose-headings:text-center prose-p:text-center prose-li:text-center prose-ul:mx-auto prose-ol:mx-auto`}
            style={{ ["--prose-primary"]: "#212020" }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </Container>
    </FullContainer>
  );
}