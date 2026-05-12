"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Phone, ArrowRight } from "lucide-react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Rubik, Inter, Poppins } from "next/font/google";

const rubik = Rubik({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ACCENT = "#F86503";
const ACCENT_DEEP = "#F0520E";
const NAVY = "#082A51";

/** Removes standalone “fireplace” wording from markdown bullet lines (template filler). */
function stripFireplaceFromBulletLines(markdown) {
  if (typeof markdown !== "string" || !markdown) return markdown;
  return markdown.replace(/^(\s*[-*+]\s+)(.+)$/gm, (_, prefix, body) => {
    const cleaned = body
      .replace(/\bfireplace(s)?\b/gi, "")
      .replace(/\s{2,}/g, " ")
      .replace(/^[\s,.\-–]+|[\s,.\-–]+$/g, "")
      .trim();
    return cleaned ? `${prefix}${cleaned}` : "";
  });
}

const prose =
  "prose max-w-none text-[#1a1a1a] prose-headings:font-bold prose-headings:text-[#0f172a] prose-headings:tracking-tight prose-p:text-[#334155] prose-p:leading-relaxed prose-li:text-[#334155] prose-strong:text-[#0f172a] prose-a:text-[#F86503] prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-h1:!text-2xl md:prose-h1:!text-3xl prose-h2:!text-xl md:prose-h2:!text-2xl prose-h3:!text-lg [&_ul]:list-none [&_ul]:space-y-2 [&_ul]:pl-0 [&_ul>li]:relative [&_ul>li]:mt-0 [&_ul>li]:pl-7 [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-[0.55em] [&_ul>li]:before:h-1.5 [&_ul>li]:before:w-1.5 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-[#F86503] [&_ul>li]:before:content-['']";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

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

const CONTENT_KEYS = ["service_description", "service_description1", "service_description2"];

export default function ServiceDescription21({ content, contentKey = "service_description" }) {
  const phone = String(content?.contact_info?.phone ?? content?.navbar?.phone ?? "").trim();

  const key = CONTENT_KEYS.includes(contentKey) ? contentKey : "service_description";
  const block =
    content?.[key] && typeof content[key] === "object" ? content[key] : {};

  const title = String(block.title ?? "").trim();
  const descriptionRaw = String(block.description ?? "").trim();
  const label = String(block.label ?? block.eyebrow ?? "").trim();
  const ctaLabel = String(block.cta_label ?? "").trim();
  const fileName = typeof block.file_name === "string" ? block.file_name.trim() : "";
  const imageAlt = String(block.alt ?? block.image_alt ?? "").trim();

  const descriptionForRender = useMemo(
    () => stripFireplaceFromBulletLines(descriptionRaw),
    [descriptionRaw],
  );

  const descriptionHtml = useMemo(() => {
    const rendered = md.render(descriptionForRender);
    return stripFirstMatchingHeadingHtml(rendered, title);
  }, [descriptionForRender, title]);

  const imageSrc = fileName ? buildImageSrc(IMAGE_BASE, fileName) : "";
  const hasImage = Boolean(imageSrc);
  const telHref = phone ? `tel:${String(phone).replace(/[^\d+]/g, "")}` : "";
  const primaryButtonLabel = ctaLabel || "Call us today";

  const altText = imageAlt || title || "";

  if (!descriptionRaw) return null;

  return (
    <FullContainer
      id={key}
      className="relative overflow-hidden bg-linear-to-b from-slate-50 via-white to-orange-50/40 py-12 md:py-16 lg:py-20"
    >
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-[#F86503]/10 blur-3xl md:h-96 md:w-96"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[#234281]/8 blur-3xl"
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/4">
          <div
            className="h-1.5 w-full"
            style={{
              background: `linear-gradient(90deg, ${NAVY} 0%, ${ACCENT} 55%, ${ACCENT_DEEP} 100%)`,
            }}
            aria-hidden
          />

          <div
            className={`grid grid-cols-1 gap-0 lg:items-stretch ${hasImage ? "lg:grid-cols-2" : ""}`}
          >
            <div
              className={`${inter.className} order-2 flex flex-col justify-center border-t border-slate-100 px-6 py-10 sm:px-8 md:px-10 lg:order-1 lg:border-t-0 lg:py-12 lg:pl-12 lg:pr-10 ${hasImage ? "lg:border-r" : ""}`}
            >
              {label ? (
                <p
                  className={`${rubik.className} mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#F86503]`}
                >
                  {label}
                </p>
              ) : null}
              {title ? (
                <h2
                  className={`${rubik.className} text-balance text-3xl font-bold tracking-tight text-[#0f172a] sm:text-4xl lg:text-[2.5rem] lg:leading-[1.12]`}
                >
                  {title}
                </h2>
              ) : null}
              {title ? (
                <div
                  className="mt-4 h-1 w-16 rounded-full"
                  style={{ backgroundColor: ACCENT }}
                  aria-hidden
                />
              ) : null}

              <div
                className={`${prose} ${title ? "mt-6" : "mt-0"} w-full text-left prose-h1:!text-start prose-h2:!text-start prose-h3:!text-start`}
                style={{ ["--prose-primary"]: "#334155" }}
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />

              {phone ? (
                <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-8 sm:flex-row sm:flex-wrap sm:items-center">
                  <a
                    href={telHref}
                    className={`${rubik.className} inline-flex min-h-[48px] max-w-full items-center justify-center gap-2 rounded-xl bg-[#F86503] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md shadow-orange-600/25 transition hover:bg-[#d9480c] focus-visible:ring-2 focus-visible:ring-[#F0520E] focus-visible:ring-offset-2`}
                  >
                    {primaryButtonLabel}
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                  </a>
                  <a
                    href={telHref}
                    className={`${poppins.className} inline-flex min-h-[48px] max-w-full items-center justify-center gap-2.5 rounded-xl border border-white/25 bg-[#F86503] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:border-white/35 hover:bg-[#F0520E] hover:text-white focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F86503]`}
                  >
                    <Phone
                      className="h-[18px] w-[18px] shrink-0 text-white"
                      strokeWidth={2.25}
                      aria-hidden
                    />
                    <span className="truncate text-white">{phone}</span>
                  </a>
                </div>
              ) : null}
            </div>

            {hasImage ? (
              <div className="relative order-1 min-h-[280px] bg-slate-100/80 lg:order-2 lg:min-h-[420px]">
                <div
                  className="absolute inset-0 bg-linear-to-br from-[#234281]/12 via-transparent to-[#F86503]/10"
                  aria-hidden
                />
                <div className="relative flex h-full min-h-[inherit] items-center justify-center p-6 sm:p-8 lg:p-10">
                  <div className="relative aspect-4/3 w-full max-w-lg overflow-hidden rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5">
                    <Image
                      src={imageSrc}
                      alt={altText}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
