"use client";

import Link from "next/link";
import { ChevronRight, Phone, TextQuote } from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const BG = "#ffffff";
const minH = "clamp(280px, 42vw, 460px)";
const CLIP_LEFT = "polygon(0% 8%, 100% 0%, 100% 100%, 0% 92%)";
const CLIP_RIGHT = "polygon(0% 0%, 100% 8%, 100% 92%, 0% 100%)";
const clipStyle = (value) => ({
  clipPath: value,
  WebkitClipPath: value,
});
const PANEL_LEFT =
  "min-h-[280px] flex-1 sm:min-h-[340px] lg:h-[540px] lg:w-[262px] lg:min-h-0 lg:flex-none";
const PANEL_RIGHT =
  "min-h-[280px] flex-1 sm:min-h-[340px] lg:h-[540px] lg:w-[265px] lg:min-h-0 lg:flex-none";
const PANEL_INNER = "h-full w-full overflow-hidden rounded-[30px]";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  return `${basePath}/${filePath.replace(/^\//, "")}`;
}

function resolvePhone(content) {
  return (
    content?.banner?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    ""
  );
}

function SplitImage({ src, srcRight, alt }) {
  const sameImage = src && (!srcRight || srcRight === src);

  if (!src) {
    return (
      <figure className="m-0 w-full max-w-lg lg:max-w-none" aria-label={alt}>
        <div className="w-full max-w-lg lg:max-w-none" style={{ minHeight: minH }}>
          <div className="flex h-full min-h-[260px] gap-[14px]">
            <div className={PANEL_LEFT}>
              <div className={PANEL_INNER}>
                <div className="h-full w-full bg-neutral-200/70" style={clipStyle(CLIP_LEFT)} />
              </div>
            </div>
            <div className={PANEL_RIGHT}>
              <div className={PANEL_INNER}>
                <div className="h-full w-full bg-neutral-200/70" style={clipStyle(CLIP_RIGHT)} />
              </div>
            </div>
          </div>
        </div>
      </figure>
    );
  }
  if (sameImage) {
    const bg = `url(${src})`;
    return (
      <figure className="m-0 w-full max-w-lg lg:max-w-none" aria-label={alt}>
        <div className="flex gap-[14px]" style={{ minHeight: minH }}>
          <div className={PANEL_LEFT}>
            <div className={PANEL_INNER}>
              <div
                className="h-full w-full bg-no-repeat"
                style={{
                  backgroundImage: bg,
                  backgroundSize: "200% 100%",
                  backgroundPosition: "left center",
                  ...clipStyle(CLIP_LEFT),
                }}
              />
            </div>
          </div>
          <div className={PANEL_RIGHT}>
            <div className={PANEL_INNER}>
              <div
                className="h-full w-full bg-no-repeat"
                style={{
                  backgroundImage: bg,
                  backgroundSize: "200% 100%",
                  backgroundPosition: "right center",
                  ...clipStyle(CLIP_RIGHT),
                }}
              />
            </div>
          </div>
        </div>
      </figure>
    );
  }

  return (
    <figure className="m-0 w-full max-w-lg lg:max-w-none" aria-label={alt}>
      <div className="flex gap-[14px]" style={{ minHeight: minH }}>
        <div className={PANEL_LEFT}>
          <div className={PANEL_INNER}>
            <div
              className="h-full w-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${src})`,
                ...clipStyle(CLIP_LEFT),
              }}
            />
          </div>
        </div>
        <div className={PANEL_RIGHT}>
          <div className={PANEL_INNER}>
            <div
              className="h-full w-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${srcRight})`,
                ...clipStyle(CLIP_RIGHT),
              }}
            />
          </div>
        </div>
      </div>
    </figure>
  );
}

export default function WhyChoose9({ content }) {
  const contentSafe = content ?? {};
  const phone = resolvePhone(contentSafe);
  const phoneLink = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#";

  const block = contentSafe?.why_choose ?? {};
  const features = resolveRefArray(contentSafe, block, "features");
  const heading = typeof block.heading === "string" ? block.heading.trim() : "";
  const filePath =
    typeof block.file_name === "string" ? block.file_name.trim() : "";
  const imageSrc = filePath ? buildImageSrc(IMAGE_BASE, filePath) : "";
  const secondPath =
    (typeof block.file_name2 === "string" && block.file_name2.trim()) ||
    (typeof block.file_name_2 === "string" && block.file_name_2.trim()) ||
    "";
  const imageSrcRight = secondPath
    ? buildImageSrc(IMAGE_BASE, secondPath)
    : imageSrc;
  const imageAlt = block.alt ?? block.image_alt ?? heading ?? "";
  const ctaLabel =
    typeof block.cta_label === "string" ? block.cta_label.trim() : "";

  if (features.length === 0) return null;

  const handleQuoteClick = () => {
    const el = document.getElementById("quote-form-section");

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="whychooseus"
      className="py-12 md:py-16 lg:py-20"
      style={{ backgroundColor: BG }}
    >
      <div className="mx-auto w-full max-w-[1270px] px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
            <SplitImage
              src={imageSrc}
              srcRight={imageSrcRight}
              alt={imageAlt}
            />
          </div>

          <div className="order-1 lg:order-2">
            {heading ? (
              <h2 className="text-left text-2xl font-bold uppercase leading-tight tracking-tight text-[#000000] sm:text-3xl md:text-4xl lg:text-[2.35rem] lg:leading-[1.12]">
                {heading}
              </h2>
            ) : null}

            <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 sm:gap-y-3.5">
              {features.map((feature, idx) => {
                const text =
                  typeof feature === "object"
                    ? feature?.text
                    : typeof feature === "string"
                      ? feature
                      : "";
                if (!text) return null;
                return (
                  <li
                    key={idx}
                    className="flex items-start px-4 text-left"
                  >
                    <ChevronRight className="mt-1 h-5 w-5 shrink-0 stroke-[4] text-[#EFA536]" />
                    <span
                      className={`${poppins.className} ml-2 pt-1 text-base font-normal leading-normal text-[#000]`}
                    >
                      {text}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex w-full flex-col items-start justify-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              {phone ? (
                <Link href={phoneLink}>
                  <button
                    type="button"
                    className="flex min-w-[205px] items-center justify-center gap-2 rounded-none bg-[#EFA536] px-6 py-3 font-barlow text-lg font-semibold text-white shadow transition-colors hover:bg-[#EFA536]/85 sm:justify-start"
                  >
                    <Phone
                      className="h-5 w-5 shrink-0 text-white"
                      strokeWidth={2.25}
                    />
                    {phone}
                  </button>
                </Link>
              ) : null}
              {ctaLabel ? (
                <button
                  type="button"
                  onClick={handleQuoteClick}
                  className="inline-flex min-w-[160px] w-[205px] items-center justify-center gap-2 rounded-none bg-[#EFA536] px-6 py-3 font-barlow text-base font-bold text-white transition-colors hover:bg-[#EFA536]/85 md:text-base"
                >
                  <div className="flex items-center gap-2">
                    <TextQuote
                      className="h-6 w-6 shrink-0 text-white"
                      strokeWidth={2.25}
                    />
                    <span className="text-md ml-2 font-thin tracking-widest md:text-xl md:tracking-normal">
                      {ctaLabel}
                    </span>
                  </div>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
