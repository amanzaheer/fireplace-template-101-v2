"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

const MAX_DISPLAY = 6;

export default function OurServices5({ content }) {
  const ourServices = content?.our_services;
  const servicesFromNav = content?.services ?? [];
  const phone = content?.contact_info?.phone || "";

  const services = useMemo(() => {
    if (Array.isArray(ourServices?.items) && ourServices.items.length > 0) {
      return ourServices.items;
    }
    return Array.isArray(servicesFromNav) ? servicesFromNav : [];
  }, [ourServices, servicesFromNav]);

  const displayServices = useMemo(
    () => services.slice(0, MAX_DISPLAY),
    [services]
  );

  if (!displayServices.length) return null;

  const sectionTitle =
    ourServices?.title ?? "We Offers Best Chimney Services";

  const buildImageSrc = (filePath) => {
    if (!filePath || typeof filePath !== "string") return "";
    const basePath = (IMAGE_BASE ?? "").replace(/\/$/, "");
    const segment = filePath.replace(/^\//, "");
    return `${basePath}/${segment}`;
  };

  return (
    <FullContainer id="our_services" className="bg-gray-100 py-16 md:py-20">
      {/* Same width + horizontal padding as Navbar5 (Container default: max-w-[1270px], px-3 md:px-4) */}
      <Container className="mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-12 md:mb-16">
          {sectionTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 lg:gap-x-10 lg:gap-y-12">
          {displayServices.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row sm:items-stretch gap-6 md:gap-8 p-6 md:p-8 border border-gray-100 min-h-0"
            >
              <div className="relative w-full sm:w-[240px] md:w-[260px] shrink-0 h-52 sm:h-[210px] rounded-lg overflow-hidden">
                {service?.image ? (
                  <Image
                    src={buildImageSrc(service.image)}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 260px"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-200" />
                )}
              </div>

              <div className="flex flex-col justify-center flex-1 min-w-0 gap-3">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed">
                    {service.description ||
                      "Remove soot, creosote, and debris with professional chimney cleaning to improve airflow and reduce fire hazards."}
                  </p>
                </div>

                <a
                  href={`tel:${phone}`}
                  className="mt-1 inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-5 py-2.5 transition-all duration-300 w-fit rounded-t-[4px] rounded-b-[12px]"
                >
                  CALL US TODAY
                  <span className="ml-2 text-base">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}