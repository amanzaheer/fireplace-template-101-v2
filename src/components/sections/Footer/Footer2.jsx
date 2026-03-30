"use client";

import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faEnvelope,
  faLocationDot,
  faPhone,
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
  },
};

export default function Footer2({ content }) {
  const footer = content?.footer ?? {};
  const contactInfo = content?.contact_info ?? {};
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
    { href: "/services", label: "Services" },
    { href: "/contact-us", label: "Contact Us" },
    { href: "/faq", label: "FAQ" },
  ];

  const socialLinks = [
    { href: "#", label: "Facebook", icon: faFacebook },
    { href: "#", label: "Twitter", icon: byPrefixAndName.fab["twitter"] },
    { href: "#", label: "Instagram", icon: faInstagram },
    { href: "#", label: "LinkedIn", icon: faLinkedin },
  ];

  const iconClass = "w-5 h-5";
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
                        className="w-4 h-4 text-[#d62828]"
                      />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={`${rubik.className} text-white text-2xl md:text-3xl font-bold mb-4`}>Stay Tuned With Us</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={`${iconClass} mt-0.5 ${iconAccent} shrink-0`}
                  />
                  <span className="text-white/95 text-[17px] leading-relaxed">{address}</span>
                </li>
                <li className="flex items-center gap-3">
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
                </li>
                <li className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className={`${iconClass} ${iconAccent} shrink-0`}
                  />
                  <Link
                    href={`tel:${phone}`}
                    className="text-white/95 text-[17px] hover:text-white transition-colors duration-200"
                  >
                    {phone}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </FullContainer>
    </footer>
  );
}
