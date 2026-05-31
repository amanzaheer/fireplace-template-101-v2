"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";
const SCROLL_OFFSET = 100;
const ACCENT = "#FF0011";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
function PhoneIcon({ className }) {
  return (
    <svg
      className={cn("h-5 w-5 shrink-0", className)}
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M38.0098 10.3753C37.4898 8.44909 36.4739 6.69283 35.0634 5.28168C33.6529 3.87053 31.8972 2.85379 29.9712 2.33284M31.5842 12.1101C31.3676 11.3074 30.9443 10.5754 30.3565 9.98734C29.7688 9.39924 29.0371 8.97552 28.2345 8.75845M38.0441 38.4479C30.8157 38.4479 24.0858 36.3269 18.4382 32.6728C14.1319 29.8858 10.4645 26.2184 7.67746 21.9121C3.89617 16.0732 1.89006 9.2626 1.9024 2.30621H14.7955L17.0629 12.5248L13.2128 16.3748C15.7648 20.8657 19.4827 24.5836 23.9736 27.1355L27.8236 23.2836L38.0441 25.5567V38.4479Z"
        stroke="currentColor"
        strokeWidth="3.80439"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function Cta18({ content }) {
  const router = useRouter();
  const block = content?.cta2 ?? {};

  const title = str(block.title);
  const description = str(block.description);
  const callLabel = str(
    block.call_label ??
      block.phone_button_label ??
      block.call_button ??
      "Call Us",
  );
  const bookLabel = str(
    block.button_label ??
      block.book_label ??
      block.cta_button ??
      block.button_text ??
      "Book Your Service",
  );

  const phone =
    str(block.phone) ||
    content?.banner?.cta_phone ||
    content?.contact_info?.phone ||
    content?.navbar?.phone ||
    "";
  const phoneHref = telHref(phone);

  const handleBookService = useCallback(() => {
    if (scrollToContactForm()) return;
    router.push("/");
    setTimeout(() => scrollToContactForm(), 500);
  }, [router]);

  if (!title && !description && !phone && !bookLabel) {
    return null;
  }

  return (
    <FullContainer id="cta2" className="bg-white py-8 md:py-12 lg:py-14">
      <Container className="px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            poppins.className,
            "mx-auto flex max-w-[1180px] flex-col items-center rounded-[28px] bg-[#FF0011] px-6 py-10 text-center shadow-[0_18px_50px_rgba(255,0,17,0.22)] sm:rounded-[32px] sm:px-10 sm:py-12 md:px-12 lg:py-14",
          )}
        >
          {title ? (
            <h2 className="max-w-4xl text-2xl font-bold leading-[1.2] text-white sm:text-[30px] md:text-[34px] lg:text-[38px]">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-4 max-w-3xl text-sm font-normal leading-[1.65] text-white/95 sm:text-[15px] md:mt-5 md:text-base md:leading-[1.7]">
              {description}
            </p>
          ) : null}

          <div className="mt-8 flex w-full max-w-xl flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            {phone ? (
              <Link
                href={phoneHref}
                className="inline-flex h-[48px] w-[212px] items-center justify-center gap-2 rounded-lg border-2 border-white bg-transparent px-6 py-3 text-base text-white font-bold md:text-[22px]  transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#FF0011]"
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.375 31.6737C23.9949 31.6737 22.0562 31.1745 19.1532 29.5526C15.6231 27.573 12.8926 25.7454 9.38153 22.2435C5.99633 18.8604 4.34899 16.6701 2.04341 12.4747C-0.561244 7.73764 -0.117238 5.2546 0.379088 4.19337C0.970154 2.92498 1.84261 2.16635 2.9703 1.41338C3.61083 0.993717 4.28866 0.633975 4.9952 0.338712C5.0659 0.30831 5.13165 0.279323 5.19034 0.253163C5.54031 0.0954983 6.07057 -0.142766 6.74224 0.11176C7.19049 0.28003 7.59066 0.624347 8.21708 1.24299C9.50173 2.50996 11.2572 5.33166 11.9049 6.71742C12.3397 7.65139 12.6274 8.2679 12.6282 8.95937C12.6282 9.7689 12.2209 10.3932 11.7267 11.067C11.6341 11.1935 11.5422 11.3144 11.4531 11.4318C10.915 12.1388 10.797 12.3431 10.8748 12.708C11.0324 13.4411 12.2082 15.6237 14.1405 17.5517C16.0727 19.4798 18.1924 20.5813 18.9284 20.7383C19.3088 20.8196 19.5173 20.6965 20.247 20.1394C20.3516 20.0595 20.4591 19.9768 20.5715 19.8941C21.3252 19.3334 21.9205 18.9368 22.7109 18.9368H22.7152C23.4031 18.9368 23.992 19.2351 24.9677 19.7272C26.2403 20.3692 29.1469 22.1021 30.4216 23.3882C31.0417 24.0132 31.3874 24.4119 31.5564 24.8595C31.8109 25.5333 31.5712 26.0614 31.415 26.4149C31.3888 26.4736 31.3599 26.5379 31.3294 26.6093C31.0318 27.3146 30.67 27.991 30.2484 28.63C29.4969 29.7541 28.7354 30.6245 27.4642 31.2163C26.8114 31.5251 26.097 31.6815 25.375 31.6737Z" fill="white"/>
                </svg>
                {callLabel}
              </Link>
            ) : null}
            <button
              type="button"
              onClick={handleBookService}
              className="inline-flex h-[48px] w-[212px] items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-bold text-[#FF0011] transition hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#FF0011]"
            >
              {bookLabel}
            </button>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
