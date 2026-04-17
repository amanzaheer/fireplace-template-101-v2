"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";

const ICON_ORANGE = "#f59e0b";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function getBadgeSources(footer) {
  const extra = footer?.badge_images;
  if (Array.isArray(extra) && extra.length > 0) {
    return extra
      .map((p) => (typeof p === "string" ? buildImageSrc(IMAGE_BASE, p) : ""))
      .filter(Boolean);
  }
  return [1, 2, 3, 4, 5].map((n) =>
    buildImageSrc(IMAGE_BASE, `footer/footer${n}.webp`),
  );
}

export default function Footer9({ content }) {
  const contentSafe = content ?? {};
  const footer = contentSafe?.footer ?? {};
  const contactInfo = contentSafe?.contact_info ?? {};

  const phone = contactInfo.phone ?? contentSafe?.navbar?.phone ?? "";
  const email = contactInfo.email ?? "";
  const address =
    contactInfo.address ??
    contactInfo.street ??
    footer.address ??
    (contentSafe?.city_name
      ? `${contentSafe.city_name}`
      : "");

  const statement = footer.value ?? footer.statement ?? "";

  const leftHeading =
    typeof footer.information_heading === "string" &&
    footer.information_heading.trim()
      ? footer.information_heading.trim()
      : "Information";

  const rightHeading =
    typeof footer.contact_heading === "string" && footer.contact_heading.trim()
      ? footer.contact_heading.trim()
      : "Contact";

  const badgeSources = getBadgeSources(footer);

  const phoneHref = phone
    ? `tel:${String(phone).replace(/[^\d+]/g, "")}`
    : "#";

  return (
    <footer id="footer" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1270px] px-4 py-12 md:px-6 md:py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <div className="flex max-w-xl flex-col md:max-w-none">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              {leftHeading}
            </h2>

            <div className="mt-6 flex flex-wrap items-center gap-4 md:gap-5">
              {badgeSources.map((src, index) =>
                src ? (
                  <div
                    key={index}
                    className="relative h-11 w-auto shrink-0 sm:h-12 md:h-14"
                    style={{ minWidth: "2.5rem" }}
                  >
                    <Image
                      src={src}
                      alt=""
                      width={120}
                      height={56}
                      className="h-full w-auto max-w-[100px] object-contain object-left sm:max-w-[120px]"
                    />
                  </div>
                ) : null,
              )}
            </div>

            {statement ? (
              <p className="mt-6 text-sm leading-relaxed text-white/85 md:text-[15px] md:leading-relaxed">
                {statement}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col md:items-start">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              {rightHeading}
            </h2>

            <ul className="mt-6 flex w-full max-w-md flex-col gap-5 md:mt-8">
              {address ? (
                <li className="flex gap-3 text-left">
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0"
                    style={{ color: ICON_ORANGE }}
                    strokeWidth={2.25}
                    aria-hidden
                  />
                  <span className="text-sm leading-relaxed text-white/90 md:text-[15px]">
                    {address}
                  </span>
                </li>
              ) : null}
              {email ? (
                <li className="flex items-start gap-3 text-left">
                  <Mail
                    className="mt-0.5 h-5 w-5 shrink-0"
                    style={{ color: ICON_ORANGE }}
                    strokeWidth={2.25}
                    aria-hidden
                  />
                  <Link
                    href={`mailto:${email}`}
                    className="text-sm text-white/90 underline-offset-2 hover:underline md:text-[15px]"
                  >
                    {email}
                  </Link>
                </li>
              ) : null}
              {phone ? (
                <li className="flex items-start gap-3 text-left">
                  <Phone
                    className="mt-0.5 h-5 w-5 shrink-0"
                    style={{ color: ICON_ORANGE }}
                    strokeWidth={2.25}
                    aria-hidden
                  />
                  <Link
                    href={phoneHref}
                    className="text-sm text-white/90 underline-offset-2 hover:underline md:text-[15px]"
                  >
                    {phone}
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-8 md:mt-12 md:pt-10">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <Link
              href="/privacy-policy"
              className="text-sm text-white/80 transition-colors hover:text-white md:text-[15px]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="text-sm text-white/80 transition-colors hover:text-white md:text-[15px]"
            >
              Terms and conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
