"use client";

import React from "react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { TextQuote } from "lucide-react";
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
const minH = "clamp(240px, 36vw, 400px)";
const CLIP_LEFT = "polygon(0% 8%, 100% 0%, 100% 100%, 0% 92%)";
const CLIP_RIGHT = "polygon(0% 0%, 100% 8%, 100% 92%, 0% 100%)";
const clipStyle = (value) => ({
  clipPath: value,
  WebkitClipPath: value,
});
const PANEL_LEFT =
  "min-h-[230px] flex-1 sm:min-h-[280px] lg:h-[430px] lg:w-[206px] lg:min-h-0 lg:flex-none";
const PANEL_RIGHT =
  "min-h-[230px] flex-1 sm:min-h-[280px] lg:h-[430px] lg:w-[210px] lg:min-h-0 lg:flex-none";
const PANEL_INNER = "h-full w-full overflow-hidden rounded-[30px]";

function BannerCtaIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={39}
      height={38}
      viewBox="0 0 39 38"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M15.9343 0H5.37446e-05V1.80952C-0.0121365 8.77558 2.04963 15.5955 5.93547 21.4428C8.79926 25.7545 12.5677 29.4264 16.9929 32.2167C22.994 36.0029 29.9935 38.0118 37.1429 37.9999H39V22.4743L26.5757 19.7835L23.1215 23.1492C19.9606 21.1703 17.2737 18.5517 15.2435 15.4714L18.6959 12.1057L15.9343 0Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

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

export default function ServiceDescription15({ content }) {
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
    <FullContainer id="service_description" className="bg-[#f4f5f7] py-10 md:py-14 lg:py-16">
      <Container className="max-w-[880px] lg:px-0!">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
            <SplitServiceImage src={imageSrc} alt={title} />
          </div>

          <div
            className={`order-1 flex min-h-0 w-full max-w-xl flex-col gap-5 lg:order-2 lg:max-w-none ${poppins.className}`}
          >
            {title ? (
              <h2 className={`${rubik.className} text-left text-[34px] font-bold leading-[1.05] tracking-tight text-[#2d2d2d] md:text-[42px] lg:text-[50px]`}>
                {title}
              </h2>
            ) : null}

            <div
              className={[
                poppins.className,
                "max-w-none text-left font-normal text-[13px] leading-[1.65] text-[#4a4a4a]",
                "[&_p]:m-0 [&_p]:font-[inherit] [&_p]:text-[13px] [&_p]:font-normal [&_p]:leading-[1.65] [&_p]:text-[#4a4a4a]",
                "[&_p+p]:mt-3",
                "[&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:font-[inherit] [&_ul]:text-[13px] [&_ul]:text-[#4a4a4a]",
                "[&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:font-[inherit] [&_ol]:text-[13px] [&_ol]:text-[#4a4a4a]",
                "[&_li]:font-[inherit] [&_li]:text-[13px] [&_li]:font-normal [&_li]:leading-[1.65] [&_li]:text-[#4a4a4a] [&_li]:marker:text-[#4a4a4a]",
                "[&_h1]:font-[inherit] [&_h1]:text-left [&_h1]:text-[1.5rem] [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:text-[#2d2d2d] [&_h1]:mb-2",
                "[&_h2]:font-[inherit] [&_h2]:text-left [&_h2]:text-[1.3rem] [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-[#2d2d2d] [&_h2]:mb-2",
                "[&_h3]:font-[inherit] [&_h3]:text-left [&_h3]:text-[1.15rem] [&_h3]:font-bold [&_h3]:leading-snug [&_h3]:text-[#2d2d2d] [&_h3]:mb-2",
                "[&_h4]:font-[inherit] [&_h4]:text-left [&_h4]:text-[1rem] [&_h4]:font-semibold [&_h4]:text-[#2d2d2d] [&_h4]:mb-2",
                "[&_strong]:font-[inherit] [&_strong]:font-semibold [&_strong]:text-[#2d2d2d]",
                "[&_em]:font-[inherit] [&_em]:italic [&_em]:text-[#4a4a4a]",
                "[&_a]:font-[inherit] [&_a]:text-[#f59402] [&_a]:font-medium [&_a]:no-underline [&_a]:transition-colors hover:[&_a]:underline",
                "[&_blockquote]:border-l-4 [&_blockquote]:border-[#f59402]/40 [&_blockquote]:pl-4 [&_blockquote]:font-[inherit] [&_blockquote]:text-[13px] [&_blockquote]:italic [&_blockquote]:text-[#4a4a4a]",
                "[&_code]:rounded [&_code]:bg-neutral-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-[inherit] [&_code]:text-[12px] [&_code]:text-[#2d2d2d]",
                "[&_pre]:rounded-lg [&_pre]:bg-neutral-100 [&_pre]:p-4 [&_pre]:font-[inherit] [&_pre]:text-[12px] [&_pre]:text-[#2d2d2d]",
              ].join(" ")}
              dangerouslySetInnerHTML={{ __html: md.render(description) }}
            />

            <div className="flex w-full flex-col items-start justify-start gap-2 pt-1 sm:flex-row sm:items-center sm:gap-3">
              {phone ? (
                <a
                  href={phoneHref}
                  className={`${rubik.className} inline-flex h-[42px] w-full max-w-[200px] shrink-0 items-center justify-center gap-2 rounded-[8px] bg-[#f59402] px-3 text-[16px] font-bold text-[#FFFFFF] shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition-colors hover:bg-[#df8801] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59402]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f5f7]`}
                >
                  <BannerCtaIcon className="h-4 w-4 shrink-0" />
                  <span>{phone}</span>
                </a>
              ) : null}
              <button
                type="button"
                onClick={handleQuoteClick}
                className={`${rubik.className} inline-flex h-[42px] w-full max-w-[172px] shrink-0 items-center justify-center gap-2 rounded-[8px] bg-[#f59402] px-4 text-[14px] font-bold text-[#FFFFFF] shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition-colors hover:bg-[#df8801] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59402]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f5f7]`}
              >
                <TextQuote className="h-4 w-4 shrink-0 text-[#FFFFFF]" strokeWidth={2.25} />
                <span className="tracking-wide">GET A QUOTE</span>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
