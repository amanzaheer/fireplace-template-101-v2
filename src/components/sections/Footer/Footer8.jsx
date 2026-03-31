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
        className="relative overflow-hidden bg-[#082752] py-10 md:py-12 mb-16 md:mb-0"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 justify-between w-full">
            <div className="max-w-[560px]">
              <h3 className="text-white text-[38px] md:text-[44px] leading-none font-bold mb-4">
                Information
              </h3>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                {companies.map((src, index) =>
                  src ? (
                    <div
                      key={index}
                      className="relative h-[40px] w-[70px] md:h-[46px] md:w-[82px] flex items-center justify-center"
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
                <p className="text-white/95 text-[24px] md:text-[28px] leading-[1.35] max-w-[980px]">
                  {statement}
                </p>
              ) : null}
            </div>
            <div className="w-full lg:pl-16">
              <h3 className="text-white text-[38px] md:text-[44px] leading-none font-bold mb-6">
                Contact Info
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="w-6 h-6 text-[#f7a11a] mt-1" />
                  <Link
                    title="Call Button"
                    href={phone ? `tel:${phone}` : "#"}
                    className="text-white/95 text-[24px] md:text-[28px] leading-[1.35]"
                  >
                    {phone || "(656) 245-0412"}
                  </Link>
                </li>
                {email ? (
                  <li className="flex items-start gap-3">
                    <Mail className="w-6 h-6 text-[#f7a11a] mt-1" />
                    <Link
                      title="Email Button"
                      href={`mailto:${email}`}
                      className="text-white/95 text-[24px] md:text-[28px] leading-[1.35] break-all"
                    >
                      {email}
                    </Link>
                  </li>
                ) : null}
                <li className="flex items-start gap-3">
                  <Clock4 className="w-6 h-6 text-[#f7a11a] mt-1" />
                  <span className="text-white/95 text-[24px] md:text-[28px] leading-[1.35]">
                    {workingHours}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-4 border-t border-white/30">
            <div className="flex flex-wrap gap-6">
              <Link
                title="Privacy Policy"
                href="/privacy-policy"
                className="text-white/90 text-sm md:text-base"
              >
                Privacy Policy
              </Link>
              <Link
                title="Terms and conditions"
                href="/terms-and-conditions"
                className="text-white/90 text-sm md:text-base"
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
