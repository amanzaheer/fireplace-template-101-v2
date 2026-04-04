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

  export default function ServiceDescription6({ content }) {
  const text = content?.service_description2?.description ?? "";
  const html = text ? md.render(text) : "";
  if (!html && !text) return null;

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

  return (
    <FullContainer
      id="service_description2"
      className={`${poppins.className} bg-gray-50 py-10 md:py-14 lg:py-16`}
    >
      <Container className="px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl md:p-10 lg:p-12">
            <div
              className="mx-auto max-w-4xl text-center prose prose-headings:text-center prose-p:text-center prose-li:text-center prose-headings:text-3xl prose-headings:font-bold prose-headings:text-black prose-headings:leading-tight md:prose-headings:text-4xl lg:prose-headings:text-[2.5rem] prose-h1:text-2xl prose-h1:leading-snug md:prose-h1:text-4xl lg:prose-h1:text-[2.25rem] prose-h2:text-xl md:prose-h2:text-3xl lg:prose-h2:text-4xl prose-h3:text-lg md:prose-h3:text-2xl lg:prose-h3:text-3xl prose-p:text-lg prose-p:leading-relaxed prose-p:text-gray-600 md:prose-p:text-xl lg:prose-p:text-[1.35rem] prose-li:text-lg md:prose-li:text-xl prose-li:leading-relaxed prose-li:text-gray-600 prose-strong:font-bold prose-strong:text-gray-900 prose-a:text-lg prose-a:font-semibold prose-a:text-[#002B5B] prose-a:underline-offset-2 md:prose-a:text-xl hover:prose-a:text-[#001f42]"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-gray-100 pt-8 md:mt-10 md:gap-6 lg:gap-9">
              <button
                type="button"
                onClick={scrollToQuote}
                className="inline-flex min-h-[56px] min-w-[220px] items-center justify-center gap-2 rounded-xl bg-[#111827] px-8 py-4 text-base font-bold uppercase tracking-[0.08em] text-white shadow-md transition-colors hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2 md:text-lg"
              >
                Get a quote
                <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
              </button>
              {phone ? (
                <Link
                  href={`tel:${phone}`}
                  className="inline-flex min-h-[56px] min-w-[260px] items-center justify-center gap-2.5 rounded-xl bg-[#F97316] px-8 py-4 text-lg font-bold text-white shadow-md transition-colors hover:bg-[#ea580c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2 md:text-xl"
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
