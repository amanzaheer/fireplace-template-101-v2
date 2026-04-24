"use client";

import Image from "next/image";
import Link from "next/link";
import { Lock, Phone, Smartphone } from "lucide-react";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});

/** Layout hero asset (public/images). Space encoded for reliable Next/Image resolution. */
const CTA16_HERO_SRC = "/images/Cta%20img1.jpg";

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

export default function Cta16({ content }) {
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

  const showStrip = !!(licensedLabel || phoneDisplay || estimatesLabel);

  if (!title && !description && !primaryCta && !showStrip) return null;

  return (
    <FullContainer
      id="cta"
      className="relative w-full max-w-none items-stretch justify-start overflow-hidden p-0"
    >
      <div className="relative w-full self-stretch min-h-[420px] md:min-h-[520px] lg:min-h-[560px]">
        <Image
          src={CTA16_HERO_SRC}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 z-`[1]` bg-black/55" aria-hidden />
        <div
          className={`relative z-2 flex min-h-[420px] w-full flex-col md:min-h-[520px] lg:min-h-[560px] ${poppins.className}`}
        >
          <div className="flex flex-1 flex-col items-center justify-center px-4 py-14 md:px-8 md:py-20">
            <div className="mx-auto w-full max-w-[1109px] text-center">
            {title ? (
              <h2
                className="text-balance text-[32px] font-bold leading-[normal] text-[#FFF]"
              >
                {title}
              </h2>
            ) : null}
            {description ? (
              <div className="mx-auto mt-6 flex w-full max-w-[961px] shrink-0 flex-col justify-end text-center md:mt-8 min-h-[47px]">
                <p className="text-balance text-[16px] font-normal leading-[normal] text-[#FFF]">
                  {description}
                </p>
              </div>
            ) : null}
            {primaryCta ? (
              <div className="mt-8 flex w-full justify-center md:mt-10">
                <button
                  type="button"
                  onClick={scrollToQuote}
                  className="inline-flex min-h-[48px] min-w-[200px] items-center justify-center rounded-md bg-[#F5521B] px-8 py-3 text-center text-[18px] font-semibold text-white transition-colors hover:bg-[#e04a18] focus-visible:outline `focus-visible:outline-2` focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {primaryCta}
                </button>
              </div>
            ) : null}
            </div>
          </div>

          {showStrip ? (
            <div className="flex w-full shrink-0 justify-center bg-[#01306E] py-5">
              <Container className="mx-auto flex w-full max-w-[1270px] justify-center px-4 sm:px-6 lg:px-8">
                <div
                  className={cn(
                    "mx-auto flex w-full max-w-[1109px] flex-col flex-wrap items-center justify-center gap-6 text-center text-[18px] font-normal ,leading-[140%] text-white md:flex-row md:items-center md:justify-center md:gap-10 lg:gap-16",
                  )}
                >
                  {licensedLabel ? (
                    <div className="flex max-w-full items-center justify-center gap-3 text-center">
                      <Lock
                        className="h-6 w-6 shrink-0 text-[#F5521B]"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span>{licensedLabel}</span>
                    </div>
                  ) : null}
                  {phoneDisplay ? (
                    <Link
                      href={phoneHref}
                      className="flex max-w-full items-center justify-center gap-3 text-center text-white no-underline transition-opacity hover:opacity-90"
                    >
                      <Phone
                        className="h-6 w-6 shrink-0 text-[#F5521B]"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span>{phoneLine}</span>
                    </Link>
                  ) : null}
                  {estimatesLabel ? (
                    <div className="flex max-w-full items-center justify-center gap-3 text-center">
                      <Smartphone
                        className="h-6 w-6 shrink-0 text-[#F5521B]"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span>{estimatesLabel}</span>
                    </div>
                  ) : null}
                </div>
              </Container>
            </div>
          ) : null}
        </div>
      </div>
    </FullContainer>
  );
}
