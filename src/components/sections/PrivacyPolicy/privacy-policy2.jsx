"use client";

import React from "react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

const prose =
  "prose max-w-none text-[#171717] prose-headings:font-extrabold prose-headings:text-[#171717] prose-p:text-[#212020] prose-li:text-[#212020] prose-strong:text-[#212020] prose-a:text-[#212020] prose-h1:!text-3xl md:prose-h1:!text-4xl prose-h2:!text-2xl md:prose-h2:!text-3xl";

export default function PrivacyPolicy2({ content }) {
  const body = content?.body ?? "";
  const html = body ? md.render(body) : "";

  return (
    <FullContainer className="py-10 md:py-14 bg-[#efefef]">
      <Container>
        {html ? (
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-[#e5e7eb] p-6 md:p-10">
              <div
                className={`${prose} mx-auto prose-headings:text-center prose-p:text-center prose-li:text-center prose-ul:mx-auto prose-ol:mx-auto`}
                style={{ ["--prose-primary"]: "#212020" }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
        ) : (
          <p className="my-8 text-gray-500">Privacy policy content coming soon.</p>
        )}
      </Container>
    </FullContainer>
  );
}

