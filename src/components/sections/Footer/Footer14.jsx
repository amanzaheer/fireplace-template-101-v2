"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock4,
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

const SOCIAL_ICON_MAP = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
};

function normalizeMenuHref(link) {
  if (!link || typeof link !== "string") return "#";
  if (link.startsWith("/") || link.startsWith("#")) return link;
  return `/#${link}`;
}

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
      <path d="M32 48C28 44 27 38 32 32C37 38 36 44 32 48Z" fill="#F97316" />
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
  const menuItems = Array.isArray(navbar?.menu_items) ? navbar.menu_items : [];
  const footerNav = menuItems
    .map((item) => ({
      label: item?.title,
      href: normalizeMenuHref(item?.link),
    }))
    .filter((item) => item.label && item.href);

  const phoneRaw = contactInfo.phone ?? navbar.phone ?? "";
  const phoneDisplay =
    typeof phoneRaw === "string" && phoneRaw.trim() ? phoneRaw.trim() : "";

  const email =
    typeof contactInfo.email === "string" ? contactInfo.email.trim() : "";
  const workingHours =
    typeof contactInfo.working_hours === "string"
      ? contactInfo.working_hours.trim()
      : "";

  const address =
    (typeof contactInfo.address === "string" && contactInfo.address.trim()
      ? contactInfo.address.trim()
      : "") ||
    (typeof footer.address === "string" && footer.address.trim()
      ? footer.address.trim()
      : "");

  const brandName =
    (typeof navbar?.logo?.logoText === "string" && navbar.logo.logoText.trim()
      ? navbar.logo.logoText.trim()
      : "") ||
    (typeof navbar.company_name === "string" && navbar.company_name.trim()
      ? navbar.company_name.trim()
      : "") ||
    (typeof footer.company_name === "string" && footer.company_name.trim()
      ? footer.company_name.trim()
      : "");
  const statement =
    (typeof footer.value === "string" && footer.value.trim()
      ? footer.value.trim()
      : "") ||
    (typeof footer.statement === "string" && footer.statement.trim()
      ? footer.statement.trim()
      : "");

  const socialLinks = Array.isArray(footer.social_links)
    ? footer.social_links
        .map((item) => {
          const type = String(item?.type ?? item?.label ?? "").toLowerCase();
          const Icon = SOCIAL_ICON_MAP[type];
          const href = typeof item?.href === "string" ? item.href.trim() : "";
          if (!Icon || !href) return null;
          return {
            label: item?.label ?? type,
            href,
            Icon,
          };
        })
        .filter(Boolean)
    : [];

  const trustBadgeSrcs = [1, 2, 3, 4, 5].map((n) =>
    buildImageSrc(IMAGE_BASE, `footer/footer${n}.webp`),
  );

  const copyrightYear = new Date().getFullYear();
  const cityName =
    typeof content?.city_name === "string" && content.city_name.trim()
      ? content.city_name.trim()
      : "";

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
                {footerNav.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="hover:text-orange-400 transition-colors whitespace-nowrap"
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              {statement ? (
                <p className="text-sm leading-relaxed text-white/90">
                  {statement}
                </p>
              ) : null}

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

              {phoneDisplay ? (
                <Link
                  href={telHref(phoneDisplay)}
                  title="Call now"
                  className="inline-flex w-fit max-w-full items-center gap-4 rounded-2xl bg-[#F59402] px-5 py-4 text-white shadow-lg shadow-black/20 transition hover:brightness-95 sm:max-w-md"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <Phone className="h-6 w-6" strokeWidth={2} aria-hidden />
                  </span>
                  <span className="flex w-full flex-col text-left leading-tight">
                    <span className="text-xs font-semibold uppercase tracking-wide text-white/90">
                      Call now
                    </span>
                    <span className="font-montserrat text-lg font-bold tracking-tight sm:text-xl">
                      {phoneDisplay}
                    </span>
                  </span>
                </Link>
              ) : null}
            </div>

            <div className="lg:pl-4">
              <h3 className="font-montserrat text-xl font-bold text-white md:text-2xl">
                Stay Tuned With Us
              </h3>
              <ul className="mt-6 space-y-4 text-[15px] text-white/95 md:text-base">
                {email ? (
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
                ) : null}
                {phoneDisplay ? (
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
                ) : null}
                {workingHours ? (
                  <li className="flex items-center gap-3">
                    <Clock4
                      className="h-5 w-5 shrink-0 text-orange-500"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span>{workingHours}</span>
                  </li>
                ) : null}
              </ul>

              <div className="mt-8 flex flex-wrap gap-4">
                {socialLinks.map(({ label, href, Icon }) => (
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
              Copyright © {copyrightYear}
              {cityName ? ` ${cityName}` : ""} | Powered by{" "}
              {brandName || "Fireplace"}
            </p>
          </div>
        </Container>
      </FullContainer>
    </footer>
  );
}
