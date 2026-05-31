"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Roboto, Rubik } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

const SCROLL_OFFSET = 100;
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["700"],
});

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
    document.getElementById("contact-us");
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
  return true;
}

export default function Cta18({ content }) {
  const router = useRouter();
  const block = content?.cta ?? {};
  const title = str(block.title ?? block.value?.title);
  const description = str(block.description ?? block.value?.description);
  const quoteLabel = str(
    block.button_label ??
      block.value?.button_label ??
      block.button_text ??
      block.value?.button_text ??
      block.cta_button ??
      block.value?.cta_button,
  );
  const phoneCaption = str(
    block.phone_caption ?? block.value?.phone_caption ?? "Or call us directly:",
  );

  const phone =
    content?.banner?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";
  const phoneDisplay = typeof phone === "string" ? phone.trim() : "";
  const phoneHref = telHref(phoneDisplay);
  const ctaButtonLabel = quoteLabel || "GET A FREE QUOTE";

  const handleQuoteClick = useCallback(() => {
    if (scrollToContactForm()) return;
    router.push("/");
    setTimeout(() => scrollToContactForm(), 500);
  }, [router]);

  if (!title && !description && !phoneDisplay && !ctaButtonLabel) return null;

  return (
    <FullContainer id="cta" className="bg-white py-12 md:py-16 lg:py-20">
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center ">
          {title ? (
            <h2 className="font-montserrat text-2xl font-regular tracking-tight font-poppins text-black sm:text-3xl md:text-[46px]">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-4 font-barlow  leading-relaxed  font-roboto text-black sm:mt-5 sm:text-lg md:text-[25px]">
              {description}
            </p>
          ) : null}

          <div className="mt-8 flex w-full flex-col items-center sm:mt-10">
            <button
              type="button"
              onClick={handleQuoteClick}
              className={`${rubik.className} inline-flex min-h-[52px] w-full max-w-[520px] items-center justify-center rounded-lg bg-[#FF0011] px-8 py-3 text-base font-bold uppercase tracking-wide text-white shadow-md transition hover:brightness-95 sm:w-auto sm:text-lg md:text-[25px]`}
            >
              {ctaButtonLabel}
            </button>

            {phoneDisplay ? (
              <p className="mt-5 font-barlow text-base text-black sm:text-lg font-roboto md:text-[25px]">
                {phoneCaption}{" "}
                <Link
                  href={phoneHref}
                  className="font-semibold text-black underline-offset-2 hover:underline font-roboto md:text-[25px]"
                >
                  {phoneDisplay}
                </Link>
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
