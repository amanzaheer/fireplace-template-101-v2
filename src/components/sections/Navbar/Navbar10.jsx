"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import Image from "next/image";
import Container from "../../common/Container";
import FullContainer from "../../common/FullContainer";
import Logo from "@/components/common/Logo";
import { cn, sanitizeUrl } from "@/lib/utils";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { Inter, Poppins } from "next/font/google";

const SCROLL_OFFSET = 80;

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const TOP_BAR_BG = "bg-[#5484A6]";
const NAV_BAR_BG = "bg-[#0C5B8F]";

/** Shown above the number on the phone CTA; CMS `phone_cta_subtitle` overrides when set. */
const DEFAULT_PHONE_CTA_MAIN_TEXT =
  "Need Service Now? We Answer Calls 24/7.";

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

function buildCtaImageSrc(imagePath, fileName) {
  if (!fileName || typeof fileName !== "string") return "";
  const base = (imagePath ?? IMAGE_BASE).replace(/\/$/, "");
  const seg = fileName.replace(/^\//, "");
  return `${base}/${seg}`;
}

export default function Navbar10({ content }) {
  const navbar = content?.navbar ?? {};
  const {
    logo,
    phone: navbarPhone,
    menu_items = [],
    imagePath: navbarImagePath,
    phone_cta_subtitle: phoneCtaSubtitleSnake,
    phoneCtaSubtitle,
    phone_cta_image: phoneCtaImageSnake,
    phoneCtaImage,
  } = navbar;

  const imagePath = navbarImagePath ?? IMAGE_BASE;
  const phoneRaw =
    (typeof navbarPhone === "string" && navbarPhone.trim()
      ? navbarPhone
      : typeof content?.contact_info?.phone === "string"
        ? content.contact_info.phone.trim()
        : "") || "";

  const phoneCtaSubtitleFromCms = (
    typeof phoneCtaSubtitleSnake === "string"
      ? phoneCtaSubtitleSnake.trim()
      : typeof phoneCtaSubtitle === "string"
        ? phoneCtaSubtitle.trim()
        : ""
  );
  const phoneCtaMainText =
    phoneCtaSubtitleFromCms || DEFAULT_PHONE_CTA_MAIN_TEXT;

  const phoneCtaImageFile =
    typeof phoneCtaImageSnake === "string"
      ? phoneCtaImageSnake.trim()
      : typeof phoneCtaImage === "string"
        ? phoneCtaImage.trim()
        : "";

  const menuItemsArray = useMemo(
    () => (Array.isArray(menu_items) ? menu_items : []),
    [menu_items],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [openDropdownRef, setOpenDropdownRef] = useState(null);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname() ?? "";
  const router = useRouter();

  const getDropdownChildren = useCallback(
    (item) => resolveRefArray(content, item, "children"),
    [content],
  );

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

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

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  const phoneLink = phoneRaw ? `tel:${phoneRaw}` : "#";

  const ctaImageSrc = phoneCtaImageFile
    ? buildCtaImageSrc(imagePath, phoneCtaImageFile)
    : "";

  const phoneCtaBlock = phoneRaw ? (
    <a
      href={phoneLink}
      className={cn(
        "relative flex max-w-full shrink-0 items-stretch no-underline outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#5484A6]",
        ctaImageSrc ? "pl-10 sm:pl-14 md:pl-16" : "",
      )}
    >
      {ctaImageSrc ? (
        <span className="pointer-events-none absolute left-0 top-1/2 z-[1] hidden h-[72px] w-[72px] -translate-y-1/2 sm:block md:h-[84px] md:w-[84px]">
          <Image
            src={ctaImageSrc}
            alt=""
            width={84}
            height={84}
            className="h-full w-full object-contain object-bottom"
            aria-hidden
          />
        </span>
      ) : null}
      <div
        className={cn(
          "flex min-w-0 items-center gap-2 rounded-2xl border-2  border-white bg-gradient-to-b from-[#f20508] to-[#c91012] px-3 py-2 pl-4 shadow-md sm:gap-3 sm:px-5 sm:py-2.5",
          poppins.className,
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 text-left">
          <span className="text-[10px] font-medium leading-snug text-white sm:text-xs">
            {phoneCtaMainText}
          </span>
          <span className="truncate text-sm font-bold leading-tight text-center  text-white sm:text-base md:text-lg">
            {phoneRaw}
          </span>
        </div>
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1fa34a] text-white shadow-inner sm:h-10 sm:w-10"
          aria-hidden
        >
          <Phone className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2.4} />
        </span>
      </div>
    </a>
  ) : null;

  const renderDesktopNavItem = (item) => {
    if (isDropdownItem(item)) {
      const children = getDropdownChildren(item);
      const dropdownKey = item.childrenRef ?? item.title;
      const dropdownOpen = openDropdownRef === dropdownKey;
      return (
        <div
          key={dropdownKey}
          className="relative flex h-full items-center"
          onMouseEnter={() => setOpenDropdownRef(dropdownKey)}
          onMouseLeave={() => setOpenDropdownRef(null)}
        >
          <button
            type="button"
            className={cn(
              `${inter.className} flex items-center gap-1 text-sm text-white  transition-colors hover:text-white/90`,
              dropdownOpen ? "font-bold" : "font-normal",
            )}
          >
            {item.title}
            <ChevronDown className="h-4 w-4 opacity-90" />
          </button>
          <div
            className={cn(
              "absolute left-1/2 top-full z-30 flex min-w-[260px] -translate-x-1/2 flex-col pt-2 transition-all duration-200 ease-out",
              dropdownOpen
                 ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-1 opacity-0",
            )}
          >
            <div className="rounded-sm bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
              <div className="dropdown-services-container scrollbar-hide max-h-[min(70vh,360px)] grow overflow-y-auto">
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
                        `${inter.className} block cursor-pointer px-4 py-2 text-sm transition-colors`,
                        isActive
                          ? "bg-[#0C5B8F] font-semibold text-white"
                          : "text-neutral-900 hover:bg-[#5484a6] hover:text-white",
                      )}
                    >
                      {child?.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }
    const isLink = item.link?.startsWith("/");
    const isActive = isLink && pathname === item.link;
    if (isLink) {
      return (
        <Link
          key={item.link ?? item.title}
          href={item.link}
          className={cn(
            `${inter.className} text-sm text-white transition-colors hover:text-white/90`,
            isActive ? "font-bold" : "font-normal",
          )}
        >
          {item.title}
        </Link>
      );
    }
    const hashActive =
      typeof item.link === "string" &&
      item.link !== "#" &&
      pathname.includes(item.link);
    return (
      <button
        key={item.link ?? item.title}
        type="button"
        onClick={() => handleNavigation(item.link)}
        className={cn(
          `${inter.className} cursor-pointer bg-transparent text-sm text-white transition-colors hover:text-white/90`,
          hashActive ? "font-bold" : "font-normal",
        )}
      >
        {item.title}
      </button>
    );
  };

  const topBarRow = (
    <div className="flex w-full flex-row items-center justify-between gap-3 py-3 md:gap-6 md:py-5">
      <div className="flex min-h-[48px] min-w-0 flex-1 items-center md:min-h-[56px] ml-0 md:ml-34">
        <Logo logo={logo} imagePath={imagePath} />
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {phoneCtaBlock ? (
          <div className="hidden min-w-0 sm:block sm:max-w-none">{phoneCtaBlock}</div>
        ) : null}
        {phoneRaw ? (
          <a
            href={phoneLink}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-[#1fa34a] text-white shadow-md sm:hidden",
              poppins.className,
            )}
            aria-label={`${phoneCtaMainText} ${phoneRaw}`}
          >
            <Phone className="h-5 w-5" strokeWidth={2.4} />
          </a>
        ) : null}
        <div
          className={cn(
            "cursor-pointer rounded border border-white/90 bg-white/10 p-1.5 text-white lg:hidden",
            !mounted && "pointer-events-none opacity-90",
          )}
          onClick={mounted ? toggleMenu : undefined}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            mounted && (e.key === "Enter" || e.key === " ") && toggleMenu()
          }
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </div>
      </div>
    </div>
  );

  const desktopNavRow = (
    <nav
      className={cn(
        "hidden w-full items-center justify-center gap-6 py-2.5 md:gap-10 md:py-3 lg:flex",
        inter.className,
      )}
      aria-label="Main"
    >
      {menuItemsArray.map((item) => renderDesktopNavItem(item))}
    </nav>
  );

  const shellClass =
    "sticky top-0 z-20 w-full max-w-none items-stretch shadow-md text-white";
  const innerClass = "w-full max-w-none";

  if (!mounted) {
    return (
      <FullContainer className={shellClass}>
        <div className={cn(TOP_BAR_BG, "w-full")}>
          <Container className={innerClass}>{topBarRow}</Container>
        </div>
        <div className={cn(NAV_BAR_BG, "relative w-full")}>
          <Container className={innerClass}>{desktopNavRow}</Container>
        </div>
      </FullContainer>
    );
  }

  return (
    <FullContainer id="navbar" className={shellClass}>
      <div className={cn(TOP_BAR_BG, "w-full")}>
        <Container className={innerClass}>{topBarRow}</Container>
      </div>

      <div className={cn(NAV_BAR_BG, "relative w-full")}>
        <Container className={innerClass}>{desktopNavRow}</Container>

        <div
          className={cn(
            "absolute left-0 right-0 top-full z-30 overflow-hidden border-t border-white/15 shadow-lg transition-all duration-300 ease-out lg:hidden",
            NAV_BAR_BG,
            isOpen ? "max-h-[min(85vh,520px)] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div
            className={cn(
              "flex max-h-[min(85vh,520px)] flex-col overflow-y-auto py-2 text-[17px] font-medium",
              inter.className,
            )}
          >
            {menuItemsArray.map((item) => {
              if (isDropdownItem(item)) {
                const children = getDropdownChildren(item);
                const dropdownKey = item.childrenRef ?? item.title;
                const isDropdownOpen = openDropdownRef === dropdownKey;
                return (
                  <div key={dropdownKey} className="border-b border-white/10 last:border-0">
                    <div
                      className={cn(
                        "flex cursor-pointer items-center justify-between px-4 py-2.5 text-white",
                        children.some((c) => pathname === getChildHref(c))
                          ? "font-bold"
                          : "font-normal",
                      )}
                      onClick={() =>
                        setOpenDropdownRef((prev) =>
                          prev === dropdownKey ? null : dropdownKey,
                        )
                      }
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") &&
                        setOpenDropdownRef((prev) =>
                          prev === dropdownKey ? null : dropdownKey,
                        )
                      }
                    >
                      {item.title}
                      <ChevronDown className="h-4 w-4 opacity-90" />
                    </div>
                    {isDropdownOpen && children.length > 0 && (
                      <div className="flex max-h-[240px] flex-col gap-0 overflow-y-auto bg-black/15 py-1">
                        {children.map((child, index) => {
                          const href = getChildHref(child);
                          const isActive =
                            pathname === href ||
                            pathname === (child?.path ?? "");
                          return (
                            <Link
                              key={child?.title ?? child?.path ?? index}
                              title={child?.title}
                              href={href}
                              className={cn(
                                "px-6 py-2 text-base text-white/95",
                                isActive ? "font-bold" : "font-normal",
                              )}
                              onClick={closeMenu}
                            >
                              {child?.title}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              const isLink = item.link?.startsWith("/");
              const isActive = isLink && pathname === item.link;
              if (isLink) {
                return (
                  <Link
                    key={item.link ?? item.title}
                    title={item.title}
                    href={item.link}
                    className={cn(
                      "border-b border-white/10 px-4 py-2.5 text-white last:border-0",
                      isActive ? "font-bold" : "font-normal",
                    )}
                    onClick={closeMenu}
                  >
                    {item.title}
                  </Link>
                );
              }
              return (
                <button
                  key={item.link ?? item.title}
                  type="button"
                  className={cn(
                    "w-full cursor-pointer border-b border-white/10 px-4 py-2.5 text-left text-white last:border-0",
                    typeof item.link === "string" &&
                      item.link !== "#" &&
                      pathname.includes(item.link)
                      ? "font-bold"
                      : "font-normal",
                  )}
                  onClick={() => {
                    handleNavigation(item.link);
                    closeMenu();
                  }}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </FullContainer>
  );
}
