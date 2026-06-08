"use client";

import Link from "next/link";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function telHref(phone) {
  if (!phone || typeof phone !== "string") return "#";
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "#";
}

export default function Cta27({ content }) {
  const block = content?.cta ?? {};
  const title =
    (typeof block.heading === "string" && block.heading.trim()) ||
    (typeof block.title === "string" && block.title.trim()) ||
    "";
  const description =
    typeof block.description === "string" && block.description.trim()
      ? block.description.trim()
      : "";
  const callNowText =
    (typeof block.phone_label === "string" && block.phone_label.trim()) ||
    (typeof content?.service_benefits?.call_now_label === "string" &&
      content.service_benefits.call_now_label.trim()) ||
    "CALL NOW";

  const phone =
    content?.banner?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";

  const phoneDisplay = typeof phone === "string" ? phone.trim() : "";
  const href = telHref(phoneDisplay);

  if (!title && !description && !phoneDisplay) return null;

  return (
    <FullContainer id="cta" className="bg-[#00163A] py-8">
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[760px]">
            {title ? (
              <h2 className="text-[32px] font-bold leading-none tracking-tight text-white md:text-[50px]">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-3 max-w-[780px] text-[14px] font-medium leading-[1.35] text-white md:text-[18px]">
                {description}
              </p>
            ) : null}
          </div>

          {phoneDisplay ? (
            <div className="shrink-0 md:ml-6">
              <Link
                href={href}
                className="inline-flex min-h-fit w-fit flex-col font-poppins items-center justify-center bg-[#D90808] px-6 py-2.5 text-white transition hover:opacity-95"
              >
                <span className="text-[14px] font-medium leading-none uppercase md:text-[21.7px]">
                  {callNowText}
                </span>
                <span className={`${poppins.className} mt-1 text-[20px] font-bold leading-none md:text-[27px]`}>
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
