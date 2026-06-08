"use client";

import React from "react";
import { Phone } from "lucide-react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

const prose =
  "prose max-w-none prose-headings:font-bold prose-headings:text-[#001633] prose-p:text-[#475569] prose-p:leading-relaxed prose-li:text-[#475569] prose-strong:text-[#001633] prose-a:text-[#BF1309] prose-h1:!text-3xl md:prose-h1:!text-4xl prose-h2:!text-2xl md:prose-h2:!text-3xl [&_ul]:list-none [&_ul]:space-y-2 [&_ul]:pl-0 [&_ul>li]:relative [&_ul>li]:pl-7 [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-[0.55em] [&_ul>li]:before:h-1.5 [&_ul>li]:before:w-1.5 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-[#BF1309] [&_ul>li]:before:content-['']";

export default function ServiceDescription27({ content }) {
  const text = content?.service_description2?.description ?? "";
  const html = text ? md.render(text) : "";
  if (!html && !text) return null;

  const title = content?.service_description2?.title ?? "";
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  return (
    <FullContainer id="service_description2" className="py-10 md:py-14 bg-[#efefef]">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-[#e5e7eb] p-6 md:p-10">
            {title ? (
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#001633] text-center mb-6">
                {title}
              </h2>
            ) : null}
            <div
              className={`${prose} prose-headings:text-center prose-p:text-center prose-li:text-center prose-ul:mx-auto prose-ol:mx-auto`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
            {phone ? (
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-8 mt-2 border-t border-[#e5e7eb]">
                <a
                  href={`tel:${phone}`}
                  className="inline-flex max-w-full items-center justify-center gap-2  bg-[#001633] text-white uppercase tracking-wide font-bold px-7 py-3 text-sm hover:bg-[#111827] transition-colors duration-200"
                >
                  Call Us Today
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href={`tel:${phone}`}
                  className="inline-flex max-w-full items-center justify-center gap-2  bg-[#d62828] text-white font-bold px-6 py-3 text-base hover:bg-[#bf1f1f] transition-colors duration-200"
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
