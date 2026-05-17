"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import { IMAGE_BASE } from "@/lib/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faEnvelope,
  faSquarePhone,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Rubik } from "next/font/google";

/** Matches Footer12 “Stay Tuned With Us” icon sizes */
const contactIconClass = "text-[16px] md:text-[20px]";
const iconAccent = "text-[#FF0504]";

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

function normalizeMenuHref(link, label) {
  if (!link || typeof link !== "string") return "#";
  const normalizedLink = link.trim().toLowerCase();
  const normalizedLabel = String(label ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  // Keep footer Services item anchored to the Our Services section.
  if (
    normalizedLabel === "services" ||
    normalizedLink === "services" ||
    normalizedLink === "/services" ||
    normalizedLink === "#services" ||
    normalizedLink === "/#services"
  ) {
    return "/#our_services";
  }

  if (link.startsWith("/") || link.startsWith("#")) return link;
  return `/#${link}`;
}

export default function Footer25({ content }) {
  const footer = content?.footer ?? {};
  const contactInfo = content?.contact_info ?? {};
  const navbar = content?.navbar ?? {};
  const menuItems = Array.isArray(navbar?.menu_items) ? navbar.menu_items : [];
  const footerNav = menuItems
    .map((item) => ({
      label: item?.title,
      href: normalizeMenuHref(item?.link, item?.title),
    }))
    .filter((item) => item.label && item.href);

  const navTagline =
    typeof navbar?.tagline === "string" && navbar.tagline.trim()
      ? navbar.tagline.trim()
      : "";

  /** Same sources as Footer12 */
  const phone =
    typeof contactInfo.phone === "string" && contactInfo.phone.trim()
      ? contactInfo.phone.trim()
      : typeof navbar.phone === "string" && navbar.phone.trim()
        ? navbar.phone.trim()
        : "";

  const email =
    typeof contactInfo.email === "string" ? contactInfo.email.trim() : "";

  const workingHours =
    contactInfo.working_hours ?? "Monday - Friday: 7AM - 8PM";
    
  const brandName =
    (typeof navbar.company_name === "string" && navbar.company_name.trim()
      ? navbar.company_name.trim()
      : "") ||
    (typeof footer.company_name === "string" && footer.company_name.trim()
      ? footer.company_name.trim()
      : "");

  const description =
    typeof footer.value === "string" && footer.value.trim()
      ? footer.value.trim()
      : "";

  const callNowIconRaw =
    typeof footer.call_now_icon === "string" && footer.call_now_icon.trim()
      ? footer.call_now_icon.trim()
      : "/st-icons/Temp13/call1.png";
  const callNowIconSrc =
    callNowIconRaw.startsWith("/") || callNowIconRaw.startsWith("http")
      ? callNowIconRaw
      : buildImageSrc(IMAGE_BASE, callNowIconRaw);

  const trustBadgeSrcs = [1, 2, 3, 4, 5].map((n) =>
    buildImageSrc(IMAGE_BASE, `footer/footer${n}.webp`),
  );

  return (
    <footer className="font-barlow text-white antialiased border">
      <FullContainer id="footer" className="mb-16 bg-[#000000] py-10 md:mb-0 md:py-12">
        <Container className="max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Top: logo and nav on left side */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-start sm:gap-12 md:gap-16">
            <div className="shrink-0">
              {navbar?.logo ? (
                <Logo
                  logo={navbar.logo}
                  imagePath={navbar.imagePath ?? IMAGE_BASE}
                  tagline={navTagline || undefined}
                  taglineClassName={navTagline ? "!text-white/90" : undefined}
                  className="font-serif font-bold text-white md:text-2xl lg:text-[1.65rem]"
                />
              ) : brandName ? (
                <>
                  <p className="font-montserrat text-2xl font-bold tracking-tight text-white md:text-3xl">
                    {brandName}
                  </p>
                  {navTagline ? (
                    <p className="mt-1 text-base text-white/90">{navTagline}</p>
                  ) : null} 
                </>
              ) : null}
            </div>

            {footerNav.length > 0 ? (
              <nav
                className="flex flex-wrap items-center justify-start gap-x-5 gap-y-2 text-sm  ml-34 text-white md:gap-x-10 md:text-[17px]"
                aria-label="Footer"
              >
                {footerNav.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="transition-colors hover:text-red-600"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            ) : null}
          </div>

          {/* Main: all content kept on left side (no map block) */}
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-12 lg:max-w-[860px]">
            <div className="flex min-w-0 flex-col">
              {description ? (
                <p className="max-w-[350px] text-[15px] leading-relaxed text-white/95 md:text-base">
                  {description}
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
                {trustBadgeSrcs.map((src, index) =>
                  src ? (
                    <div key={index} className="h-10 w-10 sm:h-10 sm:w-10">
                      <Image
                        title="Trust badge"
                        src={src}
                        alt=""
                        width={54}
                        height={54}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ) : null,
                )}
              </div>
         
              {phone ? (
                <Link
                  href={telHref(phone)}
                  title="Call now"
                  className="mt-8 inline-flex max-w-full items-center gap-4  h-[50px] rounded-full bg-[#CC3333] px-5 py-3 text-white shadow-lg shadow-black/25 transition hover:brightness-95n w-fit sm:w-fit sm:max-w-md"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center">
                    <Image
                      src={callNowIconSrc}
                      alt=""
                      width={40}
                      height={40}
                      className="h-12 w-12 object-contain"
                      aria-hidden
                    />
                  </span>
            
                  <span className="flex min-w-0 flex-col text-center leading-tight">
                    <span className=" font-poppins text-[12.6px] font-medium uppercase tracking-wide text-white">
                      Call now
                    </span>
                    <span className="font-poppins text-base font-bold tracking-tight sm:text-lg">
                      {phone}
                    </span>
                  </span>
                </Link>
              ) : null}
            </div>

            <div className="flex w-full flex-col items-start justify-start">
              <h3
                className={`${rubik.className} mb-5 w-full text-left text-lg font-bold text-white md:text-[25px]`}
              >
                Stay Tuned With Us
              </h3>
              <div className="flex w-full flex-col items-start gap-2 text-left md:gap-3">
                <div className="flex w-full items-start gap-3">
                  <div className="flex min-w-0 items-center gap-1.5 text-left">
                    <FontAwesomeIcon
                      icon={faClock}
                      className={`${contactIconClass} ${iconAccent} shrink-0`}
                    />
                    <span className="text-left text-sm text-white md:text-[15px]">
                      {workingHours}
                    </span>
                  </div>
                </div>
                <div className="flex w-full items-center justify-start gap-3 text-left">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className={`${contactIconClass} ${iconAccent} shrink-0`}
                  />
                  <Link
                    href={`mailto:${email}`}
                    className="min-w-0 wrap-break-word text-left text-[17px] text-white/95 transition-colors duration-200 hover:text-white"
                  >
                    {email}
                  </Link>
                </div>
                <div className="flex w-full items-center justify-start gap-3 text-left">
                  <FontAwesomeIcon
                    icon={faSquarePhone}
                    className={`${contactIconClass} ${iconAccent} shrink-0`}
                  />
                  <Link
                    href={phone ? telHref(phone) : "#"}
                    className="text-left text-[17px] text-white/95 transition-colors duration-200 hover:text-white"
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
   




