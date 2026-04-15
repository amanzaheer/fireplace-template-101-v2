"use client";

import React, { useMemo } from "react";
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

function stripFirstMatchingHeadingHtml(html, title) {
  if (!html || !title) return html;
  const normalizedTitle = title.trim().toLowerCase();
  const re = /<h[123][^>]*>([\s\S]*?)<\/h[123]>/i;
  const match = html.match(re);
  if (!match) return html;
  const innerText = match[1]
    .replace(/<[^>]*>/g, "")
    .trim()
    .toLowerCase();
  if (innerText !== normalizedTitle) return html;
  const start = match.index ?? 0;
  return (html.slice(0, start) + html.slice(start + match[0].length)).trim();
}

export default function ServiceDescription14({ content }) {
  const block =
    content?.service_description2 &&
    typeof content.service_description2 === "object"
      ? content.service_description2
      : {};
  const title = typeof block.title === "string" ? block.title.trim() : "";
  const description =
    typeof block.description === "string" ? block.description.trim() : "";

  const descriptionHtml = useMemo(() => {
    const rendered = description ? md.render(description) : "";
    return stripFirstMatchingHeadingHtml(rendered, title);
  }, [description, title]);

  if (!title && !descriptionHtml) return null;

  const phone =
    content?.contact_info?.phone?.trim() ||
    content?.navbar?.phone?.trim() ||
    "";

  return (
    <FullContainer
      id="service_description2"
      className="relative overflow-hidden bg-gradient-to-t from-[#fffdfb] via-white to-[#f5f2ee] ] py-12 md:py-16 lg:py-20"
    >
      <Container className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)] ring-1 ring-black/[0.04]">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#F59402] via-[#ffb347] to-[#F59402]" />

          <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">
            {title ? (
              <div className="relative flex flex-col justify-center border-b border-neutral-200/90 bg-gradient-to-b from-[#fafcff] to-white px-6 py-10 md:px-10 lg:col-span-4 lg:border-b-0 lg:border-r lg:py-14 lg:pl-12 lg:pr-8">
                <div
                  className="absolute left-0 top-12 bottom-12 hidden w-1 rounded-full bg-[#F59402] lg:block"
                  aria-hidden
                />
                <h2
                  className={`${poppins.className} text-left text-[1.75rem] font-bold leading-[1.15] tracking-tight text-neutral-900 sm:text-3xl md:text-[2rem]`}
                >
                  {title}
                </h2>
              </div>
            ) : null}

            <div
              className={`${inter.className} flex flex-col justify-center px-6 py-10 md:px-10 ${
                title
                  ? "lg:col-span-8 lg:py-14 lg:pl-10 lg:pr-12"
                  : "lg:col-span-12 lg:px-12 lg:py-12 xl:px-16 xl:py-14"
              }`}
            >
              {descriptionHtml ? (
                <div
                  className="prose prose-neutral max-w-none prose-headings:font-semibold prose-headings:text-neutral-900 prose-p:text-left prose-p:text-[15px] prose-p:leading-7 prose-p:text-neutral-600 md:prose-p:text-[17px] prose-li:text-neutral-600 prose-strong:text-neutral-800 prose-a:text-neutral-600 prose-a:no-underline hover:prose-a:text-neutral-900 hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
              ) : null}

              <div className="mt-8 flex flex-col gap-3 border-t border-neutral-200/90 pt-8 sm:flex-row sm:flex-wrap sm:items-center">
                {phone ? (
                  <div className="[&_button]:!h-[48px] [&_button]:!min-w-[180px] [&_button]:!rounded-xl [&_button]:!border-0 [&_button]:!bg-[#F59402] [&_button]:!px-6 [&_button]:!py-2.5 [&_button]:!text-[15px] [&_button]:!font-semibold [&_button]:!text-white [&_button]:!shadow-md [&_button]:!shadow-[#F59402]/30 [&_button]:transition [&_button]:hover:!bg-[#df8601] [&_svg]:!h-5 [&_svg]:!w-5 [&_svg]:!text-white">
                    <PrimaryPhone phone={phone} />
                  </div>
                ) : null}
                <div className="[&_button]:!h-[48px] [&_button]:!min-w-[170px] [&_button]:!rounded-xl [&_button]:!border-0 [&_button]:!bg-[#334155] [&_button]:!px-6 [&_button]:!py-2.5 [&_button]:!text-sm [&_button]:!font-semibold [&_button]:!uppercase [&_button]:!tracking-wide [&_button]:!text-white [&_button]:!shadow-md [&_button]:transition [&_button]:hover:!bg-[#1e293b]">
                  <QuoteButton phone={phone} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
