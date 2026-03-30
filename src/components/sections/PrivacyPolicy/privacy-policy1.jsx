"use client";

import React from "react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

export default function PrivacyPolicy1({ content }) {
  const body = content?.body ?? "";
  const html = body ? md.render(body) : "";

  return (
    <FullContainer>
      <Container>
        {html ? (
          <div
            className="prose prose-h2:text-start prose-p:text-lg text-primary max-w-full w-full my-8"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <p className="my-8 text-gray-500">
            Privacy policy content coming soon.
          </p>
        )}
      </Container>
    </FullContainer>
  );
}

