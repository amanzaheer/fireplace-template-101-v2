"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, TextQuote } from "lucide-react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

const ACCENT = "#D35400";

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

const btnAccent =
  "inline-flex min-h-[48px] min-w-[205px] flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white shadow-md transition-colors hover:opacity-90 active:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:flex-initial";

export default function ServiceDescription5({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  const scrollToQuote = useCallback(() => {
    const el =
      document.getElementById("quote-form-section") ??
      document.querySelector(
        '.quote-form, [id*="quote"], [class*="quote-form"]',
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
      "Professional, reliable service from experienced local technicians.",
  );

  const imageSrc = content?.service_description?.file_name
    ? buildImageSrc(IMAGE_BASE, content?.service_description?.file_name)
    : buildImageSrc(IMAGE_BASE, "hero/hero.webp");

  const telHref = phone ? `tel:${String(phone).replace(/\s/g, "")}` : "";

  return (
    <FullContainer id="service_description" className="bg-white py-10 md:py-14">
      <Container className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
          <div className="relative w-full">
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-[28px] bg-gray-100 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.22)] ring-1 ring-black/5 md:aspect-4/3">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              ) : null}
            </div>
          </div>

          <div className="space-y-5">
            <h2
              className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-[2.35rem] md:leading-[1.12]"
              style={{ color: ACCENT }}
            >
              {title}
            </h2>

            <div
              className="prose prose-gray prose-accent-d354 max-w-none text-start prose-headings:font-bold"
              dangerouslySetInnerHTML={{ __html: md.render(description) }}
            />

            {phone ? (
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href={telHref}
                  className={`${btnAccent} w-full sm:w-auto`}
                  style={{ backgroundColor: ACCENT, outlineColor: ACCENT }}
                >
                  <Phone className="h-5 w-5 shrink-0" aria-hidden />
                  {phone}
                </Link>
                <button
                  type="button"
                  onClick={scrollToQuote}
                  className={`${btnAccent} font-barlow w-full font-bold tracking-wide sm:w-[205px]`}
                  style={{ backgroundColor: ACCENT, outlineColor: ACCENT }}
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
