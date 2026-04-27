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
        <Container className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-col  ">
              <nav
                className="flex flex-wrap gap-x-6 lg:gap-x-10 gap-y-2 text-[14px] md:text-[17px] text-white/95"
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
                      className="h-11 w-11 "
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
                <span className="flex h-10 w-10 shrink-0 items-center justify-center ">
                <svg
                      width="48"
                      height="48"
                      viewBox="0 0 38 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 h-7 w-7 md:h-7 md:w-7"
                      aria-hidden
                    >
                      <path
                        d="M26.5556 16.0168C26.1569 15.6181 25.9575 15.1246 25.9575 14.5362C25.9575 13.9478 26.1569 13.455 26.5556 13.0577C26.9543 12.6604 27.4471 12.461 28.0341 12.4596C28.6211 12.4582 29.1147 12.6576 29.5148 13.0577C29.9148 13.4578 30.1135 13.9506 30.1107 14.5362C30.108 15.1218 29.9086 15.6154 29.5127 16.0168C29.1167 16.4183 28.6239 16.617 28.0341 16.6128C27.4444 16.6087 26.9515 16.4093 26.5556 16.0148M22.8426 11.5251L20.6622 9.34471C21.6659 8.34102 22.7997 7.57129 24.0637 7.03553C25.3276 6.49977 26.6511 6.23119 28.0341 6.22981C29.4172 6.22842 30.7413 6.497 32.0067 7.03553C33.272 7.57406 34.4052 8.34379 35.4061 9.34471L33.2256 11.5251C32.5334 10.8329 31.7464 10.2965 30.8645 9.91578C29.9827 9.53507 29.0392 9.34471 28.0341 9.34471C27.0291 9.34471 26.0863 9.53507 25.2058 9.91578C24.3253 10.2965 23.5376 10.8329 22.8426 11.5251ZM35.1984 37.3788C30.8722 37.3788 26.5978 36.4361 22.3754 34.5505C18.153 32.665 14.3113 29.991 10.8503 26.5286C7.38925 23.0662 4.71596 19.2245 2.83041 15.0035C0.944854 10.7824 0.0013844 6.50807 0 2.18043C0 1.55745 0.20766 1.0383 0.622981 0.622981C1.0383 0.20766 1.55745 0 2.18043 0H10.5907C11.0752 0 11.5078 0.164744 11.8886 0.494231C12.2693 0.823719 12.4942 1.21274 12.5634 1.66128L13.9132 8.92939C13.9825 9.48315 13.9652 9.95039 13.8613 10.3311C13.7575 10.7118 13.5671 11.0406 13.2903 11.3175L8.2545 16.4052C8.9467 17.6857 9.76834 18.9227 10.7194 20.1161C11.6705 21.3094 12.7178 22.4605 13.8613 23.5694C14.9342 24.6424 16.0591 25.6377 17.2358 26.5556C18.4125 27.4735 19.6585 28.3124 20.9737 29.0724L25.8537 24.1924C26.1652 23.8809 26.5722 23.6477 27.0747 23.4926C27.5773 23.3376 28.0701 23.2939 28.5533 23.3618L35.7176 24.8154C36.2021 24.9538 36.6001 25.2051 36.9116 25.5692C37.2231 25.9333 37.3788 26.3396 37.3788 26.7882V35.1984C37.3788 35.8214 37.1712 36.3405 36.7559 36.7559C36.3405 37.1712 35.8214 37.3788 35.1984 37.3788Z"
                        fill="white"
                      />
                    </svg>
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
                <h3 className={`${rubik.className} text-white  text-[22px] md:text-[25px] font-bold mb-4`}>Stay Tuned With Us</h3>
                <div className="flex flex-col gap-2 md:gap-2">
                  <div className="flex items-start gap-1.5">
                    <FontAwesomeIcon
                      icon={byPrefixAndName.fas["map-pin"]}
                      className={`${iconClass} mt-0.5 ${iconAccent} shrink-0`}
                    />
                    <span className="text-white/95 text-[14px] md:text-[17px] leading-relaxed">{address}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className={`${iconClass} ${iconAccent} shrink-0`}
                    />
                    <Link
                      href={`mailto:${email}`}
                      className="text-white/95 text-[14px] md:text-[17px] hover:text-white transition-colors duration-200"
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
                      className="text-white/95 text-[14px] md:text-[17px] hover:text-white transition-colors duration-200"
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
