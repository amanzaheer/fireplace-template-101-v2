"use client";

import Link from "next/link";
import { Rubik } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["700"],
});

function PhoneCtaIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={39}
      height={38}
      viewBox="0 0 39 38"
      fill="none"
      className={cn("h-9 w-9 shrink-0", className)}
      aria-hidden
    >
      <path
        d="M15.9343 0H5.37446e-05V1.80952C-0.0121365 8.77558 2.04963 15.5955 5.93547 21.4428C8.79926 25.7545 12.5677 29.4264 16.9929 32.2167C22.994 36.0029 29.9935 38.0118 37.1429 37.9999H39V22.4743L26.5757 19.7835L23.1215 23.1492C19.9606 21.1703 17.2737 18.5517 15.2435 15.4714L18.6959 12.1057L15.9343 0Z"
        fill="#000000"
      />
    </svg>
  );
}

function telHref(phone) {
  if (!phone || typeof phone !== "string") return "#";
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "#";
}

export default function Cta14({ content }) {
  const block = content?.cta ?? {};
  const title =
    typeof block.title === "string" && block.title.trim()
      ? block.title.trim()
      : "";
  const description =
    typeof block.description === "string" && block.description.trim()
      ? block.description.trim()
      : "";

  const phone =
    content?.banner?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";

  const phoneDisplay = typeof phone === "string" ? phone.trim() : "";
  const href = telHref(phoneDisplay);

  if (!title && !description && !phoneDisplay) return null;

  return (
    <FullContainer id="cta" className="bg-[#F0520E] py-12 md:py-16 lg:py-20">
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col  items-center text-center">
          {title ? (
            <h2 className="font-montserrat text-2xl font-semibold tracking-tight text-white  sm:text-3xl md:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-4 font-barlow text-base font-normal leading-relaxed text-white sm:mt-5 sm:text-lg md:text-xl">
              {description}
            </p>
          ) : null}
          {phoneDisplay ? (
            <div className="mt-8 w-full sm:mt-10">
              <Link
                href={href}
                className="inline-flex w-full max-w-[520px] items-center justify-center gap-3 rounded-[10px] bg-white px-6 py-3 shadow-md transition hover:bg-[#7d7678] sm:w-auto"
              >
                <PhoneCtaIcon />
                <span
                  className={`${rubik.className} text-[clamp(1.5rem,5vw,2.25rem)] font-bold not-italic leading-none text-black`}
                >
                  {phoneDisplay}
                </span>
              </Link>
            </div>
          ) : null}
        </div>
      </Container>
    </FullContainer>
  );
}
