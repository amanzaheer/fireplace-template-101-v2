"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGE_BASE } from "@/lib/constants";
import md from "@/lib/markdown";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

function resolveServiceTag(str, title) {
  if (!str || !title) return str ?? "";
  return str.replace(/\[service\]/gi, title);
}

function markdownPreview(str) {
  if (!str) return "";
  return md.render(str);
}

const MAX_DISPLAY = 9;
const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function isTextFirstCard(index) {
  return index % 3 === 1;
}

function ServiceCardText({ service }) {
  return (
    <div className="flex flex-col px-1 text-center">
      <h3
        className={`${poppins.className} mb-2 w-full text-center font-bold capitalize text-[#000]`}
        style={{
          fontSize: "32.795px",
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "60.466px",
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
      {service.description ? (
        <div
          className={`${poppins.className} w-full shrink-0 overflow-hidden text-center capitalize text-[#000] [&_*]:capitalize [&_a]:text-inherit [&_a]:underline [&_p]:m-0 [&_p]:text-center [&_p]:text-inherit`}
          style={{
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 500,
            height: "79.938px",
            lineHeight: "24.596px",
          }}
          dangerouslySetInnerHTML={{
            __html: markdownPreview(service.description),
          }}
        />
      ) : (
        <p
          className={`${poppins.className} w-full shrink-0 text-center capitalize text-[#000]`}
          style={{
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 500,
            height: "79.938px",
            lineHeight: "24.596px",
          }}
        >
          No description provided.
        </p>
      )}
    </div>
  );
}

function ServiceCardImage({ service, imageSrc }) {
  const hasPath = Boolean(service.path && service.path !== "#");
  const frameClass =
    "relative h-44 w-full overflow-hidden rounded-lg bg-neutral-200 transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 sm:h-48 md:h-52";

  const inner = imageSrc ? (
    <Image
      src={imageSrc}
      alt={service.title || "Service"}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover"
      loading="lazy"
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-neutral-200">
      <span className="text-3xl font-bold text-neutral-400">
        {service.title?.charAt(0) ?? "?"}
      </span>
    </div>
  );

  if (hasPath) {
    return (
      <Link
        href={service.path}
        className={`${frameClass} block`}
        aria-label={`${service.title || "Service"} — view service`}
      >
        {inner}
      </Link>
    );
  }

  return <div className={frameClass}>{inner}</div>;
}

export default function OurServices9({ content }) {
  const contentSafe = content ?? {};
  const phone =
    contentSafe?.contact_info?.phone ?? contentSafe?.navbar?.phone ?? "";
  const ourServices = contentSafe?.our_services;
  const servicesFromNav = contentSafe?.services ?? [];

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

  const sectionTitle = ourServices?.title ?? "Services Provided";

  return (
    <section
      id="our_services"
      className="bg-neutral-50 py-12 md:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1270px] px-4 md:px-6">
        <h2
          className={`${poppins.className} mb-10 text-center text-3xl font-bold tracking-tight text-neutral-800 md:mb-12 md:text-4xl lg:text-[2.5rem]`}
        >
          {sectionTitle}
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:gap-10">
          {displayServices.map((service, index) => {
            const imageSrc = service.image
              ? buildImageSrc(IMAGE_BASE, service.image)
              : null;
            const num = String(index + 1).padStart(2, "0");
            const textFirst = isTextFirstCard(index);

            return (
              <article
                key={service.id}
                className="flex flex-col rounded-xl bg-[#f5f5f5] p-6 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] md:p-7"
              >
                <div
                  className={`${poppins.className} text-left text-sm font-semibold text-[#000]`}
                >
                  {num}.
                </div>
                <div
                  className="mb-5 mt-2 border-b border-[#000]"
                  aria-hidden
                />

                {textFirst ? (
                  <div className="flex flex-1 flex-col gap-5">
                    <ServiceCardText service={service} />
                    <div className="mt-auto">
                      <ServiceCardImage
                        service={service}
                        imageSrc={imageSrc}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-1 flex-col gap-5">
                    <ServiceCardImage
                      service={service}
                      imageSrc={imageSrc}
                    />
                    <ServiceCardText service={service} />
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {services.length > MAX_DISPLAY && (
          <div className="mt-10 text-center">
            <p className="text-lg font-semibold text-neutral-700">
              {services.length - MAX_DISPLAY} more services available –{" "}
              <a
                href={phone ? `tel:${phone}` : "#"}
                className="underline decoration-neutral-400 underline-offset-2 hover:text-neutral-900"
              >
                Call for details
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
