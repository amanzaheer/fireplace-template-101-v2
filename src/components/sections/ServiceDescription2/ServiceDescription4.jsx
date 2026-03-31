"use client";

import React from "react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins, Inter, Rubik } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const contentStyles =
  "[&_h1]:text-[#212020] [&_h1]:font-bold [&_h1]:text-3xl md:[&_h1]:text-4xl [&_h1]:text-center [&_h1]:mb-3 " +
  "[&_h2]:text-[#212020] [&_h2]:font-bold [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:text-center [&_h2]:mb-3 [&_h2]:mt-4 " +
  "[&_h3]:text-[#212020] [&_h3]:font-semibold [&_h3]:text-xl [&_h3]:text-center [&_h3]:mb-2 [&_h3]:mt-3 " +
  "[&_p]:text-[#6e6e6e] [&_p]:text-[16px] [&_p]:leading-[21px] [&_p]:text-center [&_p]:mb-3 " +
  "[&_li]:text-[#6e6e6e] [&_li]:text-[16px] [&_li]:leading-[21px] " +
  "[&_ul]:pl-5 [&_ul]:list-disc [&_ul]:mb-3 [&_ol]:pl-5 [&_ol]:list-decimal [&_ol]:mb-3 " +
  "[&_strong]:text-[#212020] [&_strong]:font-semibold " +
  "[&_a]:text-[#f59403] [&_a]:underline";

function PhoneCallIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        fill="currentColor"
        d="M1 2h8.58l1.487 6.69l-1.86 1.86a14.1 14.1 0 0 0 4.243 4.242l1.86-1.859L22 14.42V23h-1a19.9 19.9 0 0 1-10.85-3.196a20.1 20.1 0 0 1-5.954-5.954A19.9 19.9 0 0 1 1 3z"
      />
    </svg>
  );
}

export default function ServiceDescription3({ content }) {
  const text = content?.service_description2?.description ?? "";
  const html = text ? md.render(text) : "";
  if (!html && !text) return null;

  const title = content?.service_description2?.title ?? "";
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  return (
    <FullContainer id="service_description2" className="py-10 md:py-14 bg-[#efefef]">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="bg-white  shadow-sm border border-[#e5e7eb] p-6 md:p-10">
            {title ? (
              <h2 className={`${poppins.className} text-3xl md:text-5xl font-extrabold tracking-tight text-[#212020] text-center mb-6`}>
                {title}
              </h2>
            ) : null}
            <div
              className={`${inter.className} ${contentStyles} mx-auto`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
            {phone ? (
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-8 mt-2 border-t border-[#e5e7eb]">
                <a
                  href={`tel:${phone}`}
                  className={`${rubik.className} inline-flex max-w-full items-center justify-center gap-2 bg-[#212020] text-white uppercase tracking-wide font-bold px-7 py-3 text-sm hover:bg-[#111827] transition-colors duration-200`}
                >
                  Call Us Today
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href={`tel:${phone}`}
                  className={`${rubik.className} inline-flex max-w-full items-center justify-center gap-2 bg-[#f59402] text-white font-bold px-6 py-3 text-base hover:cursor-pointer transition-colors duration-200`}
                >
                  <PhoneCallIcon className="w-4 h-4 shrink-0" />
                  <span>{phone}</span>
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
