"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { DM_Sans } from "next/font/google";
import { IMAGE_BASE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const DEFAULT_IMAGE_BASE = IMAGE_BASE;

/** Navbar / logo tagline — readable sans, slightly larger than before */
const taglineFont = DM_Sans({
  subsets: ["latin"],
  weight: ["500", "600"],
});

function isValidImageSrc(src) {
  if (!src || typeof src !== "string") return false;
  const s = src.trim();
  return (
    s.startsWith("/") || s.startsWith("http://") || s.startsWith("https://")
  );
}

/** First word orange, remainder navy — navbar / brand lockup style. */
function LogoBrandMark({ text, split }) {
  const trimmed = (text ?? "").trim();
  if (!trimmed) return null;
  if (!split) return <>{trimmed}</>;
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length === 0) return null;
  const first = words[0];
  const rest = words.slice(1).join(" ");
  return (
    <>
      <span className="text-[#F5521B]">{first}</span>
      {rest ? <span className="text-[#003366]">{`\u00A0${rest}`}</span> : null}
    </>
  );
}

function buildImageSrc(base, path) {
  if (!path || typeof path !== "string") return "";
  const basePath =
    base && String(base).trim() ? base.replace(/\/$/, "") : DEFAULT_IMAGE_BASE;
  const segment = path.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Logo({
  logo,
  imagePath,
  className,
  tagline,
  taglineClassName,
  /** When true, brand text splits: first word #F5521B, rest #003366, uppercase via parent. */
  splitBrandWords = false,
}) {
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

  const computedTaglineClassName = `${taglineFont.className} max-w-[280px] text-[13px] font-medium leading-snug tracking-wide text-[#0B0B0B] sm:max-w-none sm:text-sm md:text-[15px] ${taglineClassName ?? ""}`;

  return (
    <Link
      title={`Logo - ${hostName}`}
      href="/"
      className={
        tagline
          ? "inline-flex min-w-0 items-center"
          : cn(
              "flex items-center justify-center",
              splitBrandWords && "justify-start",
            )
      }
    >
      {showImageLogo ? (
        tagline ? (
          <span className="inline-flex min-w-0 items-center gap-2.5 sm:gap-3">
            <Image
              height={dynamicLogoHeight}
              width={dynamicLogoWidth}
              src={imageLogoSrc}
              title={`Logo - ${hostName}`}
              alt={`${logoText || "logo"} - ${hostName}`}
              sizes="(max-width: 768px) 100px, (max-width: 1200px) 150px, 200px"
              style={logoStyle}
              className="shrink-0 scale-110"
            />
            <span className={`${computedTaglineClassName} text-left`}>
              {tagline}
            </span>
          </span>
        ) : (
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
        )
      ) : showTextLogo ? (
        tagline ? (
          <span className="inline-flex min-w-0 items-center gap-2 sm:gap-2.5">
            {showTextLogoIcon ? (
              <Image
                src={textLogoIconSrc}
                alt="Logo"
                width={windowWidth < 768 ? 32 : 44}
                height={windowWidth < 768 ? 32 : 44}
                className="shrink-0 self-center object-contain"
              />
            ) : null}
            <span className="flex min-w-0 flex-col items-start justify-center gap-1.5">
              {logoText ? (
                <h2
                  className={cn(
                    "max-w-[200px] truncate xs:max-w-[220px] sm:max-w-none",
                    splitBrandWords
                      ? "text-base font-black uppercase leading-none tracking-tight sm:text-xl md:text-2xl lg:text-[28px]"
                      : "text-base font-bold sm:text-lg md:text-3xl",
                    className,
                  )}
                >
                  {splitBrandWords ? (
                    <LogoBrandMark split text={logoText} />
                  ) : (
                    logoText
                  )}
                </h2>
              ) : null}
              <span className={computedTaglineClassName}>{tagline}</span>
            </span>
          </span>
        ) : (
          <div
            className={cn(
              "flex items-center",
              splitBrandWords ? "gap-2 sm:gap-2.5" : "",
            )}
          >
            {showTextLogoIcon && (
              <Image
                src={textLogoIconSrc}
                alt="Logo"
                width={windowWidth < 768 ? 32 : 44}
                height={windowWidth < 768 ? 32 : 44}
                className="shrink-0 object-contain"
              />
            )}
            {logoText && (
              <h2
                className={cn(
                  "min-w-0 max-w-[140px] truncate xs:max-w-[180px] sm:max-w-none",
                  splitBrandWords
                    ? "text-base font-black uppercase leading-none tracking-tight sm:text-xl md:text-2xl lg:text-[28px]"
                    : "ml-2 text-base font-bold sm:text-lg md:text-3xl",
                  !splitBrandWords && "ml-2",
                  className,
                )}
              >
                {splitBrandWords ? (
                  <LogoBrandMark split text={logoText} />
                ) : (
                  logoText
                )}
              </h2>
            )}
          </div>
        )
      ) : logoText ? (
        tagline ? (
          <span className="flex min-w-0 flex-col items-start justify-center gap-1.5">
            <span
              className={`max-w-[200px] truncate font-bold sm:max-w-none ${className}`}
              style={textStyle}
            >
              {logoText}
            </span>
            <span className={computedTaglineClassName}>{tagline}</span>
          </span>
        ) : (
          <span
            className={`font-bold text-lg truncate max-w-[180px] ${className}`}
            style={textStyle}
          >
            {logoText}
          </span>
        )
      ) : null}
    </Link>
  );
}
