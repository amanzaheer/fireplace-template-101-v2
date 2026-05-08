"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});

const CTA19_CALL_ICON = "/st-icons/Temp17/call17.png";

function str(v) {
  if (v == null) return "";
  return String(v).trim();
}

function telHref(phone) {
  if (!phone || typeof phone !== "string") return "#";
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "#";
}

function scrollToContactForm() {
  const el =
    document.getElementById("quote-form-section") ??
    document.getElementById("contact-us") ??
    document.querySelector(
      '.quote-form, [id*="quote"], [class*="quote-form"], [id*="contact"]',
    );
  if (el) {
    const offset = 80;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth",
    });
  }
}

export default function Cta19({ content }) {
  const block = content?.cta ?? {};
  const title = str(block.title ?? block.value?.title);
  const description = str(block.description ?? block.value?.description);
  const primaryCta = str(
    block.button_label ??
      block.value?.button_label ??
      block.cta_button ??
      block.value?.cta_button,
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
  const contactButtonLabel = primaryCta || "Contact us";
  const leftHasContent = !!(title || description);
  const rightHasContent = !!(contactButtonLabel || phoneLine);

  if (!leftHasContent && !rightHasContent) return null;

  return (
    <FullContainer id="cta" className="w-full bg-[#ffdede] py-8 md:py-10 h-[334px]">
      <Container>
        <div
          className={`mx-auto flex w-full max-w-[1280px] flex-col gap-6 md:flex-row md:items-center md:justify-between ${poppins.className}`}
        >
          <div className="w-full md:max-w-[58%]">
            {title ? (
              <h2 className="text-[20px] font-bold leading-tight text-black md:text-[27px]">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-2 max-w-[680px] text-[14px] leading-normal text-black md:text-[16px]">
                {description}
              </p>
            ) : null}
          </div>

          <div className="flex w-full flex-wrap items-center justify-start gap-5 md:w-auto md:flex-nowrap md:justify-end">
            <button
              type="button"
              onClick={scrollToContactForm}
              className="inline-flex h-[46px] items-center rounded-[8px] bg-[#cc3333] px-7 text-[22px] font-semibold text-white transition-opacity hover:opacity-90 md:text-[20px]"
            >
              {contactButtonLabel}
            </button>

            {phoneLine ? (
              <a
                href={phoneHref}
                className="inline-flex items-center gap-4 text-black no-underline"
              >
                <span className="inline-flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#cc3333]">
                  <Image
                    src={CTA19_CALL_ICON}
                    alt="Call"
                    width={34}
                    height={34}
                    className="h-[34px] w-[34px]"
                  />
                </span>
                <span className="flex flex-col leading-none">
                  <span className="text-[14px] font-semibold uppercase tracking-wide md:text-[16px]">
                    Click to Call
                  </span>
                  <span className="mt-1 text-[16px] font-bold md:text-[20px]">{phoneLine}</span>
                </span>
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
