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

export default function Navbar3({ content }) {
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

  return (
    <FullContainer id="navbar" className="w-full sticky top-0 z-30 bg-white shadow-sm">
      <Container className="px-0!">
        <div className="h-[86px] md:h-[92px] flex items-center">
          <div className="w-full flex items-center justify-between px-4 md:px-6 lg:px-8">
            <div className="flex items-center">
              <Logo logo={logo} imagePath={imagePath} />
            </div>

            <a
              href="#quote-form-section"
              className="hidden md:inline-flex items-center justify-center rounded-full bg-[#1b1d22] text-[#e6a32c] text-base lg:text-lg font-extrabold uppercase px-6 lg:px-10 py-3 hover:bg-[#111217] transition-colors duration-200"
            >
              Schedule Appointment
            </a>

            <div className="hidden md:flex flex-col items-start">
              <a
                href={phoneLink}
                className="inline-flex items-center gap-2 text-[#e0a03a] text-3xl font-extrabold leading-none"
              >
                <Phone className="w-6 h-6" />
                {phone || "(888)-249-0566"}
              </a>
            </div>

            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-[#1d1d1d]"
              onClick={mounted ? toggleMenu : undefined}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </Container>

      <FullContainer className="w-full bg-[#e6a93b]  border-t border-[#d79a2c]">
        <Container className="px-0!  ">
          <div className="hidden md:flex items-center justify-center gap-6 lg:gap-20 h-[42px] px-4">
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
                        "inline-flex items-center gap-1 text-2xl font-thin text-[#1f1f1f] hover:text-black",
                        isDropdownOpen && "text-black",
                      )}
                    >
                      {item.title}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div
                      className={cn(
                        "absolute top-full left-0 min-w-[250px] bg-white shadow-lg border border-[#ececec] transition-all duration-200",
                        isDropdownOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-1",
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
                              "block px-4 py-2 text-base font-medium text-[#202020] hover:bg-[#f7f7f7]",
                              isActive && "bg-[#1b1d22] text-white hover:bg-[#1b1d22]",
                            )}
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
                      "text-2xl font-thin text-[#1f1f1f] hover:text-black",
                      isActive && "text-black",
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
                  className="text-2xl font-thin text-[#1f1f1f] hover:text-black"
                >
                  {item.title}
                </button>
              );
            })}
          </div>
        </Container>
      </FullContainer>

      <div
        className={cn(
          "md:hidden bg-white border-t border-[#efefef] transition-all duration-200",
          isOpen
            ? "max-h-[70vh] opacity-100 visible"
            : "max-h-0 opacity-0 invisible overflow-hidden",
        )}
      >
        <div className="flex flex-col py-2">
          <a
            href={phoneLink}
            className="mx-4 mb-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#1b1d22] text-[#e6a32c] font-bold py-2.5"
            onClick={closeMenu}
          >
            <Phone className="w-4 h-4" />
            {phone || "(888)-249-0566"}
          </a>
          {menuItemsArray.map((item) => {
            if (isDropdownItem(item)) {
              const children = getDropdownChildren(item);
              const dropdownKey = item.childrenRef ?? item.title;
              const isDropdownOpen = openDropdownRef === dropdownKey;
              return (
                <div key={dropdownKey}>
                  <div
                    className={cn(
                      "px-4 py-2 flex items-center justify-between cursor-pointer text-[#202020] font-semibold",
                      children.some((c) => pathname === getChildHref(c))
                        ? "bg-[#f3f3f3]"
                        : "bg-transparent",
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
                    <span>{item.title}</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  {isDropdownOpen && children.length > 0 && (
                    <div className="flex flex-col max-h-[300px] overflow-y-auto pb-1">
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
                              "py-1.5 pl-7 px-4 text-base text-[#202020]",
                              isActive
                                ? "bg-[#1b1d22] text-white"
                                : "hover:bg-[#f5f5f5]",
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
                    "px-4 py-2 text-[#202020] font-semibold",
                    isActive
                      ? "bg-[#1b1d22] text-white"
                      : "bg-transparent",
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
                  "px-4 py-2 cursor-pointer text-left text-[#202020] font-semibold",
                  pathname.includes(item.link)
                    ? "bg-[#1b1d22] text-white"
                    : "bg-transparent",
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
