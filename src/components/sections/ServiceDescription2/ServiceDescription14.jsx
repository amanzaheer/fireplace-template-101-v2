"use client";

import React from "react";
import { Poppins, Inter } from "next/font/google";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import PrimaryPhone from "@/components/common/PrimaryPhone";
import QuoteButton from "@/components/common/QuoteButton";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function ServiceDescription14({ content }) {
  const block =
    content?.service_description2 && typeof content.service_description2 === "object"
      ? content.service_description2
      : {};
  const title = typeof block.title === "string" ? block.title.trim() : "";
  const description =
    typeof block.description === "string" ? block.description.trim() : "";
  const html = description ? md.render(description) : "";
  const contentHeadingClass = `${poppins.className} self-stretch text-[#2D2D2D] text-[21.095px] not-italic font-medium leading-[36.916px]`;
  const htmlWithStyledHeadings = html
    .replace(/<h1>/g, `<h1 class="${contentHeadingClass}">`)
    .replace(/<h2>/g, `<h2 class="${contentHeadingClass}">`)
    .replace(/<h3>/g, `<h3 class="${contentHeadingClass}">`)
    .replace(/<h4>/g, `<h4 class="${contentHeadingClass}">`)
    .replace(/<h5>/g, `<h5 class="${contentHeadingClass}">`)
    .replace(/<h6>/g, `<h6 class="${contentHeadingClass}">`);
  if (!title && !html) return null;

  const phone = content?.contact_info?.phone?.trim() || content?.navbar?.phone?.trim() || "";

  return (
    <FullContainer id="service_description2" className="bg-white py-10 md:py-12 lg:py-14">
      <Container className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-black/5 bg-[#FAFAFA] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] md:p-8 lg:p-10">
          {title ? (
            <h2 className={`${poppins.className} text-center text-3xl font-semibold leading-tight text-neutral-900 md:text-4xl`}>
              {title}
            </h2>
          ) : null}

          {html ? (
            <div
              className={`${inter.className} mx-auto mt-5 w-full max-w-[1000px] text-left text-base font-normal leading-relaxed text-neutral-600 md:mt-6 md:text-[17px] [&_p]:mb-3 [&_p:last-child]:mb-0 [&_li]:mb-1.5`}
              dangerouslySetInnerHTML={{ __html: htmlWithStyledHeadings }}
            />
          ) : null}

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {phone ? (
              <div className="[&_button]:!h-[50px] [&_button]:!rounded-[10px] [&_button]:!bg-[#F59402] [&_button]:hover:!bg-[#df8601] [&_button]:!px-5 [&_button]:!text-[17px] [&_button]:!font-semibold [&_button]:!shadow-none [&_button]:!min-w-0">
                <PrimaryPhone phone={phone} />
              </div>
            ) : null}

            <QuoteButton phone={phone} />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
