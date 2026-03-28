"use client";

import React from "react";
import { Phone } from "lucide-react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

const prose =
  "prose max-w-none text-[#171717] prose-headings:font-extrabold prose-headings:text-[#171717] prose-p:text-[#212020] prose-li:text-[#212020] prose-strong:text-[#212020] prose-a:text-[#212020] prose-h1:!text-3xl md:prose-h1:!text-4xl prose-h2:!text-2xl md:prose-h2:!text-3xl";

export default function ServiceDescription3({ content }) {
  const text = content?.service_description2?.description ?? "";
  const html = text ? md.render(text) : "";
  if (!html && !text) return null;

  const title = content?.service_description2?.title ?? "";
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  return (
    <FullContainer id="service_description2" className="py-10 md:py-14 bg-[#efefef]">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="bg-white  shadow-sm border border-[#e5e7eb] p-6 md:p-10">
            {title ? (
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#212020] text-center mb-6">
                {title}
              </h2>
            ) : null}
            <div
              className={`${prose} prose-headings:text-center prose-p:text-center prose-li:text-center prose-ul:mx-auto prose-ol:mx-auto`}
              style={{ ["--prose-primary"]: "#212020" }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
            {phone ? (
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-8 mt-2 border-t border-[#e5e7eb]">
                <a
                  href={`tel:${phone}`}
                  className="inline-flex max-w-full items-center justify-center gap-2  bg-[#253d70] text-white uppercase tracking-wide font-bold px-7 py-3 text-sm hover:bg-[#111827] transition-colors duration-200"
                >
                  Call Us Today
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href={`tel:${phone}`}
                  className="inline-flex max-w-full items-center justify-center gap-2  bg-[#f59402] text-white font-bold px-6 py-3 text-base hover:cursor-pointer transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>{phone}</span>
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
