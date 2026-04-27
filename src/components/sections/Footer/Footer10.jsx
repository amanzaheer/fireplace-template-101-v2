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
  const workingHours = contactInfo.working_hours ?? "Monday - Friday: 7AM - 8PM";
  const statement = footer.value ?? footer.statement ?? "";
  const bgPath = footer.file_name ?? "footer/footerbg.webp";
  const bgSrc = buildImageSrc(IMAGE_BASE, bgPath);
  const companies = [1, 2, 3, 4, 5].map((n) => buildImageSrc(IMAGE_BASE, `footer/footer${n}.webp`));

  return (
    <footer>
      <FullContainer
        id="footer"
        className="bg-black py-6 md:py-9 mb-16 md:mb-0 relative"
      >
        {bgSrc ? (
          <Image
            title="Footer Image"
            src={bgSrc}
            alt="Footer background"
            fill
            className="w-full absolute top-0 left-0 h-full object-cover opacity-0"
          />
        ) : null}
        <Container className={`relative z-10 ${archivo.className}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 w-full items-start">
            <div className="max-w-[560px]">
              <h3 className="text-white text-[26px] md:text-[28px] font-extrabold mb-5 leading-none">
                Information
              </h3>
              <div className="flex gap-2 mb-4 flex-wrap">
                {companies.map((src, index) =>
                  src ? (
                    <div
                      key={index}
                      className="w-[54px] h-[54px] md:w-[62px] md:h-[62px] flex items-center justify-center overflow-hidden relative"
                    >
                      <Image
                        title="Company logo"
                        src={src}
                        alt="Company Logo"
                        width={60}
                        height={60}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ) : null
                )}
              </div>
              {statement ? (
                <p className="text-white/95 text-[16px] md:text-[18px] leading-relaxed max-w-[620px]">
                  {statement}
                </p>
              ) : null}
            </div>

            <div className="w-full md:pl-10 lg:pl-20">
              <h3 className="text-white text-[26px] md:text-[28px] font-extrabold mb-5 leading-none">
                Stay Tuned With Us
              </h3>
              <ul className="space-y-4 md:space-y-5">
                <li className="flex items-start gap-3.5">
                  <div className="w-6 h-auto whitespace-nowrap shrink-0 mt-1">
                    <Image
                      src="/st-icons/Temp10/pin.png"
                      alt="Location"
                      width={16}
                      height={16}
                      className="w-auto h-5 md:h-[19px]"
                    />
                  </div>
                  <span className="text-white text-[18px] md:text-[22px] leading-snug">
                    {workingHours}
                  </span>
                </li>
                {email ? (
                  <li className="flex items-center gap-3.5">
                    <div className="w-6 h-auto whitespace-nowrap shrink-0">
                      <Image
                        src="/st-icons/Temp10/mail.png"
                        alt="Email"
                        width={16}
                        height={16}
                        className="w-auto h-5 md:h-[19px]"
                      />
                    </div>
                    <Link
                      title="Email Button"
                      href={`mailto:${email}`}
                      className="text-white text-[18px] md:text-[22px]"
                    >
                      {email}
                    </Link>
                  </li>
                ) : null}
                <li className="flex items-center gap-3.5">
                  <div className="w-5 h-auto whitespace-nowrap shrink-0">
                    <Image
                      src="/st-icons/Temp10/phone.png"
                      alt="Phone"
                      width={16}
                      height={16}
                      className="w-auto h-5 md:h-[19px]"
                    />
                  </div>
                  <Link
                    title="Call Button"
                    href={phone ? `tel:${phone}` : "#"}
                    className="text-white text-[18px] md:text-[22px]"
                  >
                    {phone || "(656) 245-0412"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-2 pt-2 w-full pb-8 md:pb-0">
            <div className="flex flex-row justify-start items-start gap-6">
              <div className="flex gap-6">
                <Link
                  title="Privacy Policy"
                  href="/privacy-policy"
                  className="text-white text-sm md:text-[15px]"
                >
                  {/* Privacy Policy */}
                </Link>
                <Link
                  title="Terms and conditions"
                  href="/terms-and-conditions"
                  className="text-white text-sm md:text-[15px]"
                >
                  {/* Terms and conditions */}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </FullContainer>
    </footer>
  );
}
