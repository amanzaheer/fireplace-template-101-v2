"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock4, Mail, Phone } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

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
              <h3 className="mb-2 text-[clamp(1.5rem,4vw,2.75rem)] font-bold leading-tight text-white sm:mb-3 md:text-[2.75rem]">
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
                <p className="max-w-full text-[clamp(1rem,2.8vw,1.75rem)] leading-[1.35] text-white/95 md:text-[1.75rem] lg:max-w-[61rem]">
                  {statement}
                </p>
              ) : null}
            </div>
            <div className="w-full min-w-0 lg:pl-8 xl:pl-16">
              <h3 className="mb-4 text-[clamp(1.5rem,4vw,2.75rem)] font-bold leading-tight text-white sm:mb-6 md:text-[2.75rem]">
                Contact Info
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-[#f7a11a] sm:h-6 sm:w-6" />
                  <Link
                    title="Call Button"
                    href={phone ? `tel:${phone}` : "#"}
                    className="min-w-0 break-words text-[clamp(1rem,2.8vw,1.75rem)] leading-[1.35] text-white/95 md:text-[1.75rem]"
                  >
                    {phone || "(656) 245-0412"}
                  </Link>
                </li>
                {email ? (
                  <li className="flex items-start gap-3">
                    <Mail className="mt-1 h-5 w-5 shrink-0 text-[#f7a11a] sm:h-6 sm:w-6" />
                    <Link
                      title="Email Button"
                      href={`mailto:${email}`}
                      className="min-w-0 break-all text-[clamp(1rem,2.8vw,1.75rem)] leading-[1.35] text-white/95 md:text-[1.75rem]"
                    >
                      {email}
                    </Link>
                  </li>
                ) : null}
                <li className="flex items-start gap-3">
                  <Clock4 className="mt-1 h-5 w-5 shrink-0 text-[#f7a11a] sm:h-6 sm:w-6" />
                  <span className="text-[clamp(1rem,2.8vw,1.75rem)] leading-[1.35] text-white/95 md:text-[1.75rem]">
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
                className="text-sm text-white/90 md:text-base"
              >
                Privacy Policy
              </Link>
              <Link
                title="Terms and conditions"
                href="/terms-and-conditions"
                className="text-sm text-white/90 md:text-base"
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
