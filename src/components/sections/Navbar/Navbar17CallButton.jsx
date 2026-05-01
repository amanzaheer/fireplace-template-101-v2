"use client";

import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Navbar17CallButton({
  phone,
  className = "",
  hideOnMobile = false,
}) {
  if (!phone) return null;

  const phoneLink = `tel:${phone}`;
  const baseClass = hideOnMobile
    ? "hidden md:inline-flex"
    : "inline-flex";

  return (
    <a
      href={phoneLink}
      className={`${baseClass} h-[54px] w-[220px] flex-row items-center justify-center gap-2 rounded-full bg-[#ff0504] text-white shadow-lg transition-all hover:opacity-80 ${className}`}
    >
      <Image
        src="/st-icons/Temp17/call17.png"
        alt="Phone"
        width={18}
        height={18}
        className="h-[30px] w-[30px] shrink-0"
      />
      <span className="flex flex-col items-start leading-none">
        <span className={`${inter.className} text-[16px] font-normal text-white`}>
          CLICK TO CALL
        </span>
        <span
          className={`${inter.className} mt-1 text-sm font-bold leading-none text-white md:text-[20px] lg:text-lg`}
        >
          {phone}
        </span>
      </span>
    </a>
  );
}
