"use client";
import React from "react";
import Link from "next/link";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Phone, TextQuote } from "lucide-react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Markdown body + in-content headings (same family as Gallery9 / template). */
const proseBody = cn(
  poppins.className,
  "prose max-w-none text-center text-[16px] font-normal not-italic leading-[normal] text-[#000]",
  "[&_h1,&_h2,&_h3,&_h4,&_h5,&_h6]:text-center [&_h1,&_h2,&_h3,&_h4,&_h5,&_h6]:text-[25.02px] [&_h1,&_h2,&_h3,&_h4,&_h5,&_h6]:font-semibold [&_h1,&_h2,&_h3,&_h4,&_h5,&_h6]:leading-[140%] [&_h1,&_h2,&_h3,&_h4,&_h5,&_h6]:text-[var(--Primary,#24232A)]",
  "[&_p]:m-0 [&_p]:text-center [&_p]:text-[16px] [&_p]:font-normal [&_p]:leading-[normal] [&_p]:text-[#000]",
  "[&_p+p]:mt-3",
  "[&_li]:text-[16px] [&_li]:font-normal [&_li]:leading-[normal] [&_li]:text-[#000]",
  "[&_ul,&_ol]:my-3 [&_ul,&_ol]:text-center",
  "[&_a]:text-[#EFA536] hover:[&_a]:underline",
  "[&_strong]:font-semibold [&_strong]:text-[#000]",
);

function resolvePhone(content) {
  const raw =
    content?.banner?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";
  return typeof raw === "string" ? raw.trim() : "";
}

export default function ServiceDescription9({ content }) {
  const title = String(content?.service_description2?.title ?? "").trim();
  const text = content?.service_description2?.description ?? "";
  const html = text.trim() ? md.render(text) : "";

  if (!title && !html) return null;

  const phone = resolvePhone(content);
  const phoneLink = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#";

  const handleQuoteClick = () => {
    const el =
      document.getElementById("quote-form-section") ??
      document.querySelector(
        '.quote-form, [id*="quote"], [class*="quote-form"]',
      );
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <FullContainer id="service_description2" className="py-6 md:py-8">
      <Container>
        <div className="mx-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg md:mx-0">
          <div className="py-5">
            {title ? (
              <h2
                className={cn(
                  poppins.className,
                  "text-balance text-center text-3xl font-bold uppercase not-italic leading-tight tracking-tight text-[#000] md:text-4xl lg:text-[2.5rem]",
                )}
              >
                {title}
              </h2>
            ) : null}

            {html ? (
              <div
                className={cn(proseBody, title ? "mt-6 md:mt-8" : "")}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : null}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 text-center lg:gap-6">
            {phone ? (
              <Link
                href={phoneLink}
                className={cn(
                  poppins.className,
                  "inline-flex h-12 min-w-[200px] items-center justify-center gap-2 rounded-md bg-[#EFA536] px-5 text-sm font-bold uppercase text-white shadow-sm transition-colors hover:bg-[#e49a2a]",
                )}
              >
                <Phone className="h-5 w-5 shrink-0" strokeWidth={2.25} />
                {phone}
              </Link>
            ) : null}
            <button
              type="button"
              onClick={handleQuoteClick}
              className={cn(
                poppins.className,
                "inline-flex h-12 min-w-[200px] items-center justify-center gap-2 rounded-md bg-[#EFA536] px-5 text-sm font-bold uppercase text-white shadow-sm transition-colors hover:bg-[#e49a2a]",
              )}
            >
              <TextQuote className="h-5 w-5 shrink-0" strokeWidth={2.25} />
              GET A QUOTE
            </button>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
