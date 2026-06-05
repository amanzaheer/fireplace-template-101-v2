"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

const poppinsCta13 = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function telHrefFromCta13Phone(phone) {
  if (!phone || typeof phone !== "string") return "#";
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "#";
}

/** Same Call Now control as Cta13 (lime pill + phone lines). */
export function Cta13CallNowButton({
  phone,
  wrapperClassName,
  linkClassName,
}) {
  const phoneDisplay = typeof phone === "string" ? phone.trim() : "";
  const href = telHrefFromCta13Phone(phoneDisplay);
  if (!phoneDisplay) return null;

  return (
    <div
      className={
        wrapperClassName ?? "flex shrink-0 justify-center lg:justify-end"
      }
    >
      <Link
        href={href}
        className={
          linkClassName ??
          "inline-flex h-[73.33px] w-[258px] shrink-0 flex-col items-center justify-center rounded-full bg-[#E5170B] pt-[2.72px] pr-[1.36px] pb-[2.72px] pl-[1.36px] text-center shadow-md transition "
        }
      >
        <p
          className={`${poppinsCta13.className} text-[21px] font-medium leading-none text-white`}
        >
          CALL NOW:
        </p>
        <p
          className={`${poppinsCta13.className} mt-2 text-[27px] font-bold leading-none text-white`}
        >
          {phoneDisplay}
        </p>
      </Link>
    </div>
  );
}

export default function Cta34({ content }) {
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

  if (!title && !description && !phoneDisplay) return null;

  return (
    <FullContainer id="cta" className="bg-[#090909] py-10 md:py-12 lg:py-14">
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-stretch gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="min-w-0 flex-1 text-center lg:text-left">
            {title ? (
              <h2 className="font-montserrat text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-3 font-barlow text-base font-normal leading-relaxed text-white sm:mt-4 sm:text-lg md:text-md">
                {description}
              </p>
            ) : null}
          </div>

          <Cta13CallNowButton phone={phone} />
        </div>
      </Container>
    </FullContainer>
  );
}
