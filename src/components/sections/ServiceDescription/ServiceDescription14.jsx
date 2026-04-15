"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import PrimaryPhone from "@/components/common/PrimaryPhone";
import { IMAGE_BASE } from "@/lib/constants";
import QuoteButton from "@/components/common/QuoteButton";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

/** Remove first h1–h3 block if its plain text matches the section title (avoids duplicate headings from CMS markdown). */
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
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  if (!content?.service_description?.description) return null;

  const title = content?.service_description?.title ?? "Our Service";

  const description =
    content?.service_description?.description ||
    "Professional, reliable service from experienced local technicians.";

  const imageSrc = content?.service_description?.file_name
    ? buildImageSrc(IMAGE_BASE, content?.service_description?.file_name)
    : buildImageSrc(IMAGE_BASE, "hero/hero.webp");

  const descriptionHtml = useMemo(() => {
    const rendered = md.render(description);
    return stripFirstMatchingHeadingHtml(rendered, title);
  }, [description, title]);

  return (
    <FullContainer
      id="service_description"
      className="relative overflow-hidden bg-gradient-to-b from-[#fffdfb] via-white to-[#f5f2ee] py-12 md:py-16 lg:py-20"
    >
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-[#F59402]/[0.07] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-[#01306E]/[0.04] blur-3xl"
        aria-hidden
      />

      <Container className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center lg:col-span-6">
            <div className="relative rounded-[28px] border border-neutral-200/90 bg-white/90 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)] backdrop-blur-sm md:p-9 lg:p-10">
              <div
                className="absolute left-0 top-10 hidden h-28 w-1 rounded-full bg-[#F59402] md:block"
                aria-hidden
              />
              <div className="md:pl-5">
                {title ? (
                  <h2 className="font-montserrat text-[1.65rem] font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl md:text-[2rem] lg:text-[2.125rem]">
                    <span className="relative inline-block">
                      {title}
                      <span
                        className="absolute -bottom-1 left-0 h-1 w-12 rounded-full bg-[#F59402]"
                        aria-hidden
                      />
                    </span>
                  </h2>
                ) : null}

                <div
                  className="prose prose-neutral mt-6 max-w-none font-poppins prose-headings:font-montserrat prose-headings:text-[#1a1a1a] prose-p:text-left prose-p:text-[15px] prose-p:leading-7 prose-p:text-neutral-700 md:prose-p:text-base md:prose-p:leading-relaxed prose-a:text-gray-600 prose-strong:text-[#212020] prose-ul:my-3"
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />

                {phone ? (
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <div className="[&_button]:!h-[48px] [&_button]:!min-w-[180px] [&_button]:!rounded-xl [&_button]:!border-0 [&_button]:!bg-[#F59402] [&_button]:!px-6 [&_button]:!py-2.5 [&_button]:!text-[15px] [&_button]:!font-semibold [&_button]:!text-white [&_button]:!shadow-md [&_button]:!shadow-[#F59402]/25 [&_button]:transition [&_button]:hover:!bg-[#df8601] [&_svg]:!h-5 [&_svg]:!w-5 [&_svg]:!text-white">
                      <PrimaryPhone phone={phone} />
                    </div>
                    <div className="[&_button]:!h-[48px] [&_button]:!min-w-[160px] [&_button]:!rounded-xl [&_button]:!border-0 [&_button]:!bg-[#4a4a4a] [&_button]:!px-6 [&_button]:!py-2.5 [&_button]:!text-sm [&_button]:!font-semibold [&_button]:!uppercase [&_button]:!tracking-wide [&_button]:!text-white [&_button]:!shadow-md [&_button]:transition [&_button]:hover:!bg-[#3d3d3d]">
                      <QuoteButton phone={phone} />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-[28px] bg-neutral-200 shadow-[0_20px_50px_rgba(0,0,0,0.12)] ring-2 ring-[#F59402]/20 md:aspect-[5/4] lg:mx-0 lg:max-w-none lg:min-h-[min(420px,52vh)]">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
              ) : null}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-[#F59402]/10"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
