"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Rubik, Inter, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

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

const prose =
  "prose max-w-none text-[#1a1a1a] prose-headings:font-bold prose-headings:text-[#0f172a] prose-headings:tracking-tight prose-p:text-[#334155] prose-p:leading-relaxed prose-li:text-[#334155] prose-strong:text-[#0f172a] prose-a:text-[#F86503] prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-h1:!text-2xl md:prose-h1:!text-3xl prose-h2:!text-xl md:prose-h2:!text-2xl prose-h3:!text-lg [&_ul]:list-none [&_ul]:space-y-2 [&_ul]:pl-0 [&_ul>li]:relative [&_ul>li]:mt-0 [&_ul>li]:pl-7 [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-[0.55em] [&_ul>li]:before:h-1.5 [&_ul>li]:before:w-1.5 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-[#F86503] [&_ul>li]:before:content-['']";

const imageFrameClass =
  "relative aspect-4/3 w-full max-w-lg overflow-hidden rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function normalizeGalleryEntry(entry) {
  if (typeof entry === "string") {
    const path = entry.trim();
    return path ? { path, alt: "" } : null;
  }
  if (entry && typeof entry === "object") {
    const raw =
      entry.file_name ?? entry.path ?? entry.src ?? entry.url ?? "";
    const path = typeof raw === "string" ? raw.trim() : "";
    const alt = typeof entry.alt === "string" ? entry.alt.trim() : "";
    return path ? { path, alt } : null;
  }
  return null;
}

function galleryAlt(item, index, titleTrim, total) {
  return (
    item.alt ||
    (titleTrim
      ? `${titleTrim} — ${index + 1} of ${total}`
      : `Gallery image ${index + 1} of ${total}`)
  );
}

export default function Gallery21({ content }) {
  const phoneRaw = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const phone = typeof phoneRaw === "string" ? phoneRaw.trim() : "";
  const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#";

  const block = content?.gallery ?? null;
  if (!block) return null;

  const title =
    typeof block.title === "string" ? block.title : String(block.title ?? "");
  const titleTrim = title.trim();
  const label =
    typeof block.label === "string"
      ? block.label.trim()
      : String(block.label ?? "").trim();
  const html = block.description ? md.render(block.description) : "";
  const rawFiles = Array.isArray(block.file_name) ? block.file_name : [];
  const files = rawFiles.map(normalizeGalleryEntry).filter(Boolean);

  if (!titleTrim && !html && files.length === 0) return null;

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

  const hasImages = files.length > 0;
  const first = files[0];
  const second = files[1];
  const rest = files.slice(2);

  return (
    <FullContainer
      id="gallery"
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
            className={cn(
              "grid grid-cols-1 gap-0 lg:items-stretch",
              hasImages && "lg:grid-cols-2",
            )}
          >
            <div
              className={cn(
                inter.className,
                "order-2 flex flex-col justify-center border-t border-slate-100 px-6 py-10 sm:px-8 md:px-10 lg:order-1 lg:border-t-0 lg:py-12 lg:pl-12 lg:pr-10",
                hasImages && "lg:border-r",
              )}
            >
              {label ? (
                <p
                  className={cn(
                    rubik.className,
                    "mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#F86503]",
                  )}
                >
                  {label}
                </p>
              ) : null}
              {titleTrim ? (
                <h2
                  className={cn(
                    rubik.className,
                    "text-balance text-3xl font-bold tracking-tight text-[#0f172a] sm:text-4xl lg:text-[2.5rem] lg:leading-[1.12]",
                  )}
                >
                  {titleTrim}
                </h2>
              ) : null}
              {titleTrim ? (
                <div
                  className="mt-4 h-1 w-16 rounded-full bg-[#F86503]"
                  aria-hidden
                />
              ) : null}

              {html ? (
                <div
                  className={cn(
                    prose,
                    titleTrim ? "mt-6" : "mt-0",
                    "w-full text-left prose-h1:!text-start prose-h2:!text-start prose-h3:!text-start",
                  )}
                  style={{ ["--prose-primary"]: "#334155" }}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ) : null}

              <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-8 sm:flex-row sm:flex-wrap sm:items-center">
                <button
                  type="button"
                  onClick={handleQuoteClick}
                  className={cn(
                    rubik.className,
                    "inline-flex min-h-[48px] max-w-full items-center justify-center gap-2 rounded-xl bg-[#F86503] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md shadow-orange-600/25 transition hover:bg-[#d9480c] focus-visible:ring-2 focus-visible:ring-[#F0520E] focus-visible:ring-offset-2",
                  )}
                >
                  Get a quote
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </button>
                {phone ? (
                  <Link
                    href={phoneHref}
                    className={cn(
                      poppins.className,
                      "inline-flex min-h-[48px] max-w-full items-center justify-center gap-2.5 rounded-xl border border-white/25 bg-[#F86503] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:border-white/35 hover:bg-[#F0520E] hover:text-white focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F86503]",
                    )}
                  >
                    <Phone
                      className="h-[18px] w-[18px] shrink-0 text-white"
                      strokeWidth={2.25}
                      aria-hidden
                    />
                    <span className="truncate text-white">{phone}</span>
                  </Link>
                ) : null}
              </div>
            </div>

            {hasImages ? (
              <div className="relative order-1 min-h-[280px] bg-slate-100/80 lg:order-2 lg:min-h-[420px]">
                <div
                  className="absolute inset-0 bg-linear-to-br from-[#234281]/12 via-transparent to-[#F86503]/10"
                  aria-hidden
                />
                <div className="relative flex h-full min-h-[inherit] flex-col items-center justify-center gap-4 p-6 sm:p-8 lg:p-10">
                  {first ? (
                    <div className={imageFrameClass}>
                      <Image
                        src={buildImageSrc(IMAGE_BASE, first.path)}
                        alt={galleryAlt(first, 0, titleTrim, files.length)}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                  {second ? (
                    <div className={imageFrameClass}>
                      <Image
                        src={buildImageSrc(IMAGE_BASE, second.path)}
                        alt={galleryAlt(second, 1, titleTrim, files.length)}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                  {rest.length > 0 ? (
                    <div className="grid w-full max-w-lg grid-cols-2 gap-3 sm:grid-cols-3">
                      {rest.map((item, i) => {
                        const idx = i + 2;
                        return (
                          <div
                            key={`${item.path}-${idx}`}
                            className="relative aspect-4/3 min-h-[100px] w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-md ring-1 ring-black/5"
                          >
                            <Image
                              src={buildImageSrc(IMAGE_BASE, item.path)}
                              alt={galleryAlt(item, idx, titleTrim, files.length)}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 33vw, 180px"
                              loading="lazy"
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
