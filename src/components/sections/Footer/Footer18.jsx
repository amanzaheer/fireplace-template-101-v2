"use client";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Archivo } from "next/font/google";
import {
  faCaretRight,
  faEnvelope,
  faMapPin,
  faSquarePhone,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import { Poppins, Inter, Rubik } from "next/font/google";
import { IMAGE_BASE } from "@/lib/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SCROLL_OFFSET = 100;
const poppins = Poppins({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const rubik = Rubik({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
config.autoAddCss = false;

const byPrefixAndName = {
  fas: {
    "caret-right": faCaretRight,
    "map-pin": faMapPin,
    "square-phone": faSquarePhone,
  },
};

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}
function telHref(phone) {
  if (!phone || typeof phone !== "string") return "#";
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "#";
}

export default function Footer18({ content }) {
  const router = useRouter();
  const pathname = usePathname() ?? "";

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
  const handleHomeNavigation = useCallback(() => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    router.push("/");
  }, [pathname, router]);
  const services = useMemo(
    () => (Array.isArray(content?.services) ? content.services : []),
    [content?.services],
  );
  const quickLinks = useMemo(() => {
    const menuItems = Array.isArray(content?.navbar?.menu_items)
      ? content.navbar.menu_items
      : [];
    return menuItems.filter(
      (item) =>
        item?.title &&
        item?.link &&
        !(
          item.link === "#" &&
          (item.childrenRef || Array.isArray(item.services))
        ),
    );
  }, [content?.navbar?.menu_items]);

  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesWrapRef = useRef(null);

  useEffect(() => {
    if (!isServicesOpen) return;
    const onMouseDown = (e) => {
      const el = servicesWrapRef.current;
      if (el && !el.contains(e.target)) setIsServicesOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [isServicesOpen]);

  const footer = content?.footer ?? {};
  const navbar = content?.navbar ?? {};
  const contactInfo = content?.contact_info ?? {};
  const phone =
    (typeof contactInfo.phone === "string" && contactInfo.phone.trim()
      ? contactInfo.phone.trim()
      : "") ||
    (typeof navbar.phone === "string" && navbar.phone.trim()
      ? navbar.phone.trim()
      : "");
  const email =
    typeof contactInfo.email === "string" ? contactInfo.email.trim() : "";
  const address =
    (typeof contactInfo.address === "string" && contactInfo.address.trim()
      ? contactInfo.address.trim()
      : "") ||
    (typeof footer.address === "string" && footer.address.trim()
      ? footer.address.trim()
      : "");
  const statement = footer.value ?? footer.statement ?? "";
  const trustBadgeSrcs = [1, 2, 3, 4, 5].map((n) =>
    buildImageSrc(IMAGE_BASE, `footer/footer${n}.webp`),
  );
  const callNowIconRaw =
    typeof footer.call_now_icon === "string" && footer.call_now_icon.trim()
      ? footer.call_now_icon.trim()
      : "/st-icons/Temp13/call1.png";
  const callNowIconSrc =
    callNowIconRaw.startsWith("/") || callNowIconRaw.startsWith("http")
      ? callNowIconRaw
      : buildImageSrc(IMAGE_BASE, callNowIconRaw);
  const copyrightYear = new Date().getFullYear();
  const copyrightLine =
    typeof footer.copyright === "string" && footer.copyright.trim()
      ? footer.copyright.trim()
      : `Copyright © ${copyrightYear} Missouri | Powered by Missouri Chimney`;

  const iconClass = "text-[16px] md:text-[20px]";
  const iconAccent = "text-[#ff0504]";
  return (
    <footer className="w-full bg-white">
      <FullContainer
        id="footer"
        className="bg-white py-12 md:py-16 mb-16 md:mb-0 relative self-stretch w-full items-stretch"
      >
        <Container className={`relative z-10 ${archivo.className}`}>
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-3 md:gap-12 lg:gap-16">
            <div className="flex min-w-0 flex-col items-start gap-5">
              {navbar?.logo ? (
                <div className="mb-1 flex w-full md:ml-12 justify-start">
                  <Logo
                    logo={navbar.logo}
                    imagePath={navbar.imagePath ?? IMAGE_BASE}
                  />
                </div>
              ) : null}
               
              <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-3 md:ml-12">
                {trustBadgeSrcs.map((src, index) =>
                  src ? (
                    <div
                      key={index}
                      className="flex h-11 w-11 shrink-0 items-center justify-center sm:h-12 sm:w-12"
                    >
                      <Image
                        title="Trust badge"
                        src={src}
                        alt="icon"
                        width={54}
                        height={54}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ) : null,
                )}
              </div>

              {statement ? (
                <p className="max-w-[420px] text-left text-[15px] leading-relaxed text-black md:ml-12 md:text-[17px]">
                  {statement}
                </p>
              ) : null}
                       
              {phone ? (
                <Link
                  href={telHref(phone)}
                  title="Call now"
                  className={`${poppins.className} inline-flex h-[65.84px] w-[209px] shrink-0 flex-row items-center gap-2 rounded-[10px] bg-[#ff0504] py-2 pl-[22.51px] pr-[22.51px] text-white shadow-md transition hover:brightness-95 md:ml-12`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                    <Image
                      src={callNowIconSrc}
                      alt="icon"
                      width={32}
                      height={32}
                      className="h-8 w-8 object-contain"
                      aria-hidden
                    />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col justify-center text-left leading-tight">
                    <span className="text-[11px] font-semibold uppercase leading-none tracking-[0.1em] text-white/95">
                      Call Now
                    </span>
                    <span className="mt-0.5 truncate text-[15px] font-bold leading-tight tracking-tight">
                      {phone}
                    </span>
                  </span>
                </Link>
              ) : null}
            </div>
            <div className="flex flex-col items-start text-left md:items-center md:text-center md:pt-1">
              <ul className="inline-flex w-fit flex-col items-start space-y-2 md:items-center md:space-y-2.5">
                {quickLinks.map((item) => {
                  const isHomeLink = item.link === "/";
                  const isPageLink = item.link?.startsWith("/");
                  return (
                    <li key={item.link ?? item.title} className="w-full text-left md:text-center">
                      {isHomeLink ? (
                        <button
                          type="button"
                          onClick={handleHomeNavigation}
                          className="text-left text-black text-sm md:text-[17px] hover:text-[#ff0504] transition-colors duration-200"
                        >
                          {item.title}
                        </button>
                      ) : isPageLink ? (
                        <Link
                          href={item.link}
                          className="text-black text-sm md:text-[17px] hover:text-[#ff0504] transition-colors duration-200"
                        >
                          {item.title}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleNavigation(item.link)}
                          className="text-left text-black text-sm md:text-[17px] hover:text-[#ff0504] transition-colors duration-200"
                        >
                          {item.title}
                        </button>
                      )}
                    </li>
                  );
                })}

                <li className="relative w-full text-left md:text-center" ref={servicesWrapRef}>
                  <button
                    type="button"
                    onClick={() => setIsServicesOpen((prev) => !prev)}
                    aria-expanded={isServicesOpen}
                    className="text-left text-black text-sm md:text-center md:text-[17px] hover:text-[#ff0504] transition-colors duration-200"
                  >
                    Services
                  </button>
                  {services.length > 0 ? (
                    <div
                      role="menu"
                      aria-hidden={!isServicesOpen}
                      className={[
                        "absolute bottom-full left-0 z-20 md:left-1/2 md:-translate-x-1/2",
                        "w-auto min-w-[300px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]",
                        "transition-all duration-300 ease-in-out flex flex-col",
                        isServicesOpen
                          ? "opacity-100 visible transform translate-y-0 pointer-events-auto"
                          : "opacity-0 invisible transform -translate-y-2 pointer-events-none",
                      ].join(" ")}
                    >
                      <div className="grow dropdown-services-container scrollbar-hide">
                        {services.map((svc, idx) => {
                          const href = svc?.path ?? "#";
                          const label =
                            svc?.title ?? svc?.name ?? `Service ${idx + 1}`;
                          if (!href || href === "#") return null;

                          const isActive = pathname === href;
                          return (
                            <Link
                              key={href}
                              href={href}
                              role="menuitem"
                              onClick={() => setIsServicesOpen(false)}
                              className={[
                                "text-sm font-normal py-1 px-4 cursor-pointer transition-all duration-100 block",
                                isActive
                                  ? "bg-[#ff0504] text-white"
                                  : "text-black hover:bg-[#ff0504] hover:text-white",
                              ].join(" ")}
                            >
                              {label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-start text-left text-black md:items-start">
              <h3
                className={`${rubik.className} mb-4 w-full text-left text-2xl font-bold text-black md:mb-5 md:text-3xl`}
              >
                Stay Tuned With Us
              </h3>
              <div className="flex w-full max-w-md flex-col items-start gap-3 md:max-w-none md:gap-4">
                {address ? (
                  <div className="flex items-start justify-start gap-3">
                    <FontAwesomeIcon
                      icon={faMapPin}
                      className={`${iconClass} ${iconAccent} mt-0.5 shrink-0`}
                    />
                    <span className="text-sm leading-relaxed text-black md:text-[17px]">
                      {address}
                    </span>
                  </div>
                ) : null}
                {email ? (
                  <div className="flex items-center justify-start gap-3">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className={`${iconClass} ${iconAccent} shrink-0`}
                    />
                    <Link
                      href={`mailto:${email}`}
                      className="text-black text-sm hover:text-[#ff0504] transition-colors duration-200 md:text-[17px]"
                    >
                      {email}
                    </Link>
                  </div>
                ) : null}
                {phone ? (
                  <div className="flex items-center justify-start gap-3">
                    <FontAwesomeIcon
                      icon={byPrefixAndName.fas["square-phone"]}
                      className={`${iconClass} ${iconAccent} shrink-0`}
                    />
                    <Link
                      href={telHref(phone)}
                      className="text-black text-sm hover:text-[#ff0504] transition-colors duration-200 md:text-[17px]"
                    >
                      {phone}
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </FullContainer>
      <div className="w-full border-t-2 border-black px-4 py-4   text-center text-[10px] text-black md:mx-auto md:w-[1089px] md:text-center md:text-[17px]">
        {copyrightLine}
      </div>
    </footer>
  );
  
}
