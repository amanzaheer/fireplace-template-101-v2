"use client";

import React, { useMemo, useCallback } from "react";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import md from "@/lib/markdown";
import { Poppins } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** Replace [service] token with the item's own title. */
function resolveServiceTag(str, title) {
  if (!str || !title) return str ?? "";
  return str.replace(/\[service\]/gi, title);
}

/** Render markdown to HTML. */
function markdownPreview(str) {
  if (!str) return "";
  return md.render(str);
}

const MAX_DISPLAY = 8;
const SCROLL_OFFSET = 100;
const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function OurServices1({ content }) {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const ourServices = content?.our_services;
  const servicesFromNav = content?.services ?? [];

  const scrollToSection = useCallback((element) => {
    if (!element) return;
    const top =
      element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const handleNavigation = useCallback(
    (id) => {
      const element = document.getElementById(id);
      if (element) {
        scrollToSection(element);
      } else {
        router.push("/");
        setTimeout(() => {
          const el = document.getElementById(id);
          scrollToSection(el);
        }, 500);
      }
    },
    [router, scrollToSection],
  );

  const handleHomeNavigation = useCallback(() => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    router.push("/");
  }, [pathname, router]);

  const services = useMemo(() => {
    if (Array.isArray(ourServices?.items) && ourServices.items.length > 0) {
      return ourServices.items.map((item, i) => {
        const title = item.title ?? "";
        return {
          id: item.id ?? item.path ?? String(i),
          title,
          path: item.path ?? "#",
          description: resolveServiceTag(item.description ?? "", title),
          image: item.image ?? null,
        };
      });
    }
    return (servicesFromNav || []).map((item, i) => {
      const title = item.title ?? "";
      return {
        id: item.path ?? String(i),
        title,
        path: item.path ?? "#",
        description: resolveServiceTag(item.description ?? "", title),
        image: item.image ?? null,
      };
    });
  }, [ourServices, servicesFromNav]);

  const displayServices = useMemo(
    () => (Array.isArray(services) ? services.slice(0, MAX_DISPLAY) : []),
    [services],
  );
  const serviceColumns = useMemo(() => {
    const columns = [[], [], []];
    displayServices.forEach((service, index) => {
      columns[index % 3].push(service);
    });
    return columns;
  }, [displayServices]);

  if (!displayServices.length) return null;

  const title = ourServices?.title ?? "Services Provided";

  return (
    <FullContainer id="our_services" className="py-10 md:py-14 bg-white">
      <Container>
        <h2 className="text-3xl md:text-5xl font-extrabold  mr-8 text-center text-black mb-8 md:mb-10 tracking-tight">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {serviceColumns.map((column, columnIndex) => (
            <div
              key={`column-${columnIndex}`}
              className="space-y-3 flex w-full max-w-[240px] flex-col items-start mx-auto"
            >
              {column.map((service) => {
                const imageSrc = service.image
                  ? buildImageSrc(IMAGE_BASE, service.image)
                  : null;
                return (
                  <div key={service.id} className="flex w-full items-center gap-3">
                    <div className="h-7 w-7 shrink-0 rounded-md text-[16px] bg-[#da4909] shadow-lg flex items-center justify-center">
                      <Image
                        src="/st-icons/Temp12/whiteshield.png"
                        alt=""
                        width={32}
                        height={32}
                        className="h-5 w-5 object-contain"
                        aria-hidden
                      />
                    </div>
                    <p
                      className={`${poppins.className} text-[16px] leading-tight text-left text-black font-medium`}
                    >
                      {service.title}
                    </p>
                    {imageSrc ? (
                      <span className="sr-only">{imageSrc}</span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          <a
            href={phone ? `tel:${phone}` : "#"}
            className={`${poppins.className} inline-flex h-[54px] w-[206px] items-center justify-center gap-2 rounded-[44px] bg-[#da4909] px-3 py-2 text-white`}
          >
              <span className="flex flex-col items-center leading-none">
                <span className={`${poppins.className} text-[16px] font-normal uppercase tracking-[0.04em] text-white`}>
                  Call Now:
                </span>
                <span className={`${poppins.className} mt-0.5 text-[20px] font-bold tracking-wide text-white normal-case`}>
                  {phone || "(888)-249-0566"}
                </span>
              </span>
          </a>
          <button
            type="button"
            onClick={() => handleNavigation("contact-us")}
            className={`${poppins.className} inline-flex h-[54px] w-[206px] items-center gap-2 rounded-[44px] bg-black px-3 py-2 text-white`}
          >
            <span className="flex flex-col leading-none">
              <span
                className={`${poppins.className} text-[16px] font-normal uppercase tracking-[0.04em] ml-8 `}
              >
                Book Now:
              </span>
              <span
                className={`${poppins.className} mt-0.5 text-[20px] font-bold tracking-wide ml-4  normal-case`}
              >
                Appointment
              </span>
            </span>
          </button>
        </div>
        {services.length > MAX_DISPLAY && (
          <div className="mt-6 text-center">
            <p className="text-[#002B5B] text-lg font-semibold">
              {services.length - MAX_DISPLAY} more services available –{" "}
              <a
                href={`tel:${phone}`}
                className="underline hover:text-blue-700"
              >
                Call for details
              </a>
            </p>
          </div>
        )}
      </Container>
    </FullContainer>
  );
}
