"use client";

import React from "react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Phone, TextQuote } from "lucide-react";
import { Poppins, Rubik } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const CLIP_LEFT  = "polygon(0% 8%, 100% 0%, 100% 100%, 0% 92%)";
const CLIP_RIGHT = "polygon(0% 0%, 100% 8%, 100% 92%, 0% 100%)";

function buildImageSrc(filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const base = (IMAGE_BASE ?? "").replace(/\/$/, "");
  return `${base}/${filePath.replace(/^\//, "")}`;
}

const DEFAULT_SERVICE_DESCRIPTION = {
  title: "",
  cta_label: "GET A QUOTE",
  description: "",
  file_name: "",
};

function mergeServiceDescription(raw) {
  const o = raw && typeof raw === "object" ? raw : {};
  const withoutNulls = Object.fromEntries(
    Object.entries(o).filter(([, v]) => v != null),
  );
  return { ...DEFAULT_SERVICE_DESCRIPTION, ...withoutNulls };
}

function Panel({ clip, bg }) {
  return (
    <div className="flex-1 lg:h-[540px] lg:w-[263px] lg:flex-none min-h-[280px]">
      <div className="h-full w-full overflow-hidden rounded-[30px]">
        <div
          className="h-full w-full"
          style={{
            clipPath: clip,
            WebkitClipPath: clip,
            ...(bg
              ? {
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "200% 100%",
                  backgroundPosition: clip === CLIP_LEFT ? "left center" : "right center",
                  backgroundRepeat: "no-repeat",
                }
              : { backgroundColor: "#e5e5e5" }),
          }}
        />
      </div>
    </div>
  );
}

function SplitImage({ src, alt }) {
  return (
    <figure className="m-0 w-full max-w-lg lg:max-w-none" aria-label={alt || undefined}>
      <div className="flex gap-3.5" style={{ minHeight: "clamp(280px, 42vw, 460px)" }}>
        <Panel clip={CLIP_LEFT}  bg={src} />
        <Panel clip={CLIP_RIGHT} bg={src} />
      </div>
    </figure>
  );
}

const proseClasses = [
  "prose max-w-none text-[16px] leading-relaxed text-black",
  "[&_p]:text-black [&_p]:my-0 [&_p+p]:mt-3",
  "[&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:text-black",
  "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-black [&_h2]:mb-3",
  "[&_h3]:text-xl  [&_h3]:font-bold [&_h3]:text-black [&_h3]:mb-2",
  "[&_strong]:font-semibold [&_strong]:text-black",
  "[&_a]:text-[#EFA536] [&_a]:no-underline hover:[&_a]:underline",
].join(" ");

const btnBase = `${rubik.className} inline-flex h-[47px] items-center justify-center gap-2 rounded-lg bg-[#EFA536] px-5 font-semibold text-white shadow-md transition-colors hover:bg-[#e49a2a] focus:outline-none`;

export default function ServiceDescription9({ content }) {
  const sd = mergeServiceDescription(content?.service_description);
  const description =
    sd.description == null ? "" : String(sd.description).trim();
  const title = sd.title == null ? "" : String(sd.title).trim();
  const fileName =
    sd.file_name == null ? "" : String(sd.file_name).trim();
  const hasImage = Boolean(fileName);

  if (!description && !title && !hasImage) return null;

  const phone = String(
    content?.banner?.cta_phone ??
      content?.contact_info?.phone ??
      content?.navbar?.phone ??
      "",
  ).trim();
  const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#";

  const ctaLabel = String(sd.cta_label ?? DEFAULT_SERVICE_DESCRIPTION.cta_label).trim();
  const imageSrc = hasImage ? buildImageSrc(fileName) : "";

  const handleQuoteClick = () => {
    const el =
      document.getElementById("quote-form-section") ??
      document.querySelector('[id*="quote"], [class*="quote-form"]');
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
    }
  };

  return (
    <FullContainer id="service_description" className="bg-white py-12 md:py-16 lg:py-20">
      <Container className="max-w-[1270px]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Image — left */}
          <div className="order-2 flex justify-center lg:order-1">
            <SplitImage
              src={imageSrc}
              alt={title || "Service description illustration"}
            />
          </div>

          {/* Text — right */}
          <div className={`order-1 flex flex-col gap-6 lg:order-2 ${poppins.className}`}>
            {title && (
              <h2 className="text-3xl font-bold uppercase leading-tight text-black md:text-4xl lg:text-[44px]">
                {title}
              </h2>
            )}

            {description ? (
              <div
                className={proseClasses}
                dangerouslySetInnerHTML={{ __html: md.render(sd.description) }}
              />
            ) : null}

            <div className="hidden flex-col gap-3 md:flex lg:flex-row lg:items-center">
              {phone && (
                <a href={phoneHref} className={`${btnBase} w-[217px] text-[19px]`}>
                  <Phone className="h-5 w-5 shrink-0" strokeWidth={2.25} />
                  <span>{phone}</span>
                </a>
              )}
              <button type="button" onClick={handleQuoteClick} className={`${btnBase} min-w-[205px] text-[17px]`}>
                <TextQuote className="h-5 w-5 shrink-0" strokeWidth={2.25} />
                <span className="tracking-wide">{ctaLabel}</span>
              </button>
            </div>
          </div>

        </div>
      </Container>
    </FullContainer>
  );
}