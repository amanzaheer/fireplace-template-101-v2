"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Footer3({ content }) {
  const footer = content?.footer ?? {};
  const contactInfo = content?.contact_info ?? {};
  const phone = contactInfo.phone ?? content?.navbar?.phone ?? "";
  const email = contactInfo.email ?? "";
  const workingHours = contactInfo.working_hours ?? "Monday - Friday: 7AM - 8PM";
  const address = contactInfo.address ?? workingHours;
  const statement = footer.value ?? footer.statement ?? "";
  const bgPath = footer.file_name ?? "footer/footerbg.webp";
  const bgSrc = buildImageSrc(IMAGE_BASE, bgPath);
  const companies = [1, 2, 3, 4, 5].map((n) => buildImageSrc(IMAGE_BASE, `footer/footer${n}.webp`));

  return (
    <footer>
      <FullContainer
        id="footer"
        className="bg-black py-10 md:py-12 mb-16 md:mb-0 relative"
      >
        {bgSrc ? (
          <Image
            title="Footer Image"
            src={bgSrc}
            alt="Footer background"
            fill
            className="w-full absolute top-0 left-0 h-full object-cover opacity-15"
          />
        ) : null}
        <Container className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 justify-between w-full">
            <div className="max-w-[560px]">
              <h3 className="text-white text-4xl md:text-5xl font-extrabold mb-4">
                Information
              </h3>
              <div className="flex flex-wrap gap-2.5 mb-5 items-center">
                {companies.map((src, index) =>
                  src ? (
                    <div
                      key={index}
                      className="relative h-12 md:h-14 w-20 md:w-24 overflow-hidden"
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
                <p className="text-white/95 text-lg md:text-[30px] leading-relaxed max-w-[520px]">
                  {statement}
                </p>
              ) : null}
            </div>

            <div className="w-full">
              <h3 className="text-white text-4xl md:text-5xl font-extrabold mb-4">
                Stay Tuned With Us
              </h3>
              <ul className="space-y-5 md:space-y-6 mt-2">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 text-[#d62828] shrink-0" />
                  <span className="text-white/95 text-lg md:text-[30px] leading-relaxed">
                    {address}
                  </span>
                </li>
                {email ? (
                  <li className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#d62828] shrink-0" />
                    <Link
                      title="Email Button"
                      href={`mailto:${email}`}
                      className="text-white/95 text-lg md:text-[30px] hover:text-white transition-colors"
                    >
                      {email}
                    </Link>
                  </li>
                ) : null}
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#d62828] shrink-0" />
                  <Link
                    title="Call Button"
                    href={phone ? `tel:${phone}` : "#"}
                    className="text-white/95 text-lg md:text-[30px] hover:text-white transition-colors"
                  >
                    {phone || "(+62 ) 123 456 789"}
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
