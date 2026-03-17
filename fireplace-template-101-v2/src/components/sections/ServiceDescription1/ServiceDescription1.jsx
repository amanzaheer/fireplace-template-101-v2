"use client";

import React from "react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

export default function ServiceDescription1({ content }) {
  const title = content?.service_description1?.title ?? "";
  const text = content?.service_description1?.description ?? "";
  const html = text ? md.render(text) : "";
  if (!html && !text) return null;

  return (
    <FullContainer id="service_description1" className="py-6 md:py-8">
      <Container>
        <div className="py-5">
          <div
            className="mx-auto max-w-full prose text-primary"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </Container>
    </FullContainer>
  );
}
