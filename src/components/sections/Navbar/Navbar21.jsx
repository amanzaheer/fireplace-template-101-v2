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

export default function Navbar21({ content }) {
  const { logo, phone, menu_items = [] } = content?.navbar ?? {};
  const imagePath = content?.navbar?.imagePath ?? IMAGE_BASE;

  const menuItemsArray = useMemo(
    () => (Array.isArray(menu_items) ? menu_items : []),
    [menu_items],
  );

  const orderedMenuItems = useMemo(() => {
    const items = menuItemsArray.slice();
    const norm = (t) => String(t ?? "").trim().toLowerCase();
    const locIdx = items.findIndex((i) => norm(i?.title) === "locations");
    const svcIdx = items.findIndex((i) => norm(i?.title) === "services");
    if (locIdx === -1 || svcIdx === -1 || svcIdx < locIdx) return items;

    const svc = items[svcIdx];
    const withoutSvc = items
      .slice(0, svcIdx)
      .concat(items.slice(svcIdx + 1));
    const insertAt = withoutSvc.findIndex((i) => norm(i?.title) === "locations");
    if (insertAt === -1) return items;
    const next = withoutSvc.slice();
    next.splice(insertAt, 0, svc);
    return next;
  }, [menuItemsArray]);

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
    <div className="relative flex flex-row justify-between h-full items-center w-full lg:pr-0">
      <div className="h-full flex items-center justify-center">
        <Logo
          logo={logo}
          imagePath={imagePath}
          splitBrandWords
          firstWordClassName="text-[#003366]"
          remainingWordsClassName="text-[#F86503]"
        />
      </div>

      <div className="hidden lg:flex w-[618px] h-[20px] items-center justify-end gap-[12px] opacity-100 lg:absolute lg:right-[90px] lg:top-[0px]">
        {orderedMenuItems.map((item) => {
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
                    "flex items-center justify-center w-[91px] h-[19px] gap-1 font-inter text-[16px] font-normal leading-[100%] tracking-tight transition-colors",
                    isOpen ? "text-[#F86503]" : "text-black",
                  )}
                >
                  {item.title}
                  <ChevronDown className="w-4 h-4" />
                </button>

                <div
                  className={cn(
                    "absolute top-full left-0 min-w-[300px] bg-white shadow-lg transition-all duration-300",
                    isOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2",
                  )}
                >
                  {children.map((child, index) => {
                    const href = getChildHref(child);
                    return (
                      <Link
                        key={index}
                        href={href}
                        className="block px-4 py-2 hover:bg-primary hover:text-white"
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

          return isLink ? (
            <Link
              key={item.link}
              href={item.link}
              className="flex items-center justify-center w-[91px] h-[19px] font-inter text-[16px] font-normal leading-[100%] tracking-normal text-[#000000] hover:text-primary transition-colors"
            >
              {item.title}
            </Link>
          ) : (
            <button
              key={item.title}
              onClick={() => handleNavigation(item.link)}
              className="flex items-center justify-center w-[91px] h-[19px] font-inter text-[16px] font-normal leading-[100%] tracking-normal text-[#000000] hover:text-primary transition-colors"
            >
              {item.title}
            </button>
          );
        })}
      </div>

      <div className="flex items-center h-full gap-4 lg:absolute lg:right-8 lg:top-7">
        <a
          href={phoneLink}
          className="hidden lg:flex items-center justify-center w-[240px] h-[57px] gap-[10px] pt-0 pr-[16px] pb-[4px] pl-[17px] bg-[#F86503] text-white rounded-tl-[15px] rounded-tr-[15px] rounded-bl-none rounded-br-none opacity-100 shadow-[0_6px_14px_rgba(0,0,0,0.2)] font-barlow font-semibold text-base xl:text-lg leading-none"
        >
          <Phone className="w-5 h-5 shrink-0" />
          {phone}
        </a>

        <div className="lg:hidden" onClick={toggleMenu}>
          {isOpen ? <X /> : <Menu />}
        </div>
      </div>
    </div>
  );
  if (!mounted) {
    return (
      <>
        <FullContainer className="bg-white fixed top-0 left-0 right-0 z-50 h-[82px] md:h-[112px]">
          {/* ✅ FIXED BARS */}
          <div className="hidden lg:block absolute top-0 right-0 h-[15px] w-[922px] bg-[#F86503] [clip-path:polygon(7%_0,100%_0,100%_100%,0_100%)]" />
          <div className="hidden lg:block absolute bottom-0 left-0 h-[18px] w-[922px] bg-[#F86503] [clip-path:polygon(0_0,93%_0,100%_100%,0_100%)]" />

          <Container>{headerContent}</Container>
        </FullContainer>
        <div className="h-[82px] md:h-[112px]" aria-hidden="true" />
      </>
    );
  }

  return (
    <>
      <FullContainer
        id="navbar"
        className="bg-white fixed top-0 left-0 right-0 z-50 h-[82px] md:h-[112px]"
      >
        {/* ✅ FIXED BARS */}
        <div className="hidden lg:block absolute top-0 right-0 h-[15px] w-[922px] bg-[#F86503] [clip-path:polygon(7%_0,100%_0,100%_100%,0_100%)]" />
        <div className="hidden lg:block absolute bottom-0 left-0 h-[18px] w-[922px] bg-[#F86503] [clip-path:polygon(0_0,93%_0,100%_100%,0_100%)]" />

        <Container>{headerContent}</Container>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white shadow-md absolute top-full left-0 right-0">
            {orderedMenuItems.map((item, i) => (
              <div key={i} className="px-4 py-2 border-b">
                {item.title}
              </div>
            ))}
          </div>
        )}
      </FullContainer>
      <div className="h-[82px] md:h-[112px]" aria-hidden="true" />
    </>
  );
}