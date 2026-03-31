"use client";

import React from "react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins, Inter } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const contentStyles =
  "[&_h1]:text-[#212020] [&_h1]:font-bold [&_h1]:text-3xl md:[&_h1]:text-4xl [&_h1]:text-center [&_h1]:mb-3 " +
  "[&_h2]:text-[#212020] [&_h2]:font-bold [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:text-center [&_h2]:mb-3 [&_h2]:mt-6 " +
  "[&_h3]:text-[#212020] [&_h3]:font-bold [&_h3]:text-xl [&_h3]:text-center [&_h3]:mb-2 [&_h3]:mt-4 " +
  "[&_p]:text-[#212020] [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-center [&_p]:mb-3 " +
  "[&_li]:text-[#212020] [&_li]:text-base [&_li]:leading-relaxed " +
  "[&_ul]:pl-5 [&_ul]:list-disc [&_ul]:mb-3 [&_ol]:pl-5 [&_ol]:list-decimal [&_ol]:mb-3 " +
  "[&_strong]:text-[#212020] [&_strong]:font-semibold " +
  "[&_a]:text-[#f59403] [&_a]:underline";

export default function PrivacyPolicy4({ content }) {
  const body = content?.body ?? "";
  const html = body ? md.render(body) : "";

  return (
    <FullContainer className="py-10 md:py-14 bg-[#efefef]">
      <Container>
        {html ? (
          <div className="max-w-5xl mx-auto">
            <div className="bg-white border border-[#e7e7e7] overflow-hidden">
              <div className="h-1 w-full bg-[#f59403]" aria-hidden />
              <div className="p-6 md:p-10">
                <div
                  className={`${poppins.className} ${contentStyles} max-w-none`}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className={`${inter.className} my-8 text-center text-[#6e6e6e]`}>
            Privacy policy content coming soon.
          </p>
        )}
      </Container>
    </FullContainer>
  );
}
