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

const SCROLL_OFFSET = 80;

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

export default function Navbar5({ content }) {
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
      <div className="flex flex-row items-center h-full w-full md:pr-4 lg:pr-8 gap-2">
        <div className="h-full flex items-center justify-start shrink-0">
          <Logo logo={logo} imagePath={imagePath} />
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-center gap-6 xl:gap-8 font-barlow font-bold text-sm xl:text-[15px] text-black">
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
                      "flex items-center h-full gap-1 transition-colors",
                      isOpen ? "text-primary" : "text-black hover:text-primary/90",
                    )}
                  >
                    {item.title}
                    <ChevronDown
                      className="w-4 h-4 shrink-0"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  </button>
                  <div
                    className={cn(
                      "absolute top-full left-0 w-auto min-w-[300px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out flex flex-col",
                      isOpen
                        ? "opacity-100 visible transform translate-y-0"
                        : "opacity-0 invisible transform -translate-y-2",
                    )}
                  >
                    <div className="flex-grow dropdown-services-container scrollbar-hide">
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
                              "text-sm py-2 font-semibold px-4 cursor-pointer transition-all duration-100 block",
                              isActive
                                ? "bg-[#F97316] text-white"
                                : `text-black hover:bg-[#F97316] hover:text-white`,
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
                  className={cn(
                    "cursor-pointer transition-colors",
                    isActive
                      ? "bg-[#F97316] text-white px-4 py-2"
                      : "text-black hover:bg-[#F97316] hover:text-white px-4 py-2",
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
                  "cursor-pointer transition-colors px-4 py-2",
                  isActive
                    ? "bg-[#F97316] text-white"
                    : "text-black hover:bg-[#F97316] hover:text-white",
                )}
              >
                {item.title}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-end flex-row gap-3 shrink-0 ml-auto">
          {/* CALL NOW Button */}
          <a
            href={phoneLink}
            className="hidden lg:flex flex-col justify-center items-stretch text-center bg-[#F97316] text-white px-6 py-3 min-w-[168px] rounded-none shadow-none"
          >
            <span className="text-[10px] xl:text-[11px] font-bold leading-none uppercase tracking-wide">
              CALL NOW:
            </span>
            <span className="text-base xl:text-lg font-extrabold leading-snug">
              {phone}
            </span>
          </a>

          <div
            className="lg:hidden cursor-pointer pl-2"
            onClick={mounted ? toggleMenu : undefined}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              mounted && (e.key === "Enter" || e.key === " ") && toggleMenu()
            }
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="shrink-0 bg-[#F97316] p-2.5 flex items-center justify-center rounded-none">
              {isOpen ? (
                <X
                  className="w-5 h-5 text-white"
                  strokeWidth={2.5}
                  aria-hidden
                />
              ) : (
                <Menu
                  className="w-5 h-5 text-white"
                  strokeWidth={2.5}
                  aria-hidden
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (!mounted) {
    return (
      <FullContainer className="shadow-sm border-b border-gray-100 w-full sticky top-0 z-20 bg-white py-2.5 h-[82px] md:h-[92px]">
        <Container>
          <div className="flex flex-row items-center h-full w-full md:pr-4 lg:pr-8">
            <div className="h-full flex items-center justify-start shrink-0">
              <Logo logo={logo} imagePath={imagePath} />
            </div>
            <div className="flex-1" />
            <div className="flex items-center justify-end flex-row shrink-0">
              <a
                href={phoneLink}
                className="hidden md:flex flex-col justify-center items-center bg-[#F97316] text-white px-5 py-2.5 rounded-none"
              >
                <span className="text-[10px] font-bold leading-tight uppercase">
                  CALL NOW:
                </span>
                <span className="text-base font-extrabold leading-tight">
                  {phone}
                </span>
              </a>
              <div className="lg:hidden pl-2">
                <div className="shrink-0 bg-[#F97316] p-2.5 flex items-center justify-center rounded-none">
                  <Menu
                    className="w-5 h-5 text-white"
                    strokeWidth={2.5}
                    aria-hidden
                  />
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
      className="shadow-sm border-b border-gray-100 w-full sticky top-0 z-20 bg-white py-2.5 h-[82px] md:h-[92px]"
    >
      <Container>{headerContent}</Container>

      <div
        className={cn(
          "lg:hidden py-2 bg-white absolute top-[75px] left-0 right-0 w-full transition-all duration-300",
          isOpen
            ? "h-fit opacity-100 visible"
            : "h-0 opacity-0 invisible overflow-hidden",
        )}
      >
        <div className="flex flex-col font-barlow font-semibold text-[18px]">
          {menuItemsArray.map((item) => {
            if (isDropdownItem(item)) {
              const children = getDropdownChildren(item);
              const dropdownKey = item.childrenRef ?? item.title;
              const isDropdownOpen = openDropdownRef === dropdownKey;
              return (
                <div key={dropdownKey}>
                  <div
                    className={cn(
                      "px-4 py-1 flex items-center gap-1 cursor-pointer",
                      children.some((c) => pathname === getChildHref(c))
                        ? "bg-[#F97316] text-white"
                        : "text-black bg-transparent",
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
                      className="w-4 h-4 shrink-0"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  </div>
                  {isDropdownOpen && children.length > 0 && (
                    <div className="mt-2 flex flex-col max-h-[300px] overflow-y-auto gap-2">
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
                              "py-1 pl-7 px-4 text-lg",
                              isActive
                                ? "bg-[#F97316] text-white"
                                : "text-black hover:bg-[#F97316] hover:text-white",
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
                    "px-4 py-1",
                    isActive
                      ? "bg-[#F97316] text-white"
                      : "text-black hover:bg-[#F97316] hover:text-white",
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
                  "px-4 py-1 cursor-pointer text-left",
                  pathname.includes(item.link)
                    ? "bg-[#F97316] text-white"
                    : "text-black bg-transparent hover:bg-[#F97316] hover:text-white",
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