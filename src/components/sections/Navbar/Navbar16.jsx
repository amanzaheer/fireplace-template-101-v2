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
import { Poppins, Raleway } from "next/font/google";

const SCROLL_OFFSET = 80;
const SECTION_LINK_IDS = new Set(["locations", "faqs", "contact-us"]);

const SECTION_TITLE_TO_ID = {
  locations: "locations",
  faqs: "faqs",
  "contact us": "contact-us",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Per nav-item font config
const NAV_ITEM_STYLES = {
  home: {
    className: poppins.className,
    style: {
      fontWeight: 600,
      fontSize: "16px",
      lineHeight: "100%",
      letterSpacing: "0em",
      textAlign: "center",
    },
  },
  services: {
    className: poppins.className,
    style: {
      fontWeight: 600,
      fontSize: "16px",
      lineHeight: "100%",
      letterSpacing: "0em",
    },
  },
  locations: {
    className: poppins.className,
    style: {
      fontWeight: 600,
      fontSize: "16px",
      lineHeight: "100%",
      letterSpacing: "0em",
    },
  },
  faqs: {
    className: raleway.className,
    style: {
      fontWeight: 600,
      fontSize: "16px",
      lineHeight: "100%",
      letterSpacing: "0em",
    },
  },
  "contact us": {
    className: poppins.className,
    style: {
      fontWeight: 600,
      fontSize: "16px",
      lineHeight: "100%",
      letterSpacing: "0em",
    },
  },
};

function getNavItemConfig(title = "") {
  const key = title.toLowerCase();
  return (
    NAV_ITEM_STYLES[key] ?? {
      className: poppins.className,
      style: { fontWeight: 600, fontSize: "16px" },
    }
  );
}

function isDropdownItem(item) {
  return Boolean(item?.childrenRef || Array.isArray(item?.services));
}

function getChildHref(child) {
  if (child?.path) return child.path;
  const slug = sanitizeUrl(child?.title);
  return slug ? `/${slug}` : "#";
}

function normalizeLinkToSectionId(link = "") {
  return String(link).trim().replace(/^\/?#?/, "").toLowerCase();
}

function getSectionTarget(item = {}) {
  const linkTarget = normalizeLinkToSectionId(item.link);
  if (SECTION_LINK_IDS.has(linkTarget)) return linkTarget;
  return SECTION_TITLE_TO_ID[String(item.title ?? "").toLowerCase()] ?? null;
}

export default function Navbar16({ content }) {
  const { logo, phone, menu_items = [] } = content?.navbar ?? {};
  const imagePath = content?.navbar?.imagePath ?? IMAGE_BASE;

  const menuItemsArray = useMemo(
    () => (Array.isArray(menu_items) ? menu_items : []),
    [menu_items]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [openDropdownRef, setOpenDropdownRef] = useState(null);

  usePathname();
  const router = useRouter();

  const getDropdownChildren = useCallback(
    (item) => {
      if (Array.isArray(item?.services)) return item.services;
      const ref = item?.childrenRef;
      if (!ref || !content) return [];
      const resolved = content[ref];
      return Array.isArray(resolved) ? resolved : [];
    },
    [content]
  );

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
    [router, scrollToSection]
  );

  const toggleMenu = () => setIsOpen((p) => !p);
  const closeMenu = () => setIsOpen(false);

  const phoneLink = phone ? `tel:${phone}` : "#";

  return (
    <FullContainer className="shadow-sm bg-white w-full sticky top-0 z-50 py-2 md:py-3">
      <Container>

        {/* HEADER */}
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center">
            <Logo
              logo={logo}
              imagePath={imagePath}
              splitBrandWords
              className={poppins.className}
            />
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-6">
            {menuItemsArray.map((item) => {
              const { className: itemClass, style: itemStyle } =
                getNavItemConfig(item.title);
              const sectionTarget = getSectionTarget(item);

              if (isDropdownItem(item)) {
                const children = getDropdownChildren(item);
                const key = item.childrenRef ?? item.title;
                const isOpenDrop = openDropdownRef === key;

                return (
                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() => setOpenDropdownRef(key)}
                    onMouseLeave={() => setOpenDropdownRef(null)}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdownRef(isOpenDrop ? null : key)
                      }
                      className={cn(
                        "flex items-center justify-start gap-1 text-black hover:text-primary",
                        itemClass,
                        isOpenDrop && "text-primary"
                      )}
                      style={itemStyle}
                    >
                      {item.title}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          isOpenDrop && "rotate-180"
                        )}
                      />
                    </button>

                    <div
                      className={cn(
                        "absolute top-full left-0 mt-2 min-w-[220px] bg-white shadow-lg rounded-md overflow-hidden transition-all",
                        isOpenDrop
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      )}
                    >
                      {children.map((child, i) => {
                        const href = getChildHref(child);
                        return (
                          <Link
                            key={i}
                            href={href}
                            className="block px-4 py-2 text-sm hover:bg-primary hover:text-white"
                          >
                            {child?.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.title}
                  href={sectionTarget ? `/#${sectionTarget}` : item.link}
                  onClick={(e) => {
                    if (!sectionTarget) return;
                    e.preventDefault();
                    setOpenDropdownRef(null);
                    closeMenu();
                    handleNavigation(sectionTarget);
                  }}
                  className={cn(
                    "text-black hover:text-primary",
                    itemClass
                  )}
                  style={itemStyle}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* CALL BUTTON */}
            <a
              href={phoneLink}
              className="hidden md:flex items-center gap-2 bg-orange-600 px-4 py-2 text-white text-sm font-bold"
            >
              <Phone className="w-4 h-4" />
              {phone}
            </a>

            {/* MOBILE MENU ICON */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 bg-primary text-white rounded"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-[500px] mt-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-2">
            {menuItemsArray.map((item, i) => {
              const { className: itemClass, style: itemStyle } =
                getNavItemConfig(item.title);
              const sectionTarget = getSectionTarget(item);

              if (isDropdownItem(item)) {
                const children = getDropdownChildren(item);
                const key = item.title;
                const isOpenDrop = openDropdownRef === key;

                return (
                  <div key={i}>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdownRef(isOpenDrop ? null : key)
                      }
                      className={cn(
                        "flex justify-between w-full px-4 py-2 text-black",
                        itemClass
                      )}
                      style={itemStyle}
                    >
                      {item.title}
                      <ChevronDown
                        className={cn(
                          "transition-transform",
                          isOpenDrop && "rotate-180"
                        )}
                      />
                    </button>

                    {isOpenDrop && (
                      <div className="pl-6 flex flex-col gap-1">
                        {children.map((child, idx) => (
                          <Link
                            key={idx}
                            href={getChildHref(child)}
                            onClick={closeMenu}
                            className="py-1 text-sm"
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={i}
                  href={sectionTarget ? `/#${sectionTarget}` : item.link}
                  onClick={(e) => {
                    if (sectionTarget) {
                      e.preventDefault();
                      setOpenDropdownRef(null);
                      closeMenu();
                      handleNavigation(sectionTarget);
                      return;
                    }
                    closeMenu();
                  }}
                  className={cn("px-4 py-2 text-black", itemClass)}
                  style={itemStyle}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>

      </Container>
    </FullContainer>
  );
}