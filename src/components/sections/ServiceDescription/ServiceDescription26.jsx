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

const sectionBtnWrap =
  "w-full sm:w-[220px] [&_a]:block [&_button]:!box-border [&_button]:!inline-flex [&_button]:!h-12 [&_button]:!w-full [&_button]:!min-w-0 [&_button]:!max-w-full [&_button]:!items-center [&_button]:!justify-center [&_button]:!gap-2 [&_button]:!rounded-2xl [&_button]:!border-0 [&_button]:!bg-[#D32F2F] [&_button]:!px-4 [&_button]:!py-0 [&_button]:!text-sm [&_button]:!font-semibold [&_button]:!text-white [&_button]:!shadow [&_button]:!transition [&_button]:hover:!bg-[#b82929] [&_svg]:!h-5 [&_svg]:!w-5 [&_svg]:!shrink-0 [&_svg]:!text-white";

export default function ServiceDescription26({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  if (!content?.service_description?.description) return null;

  const block = content?.service_description ?? {};
  const title = block.title ?? "";
  const ctaLabel = block.cta_label ?? "";
  const imageAlt = block.image_alt ?? title;
  const description = block.description ?? "";

  const imageSrc = block.file_name
    ? buildImageSrc(IMAGE_BASE, block.file_name)
    : buildImageSrc(IMAGE_BASE, "hero/hero.webp");

  const descriptionHtml = useMemo(() => {
    const rendered = md.render(description);
    return stripFirstMatchingHeadingHtml(rendered, title);
  }, [description, title]);

  return (
    <FullContainer
      id="service_description"
      className="relative overflow-hidden bg-[white] py-12 md:py-16 lg:py-20"
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
                {title ? (
                  <h2 className="font-montserrat text-[1.65rem] font-bold leading-tight tracking-tight text-black sm:text-3xl md:text-[2rem] lg:text-[2.125rem]">
                    {title}
                  </h2>
                ) : null}

                <div
                  className="prose prose-neutral mt-6 max-w-none font-poppins text-black prose-headings:font-montserrat prose-headings:!text-black prose-p:text-left prose-p:text-[15px] prose-p:leading-7 prose-p:!text-black md:prose-p:text-base md:prose-p:leading-relaxed prose-strong:!text-black prose-li:!text-black prose-a:!text-black prose-ul:my-3"
                  style={{ "--prose-primary": "#000000", color: "#000000" }}
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
                {phone ? (
                  <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
                    <div className={sectionBtnWrap}>
                      <PrimaryPhone phone={phone} />
                    </div>
                    {ctaLabel ? (
                      <div className={sectionBtnWrap}>
                        <QuoteButton phone={phone} label={ctaLabel} />
                      </div>
                    ) : null}
                  </div>
                ) : null}
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative mx-auto aspect-[4/3] h-full w-full max-w-xl overflow-hidden rounded-[28px] bg-[#000000] shadow-[0_20px_50px_rgba(0,0,0,0.12)] md:aspect-[5/4] lg:mx-0 lg:max-w-none lg:min-h-[52vh]">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={imageAlt}
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
