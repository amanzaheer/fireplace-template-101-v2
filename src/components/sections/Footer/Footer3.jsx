"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapPin,
  faSquarePhone,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Rubik } from "next/font/google";

config.autoAddCss = false;

const byPrefixAndName = {
  fas: {
    "map-pin": faMapPin,
    "square-phone": faSquarePhone,
  },
};

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const iconClass = "text-[16px] md:text-[20px]";
const iconAccent = "text-[#f3a008]";

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
            height={100}
            width={100}
            className="w-full absolute top-0 left-0 h-full object-cover opacity-15"
          />
        ) : null}
        <Container className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 justify-between w-full">
            <div className="max-w-[560px]">
              <h3 className={`${rubik.className} text-white text-2xl md:text-3xl font-bold mb-4`}>
                Information
              </h3>
              <div className="flex flex-wrap gap-2.5 mb-5 items-center h-fit">
                {companies.map((src, index) =>
                  src ? (
                    <div
                      key={index}
                      className="relative h-10 md:h-12 w-16 md:w-18 "
                    >
                      <Image
                        title="Company logo"
                        src={src}
                        alt="Company Logo"
                        height={100}
                        width={100}
                        className="object-contain"
                      />
                    </div>
                  ) : null
                )}
              </div>
              {statement ? (
                <p className={`${rubik.className} text-white/95 text-lg md:text-[18px] leading-relaxed max-w-[520px]`}>
                  {statement}
                </p>
              ) : null}
              <nav
                className={`${rubik.className} mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px] md:text-[17px]`}
                aria-label="Legal"
              >
                <Link
                  href="/privacy-policy"
                  className="text-white/95 hover:text-white transition-colors duration-200 underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </Link>
                <span className="text-white/40 select-none" aria-hidden>
                  ·
                </span>
                <Link
                  href="/terms-and-conditions"
                  className="text-white/95 hover:text-white transition-colors duration-200 underline-offset-4 hover:underline"
                >
                  Terms and Conditions
                </Link>
              </nav>
            </div>

            <div className="w-full flex flex-row items-start justify-center">
             
              <div className=" text-white">
              <h3 className={`${rubik.className} text-white  text-2xl md:text-3xl font-bold mb-4`}>Stay Tuned With Us</h3>
              <div className="flex flex-col gap-2 md:gap-7">
                <div className="flex items-start gap-3 ">
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fas["map-pin"]}
                    className={`${iconClass} mt-0.5 ${iconAccent} shrink-0`}
                  />
                  <span className="text-white/95 text-[17px] leading-relaxed">{address}</span>
                </div>
                <div className="flex items-center gap-3">
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
                </div>
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fas["square-phone"]}
                    className={`${iconClass} ${iconAccent} shrink-0 `}
                  />
                  <Link
                    href={`tel:${phone}`}
                    className="text-white/95 text-[17px] hover:text-white transition-colors duration-200"
                  >
                    {phone}
                  </Link>
                </div>
              </div>
            </div>

            </div>
          </div>
        </Container>
      </FullContainer>
    </footer>
  );
}
