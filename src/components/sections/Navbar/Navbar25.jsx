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
import Image from "next/image";
import { Rubik, Inter, Poppins } from "next/font/google";

const SCROLL_OFFSET = 80;

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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

export default function Navbar25({ content }) {
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
    <FullContainer
      id="navbar"
      className="w-full sticky top-0 z-30 bg-black shadow-sm"
    >
      <Container className="px-0!">
        <div className="h-[86px] md:min-h-[92px] flex items-center">
          <div className="w-full flex items-center justify-between px-4 md:px-6 lg:px-8 gap-3">
            <div className="flex items-center text-white shrink-0">
              <Logo logo={logo} imagePath={imagePath} />
            </div>

            <a
              href="#quote-form-section"
              className="hidden md:flex flex-1 items-center justify-center text-center text-white text-sm lg:text-base xl:text-lg font-medium px-2 lg:px-6 py-3 whitespace-nowrap md:ml-10 lg:ml-[20rem]"
            >
              Speak To A Chimney Specialist Today
            </a>

            <div className="hidden md:flex items-center shrink-0">
              <a
                href={phoneLink}
                className={`${rubik.className} inline-flex items-center gap-2 text-white text-xl lg:text-2xl xl:text-[30px] font-bold whitespace-nowrap leading-none`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 54 54" fill="none">
                  <path d="M34.9659 23.7259C34.5407 23.3007 34.328 22.7743 34.328 22.1468C34.328 21.5193 34.5407 20.9937 34.9659 20.57C35.3911 20.1462 35.9167 19.9336 36.5427 19.9321C37.1687 19.9307 37.6951 20.1433 38.1218 20.57C38.5485 20.9967 38.7604 21.5223 38.7574 22.1468C38.7545 22.7714 38.5418 23.2977 38.1196 23.7259C37.6973 24.1541 37.1717 24.3659 36.5427 24.3615C35.9138 24.3571 35.3881 24.1445 34.9659 23.7237M31.006 18.9355L28.6806 16.6101C29.751 15.5397 30.9603 14.7188 32.3083 14.1474C33.6563 13.576 35.0677 13.2896 36.5427 13.2881C38.0177 13.2866 39.4299 13.573 40.7794 14.1474C42.1289 14.7217 43.3374 15.5426 44.4048 16.6101L42.0794 18.9355C41.3412 18.1973 40.5018 17.6252 39.5613 17.2191C38.6208 16.8131 37.6146 16.6101 36.5427 16.6101C35.4708 16.6101 34.4654 16.8131 33.5263 17.2191C32.5873 17.6252 31.7472 18.1973 31.006 18.9355ZM44.1834 46.5083C39.5695 46.5083 35.0109 45.5028 30.5077 43.4919C26.0045 41.481 21.9074 38.6292 18.2162 34.9366C14.5251 31.244 11.6741 27.1468 9.66314 22.6451C7.65221 18.1434 6.64601 13.5849 6.64453 8.96946C6.64453 8.30505 6.866 7.75138 7.30894 7.30845C7.75187 6.86551 8.30554 6.64404 8.96995 6.64404H17.9394C18.4562 6.64404 18.9176 6.81974 19.3236 7.17114C19.7296 7.52253 19.9695 7.93742 20.0434 8.41579L21.4829 16.1672C21.5567 16.7578 21.5383 17.2561 21.4275 17.6621C21.3168 18.0681 21.1138 18.4188 20.8185 18.7141L15.4479 24.14C16.1861 25.5057 17.0624 26.825 18.0767 28.0977C19.091 29.3704 20.208 30.598 21.4275 31.7807C22.5718 32.9249 23.7714 33.9865 25.0264 34.9654C26.2814 35.9443 27.6102 36.839 29.0128 37.6496L34.2173 32.4451C34.5495 32.1129 34.9836 31.8641 35.5195 31.6987C36.0555 31.5334 36.5811 31.4869 37.0964 31.5592L44.737 33.1095C45.2538 33.2571 45.6783 33.5251 46.0105 33.9134C46.3427 34.3017 46.5088 34.7351 46.5088 35.2134V44.1829C46.5088 44.8473 46.2873 45.401 45.8444 45.8439C45.4015 46.2868 44.8478 46.5083 44.1834 46.5083Z" fill="#D90209" />
                </svg>
                {phone || "(888)-249-0566"}
              </a>
            </div>

            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white"
              onClick={mounted ? toggleMenu : undefined}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </Container>

      <FullContainer className="w-full bg-black border-t border-white">
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
                        "inline-flex items-center gap-1 text-2xl font-thin text-white hover:text-gray-300",
                        isDropdownOpen && "text-white",
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
                      "text-2xl font-thin text-white hover:text-gray-300",
                      isActive && "text-white",
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
                  className="text-2xl font-thin text-white hover:text-gray-300"
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
            <Phone className="w-8 h-8" />
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
