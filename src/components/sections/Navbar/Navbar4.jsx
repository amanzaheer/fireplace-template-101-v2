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
import { Poppins } from "next/font/google";

const SCROLL_OFFSET = 80;
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

export default function Navbar4({ content }) {
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
  const desktopTopBar = (
    <div className="hidden lg:flex w-full h-[40px] bg-[#f59402] border-y border-[#de970f]">
      <Container className="relative h-full flex items-center lg:pr-0">
  
        {/* LEFT: Rating — aligns with Logo */}
        <div
          className="flex items-center gap-1.5 ml-80 text-[17px] font-bold text-[#141414] leading-none"
          style={{ minWidth: "220px" }}
        >
          <span
            className={poppins.className}
            style={{
              color: "#000",
              fontSize: "16.595px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
            }}
          >
            4.8
          </span>
          <span className="tracking-[1px] text-white">★★★★★</span>
          <span className="text-[10px] font-medium text-[#2b2b2b]">
            (890 Ratings & Reviews)
          </span>
        </div>
  
        {/* CENTER: spacer */}
  
        {/* RIGHT: Button — aligned with phone/contact block below */}
        <div
          className="absolute right-6 left-170 top-1/2 -translate-y-1/2 w-[360px] flex ml-170"
        >
          <a
            href="#quote-form-section"
            className={`request-service-btn inline-flex items-center justify-center px-8 h-[25px] bg-white rounded-[3.8px] ${poppins.className}`}
            style={{
              color: "#000",
              fontSize: "15.909px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
            }}
            aria-label="Request Service"
          >
            Request Service
          </a>
        </div>
  
      </Container>
    </div>
  );
  const headerContent = (
    <>
      <div className="flex flex-row justify-between items-center w-full h-[82px] md:h-[92px]">
        <div className="h-full flex items-center justify-center">
          <Logo logo={logo} imagePath={imagePath} />
        </div>

        <div className="hidden lg:flex items-center text-[13px] font-barlow font-medium justify-center gap-7 text-[#171717]">
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
                      "flex items-center h-full gap-1 text-[13px] font-medium",
                      isOpen ? "text-[#f59402]" : "text-black",
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
                              "text-base py-1 font-semibold px-4 cursor-pointer transition-all duration-100 block",
                              isActive
                                ? "bg-[#f59402] text-white"
                                : `text-black hover:bg-[#f59402] hover:text-white`,
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
                  className="cursor-pointer text-[#171717] text-[13px] font-medium hover:text-[#f59402] transition-colors"
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
                className="cursor-pointer text-[#171717] text-[13px] font-medium hover:text-[#f59402] transition-colors"
              >
                {item.title}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-end flex-row">
          <div className="hidden lg:flex flex-col items-end justify-center leading-none">
            <span className="text-[9px] font-semibold text-[#434343] mb-1">
              {/* Speak To A Chimney Specialist Today */}
            </span>
            <a
              href={phoneLink}
              className="text-[#253d70] font-bold text-[36px] leading-none hover:opacity-90 transition-all"
            >
              {phone}
            </a>
          </div>``

          <div
            className="lg:hidden text-[#3a3a3a] pl-5 cursor-pointer"
            onClick={mounted ? toggleMenu : undefined}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              mounted && (e.key === "Enter" || e.key === " ") && toggleMenu()
            }
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="rounded-[3px] p-0.5">
              {isOpen ? (
                <X className="w-7 h-6" />
              ) : (
                <Menu className="w-7 h-6" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (!mounted) {
    return (
      <FullContainer className="shadow-sm w-full sticky top-0 z-50 bg-white">
        {desktopTopBar}
        <Container className="lg:pr-0">
          <div className="flex flex-row justify-between h-[82px] md:h-[92px] items-center w-full">
            <div className="h-full flex items-center justify-center">
              <Logo logo={logo} imagePath={imagePath} />
            </div>
            <div className="flex items-center justify-end flex-row">
              <div className="hidden lg:flex flex-col items-end justify-center leading-none">
                <a
                  href={phoneLink}
                  className="text-[#253d70] font-extrabold text-[42px] leading-none hover:opacity-90 transition-all"
                >
                  {phone}
                </a>
              </div>
              <div className="hidden md:flex lg:hidden flex-col gap-0.5 md:gap-1 justify-center items-center">
                <div className="text-xs">
                  <a
                    href={phoneLink}
                    className="flex items-center justify-center sm:justify-start gap-2 px-6 py-1.5 lg:py-2 rounded-full text-white font-semibold text-lg shadow-lg hover:opacity-90 transition-all bg-[#f59402]"
                  >
                    <Phone className="w-5 h-5" />
                    {phone}
                  </a>
                </div>
                <h2 className="text-[#f59402] font-bold text-sm lg:text-base md:text-[20px] font-barlow leading-none">
                  Call Us Today
                </h2>
              </div>
              <div className="lg:hidden text-[#3a3a3a] pl-5">
              <div className="rounded-[3px] p-0.5">
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
    <>
    <FullContainer
      id="navbar"
      className="shadow-sm w-full sticky top-0 z-50 bg-white"
    >
      {desktopTopBar}
      <Container className="lg:pr-0">{headerContent}</Container>

      <div
        className={cn(
          "lg:hidden py-2 bg-white absolute top-[82px] md:top-[92px] left-0 right-0 w-full transition-all duration-300",
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
                        ? "bg-[#f59402] text-white"
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
                                ? "bg-[#f59402] text-white"
                                : "text-black hover:text-[#d62828]",
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
                      ? "bg-[#f59402] text-white"
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
                    ? "bg-[#f59402] text-white"
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

    </>
  );
}
