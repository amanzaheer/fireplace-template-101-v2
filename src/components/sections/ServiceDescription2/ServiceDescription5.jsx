"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { Phone, TextQuote } from "lucide-react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

const ACCENT = "#D35400";

/** Drops a leading # / ## heading so it is not doubled when `title` is shown separately. */
function stripLeadingMarkdownHeading(raw) {
  if (typeof raw !== "string") return raw;
  return raw.replace(/^\s*#{1,6}\s+[^\n]+\n*/, "");
}

const btnAccent =
  "inline-flex min-h-[48px] min-w-[205px] flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white shadow-md transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:flex-initial";

export default function ServiceDescription5({ content }) {
  const title = content?.service_description2?.title ?? "";
  const rawText = content?.service_description2?.description ?? "";
  if (!rawText.trim()) return null;

  const text = title ? stripLeadingMarkdownHeading(rawText) : rawText;
  const html = md.render(text);

  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const telHref = phone ? `tel:${String(phone).replace(/\s/g, "")}` : "";

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

  return (
    <FullContainer
      id="service_description2"
      className="bg-linear-to-b from-stone-50 to-white py-10 md:py-14"
    >
      <Container className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="rounded-3xl border border-stone-200/80 bg-white p-8 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.18)] md:p-10 lg:p-12">
          {title ? (
            <h2
              className="mb-6 text-center text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl md:mb-8 md:text-[2.35rem] md:leading-[1.12]"
              style={{ color: ACCENT }}
            >
              {title}
            </h2>
          ) : null}

          <div
            className="prose prose-gray prose-accent-d354 max-w-6xl mx-auto text-start prose-p:leading-relaxed prose-headings:font-bold"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            {phone ? (
              <Link
                href={telHref}
                className={`${btnAccent} w-full sm:w-auto`}
                style={{ backgroundColor: ACCENT, outlineColor: ACCENT }}
              >
                <Phone className="h-5 w-5 shrink-0" aria-hidden />
                {phone}
              </Link>
            ) : null}
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
        </div>
      </Container>
    </FullContainer>
  );
}
