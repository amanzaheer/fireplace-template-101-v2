"use client";

import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BrickWall,
  Fan,
  Flame,
  Phone,
  Shield,
} from "lucide-react";
import { Poppins } from "next/font/google";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { cn } from "@/lib/utils";

const ACCENT = "#FF0011";
const SCROLL_OFFSET = 100;

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ICON_MAP = {
  Shield,
  BrickWall,
  Flame,
  Fan,
  Award,
};

const DEFAULT_ICONS = ["Shield", "BrickWall", "Flame", "Fan", "Award"];

const contentStyles =
  "[&_h1]:text-white [&_h1]:font-bold [&_h2]:text-white [&_h2]:font-bold [&_h3]:text-white [&_h3]:font-semibold " +
  "[&_p]:text-[15px] [&_p]:leading-[1.65] [&_p]:text-white md:[&_p]:text-[16px] " +
  "[&_li]:text-white [&_strong]:font-semibold [&_strong]:text-[#FF0011] " +
  "[&_a]:text-[#FF0011] [&_a]:underline hover:[&_a]:text-white";

const btnBase =
  "inline-flex min-h-[48px] w-full min-w-0 items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-bold uppercase tracking-wide transition hover:brightness-95 sm:w-auto sm:min-w-[220px]";
function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  return `${basePath}/${filePath.replace(/^\//, "")}`;
}

function telHref(phone) {
  if (!phone || typeof phone !== "string") return "#";
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "#";
}

function stripFirstMatchingHeadingHtml(html, title) {
  if (!html || !title) return html;
  const normalizedTitle = title.trim().toLowerCase();
  const re = /<h[123][^>]*>([\s\S]*?)<\/h[123]>/i;
  const match = html.match(re);
  if (!match) return html;
  const innerText = match[1]
    .replace(/<[^>]*>/g, "")
    .trim()
    .toLowerCase();
  if (innerText !== normalizedTitle) return html;
  const start = match.index ?? 0;
  return (html.slice(0, start) + html.slice(start + match[0].length)).trim();
}

function resolveIconComponent(name) {
  if (!name || typeof name !== "string") return Shield;
  const key = name.trim();
  return ICON_MAP[key] ?? ICON_MAP[key.replace(/\s+/g, "")] ?? Shield;
}

export default function ServiceDescription18({ content }) {
  const block =
    content?.service_description2 &&
    typeof content.service_description2 === "object"
      ? content.service_description2
      : {};

  const title = typeof block.title === "string" ? block.title.trim() : "";
  const subTitle =
    (typeof block.sub_title === "string" && block.sub_title.trim()) ||
    (typeof block.subtitle === "string" && block.subtitle.trim()) ||
    (typeof block.label === "string" && block.label.trim()) ||
    "";
  const description =
    typeof block.description === "string" ? block.description.trim() : "";
  const ctaLabel =
    (typeof block.cta_label === "string" && block.cta_label.trim()) ||
    "CONTACT US NOW";
  const fileName =
    typeof block.file_name === "string" ? block.file_name.trim() : "";
  const imageAlt =
    (typeof block.alt === "string" && block.alt.trim()) ||
    title ||
    "Service description";

  const phone =
    content?.contact_info?.phone?.trim() ||
    content?.navbar?.phone?.trim() ||
    "";

  const descriptionHtml = useMemo(() => {
    const rendered = description ? md.render(description) : "";
    return stripFirstMatchingHeadingHtml(rendered, title);
  }, [description, title]);

  const imageSrc = fileName
    ? buildImageSrc(IMAGE_BASE, fileName)
    : buildImageSrc(IMAGE_BASE, "services/fireplace-cleaning.webp");

  const iconRows = useMemo(() => {
    const fromRef = resolveRefArray(content, block, "children");
    const fromList = Array.isArray(block.list) ? block.list : [];
    const source = fromRef.length > 0 ? fromRef : fromList;

    if (source.length > 0) {
      return source.slice(0, 5).map((item, index) => {
        const iconName =
          item?.icon ?? item?.name ?? DEFAULT_ICONS[index] ?? "Shield";
        const imagePath =
          item?.file_name ?? item?.image ?? item?.src ?? "";
        return {
          key: `icon-${index}`,
          Icon: resolveIconComponent(iconName),
          imageSrc: imagePath ? buildImageSrc(IMAGE_BASE, imagePath) : "",
        };
      });
    }
    return DEFAULT_ICONS.map((iconName, index) => ({
      key: `default-icon-${index}`,
      Icon: resolveIconComponent(iconName),
      imageSrc: "",
    }));
  }, [block, content]);
 
  const scrollToContact = useCallback(() => {
    const el =
      document.getElementById("quote-form-section") ??
      document.getElementById("contact-us") ??
      document.getElementById("working_process");
    if (!el) return;
    const top =
      el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  if (!title && !descriptionHtml) return null;

  return (
    <FullContainer
      id="service_description2"
      className={cn(
        "relative w-full items-stretch overflow-hidden bg-black",
        poppins.className,
      )}
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={false}
          />
        ) : null}
        <div className="absolute inset-0 bg-black/82" />
      </div>

      <Container className="relative z-10 w-full px-4 sm:px-6  lg:px-8">
        <div className="mx-auto flex min-h-[420px] max-w-5xl flex-col py-10 md:min-h-[480px] md:py-12 lg:py-14">
            {(title || subTitle) && (
              <header className="mb-8 text-center md:mb-10">
                {title ? (
                  <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-[2rem] lg:text-[2.25rem]">
                    {title}
                  </h2>
                ) : null}
                {subTitle ? (
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-white/95 sm:text-sm">
                    {subTitle}
                  </p>
                ) : null}
              </header>
            )}
            {descriptionHtml ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-[72px_1fr] md:gap-10 lg:gap-12">
                <div className="mx-auto flex flex-row flex-wrap justify-center gap-6 md:mx-0 md:flex-col md:justify-start md:gap-8 lg:gap-10">
                  {iconRows.map(({ key, Icon, imageSrc: iconImg }) => (
                    <div
                      key={key}
                      className="flex h-11 w-11 shrink-0 items-center justify-center text-white md:h-12 md:w-12"
                    >
                      {iconImg ? (
                        <Image
                          src={iconImg}
                          alt=""
                          width={48}
                          height={48}
                          className="h-10 w-10 object-contain brightness-0 invert md:h-11 md:w-11"
                        />
                      ) : (
                        <Icon
                          className="h-10 w-10 stroke-[1.5] md:h-11 md:w-11"
                          aria-hidden
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div
                  className={cn("text-left", contentStyles)}
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
              </div>
            ) : null}

            {phone ? (
              <div className="mt-8 flex flex-col items-center justify-center gap-3 border-t border-white/25 pt-8 sm:flex-row sm:gap-4 md:mt-10">
                <button
                  type="button"
                  onClick={scrollToContact}
                  className={cn(btnBase, "bg-[#FF0011] text-white")}
                >
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </button>
                <Link
                  href={telHref(phone)}
                  className={cn(btnBase, "bg-white text-[#FF0011]")}
                >
                  <Phone className="h-4 w-4 shrink-0" strokeWidth={2.25} />
                  <span>{phone}</span>
                </Link>
              </div>
            ) : null}
        </div>
      </Container>
    </FullContainer>
  );
}
