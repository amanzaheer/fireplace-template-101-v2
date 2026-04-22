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
import { Antonio, Inter, Poppins } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const antonio = Antonio({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

const SCROLL_OFFSET = 80;

/** Top-level labels from CMS — typography matches design spec per item */
function navItemKind(title) {
    const t = (title || "").trim().toLowerCase();
    if (t === "home") return "home";
    if (t === "locations") return "locations";
    if (t === "contact us" || t === "contact") return "contact";
    if (t === "about") return "about";
    if (t === "services" || t === "service") return "services";
    return "default";
}

function navLinkTypographyClass(title) {
    const kind = navItemKind(title);
    const base = `${inter.className} text-[20px] not-italic leading-normal`;
    switch (kind) {
        case "home":
            return cn(base, "font-bold text-black");
        case "locations":
            return cn(base, "font-normal text-[#060706]");
        case "contact":
        case "about":
        case "services":
            return cn(base, "font-normal text-[#161616]");
        default:
            return cn(base, "font-normal text-[#161616]");
    }
}

/** About: fixed hit area from spec (64×24) — desktop only so mobile rows stay full width */
function navAboutBoxClass(title) {
    return navItemKind(title) === "about"
        ? "lg:inline-flex lg:h-[24px] lg:w-[64px] lg:shrink-0 lg:items-center lg:justify-center"
        : "";
}

const NAV_PHONE_HANDSET_PATH =
    "M52.8616 9.51693L50.8311 5.15625C50.5798 4.61973 50.2132 4.14526 49.7575 3.76666C49.3018 3.38806 48.7682 3.11465 48.1947 2.96593C41.7435 1.20834 34.3437 0.13315 26.7142 0C19.1948 0.118091 11.7187 1.16231 4.45477 3.10906C3.90552 3.26884 2.94684 4.0744 2.44087 5.13628L0.400339 9.52026C0.138951 10.0599 0.00242448 10.6516 0.000887355 11.2512V14.1472L-0.00244141 14.2837C-0.00244141 15.5886 1.0561 16.6471 2.36098 16.6471L2.47083 16.6438H10.8526C11.5132 16.6282 12.1414 16.3547 12.6029 15.882C13.0645 15.4092 13.3228 14.7747 13.3226 14.1139L13.3159 13.9375V11.1081C13.3162 10.7464 13.4071 10.3905 13.5804 10.073C13.7537 9.75545 14.0038 9.48646 14.3079 9.29057C18.1113 7.26775 22.4069 6.35534 26.7042 6.65752C30.9919 6.36914 35.2754 7.27725 39.0772 9.28059C39.5532 9.61013 39.9493 10.2792 39.9493 11.0415V13.9442C39.9268 14.2843 39.9732 14.6255 40.0859 14.9473C40.1985 15.269 40.375 15.5647 40.6048 15.8165C40.8345 16.0684 41.1128 16.2712 41.4229 16.4128C41.733 16.5543 42.0685 16.6318 42.4093 16.6405H50.8011L50.9043 16.6438C51.5311 16.6438 52.1323 16.3948 52.5755 15.9516C53.0187 15.5083 53.2677 14.9072 53.2677 14.2804L53.2644 14.1372V11.2479C53.2633 10.6396 53.1232 10.0396 52.855 9.49363L52.8616 9.51693Z";

const NAV_PHONE_BASE_PATH =
    "M36.6164 10.9849C34.45 8.2087 33.2768 4.78638 33.2843 1.26493L33.2876 0.985313V0H29.9588V3.32876H16.6438V0H13.315V1.09849L13.3184 1.36479C13.3232 4.90037 12.1404 8.3351 9.95965 11.1181L0 23.3013V33.2876H46.6027V23.3013L36.6164 10.9849ZM23.3013 26.6301C20.6528 26.6301 18.1127 25.578 16.24 23.7052C14.3672 21.8324 13.315 19.2923 13.315 16.6438C13.315 13.9953 14.3672 11.4552 16.24 9.58244C18.1127 7.70965 20.6528 6.65752 23.3013 6.65752C25.9499 6.65752 28.4899 7.70965 30.3627 9.58244C32.2355 11.4552 33.2876 13.9953 33.2876 16.6438C33.2876 19.2923 32.2355 21.8324 30.3627 23.7052C28.4899 25.578 25.9499 26.6301 23.3013 26.6301Z";

/**
 * Handset arc (54×17) stacked above rotary base — matches reference layout;
 * base art is cropped so the handset is not doubled.
 */


/** Location pin — replaces “Call:” before city in contact block */
function NavLocationPin({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={14}
            height={15}
            viewBox="0 0 14 15"
            fill="none"
            className={cn("h-[14px] w-auto shrink-0", className)}
            aria-hidden
        >
            <path
                d="M13.3133 6.97276C13.3334 7.9228 13.1761 8.86755 12.8507 9.75156C12.5254 10.6356 12.0385 11.441 11.4186 12.1206C10.7987 12.8002 10.0584 13.3402 9.24112 13.709C8.42382 14.0778 7.54599 14.2678 6.65918 14.2681C5.77238 14.2683 4.89447 14.0787 4.07699 13.7104C3.25951 13.342 2.51895 12.8024 1.89877 12.1231C1.2786 11.4439 0.791313 10.6387 0.465528 9.75487C0.139743 8.87104 -0.0179781 7.92637 0.00162726 6.97633C0.0400929 5.11234 0.758004 3.33855 2.00168 2.03468C3.24535 0.730808 4.91595 0.000466451 6.65586 2.23356e-07C8.39576 -0.000466004 10.0667 0.728978 11.311 2.03218C12.5553 3.33539 13.274 5.10879 13.3133 6.97276Z"
                fill="#5A3713"
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

const DEFAULT_NAV_TAGLINE = "Safe, Reliable & Trustable";

export default function Navbar14({ content }) {
    const { logo, phone, menu_items = [] } = content?.navbar ?? {};
    const navTagline =
        typeof content?.navbar?.tagline === "string" && content.navbar.tagline.trim()
            ? content.navbar.tagline.trim()
            : DEFAULT_NAV_TAGLINE;
    const cityLabel =
        typeof content?.city_name === "string" && content.city_name.trim()
            ? content.city_name.trim()
            : "Fireplace, USA";
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
            <div className="flex h-full w-full flex-row items-center justify-between gap-3 ">
                <div className="flex flex-col h-full min-w-0 items-start justify-between lg:min-h-[140px]">
                    <div className="flex-1 flex flex-col items-center justify-center h-full ">

                        <Logo
                            logo={logo}
                            imagePath={imagePath}
                            tagline={navTagline}
                            className="font-serif font-bold text-[#3d2914] md:text-2xl lg:text-[1.65rem]"
                        />
                    </div>

                    <div className="hidden min-w-0 items-center h-fit py-2 justify-center gap-4 lg:flex lg:gap-4">
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
                                            className={cn( `${inter.className}`,

                                                "flex h-full items-center gap-1 text-[16px] lg:text-[20px] transition-opacity hover:opacity-85",
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
                                            <div className="flex-grow dropdown-services-container scrollbar-hide">
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
                                                                `${inter.className} block cursor-pointer px-4 py-2 text-[16px] lg:text-[20px] not-italic leading-normal transition-colors`,
                                                                isActive
                                                                    ? "bg-neutral-100 font-bold text-neutral-900"
                                                                    : "font-normal text-[#161616] hover:bg-neutral-50 hover:text-neutral-900",
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
                                        className={cn( `${inter.className}`,
                                            "text-[16px] lg:text-[20px] font-bold"

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
                                        `${inter.className} text-[16px] lg:text-[20px] `
                                    )}
                                >
                                    {item.title}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-center justify-between h-full lg:min-h-[140px]">
                    <div className="hidden flex-col gap-0.5 text-right lg:flex h-full py-[15px]">
                        <a
                            href={phoneLink}
                            className="flex items-stretch gap-2 text-[#4a3428] transition-opacity hover:opacity-80"
                        >
                            <div className="flex w-[53.27px] shrink-0 flex-col items-center justify-center">
                                <img src="/st-icons/Temp15/telephone.png" alt="phone" className="w-full h-full min-h-[60px] min-w-[60px]  aspect-square" />
                            </div>
                            <div className="flex flex-col items-start justify-center">

                                <span
                                    className={`${poppins.className} flex self-stretch items-center text-[24px] lg:text-[30px] font-bold not-italic leading-normal text-[#0B0B0B]`}
                                >
                                    {phone || "(800) 555-1212"}
                                </span>
                                <span className="flex items-center justify-end gap-1.5 text-[12px] lg:text-[15px] font-medium text-neutral-500">
                                    {cityLabel}
                                </span>
                            </div>

                        </a>

                    </div>

                    <div
                        className="cursor-pointer pl-3 text-neutral-800 lg:hidden "
                        onClick={mounted ? toggleMenu : undefined}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) =>
                            mounted && (e.key === "Enter" || e.key === " ") && toggleMenu()
                        }
                        aria-expanded={isOpen}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        <div className="rounded-md border border-neutral-300 bg-white p-1.5 shadow-sm">
                            {isOpen ? (
                                <X className="h-6 w-7" strokeWidth={2} />
                            ) : (
                                <Menu className="h-6 w-7" strokeWidth={2} />
                            )}
                        </div>
                    </div>

                    <div className={`capitalize hidden lg:block text-center text-[24px] lg:text-[29px] font-bold px-4 py-0.5 rounded-t-md  bg-black text-white ${antonio.className}`}>
                        call now & speak to an Expert Instantly
                    </div>
                </div>
            </div>
        </>
    );

    if (!mounted) {
        return (
            <FullContainer className="relative sticky top-0 z-20 h-auto w-full bg-white shadow-sm ">
                <Container className=" py-4 lg:py-0 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8" >
                    <div className="flex h-full w-full flex-row items-center justify-between gap-3 ">
                        <div className="flex flex-col h-full min-w-0 items-start justify-between lg:min-h-[140px]">
                            <div className="flex-1 flex flex-col items-center justify-center h-full  ">

                                <Logo
                                    logo={logo}
                                    imagePath={imagePath}
                                    tagline={navTagline}
                                    className="font-serif font-bold text-[#3d2914] md:text-2xl lg:text-[1.65rem]"
                                />
                            </div>
                            <div className="h-[46px] hidden lg:block">
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 items-center justify-between h-full lg:min-h-[140px]">
                            <div className="hidden flex-col gap-0.5 text-right lg:flex h-full py-[15px]">
                                <a
                                    href={phoneLink}
                                    className="flex items-stretch gap-2 text-[#4a3428] transition-opacity hover:opacity-80"
                                >
                                    <div className="flex w-[53.27px] shrink-0 flex-col items-center justify-center">
                                        <img src="/st-icons/Temp15/telephone.png" alt="phone" className="w-full h-full min-h-[60px] min-w-[60px]  aspect-square" />
                                    </div>
                                    <div className="flex flex-col items-start justify-center">

                                        <span
                                            className={`${poppins.className} flex self-stretch items-center text-[24px] lg:text-[30px] font-bold not-italic leading-normal text-[#0B0B0B]`}
                                        >
                                            {phone || "(800) 555-1212"}
                                        </span>
                                        <span className="flex items-center justify-end gap-1.5 text-[12px] lg:text-[15px] font-medium text-neutral-500">
                                            {cityLabel}
                                        </span>
                                    </div>

                                </a>

                            </div>

                            <div
                                className="cursor-pointer pl-3 text-neutral-800 lg:hidden "
                                onClick={mounted ? toggleMenu : undefined}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) =>
                                    mounted && (e.key === "Enter" || e.key === " ") && toggleMenu()
                                }
                                aria-expanded={isOpen}
                                aria-label={isOpen ? "Close menu" : "Open menu"}
                            >
                                <div className="rounded-md border border-neutral-300 bg-white p-1.5 shadow-sm">
                                    {isOpen ? (
                                        <X className="h-6 w-7" strokeWidth={2} />
                                    ) : (
                                        <Menu className="h-6 w-7" strokeWidth={2} />
                                    )}
                                </div>
                            </div>

                            <div className={`capitalize hidden lg:block text-center text-[24px] lg:text-[29px] font-bold px-4 py-0.5 rounded-t-md  bg-black text-white ${antonio.className}`}>
                                call now & speak to an Expert Instantly
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
            className="relative sticky top-0 z-20 h-auto  w-full bg-white shadow-sm  "
        >
            <Container className=" py-4 lg:py-0 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ">{headerContent}</Container>

            <div
                className={cn(
                    "absolute left-0 right-0 top-full z-30 w-full text-[20px] bg-white py-2 transition-all duration-300 lg:hidden",
                    isOpen
                        ? "h-fit opacity-100 visible"
                        : "h-0 opacity-0 invisible overflow-hidden",
                )}
            >
                <div className="flex flex-col">
                    {menuItemsArray.map((item) => {
                        if (isDropdownItem(item)) {
                            const children = getDropdownChildren(item);
                            const dropdownKey = item.childrenRef ?? item.title;
                            const isDropdownOpen = openDropdownRef === dropdownKey;
                            return (
                                <div key={dropdownKey}>
                                    <div
                                        className={cn(
                                            navLinkTypographyClass(item.title),
                                            navAboutBoxClass(item.title),
                                            "flex cursor-pointer items-center px-4 py-2 text-[20px]",
                                            children.some((c) => pathname === getChildHref(c))
                                                ? "bg-neutral-100"
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
                                                            `${inter.className} px-4 py-2 pl-7 text-[20px] not-italic leading-normal`,
                                                            isActive
                                                                ? "bg-neutral-100 font-bold text-neutral-900"
                                                                : "font-normal text-[#161616] hover:text-neutral-900",
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
                                        navLinkTypographyClass(item.title),
                                        navAboutBoxClass(item.title),
                                        "px-4 py-2",
                                        isActive && "bg-neutral-100",
                                        isActive &&
                                        navItemKind(item.title) !== "home" &&
                                        "underline decoration-[#161616]/45 underline-offset-[5px]",
                                        !isActive && "bg-transparent",
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
                                    navLinkTypographyClass(item.title),
                                    navAboutBoxClass(item.title),
                                    "cursor-pointer px-4 py-2 text-left",
                                    pathname.includes(item.link) && "bg-neutral-100",
                                    pathname.includes(item.link) &&
                                    navItemKind(item.title) !== "home" &&
                                    "underline decoration-[#161616]/45 underline-offset-[5px]",
                                    !pathname.includes(item.link) && "bg-transparent",
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
