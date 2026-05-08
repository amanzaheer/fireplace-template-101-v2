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

export default function Navbar19({ content }) {
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
  const hasPhone = typeof phone === "string" && phone.trim().length > 0;

  const topHeaderContent = (
    <Container>
      <div className="flex items-center justify-between gap-4 py-5">
        <div className="flex items-center justify-center">
          <Logo logo={logo} imagePath={imagePath} />
        </div>

        <div className="hidden md:flex flex-1 justify-end">
          {hasPhone && (
            <a
              href={phoneLink}
              className="text-right font-barlow font-semibold leading-tight text-[32px] text-black whitespace-pre-line"
            >
             <h1 className="text-[32px] font-normal text-center leading-tight font-roboto">Free phone</h1>

              {phone}
            </a>
          )}
        </div>

        <div
          className="md:hidden text-white  border  pl-3 cursor-pointer"
          onClick={mounted ? toggleMenu : undefined}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            mounted && (e.key === "Enter" || e.key === " ") && toggleMenu()
          }
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <div className="pt-1.5 rounded-[3px] p-0.5 bg-[#cc3333]">
            {isOpen ? <X className="w-7 h-6" /> : <Menu className="w-7 h-6" />}
          </div>
        </div>
      </div>
    </Container>
  );

  const desktopMenuBar = (
    <div className="hidden md:flex bg-[#cc3333] h-[62px] items-center justify-center w-full">
      <div className="flex items-center justify-center gap-10 font-barlow font-semibold uppercase tracking-wide text-[18px] text-white">
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
                    "flex items-center h-full gap-1 py-3 transition-colors",
                    isOpen ? "text-black" : "text-white hover:text-black",
                  )}
                >
                  {item.title}
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div
                  className={cn(
                    "absolute top-full left-0 z-30 w-auto min-w-[280px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.35)] transition-all duration-300 ease-in-out flex flex-col",
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
                            "text-base py-2 px-4 cursor-pointer transition-all duration-100 block normal-case",
                            isActive
                              ? "bg-[#cc3333] text-white"
                              : "text-black hover:bg-[#cc3333] hover:text-white",
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
                className="py-3 transition-colors hover:text-black"
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
              className="py-3 transition-colors hover:text-black"
            >
              {item.title}
            </button>
          );
        })}
      </div>
    </div>
  );

  if (!mounted) {
    return (
      <FullContainer className="shadow-sm bg-white w-full sticky top-0 z-20">
        {topHeaderContent}
        {desktopMenuBar}
      </FullContainer>
    );
  }

  return (
    <FullContainer
      id="navbar"
      className="shadow-sm bg-white w-full sticky top-0 z-20"
    >
      {topHeaderContent}
      {desktopMenuBar}

      <div
        className={cn(
          "md:hidden py-2 bg-white absolute  top-full left-0 right-0 w-full transition-all duration-300 border-t",
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
                        ? "bg-[#cc3333] text-white"
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
                                ? "bg-[#cc3333] text-white"
                                : "text-black hover:text-[#cc3333]",
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
                      ? "bg-[#cc3333] text-white"
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
                    ? "bg-[#cc3333] text-white"
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
  );
}
