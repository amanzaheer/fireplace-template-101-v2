"use client";

import Image from "next/image";
import Link from "next/link";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Phone, TextQuote } from "lucide-react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ctaClass = cn(
  poppins.className,
  "inline-flex h-12 min-w-[200px] items-center justify-center gap-2 rounded-md bg-[#EFA536] px-5 text-sm font-bold uppercase text-white shadow-sm transition-colors hover:bg-[#e49a2a]",
);

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

const DEFAULT_GALLERY = {
  title: "",
  description: "",
  cta_label: "GET A QUOTE",
};

function mergeGalleryBlock(raw) {
  if (!raw || typeof raw !== "object") return null;
  const withoutNulls = Object.fromEntries(
    Object.entries(raw).filter(([, v]) => v != null),
  );
  const file_name = Array.isArray(withoutNulls.file_name)
    ? withoutNulls.file_name
    : [];
  return { ...DEFAULT_GALLERY, ...withoutNulls, file_name };
}

export default function Gallery9({ content }) {
  const phoneRaw = content?.banner?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";
  const phone = typeof phoneRaw === "string" ? phoneRaw.trim() : "";
  const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#";

  const block = mergeGalleryBlock(content?.gallery);
  if (!block) return null;

  const title =
    block.title == null
      ? ""
      : typeof block.title === "string"
        ? block.title
        : String(block.title);
  const html = block.description ? md.render(block.description) : "";
  const rawFiles = Array.isArray(block.file_name) ? block.file_name : [];
  const files = rawFiles.map(normalizeGalleryEntry).filter(Boolean);
  const ctaLabel =
    typeof block.cta_label === "string" && block.cta_label.trim()
      ? block.cta_label.trim()
      : DEFAULT_GALLERY.cta_label;

  if (!title.trim() && !html && files.length === 0) return null;

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

  return (
    <FullContainer id="gallery" className="bg-white py-10 md:py-16">
      <Container className="max-w-[min(100%,1440px)] px-4 md:px-8">
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-lg md:p-10 lg:p-12">
          <div
            className={cn(
              "grid gap-8",
              hasImages && "lg:grid-cols-2 lg:items-stretch lg:gap-10",
            )}
          >
            <div className="order-1 flex min-w-0 flex-col gap-5">
              {title.trim() ? (
                <h2
                  className={cn(
                    poppins.className,
                    "text-balance text-left text-3xl font-bold uppercase leading-tight tracking-tight text-[#000] md:text-4xl lg:text-[2.5rem]",
                  )}
                >
                  {title.trim()}
                </h2>
              ) : null}

              {html ? (
                <div
                  className={cn(
                    poppins.className,
                    "prose max-w-none text-left text-[16px] font-normal leading-[normal] text-[#000]",
                    "[&_p]:m-0 [&_p]:text-left [&_p]:text-[16px] [&_p]:font-normal [&_p]:leading-[normal] [&_p]:text-[#000]",
                    "[&_p+p]:mt-3",
                    "[&_li]:text-left [&_li]:text-[16px] [&_li]:font-normal [&_li]:leading-[normal] [&_li]:text-[#000]",
                    "[&_ul,&_ol]:my-3 [&_ul,&_ol]:text-left [&_ul,&_ol]:text-[#000]",
                    "[&_strong]:font-semibold [&_strong]:text-[#000]",
                    "[&_a]:text-[#000] [&_a]:underline",
                  )}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ) : null}

              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {phone ? (
                  <Link href={phoneHref} className={ctaClass}>
                    <Phone className="h-5 w-5 shrink-0" strokeWidth={2.25} />
                    {phone}
                  </Link>
                ) : null}
                <button type="button" onClick={handleQuoteClick} className={ctaClass}>
                  <TextQuote className="h-5 w-5 shrink-0" strokeWidth={2.25} />
                  {ctaLabel}
                </button>
              </div>
            </div>

            {hasImages ? (
              <div className="order-2 h-full min-h-[220px] min-w-0 lg:min-h-0">
                <div className="grid h-full min-h-0 grid-cols-1 gap-4 [grid-auto-rows:minmax(0,1fr)] sm:grid-cols-2">
                  {files.map((item, index) => {
                    const src = buildImageSrc(IMAGE_BASE, item.path);
                    const label =
                      item.alt ||
                      (title.trim()
                        ? `${title.trim()} - image ${index + 1} of ${files.length}`
                        : `Gallery image ${index + 1} of ${files.length}`);
                    return (
                      <div
                        key={`${item.path}-${index}`}
                        className={cn(
                          "relative h-full min-h-[160px] w-full min-w-0 overflow-hidden rounded-xl bg-neutral-100 ring-1 ring-black/[0.06] lg:min-h-0",
                          files.length === 1 && "sm:col-span-2",
                        )}
                      >
                        <Image
                          src={src}
                          alt={label}
                          fill
                          sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 400px"
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
