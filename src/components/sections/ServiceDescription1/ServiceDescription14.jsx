"use client";

import React, { useMemo } from "react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

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
    content?.service_description1 &&
    typeof content.service_description1 === "object"
      ? content.service_description1
      : {};
  const title = typeof block.title === "string" ? block.title.trim() : "";
  const text =
    typeof block.description === "string" ? block.description.trim() : "";

  const descriptionHtml = useMemo(() => {
    const rendered = text ? md.render(text) : "";
    return stripFirstMatchingHeadingHtml(rendered, title);
  }, [text, title]);

  if (!title && !descriptionHtml) return null;

  return (
    <FullContainer
      id="service_description1"
      className="border-t border-neutral-200/80 bg-gradient-to-b from-[#fffdfb] via-white to-[#f5f2ee]  py-10 md:py-14 lg:py-16"
    >
      <Container className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-neutral-200/90 bg-white px-6 py-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] md:px-10 md:py-10">
            {title ? (
              <h2 className="font-montserrat text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
                <span className="border-l-4 border-[#F59402] pl-4">
                  {title}
                </span>
              </h2>
            ) : null}

            {descriptionHtml ? (
              <div
                className={`prose prose-neutral mt-6 max-w-none md:mt-8 ${
                  title ? "" : "mt-0"
                } prose-headings:font-montserrat prose-headings:font-semibold prose-headings:text-neutral-900 prose-p:text-left prose-p:text-[15px] prose-p:leading-relaxed prose-p:text-neutral-600 md:prose-p:text-base prose-li:text-neutral-600 prose-strong:text-neutral-800 prose-a:text-neutral-600 prose-a:no-underline hover:prose-a:text-neutral-900 hover:prose-a:underline`}
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
