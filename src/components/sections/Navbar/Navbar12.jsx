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
import { Inter } from "next/font/google";

const SCROLL_OFFSET = 80;
const inter = Inter({
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

export default function Navbar10({ content }) {
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
  const phoneButtonClass =
    "hidden h-[54px] w-[190px] md:inline-flex flex-col items-center justify-center gap-0.5 rounded-full bg-[#da4909] text-white shadow-lg transition-all hover:opacity-90";
  const phoneTextClass = `${inter.className} text-sm md:text-base lg:text-lg font-semibold text-white leading-none`;

  const headerContent = (
    <>
      <div className="flex flex-row justify-between h-full items-center w-full md:pr-8 gap-16 md:gap-20">
        <div className="h-full flex items-center justify-center">
          <Logo logo={logo} imagePath={imagePath} />
        </div>

        <div className={`${inter.className} hidden lg:flex items-center text-sm font-normal justify-center gap-6 w-full`}>
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
                      "relative inline-flex h-full items-center gap-1 text-[16px] font-normal leading-[100%] tracking-[0%] text-black transition-all hover:font-semibold hover:text-black after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-[3px] after:bg-[#da4909] after:opacity-0 after:transition-opacity hover:after:opacity-100",
                      isOpen ? "after:opacity-100" : "",
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
                              "text-[16px] font-normal py-1 px-4 cursor-pointer transition-all duration-100 block",
                              isActive

                                ? "bg-[#da4909] text-black"
                                : "bg-white text-black hover:bg-[#da4909] hover:text-white",
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
                  className={`${inter.className} relative inline-flex h-full items-center text-black text-[16px] font-normal leading-[100%] tracking-[0%] transition-all hover:font-semibold hover:text-black after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-8 after:h-[3px] after:bg-[#da4909] after:opacity-0 after:transition-opacity hover:after:opacity-100`}
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
                className={`${inter.className} relative inline-flex h-full items-center text-black text-[16px] font-normal leading-[100%] tracking-[0%] transition-all hover:font-semibold hover:text-black after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-8 after:h-[3px] after:bg-[#da4909] after:opacity-0 after:transition-opacity hover:after:opacity-100`}
              >
                {item.title}
              </button>
            );
          })}
        </div>
        
        <div className="flex items-center justify-end flex-row">
          <div className="flex flex-col gap-0.5 md:gap-1 justify-center items-center ">
            <div className="text-xs">
              <a href={phoneLink} className={phoneButtonClass}>
                <span className={`${inter.className} text-[16px] font-normal leading-none text-white`}>
                  CALL NOW:
                </span>
                <span className={phoneTextClass}>{phone}</span>
              </a>
            </div>
           
          </div>

          <div
            className="lg:hidden pl-5 cursor-pointer text-[#da4909]"
            onClick={mounted ? toggleMenu : undefined}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              mounted && (e.key === "Enter" || e.key === " ") && toggleMenu()
            }
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="rounded-[3px] border border-[#da4909] bg-white p-0.5 pt-1.5">
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
      className="shadow-sm w-full sticky top-0 z-20 border-t-4 border-t-[#da4909]  bg-white py-2 h-[82px] md:h-[84px]"
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
                      "px-4 py-1 flex items-center cursor-pointer",
                      children.some((c) => pathname === getChildHref(c))
                        ? "bg-[#da4909] text-black"
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
                                ? "bg-[#da4909] text-black"
                                : "bg-white text-black hover:bg-[#da4909] hover:text-white",
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
                      ? "bg-[#da4909] text-black"
                      : "text-black bg-transparent hover:text-[#da4909]",
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
                    ? "bg-[#da4909] text-black"
                    : "text-black bg-transparent hover:text-[#da4909]",
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
