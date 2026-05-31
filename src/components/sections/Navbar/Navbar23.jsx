"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Phone, ChevronDown, Menu, X } from "lucide-react";
import Container from "../../common/Container";
import FullContainer from "../../common/FullContainer";
import Logo from "@/components/common/Logo";
import { cn, sanitizeUrl } from "@/lib/utils";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";

const SCROLL_OFFSET = 118;
const NAV_RED = "#CC3333";
const BANNER_TRUST_EVENT = "banner-trust-select";

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

function notifyBannerTrust(child, href) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(BANNER_TRUST_EVENT, {
      detail: {
        path: href,
        title: child?.title,
        key: sanitizeUrl(child?.title),
      },
    }),
  );
}

function NavLink({
  item,
  pathname,
  openDropdownRef,
  setOpenDropdownRef,
  getDropdownChildren,
  handleNavigation,
  closeMenu,
  variant = "desktop",
}) {
  const isDesktop = variant === "desktop";
  const baseLink =
    "font-bold uppercase tracking-wide text-white transition-colors";
  const desktopClass = cn(
    baseLink,
    "inline-flex h-full items-center gap-1 whitespace-nowrap py-3 text-[15px] md:text-base lg:text-[18px]",
    "hover:text-white/90",
  );
  const mobileClass = `${baseLink} flex w-full items-center justify-between px-4 py-3 text-left text-base`;
  if (isDropdownItem(item)) {
    const children = getDropdownChildren(item);
    const dropdownKey = item.childrenRef ?? item.title;
    const isDropdownOpen = openDropdownRef === dropdownKey;
    if (isDesktop) {
      return (
        <div
          key={dropdownKey}
          className="relative flex h-full items-center"
          onMouseEnter={() => setOpenDropdownRef(dropdownKey)}
          onMouseLeave={() => setOpenDropdownRef(null)}
        >
          <button
            type="button"
            className={desktopClass}
          >
            {item.title}
            <ChevronDown className="h-4 w-4 shrink-0" strokeWidth={2.5} />
          </button>
          <div
            className={cn(
              "absolute left-0 top-full z-50 flex min-w-[280px] flex-col bg-white py-1 shadow-[0_0_10px_rgba(0,0,0,0.35)] transition-all duration-300",
              isDropdownOpen
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-1 opacity-0",
            )}
          >
            {children.map((child, index) => {
              const href = getChildHref(child);
              const isActive =
                pathname === href || pathname === (child?.path ?? "");
              return (
                <Link
                  key={child?.title ?? child?.path ?? index}
                  href={href}
                  title={child?.title}
                  className={cn(
                    "block px-4 py-2 text-sm font-semibold normal-case",
                    isActive
                      ? "bg-[#D32F2F] text-white"
                      : "text-neutral-900 hover:bg-[#D32F2F] hover:text-white",
                  )}
                  onClick={() => {
                    notifyBannerTrust(child, href);
                    closeMenu?.();
                  }}
                >
                  {child?.title}
                </Link>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div key={dropdownKey} className="border-t border-white/15">
        <button
          type="button"
          className={mobileClass}
          onClick={() =>
            setOpenDropdownRef((prev) =>
              prev === dropdownKey ? null : dropdownKey,
            )
          }
        >
          {item.title}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isDropdownOpen && "rotate-180",
            )}
          />
        </button>
        {isDropdownOpen && children.length > 0 && (
          <div className="bg-black/15">
            {children.map((child, index) => {
              const href = getChildHref(child);
              const isActive =
                pathname === href || pathname === (child?.path ?? "");
              return (
                <Link
                  key={child?.title ?? child?.path ?? index}
                  href={href}
                  title={child?.title}
                  className={cn(
                    "block py-2.5 pl-8 pr-4 text-sm font-semibold normal-case",
                    isActive ? "bg-black/25 text-white" : "text-white/90",
                  )}
                  onClick={() => {
                    notifyBannerTrust(child, href);
                    closeMenu?.();
                  }}
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
  const isActive = pathname === item.link;
  if (isLink) {
    return (
      <Link
        key={item.link ?? item.title}
        href={item.link}
        className={cn(
          isDesktop ? desktopClass : mobileClass,
          isActive && !isDesktop && "bg-black/20",
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
        isDesktop ? desktopClass : mobileClass,
        !isDesktop && "border-t border-white/15",
        pathname.includes(item.link) && !isDesktop && "bg-black/20",
      )}
      onClick={() => {
        handleNavigation(item.link);
        closeMenu?.();
      }}
    >
      {item.title}
    </button>
  );
}

function CallBlock({ phone, phoneCtaSubtitle, phoneLink, compact = false }) {
  return (
    <a
      href={phoneLink}
      className={cn(
        "group flex min-w-0 items-center text-white transition-opacity hover:opacity-90",
        compact ? "gap-2" : "gap-2.5 sm:gap-3 md:gap-4",
      )}
    >
      {phoneCtaSubtitle && !compact && (
        <span className="hidden max-w-[220px] text-right text-xs font-normal leading-snug text-white/95 md:inline lg:max-w-none lg:text-sm xl:text-base">
          {phoneCtaSubtitle}
        </span>
      )}
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 md:h-11 md:w-11"
        style={{ backgroundColor: NAV_RED }}
        aria-hidden
      >
        <Phone className="h-4 w-4 text-white sm:h-[18px] sm:w-[18px]" strokeWidth={2.25} />
      </span>
      {phone && (
        <span className="whitespace-nowrap text-sm font-bold sm:text-base md:text-lg lg:text-xl">
          {phone}
        </span>
      )}
    </a>
  );
}

export default function Navbar23({ content }) {
  const navbar = content?.navbar ?? {};
  const { logo, phone, menu_items = [] } = navbar;
  const phoneCtaSubtitle = navbar.phone_cta_subtitle ?? "";
  const navTagline =
    typeof navbar.tagline === "string" && navbar.tagline.trim()
      ? navbar.tagline.trim()
      : undefined;
  const imagePath = navbar.imagePath ?? IMAGE_BASE;

  const logoOnDarkClass =
    "[&_a]:max-w-none [&_h2]:max-w-none [&_h2]:truncate-none [&_h2_span:first-child]:!text-[#D32F2F] [&_h2_span:last-child]:!text-white [&_h2]:!text-white";

  const menuItemsArray = useMemo(
    () => (Array.isArray(menu_items) ? menu_items : []),
    [menu_items],
  );

  const [isOpen, setIsOpen] = useState(false);
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
          scrollToSection(document.getElementById(id));
        }, 500);
      }
    },
    [router, scrollToSection],
  );

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  const phoneLink = phone ? `tel:${phone}` : "#";

  const navProps = {
    pathname,
    openDropdownRef,
    setOpenDropdownRef,
    getDropdownChildren,
    handleNavigation,
    closeMenu,
  };

  const topBar = (
    <FullContainer className="relative w-full bg-black">
      <Container className="flex min-h-[55px] w-full min-w-0 items-center justify-between gap-3 px-4 py-2 sm:min-h-[62px] sm:px-6 md:min-h-[70px] lg:px-8">
        <div className={cn("flex min-w-0 shrink items-center", logoOnDarkClass)}>
          <Logo
            logo={logo}
            imagePath={imagePath}
            splitBrandWords
            tagline={navTagline}
            taglineClassName="!text-white/90 text-[11px] sm:text-xs md:text-sm"
          />
        </div>

        <div className="hidden min-w-0 flex-1 items-center justify-end lg:flex">
          <CallBlock
            phone={phone}
            phoneCtaSubtitle={phoneCtaSubtitle}
            phoneLink={phoneLink}
          />
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:hidden">
          <CallBlock
            phone={phone}
            phoneCtaSubtitle={phoneCtaSubtitle}
            phoneLink={phoneLink}
            compact
          />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="h-7 w-7" strokeWidth={2} />
            ) : (
              <Menu className="h-7 w-7" strokeWidth={2} />
            )}
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "absolute left-0 right-0 top-full z-[60] w-full shadow-[0_8px_24px_rgba(0,0,0,0.25)] lg:hidden",
          isOpen ? "block" : "hidden",
        )}
        style={{ backgroundColor: NAV_RED }}
      >
        <nav
          className="flex max-h-[min(80vh,calc(100dvh-80px))] flex-col overflow-y-auto py-1"
          aria-label="Mobile navigation"
        >
          {menuItemsArray.map((item) => (
            <NavLink
              key={item.link ?? item.title}
              {...navProps}
              item={item}
              variant="mobile"
            />
          ))}
        </nav>
      </div>
    </FullContainer>
  );

  const navInnerClass = "mx-auto w-full max-w-[1270px] px-3 md:px-4";

  const navBar = (
    <div 
      className="hidden w-full lg:block"
      style={{ backgroundColor: NAV_RED }}
    >
      <Container className={navInnerClass}>
        <nav
          className="flex h-[48px] w-full items-center justify-center gap-6 md:h-[52px] md:gap-8 xl:gap-10"
          aria-label="Main navigation"
        >
          {menuItemsArray.map((item) => (
            <NavLink key={item.link ?? item.title} {...navProps} item={item} />
          ))}
        </nav>
      </Container>
    </div>
  );

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  return (
    <FullContainer
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 w-full overflow-visible shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
    >
      {topBar}
      {navBar}
    </FullContainer>
  );
}
