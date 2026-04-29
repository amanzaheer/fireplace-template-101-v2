"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import FullContainer from "../../common/FullContainer";
import Logo from "@/components/common/Logo";
import Container from "@/components/common/Container";
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

export default function Navbar11({ content }) {
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
  const handleHomeNavigation = useCallback(() => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    router.push("/");
  }, [pathname, router]);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  const phoneLink = phone ? `tel:${phone}` : "#";
  const phoneButtonClass =
    "flex items-center shadow-xl justify-center sm:justify-start gap-2 px-3 md:px-5 lg:px-6 py-1 md:py-1.5 lg:py-2.5 w-auto min-w-[170px]   absolute right-0  top-0 md:w-[446px] h-[40px] md:h-[87px] text-black hidden md:flex font-semibold hover:opacity-90 transition-all bg-[#3a8ffb]";
  const phoneCircleClass =
    "hidden sm:block w-[56px] h-[55px] rounded-full bg-white overflow-hidden shrink-0";
  const phoneTextClass = `${poppins.className} text-black text-lg md:text-2xl lg:text-4xl font-semibold`;

  const headerContent = (
    <div className="grid h-full min-h-[78px] w-full grid-cols-2 items-stretch md:min-h-[80px] ">
      <div className="h-full bg-black">
        <div className="flex h-full w-full items-center justify-center px-4 text-xl text-white md:justify-start md:pl-12 md:pr-6 lg:pl-16 lg:pr-8">
          <Logo logo={logo} imagePath={imagePath} />
        </div>
      </div>

      <div className="h-full min-w-0 bg-[#efa536]">
        <div className="flex h-full w-full min-w-0 items-center justify-end gap-2 px-2 md:px-4 lg:justify-center lg:gap-6">
        <div
          className={`${inter.className} hidden min-w-0 flex-1 items-center justify-center gap-6 text-sm font-normal lg:flex`}
        >
          {menuItemsArray.map((item) => {
            if (isDropdownItem(item)) {
              const children = getDropdownChildren(item);
              const dropdownKey = item.childrenRef ?? item.title;
              const isOpen = openDropdownRef === dropdownKey;
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
                      "flex items-center h-full gap-1 text-sm font-normal hover:font-bold",
                      isOpen ? "text-black" : "text-black ",
                    )}
                  >
                    {item.title}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div
                    className={cn(
                      "absolute top-full left-0 w-auto min-w-[300px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out flex flex-col",
                      isOpen
                        ? "opacity-100 visible transform translate-y-0"
                        : "opacity-0 invisible transform -translate-y-2",
                    )}
                  >
                    <div className="grow dropdown-services-container scrollbar-hide">
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
                              "text-sm font-normal py-1 px-4 cursor-pointer transition-all duration-100 block",
                              isActive
                                ? "bg-[#f59e0b] text-black"
                                : `text-black hover:bg-[#efa536] hover:text-black`,
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
            const isHomeLink = item.link === "/";
            const isActive = pathname === item.link;
            if (isHomeLink) {
              return (
                <button
                  key={item.link ?? item.title}
                  type="button"
                  onClick={handleHomeNavigation}
                  className={`${inter.className} relative inline-flex h-full items-center text-black text-[16px] font-normal leading-[100%] tracking-[0%] transition-all hover:font-semibold hover:text-black after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-8 after:h-[3px] after:bg-[#da4909] after:opacity-0 after:transition-opacity hover:after:opacity-100`}
                >
                  {item.title}
                </button>
              );
            }
            if (isLink) {
              return (
                <Link
                  key={item.link ?? item.title}
                  href={item.link}
                  className={`${inter.className} cursor-pointer text-black text-sm font-normal hover:font-bold transition-colors`}
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
                className={`${inter.className} cursor-pointer text-black text-sm font-normal hover:font-bold transition-colors`}
              >
                {item.title}
              </button>
            );
          })}
        </div>

        {/* Phone number bar removed (commented with its background). */}
        {/*
        <div className="flex flex-col gap-0.5 md:gap-1 justify-center items-center ">
          <div className="text-xs">
            <a href={phoneLink} className={phoneButtonClass}>
              <div className={phoneCircleClass} />
              <span className={phoneTextClass}>{phone}</span>
            </a>
          </div>
        </div>
        */}

        <div
          className="flex shrink-0 items-center lg:hidden"
          onClick={mounted ? toggleMenu : undefined}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            mounted && (e.key === "Enter" || e.key === " ") && toggleMenu()
          }
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <div className="cursor-pointer rounded-[3px] bg-black/10 p-0.5 pt-1.5 text-black">
            {isOpen ? <X className="h-6 w-7" /> : <Menu className="h-6 w-7" />}
          </div>
        </div>
      </div>
      </div>
    </div>
  );

  if (!mounted) {
    return (
      <FullContainer className="shadow-sm w-full sticky top-0 z-20 border-t-4 border-t-[#da4909] bg-white text-black py-2 h-[82px] md:h-[84px]">
        <Container>
          <div className="flex flex-row justify-between h-full  items-center w-full md:pr-8">
            <div className="h-full flex items-center justify-center">
              <Logo logo={logo} imagePath={imagePath} />
            </div>
            <div className="flex items-center justify-end flex-row">
              <div className="hidden md:flex flex-col gap-0.5 md:gap-1 justify-center items-center">
                <div className="text-xs">
                  <a
                    href={phoneLink}
                    className={phoneButtonClass}
                  >
                    <span className={phoneTextClass}>{phone}</span>
                  </a>
                </div>
                <h2 className={`${inter.className} text-[#c92028] font-bold text-xs md:text-sm leading-none`}>
                  Call Us Today
                </h2>
              </div>
              <div className="lg:hidden pl-5 text-[#da4909]">
              <div className="rounded-[3px] border border-[#da4909] bg-white p-0.5 pt-1.5">
                  <Menu className="w-7 h-6" />
                </div>
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
      className="sticky top-0 z-20 h-[82px] w-full bg-transparent py-0 shadow-sm md:h-[84px] "
    >
      {headerContent}

      <div
        className={cn(
          "absolute left-0 right-0 top-full w-full bg-black py-2 transition-all duration-300 lg:hidden",
          isOpen
            ? "h-fit opacity-100 visible"
            : "h-0 opacity-0 invisible overflow-hidden",
        )}
      >
        <div className={`flex flex-col font-semibold text-[18px] ${inter.className}`}>
          {menuItemsArray.map((item) => {
            if (isDropdownItem(item)) {
              const children = getDropdownChildren(item);
              const dropdownKey = item.childrenRef ?? item.title;
              const isDropdownOpen = openDropdownRef === dropdownKey;
              return (
                <div key={dropdownKey}>
                  <div
                    className={cn(
                      "flex cursor-pointer items-center justify-between px-4 py-2 transition-colors",
                      children.some((c) => pathname === getChildHref(c))
                        ? "bg-[#f59e0b] text-black"
                        : "bg-transparent text-white hover:bg-white/10",
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
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isDropdownOpen ? "rotate-180" : "rotate-0",
                      )}
                    />
                  </div>
                  <div
                    className={cn(
                      "overflow-hidden bg-white transition-all duration-300",
                      isDropdownOpen && children.length > 0
                        ? "max-h-[320px] opacity-100"
                        : "max-h-0 opacity-0",
                    )}
                  >
                    <div className="flex max-h-[320px] flex-col overflow-y-auto">
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
                              "block border-b border-black/10 px-4 py-2 pl-7 text-base",
                              isActive
                                ? "bg-[#f59e0b] text-black"
                                : "text-black hover:bg-[#efa536]/25",
                            )}
                            onClick={closeMenu}
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
            const isHomeLink = item.link === "/";
            const isActive = pathname === item.link;
            if (isHomeLink) {
              return (
                <button
                  key={item.link ?? item.title}
                  type="button"
                  className={cn(
                    "px-4 py-1 cursor-pointer text-left",
                    isActive
                      ? "bg-[#da4909] text-black"
                      : "text-black bg-transparent hover:text-[#da4909]",
                  )}
                  onClick={() => {
                    handleHomeNavigation();
                    closeMenu();
                  }}
                >
                  {item.title}
                </button>
              );
            }
            if (isLink) {
              return (
                <Link
                  key={item.link ?? item.title}
                  title={item.title}
                  href={item.link}
                  className={cn(
                    "px-4 py-1",
                    isActive
                      ? "bg-[#f59e0b] text-black"
                      : "bg-transparent text-white",
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
                  "cursor-pointer px-4 py-1 text-left",
                  pathname.includes(item.link)
                    ? "bg-[#f59e0b] text-black"
                    : "bg-transparent text-white",
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
    </FullContainer>
  );
}
