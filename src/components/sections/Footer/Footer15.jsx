"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
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
import Logo from "@/components/common/Logo";
import { IMAGE_BASE } from "@/lib/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapPin,
  faSquarePhone,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Rubik } from "next/font/google";

const byPrefixAndName = {
    fas: {
      "map-pin": faMapPin,
      "square-phone": faSquarePhone,
    },
  };


const iconClass = "text-[12px] md:text-[16px]";
const iconAccent = "text-[#f3a008]";

const rubik = Rubik({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
  });

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

const STATIC_NAV = [
  { label: "Home", href: "/" },
  { label: "Our Services", href: "/#our_services" },
  { label: "Locations", href: "/#locations" },
  { label: "FAQs", href: "/#faqs" },
  { label: "About", href: "/#about" },
  { label: "Contact Us", href: "/#contact-us" },
];

const STATIC_ADDRESS =
  "Lumbung Hidup St. 425 East Java Madiun City 1234";
const STATIC_EMAIL_FALLBACK = "fireplace.pro@gmail.com";
const STATIC_PHONE_DISPLAY_FALLBACK = "(737) 315-3438";

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/", Icon: Facebook },
  { label: "Twitter", href: "https://twitter.com/", Icon: Twitter },
  { label: "Instagram", href: "https://www.instagram.com/", Icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: Linkedin },
];

export default function Footer15({ content }) {
  const footer = content?.footer ?? {};
  const contactInfo = content?.contact_info ?? {};
  const navbar = content?.navbar ?? {};
  const navTagline =
    typeof navbar?.tagline === "string" && navbar.tagline.trim()
      ? navbar.tagline.trim()
      : "Safe, Reliable & Trustable";

  const phoneRaw =
    contactInfo.phone ?? navbar.phone ?? STATIC_PHONE_DISPLAY_FALLBACK;
  const phoneDisplay =
    typeof phoneRaw === "string" && phoneRaw.trim()
      ? phoneRaw.trim()
      : STATIC_PHONE_DISPLAY_FALLBACK;

  const email =
    (typeof contactInfo.email === "string" && contactInfo.email.trim()
      ? contactInfo.email.trim()
      : "") || STATIC_EMAIL_FALLBACK;

  const address =
    (typeof contactInfo.address === "string" && contactInfo.address.trim()
      ? contactInfo.address.trim()
      : "") ||
    (typeof footer.address === "string" && footer.address.trim()
      ? footer.address.trim()
      : "") ||
    STATIC_ADDRESS;

  const brandName =
    (typeof navbar.company_name === "string" && navbar.company_name.trim()
      ? navbar.company_name.trim()
      : "") ||
    (typeof footer.company_name === "string" && footer.company_name.trim()
      ? footer.company_name.trim()
      : "") ||
    "Fireplace Pro";

  const trustBadgeSrcs = [1, 2, 3, 4, 5].map((n) =>
    buildImageSrc(IMAGE_BASE, `footer/footer${n}.webp`),
  );

  const copyrightYear = new Date().getFullYear();

  return (
    <footer className="font-barlow text-white antialiased">
      <FullContainer
        id="footer"
        className="bg-[#1C1C1C] py-6 mb-16 md:mb-0"
      >
        <Container className="max-w-[880px] lg:px-0!">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-col  ">
              <nav
                className="flex flex-wrap gap-x-6 lg:gap-x-10 gap-y-2 text-[12px] md:text-sm text-white/95"
                aria-label="Footer"
              >
                {STATIC_NAV.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="hover:text-orange-400 transition-colors whitespace-nowrap"
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="flex pt-12 flex-wrap gap-2 sm:gap-3  ">
                {trustBadgeSrcs.map((src, index) =>
                  src ? (
                    <div
                      key={index}
                      className="h-9 w-9 "
                    >
                      <Image
                        title="Trust badge"
                        src={src}
                        alt=""
                        width={52}
                        height={52}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ) : null,
                )}
              </div>

              <Link
                href={telHref(phoneDisplay)}
                title="Call now"
                className="inline-flex max-w-full mt-4 mb-6 items-center gap-4 rounded-lg bg-[#F59402] w-fit px-3 py-0.5 text-white shadow-lg shadow-black/20 transition hover:brightness-95 sm:max-w-md"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Phone className="h-6 w-6" strokeWidth={2} aria-hidden />
                </span>
                <span className="flex min-w-0 flex-col text-left leading-tight">
                  <span className="text-[10px] text-center font-semibold uppercase tracking-wide text-white/90">
                    Call now
                  </span>
                  <span className="font-montserrat text-sm font-bold tracking-tight sm:text-base">
                    {phoneDisplay}
                  </span>
                </span>
              </Link>
            </div>

            <div className=" max-w-[270px]">
                <h3 className={`${rubik.className} text-white  text-lg md:text-xl font-bold mb-4`}>Stay Tuned With Us</h3>
                <div className="flex flex-col gap-2 md:gap-2">
                  <div className="flex items-start gap-1.5">
                    <FontAwesomeIcon
                      icon={byPrefixAndName.fas["map-pin"]}
                      className={`${iconClass} mt-0.5 ${iconAccent} shrink-0`}
                    />
                    <span className="text-white/95 text-[14px] leading-relaxed">{address}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className={`${iconClass} ${iconAccent} shrink-0`}
                    />
                    <Link
                      href={`mailto:${email}`}
                      className="text-white/95 text-[14px] hover:text-white transition-colors duration-200"
                    >
                      {email}
                    </Link>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FontAwesomeIcon
                      icon={byPrefixAndName.fas["square-phone"]}
                      className={`${iconClass} ${iconAccent} shrink-0 `}
                    />
                    <Link
                      href={`tel:${phoneDisplay}`}
                      className="text-white/95 text-[14px] hover:text-white transition-colors duration-200"
                    >
                      {phoneDisplay}
                    </Link>
                  </div>
                </div>
              </div>
          </div>

          <div
            className="my-4 h-px w-full bg-neutral-600 "
            role="presentation"
          />
          <div className="flex flex-col items-center gap-6 pb-2 md:pb-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <div>
                {navbar?.logo ? (
                  <Logo
                    logo={navbar.logo}
                    imagePath={navbar.imagePath ?? IMAGE_BASE}
                    tagline={navTagline}
                    taglineClassName="!text-white/90"
                    className="font-serif font-bold text-white md:text-2xl lg:text-[1.65rem]"
                  />
                ) : (
                  <>
                    <p className="font-montserrat text-2xl font-bold tracking-tight text-white md:text-3xl">
                      {brandName}
                    </p>
                    <p className="mt-1 text-base text-white/90">{navTagline}</p>
                  </>
                )}
              </div>
            </div>
            <p className="text-sm text-neutral-400">
              Copyright © {copyrightYear} Missouri | Powered by Fireplace-Pro
            </p>
          </div>
        </Container>
      </FullContainer>
    </footer>
  );
}
