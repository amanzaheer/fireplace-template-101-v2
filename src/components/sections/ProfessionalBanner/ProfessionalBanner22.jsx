"use client";

import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { telHrefFromCta13Phone } from "@/components/sections/Cta/Cta22";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ACCENT = "#f0520e";

/** Orange rounded square + black checkmark (matches design reference). */
function CardCheckIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 46 46"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M0 10.9474C0 4.9013 4.9013 0 10.9474 0H36.4211C41.7114 0 46 4.28864 46 9.57895V36.4211C46 41.7114 41.7114 46 36.4211 46H9.57895C4.28864 46 0 41.7114 0 36.4211V10.9474Z"
        fill={ACCENT}
      />
      <path
        d="M32.5286 11.9808C32.0885 11.7362 31.6046 11.5807 31.1044 11.5232C30.6042 11.4656 30.0976 11.5072 29.6134 11.6455C29.1293 11.7838 28.6772 12.0161 28.2829 12.3292C27.8885 12.6422 27.5597 13.0299 27.3153 13.47L20.1987 26.2772L16.1258 22.2043C15.7721 21.8382 15.3492 21.5461 14.8815 21.3452C14.4138 21.1443 13.9108 21.0386 13.4018 21.0342C12.8928 21.0297 12.388 21.1267 11.9169 21.3195C11.4458 21.5122 11.0178 21.7968 10.6579 22.1568C10.298 22.5167 10.0134 22.9447 9.82061 23.4158C9.62787 23.8869 9.53088 24.3917 9.5353 24.9007C9.53972 25.4096 9.64547 25.9127 9.84637 26.3803C10.0473 26.848 10.3393 27.271 10.7054 27.6246L18.3721 35.2913C19.0966 36.0177 20.0741 36.4164 21.0823 36.4164L21.6132 36.378C22.2007 36.2958 22.7612 36.0784 23.2504 35.7428C23.7397 35.4072 24.1443 34.9627 24.4326 34.4441L34.0159 17.1941C34.2606 16.7541 34.4162 16.2703 34.4739 15.7702C34.5315 15.2701 34.4901 14.7635 34.352 14.2794C34.2139 13.7953 33.9818 13.3431 33.6689 12.9487C33.3561 12.5543 32.9686 12.2254 32.5286 11.9808Z"
        fill="black"
      />
    </svg>
  );
}

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function getBlock(content) {
  return (
    content?.professional_banner ??
    content?.professionalBanner ??
    content?.["prfessional banner"] ??
    {}
  );
}

function firstNonEmptyArray(...candidates) {
  for (const a of candidates) {
    if (Array.isArray(a) && a.length > 0) return a;
  }
  return [];
}

function pickFeatureList(block, content) {
  const resolved = resolveRefArray(content, block, "features");
  return firstNonEmptyArray(
    block.list,
    resolved,
    block.features,
    block.items,
    block.points,
    block.steps,
  );
}

