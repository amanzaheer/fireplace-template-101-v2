"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import { IMAGE_BASE } from "@/lib/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapPin,
  faSquarePhone,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Rubik } from "next/font/google";
import { cn, sanitizeUrl } from "@/lib/utils";
import { resolveRefArray } from "@/lib/content-helpers";

/** Icon size for “Stay Tuned With Us” rows */
const contactIconClass = "text-[16px] md:text-[20px]";
const iconAccent = "text-[#D32F2F]";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SOCIAL_ICON_MAP = {
  facebook: Facebook,
  twitter: Twitter,
  x: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
};

const DEFAULT_SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/", Icon: Facebook },
  { label: "Twitter", href: "https://twitter.com/", Icon: Twitter },
  { label: "Instagram", href: "https://www.instagram.com/", Icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: Linkedin },
];

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

function normalizeMenuHref(link, label) {
  if (!link || typeof link !== "string") return "#";
  const normalizedLink = link.trim().toLowerCase();
  const normalizedLabel = String(label ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  // Keep footer Services item anchored to the Our Services section.
  if (
    normalizedLabel === "services" ||
    normalizedLink === "services" ||
    normalizedLink === "/services" ||
    normalizedLink === "#services" ||
    normalizedLink === "/#services"
  ) {
    return "/#our_services";
  }

  if (link.startsWith("/") || link.startsWith("#")) return link;
  return `/#${link}`;
}

function isDropdownItem(item) {
  return (
    item?.link === "#" && (item?.childrenRef || Array.isArray(item?.services))
  );
}

function getChildHref(child) {
  if (child?.path) return child.path;
  const slug = sanitizeUrl(child?.title);
  return slug ? `/${slug}` : "#";
}

const navLinkClass =
  "text-white/95 transition-colors hover:text-[#ff6b6b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D32F2F]";

export default function Footer19({ content }) {
  const pathname = usePathname() ?? "";
  const [openDropdownKey, setOpenDropdownKey] = useState(null);

  const footer = content?.footer ?? {};
  const contactInfo = content?.contact_info ?? {};
  const navbar = content?.navbar ?? {};
  const menuItems = Array.isArray(navbar?.menu_items) ? navbar.menu_items : [];

  const getDropdownChildren = useCallback(
    (item) => resolveRefArray(content, item, "children"),
    [content],
  );

  const navTagline =
    typeof navbar?.tagline === "string" && navbar.tagline.trim()
      ? navbar.tagline.trim()
      : "";

  /** Same sources as Footer12 */
  const phone =
    typeof contactInfo.phone === "string" && contactInfo.phone.trim()
      ? contactInfo.phone.trim()
      : typeof navbar.phone === "string" && navbar.phone.trim()
        ? navbar.phone.trim()
        : "";

  const email =
    typeof contactInfo.email === "string" ? contactInfo.email.trim() : "";

  const workingHours =
    contactInfo.working_hours ?? "Monday - Friday: 7AM - 8PM";

  const address =
    (typeof contactInfo.address === "string" && contactInfo.address.trim()
      ? contactInfo.address.trim()
      : "") ||
    (typeof footer.address === "string" && footer.address.trim()
      ? footer.address.trim()
      : "");

  const brandName =
    (typeof navbar.company_name === "string" && navbar.company_name.trim()
      ? navbar.company_name.trim()
      : "") ||
    (typeof footer.company_name === "string" && footer.company_name.trim()
      ? footer.company_name.trim()
      : "");

  const description =
    typeof footer.value === "string" && footer.value.trim()
      ? footer.value.trim()
      : "";

  const callNowIconRaw =
    typeof footer.call_now_icon === "string" && footer.call_now_icon.trim()
      ? footer.call_now_icon.trim()
      : "/st-icons/Temp13/call1.png";
  const callNowIconSrc =
    callNowIconRaw.startsWith("/") || callNowIconRaw.startsWith("http")
      ? callNowIconRaw
      : buildImageSrc(IMAGE_BASE, callNowIconRaw);

  const trustBadgeSrcs = [1, 2, 3, 4, 5].map((n) =>
    buildImageSrc(IMAGE_BASE, `footer/footer${n}.webp`),
  );

  const locationLine = address || workingHours;

  const parsedSocialLinks = Array.isArray(footer.social_links)
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
  const socialLinks =
    parsedSocialLinks.length > 0 ? parsedSocialLinks : DEFAULT_SOCIAL_LINKS;

  const copyrightYear = new Date().getFullYear();
  const copyrightLine =
    typeof footer.copyright === "string" && footer.copyright.trim()
      ? footer.copyright.trim()
      : `Copyright © ${copyrightYear} Missouri | Powered by Missouri Chimney`;

  return (
    <footer className="font-barlow text-white antialiased">
      <FullContainer id="footer" className="mb-16 bg-black py-10 md:mb-0 md:py-12">
        <Container className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-16">
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              {menuItems.length > 0 ? (
                <nav
                  className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm md:gap-x-8 md:text-[17px]"
                  aria-label="Footer"
                >
                  {menuItems.map((item, navIndex) => {
                    const navKey =
                      item?.title ?? item?.link ?? `footer-nav-${navIndex}`;
                    if (!item?.title) return null;

                    if (isDropdownItem(item)) {
                      const children = getDropdownChildren(item);
                      const dropdownKey =
                        item.childrenRef ?? item.title ?? String(navIndex);
                      const open = openDropdownKey === dropdownKey;

                      if (!children.length) {
                        const href = normalizeMenuHref(
                          item?.link ?? "#",
                          item?.title,
                        );
                        return (
                          <Link
                            key={navKey}
                            href={href}
                            className={navLinkClass}
                          >
                            {item.title}
                          </Link>
                        );
                      }

                      return (
                        <div
                          key={dropdownKey}
                          className="relative w-full md:inline-flex md:w-auto"
                          onMouseEnter={() => {
                            if (
                              typeof window !== "undefined" &&
                              window.matchMedia("(min-width: 768px)").matches
                            ) {
                              setOpenDropdownKey(dropdownKey);
                            }
                          }}
                          onMouseLeave={() => {
                            if (
                              typeof window !== "undefined" &&
                              window.matchMedia("(min-width: 768px)").matches
                            ) {
                              setOpenDropdownKey(null);
                            }
                          }}
                        >
                          <button
                            type="button"
                            aria-expanded={open}
                            aria-haspopup="true"
                            className={cn(
                              "flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-inherit",
                              navLinkClass,
                              open && "text-[#ff6b6b]",
                            )}
                            onClick={() =>
                              setOpenDropdownKey((prev) =>
                                prev === dropdownKey ? null : dropdownKey,
                              )
                            }
                          >
                            {item.title}
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 shrink-0 transition-transform",
                                open && "rotate-180",
                              )}
                              aria-hidden
                            />
                          </button>
                          {open ? (
                            <div
                              className="mt-2 flex max-h-[min(50vh,320px)] w-full flex-col overflow-y-auto rounded-md border border-white/15 bg-zinc-950 py-1 shadow-[0_12px_40px_rgba(0,0,0,0.65)] md:absolute md:left-0 md:top-full md:z-30 md:mt-1 md:min-w-[280px] md:w-auto"
                              role="menu"
                            >
                              {children.map((child, index) => {
                                const href = getChildHref(child);
                                const isActive =
                                  pathname === href ||
                                  pathname === (child?.path ?? "");
                                return (
                                  <Link
                                    key={
                                      child?.title ?? child?.path ?? index
                                    }
                                    role="menuitem"
                                    title={child?.title}
                                    href={href}
                                    onClick={() => setOpenDropdownKey(null)}
                                    className={cn(
                                      "block px-4 py-2 text-[15px] font-medium normal-case transition-colors md:text-base",
                                      isActive
                                        ? "bg-[#D32F2F] text-white"
                                        : "text-white/90 hover:bg-[#D32F2F] hover:text-white",
                                    )}
                                  >
                                    {child?.title}
                                  </Link>
                                );
                              })}
                            </div>
                          ) : null}
                        </div>
                      );
                    }

                    const href = normalizeMenuHref(
                      item?.link ?? "#",
                      item?.title,
                    );
                    return (
                      <Link key={navKey} href={href} className={navLinkClass}>
                        {item.title}
                      </Link>
                    );
                  })}
                </nav>
              ) : null}

              {description ? (
                <p className="max-w-xl text-[15px] leading-relaxed text-white/85 md:text-base">
                  {description}
                </p>
              ) : null}

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {trustBadgeSrcs.map((src, index) =>
                  src ? (
                    <div
                      key={index}
                      className="flex h-11 w-11 shrink-0 items-center justify-center sm:h-12 sm:w-12"
                    >
                      <Image
                        title="Trust badge"
                        src={src}
                        alt=""
                        width={54}
                        height={54}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ) : null,
                )}
              </div>

              {phone ? (
                <Link
                  href={telHref(phone)}
                  title="Call now"
                  className="inline-flex w-fit max-w-full items-center gap-4  bg-[#D32F2F] px-5 py-3 text-white shadow-lg shadow-black/30 transition hover:brightness-95"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center">
                    <Image
                      src={callNowIconSrc}
                      alt=""
                      width={40}
                      height={40}
                      className="h-10 w-10 object-contain"
                      aria-hidden
                    />
                  </span>
                  <span className="flex min-w-0 flex-col text-left leading-tight">
                    <span className="font-poppins text-[12px] font-semibold uppercase tracking-[0.14em]  ml-6 text-white/95 font-Poppins">
                      Call now
                    </span>
                    <span className="font-poppins text-base font-bold tracking-tight sm:text-lg">
                      {phone}
                    </span>
                  </span>
                </Link>
              ) : null}
            </div>

            <div className="flex w-full shrink-0 flex-col md:max-w-[340px] lg:max-w-[380px]">
              <h3
                className={`${rubik.className} mb-5 text-lg font-bold text-white md:text-[25px]`}
              >
                Stay Tuned With Us
              </h3>
              <div className="flex flex-col gap-3 text-left md:gap-4">
                {locationLine ? (
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon
                      icon={faMapPin}
                      className={`${contactIconClass} ${iconAccent} mt-0.5 shrink-0`}
                    />
                    <span className="text-sm leading-relaxed text-white/95 md:text-[15px]">
                      {locationLine}
                    </span>
                  </div>
                ) : null}
                {email ? (
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className={`${contactIconClass} ${iconAccent} shrink-0`}
                    />
                    <Link
                      href={`mailto:${email}`}
                      className="min-w-0 wrap-break-word text-[15px] text-white/95 transition-colors hover:text-white md:text-[17px]"
                    >
                      {email}
                    </Link>
                  </div>
                ) : null}
                {phone ? (
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon
                      icon={faSquarePhone}
                      className={`${contactIconClass} ${iconAccent} shrink-0`}
                    />
                    <Link
                      href={telHref(phone)}
                      className="text-[15px] text-white/95 transition-colors hover:text-white md:text-[17px]"
                    >
                      {phone}
                    </Link>
                  </div>
                ) : null}
              </div>

              {socialLinks.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-10 grid w-full grid-cols-1 items-center gap-6 border-t border-white/90 pt-6 pb-4 text-left md:mt-12 md:grid-cols-2 md:gap-8 md:pt-8">
            {/* col1: logo / brand */}
            <div className="min-w-0 justify-self-start">
              {navbar?.logo ? (
                <Logo
                  logo={navbar.logo}
                  imagePath={navbar.imagePath ?? IMAGE_BASE}
                  tagline={navTagline || undefined}
                  taglineClassName={navTagline ? "!text-white/90" : undefined}
                  className="font-serif font-bold text-white md:text-2xl lg:text-[1.65rem]"
                />
              ) : brandName ? (
                <div className="flex flex-col items-start text-left">
                  <p className="font-montserrat text-2xl font-bold tracking-tight text-white md:text-3xl">
                    {brandName}
                  </p>
                  {navTagline ? (
                    <p className="mt-1 text-base text-white/90">{navTagline}</p>
                  ) : null}
                </div>
              ) : null}
            </div>
            {/* col2: copyright text */}
            <div className="min-w-0 justify-self-start md:justify-self-end md:text-right">
              <p className="max-w-full text-xs leading-snug text-white/90 md:text-sm">
                {copyrightLine}
              </p>
            </div>
          </div>

        </Container>
      </FullContainer>
    </footer>
  );
}
