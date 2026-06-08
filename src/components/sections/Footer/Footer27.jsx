"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Archivo, Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import { cn, sanitizeUrl } from "@/lib/utils";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

/** Stay Tuned — body rows (Figma: Archivo 400, 17px / 26px, 12px spacing, max 282px) */
const contactBodyClass = cn(
  archivo.className,
  "max-w-[282px] text-[17px] font-normal leading-[26px] tracking-normal text-black",
);

const SCROLL_OFFSET = 80;
const ACCENT = "#C1272D";

const SOCIAL_ICON_MAP = {
  facebook: Facebook,
  twitter: Twitter,
  x: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
};

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

function getBadgeSources(footer) {
  const extra = footer?.badge_images;
  if (Array.isArray(extra) && extra.length > 0) {
    return extra
      .map((p) => (typeof p === "string" ? buildImageSrc(IMAGE_BASE, p) : ""))
      .filter(Boolean);
  }
  return [1, 2, 3, 4, 5]
    .map((n) => buildImageSrc(IMAGE_BASE, `footer/footer${n}.webp`))
    .filter(Boolean);
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

function mapsEmbedSrc(address) {
  if (!address?.trim()) return "";
  return `https://maps.google.com/maps?q=${encodeURIComponent(address.trim())}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
}

export default function Footer27({ content }) {
  const footer = content?.footer ?? {};
  const navbar = content?.navbar ?? {};
  const contactInfo = content?.contact_info ?? {};
  const logo = navbar.logo;
  const imagePath = navbar.imagePath ?? IMAGE_BASE;
  const menuItemsArray = useMemo(
    () => (Array.isArray(navbar.menu_items) ? navbar.menu_items : []),
    [navbar.menu_items],
  );

  const phone =
    (typeof contactInfo.phone === "string" && contactInfo.phone.trim()
      ? contactInfo.phone.trim()
      : "") ||
    (typeof navbar.phone === "string" && navbar.phone.trim()
      ? navbar.phone.trim()
      : "");

  const email =
    typeof contactInfo.email === "string" ? contactInfo.email.trim() : "";

  const address =
    (typeof contactInfo.address === "string" && contactInfo.address.trim()
      ? contactInfo.address.trim()
      : "") ||
    (typeof footer.address === "string" && footer.address.trim()
      ? footer.address.trim()
      : "");

  const statement =
    (typeof footer.value === "string" && footer.value.trim()
      ? footer.value.trim()
      : "") ||
    (typeof footer.statement === "string" && footer.statement.trim()
      ? footer.statement.trim()
      : "");

  const contactHeading =
    typeof footer.contact_heading === "string" && footer.contact_heading.trim()
      ? footer.contact_heading.trim()
      : "Stay Tuned With Us";

  const badgeSources = getBadgeSources(footer);

  const callNowIconRaw =
    typeof footer.call_now_icon === "string" && footer.call_now_icon.trim()
      ? footer.call_now_icon.trim()
      : "/st-icons/Temp13/call1.png";
  const callNowIconSrc =
    callNowIconRaw.startsWith("/") || callNowIconRaw.startsWith("http")
      ? callNowIconRaw
      : buildImageSrc(IMAGE_BASE, callNowIconRaw);

  const socialLinks = Array.isArray(footer.social_links)
    ? footer.social_links
        .map((item) => {
          const type = String(item?.type ?? item?.label ?? "").toLowerCase();
          const Icon = SOCIAL_ICON_MAP[type];
          const href = typeof item?.href === "string" ? item.href.trim() : "";
          if (!Icon || !href) return null;
          return { label: item?.label ?? type, href, Icon };
        })
        .filter(Boolean)
    : [];

  const mapSrc = mapsEmbedSrc(address);
  const [openDropdownRef, setOpenDropdownRef] = useState(null);
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const getDropdownChildren = useCallback(
    (item) => resolveRefArray(content, item, "children"),
    [content],
  );

  const scrollToSection = useCallback((element) => {
    if (!element) return;
    const top =
      element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const handleNavigation = useCallback(
    (id) => {
      const element = document.getElementById(id);
      if (element) {
        scrollToSection(element);
      } else {
        router.push("/");
        setTimeout(() => {
          const el = document.getElementById(id);
          scrollToSection(el);
        }, 500);
      }
    },
    [router, scrollToSection],
  );

  const navLinkClass = cn(
    poppins.className,
    "text-[18px] font-medium leading-none tracking-normal text-white transition-opacity hover:opacity-80",
  );

  const renderBottomMenuItem = (item) => {
    if (isDropdownItem(item)) {
      const children = getDropdownChildren(item);
      const dropdownKey = item.childrenRef ?? item.title;
      const isDropdownOpen = openDropdownRef === dropdownKey;

      return (
        <div
          key={dropdownKey}
          className="relative"
          onMouseEnter={() => setOpenDropdownRef(dropdownKey)}
          onMouseLeave={() => setOpenDropdownRef(null)}
        >
          <button
            type="button"
            className={cn(navLinkClass, "flex cursor-pointer items-center gap-1")}
            onClick={() =>
              setOpenDropdownRef((prev) =>
                prev === dropdownKey ? null : dropdownKey,
              )
            }
            aria-expanded={isDropdownOpen}
          >
            {item.title}
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                isDropdownOpen && "rotate-180",
              )}
            />
          </button>

          {children.length > 0 && (
            <div
              className={cn(
                "absolute bottom-full left-1/2 z-30 mb-2 flex min-w-[280px] -translate-x-1/2 flex-col bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all duration-300 md:left-0 md:translate-x-0",
                isDropdownOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible translate-y-2 opacity-0 pointer-events-none",
              )}
            >
              {children.map((child, index) => {
                const href = getChildHref(child);
                const isActive =
                  pathname === href || pathname === (child?.path ?? "");
                return (
                  <Link
                    key={child?.title ?? child?.path ?? index}
                    title={child?.title}
                    href={href}
                    className={cn(
                      poppins.className,
                      "block px-4 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-[#001633] text-white"
                        : "text-[#001633] hover:bg-[#001633] hover:text-white",
                    )}
                    onClick={() => setOpenDropdownRef(null)}
                  >
                    {child.title}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }
   
    if (item.link?.startsWith("/")) {
      return (
        <Link key={item.link ?? item.title} href={item.link} className={navLinkClass}>
          {item.title}
        </Link>
      );
    }
   
    return (
      <button
        key={item.link ?? item.title}
        type="button"
        onClick={() => handleNavigation(item.link)}
        className={cn(navLinkClass, "cursor-pointer")}
      >
        {item.title}
      </button>
    );
  };

  return (
    <footer id="footer" className="mb-16 md:mb-0">
      {/* Top — white */}
      <FullContainer className="bg-white py-10 md:py-14">
        <Container className="mx-auto max-w-[1455px] px-4 md:px-6 lg:px-8 ">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-3 lg:gap-12 xl:gap-16">
            {/* Column 1 — logo, badges, statement, call */}
            <div className="flex min-w-0 flex-col gap-5  items-start">
              {logo ? (
                <Logo logo={logo} imagePath={imagePath} />
              ) : null}

              {statement ? (
                <p
                  className={cn(
                    poppins.className,
                    "max-w-[420px] text-[15px] leading-relaxed  text-black/85 md:text-base",
                  )}
                >
                  {statement}
                </p>
              ) : null}

              {badgeSources.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {badgeSources.map((src, index) =>
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
              ) : null}

              {phone ? (
                <Link
                  href={telHref(phone)}
                  title="Call now"
                  className={cn(
                    poppins.className,
                    "inline-flex w-fit max-w-full items-center gap-3  bg-[#C1272D] px-5 py-3 text-white shadow-md transition hover:brightness-95",
                  )}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center">
                    <Image
                      src={callNowIconSrc}
                      alt=""
                      width={36}
                      height={36}
                      className="h-9 w-9 object-contain"
                      aria-hidden
                    />
                  </span>
                  <span className="flex min-w-0 flex-col text-left leading-tight">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/95">
                      Call Now
                    </span>
                    <span className="text-base font-bold tracking-tight sm:text-lg">
                      {phone}
                    </span>
                  </span>
                </Link>
              ) : null}
            </div>

            {/* Column 2 — contact */}
            <div className="flex min-w-0 flex-col">
              <h3
                className={cn(
                  archivo.className,
                  "mb-5 text-xl font-bold text-black md:text-[25px]",
                )}
              >
                {contactHeading}
              </h3>

              <div className="flex flex-col gap-3">
                {address ? (
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="mt-1 h-5 w-5 shrink-0"
                      style={{ color: ACCENT }}
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span className={contactBodyClass}>{address}</span>
                  </div>
                ) : null}

                {email ? (
                  <div className="flex items-start gap-3">
                    <Mail
                      className="mt-1 h-5 w-5 shrink-0"
                      style={{ color: ACCENT }}
                      strokeWidth={2}
                      aria-hidden
                    />
                    <Link
                      href={`mailto:${email}`}
                      className={cn(
                        contactBodyClass,
                        "transition-colors hover:text-[#C1272D]",
                      )}
                    >
                      {email}
                    </Link>
                  </div>
                ) : null}

                {phone ? (
                  <div className="flex items-start gap-3">
                    <Phone
                      className="mt-1 h-5 w-5 shrink-0"
                      style={{ color: ACCENT }}
                      strokeWidth={2}
                      aria-hidden
                    />
                    <Link
                      href={telHref(phone)}
                      className={cn(
                        contactBodyClass,
                        "transition-colors hover:text-[#C1272D]",
                      )}
                    >
                      {phone}
                    </Link>
                  </div>
                ) : null}
              </div>

              {socialLinks.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  {socialLinks.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center border justify-center rounded-full text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: ACCENT }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                    </a>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Column 3 — map */}
            {mapSrc || address ? (
              <div className="flex min-w-0 flex-col gap-3">
                {mapSrc ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100 shadow-sm">
                    <iframe
                      title="Location map"
                      src={mapSrc}
                      className="absolute inset-0 h-full w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                ) : null}

                {address ? (
                  <div className="flex items-start gap-2">
                    <MapPin
                      className="mt-0.5 h-5 w-5 shrink-0"
                      style={{ color: ACCENT }}
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span
                      className={cn(
                        poppins.className,
                        "text-sm leading-relaxed text-black/90 md:text-[15px]",
                      )}
                    >
                      {address}
                    </span>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </Container>
      </FullContainer>

      {/* Bottom — navy nav bar */}
      <FullContainer className="bg-[#001633]">
        <div
          className={cn(
            "mx-auto flex w-full max-w-[1455px] flex-col items-center justify-between gap-[30px]",
            "px-6 py-8 md:h-[207px] md:flex-row md:items-center md:px-[167px] md:py-[60px]",
          )}
        >
          <div className="shrink-0 [&_h2]:text-white [&_h2_span]:text-white!">
            <Logo logo={logo} imagePath={imagePath} className="text-white" />
          </div>

          <nav
            className={cn(
              poppins.className,
              "flex flex-wrap items-center justify-center gap-[30px] md:gap-[70px] md:justify-end",
            )}
            aria-label="Footer navigation"
          >
            {menuItemsArray.map((item) => renderBottomMenuItem(item))}
          </nav>
        </div>
      </FullContainer>
    </footer>
  );
}
