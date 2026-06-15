"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import Container from "../../common/Container";
import FullContainer from "../../common/FullContainer";
import Logo from "@/components/common/Logo";
import { cn, sanitizeUrl } from "@/lib/utils";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";

const SCROLL_OFFSET = 118;
const NAV_RED = "#000000";
const ALIGN_BAR = "#C9C9C9";
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

function CallPhoneIcon({ className }) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M28.3213 17.0818C27.8961 16.6566 27.6835 16.1303 27.6835 15.5028C27.6835 14.8753 27.8961 14.3497 28.3213 13.9259C28.7466 13.5022 29.2722 13.2896 29.8982 13.2881C30.5242 13.2866 31.0506 13.4992 31.4773 13.9259C31.904 14.3526 32.1158 14.8782 32.1129 15.5028C32.1099 16.1273 31.8973 16.6537 31.475 17.0818C31.0528 17.51 30.5272 17.7219 29.8982 17.7174C29.2692 17.713 28.7436 17.5004 28.3213 17.0796M24.3615 12.2915L22.0361 9.96607C23.1065 8.89564 24.3157 8.07473 25.6637 7.50334C27.0117 6.93195 28.4232 6.64552 29.8982 6.64404C31.3732 6.64257 32.7854 6.929 34.1349 7.50334C35.4844 8.07768 36.6928 8.89859 37.7603 9.96607L35.4349 12.2915C34.6967 11.5533 33.8573 10.9811 32.9168 10.5751C31.9763 10.1691 30.9701 9.96607 29.8982 9.96607C28.8263 9.96607 27.8208 10.1691 26.8818 10.5751C25.9428 10.9811 25.1027 11.5533 24.3615 12.2915ZM37.5388 39.8643C32.9249 39.8643 28.3664 38.8588 23.8632 36.8479C19.36 34.8369 15.2628 31.9852 11.5717 28.2926C7.88057 24.5999 5.02954 20.5028 3.01861 16.0011C1.00768 11.4994 0.00147645 6.94081 0 2.32542C0 1.66101 0.221468 1.10734 0.664404 0.664404C1.10734 0.221468 1.66101 0 2.32542 0H11.2949C11.8116 0 12.273 0.175698 12.6791 0.527094C13.0851 0.87849 13.325 1.29337 13.3988 1.77174L14.8384 9.52313C14.9122 10.1137 14.8937 10.612 14.783 11.018C14.6723 11.4241 14.4692 11.7747 14.174 12.07L8.80336 17.496C9.54158 18.8617 10.4179 20.1809 11.4322 21.4536C12.4465 22.7263 13.5634 23.954 14.783 25.1366C15.9272 26.2809 17.1269 27.3425 18.3819 28.3213C19.6368 29.3002 20.9656 30.195 22.3683 31.0055L27.5728 25.801C27.905 25.4688 28.3391 25.2201 28.875 25.0547C29.411 24.8893 29.9366 24.8428 30.4519 24.9152L38.0925 26.4654C38.6093 26.6131 39.0338 26.8811 39.366 27.2694C39.6982 27.6577 39.8643 28.091 39.8643 28.5694V37.5388C39.8643 38.2033 39.6428 38.7569 39.1999 39.1999C38.7569 39.6428 38.2033 39.8643 37.5388 39.8643Z"
        fill="#D90209"
      />
    </svg>
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
        <CallPhoneIcon className="h-5 w-5 sm:h-[22px] sm:w-[22px] md:h-6 md:w-6" />
      </span>
      {phone && (
        <span className="whitespace-nowrap text-sm font-bold sm:text-base md:text-lg lg:text-xl">
          {phone}
        </span>
      )}
    </a>
  );
}

export default function Navbar26({ content }) {
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
    <FullContainer
      className="relative w-full border-b bg-black"
      style={{ borderColor: ALIGN_BAR }}
    >
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
