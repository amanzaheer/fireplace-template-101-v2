"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import md from "@/lib/markdown";

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

const MAX_DISPLAY = 6;

const BUTTON_CLASS =
  "inline-flex min-h-[40px] min-w-[140px] items-center justify-center  bg-white  px-7 text-sm font-bold uppercase tracking-wide text-[#280404] transition-colors duration-200 ";

/** Normalize CMS path to Next.js service route (e.g. `/fireplace-repair`). */
function resolveServiceHref(path) {
  if (path == null) return null;
  const trimmed = String(path).trim();
  if (!trimmed || trimmed === "#") return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const segment = trimmed.replace(/^\/+|\/+$/g, "");
  return segment ? `/${segment}` : null;
}

function ServiceCard({ service, buttonLabel }) {
  const href = resolveServiceHref(service.path);

  return (
    <article className="flex min-h-[163px] flex-col items-center justify-center rounded-2xl bg-[#160202] px-5 py-8 text-center shadow-sm transition-shadow duration-200 hover:shadow-md">
      <h3 className="mb-2 font-poppins text-xl font-medium leading-tight text-white md:text-[22px]">
        {service.title}
      </h3>
      {service.description ? (
        <div
          className="mb-4 font-poppins text-[13px] font-normal leading-relaxed text-white [&_a]:text-white [&_p]:m-0 [&_p]:font-poppins [&_p]:text-[13px] [&_strong]:font-semibold"
          dangerouslySetInnerHTML={{
            __html: markdownPreview(service.description),
          }}
        />
      ) : (
        <p className="mb-4 font-poppins text-[13px] leading-relaxed text-black">
          No description provided.
        </p>
      )}
      {href ? (
        <Link href={href} className={BUTTON_CLASS} prefetch>
          {buttonLabel}
        </Link>
      ) : null}
    </article>
  );
}

export default function OurServices34({ content }) {
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
          path: item.path ?? item.slug ?? item.href ?? "",
          description: resolveServiceTag(item.description ?? "", title),
        };
      });
    }
    return (servicesFromNav || []).map((item, i) => {
      const title = item.title ?? "";
      return {
        id: item.path ?? String(i),
        title,
        path: item.path ?? item.slug ?? item.href ?? "",
        description: resolveServiceTag(item.description ?? "", title),
      };
    });
  }, [ourServices, servicesFromNav]);

  const displayServices = useMemo(
    () => (Array.isArray(services) ? services.slice(0, MAX_DISPLAY) : []),
    [services],
  );
  if (!displayServices.length) return null;

  const title = ourServices?.title ?? "Our Services";
  const description =
    ourServices?.description ?? ourServices?.subtitle ?? "";
  const buttonLabel =
    typeof ourServices?.cta_label === "string" && ourServices.cta_label.trim()
      ? ourServices.cta_label.trim()
      : "CALL US TODAY";
  return (
    <FullContainer id="our_services" className=" py-12 md:py-16">
      <Container>
        <h2 className="mb-4 text-center text-4xl font-medium font-poppins tracking-tight text-black md:text-[44px]">
          {title}
        </h2>
        {description ? (
          <p className="mx-auto mb-10 max-w-4xl text-center text-sm leading-relaxed text-white md:text-base">
            {description}
          </p>
        ) : (
          <div className="mb-10" />
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {displayServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              buttonLabel={buttonLabel}
            />
          ))}
        </div>
        {services.length > MAX_DISPLAY && (
          <div className="mt-8 text-center">
            <p className="text-base font-semibold text-white ">
              {services.length - MAX_DISPLAY} more services available –{" "}
              <a
                href={phone ? `tel:${phone}` : "#"}
                className="underline hover:text-white/80"
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
