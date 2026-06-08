"use client";
import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import WhyChoose27 from "@/components/sections/WhyChoose/WhyChoose27";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const NAVY_BG = "#00163A";
const ACCENT_RED = "#BF1309";
const DEFAULT_MAX = 8;
const SCROLL_OFFSET = 80;

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function resolveServiceHref(path) {
  if (path == null) return null;
  const trimmed = String(path).trim();
  if (!trimmed || trimmed === "#") return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const segment = trimmed.replace(/^\/+|\/+$/g, "");
  return segment ? `/${segment}` : null;
}

function resolveDefaultServiceIcon(ourServices) {
  const raw =
    ourServices?.chimney27 ??
    ourServices?.chimneyicon ??
    ourServices?.service_icon ??
    "icons/chimney27.png";
  return typeof raw === "string" ? raw.trim() : "";
}

function ServiceGridItem({ service, defaultIconSrc, defaultIconAlt }) {
  const href = resolveServiceHref(service.path);
  const iconSrc =
    (service.icon ? buildImageSrc(IMAGE_BASE, service.icon) : "") ||
    defaultIconSrc;

  const inner = (
    <div className="flex flex-col items-center justify-center px-2 py-4 md:py-6">
      <div className="mb-3 flex items-center justify-center md:mb-4">
        {iconSrc ? (
          <Image
            src={iconSrc}
            alt={service.title || defaultIconAlt}
            width={64}
            height={64}
            className="h-12 w-12 object-contain sm:h-14 sm:w-14 md:h-16 md:w-16"
          />
        ) : null}
      </div>
      <p className="text-center text-sm font-medium leading-snug text-white md:text-base">
        {service.title}
      </p>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {inner}
      </Link>
    );
  }

  return inner;
}

export default function OurServices27({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const ourServices = content?.our_services;
  const servicesFromNav = content?.services ?? [];

  const maxDisplay = Math.max(
    1,
    Number(ourServices?.max_display) || DEFAULT_MAX,
  );

  const services = useMemo(() => {
    if (Array.isArray(ourServices?.items) && ourServices.items.length > 0) {
      return ourServices.items.map((item, i) => {
        const title = item.title ?? "";
        return {
          id: item.id ?? item.path ?? String(i),
          title,
          path: item.path ?? "#",
          icon: item.icon ?? null,
        };
      });
    }
    return (servicesFromNav || []).map((item, i) => {
      const title = item.title ?? "";
      return {
        id: item.path ?? String(i),
        title,
        path: item.path ?? "#",
        icon: item.icon ?? null,
      };
    });
  }, [ourServices, servicesFromNav]);

  const displayServices = useMemo(
    () => (Array.isArray(services) ? services.slice(0, maxDisplay) : []),
    [services, maxDisplay],
  );

  const scrollToQuoteForm = useCallback(() => {
    const el =
      document.getElementById("quote-form-section") ??
      document.getElementById("contact-us") ??
      document.querySelector(
        '.quote-form, [id*="quote"], [class*="quote-form"]',
      );
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET,
        behavior: "smooth",
      });
    }
  }, []);

  if (!displayServices.length) return null;

  const title = ourServices?.title ?? "Our Services";
  const defaultIcon = resolveDefaultServiceIcon(ourServices);
  const defaultIconSrc = defaultIcon
    ? buildImageSrc(IMAGE_BASE, defaultIcon)
    : "";
  const defaultIconAlt =
    ourServices?.chimney27_alt ??
    ourServices?.service_icon_alt ??
    "Service icon";
  const overflowTemplate =
    ourServices?.overflow_template ??
    "{count} more services available – {link}";
  const callForDetailsLabel =
    ourServices?.call_for_details_label ?? "Call for details";
  const ctaLabel = ourServices?.cta_label ?? "SCHEDULE A BOOKING";
  const specialistLabel =
    ourServices?.specialist_label ??
    ourServices?.phone_cta_subtitle ??
    content?.navbar?.phone_cta_subtitle ??
    "Speak To A Chimney Specialist Today";
  const telHref = phone ? `tel:${String(phone).replace(/[^\d+]/g, "")}` : "#";
  const extraCount = services.length - displayServices.length;
  const phoneDisplay = typeof phone === "string" ? phone.trim() : "";

  return (
    <FullContainer
      id="our_services"
      className={`overflow-hidden ${poppins.className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[480px]">
        <div
          id="our_services_left"
          className="order-2 hidden min-h-full w-full overflow-hidden bg-white lg:order-1 lg:flex lg:items-start lg:justify-center"
        >
          <WhyChoose27 content={content} embedded />
        </div>

        <div
          className="order-1 py-10 md:py-14 lg:order-2 lg:py-14 xl:py-16"
          style={{ backgroundColor: NAVY_BG }}
        >
          <Container className="px-4 sm:px-6 lg:max-w-none lg:px-8 xl:px-10">
            {title ? (
              <h2 className="text-center text-[26px] font-bold leading-tight tracking-tight text-white sm:text-[32px] md:text-[36px] lg:text-[38px]">
                {title}
              </h2>
            ) : null}

            <div className="mx-auto mt-6 grid w-full max-w-md  grid-cols-2 gap-x-2 gap-y-0 sm:gap-x-6 sm:gap-y-2 md:mt-8 lg:max-w-lg">
              {displayServices.map((service) => (
                <ServiceGridItem
                  key={service.id}
                  service={service}
                  defaultIconSrc={defaultIconSrc}
                  defaultIconAlt={defaultIconAlt}
                />
              ))}
            </div>

            {extraCount > 0 ? (
              <p className="mx-auto mt-6 max-w-md text-center  text-sm font-medium text-white/95 md:text-base">
                {overflowTemplate.includes("{count}") ? (
                  <>
                    {overflowTemplate
                      .split("{link}")[0]
                      ?.replace("{count}", String(extraCount))}
                    <a href={telHref} className="underline hover:text-white">
                      {callForDetailsLabel}
                    </a>
                    {overflowTemplate.split("{link}")[1] ?? ""}
                  </>
                ) : (
                  <>
                    {extraCount} more services available –{" "}
                    <a href={telHref} className="underline hover:text-white">
                      {callForDetailsLabel}
                    </a>
                  </>
                )}
              </p>
            ) : null}

            <div className="mx-auto mt-8 w-full max-w-md lg:max-w-lg">
              <button
                type="button"
                onClick={scrollToQuoteForm}
                className="flex w-full min-h-[52px] items-center justify-center  rounded-sm px-4 py-3.5 text-sm font-medium font-poppins uppercase tracking-wide text-white transition-opacity hover:opacity-90 sm:min-h-[56px] md:text-[26px]"
                style={{ backgroundColor: ACCENT_RED }}
              >
                {ctaLabel}
              </button>

              {specialistLabel ? (
                <p className="mt-5 text-center text-xs font-medium leading-snug md:text-[14px] font-poppins text-white">
                  {specialistLabel}
                </p>
              ) : null}

              {phoneDisplay ? (
                <a
                  href={telHref}
                  className="mt-1 block text-center text-[22px] font-bold leading-tight transition-opacity hover:opacity-90 sm:text-2xl"
                  style={{ color: ACCENT_RED }}
                >
                  {phoneDisplay}
                </a>
              ) : null}
            </div>
          </Container>
        </div>
      </div>
    </FullContainer>
  );
}
