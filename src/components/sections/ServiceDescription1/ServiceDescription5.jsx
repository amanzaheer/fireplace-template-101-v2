"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, TextQuote } from "lucide-react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

/** Drops a leading # / ## heading so it is not doubled when `title` is shown separately. */
function stripLeadingMarkdownHeading(text) {
  if (typeof text !== "string") return text;
  return text.replace(/^\s*#{1,6}\s+[^\n]+\n*/, "");
}

export default function ServiceDescription5({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  const scrollToQuote = useCallback(() => {
    const el =
      document.getElementById("quote-form-section") ??
      document.querySelector(
        '.quote-form, [id*="quote"], [class*="quote-form"]'
      );
    if (el) {
      const offset = 80;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - offset,
        behavior: "smooth",
      });
    }
  }, []);

  if (!content?.service_description?.description) return null;

  const title = content?.service_description?.title ?? "Our Service";

  const description = stripLeadingMarkdownHeading(
    content?.service_description?.description ||
      "Professional, reliable service from experienced local technicians."
  );

  const imageSrc = content?.service_description?.file_name
    ? buildImageSrc(IMAGE_BASE, content?.service_description?.file_name)
    : buildImageSrc(IMAGE_BASE, "hero/hero.webp");

  return (
    <FullContainer
      id="service_description"
      className="py-10 md:py-14 lg:py-16 bg-stone-100"
    >
      {/* Same width + horizontal padding as Navbar5 */}
      <Container className="mx-auto">
        <div className="flex w-full flex-col overflow-hidden rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] md:flex-row md:items-stretch md:rounded-3xl">
          {/* Image — shorter on mobile, stretches with text on md+ */}
          <div className="relative order-1 aspect-[16/10] max-h-[220px] w-full shrink-0 sm:aspect-[5/3] sm:max-h-[260px] md:order-2 md:aspect-auto md:max-h-none md:min-h-[200px] md:w-[42%] lg:min-h-[220px] lg:w-[44%]">
            {imageSrc && (
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 44vw"
                loading="lazy"
              />
            )}
          </div>

          {/* Content */}
          <div className="order-2 flex flex-1 flex-col justify-center bg-white px-5 py-8 sm:px-7 sm:py-9 md:order-1 md:px-8 md:py-9 lg:px-10 lg:py-10">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-[2.5rem] md:leading-[1.15] mb-5 md:mb-6">
              {title}
            </h2>

            <div
              className="prose prose-sm prose-gray max-w-none text-gray-600 sm:prose-base prose-p:mb-4 prose-headings:text-gray-900 prose-strong:text-gray-900 prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: md.render(description) }}
            />

            {phone ? (
              <div className="flex flex-col gap-4 pt-6 mt-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Link
                  href={`tel:${phone}`}
                  className="inline-flex w-full min-w-[205px] flex-1 items-center justify-center gap-2 rounded-full bg-[#D35400] px-6 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-[#b84700] active:bg-[#a03d00] sm:w-auto sm:flex-initial md:text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D35400]"
                >
                  <Phone className="h-5 w-5 shrink-0" aria-hidden />
                  {phone}
                </Link>
                <button
                  type="button"
                  onClick={scrollToQuote}
                  className="inline-flex min-h-[48px] w-full min-w-[205px] flex-1 items-center justify-center gap-2 rounded-full bg-[#D35400] px-6 py-3 font-barlow text-base font-bold tracking-wide text-white shadow-md transition-colors hover:bg-[#b84700] active:bg-[#a03d00] sm:w-[205px] sm:flex-initial focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D35400]"
                >
                  <TextQuote className="h-6 w-6 shrink-0" aria-hidden />
                  GET A QUOTE
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}