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

function SplitServiceImage({ src, alt }) {
  const label = typeof alt === "string" && alt.trim() ? alt.trim() : undefined;

  if (!src) {
    return (
      <figure className="m-0 w-full max-w-lg lg:max-w-none" {...(label ? { "aria-label": label } : {})}>
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

  const bg = `url(${src})`;
  return (
    <figure className="m-0 w-full max-w-lg lg:max-w-none" {...(label ? { "aria-label": label } : {})}>
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

export default function ServiceDescription9({ content }) {
  const phoneRaw = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const phone = typeof phoneRaw === "string" ? phoneRaw.trim() : "";
  const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#";

  if (!content?.service_description?.description) return null;

  const sd = content.service_description;
  const title = typeof sd.title === "string" ? sd.title.trim() : "";
  const description = sd.description;

  const imageSrc =
    typeof sd.file_name === "string" && sd.file_name.trim()
      ? buildImageSrc(IMAGE_BASE, sd.file_name)
      : "";

  const handleQuoteClick = () => {
    const el =
      document.getElementById("quote-form-section") ??
      document.querySelector('.quote-form, [id*="quote"], [class*="quote-form"]');

    if (el) {
      const offset = 80;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <FullContainer
      id="service_description"
      className="bg-white py-12 md:py-16 lg:py-20"
    >
      <Container className="max-w-[1270px]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
            <SplitServiceImage src={imageSrc} alt={title} />
          </div>

          <div
            className={`order-1 flex min-h-0 w-full max-w-xl flex-col gap-6 lg:order-2 lg:max-w-none ${poppins.className}`}
          >
            {title ? (
              <h2 className="text-left text-3xl font-bold uppercase leading-tight tracking-normal text-[#000000] md:text-4xl lg:text-[44px] lg:leading-[1.15]">
                {title}
              </h2>
            ) : null}

            <div
              className={[
                poppins.className,
                "prose max-w-none text-left font-normal text-[16px] leading-[1.625] text-[#000000]",
                /* Inherit Poppins from wrapper; force black text (typography plugin defaults are gray) */
                "[&_p]:m-0 [&_p]:font-[inherit] [&_p]:text-[16px] [&_p]:font-normal [&_p]:leading-[1.625] [&_p]:text-[#000000]",
                "[&_p+p]:mt-3",
                "[&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:font-[inherit] [&_ul]:text-[16px] [&_ul]:text-[#000000]",
                "[&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:font-[inherit] [&_ol]:text-[16px] [&_ol]:text-[#000000]",
                "[&_li]:font-[inherit] [&_li]:text-[16px] [&_li]:font-normal [&_li]:leading-[1.625] [&_li]:text-[#000000] [&_li]:marker:text-[#000000]",
                "[&_h1]:font-[inherit] [&_h1]:text-left [&_h1]:text-[1.75rem] [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:text-[#000000] [&_h1]:mb-3",
                "[&_h2]:font-[inherit] [&_h2]:text-left [&_h2]:text-[1.5rem] [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-[#000000] [&_h2]:mb-3",
                "[&_h3]:font-[inherit] [&_h3]:text-left [&_h3]:text-[1.25rem] [&_h3]:font-bold [&_h3]:leading-snug [&_h3]:text-[#000000] [&_h3]:mb-2",
                "[&_h4]:font-[inherit] [&_h4]:text-left [&_h4]:text-[1.125rem] [&_h4]:font-semibold [&_h4]:text-[#000000] [&_h4]:mb-2",
                "[&_strong]:font-[inherit] [&_strong]:font-semibold [&_strong]:text-[#000000]",
                "[&_em]:font-[inherit] [&_em]:italic [&_em]:text-[#000000]",
                "[&_a]:font-[inherit] [&_a]:text-[#EFA536] [&_a]:font-medium [&_a]:no-underline [&_a]:transition-colors hover:[&_a]:underline",
                "[&_blockquote]:border-l-4 [&_blockquote]:border-[#EFA536]/50 [&_blockquote]:pl-4 [&_blockquote]:font-[inherit] [&_blockquote]:text-[16px] [&_blockquote]:italic [&_blockquote]:text-[#000000]",
                "[&_code]:rounded [&_code]:bg-neutral-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-[inherit] [&_code]:text-[15px] [&_code]:text-[#000000]",
                "[&_pre]:rounded-lg [&_pre]:bg-neutral-100 [&_pre]:p-4 [&_pre]:font-[inherit] [&_pre]:text-[15px] [&_pre]:text-[#000000]",
              ].join(" ")}
              dangerouslySetInnerHTML={{ __html: md.render(description) }}
            />

            <div className="hidden w-full flex-col items-start justify-start gap-2 pt-0 md:flex lg:flex-row lg:items-center lg:gap-4">
              {phone ? (
                <a
                  href={phoneHref}
                  className={`${rubik.className} inline-flex h-[47px] w-[217px] shrink-0 items-center justify-center gap-2 rounded-lg bg-[#EFA536] text-[19px] font-semibold text-[#FFFFFF] shadow-md transition-colors hover:bg-[#e49a2a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EFA536]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white`}
                >
                  <Phone className="h-5 w-5 shrink-0 text-[#FFFFFF]" strokeWidth={2.25} />
                  <span>{phone}</span>
                </a>
              ) : null}
              <button
                type="button"
                onClick={handleQuoteClick}
                className={`${rubik.className} inline-flex h-[47px] min-w-[205px] shrink-0 items-center justify-center gap-2 rounded-lg bg-[#EFA536] px-5 text-base font-semibold text-[#FFFFFF] shadow-md transition-colors hover:bg-[#e49a2a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EFA536]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white md:text-[17px]`}
              >
                <TextQuote className="h-5 w-5 shrink-0 text-[#FFFFFF]" strokeWidth={2.25} />
                <span className="tracking-wide">GET A QUOTE</span>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
