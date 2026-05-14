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
import { Inter, Koulen, Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const koulen = Koulen({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const NAVBAR9_LOGO_TEXT_CLASS = cn(
  koulen.className,
  "flex shrink-0 items-center self-stretch text-[#FFFFFF]",
);

const NAVBAR9_LOGO_TEXT_STYLE = {
  color: "#FFFFFF",
  fontSize: "43.7px",
  fontStyle: "normal",
  fontWeight: 400,
  height: "43.78px",
  lineHeight: "42.115px",
};

const SCROLL_OFFSET = 80;
const ACCENT = "#F0A535";

function normalizeNavLabel(str) {
  return String(str ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getNavItemKind(item) {
  const t = normalizeNavLabel(item?.title);
  const link = String(item?.link ?? "");
  if (link === "/" || t === "home") return "home";
  if (t === "about us" || t === "about") return "about";
  if (t === "contact us" || t === "contact") return "contact";
  if (
    t.includes("location") ||
    t === "faqs" ||
    t === "faq" ||
    t.startsWith("faq")
  )
    return "locationsFaqs";
  return "inter";
}

function desktopNavItemClassName(item, active) {
  const kind = getNavItemKind(item);
  const activeMark = active
    ? "underline decoration-1 underline-offset-[5px]"
    : "";

  if (kind === "home") {
    return cn(
      poppins.className,
      "flex shrink-0 items-center justify-center text-center font-bold",
      "w-[52.49px] text-[14.997px] leading-normal text-[#FFFFFF] no-underline",
    );
  }

  if (kind === "about") {
    return cn(
      inter.className,
      "flex shrink-0 items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap",
      "h-[16.068px] w-[48.205px] text-[14.997px] leading-normal font-normal text-[#FFFFFF]",
      "transition-opacity hover:opacity-95",
      activeMark,
    );
  }

  return cn(
    inter.className,
    "flex shrink-0 items-center text-[14.997px] leading-normal font-normal text-[#FFFFFF]",
    "transition-opacity hover:opacity-95",
    activeMark,
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

export default function Navbar24({ content }) {
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

  const headerContent = (
    <>
      <div className="flex h-full w-full items-center justify-between md:pr-8">
        <div className="flex h-full items-center justify-center">
          <div className="text-white [&_a]:text-white [&_a_h2]:text-white [&_a_span]:text-white">
            <Logo
              logo={logo}
              imagePath={imagePath}
              textLogoClassName={NAVBAR9_LOGO_TEXT_CLASS}
              textLogoStyle={NAVBAR9_LOGO_TEXT_STYLE}
            />
          </div>
        </div>

        <div className="hidden items-center justify-center gap-6 lg:flex xl:gap-8">
          {menuItemsArray.map((item) => {
            if (isDropdownItem(item)) {
              const children = getDropdownChildren(item);
              const dropdownKey = item.childrenRef ?? item.title;
              const open = openDropdownRef === dropdownKey;
              return (
                <div
                  key={dropdownKey}
                  className="relative h-full"
                  onMouseEnter={() => setOpenDropdownRef(dropdownKey)}
                  onMouseLeave={() => setOpenDropdownRef(null)}
                >
                  <button
                    type="button"
                    className={cn(
                      "flex h-full items-center gap-1",
                      desktopNavItemClassName(
                        item,
                        open ||
                          children.some((c) => pathname === getChildHref(c)),
                      ),
                    )}
                  >
                    {item.title}
                    <ChevronDown className="h-4 w-4 shrink-0 text-[#FFFFFF] opacity-90" />
                  </button>
                  <div
                    className={cn(
                      "absolute left-0 top-full flex w-auto min-w-[280px] flex-col bg-white shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-all duration-300 ease-in-out",
                      open
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 opacity-0",
                    )}
                  >
                    <div className="dropdown-services-container scrollbar-hide max-h-[min(70vh,360px)] flex-grow overflow-y-auto">
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
                              "block cursor-pointer px-4 py-2.5 text-base font-semibold transition-colors duration-100",
                              isActive
                                ? "bg-neutral-900 text-white"
                                : "text-neutral-900 hover:bg-neutral-100",
                            )}
                          >
                            {child?.title}
                          </Link>
                        );
                      })}
                    </div>
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
                  className={desktopNavItemClassName(item, isActive)}
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
                className={desktopNavItemClassName(
                  item,
                  pathname.includes(String(item.link)),
                )}
              >
                {item.title}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-end">
          <div className="hidden md:flex">
            <a
              href={phoneLink}
              className="flex items-center gap-1.5"
              aria-label={phone ? `Call ${phone}` : "Phone"}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-md"
                style={{ backgroundColor: ACCENT }}
              >
                <Phone className="h-[18px] w-[18px] text-white" strokeWidth={2.25} />
              </span>
              <div
                className={`${poppins.className} flex h-[29px] w-[179px] shrink-0 flex-col justify-end text-center text-[#FFFFFF]`}
                style={{
                  fontSize: "18.42px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "normal",
                }}
              >
                <span className="block min-w-0 w-full truncate">{phone}</span>
              </div>
            </a>
          </div>

          <div
            className="cursor-pointer pl-4 text-white lg:hidden"
            onClick={mounted ? toggleMenu : undefined}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              mounted && (e.key === "Enter" || e.key === " ") && toggleMenu()
            }
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span
              className="inline-flex rounded-md p-1.5"
              style={{ backgroundColor: ACCENT }}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-neutral-900" />
              ) : (
                <Menu className="h-6 w-6 text-neutral-900" />
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );

  const headerShellClass =
    "relative w-full sticky top-0 z-30 bg-gradient-to-r from-[#3F269A] via-[#3d4cab] to-[#2B6CB0] py-2 h-[82px] md:h-[112px]";

  if (!mounted) {
    return (
      <FullContainer className={headerShellClass}>
        <Container>
          <div className="flex h-full w-full items-center justify-between md:pr-8">
            <div className="flex h-full items-center justify-center">
              <div className="text-white [&_a]:text-white [&_a_h2]:text-white [&_a_span]:text-white">
                <Logo
              logo={logo}
              imagePath={imagePath}
              textLogoClassName={NAVBAR9_LOGO_TEXT_CLASS}
              textLogoStyle={NAVBAR9_LOGO_TEXT_STYLE}
            />
              </div>
            </div>
            <div className="flex items-center justify-end">
              <div className="hidden md:flex">
                <a href={phoneLink} className="flex items-center gap-1.5">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: ACCENT }}
                  >
                    <Phone className="h-[18px] w-[18px] text-white" />
                  </span>
                  <div
                    className={`${poppins.className} flex h-[29px] w-[179px] shrink-0 flex-col justify-end text-center text-[#FFFFFF]`}
                    style={{
                      fontSize: "18.42px",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "normal",
                    }}
                  >
                    <span className="block min-w-0 w-full truncate">
                      {phone}
                    </span>
                  </div>
                </a>
              </div>
              <div className="pl-4 lg:hidden">
                <span
                  className="inline-flex rounded-md p-1.5"
                  style={{ backgroundColor: ACCENT }}
                >
                  <Menu className="h-6 w-6 text-neutral-900" />
                </span>
              </div>
            </div>
          </div>
        </Container>
      </FullContainer>
    );
  }

  return (
    <FullContainer id="navbar" className={headerShellClass}>
      <Container>{headerContent}</Container>

      <div
        className={cn(
          "absolute left-0 right-0 top-full w-full bg-white py-2 shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-all duration-300 lg:hidden",
          isOpen
            ? "visible h-fit opacity-100"
            : "invisible h-0 overflow-hidden opacity-0",
        )}
      >
        <div className="flex flex-col font-barlow text-[17px] font-semibold">
          {menuItemsArray.map((item) => {
            if (isDropdownItem(item)) {
              const children = getDropdownChildren(item);
              const dropdownKey = item.childrenRef ?? item.title;
              const isDropdownOpen = openDropdownRef === dropdownKey;
              return (
                <div key={dropdownKey}>
                  <div
                    className={cn(
                      "flex cursor-pointer items-center px-4 py-2",
                      children.some((c) => pathname === getChildHref(c))
                        ? "bg-neutral-900 text-white"
                        : "bg-transparent text-neutral-900",
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
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </div>
                  {isDropdownOpen && children.length > 0 && (
                    <div className="flex max-h-[280px] flex-col gap-1 overflow-y-auto bg-neutral-50 py-2">
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
                              "px-4 py-2 pl-8 text-base",
                              isActive
                                ? "font-bold text-neutral-900"
                                : "text-neutral-700 hover:text-neutral-900",
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
            const isActive = pathname === item.link;
            if (isLink) {
              return (
                <Link
                  key={item.link ?? item.title}
                  title={item.title}
                  href={item.link}
                  className={cn(
                    "px-4 py-2",
                    isActive
                      ? "bg-neutral-900 text-white"
                      : "bg-transparent text-neutral-900",
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
                  "w-full cursor-pointer px-4 py-2 text-left",
                  pathname.includes(item.link)
                    ? "bg-neutral-900 text-white"
                    : "bg-transparent text-neutral-900",
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
        <a
          href={phoneLink}
          className="mt-1 flex items-center gap-3.5 px-8 py-8"
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: ACCENT }}
          >
            <Phone className="h-[18px] w-[18px] text-white" />
          </span>
          <span className="font-bold text-neutral-900">{phone}</span>
        </a>
      </div>
    </FullContainer>
  );
}