function getStepParts(feature, index) {
  if (typeof feature === "string") {
    return { title: "", description: feature };
  }
  const obj = feature ?? {};
  const title = obj.title ?? obj.heading ?? "";
  const rawText = typeof obj.text === "string" ? obj.text : "";
  const description =
    (typeof obj.description === "string" && obj.description) ||
    (typeof obj.subtitle === "string" && obj.subtitle) ||
    "";

  if (title) {
    return {
      title,
      description: description || rawText || "",
    };
  }
  if (rawText) {
    const lines = rawText
      .split(/\n+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (lines.length >= 2) {
      return { title: lines[0], description: lines.slice(1).join(" ") };
    }
    const colon = rawText.indexOf(":");
    if (colon > 0 && colon < 48) {
      return {
        title: rawText.slice(0, colon).trim(),
        description: rawText.slice(colon + 1).trim(),
      };
    }
    return { title: "", description: rawText };
  }

  return { title: "", description: "" };
}

function renderHeadingWithAccent(headingText) {
  const text = (headingText || "").trim();
  if (!text) return null;

  const accentWords = [
    "chimney",
    "chimneys",
    "service",
    "services",
    "repair",
    "cleaning",
    "inspection",
    "professional",
    "solutions",
    "fireplace",
    "fireplaces",
  ];
  const accentRegex =
    /\b(chimney|chimneys|service|services|repair|cleaning|inspection|professional|solutions|fireplace|fireplaces)\b/gi;
  const parts = text.split(accentRegex);

  return parts.map((part, idx) =>
    accentWords.includes(part.toLowerCase()) ? (
      <span key={`accent-${idx}`} style={{ color: ACCENT }}>
        {part}
      </span>
    ) : (
      <span key={`normal-${idx}`} className="text-white">
        {part}
      </span>
    ),
  );
}

export default function ProfessionalBanner22({ content }) {
  const block = getBlock(content);
  const heading = (block.title ?? block.heading ?? "").trim();
  const description = (
    block.description ??
    block.subheading ??
    block.tagline ??
    ""
  )
    .toString()
    .trim();

  const features = pickFeatureList(block, content);
  const bgSrc = buildImageSrc(IMAGE_BASE, block.file_name);
  const personSrc = buildImageSrc(
    IMAGE_BASE,
    block.file_name2 ?? block.main_image ?? block.center_image,
  );

  const phone =
    block.cta_phone ??
    content?.banner?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";

  const ctaLabel = (block.cta_label ?? block.button_label ?? "").trim();
  const phoneHref = telHrefFromCta13Phone(phone);

  const useUnoptimized = (src) =>
    src.startsWith("/api/") ||
    src.startsWith("http://") ||
    src.startsWith("https://");

  if (!heading && !description && !bgSrc && features.length === 0) {
    return null;
  }

  return (
    <FullContainer
      id="professional-banner"
      className="relative min-h-[480px] overflow-hidden md:min-h-[520px] lg:min-h-[560px]"
    >
      {bgSrc ? (
        <Image
          src={bgSrc}
          alt={block.alt ?? heading ?? ""}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
          unoptimized={useUnoptimized(bgSrc)}
        />
      ) : (
        <div className="absolute inset-0 bg-[#0f1f3d]" aria-hidden />
      )}

      <div
        className=""
        aria-hidden
      />

      <Container className="relative z-10 py-10 md:py-12 lg:py-14">
        <div className="grid min-h-[420px] items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,320px)] lg:gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(220px,340px)_minmax(0,340px)] xl:gap-8">
          <div className="flex min-w-0 flex-col justify-center pl-0 md:pl-2 lg:pl-4">
            {heading ? (
              <h2
                className={`${poppins.className} text-3xl font-extrabold uppercase leading-[1.12] tracking-tight md:text-[35px] lg:text-[42px] xl:text-[46px]`}
              >
                {renderHeadingWithAccent(heading)}
              </h2>
            ) : null}

            {description ? (
              <p
                className={`${poppins.className} mt-4 max-w-[560px] text-sm leading-relaxed text-white/90 md:text-[14px] lg:text-[14px]`}
              >
                {description}
              </p>
            ) : null}

            {phone ? (
              <Link
                href={phoneHref}
                className={`${poppins.className} mt-6 inline-flex w-fit max-w-full flex-col h-18 items-center justify-center rounded-xl bg-[#f0520e] px-6 py-3.5 text-center text-white shadow-[0_8px_28px_rgba(240,82,14,0.45)] transition-opacity hover:opacity-95 md:mt-8 md:px-8 md:py-4`}
                aria-label={
                  ctaLabel
                    ? `${ctaLabel} ${phone}`
                    : phone
                }
              >
                {ctaLabel ? (
                  <span className="text-sm font-medium uppercase  tracking-wide md:text-[21.7px]">
                    {ctaLabel}
                  </span>
                ) : null}
                <span className="text-xl font-bold leading-tight md:text-2xl lg:text-[27px]">
                  {phone}
                </span>
              </Link>
            ) : null}
          </div>

          {personSrc ? (
            <div className="relative mx-auto hidden h-[clamp(280px,42vw,460px)] w-full max-w-[340px] shrink-0 lg:block lg:max-w-none">
              <Image
                src={personSrc}
                alt={block.alt_image ?? block.image_alt ?? heading ?? ""}
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 1024px) 50vw, 340px"
                unoptimized={useUnoptimized(personSrc)}
              />
            </div>
          ) : (
            <div className="hidden lg:block" aria-hidden />
          )}

          {features.length > 0 ? (
            <ul className="flex w-full min-w-0 list-none flex-col gap-3 p-0 md:gap-3.5 lg:max-w-[340px] lg:justify-self-end">
              {features.map((feature, idx) => {
                const { title, description: cardDesc } = getStepParts(
                  feature,
                  idx,
                );
                if (!title && !cardDesc) return null;

                return (
                  <li
                    key={idx}
                    className="flex items-start gap-3 rounded bg-white px-4 py-4 shadow-[0_4px_24px_rgba(0,0,0,0.14)] md:gap-4 md:px-5 md:py-4"
                  >
                    <CardCheckIcon className="h-9 w-9 shrink-0 md:h-10 md:w-10 mt-4" />
                    <div className="min-w-0 flex-1">
                      {title ? (
                        <h3
                          className={`${poppins.className} text-sm font-medium text-[#121212] md:text-[17.1px]`}
                        >
                          {title}
                        </h3>
                      ) : null}
                      {cardDesc ? (
                        <p
                          className={`${poppins.className} mt-1 text-xs leading-relaxed text-[#4a4a4a] md:text-[10.9px]`}
                        >
                          {cardDesc}
                        </p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </Container>
    </FullContainer>
  );
}
