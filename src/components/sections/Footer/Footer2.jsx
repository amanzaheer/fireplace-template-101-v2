"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faEnvelope,
  faMapPin,
  faSquarePhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import {Poppins, Inter, Rubik} from "next/font/google";

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
config.autoAddCss = false;

const byPrefixAndName = {
  fab: {
    twitter: faTwitter,
  },
  fas: {
    "caret-right": faCaretRight,
    "map-pin": faMapPin,
    "square-phone": faSquarePhone,
  },
};

export default function Footer2({ content }) {
  const footer = content?.footer ?? {};
  const contactInfo = content?.contact_info ?? {};
  const pathname = usePathname() ?? "";
  const services = useMemo(
    () => (Array.isArray(content?.services) ? content.services : []),
    [content?.services],
  );

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

  const statement =
    footer.value ??
    footer.statement ??
    "Our goal is to give you services that are fast, effective, and affordable, and that go above and beyond what you expect.";
  const address =
    contactInfo.address ??
    "Lumbung Hidup St. 425 East Java Madiun City 1234";
  const email = contactInfo.email ?? "chimney@gmail.com";
  const phone = contactInfo.phone ?? content?.navbar?.phone ?? "(+62) 123 456 789";

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/locations", label: "Locations" },
    { href: "/contact-us", label: "Contact Us" },
    { href: "/faq", label: "FAQ" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-and-conditions", label: "Terms and Conditions" },
  ];

  const socialLinks = [
    { href: "#", label: "Facebook", icon: faFacebook },
    { href: "#", label: "Twitter", icon: byPrefixAndName.fab["twitter"] },
    { href: "#", label: "Instagram", icon: faInstagram },
    { href: "#", label: "LinkedIn", icon: faLinkedin },
  ];

  // FontAwesomeIcon SVGs default to `1em` sizing, so `text-*` works reliably
  // (instead of `w-* h-*`, which can be overridden by FontAwesome inline sizing).
  const iconClass = "text-[16px] md:text-[20px]";
  const iconAccent = "text-[#d62828]";

  return (
    <footer>
      <FullContainer id="footer" className="bg-black py-12 md:py-16 mb-16 md:mb-0 relative">
        <Container className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div>
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">Information</h3>
              <p className="text-white/90 text-[17px] leading-relaxed max-w-[420px]">{statement}</p>
              <div className="mt-6 flex items-center gap-4">
                {socialLinks.map(({ href, label, icon }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="text-[#d62828] hover:text-[#ef4444] transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={icon} className={iconClass} />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className={`${rubik.className} text-white text-2xl md:text-3xl font-bold mb-4`}>Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 text-white/95 text-sm md:text-lg hover:text-white transition-colors duration-200"
                    >
                      <FontAwesomeIcon
                        icon={byPrefixAndName.fas["caret-right"]}
                        className="text-[16px] text-[#d62828]"
                      />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}

                <li className="relative" ref={servicesWrapRef}>
                  <button
                    type="button"
                    onClick={() => setIsServicesOpen((prev) => !prev)}
                    aria-expanded={isServicesOpen}
                    className="inline-flex items-center gap-2 text-white/95 text-sm md:text-lg hover:text-white transition-colors duration-200"
                  >
                    <FontAwesomeIcon
                      icon={byPrefixAndName.fas["caret-right"]}
                      className={`text-[16px] text-[#d62828] transition-transform duration-200 ${
                        isServicesOpen ? "-rotate-90" : "rotate-90"
                      }`}
                    />
                    <span>Services</span>
                  </button>

                  {services.length > 0 ? (
                    <div
                      role="menu"
                      aria-hidden={!isServicesOpen}
                      className={[
                        "absolute bottom-full left-0 z-20",
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
                          const label = svc?.title ?? svc?.name ?? `Service ${idx + 1}`;
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
                                  ? "bg-[#c92028] text-white"
                                  : "text-black hover:bg-[#c92028] hover:text-white",
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

            <div className=" text-white">
              <h3 className={`${rubik.className} text-white  text-2xl md:text-3xl font-bold mb-4`}>Stay Tuned With Us</h3>
              <div className="flex flex-col gap-2 md:gap-7">
                <div className="flex items-start gap-3 ">
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fas["map-pin"]}
                    className={`${iconClass} mt-0.5 ${iconAccent} shrink-0`}
                  />
                  <span className="text-white/95 text-[17px] leading-relaxed">{address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className={`${iconClass} ${iconAccent} shrink-0`}
                  />
                  <Link
                    href={`mailto:${email}`}
                    className="text-white/95 text-[17px] hover:text-white transition-colors duration-200"
                  >
                    {email}
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fas["square-phone"]}
                    className={`${iconClass} ${iconAccent} shrink-0 `}
                  />
                  <Link
                    href={`tel:${phone}`}
                    className="text-white/95 text-[17px] hover:text-white transition-colors duration-200"
                  >
                    {phone}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </FullContainer>
    </footer>
  );
}
