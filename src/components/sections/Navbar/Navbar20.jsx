"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { Phone, ChevronDown, Menu, X } from "lucide-react";
import Container from "../../common/Container";
import FullContainer from "../../common/FullContainer";
import Logo from "@/components/common/Logo";
import { cn, sanitizeUrl } from "@/lib/utils";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";

const SCROLL_OFFSET = 80;

const navMenuTypography = Poppins({
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal"],
  display: "swap",
});

/** Top-level + drawer menu labels — color #000; 16px; semibold (600); line-height normal */
const navMenuLinkClassName = cn(
  navMenuTypography.className,
  "text-center text-[16px] font-semibold not-italic leading-normal text-black",
);

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

export default function Navbar20({ content }) {
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
      <div className="flex h-full w-full flex-row items-center justify-between sm:pr-2 md:pr-8">
        <div className="h-full flex items-center justify-center">
          <Logo logo={logo} imagePath={imagePath} />
        </div>

        <div className="hidden items-center justify-center gap-6 lg:flex">
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
                      navMenuLinkClassName,
                      "flex h-full flex-nowrap items-center justify-center gap-1",
                      isOpen ? "text-[#002B5B]" : "text-black",
                    )}
                  >
                    {item.title}
                    <ChevronDown className="size-4 shrink-0 opacity-70" />
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
                              navMenuLinkClassName,
                              "block cursor-pointer px-4 py-1 text-[16px] font-semibold text-left transition-all duration-100",
                              isActive
                                ? "bg-[#BF1309] text-white"
                                : `text-black hover:bg-primary hover:text-white`,
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
                    navMenuLinkClassName,
                    "cursor-pointer hover:text-[#002B5B] transition-colors",
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
                  navMenuLinkClassName,
                  "cursor-pointer hover:text-[#002B5B] transition-colors",
                )}
              >
                {item.title}
              </button>
            );
          })}
        </div>

        <div className="flex flex-row items-center justify-end">
          <div className="flex flex-col items-center justify-center gap-1 md:gap-2">
            <div className="text-xs">
              <a
                href={phoneLink}
                className="flex items-center justify-center gap-1.5 rounded-full bg-[#BF1309] px-3 py-2 text-xs font-semibold text-white shadow transition-all hover:opacity-90 sm:justify-start sm:gap-2 sm:px-4 sm:text-sm lg:px-6 lg:py-3 lg:text-lg"
              >
                <Phone className="h-3.5 w-3.5 lg:h-5 lg:w-5" />
                {phone}
              </a>
            </div>
            <h2 className="hidden font-barlow font-bold leading-none text-primary md:block md:text-[25px] lg:text-lg">
              Call Us Today
            </h2>
          </div>

          <div
            className="cursor-pointer pl-3 text-white sm:pl-4 lg:hidden"
            onClick={mounted ? toggleMenu : undefined}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              mounted && (e.key === "Enter" || e.key === " ") && toggleMenu()
            }
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="rounded-[3px] bg-primary p-0.5 pt-1.5">
              {isOpen ? (
                <X className="h-6 w-7" />
              ) : (
                <Menu className="h-6 w-7" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (!mounted) {
    return (
      <>
        <FullContainer className="fixed top-0 z-50 h-[82px] w-full bg-white py-2 shadow-sm md:h-[112px]">
          <Container>
            <div className="flex h-full w-full flex-row items-center justify-between sm:pr-2 md:pr-8">
              <div className="flex h-full items-center justify-center">
                <Logo logo={logo} imagePath={imagePath} />
              </div>
              <div className="flex flex-row items-center justify-end">
                <div className="hidden flex-col items-center justify-center gap-1 md:flex md:gap-2">
                  <div className="text-xs">
                    <a
                      href={phoneLink}
                      className="flex items-center justify-center gap-2 rounded-full bg-[#BF1309] px-6 py-3 text-lg font-semibold text-white shadow transition-all hover:opacity-90 sm:justify-start"
                    >
                      <Phone className="h-5 w-5" />
                      {phone}
                    </a>
                  </div>
                  <h2 className="font-barlow font-bold leading-none text-primary md:text-[25px] lg:text-lg">
                    Call Us Today
                  </h2>
                </div>
                <div className="pl-3 text-white sm:pl-4 lg:hidden">
                  <div className="rounded-[3px] bg-primary p-0.5 pt-1.5">
                    <Menu className="h-6 w-7" />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </FullContainer>
        <div className="h-[82px] md:h-[112px]" aria-hidden="true" />
      </>
    );
  }

  return (
    <>
      <FullContainer
        id="navbar"
        className="fixed top-0 z-50 h-[82px] w-full bg-white py-2 shadow-sm md:h-[112px]"
      >
        <Container>{headerContent}</Container>

        <div
          className={cn(
            "absolute left-0 right-0 top-full w-full bg-white py-2 transition-all duration-300 lg:hidden",
            isOpen
              ? "visible h-fit max-h-[calc(100vh-82px)] overflow-y-auto opacity-100"
              : "h-0 opacity-0 invisible overflow-hidden",
          )}
        >
          <div className={cn(navMenuTypography.className, "flex flex-col")}>
            {menuItemsArray.map((item) => {
              if (isDropdownItem(item)) {
                const children = getDropdownChildren(item);
                const dropdownKey = item.childrenRef ?? item.title;
                const isDropdownOpen = openDropdownRef === dropdownKey;
                return (
                  <div key={dropdownKey}>
                    <div
                      className={cn(
                        navMenuLinkClassName,
                        "cursor-pointer px-4 py-2 text-center md:py-1 flex items-center justify-center gap-1",
                        children.some((c) => pathname === getChildHref(c))
                          ? "bg-primary text-white"
                          : "bg-transparent text-black",
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
                                navMenuLinkClassName,
                                "block py-2 pl-7 pr-4 text-left text-[16px]",
                                isActive
                                  ? "bg-primary text-white"
                                  : "text-black hover:text-primary",
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
                      navMenuLinkClassName,
                      "px-4 py-2 md:py-1",
                      isActive
                        ? "bg-primary text-white"
                        : "bg-transparent text-black",
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
                    navMenuLinkClassName,
                    "w-full cursor-pointer px-4 py-2 text-center md:py-1",
                    pathname.includes(item.link)
                      ? "bg-primary text-white"
                      : "bg-transparent text-black",
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
      <div className="h-[82px] md:h-[112px]" aria-hidden="true" />
    </>
  );
}
