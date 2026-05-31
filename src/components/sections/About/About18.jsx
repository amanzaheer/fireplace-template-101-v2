"use client";

import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Poppins } from "next/font/google";

const ACCENT = "#FF0011";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function cleanHeading(str) {
  if (!str || typeof str !== "string") return "";
  return str.replace(/^#+\s*/, "").trim();
}

function normalizeStats(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      if (typeof item === "string") {
        const text = item.trim();
        if (!text) return null;
        const pipe = text.split("|");
        if (pipe.length >= 2) {
          return { value: pipe[0].trim(), label: pipe[1].trim() };
        }
        const match = text.match(/^(\S+)\s+(.+)$/);
        if (match) {
          return { value: match[1], label: match[2] };
        }
        return { value: "", label: text };
      }
      if (!item || typeof item !== "object") return null;
      const value = String(
        item.value ?? item.stat ?? item.title ?? item.number ?? "",
      ).trim();
      const label = String(
        item.label ?? item.text ?? item.description ?? item.name ?? "",
      ).trim();
      if (!value && !label) return null;
      return { value, label };
    })
    .filter(Boolean);
}

export default function About18({ content }) {
  const about = content?.about ?? {};
  const label = about.label ?? "";
  const heading = cleanHeading(about.heading ?? "");
  const description1 = about.description1 ?? "";
  const description2 = about.description2 ?? "";
  const image =
    buildImageSrc(IMAGE_BASE, about.file_name) ||
    buildImageSrc(IMAGE_BASE, "about/about.webp");
  const imageAlt =
    typeof about.alt === "string" && about.alt.trim()
      ? about.alt.trim()
      : heading || "About";

  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#";

  const stats = normalizeStats(
    Array.isArray(about.stats) ? about.stats : about.points,
  );

  const useUnoptimized =
    image.startsWith("/api/") ||
    image.startsWith("http://") ||
    image.startsWith("https://");

  const hasText =
    label || heading || description1 || description2 || phone || stats.length > 0;
  if (!hasText && !image) return null;

  return (
    <FullContainer id="about" className="mt-0 bg-black py-10 md:py-14 lg:py-16">
      <Container className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-14 ${poppins.className}`}
        >
          <div className="order-1 flex flex-col justify-center lg:pr-4">
            {label ? (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF0011] sm:text-sm">
                {label}
              </p>
            ) : null}

            {heading ? (
              <h2 className="text-2xl font-bold uppercase leading-tight text-white sm:text-3xl md:text-4xl lg:text-[2.35rem] lg:leading-[1.12]">
                {heading}
              </h2>
            ) : null}

            {description1 ? (
              <p className="mt-5 text-sm leading-relaxed text-white/90 sm:text-[15px] md:mt-6">
                {description1}
              </p>
            ) : null}

            {description2 ? (
              <p className="mt-4 text-sm leading-relaxed text-white/85 sm:text-[15px]">
                {description2}
              </p>
            ) : null}

            {phone ? (
              <a
                href={phoneHref}
                className="mt-7 inline-flex min-h-[38px] w-full max-w-[280px] items-center justify-center rounded bg-[#FF0011] px-5 py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-95 sm:mt-8 sm:text-base"
              >
                Call Now: {phone}
              </a>
            ) : null}
          </div>

          <div className="order-2 flex flex-col gap-5">
            <div className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:max-w-none">
              <div
                className="absolute -right-3 -top-3 bottom-1/2 left-6 z-0 rounded-[20px] md:-right-4 md:-top-4 md:left-8"
                style={{ backgroundColor: ACCENT }}
                aria-hidden
              />
              <div className="relative z-10 min-h-[260px] overflow-hidden rounded-[16px] sm:min-h-[300px] md:min-h-[340px]">
                {image ? (
                  <Image
                    title="About Image"
                    src={image}
                    alt={imageAlt}
                    fill
                    className="object-cover object-center"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized={useUnoptimized}
                  />
                ) : (
                  <div className="absolute inset-0 bg-neutral-800" />
                )}
              </div>
            </div>

            {stats.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {stats.slice(0, 2).map((stat, index) => (
                  <div
                    key={`${stat.value}-${stat.label}-${index}`}
                    className="rounded-xl bg-white px-4 py-5 text-center shadow-md sm:px-5 sm:py-6"
                  >
                    {stat.value ? (
                      <p className="text-3xl font-bold leading-none text-[#FF0011] sm:text-4xl">
                        {stat.value}
                      </p>
                    ) : null}
                    {stat.label ? (
                      <p className="mt-2 text-sm font-medium text-neutral-800 sm:text-base">
                        {stat.label}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
