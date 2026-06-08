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
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const SCROLL_OFFSET = 80;

function PhoneIcon({ className }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-10 w-10 shrink-0", className)}
      aria-hidden
    >
      <path
        d="M28.3213 17.0818C27.8961 16.6566 27.6835 16.1303 27.6835 15.5028C27.6835 14.8753 27.8961 14.3497 28.3213 13.9259C28.7466 13.5022 29.2722 13.2896 29.8982 13.2881C30.5242 13.2866 31.0506 13.4992 31.4773 13.9259C31.904 14.3526 32.1158 14.8782 32.1129 15.5028C32.1099 16.1273 31.8973 16.6537 31.475 17.0818C31.0528 17.51 30.5272 17.7219 29.8982 17.7174C29.2692 17.713 28.7436 17.5004 28.3213 17.0796M24.3615 12.2915L22.0361 9.96607C23.1065 8.89564 24.3157 8.07473 25.6637 7.50334C27.0117 6.93195 28.4232 6.64552 29.8982 6.64404C31.3732 6.64257 32.7854 6.929 34.1349 7.50334C35.4844 8.07768 36.6928 8.89859 37.7603 9.96607L35.4349 12.2915C34.6967 11.5533 33.8573 10.9811 32.9168 10.5751C31.9763 10.1691 30.9701 9.96607 29.8982 9.96607C28.8263 9.96607 27.8208 10.1691 26.8818 10.5751C25.9428 10.9811 25.1027 11.5533 24.3615 12.2915ZM37.5388 39.8643C32.9249 39.8643 28.3664 38.8588 23.8632 36.8479C19.36 34.8369 15.2628 31.9852 11.5717 28.2926C7.88057 24.5999 5.02954 20.5028 3.01861 16.0011C1.00768 11.4994 0.00147645 6.94081 0 2.32542C0 1.66101 0.221468 1.10734 0.664404 0.664404C1.10734 0.221468 1.66101 0 2.32542 0H11.2949C11.8116 0 12.273 0.175698 12.6791 0.527094C13.0851 0.87849 13.325 1.29337 13.3988 1.77174L14.8384 9.52313C14.9122 10.1137 14.8937 10.612 14.783 11.018C14.6723 11.4241 14.4692 11.7747 14.174 12.07L8.80336 17.496C9.54158 18.8617 10.4179 20.1809 11.4322 21.4536C12.4465 22.7263 13.5634 23.954 14.783 25.1366C15.9272 26.2809 17.1269 27.3425 18.3819 28.3213C19.6368 29.3002 20.9656 30.195 22.3683 31.0055L27.5728 25.801C27.905 25.4688 28.3391 25.2201 28.875 25.0547C29.411 24.8893 29.9366 24.8428 30.4519 24.9152L38.0925 26.4654C38.6093 26.6131 39.0338 26.8811 39.366 27.2694C39.6982 27.6577 39.8643 28.091 39.8643 28.5694V37.5388C39.8643 38.2033 39.6428 38.7569 39.1999 39.1999C38.7569 39.6428 38.2033 39.8643 37.5388 39.8643Z"
        fill="#CC3333"
      />
    </svg>
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

function PhoneRow({ phone, phoneLink, className }) {
  if (!phone) return null;

  return (
    <a
      href={phoneLink}
      className={cn(
        "inline-flex items-center gap-2.5 text-black transition-opacity hover:opacity-80",
        className,
      )}
      aria-label={`Call ${phone}`}
    >
      <PhoneIcon />
      <span
        className={cn(
          poppins.className,
          "text-[16px] font-bold leading-none text-black md:text-[22px]",
        )}
      >
        {phone}
      </span>
    </a>
  );
}

export default function Navbar27({ content }) {
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

  const renderMenuItem = (item, { mobile = false } = {}) => {
    const linkClass = cn(
      poppins.className,
      "uppercase tracking-normal transition-colors",
      mobile
        ? "px-4 py-2 text-left text-base font-medium leading-none"
        : "text-center text-base font-medium leading-none text-black hover:text-[#C1272D]",
    );

    if (isDropdownItem(item)) {
      const children = getDropdownChildren(item);
      const dropdownKey = item.childrenRef ?? item.title;
      const isDropdownOpen = openDropdownRef === dropdownKey;

      if (mobile) {
        return (
          <div key={dropdownKey}>
            <div
              className={cn(
                linkClass,
                "flex cursor-pointer items-center gap-1",
                children.some((c) => pathname === getChildHref(c))
                  ? "bg-[#C1272D] text-white"
                  : "text-black",
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
              <ChevronDown className="h-4 w-4" />
            </div>
            {isDropdownOpen && children.length > 0 && (
              <div className="mt-1 flex max-h-[300px] flex-col gap-1 overflow-y-auto">
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
                        "py-1 pl-7 pr-4 text-base",
                        isActive
                          ? "bg-[#C1272D] text-white"
                          : "text-black hover:text-[#C1272D]",
                      )}
                      onClick={closeMenu}
                    >
                      {child.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      }

      return (
        <div
          key={dropdownKey}
          className="relative"
          onMouseEnter={() => setOpenDropdownRef(dropdownKey)}
          onMouseLeave={() => setOpenDropdownRef(null)}
        >
          <button
            type="button"
            className={cn(
              linkClass,
              "flex items-center gap-1",
              isDropdownOpen ? "text-[#C1272D]" : "text-black",
            )}
          >
            {item.title}
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <div
            className={cn(
              "absolute left-0 top-full z-30 flex min-w-[280px] flex-col bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all duration-300",
              isDropdownOpen
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-2 opacity-0",
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
                    "block px-4 py-2 text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-[#C1272D] text-white"
                      : "text-black hover:bg-[#C1272D] hover:text-white",
                  )}
                >
                  {child.title}
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
            linkClass,
            mobile && isActive && "bg-[#C1272D] text-white",
          )}
          onClick={mobile ? closeMenu : undefined}
        >
          {item.title}
        </Link>
      );
    }

    return (
      <button
        key={item.link ?? item.title}
        type="button"
        onClick={() => {
          handleNavigation(item.link);
          if (mobile) closeMenu();
        }}
        className={cn(
          linkClass,
          mobile && pathname.includes(item.link) && "bg-[#C1272D] text-white",
        )}
      >
        {item.title}
      </button>
    );
  };

  const headerContent = (
    <div className="flex h-full w-full items-center justify-between gap-4">
      <div className="flex shrink-0 items-center">
        <Logo logo={logo} imagePath={imagePath} />
      </div>

      <div className="hidden flex-1 flex-col items-end justify-center gap-2 lg:flex">
        <nav className={cn(poppins.className, "flex flex-wrap items-center justify-end gap-x-5 gap-y-1 xl:gap-x-7")}>
          {menuItemsArray.map((item) => renderMenuItem(item))}
        </nav>
        <PhoneRow phone={phone} phoneLink={phoneLink} />
      </div>
      <div className="flex items-center gap-3 lg:hidden">
        <PhoneRow phone={phone} phoneLink={phoneLink} className="md:hidden" />
        <button
          type="button"
          className="rounded bg-[#C1272D] p-1.5 text-white"
          onClick={mounted ? toggleMenu : undefined}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );

  if (!mounted) {
    return (
      <FullContainer className="sticky top-0 z-20 h-[82px] w-full bg-white py-3 shadow-sm md:h-[112px] md:py-4">
        <Container>
          <div className="flex h-full w-full items-center justify-between gap-4">
            <Logo logo={logo} imagePath={imagePath} />
            <div className="hidden flex-col items-end gap-2 lg:flex">
              <div className="h-4 w-64 rounded bg-gray-100" />
              <div className="h-6 w-40 rounded bg-gray-100" />
            </div>
            <div className="rounded bg-[#C1272D] p-1.5 text-white lg:hidden">
              <Menu className="h-6 w-6" />
            </div>
          </div>
        </Container>
      </FullContainer>
    );
  }
  return (
    <FullContainer
      id="navbar"
      className="sticky top-0 z-20 h-[82px] w-full bg-white py-3 shadow-sm md:h-[112px] md:py-4"
    >
      <Container>{headerContent}</Container>
      <div
        className={cn(
          "absolute left-0 right-0 top-full w-full bg-white py-2 transition-all duration-300 lg:hidden",
          isOpen
            ? "visible h-fit opacity-100"
            : "invisible h-0 overflow-hidden opacity-0",
        )}
      >
        <div className="flex flex-col border-t border-gray-100">
          {menuItemsArray.map((item) => renderMenuItem(item, { mobile: true }))}
          <div className="hidden border-t border-gray-100 px-4 py-3 md:block">
            <PhoneRow phone={phone} phoneLink={phoneLink} />
          </div>
        </div>
      </div>
    </FullContainer>
  );
}
