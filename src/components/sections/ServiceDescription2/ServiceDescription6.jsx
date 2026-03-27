"use client";

import React from "react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import PrimaryPhone from "@/components/common/PrimaryPhone";
import QuoteButton from "@/components/common/QuoteButton";

export default function ServiceDescription6({ content }) {
  const title = content?.service_description2?.title ?? "";
  const text = content?.service_description2?.description ?? "";
  const html = text ? md.render(text) : "";
  if (!html && !text) return null;

  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  return (
    <FullContainer id="service_description2" className="py-6 md:py-8">
      <Container>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mx-4 md:mx-0">
          <div className="py-5">
            <div
              className="mx-auto max-w-full prose text-primary"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
          <div className="flex flex-wrap justify-center text-center items-center gap-4 lg:gap-6 pt-6">
            {phone ? <PrimaryPhone phone={phone} /> : null}
            <QuoteButton phone={phone} />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
