"use client";
import { useState, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
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
const ACCENT = "";

const PHONE_ICON_CLASS = "h-[41px] w-[41px] shrink-0";
const PHONE_TEXT_CLASS = cn(
  poppins.className,
  "flex h-[41px] w-[179px] shrink-0 items-center justify-center text-center text-[20px] font-bold leading-none text-white",
);

function PhoneIcon() {
  return (
    <svg
      className={PHONE_ICON_CLASS}
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M38.0098 10.3753C37.4898 8.44909 36.4739 6.69283 35.0634 5.28168C33.6529 3.87053 31.8972 2.85379 29.9712 2.33284M31.5842 12.1101C31.3676 11.3074 30.9443 10.5754 30.3565 9.98734C29.7688 9.39924 29.0371 8.97552 28.2345 8.75845M38.0441 38.4479C30.8157 38.4479 24.0858 36.3269 18.4382 32.6728C14.1319 29.8858 10.4645 26.2184 7.67746 21.9121C3.89617 16.0732 1.89006 9.2626 1.9024 2.30621H14.7955L17.0629 12.5248L13.2128 16.3748C15.7648 20.8657 19.4827 24.5836 23.9736 27.1355L27.8236 23.2836L38.0441 25.5567V38.4479Z"
        stroke="#FF2828"
        strokeWidth="3.80439"
        strokeLinecap="square"
      />
    </svg>
  );
}

function PhoneCallButton({ phone, phoneLink, className }) {
  return (
    <a
      href={phoneLink}
      className={cn(
        "inline-flex shrink-0 items-center gap-2",
        className,
      )}
      aria-label={phone ? `Call ${phone}` : "Phone"}
    >
      <PhoneIcon />
      <span className={PHONE_TEXT_CLASS}>
        <span className="block w-full truncate">{phone}</span>
      </span>
    </a>
  );
}

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
      inter.className,
      "flex shrink-0 cursor-pointer items-center justify-center text-center font-bold",
      "w-[52.49px] text-[14.997px] leading-normal text-white no-underline hover:font-bold",
    );
  }

  if (kind === "about") {
    return cn(
      inter.className,
      "flex shrink-0 cursor-pointer items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap",
      "h-[16.068px] w-[48.205px] text-[14.997px] leading-normal font-normal text-white",
      "transition-opacity hover:font-bold hover:opacity-95",
      activeMark,
    );
  }

  return cn(
    inter.className,
    "flex shrink-0 cursor-pointer items-center text-[14.997px] leading-normal font-normal text-white",
    "transition-opacity hover:font-bold hover:opacity-95",
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

export default function Navbar18({ content }) {
  const { logo, phone, menu_items = [] } = content?.navbar ?? {};
  const imagePath = content?.navbar?.imagePath ?? IMAGE_BASE;
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
          <div className="text-white">
            <Logo
              logo={logo}
              imagePath={imagePath}
              textLogoClassName={NAVBAR9_LOGO_TEXT_CLASS}
              textLogoStyle={NAVBAR9_LOGO_TEXT_STYLE}
            />
          </div>
        </div>

        <div className="hidden items-center justify-center gap-6 rounded-full  px-6 py-3 lg:flex xl:gap-10">
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
                    <ChevronDown className="h-4 w-4 shrink-0 text-white opacity-90" />
                  </button>
                  <div
                    className={cn(
                      "absolute left-0 top-full flex w-auto min-w-[280px] flex-col bg-white shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-all duration-300 ease-in-out",
                      open
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 opacity-0",
                    )}
                  >
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
                              "block cursor-pointer px-4 py-2.5 text-base font-semibold  transition-colors duration-100",
                              isActive
                                ? "bg-neutral-900 text-white"
                                : "text-neutral-900 hover:bg-[#FF0011] hover:text-white",
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
            <PhoneCallButton phone={phone} phoneLink={phoneLink} />
          </div>

          <div
            className="cursor-pointer pl-4 text-white lg:hidden"
            onClick={toggleMenu}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && toggleMenu()
            }
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span
              className="inline-flex rounded-md p-1.5"
              style={{ backgroundColor: ACCENT }}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );

  const headerShellClass =
    "relative w-full top-0 z-30 bg-transparent py-2 h-[82px] md:h-[112px]";

  return (
    <FullContainer
      id="navbar"
      className={cn(headerShellClass, "sticky top-0 z-30")}
    >
      <Container>{headerContent}</Container>
      <div
        className={cn(
          "absolute left-0 right-0  top-full w-full bg-white py-2 shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-all duration-300 lg:hidden",
          isOpen
            ? "visible h-fit opacity-100"
            : "invisible h-0 overflow-hidden opacity-0",
        )}
      >
        <div
          className={cn(
            inter.className,
            "flex flex-col text-[17px] font-semibold",
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
                          pathname === href || pathname === (child?.path ?? "");
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
        <div className="px-8 py-8">
          <PhoneCallButton phone={phone} phoneLink={phoneLink} />
        </div>
      </div>
    </FullContainer>
  );
}
