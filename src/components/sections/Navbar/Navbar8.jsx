"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Poppins, Inter } from "next/font/google";
import { Phone, ChevronDown, Menu, X } from "lucide-react";
import Container from "../../common/Container";
import FullContainer from "../../common/FullContainer";
import Logo from "@/components/common/Logo";
import { cn, sanitizeUrl } from "@/lib/utils";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import Image from "next/image";

const poppinsNav = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const interNav = Inter({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const SCROLL_OFFSET = 80;

/** Roomy line-height + vertical padding so labels (e.g. Services) are not clipped at the top. */
const NAV_LABEL_SM =
  "text-[14px] not-italic leading-[1.45] text-white py-2";

function isHomeNavItem(item) {
  const link = item?.link;
  if (link === "/" || link === "") return true;
  return String(item?.title ?? "").trim().toLowerCase() === "home";
}

function navTopLevelFontClass(item) {
  return isHomeNavItem(item) ? poppinsNav.className : interNav.className;
}

function navTopLevelWeightClass(item) {
  return isHomeNavItem(item) ? "font-bold" : "font-normal";
}

/** Matches Banner8 hero background (navy gradient + orange accents). */
function NavbarBannerBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-r from-[#061f4a] via-[#072a62] to-[#072b5f]" />
    </div>
  );
}

function NavbarPhoneCta({ href, phone, callLabel = "Call Us Today", className }) {
  return (
    <a
      href={href}
      className={cn(
        poppinsNav.className,
        "flex max-w-full items-center gap-2 rounded-none bg-transparent md:bg-[#fe5e00] px-4 md:px-6  text-white transition-opacity hover:opacity-90",
        className,
      )}
    >
      <span className="flex h-[22px] w-[22px] md:h-[55px] md:w-[55px] shrink-0 items-center justify-center self-center rounded-full bg-white sm:h-[26px] sm:w-[26px]">
        <Phone className="h-3 w-3 text-[#ff6600] sm:h-3.5 sm:w-3.5" strokeWidth={2.25} aria-hidden />
      </span>
      <span className="flex min-w-0 flex-1 flex-col items-start justify-center gap-0.5">
        {/* <span className="font-barlow text-[10px] font-bold uppercase leading-none tracking-wide text-white sm:text-xs">
          {callLabel}
        </span> */}
        <span
          className="w-full truncate text-left text-[14px] font-bold md:text-[27px]"
          style={{ color: "#FFF" }}
        >
          {phone}
        </span>
      </span>
    </a>
  );
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

export default function Navbar8({ content }) {
  const { logo, phone, menu_items = [] } = content?.navbar ?? {};
  const imagePath = content?.navbar?.imagePath ?? IMAGE_BASE;
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

  const phoneLink = phone ? `tel:${phone}` : "#";
  const callUsTodayLabel =
    content?.navbar?.call_us_today ?? "Call Us Today";

  const headerContent = (
      <div className="flex w-full min-h-[48px] flex-row items-center justify-between gap-2 md:min-h-[56px]">
      
        <div className="flex h-full min-w-0 max-w-[min(100%,52%)]  shrink items-center justify-start overflow-hidden pl-2 sm:pl-3 md:pl-4 lg:pl-5 sm:max-w-[min(100%,48%)] lg:max-w-[min(100%,380px)]">
          <Logo logo={logo} imagePath={imagePath} useKoulenNavTypography className="text-white!"/>
        </div>

        <div className={` ${interNav.className} hidden items-center text-[14px] font-normal justify-center gap-2 overflow-visible lg:flex lg:gap-16`}>
          {menuItemsArray.map((item) => {
            if (isDropdownItem(item)) {
              const children = getDropdownChildren(item);
              const dropdownKey = item.childrenRef ?? item.title;
              const isOpen = openDropdownRef === dropdownKey;
              return (
                <div
                  key={dropdownKey}
                  className="relative flex items-center overflow-visible"
                  onMouseEnter={() => setOpenDropdownRef(dropdownKey)}
                  onMouseLeave={() => setOpenDropdownRef(null)}
                >
                  <button
                    type="button"
                    className={cn(
                      navTopLevelFontClass(item),
                      navTopLevelWeightClass(item),
                      NAV_LABEL_SM,
                      "inline-flex items-center gap-1 transition-colors",
                      isOpen
                        ? "text-[#ff9a40]"
                        : "text-white hover:text-[#ff9a40]",
                    )}
                  >
                    {item.title}
                    <ChevronDown className="h-4 w-4 shrink-0 self-center" />
                  </button>
                  <div
                    className={cn(
                      "absolute left-0 top-full z-[110] flex max-h-[min(70vh,420px)] w-auto min-w-[300px] flex-col overflow-y-auto overflow-x-hidden border border-white/15 bg-[#061f4a] py-1 shadow-[0_12px_28px_rgba(0,0,0,0.45)] transition-all duration-300 ease-in-out dropdown-services-container scrollbar-hide",
                      isOpen
                        ? "visible translate-y-0 transform opacity-100"
                        : "invisible -translate-y-2 transform opacity-0 pointer-events-none",
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
                              interNav.className,
                              "block cursor-pointer px-4 py-2.5 text-left text-[14px] font-normal not-italic leading-snug transition-all duration-100",
                              isActive
                                ? "bg-[#ff4800] text-white"
                                : "text-white/95 hover:bg-[#ff4800] hover:text-white",
                            )}
                            style={{ color: "#FFF" }}
                          >
                            {child?.title}
                          </Link>
                        );
                      })}
                  </div>
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
                    navTopLevelFontClass(item),
                    navTopLevelWeightClass(item),
                    NAV_LABEL_SM,
                    "cursor-pointer text-white transition-colors hover:text-[#ff9a40]",
                  )}
                >
                  {item.title}
                </Link>
              );
            }
            return (
              <button
                key={item.link ?? item.title}
                type="button"
                onClick={() => handleNavigation(item.link)}
                className={cn(
                  navTopLevelFontClass(item),
                  navTopLevelWeightClass(item),
                  NAV_LABEL_SM,
                  "cursor-pointer text-white transition-colors hover:text-[#ff9a40]",
                )}
              >
                {item.title}
              </button>
            );
          })}
        </div>

        <div className="h-2 w-20 md:w-40 lg:w-55 ">

        </div>

        
      </div>
  );

  if (!mounted) {
    return (
      <FullContainer
      id="navbar"
      className="fixed top-0 z-20 flex h-[60px] w-full flex-row items-center justify-center overflow-visible bg-[#00142c]  shadow-sm md:h-[90px]"
    >
      <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src="/st-icons/Temp8/navbar.png"
            alt="Logo"
            height={1000}
            width={1000}
            className="w-auto h-full"
          />
        </div>
      <Container className="relative z-10 flex min-h-0 w-full flex-1 items-center">

      <div className="flex h-full min-w-0 max-w-[min(100%,52%)]  shrink items-center justify-start overflow-hidden pl-2 sm:pl-3 md:pl-4 lg:pl-5 sm:max-w-[min(100%,48%)] lg:max-w-[min(100%,380px)]">
          <Logo logo={logo} imagePath={imagePath} useKoulenNavTypography className="text-white!"/>
        </div>
      </Container>

     
      <div className="pointer-events-auto absolute right-0 top-0 z-[110] flex h-full flex-row items-center justify-end bg-transparent md:bg-[#fe5e00]">
          <div className="flex max-w-[min(100%,260px)] items-center sm:max-w-none">
            <NavbarPhoneCta
              href={phoneLink}
              phone={phone}
              callLabel={callUsTodayLabel}
              className="w-full sm:w-auto"
            />
          </div>

          <div
            className="flex cursor-pointer items-center justify-center rounded-[3px] bg-[#00142c] p-2 text-white md:bg-[#fe5e00] lg:hidden"
            onClick={mounted ? toggleMenu : undefined}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              mounted && (e.key === "Enter" || e.key === " ") && toggleMenu()
            }
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
              {isOpen ? (
                <X className="w-7 h-6" />
              ) : (
                <Menu className="w-7 h-6" />
              )}
          </div>
        </div>

    </FullContainer>
    );
  }

  return (
    <FullContainer
      id="navbar"
      className="fixed top-0 z-20 flex h-[60px] w-full flex-row items-center justify-center overflow-visible bg-[#00142c] py-2 shadow-sm md:h-[90px]"
    >
        <div className="absolute top-0 left-0 w-full h-full ">
          <Image
            src="/st-icons/Temp8/navbar.png"
            alt="Logo"
            height={1000}
            width={1000}
            className=" w-auto h-full"
          />
        </div>
      <Container className="relative z-10 flex min-h-0 w-full flex-1 items-center ">
        {headerContent}
      </Container>

      <div
        className={cn(
          interNav.className,
          "absolute left-0 right-0 top-full z-[100] flex w-full flex-col border-t border-white/10 bg-[#061f4a] py-2 shadow-[0_12px_28px_rgba(0,0,0,0.45)] transition-[max-height,opacity] duration-300 ease-in-out lg:hidden",
          isOpen
            ? "max-h-[min(85vh,800px)] overflow-y-auto opacity-100 visible"
            : "max-h-0 overflow-hidden opacity-0 invisible pointer-events-none",
        )}
      >
          {menuItemsArray.map((item) => {
            if (isDropdownItem(item)) {
              const children = getDropdownChildren(item);
              const dropdownKey = item.childrenRef ?? item.title;
              const isDropdownOpen = openDropdownRef === dropdownKey;
              return (
                <div key={dropdownKey}>
                  <div
                    className={cn(
                      navTopLevelFontClass(item),
                      navTopLevelWeightClass(item),
                      NAV_LABEL_SM,
                      "flex cursor-pointer items-center px-4",
                      children.some((c) => pathname === getChildHref(c))
                        ? "bg-[#ff4800] text-white"
                        : "bg-transparent text-white/95 hover:bg-white/10",
                    )}
                    style={{ color: "#FFF" }}
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
                    <ChevronDown className="h-4 w-4 shrink-0" />
                  </div>
                  {isDropdownOpen && children.length > 0 && (
                    <div className="mt-2 flex max-h-[300px] flex-col gap-2 overflow-y-auto">
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
                              interNav.className,
                              "px-4 py-1 pl-7 text-[14px] font-normal not-italic leading-normal",
                              isActive
                                ? "bg-[#ff4800] text-white"
                                : "text-white/90 hover:bg-white/10 hover:text-white",
                            )}
                            style={{ color: "#FFF" }}
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
            const isActive = pathname === item.link;
            if (isLink) {
              return (
                <Link
                  key={item.link ?? item.title}
                  title={item.title}
                  href={item.link}
                  className={cn(
                    navTopLevelFontClass(item),
                    navTopLevelWeightClass(item),
                    NAV_LABEL_SM,
                    "px-4",
                    isActive
                      ? "bg-[#ff4800] text-white"
                      : "bg-transparent text-white/95 hover:bg-white/10",
                  )}
                  style={{ color: "#FFF" }}
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
                  navTopLevelFontClass(item),
                  navTopLevelWeightClass(item),
                  NAV_LABEL_SM,
                  "cursor-pointer px-4 text-left",
                  pathname.includes(item.link)
                    ? "bg-[#ff4800] text-white"
                    : "bg-transparent text-white/95 hover:bg-white/10",
                )}
                style={{ color: "#FFF" }}
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
      <div className="pointer-events-auto absolute right-0 top-0 z-[110] flex h-full flex-row items-center justify-end bg-transparent md:bg-[#fe5e00]">
          <div className="flex max-w-[min(100%,260px)] items-center sm:max-w-none">
            <NavbarPhoneCta
              href={phoneLink}
              phone={phone}
              callLabel={callUsTodayLabel}
              className="w-full sm:w-auto"
            />
          </div>
          <div
            className="flex cursor-pointer items-center justify-center rounded-[3px] bg-[#00142c] p-2 text-white md:bg-[#fe5e00] lg:hidden"
            onClick={toggleMenu}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && toggleMenu()
            }
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
              {isOpen ? (
                <X className="w-7 h-6" />
              ) : (
                <Menu className="w-7 h-6" />
              )}
          </div>
        </div>
    </FullContainer>
  );
}
