"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function telHref(phone) {
  if (!phone || typeof phone !== "string") return "#";
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "#";
}

const STATIC_NAV = [
  { label: "Home", href: "/" },
  { label: "Our Services", href: "/#our_services" },
  { label: "Locations", href: "/#locations" },
  { label: "FAQs", href: "/#faqs" },
  { label: "About", href: "/#about" },
  { label: "Contact Us", href: "/#contact-us" },
];

const STATIC_ADDRESS =
  "Lumbung Hidup St. 425 East Java Madiun City 1234";
const STATIC_EMAIL_FALLBACK = "fireplace.pro@gmail.com";
const STATIC_PHONE_DISPLAY_FALLBACK = "(737) 315-3438";

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/", Icon: Facebook },
  { label: "Twitter", href: "https://twitter.com/", Icon: Twitter },
  { label: "Instagram", href: "https://www.instagram.com/", Icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: Linkedin },
];

function FireplaceMark({ className }) {
  return (
    <svg
      className={className}
      width="56"
      height="56"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="10" y="14" width="44" height="5" rx="1" fill="currentColor" />
      <path
        d="M16 19H48V54H16V19Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M22 54V36C22 30 28 24 32 24C36 24 42 30 42 36V54"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M32 48C28 44 27 38 32 32C37 38 36 44 32 48Z"
        fill="#F97316"
      />
      <path
        d="M32 46C30 43 29.5 39 32 36C34.5 39 34 43 32 46Z"
        fill="#FDBA74"
      />
    </svg>
  );
}

export default function Footer14({ content }) {
  const footer = content?.footer ?? {};
  const contactInfo = content?.contact_info ?? {};
  const navbar = content?.navbar ?? {};

  const phoneRaw =
    contactInfo.phone ?? navbar.phone ?? STATIC_PHONE_DISPLAY_FALLBACK;
  const phoneDisplay =
    typeof phoneRaw === "string" && phoneRaw.trim()
      ? phoneRaw.trim()
      : STATIC_PHONE_DISPLAY_FALLBACK;

  const email =
    (typeof contactInfo.email === "string" && contactInfo.email.trim()
      ? contactInfo.email.trim()
      : "") || STATIC_EMAIL_FALLBACK;

  const address =
    (typeof contactInfo.address === "string" && contactInfo.address.trim()
      ? contactInfo.address.trim()
      : "") ||
    (typeof footer.address === "string" && footer.address.trim()
      ? footer.address.trim()
      : "") ||
    STATIC_ADDRESS;

  const brandName =
    (typeof navbar.company_name === "string" && navbar.company_name.trim()
      ? navbar.company_name.trim()
      : "") ||
    (typeof footer.company_name === "string" && footer.company_name.trim()
      ? footer.company_name.trim()
      : "") ||
    "Fireplace Pro";

  const trustBadgeSrcs = [1, 2, 3, 4, 5].map((n) =>
    buildImageSrc(IMAGE_BASE, `footer/footer${n}.webp`),
  );

  const copyrightYear = new Date().getFullYear();

  return (
    <footer className="font-barlow text-white antialiased">
      <FullContainer
        id="footer"
        className="bg-[#1C1C1C] py-10 md:py-14 mb-16 md:mb-0"
      >
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div className="flex flex-col gap-8">
              <nav
                className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] md:text-base text-white/95"
                aria-label="Footer"
              >
                {STATIC_NAV.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="hover:text-orange-400 transition-colors whitespace-nowrap"
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {trustBadgeSrcs.map((src, index) =>
                  src ? (
                    <div
                      key={index}
                      className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white sm:h-16 sm:w-16"
                    >
                      <Image
                        title="Trust badge"
                        src={src}
                        alt=""
                        width={52}
                        height={52}
                        className="h-[78%] w-[78%] object-contain"
                      />
                    </div>
                  ) : null,
                )}
              </div>

              <Link
                href={telHref(phoneDisplay)}
                title="Call now"
                className="inline-flex max-w-full items-center gap-4 rounded-2xl bg-[#F59402] px-5 py-4 text-white shadow-lg shadow-black/20 transition hover:brightness-95 sm:max-w-md"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Phone className="h-6 w-6" strokeWidth={2} aria-hidden />
                </span>
                <span className="flex min-w-0 flex-col text-left leading-tight">
                  <span className="text-xs font-semibold uppercase tracking-wide text-white/90">
                    Call now
                  </span>
                  <span className="font-montserrat text-lg font-bold tracking-tight sm:text-xl">
                    {phoneDisplay}
                  </span>
                </span>
              </Link>
            </div>

            <div className="lg:pl-4">
              <h3 className="font-montserrat text-xl font-bold text-white md:text-2xl">
                Stay Tuned With Us
              </h3>
              <ul className="mt-6 space-y-4 text-[15px] text-white/95 md:text-base">
                <li className="flex gap-3">
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-orange-500"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span className="leading-relaxed">{address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail
                    className="h-5 w-5 shrink-0 text-orange-500"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <Link
                    href={`mailto:${email}`}
                    className="hover:text-orange-400 transition-colors break-all"
                  >
                    {email}
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <Phone
                    className="h-5 w-5 shrink-0 text-orange-500"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <Link
                    href={telHref(phoneDisplay)}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {phoneDisplay}
                  </Link>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-4">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-orange-500 transition-colors hover:text-orange-400"
                  >
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            className="my-10 h-px w-full bg-neutral-600"
            role="presentation"
          />

          <div className="flex flex-col gap-6 pb-2 md:pb-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <FireplaceMark className="shrink-0 text-white" />
              <div>
                <p className="font-montserrat text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {brandName}
                </p>
                <p className="mt-1 text-base text-white/90">
                  Safe, Reliable &amp; Trustable
                </p>
              </div>
            </div>
            <p className="text-sm text-neutral-400">
              Copyright © {copyrightYear} Missouri | Powered by Fireplace-Pro
            </p>
          </div>
        </Container>
      </FullContainer>
    </footer>
  );
}
