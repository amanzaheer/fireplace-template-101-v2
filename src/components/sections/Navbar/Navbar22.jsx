"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
      "w-[52.49px] text-[14.997px] leading-normal text-neutral-900 no-underline hover:font-bold",
    );
  }

  if (kind === "about") {
    return cn(
      inter.className,
      "flex shrink-0 cursor-pointer items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap",
      "h-[16.068px] w-[48.205px] text-[14.997px] leading-normal font-normal text-neutral-900",
      "transition-opacity hover:font-bold hover:opacity-95",
      activeMark,
    );
  }

  return cn(
    inter.className,
    "flex shrink-0 cursor-pointer items-center text-[14.997px] leading-normal font-normal text-neutral-900",
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

export default function Navbar22({ content }) {
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
  const callIconSrc = "/st-icons/Temp22/phone.png";

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
                    <ChevronDown className="h-4 w-4 shrink-0 text-neutral-900 opacity-90" />
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
                                : "text-neutral-900 hover:bg-[#f0520e] hover:text-white",
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

        <div className="flex items-center justify-end ">
          <div className="hidden md:flex">
            <a
              href={phoneLink}
              className="flex items-center gap-0"
              aria-label={phone ? `Call ${phone}` : "Phone"}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full "
                style={{ backgroundColor: ACCENT }}
              >
                <svg
                  width="54"
                  height="54"
                  viewBox="0 0 54 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M34.9659 23.7259C34.5407 23.3007 34.328 22.7743 34.328 22.1468C34.328 21.5193 34.5407 20.9937 34.9659 20.57C35.3911 20.1462 35.9167 19.9336 36.5427 19.9321C37.1687 19.9307 37.6951 20.1433 38.1218 20.57C38.5485 20.9967 38.7604 21.5223 38.7574 22.1468C38.7545 22.7714 38.5418 23.2977 38.1196 23.7259C37.6973 24.1541 37.1717 24.3659 36.5427 24.3615C35.9138 24.3571 35.3881 24.1445 34.9659 23.7237M31.006 18.9355L28.6806 16.6101C29.751 15.5397 30.9603 14.7188 32.3083 14.1474C33.6563 13.576 35.0677 13.2896 36.5427 13.2881C38.0177 13.2866 39.4299 13.573 40.7794 14.1474C42.1289 14.7217 43.3374 15.5426 44.4048 16.6101L42.0794 18.9355C41.3412 18.1973 40.5018 17.6252 39.5613 17.2191C38.6208 16.8131 37.6146 16.6101 36.5427 16.6101C35.4708 16.6101 34.4654 16.8131 33.5263 17.2191C32.5873 17.6252 31.7472 18.1973 31.006 18.9355ZM44.1834 46.5083C39.5695 46.5083 35.0109 45.5028 30.5077 43.4919C26.0045 41.481 21.9074 38.6292 18.2162 34.9366C14.5251 31.244 11.6741 27.1468 9.66314 22.6451C7.65221 18.1434 6.64601 13.5849 6.64453 8.96946C6.64453 8.30505 6.866 7.75138 7.30894 7.30845C7.75187 6.86551 8.30554 6.64404 8.96995 6.64404H17.9394C18.4562 6.64404 18.9176 6.81974 19.3236 7.17114C19.7296 7.52253 19.9695 7.93742 20.0434 8.41579L21.4829 16.1672C21.5567 16.7578 21.5383 17.2561 21.4275 17.6621C21.3168 18.0681 21.1138 18.4188 20.8185 18.7141L15.4479 24.14C16.1861 25.5057 17.0624 26.825 18.0767 28.0977C19.091 29.3704 20.208 30.598 21.4275 31.7807C22.5718 32.9249 23.7714 33.9865 25.0264 34.9654C26.2814 35.9443 27.6102 36.839 29.0128 37.6496L34.2173 32.4451C34.5495 32.1129 34.9836 31.8641 35.5195 31.6987C36.0555 31.5334 36.5811 31.4869 37.0964 31.5592L44.737 33.1095C45.2538 33.2571 45.6783 33.5251 46.0105 33.9134C46.3427 34.3017 46.5088 34.7351 46.5088 35.2134V44.1829C46.5088 44.8473 46.2873 45.401 45.8444 45.8439C45.4015 46.2868 44.8478 46.5083 44.1834 46.5083Z"
                    fill="#E55B20"
                  />
                </svg>
              </span>
              <div
                className={`${poppins.className} flex h-[29px] w-[179px] shrink-0 flex-col justify-end text-center  text-[#FFFFFF]`}
                style={{
                  fontSize: "20px",
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
    "relative w-full top-0 z-30 bg-transparent py-2 h-[82px] md:h-[112px]";

  if (!mounted) {
    return (
      <FullContainer className={headerShellClass}>
        <Container>
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
            <div className="flex items-center justify-end">
              <div className="hidden md:flex">
                <a href={phoneLink} className="flex items-center gap-1.5">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: ACCENT }}
                  >
                    <svg
                      width="54"
                      height="54"
                      viewBox="0 0 54 54"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M34.9659 23.7259C34.5407 23.3007 34.328 22.7743 34.328 22.1468C34.328 21.5193 34.5407 20.9937 34.9659 20.57C35.3911 20.1462 35.9167 19.9336 36.5427 19.9321C37.1687 19.9307 37.6951 20.1433 38.1218 20.57C38.5485 20.9967 38.7604 21.5223 38.7574 22.1468C38.7545 22.7714 38.5418 23.2977 38.1196 23.7259C37.6973 24.1541 37.1717 24.3659 36.5427 24.3615C35.9138 24.3571 35.3881 24.1445 34.9659 23.7237M31.006 18.9355L28.6806 16.6101C29.751 15.5397 30.9603 14.7188 32.3083 14.1474C33.6563 13.576 35.0677 13.2896 36.5427 13.2881C38.0177 13.2866 39.4299 13.573 40.7794 14.1474C42.1289 14.7217 43.3374 15.5426 44.4048 16.6101L42.0794 18.9355C41.3412 18.1973 40.5018 17.6252 39.5613 17.2191C38.6208 16.8131 37.6146 16.6101 36.5427 16.6101C35.4708 16.6101 34.4654 16.8131 33.5263 17.2191C32.5873 17.6252 31.7472 18.1973 31.006 18.9355ZM44.1834 46.5083C39.5695 46.5083 35.0109 45.5028 30.5077 43.4919C26.0045 41.481 21.9074 38.6292 18.2162 34.9366C14.5251 31.244 11.6741 27.1468 9.66314 22.6451C7.65221 18.1434 6.64601 13.5849 6.64453 8.96946C6.64453 8.30505 6.866 7.75138 7.30894 7.30845C7.75187 6.86551 8.30554 6.64404 8.96995 6.64404H17.9394C18.4562 6.64404 18.9176 6.81974 19.3236 7.17114C19.7296 7.52253 19.9695 7.93742 20.0434 8.41579L21.4829 16.1672C21.5567 16.7578 21.5383 17.2561 21.4275 17.6621C21.3168 18.0681 21.1138 18.4188 20.8185 18.7141L15.4479 24.14C16.1861 25.5057 17.0624 26.825 18.0767 28.0977C19.091 29.3704 20.208 30.598 21.4275 31.7807C22.5718 32.9249 23.7714 33.9865 25.0264 34.9654C26.2814 35.9443 27.6102 36.839 29.0128 37.6496L34.2173 32.4451C34.5495 32.1129 34.9836 31.8641 35.5195 31.6987C36.0555 31.5334 36.5811 31.4869 37.0964 31.5592L44.737 33.1095C45.2538 33.2571 45.6783 33.5251 46.0105 33.9134C46.3427 34.3017 46.5088 34.7351 46.5088 35.2134V44.1829C46.5088 44.8473 46.2873 45.401 45.8444 45.8439C45.4015 46.2868 44.8478 46.5083 44.1834 46.5083Z"
                        fill="#E55B20"
                      />
                    </svg>
                  </span>
                  <div
                    className={`${poppins.className} flex ml-2 text-[20px] font-bold shrink-0 flex-col justify-end text-center  text-[#FFFFFF]`}
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
        <a
          href={phoneLink}
          className="mt-1 flex items-center gap-3.5 px-8 py-8"
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: ACCENT }}
          >
            <svg
              width="54"
              height="54"
              viewBox="0 0 54 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.9659 23.7259C34.5407 23.3007 34.328 22.7743 34.328 22.1468C34.328 21.5193 34.5407 20.9937 34.9659 20.57C35.3911 20.1462 35.9167 19.9336 36.5427 19.9321C37.1687 19.9307 37.6951 20.1433 38.1218 20.57C38.5485 20.9967 38.7604 21.5223 38.7574 22.1468C38.7545 22.7714 38.5418 23.2977 38.1196 23.7259C37.6973 24.1541 37.1717 24.3659 36.5427 24.3615C35.9138 24.3571 35.3881 24.1445 34.9659 23.7237M31.006 18.9355L28.6806 16.6101C29.751 15.5397 30.9603 14.7188 32.3083 14.1474C33.6563 13.576 35.0677 13.2896 36.5427 13.2881C38.0177 13.2866 39.4299 13.573 40.7794 14.1474C42.1289 14.7217 43.3374 15.5426 44.4048 16.6101L42.0794 18.9355C41.3412 18.1973 40.5018 17.6252 39.5613 17.2191C38.6208 16.8131 37.6146 16.6101 36.5427 16.6101C35.4708 16.6101 34.4654 16.8131 33.5263 17.2191C32.5873 17.6252 31.7472 18.1973 31.006 18.9355ZM44.1834 46.5083C39.5695 46.5083 35.0109 45.5028 30.5077 43.4919C26.0045 41.481 21.9074 38.6292 18.2162 34.9366C14.5251 31.244 11.6741 27.1468 9.66314 22.6451C7.65221 18.1434 6.64601 13.5849 6.64453 8.96946C6.64453 8.30505 6.866 7.75138 7.30894 7.30845C7.75187 6.86551 8.30554 6.64404 8.96995 6.64404H17.9394C18.4562 6.64404 18.9176 6.81974 19.3236 7.17114C19.7296 7.52253 19.9695 7.93742 20.0434 8.41579L21.4829 16.1672C21.5567 16.7578 21.5383 17.2561 21.4275 17.6621C21.3168 18.0681 21.1138 18.4188 20.8185 18.7141L15.4479 24.14C16.1861 25.5057 17.0624 26.825 18.0767 28.0977C19.091 29.3704 20.208 30.598 21.4275 31.7807C22.5718 32.9249 23.7714 33.9865 25.0264 34.9654C26.2814 35.9443 27.6102 36.839 29.0128 37.6496L34.2173 32.4451C34.5495 32.1129 34.9836 31.8641 35.5195 31.6987C36.0555 31.5334 36.5811 31.4869 37.0964 31.5592L44.737 33.1095C45.2538 33.2571 45.6783 33.5251 46.0105 33.9134C46.3427 34.3017 46.5088 34.7351 46.5088 35.2134V44.1829C46.5088 44.8473 46.2873 45.401 45.8444 45.8439C45.4015 46.2868 44.8478 46.5083 44.1834 46.5083Z"
                fill="#E55B20"
              />
            </svg>
          </span>
          <span className="font-bold text-neutral-900">{phone}</span>
        </a>
      </div>
    </FullContainer>
  );
}
