"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

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
    { href: "#", label: "Facebook", Icon: Facebook },
    { href: "#", label: "Twitter", Icon: Twitter },
    { href: "#", label: "Instagram", Icon: Instagram },
    { href: "#", label: "LinkedIn", Icon: Linkedin },
  ];

  return (
    <footer>
      <FullContainer id="footer" className="bg-black py-12 md:py-16 mb-16 md:mb-0 relative">
        <Container className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div>
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">Information</h3>
              <p className="text-white/90 text-[17px] leading-relaxed max-w-[420px]">{statement}</p>
              <div className="mt-6 flex items-center gap-4">
                {socialLinks.map(({ href, label, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="text-[#d62828] hover:text-[#ef4444] transition-colors duration-200"
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 text-white/95 text-sm md:text-lg hover:text-white transition-colors duration-200"
                    >
                      <ChevronRight className="w-4 h-4 text-[#d62828]" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">Stay Tuned With Us</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5 text-[#d62828] shrink-0" />
                  <span className="text-white/95 text-[17px] leading-relaxed">{address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#d62828] shrink-0" />
                  <Link
                    href={`mailto:${email}`}
                    className="text-white/95 text-[17px] hover:text-white transition-colors duration-200"
                  >
                    {email}
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#d62828] shrink-0" />
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
