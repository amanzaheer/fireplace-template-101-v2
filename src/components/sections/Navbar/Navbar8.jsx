"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Phone, ChevronDown, Menu, X } from "lucide-react";
import Container from "../../common/Container";
import Logo from "@/components/common/Logo";
import { cn, sanitizeUrl } from "@/lib/utils";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { FullContainer } from "@/components/common";

const SCROLL_OFFSET = 80;
const NAV_SCROLL_SOLID_THRESHOLD = 8;

function getDocumentScrollY() {
  if (typeof window === "undefined") return 0;
  const se = document.scrollingElement ?? document.documentElement;
  return (
    window.scrollY ??
    window.pageYOffset ??
    se?.scrollTop ??
    document.documentElement?.scrollTop ??
    document.body?.scrollTop ??
    0
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
  const [isScrolled, setIsScrolled] = useState(false);

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

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setIsScrolled(getDocumentScrollY() > NAV_SCROLL_SOLID_THRESHOLD);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);
  const navBarClass = cn(
    "fixed top-0 left-0 right-0 z-50 flex w-full flex-col items-stretch h-[76px]",
    "transition-[background-color,box-shadow,color,border-color] duration-300 border-b",
    isScrolled
      ? "bg-white shadow-sm text-black border-black/10"
      : "bg-transparent text-white border-white/20",
  );

  const navLinkIdle = isScrolled
    ? "text-black hover:text-[#FF6611]"
    : "text-white hover:text-white/90";
  const navLinkActiveOpen = "text-[#FF6611]";
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
//this is adjustment for header//
  const headerContent = (
    <div className="h-full">
      <div className="flex h-[76px] w-full items-center justify-between gap-3">
        <div className="h-full flex items-center shrink-0">
          <div className="h-[76px] bg-[#FF6611] px-4 lg:px-6 flex items-center justify-between [clip-path:polygon(0_0,92%_0,100%_50%,92%_100%,0_100%)]">
            <Logo logo={logo} imagePath={imagePath} />
          </div>
        </div>
        <div className="hidden lg:flex flex-1 items-center justify-center text-[20px] xl:text-[22px] font-barlow font-semibold gap-2.5 xl:gap-4">
          {menuItemsArray.map((item) => {
            if (isDropdownItem(item)) {
              const children = getDropdownChildren(item);
              const dropdownKey = item.childrenRef ?? item.title;
              const isDropdownOpen = openDropdownRef === dropdownKey;
              return (
                <div
                  key={dropdownKey}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setOpenDropdownRef(dropdownKey)}
                  onMouseLeave={() => setOpenDropdownRef(null)}
                >
                  <button
                    type="button"
                    className={cn(
                      "flex items-center h-full gap-1 transition-colors",
                      isDropdownOpen ? navLinkActiveOpen : navLinkIdle,
                    )}
                  >
                    {item.title}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div
                    className={cn(
                      "absolute top-full left-0 w-auto min-w-[200px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.35)] transition-all duration-300 ease-in-out flex flex-col",
                      isDropdownOpen
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
                              "text-xl py-1 font-semibold px-4 cursor-pointer transition-all duration-100 block",
                              isActive
                                ? "bg-[#FF6611] text-white"
                                : "text-black hover:bg-[#FF6611] hover:text-white",
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
            if (isLink) {
              return (
                <Link
                  key={item.link ?? item.title}
                  href={item.link}
                  className={cn("cursor-pointer transition-colors", navLinkIdle)}
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
                className={cn("cursor-pointer transition-colors", navLinkIdle)}
              >
                {item.title}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-end shrink-0">
          <a
            href={phoneLink}
            className="hidden md:flex h-[54px] lg:h-[58px] items-center gap-2.5 px-4 lg:px-5 bg-[#FF6611] text-white font-semibold [clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)]"
          >
            <span className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-white" />
            </span>
            <span className="leading-none text-[24px] lg:text-[28px]">{phone}</span>
          </a>

          <div
            className={cn(
              "lg:hidden pl-3 cursor-pointer transition-colors",
              isScrolled ? "text-black" : "text-white",
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
            <div className="rounded-[3px] p-0.5 bg-[#FF6611] text-white">
              {isOpen ? (
                <X className="w-7 h-6" />
              ) : (
                <Menu className="w-7 h-6" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!mounted) {
    return (
      <header id="navbar" className={navBarClass}>
        <FullContainer>
          <Container className="h-full">
            <div className="h-full flex items-center justify-between">
              <div className="h-full bg-[#FF6611] px-4 lg:px-6 flex items-center justify-center [clip-path:polygon(0_0,92%_0,100%_50%,92%_100%,0_100%)]">
                <Logo logo={logo} imagePath={imagePath} />
              </div>
              <div className="flex items-center justify-end flex-row">
                <a
                  href={phoneLink}
                  className="hidden md:flex h-[54px] items-center gap-2.5 px-4 bg-[#FF6611] text-white font-semibold [clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)]"
                >
                  <span className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </span>
                  <span className="leading-none text-[24px]">{phone}</span>
                </a>
                <div
                  className={cn(
                    "lg:hidden pl-3 transition-colors",
                    isScrolled ? "text-black" : "text-white",
                  )}
                >
                  <div className="rounded-[3px] p-0.5 bg-[#FF6611] text-white">
                    <Menu className="w-7 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </FullContainer>
      </header>
    );
  }

  return (
    <header id="navbar" className={navBarClass}>
      <FullContainer>
        <Container className="h-full">{headerContent}</Container>

        <div
          className={cn(
            "lg:hidden py-2 bg-white border-t border-black/5 sticky left-0 right-0 w-full transition-all duration-300",
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
                        "px-4 py-1 flex items-center cursor-pointer",
                        children.some((c) => pathname === getChildHref(c))
                          ? "bg-[#FF6611] text-white"
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
                      <ChevronDown className="w-4 h-4" />
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
                                  ? "bg-[#FF6611] text-white"
                                  : "text-black hover:text-[#FF6611]",
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
                        ? "bg-[#FF6611] text-white"
                        : "text-black bg-transparent",
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
                      ? "bg-[#FF6611] text-white"
                      : "text-black bg-transparent",
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
    </header>
  );
}
