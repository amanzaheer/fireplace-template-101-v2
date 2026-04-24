"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock4, Mail, Phone } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Archivo } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["700"],
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Footer16({ content }) {
  const footer = content?.footer ?? {};
  const contactInfo = content?.contact_info ?? {};
  const phone = contactInfo.phone ?? content?.navbar?.phone ?? "";
  const email = contactInfo.email ?? "";
  const workingHours = contactInfo.working_hours ?? "Monday - Friday: 7AM - 8PM";
  const statement = footer.value ?? footer.statement ?? "";
  const companies = [1, 2, 3, 4, 5].map((n) => buildImageSrc(IMAGE_BASE, `footer/footer${n}.webp`));

  return (
    <footer>
      <FullContainer
        id="footer"
        style={{ backgroundColor: "#234281" }}
        className="bg-[#234281] py-6 md:py-[52px] md:pb-[52px] mb-16 md:mb-0 relative"
      >
        <Container className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-24 justify-between w-full">
            <div className="max-w-[395px] md:px-2">
              <div className="flex gap-1 mb-2">
                {companies.map((src, index) =>
                  src ? (
                    <div
                      key={index}
                      className="w-full h-full aspect-square flex items-center justify-center overflow-hidden bg-white rounded-full relative"
                    >
                      <Image
                        title="Company logo"
                        src={src}
                        alt="Company Logo"
                        width={60}
                        height={60}
                        className="h-[80%] w-[80%] object-contain"
                      />
                    </div>
                  ) : null
                )}
              </div>
              {statement ? (
                <p className="text-white text-sm md:text-[15px] leading-relaxed">{statement}</p>
              ) : null}
            </div>
            <div className="flex flex-row justify-center items-center md:px-2">
              <div className="lg:pl-[170px] w-full">
                {/* Contact Info heading — Archivo Bold 25px, line-height 35px */}
                <h3
                  className={archivo.className}
                  style={{
                    fontWeight: 700,
                    fontSize: "25px",
                    lineHeight: "35px",
                    letterSpacing: "0%",
                    color: "#ffffff",
                  }}
                >
                  Contact Info
                </h3>
                <ul className="space-y-2 md:space-y-3 mt-5">
                  <li className="flex items-center gap-1.5">
                    <Phone className="w-5 h-5" style={{ color: "#F5521B" }} />
                    <Link
                      title="Call Button"
                      href={phone ? `tel:${phone}` : "#"}
                      className="text-white text-sm md:text-[15px]"
                    >
                      {phone || "(656) 245-0412"}
                    </Link>
                  </li>
                  {email ? (
                    <li className="flex items-center gap-1.5">
                      <Mail className="w-5 h-5" style={{ color: "#F5521B" }} />
                      <Link
                        title="Email Button"
                        href={`mailto:${email}`}
                        className="text-white text-sm md:text-[15px]"
                      >
                        {email}
                      </Link>
                    </li>
                  ) : null}
                  <li className="flex items-center gap-1.5">
                    <Clock4 className="w-5 h-5" style={{ color: "#F5521B" }} />
                    <span className="text-white text-sm md:text-[15px]">{workingHours}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/30 w-full pb-16 md:pb-0">
            <div className="flex flex-row justify-start items-start gap-6">
              <div className="flex gap-6">
                <Link
                  title="Privacy Policy"
                  href="/privacy-policy"
                  className="text-white text-sm md:text-[15px]"
                >
                  Privacy Policy
                </Link>
                <Link
                  title="Terms and conditions"
                  href="/terms-and-conditions"
                  className="text-white text-sm md:text-[15px]"
                >
                  Terms and conditions
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </FullContainer>
    </footer>
  );
}