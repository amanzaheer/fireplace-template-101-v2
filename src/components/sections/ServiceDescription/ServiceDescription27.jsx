"use client";

import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Poppins } from "next/font/google";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ACCENT_RED = "#BF1309";
const NAVY = "#001633";
const CTA_WIDTH = 258;
const CTA_HEIGHT = 73.33;
const CTA_PADDING = { top: 2.72, right: 1.36, bottom: 2.72, left: 1.36 };

const prose =
  "prose max-w-none text-[#1a1a1a] prose-headings:font-bold prose-headings:text-[#001633] prose-p:text-[#333333] prose-p:leading-relaxed prose-li:text-[#333333] prose-strong:text-[#001633] prose-a:text-[#BF1309] prose-a:font-medium prose-h1:!text-2xl md:prose-h1:!text-3xl prose-h2:!text-xl md:prose-h2:!text-2xl [&_ul]:list-none [&_ul]:space-y-2 [&_ul]:pl-0 [&_ul>li]:relative [&_ul>li]:pl-7 [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-[0.55em] [&_ul>li]:before:h-1.5 [&_ul>li]:before:w-1.5 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-[#BF1309] [&_ul>li]:before:content-['']";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function stripDuplicateLeadingHeading(markdown, sectionTitle) {
  if (!markdown || typeof markdown !== "string" || !sectionTitle) return markdown;
  const normalizedTitle = sectionTitle.replace(/\s+/g, " ").trim().toLowerCase();
  const lines = markdown.split(/\r?\n/);
  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i += 1;
  const m = lines[i]?.trim().match(/^#{1,6}\s+(.+)$/);
  if (!m) return markdown;
  const headingText = m[1].replace(/\s+/g, " ").trim().toLowerCase();
  if (headingText !== normalizedTitle) return markdown;
  i += 1;
  while (i < lines.length && lines[i].trim() === "") i += 1;
  return lines.slice(i).join("\n").trim();
}

export default function ServiceDescription27({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.service_description ?? {};

  if (!block?.description) return null;

  const title = block.title ?? "Our Service";
  const eyebrow = block.label ?? block.eyebrow ?? block.sub_title ?? "";
  const description =
    block.description ??
    "Professional, reliable service from experienced local technicians.";
  const ctaLabel = block.cta_label ?? "Call Us Today";
  const callNowLabel =
    block.call_now_label ?? content?.service_benefits?.call_now_label ?? "CALL NOW:";

  const imageSrc = block.file_name
    ? buildImageSrc(IMAGE_BASE, block.file_name)
    : buildImageSrc(IMAGE_BASE, "hero/hero.webp");
  const imageAlt = block.alt ?? block.image_alt ?? title;

  const descriptionHtml = useMemo(
    () => md.render(stripDuplicateLeadingHeading(description, title)),
    [description, title],
  );
  const telHref = phone ? `tel:${String(phone).replace(/[^\d+]/g, "")}` : "#";
  const scrollToQuoteForm = useCallback(() => {
    const el =
      document.getElementById("quote-form-section") ??
      document.getElementById("contact-us") ??
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
      id="service_description"
      className={`bg-[#ececec] py-10 md:py-14 lg:py-16 ${poppins.className}`}
    >
      <Container className="px-4 sm:px-6">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_18px_40px_-16px_rgba(0,22,51,0.18)]">
          <div
            className="h-1.5 w-full"
            style={{
              background: `linear-gradient(90deg, ${NAVY} 0%, ${ACCENT_RED} 100%)`,
            }}
            aria-hidden
          />

          <div className="grid grid-cols-1 items-center gap-8 p-6 sm:p-8 md:gap-10 lg:grid-cols-2 lg:gap-12 lg:p-10 xl:p-12">
            {/* Copy */}
            <div className="order-2 lg:order-1">
              {eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#BF1309] md:text-sm">
                  {eyebrow}
                </p>
              ) : null}

              <h2
                className={`text-[28px] font-bold leading-tight text-[#001633] sm:text-[34px] md:text-[38px] ${
                  eyebrow ? "mt-2" : ""
                }`}
              >
                {title}
              </h2>

             
              <div
                className={`${prose} mt-6 w-full text-left prose-h1:!text-start prose-h2:!text-start prose-h3:!text-start`}
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />

              <div className="mt-8 flex flex-col gap-4 border-t border-black/8 pt-6 sm:flex-row sm:flex-wrap sm:items-center">
                <button
                  type="button"
                  onClick={scrollToQuoteForm}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-sm bg-[#001633] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
                >
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </button>
                {phone ? (
                  <a
                    href={telHref}
                    className="inline-flex shrink-0 flex-col items-center justify-center text-center text-white transition-opacity hover:opacity-95"
                    style={{
                      backgroundColor: ACCENT_RED,
                      width: CTA_WIDTH,
                      height: CTA_HEIGHT,
                      paddingTop: CTA_PADDING.top,
                      paddingRight: CTA_PADDING.right,
                      paddingBottom: CTA_PADDING.bottom,
                      paddingLeft: CTA_PADDING.left,
                    }}
                  >
                    <span className="text-[11px] font-regular  md:text-[20px]  uppercase leading-none tracking-wide">
                      {callNowLabel}
                    </span>
                    <span className="mt-0.5 text-[22px] font-bold leading-none">
                      {phone}
                    </span> 
                  </a>
                ) : null}
              </div>
            </div>

            {/* Image with red L-accent */}
            <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
              <div className="relative w-full max-w-[520px] shrink-0">
                <div
                  className="pointer-events-none absolute bottom-5 left-0 top-8 z-0 w-7 md:bottom-8 md:w-8"
                  style={{ backgroundColor: ACCENT_RED }}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute bottom-0 left-0 z-0 h-7 w-full md:h-8"
                  style={{ backgroundColor: ACCENT_RED }}
                  aria-hidden
                />
                <div className="relative z-10 mb-6 ml-6 aspect-[544/488] w-full overflow-hidden bg-neutral-200 md:mb-7 md:ml-7">
                  {imageSrc ? (
                    <Image
                      title={imageAlt}
                      src={imageSrc}
                      alt={imageAlt}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 520px"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-neutral-200" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
