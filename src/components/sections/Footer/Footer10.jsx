"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Archivo } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Footer10({ content }) {
  const footer = content?.footer ?? {};
  const contactInfo = content?.contact_info ?? {};
  const phone = contactInfo.phone ?? content?.navbar?.phone ?? "";
  const email = contactInfo.email ?? "";
  const workingHours = contactInfo.working_hours ?? "";
  const statement = footer.value ?? footer.statement ?? "";
  const bgPath = footer.file_name ?? "";
  const bgSrc = buildImageSrc(IMAGE_BASE, bgPath);

  const informationHeading =
    typeof footer.information_heading === "string"
      ? footer.information_heading.trim()
      : "";
  const contactHeading =
    typeof footer.contact_heading === "string"
      ? footer.contact_heading.trim()
      : "";

  const badgePaths = Array.isArray(footer.badge_images)
    ? footer.badge_images.filter((p) => typeof p === "string" && p.trim())
    : [];
  const companyLogos = badgePaths.map((p) => buildImageSrc(IMAGE_BASE, p));

  const legalLinks = Array.isArray(footer.legal_links)
    ? footer.legal_links.filter(
        (l) =>
          l &&
          typeof l.href === "string" &&
          l.href.trim() &&
          typeof l.label === "string" &&
          l.label.trim(),
      )
    : [];

  return (
    <footer>
      <FullContainer
        id="footer"
        className="relative mb-16 bg-black py-6 md:mb-0 md:py-9"
      >
        {bgSrc ? (
          <Image
            title="Footer Image"
            src={bgSrc}
            alt=""
            fill
            className="absolute left-0 top-0 h-full w-full object-cover opacity-0"
          />
        ) : null}
        <Container className={`relative z-10 ${archivo.className}`}>
          <div className="grid w-full grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-24">
            <div className="max-w-[560px]">
              {informationHeading ? (
                <h3 className="mb-5 text-[26px] font-extrabold leading-none text-white md:text-[28px]">
                  {informationHeading}
                </h3>
              ) : null}
              {companyLogos.length > 0 ? (
                <div className="mb-4 flex flex-wrap gap-2">
                  {companyLogos.map((src, index) =>
                    src ? (
                      <div
                        key={index}
                        className="relative flex h-[54px] w-[54px] items-center justify-center overflow-hidden md:h-[62px] md:w-[62px]"
                      >
                        <Image
                          title="Company logo"
                          src={src}
                          alt=""
                          width={60}
                          height={60}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    ) : null,
                  )}
                </div>
              ) : null}
              {statement ? (
                <p className="max-w-[620px] text-[16px] leading-relaxed text-white/95 md:text-[18px]">
                  {statement}
                </p>
              ) : null}
            </div>

            <div className="w-full md:pl-10 lg:pl-20">
              {contactHeading ? (
                <h3 className="mb-5 text-[26px] font-extrabold leading-none text-white md:text-[28px]">
                  {contactHeading}
                </h3>
              ) : null}
              <ul className="space-y-4 md:space-y-5">
                {workingHours ? (
                  <li className="flex items-start gap-3.5">
                    <div className="mt-1 w-6 shrink-0 whitespace-nowrap">
                      <Image
                        src="/st-icons/Temp10/pin.png"
                        alt=""
                        width={16}
                        height={16}
                        className="h-5 w-auto md:h-[19px]"
                      />
                    </div>
                    <span className="text-[18px] leading-snug text-white md:text-[22px]">
                      {workingHours}
                    </span>
                  </li>
                ) : null}
                {email ? (
                  <li className="flex items-center gap-3.5">
                    <div className="w-6 shrink-0 whitespace-nowrap">
                      <Image
                        src="/st-icons/Temp10/mail.png"
                        alt=""
                        width={16}
                        height={16}
                        className="h-5 w-auto md:h-[19px]"
                      />
                    </div>
                    <Link
                      title="Email"
                      href={`mailto:${email}`}
                      className="text-[18px] text-white md:text-[22px]"
                    >
                      {email}
                    </Link>
                  </li>
                ) : null}
                {phone ? (
                  <li className="flex items-center gap-3.5">
                    <div className="w-5 shrink-0 whitespace-nowrap">
                      <Image
                        src="/st-icons/Temp10/phone.png"
                        alt=""
                        width={16}
                        height={16}
                        className="h-5 w-auto"
                      />
                    </div>
                    <Link
                      title="Call"
                      href={`tel:${phone}`}
                      className="text-[18px] text-white md:text-[22px]"
                    >
                      {phone}
                    </Link>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>

          {legalLinks.length > 0 ? (
            <div className="mt-2 w-full pb-8 pt-2 md:pb-0">
              <div className="flex flex-row flex-wrap items-start justify-start gap-6">
                {legalLinks.map((link, i) => (
                  <Link
                    key={`${link.href}-${i}`}
                    title={link.label}
                    href={link.href}
                    className="text-sm text-white md:text-[15px]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </Container>
      </FullContainer>
    </footer>
  );
}
