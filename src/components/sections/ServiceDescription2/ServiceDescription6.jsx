"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { ArrowRight, Phone } from "lucide-react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ACCENT = "#D35400";

export default function ServiceDescription6({ content }) {
  const text = content?.service_description2?.description ?? "";
  const html = text ? md.render(text) : "";
  if (!html && !text) return null;

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
      className={`${poppins.className} bg-linear-to-b from-stone-100/90 to-stone-50 py-10 md:py-14 lg:py-16`}
    >
      <Container className="px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-stone-200/80 bg-white p-6 shadow-[0_28px_64px_-28px_rgba(0,0,0,0.18)] md:p-10 lg:p-12">
            <div
              className="mx-auto mb-6 h-1 w-14 rounded-full md:mb-8"
              style={{ backgroundColor: ACCENT }}
              aria-hidden
            />
            <div
              className="mx-auto max-w-7xl text-center prose prose-gray prose-accent-d354-center prose-h1:text-2xl prose-h1:leading-snug md:prose-h1:text-4xl lg:prose-h1:text-[2.25rem] prose-h2:text-xl md:prose-h2:text-3xl lg:prose-h2:text-4xl prose-h3:text-lg md:prose-h3:text-2xl lg:prose-h3:text-3xl prose-headings:font-bold prose-headings:leading-tight md:prose-headings:text-4xl lg:prose-headings:text-[2.5rem] prose-p:text-lg prose-p:leading-relaxed md:prose-p:text-xl lg:prose-p:text-[1.35rem] prose-li:text-lg md:prose-li:text-xl prose-li:leading-relaxed prose-headings:text-center prose-p:text-center prose-li:text-center"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-stone-100 pt-8 md:mt-10 md:gap-5 lg:gap-6">
              <button
                type="button"
                onClick={scrollToQuote}
                className="inline-flex min-h-[52px] min-w-[200px] items-center justify-center gap-2 rounded-xl border-2 border-neutral-900 bg-neutral-900 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-sm transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 md:min-h-[56px] md:px-8 md:text-base"
              >
                Get a quote
                <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
              </button>
              {phone ? (
                <Link
                  href={telHref}
                  className="inline-flex min-h-[52px] min-w-[240px] items-center justify-center gap-2.5 rounded-xl px-8 py-3.5 text-base font-bold text-white shadow-md transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 md:min-h-[56px] md:min-w-[260px] md:text-lg"
                  style={{
                    backgroundColor: ACCENT,
                    outlineColor: ACCENT,
                  }}
                >
                  <Phone className="h-6 w-6 shrink-0" aria-hidden />
                  {phone}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
