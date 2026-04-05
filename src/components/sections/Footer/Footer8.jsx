"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Archivo } from "next/font/google";
import { Clock4, Mail, Phone } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Orange tile + dark glyph (reference “phone-square” style) */
const FOOTER_ICON_BG = "#D98200";
const FOOTER_ICON_FG = "#082752";

function FooterSquareIconBadge({ children, className }) {
  return (
    <span
      className={cn(
        "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px]",
        className,
      )}
      style={{ backgroundColor: FOOTER_ICON_BG }}
    >
      {children}
    </span>
  );
}

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Footer8({ content }) {
  const footer = content?.footer ?? {};
  const contactInfo = content?.contact_info ?? {};
  const phone = contactInfo.phone ?? content?.navbar?.phone ?? "";
  const email = contactInfo.email ?? "";
  const workingHours = contactInfo.working_hours ?? "Monday - Friday: 7AM - 8PM";
  const statement = footer.value ?? footer.statement ?? "";
  const bgPath = footer.file_name ?? "footer/footerbg.webp";
  const bgSrc = buildImageSrc(IMAGE_BASE, bgPath);
  const companies = [1, 2, 3, 4, 5].map((n) => buildImageSrc(IMAGE_BASE, `footer/footer${n}.webp`));

  return (
    <footer>
      <FullContainer
        id="footer"
        className="relative mb-12 min-h-0 w-full overflow-hidden bg-[#082752] py-6 sm:py-8 md:py-9 md:mb-0"
      >
        {bgSrc ? (
          <Image
            title="Footer Image"
            src={bgSrc}
            alt="Footer background"
            fill
            className="w-full absolute top-0 left-0 h-full object-cover opacity-20"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b3d84]/30 to-[#051a3a]/80" />
        <Container className="relative z-10">
          <div className="grid w-full grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
            <div className="w-full min-w-0 max-w-full lg:max-w-[min(100%,36rem)]">
              <h3
                className={cn(
                  archivo.className,
                  "mb-2 text-[clamp(1.125rem,3.5vw,25px)] font-bold leading-tight text-white sm:mb-3 md:text-[25px]",
                )}
                data-animate-once={true}
              >
                Information
              </h3>
              <div className="mb-4 flex flex-wrap items-center gap-2 sm:gap-3">
                {companies.map((src, index) =>
                  src ? (
                    <div
                      key={index}
                      className="relative flex h-8 w-14 shrink-0 items-center justify-center sm:h-9 sm:w-16 md:h-10 md:w-[4.75rem] lg:h-[46px] lg:w-[82px]"
                    >
                      <Image
                        title="Company logo"
                        src={src}
                        alt="Company Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : null
                )}
              </div>
              {statement ? (
                <p className="max-w-full text-[17px] leading-[1.45] text-white/95 lg:max-w-[61rem]">
                  {statement}
                </p>
              ) : null}
            </div>
            <div className="w-full min-w-0 lg:pl-8 xl:pl-16">
              <h3
                className={cn(
                  archivo.className,
                  "mb-4 text-[clamp(1.125rem,3.5vw,25px)] font-bold leading-tight text-white sm:mb-6 md:text-[25px]",
                )}
                data-animate-once={true}
              >
                Contact Info
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-start gap-3">
                  <FooterSquareIconBadge aria-hidden>
                    <Phone
                      className="h-[11px] w-[11px]"
                      style={{ color: FOOTER_ICON_FG }}
                      strokeWidth={2.25}
                      aria-hidden
                    />
                  </FooterSquareIconBadge>
                  <Link
                    title="Call Button"
                    href={phone ? `tel:${phone}` : "#"}
                    className="min-w-0 break-words text-[17px] leading-[1.45] text-white/95"
                  >
                    {phone || "(656) 245-0412"}
                  </Link>
                </li>
                {email ? (
                  <li className="flex items-start gap-3">
                    <FooterSquareIconBadge aria-hidden>
                      <Mail
                        className="h-[11px] w-[11px]"
                        style={{ color: FOOTER_ICON_FG }}
                        strokeWidth={2.25}
                        aria-hidden
                      />
                    </FooterSquareIconBadge>
                    <Link
                      title="Email Button"
                      href={`mailto:${email}`}
                      className="min-w-0 break-all text-[17px] leading-[1.45] text-white/95"
                    >
                      {email}
                    </Link>
                  </li>
                ) : null}
                <li className="flex items-start gap-3">
                  <FooterSquareIconBadge aria-hidden>
                    <Clock4
                      className="h-[11px] w-[11px]"
                      style={{ color: FOOTER_ICON_FG }}
                      strokeWidth={2.25}
                      aria-hidden
                    />
                  </FooterSquareIconBadge>
                  <span className="text-[17px] leading-[1.45] text-white/95">
                    {workingHours}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 sm:mt-7">
            <div className="inline-flex w-fit max-w-full flex-wrap gap-4 border-t border-white/30 pt-3 sm:gap-6 sm:pt-3.5">
              <Link
                title="Privacy Policy"
                href="/privacy-policy"
                className="text-[17px] text-white/90"
              >
                Privacy Policy
              </Link>
              <Link
                title="Terms and conditions"
                href="/terms-and-conditions"
                className="text-[17px] text-white/90"
              >
                Terms and conditions
              </Link>
            </div>
          </div>
        </Container>
      </FullContainer>
    </footer>
  );
}
