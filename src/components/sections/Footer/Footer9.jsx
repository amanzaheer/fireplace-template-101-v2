"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";

  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");

  return `${basePath}/${segment}`;
}

const DEFAULT_FOOTER = {
  information_heading: "Information",
  contact_heading: "Stay Tuned With Us",
  legal_links: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms and Conditions", href: "/terms-and-conditions" },
  ],
};

function getBadgeSources(footer) {
  // CMS badges first
  const extra = footer?.badge_images;

  if (Array.isArray(extra) && extra.length > 0) {
    return extra
      .map((p) =>
        typeof p === "string"
          ? buildImageSrc(IMAGE_BASE, p)
          : "",
      )
      .filter(Boolean);
  }

  // Default Footer1 logos fallback
  return [1, 2, 3, 4, 5]
    .map((n) =>
      buildImageSrc(
        IMAGE_BASE,
        `footer/footer${n}.webp`,
      ),
    )
    .filter(Boolean);
}

/** Shallow-merge CMS `footer` with defaults so service/location JSON can override only `value` etc. */
function mergeFooter(footerObj) {
  const raw = footerObj && typeof footerObj === "object" ? footerObj : {};
  return { ...DEFAULT_FOOTER, ...raw };
}

export default function Footer9({ content }) {
  const contentSafe = content ?? {};
  const footer = mergeFooter(contentSafe?.footer);
  const contactInfo = contentSafe?.contact_info ?? {};

  const phone =
    contactInfo.phone ??
    contentSafe?.navbar?.phone ??
    "";

  const email =
    contactInfo.email ??
    "";

  const address =
    contactInfo.address ??
    contactInfo.street ??
    footer.address ??
    (contentSafe?.city_name
      ? `${contentSafe.city_name}`
      : "");

  const statement =
    footer.value ??
    footer.statement ??
    "";

  const leftHeading =
    typeof footer.information_heading === "string" &&
    footer.information_heading.trim()
      ? footer.information_heading.trim()
      : DEFAULT_FOOTER.information_heading;

  const rightHeading =
    typeof footer.contact_heading === "string" &&
    footer.contact_heading.trim()
      ? footer.contact_heading.trim()
      : DEFAULT_FOOTER.contact_heading;

  const badgeSources = getBadgeSources(footer);
  const legalLinks =
    Array.isArray(footer.legal_links) && footer.legal_links.length > 0
      ? footer.legal_links
      : DEFAULT_FOOTER.legal_links;

  const phoneHref = phone
    ? `tel:${String(phone).replace(/[^\d+]/g, "")}`
    : "#";

  return (
    <footer
      id="footer"
      className="bg-[#040404] text-white"
    >
      <div className="mx-auto w-full max-w-[1270px] px-4 py-12 md:px-6 md:py-14 lg:py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Left: design — w 766, min-h 230, gap 25px, pr 60px */}
          <div className="flex min-h-[230px] min-w-0 w-full max-w-[766px] flex-col gap-[25px] md:pr-[60px] lg:w-[766px] lg:max-w-[766px] lg:shrink-0">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              {leftHeading}
            </h2>

            {/* Logos */}
            <div className="flex flex-wrap items-center gap-[25px]">
              {badgeSources.map((src, index) =>
                src ? (
                  <div
                    key={index}
                    className="relative flex h-[58px] w-[58px] items-center justify-center overflow-hidden rounded-full bg-white shadow-sm sm:h-[64px] sm:w-[64px]"
                  >
                    <Image
                      src={src}
                      alt={`Trust or certification badge ${index + 1}`}
                      width={60}
                      height={60}
                      className="h-[78%] w-[78%] object-contain"
                    />
                  </div>
                ) : null,
              )}
            </div>

            {/* Statement */}
            {statement ? (
              <p className="text-sm leading-relaxed text-white/85 md:text-[15px]">
                {statement}
              </p>
            ) : null}
          </div>

          {/* Right: design — w 310, min-h 214, gap 25px */}
          <div className="flex min-h-[214px] w-full min-w-0 max-w-[310px] flex-col gap-[25px] items-start lg:w-[310px] lg:max-w-[310px] lg:shrink-0">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              {rightHeading}
            </h2>

            <ul className="flex w-full flex-col gap-[25px]">
              {/* Address */}
              {address ? (
                <li className="flex gap-3 text-left">
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#f59e0b]"
                    strokeWidth={2.25}
                    aria-hidden
                  />

                  <span className="text-sm leading-relaxed text-white/90 md:text-[15px]">
                    {address}
                  </span>
                </li>
              ) : null}

              {/* Email */}
              {email ? (
                <li className="flex items-start gap-3 text-left">
                  <Mail
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#f59e0b]"
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

              {/* Phone */}
              {phone ? (
                <li className="flex items-start gap-3 text-left">
                  <Phone
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#f59e0b]"
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

        {/* Bottom Links */}
        {legalLinks.length > 0 ? (
          <div className="mt-10 border-t border-white/20 pt-8 md:mt-12 md:pt-10">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {legalLinks.map((item, index) => {
                const href =
                  typeof item?.href === "string" &&
                  item.href
                    ? item.href
                    : "#";

                const label =
                  typeof item?.label === "string"
                    ? item.label
                    : "";

                if (!label) return null;

                return (
                  <Link
                    key={`${href}-${index}`}
                    href={href}
                    className="text-sm text-white/80 transition-colors hover:text-white md:text-[15px]"
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </footer>
  );
}