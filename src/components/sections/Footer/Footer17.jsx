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

export default function Footer5({ content }) {
  const footer = content?.footer ?? {};
  const contactInfo = content?.contact_info ?? {};
  const phone = contactInfo.phone ?? content?.navbar?.phone ?? "";
  const email = contactInfo.email ?? "";
  const workingHours = contactInfo.working_hours ?? "Monday - Friday: 7AM - 8PM";
  const statement = footer.value ?? footer.statement ?? "";
  const companies = [1, 2, 3, 4, 5].map((n) => buildImageSrc(IMAGE_BASE, `footer/footer${n}.webp`));

  return (
    <footer>
      <FullContainer id="footer" className="bg-[#0F1F41] py-8 md:py-12 mb-16 md:mb-0 relative overflow-hidden">
        <Container className="relative z-10">
          <div className="rounded-sm bg-[#0F1F41] px-5 py-6 md:px-10 md:py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 justify-between w-full">
              <div className="max-w-[560px]">
                <h3 className="text-white text-3xl md:text-[40px] leading-none font-semibold mb-5">Information</h3>
                <div className="flex items-center gap-2 md:gap-2.5 mb-5">
                {companies.map((src, index) =>
                  src ? (
                    <div
                      key={index}
                      className="w-11 h-11 md:w-[56px] md:h-[56px] flex items-center justify-center overflow-hidden bg-white rounded-full relative shrink-0"
                    >
                      <Image
                        title="Company logo"
                        src={src}
                        alt="Company Logo"
                        width={80}
                        height={60}
                        className="h-[80%] w-[80%] object-contain"
                      />
                    </div>
                  ) : null
                )}
                </div>
                {statement ? (
                  <p className="text-white text-base md:text-[15px] leading-[1.8] font-semibold">{statement}</p>
                ) : null}
              </div>
              <div className="w-full md:max-w-[460px] md:ml-auto">
                <h3 className="text-white text-3xl md:text-[40px] leading-none font-semibold mb-5">Stay Tuned With Us</h3>
                <ul className="space-y-3 md:space-y-4 mt-2">
                  <li className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#FF0504] mt-1 shrink-0" />
                    <Link
                      title="Call Button"
                      href={phone ? `tel:${phone}` : "#"}
                      className="text-white text-sm md:text-[15px] leading-relaxed font-semibold"
                    >
                      {phone || "(656) 245-0412"}
                    </Link>
                  </li>
                  {email ? (
                    <li className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-[#FF0504] mt-1 shrink-0" />
                      <Link
                        title="Email Button"
                        href={`mailto:${email}`}
                        className="text-white text-sm md:text-[15px] leading-relaxed font-semibold"
                      >
                        {email}
                      </Link>
                    </li>
                  ) : null}
                  <li className="flex items-start gap-3">
                    <Clock4 className="w-4 h-4 text-[#FF0504] mt-1 shrink-0" />
                    <span className="text-white text-sm md:text-[15px] leading-relaxed font-semibold">{workingHours}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-7 pt-4 border-t border-white/20 w-full">
              <div className="flex flex-row justify-start items-start gap-6">
                <div className="flex gap-6 flex-wrap">
                  <Link
                    title="Privacy Policy"
                    href="/privacy-policy"
                    className="text-white/85 text-sm md:text-[15px] hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    title="Terms and conditions"
                    href="/terms-and-conditions"
                    className="text-white/85 text-sm md:text-[15px] hover:text-white transition-colors"
                  >
                    Terms and conditions
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