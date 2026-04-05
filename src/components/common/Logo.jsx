"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { IMAGE_BASE } from "@/lib/constants";

const DEFAULT_IMAGE_BASE = IMAGE_BASE;

function isValidImageSrc(src) {
  if (!src || typeof src !== "string") return false;
  const s = src.trim();
  return (
    s.startsWith("/") || s.startsWith("http://") || s.startsWith("https://")
  );
}

function buildImageSrc(base, path) {
  if (!path || typeof path !== "string") return "";
  const basePath =
    base && String(base).trim() ? base.replace(/\/$/, "") : DEFAULT_IMAGE_BASE;
  const segment = path.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Logo({ logo, imagePath, className }) {
  const [hostName, setHostName] = useState("");
  const [windowWidth, setWindowWidth] = useState(1200);

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = requestAnimationFrame(() => {
      setHostName(window.location.hostname);
      handleResize();
    });
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const logoData = logo?.value ?? logo;
  const logoType = logoData?.logoType;
  const logoText = logoData?.logoText;
  const logoHeight = logoData?.logoHeight ?? 40;
  const logoWidth = logoData?.logoWidth ?? 160;
  const fontSize = logoData?.fontSize ?? 32;
  const isBold = logoData?.isBold;
  const isItalic = logoData?.isItalic;

  const basePath = useMemo(() => {
    const raw = imagePath ?? DEFAULT_IMAGE_BASE;
    return typeof raw === "string" && raw.trim()
      ? raw.replace(/\/$/, "")
      : DEFAULT_IMAGE_BASE;
  }, [imagePath]);

  const imageLogoSrc = useMemo(() => {
    if (logoData?.logoType !== "image" || !logoData?.file_name) return "";
    return buildImageSrc(basePath, logoData.file_name);
  }, [logoData, basePath]);

  const textLogoIconSrc = useMemo(() => {
    if (logoData?.logoType !== "text" || !logoData?.file_name) return "";
    return buildImageSrc(basePath, logoData.file_name);
  }, [logoData, basePath]);

  const showImageLogo = logoType === "image" && isValidImageSrc(imageLogoSrc);
  const showTextLogo = logoType === "text";
  const showTextLogoIcon = showTextLogo && isValidImageSrc(textLogoIconSrc);

  const dynamicLogoHeight = useMemo(() => {
    return windowWidth < 768
      ? 30
      : windowWidth < 1200
        ? Math.floor(logoHeight / 2)
        : logoHeight;
  }, [windowWidth, logoHeight]);

  const dynamicLogoWidth = useMemo(() => {
    return windowWidth >= 1200
      ? logoWidth
      : Math.floor((logoWidth / logoHeight) * dynamicLogoHeight);
  }, [windowWidth, logoWidth, logoHeight, dynamicLogoHeight]);

  const logoStyle = useMemo(
    () => ({
      height: windowWidth >= 768 ? `${dynamicLogoHeight}px` : "auto",
      width: windowWidth >= 768 ? "auto" : 148,
      maxWidth: "100%",
    }),
    [windowWidth, dynamicLogoHeight],
  );

  const textStyle = useMemo(
    () => ({
      fontSize:
        windowWidth < 480
          ? "14px"
          : windowWidth < 768
            ? "16px"
            : `${fontSize ?? 26}px`,
      fontWeight: isBold ? "bold" : "600",
      fontStyle: isItalic ? "italic" : "normal",
    }),
    [windowWidth, fontSize, isBold, isItalic],
  );

  if (!logoData) return null;

  return (
    <Link
      title={`Logo - ${hostName}`}
      href="/"
      className="flex items-center justify-center"
    >
      {showImageLogo ? (
        <Image
          height={dynamicLogoHeight}
          width={dynamicLogoWidth}
          src={imageLogoSrc}
          title={`Logo - ${hostName}`}
          alt={`${logoText || "logo"} - ${hostName}`}
          sizes="(max-width: 768px) 100px, (max-width: 1200px) 150px, 200px"
          style={logoStyle}
          className="scale-110"
        />
      ) : showTextLogo ? (
        <>
          {showTextLogoIcon && (
            <Image
              src={textLogoIconSrc}
              alt="Logo"
              width={windowWidth < 768 ? 32 : 44}
              height={windowWidth < 768 ? 32 : 44}
              className="object-contain flex-shrink-0"
            />
          )}
          {logoText && (
            <h2
              className={`font-bold text-base sm:text-lg md:text-3xl ml-2 truncate max-w-[140px] xs:max-w-[180px] sm:max-w-none ${className}`}
            >
              {logoText}
            </h2>
          )}
        </>
      ) : logoText ? (
        <span
          className={`font-bold text-lg truncate max-w-[180px] ${className}`}
          style={textStyle}
        >
          {logoText}
        </span>
      ) : null}
    </Link>
  );
}
