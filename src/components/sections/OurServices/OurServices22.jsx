"use client";

import React, { useMemo } from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import md from "@/lib/markdown";
import { Rubik } from "next/font/google";


const rubik = Rubik({
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

const BUTTON_CLASS =
  "mt-auto flex h-[44px] min-h-[44px] w-fit min-w-[160px] items-center justify-center rounded bg-[#f0520e] px-4 text-center text-sm font-normal font-rubik text-white transition-colors duration-200 hover:bg-black md:h-[48px] md:min-h-[48px] md:px-8 md:text-lg";

function ServiceCard({ service, phone, borderClass }) {
  return (
    <article
      className={`flex h-full min-h-full flex-col overflow-hidden bg-white transition-shadow duration-200 hover:shadow-lg ${borderClass}`}
    >
      <div className="flex h-full min-h-0 flex-1 flex-col p-3 pb-4 md:p-6">
        <div className="flex min-h-0 flex-1 flex-col">
          <h3 className="mb-2 text-center font-poppins text-xl font-medium leading-tight text-black md:text-2xl">
            {service.title}
          </h3>
          {service.description ? (
            <div
              className="flex-1 font-Montserrat text-center text-[12.6px] font-normal leading-relaxed text-[#000000] [&_a]:text-[#000000] [&_p]:m-0 [&_p]:font-poppins [&_p]:text-[12.6px] [&_p]:font-normal [&_p]:leading-relaxed [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{
                __html: markdownPreview(service.description),
              }}
            />
          ) : (
            <p className="flex-1 text-sm font-medium leading-[18px] text-black md:text-[12.6px]">
              No description provided.
            </p>
          )}
        </div>
        <a href={phone ? `tel:${phone}` : "#"} className={`${BUTTON_CLASS} mx-auto`}>
          Call Us Today
        </a>
      </div>
    </article>
  );
}

function getBorderClass(index) {
  if (index === 1) return "md:border-x-2";
  return "";
}

export default function OurServices22({ content }) {
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
  const row1 = displayServices.slice(0, 3);
  const row2 = displayServices.slice(3, 6);

  const renderRow = (rowServices, rowClassName) => (
    <div
      className={`grid grid-cols-1 items-stretch gap-4 overflow-hidden md:grid-cols-3 md:gap-[2px] ${rowClassName}`}
    >
      {rowServices.map((service, index) => (
        <ServiceCard
          key={service.id}
          service={service}
          phone={phone}
          borderClass={getBorderClass(index)}
        />
      ))}
    </div>
  );

  return (
    <FullContainer id="our_services">
      <Container>
        <h2 className="mb-8 text-center text-4xl font-extrabold tracking-tight text-black">
          {title}
        </h2>
        {renderRow(row1, "border-b-2 py-4")}
        {row2.length > 0 ? renderRow(row2, "py-3") : null}
        {services.length > MAX_DISPLAY && (
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold text-[#002B5B]">
              {services.length - MAX_DISPLAY} more services available –{" "}
              <a href={phone ? `tel:${phone}` : "#"} className="underline hover:text-blue-700">
                Call for details
              </a>
            </p>
          </div>
        )}
      </Container>
    </FullContainer>
  );
}
