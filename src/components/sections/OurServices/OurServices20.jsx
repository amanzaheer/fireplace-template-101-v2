"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import md from "@/lib/markdown";
import {Poppins} from "next/font/google";
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
const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function OurServices20({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const ourServices = content?.our_services;
  const servicesFromNav = content?.services ?? [];

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

  if (!displayServices.length) return null;

  const title = ourServices?.title ?? "Services Provided";

  return (
    <FullContainer id="our_services" className="bg-[#FFFFFF] py-10 md:py-14">
      <Container>
        <h2 className={`mb-8 text-center text-[42px] font-extrabold tracking-tight text-[#0b0b0b] md:mb-10 md:text-5xl ${poppins.className}`}>
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayServices.map((service, index) => {
            const imageSrc = service.image
              ? buildImageSrc(IMAGE_BASE, service.image)
              : null;
            return (
              <div
                key={service.id}
                className="group mx-auto w-full max-w-[356px] overflow-hidden rounded-[4px] bg-transparent"
              >
                <div className="relative h-[278px] w-full overflow-hidden rounded-tl-[5px] rounded-tr-[5px] bg-gray-100">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={service.title || "Service"}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex  items-center justify-center">
                      <span className={`text-4xl font-bold text-gray-400 ${poppins.className}`}>
                        {service.title?.charAt(0) ?? "?"}
                      </span>
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-black/0  transition-colors duration-300 group-hover:bg-black/70" />

                  <div className="absolute inset-x-0 top-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {service.description ? (
                      <div
                        className="prose prose-sm max-w-none text-center font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)] prose-headings:my-1 prose-p:my-0 **:text-white! [&_a:hover]:text-white! [&_a:visited]:text-white!"
                        style={{ color: "#FFFFFF" }}
                        dangerouslySetInnerHTML={{
                          __html: markdownPreview(service.description),
                        }}
                      />
                    ) : null}
                  </div>

                  <div className="absolute inset-x-0 bottom-16 px-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <a
                      href={`tel:${phone}`}
                      className="mx-auto block w-fit rounded bg-white px-5 py-2 text-sm font-bold text-[#0b0b0b] transition-colors hover:bg-[#efefef]"
                    >
                      Call Us Today 
                    </a>
                  </div>
                </div>
                <div className="flex justify-center items-center flex-row relative z-10 -mt-12 mb-28 h-[71px]  w-[356px] rounded-tl-[30px] rounded-tr-[30px]  bg-[#CC3333] px-3 py-[10px] text-center">
  <h3
    className="line-clamp-2 leading-normal text-white"
    style={{
      fontFamily: "Poppins, sans-serif",
      fontWeight: 500,
      fontSize: "22px",
      lineHeight: "28px",
      letterSpacing: "0%",
    }}
  >
                    {service.path && service.path !== "#" ? (
                      <Link href={service.path} className="hover:underline">
                        {service.title}
                      </Link>
                    ) : (
                      service.title
                    )}
                  </h3>
                </div>
              </div>
            );
          })}
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
