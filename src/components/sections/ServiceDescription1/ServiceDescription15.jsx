"use client";

import React from "react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins, Rubik } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ServiceDescription15({ content }) {
  const title = content?.service_description1?.title ?? "";
  const text = content?.service_description1?.description ?? "";
  const html = text ? md.render(text) : "";
  if (!html && !text) return null;

  return (
    <FullContainer id="service_description1" className="bg-[#f4f5f7] py-10 md:py-14">
      <Container className="max-w-[880px] lg:px-0!">
        <div className="mx-auto rounded-[12px] border border-black/5 bg-white px-5 py-7 shadow-[0_2px_14px_rgba(0,0,0,0.06)] md:px-8 md:py-9">
          {title ? (
            <h2 className={`${rubik.className} mb-4 text-center text-[30px] font-bold leading-tight tracking-tight text-[#2d2d2d] md:mb-6 md:text-[40px]`}>
              {title}
            </h2>
          ) : null}

          <div
            className={[
              poppins.className,
              "mx-auto max-w-none text-center text-[13px] font-normal leading-[1.65] text-[#4a4a4a]",
              "[&_p]:m-0 [&_p]:text-center [&_p]:text-[13px] [&_p]:font-normal [&_p]:leading-[1.65] [&_p]:text-[#4a4a4a]",
              "[&_p+p]:mt-3",
              "[&_h1]:text-center [&_h1]:text-[20px] [&_h1]:font-semibold [&_h1]:text-[#2d2d2d]",
              "[&_h2]:text-center [&_h2]:text-[18px] [&_h2]:font-semibold [&_h2]:text-[#2d2d2d]",
              "[&_h3]:text-center [&_h3]:text-[16px] [&_h3]:font-semibold [&_h3]:text-[#2d2d2d]",
              "[&_li]:text-[13px] [&_li]:leading-[1.65] [&_li]:text-[#4a4a4a] [&_li]:marker:text-[#4a4a4a]",
              "[&_ul]:mx-auto [&_ul]:my-3 [&_ul]:w-fit [&_ul]:list-disc [&_ul]:pl-5",
              "[&_ol]:mx-auto [&_ol]:my-3 [&_ol]:w-fit [&_ol]:list-decimal [&_ol]:pl-5",
              "[&_a]:text-[#f59402] [&_a]:font-medium hover:[&_a]:underline",
            ].join(" ")}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </Container>
    </FullContainer>
  );
}
