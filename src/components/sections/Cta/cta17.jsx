"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});

/** Hero background — use a file that exists under public/images (Cta img1.jpg was missing). */
const CTA17_HERO_SRC = "/images/img1.png";

function str(v) {
  if (v == null) return "";
  return String(v).trim();
}

function telHref(phone) {
  if (!phone || typeof phone !== "string") return "#";
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "#";
}

function scrollToQuote() {
  const el =
    document.getElementById("quote-form-section") ??
    document.querySelector(
      '.quote-form, [id*="quote"], [class*="quote-form"]',
    );
  if (el) {
    const offset = 80;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth",
    });
  }
}

export default function Cta17({ content }) {
  const block = content?.cta ?? {};
  const title = str(block.title ?? block.value?.title);
  const description = str(block.description ?? block.value?.description);
  const primaryCta = str(
    block.button_label ??
      block.value?.button_label ??
      block.cta_button ??
      block.value?.cta_button,
  );
  const licensedLabel = str(
    block.licensed_label ??
      block.value?.licensed_label ??
      block.insured_label ??
      block.value?.insured_label,
  );
  const estimatesLabel = str(
    block.estimates_label ??
      block.value?.estimates_label ??
      block.online_estimates_label ??
      block.value?.online_estimates_label,
  );
  const phoneCaption = str(block.phone_caption ?? block.value?.phone_caption);

  const phone =
    content?.banner?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";
  const phoneDisplay = typeof phone === "string" ? phone.trim() : "";
  const phoneLine = phoneCaption || phoneDisplay;
  const phoneHref = telHref(phoneDisplay);
  const leftHasContent = !!(title || description);
  const rightHasContent = !!(primaryCta || phoneLine);

  if (!leftHasContent && !rightHasContent) return null;

  return (
    <FullContainer
      id="cta"
      className="h-[234px] w-full items-stretch justify-start overflow-hidden p-0"
    >
      <div
        className={`grid h-full w-full self-stretch grid-cols-1 md:grid-cols-2 ${poppins.className}`}
      >
        <div className="bg-[#c90100] px-6 py-8 text-white md:px-12 md:py-10">
          <div className="mx-auto flex h-full max-w-[560px] flex-col justify-center">
            {title ? (
              <h2 className="text-[18px] font-semibold leading-tight md:text-[20px]">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-4 max-w-[520px] text-[16px] leading-[1.7] text-white/95">
                {description}
              </p>
            ) : null}
          </div>
        </div>

        <div className="relative overflow-hidden bg-[#263A5E] px-6 py-8 text-white md:px-12 md:py-10">
          <Image
            src={CTA17_HERO_SRC}
            alt=""
            fill
            className="object-cover object-center opacity-20"
            sizes="(min-width: 768px) 50vw, 100vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-[#1E3152]/75" aria-hidden />
          <a
            href={phoneHref}
            className="relative z-10 mx-auto flex h-full max-w-[560px] flex-col items-center justify-center text-center text-white no-underline"
          >
            {primaryCta ? (
              <p className="text-[30px] font-medium leading-tight md:text-[44px]">
                {primaryCta}
              </p>
            ) : null}
            {phoneLine ? (
              <p className="mt-3 text-[30px] font-semibold leading-none md:text-[37px]">
                {phoneLine}
              </p>
            ) : null}
          </a>
        </div>
      </div>
    </FullContainer>
  );
}
