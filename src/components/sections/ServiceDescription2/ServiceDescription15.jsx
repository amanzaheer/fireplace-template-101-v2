"use client";
import React from "react";
import Link from "next/link";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
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

function resolvePhone(content) {
  const raw =
    content?.banner?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";
  return typeof raw === "string" ? raw.trim() : "";
}

export default function ServiceDescription15({ content }) {
  const title = String(content?.service_description2?.title ?? "").trim();
  const text = content?.service_description2?.description ?? "";
  const html = text.trim() ? md.render(text) : "";

  if (!title && !html) return null;

  const phone = resolvePhone(content);
  const phoneLink = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#";

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

  return (
    <FullContainer id="service_description2" className="bg-[#f4f5f7] py-10 md:py-14">
      <Container className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[12px] border border-black/5 bg-white px-5 py-7 shadow-[0_2px_14px_rgba(0,0,0,0.06)] md:px-8 md:py-9">
          <div>
            {title ? (
              <h2 className={`${rubik.className} text-balance text-center text-[30px] font-bold leading-tight tracking-tight text-[#2d2d2d] md:text-[40px]`}>
                {title}
              </h2>
            ) : null}

            {html ? (
              <div
                className={[
                  poppins.className,
                  "max-w-none text-center text-[13px] font-normal leading-[1.65] text-[#4a4a4a]",
                  title ? "mt-4 md:mt-5" : "",
                  "[&_p]:m-0 [&_p]:text-center [&_p]:text-[13px] [&_p]:font-normal [&_p]:leading-[1.65] [&_p]:text-[#4a4a4a]",
                  "[&_p+p]:mt-3",
                  "[&_h1]:text-center [&_h1]:text-[20px] [&_h1]:font-semibold [&_h1]:text-[#2d2d2d]",
                  "[&_h2]:text-center [&_h2]:text-[18px] [&_h2]:font-semibold [&_h2]:text-[#2d2d2d]",
                  "[&_h3]:text-center [&_h3]:text-[16px] [&_h3]:font-semibold [&_h3]:text-[#2d2d2d]",
                  "[&_li]:text-[13px] [&_li]:leading-[1.65] [&_li]:text-[#4a4a4a] [&_li]:marker:text-[#4a4a4a]",
                  "[&_ul]:mx-auto [&_ul]:my-3 [&_ul]:w-fit [&_ul]:list-disc [&_ul]:pl-5",
                  "[&_ol]:mx-auto [&_ol]:my-3 [&_ol]:w-fit [&_ol]:list-decimal [&_ol]:pl-5",
                  "[&_a]:text-[#f59402] [&_a]:font-medium hover:[&_a]:underline",
                  "[&_strong]:font-semibold [&_strong]:text-[#2d2d2d]",
                ].join(" ")}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : null}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-6 text-center sm:gap-3">
            {phone ? (
              <Link
                href={phoneLink}
                className={`${rubik.className} inline-flex h-[42px] w-full max-w-[200px] items-center justify-center gap-2 rounded-[8px] bg-[#f59402] px-3 text-[16px] font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition-colors hover:bg-[#df8801]`}
              >
                <BannerCtaIcon className="h-4 w-4 shrink-0" />
                {phone}
              </Link>
            ) : null}
            <button
              type="button"
              onClick={handleQuoteClick}
              className={`${rubik.className} inline-flex h-[42px] w-full max-w-[172px] items-center justify-center gap-2 rounded-[8px] bg-[#f59402] px-4 text-[14px] font-bold uppercase text-white shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition-colors hover:bg-[#df8801]`}
            >
              <TextQuote className="h-4 w-4 shrink-0" strokeWidth={2.25} />
              GET A QUOTE
            </button>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
