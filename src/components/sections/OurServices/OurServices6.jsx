import React from "react";
import Image from "next/image";
import Link from "next/link";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
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

const MAX_DISPLAY = 8;
const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function OurServices6({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const ourServices = content?.our_services;
  const servicesFromNav = content?.services ?? [];

  const services =
    Array.isArray(ourServices?.items) && ourServices.items.length > 0
      ? ourServices.items.map((item, i) => {
          const title = item.title ?? "";
          return {
            id: item.id ?? item.path ?? String(i),
            title,
            path: item.path ?? "#",
            description: resolveServiceTag(item.description ?? "", title),
            image: item.image ?? null,
          };
        })
      : (servicesFromNav || []).map((item, i) => {
          const title = item.title ?? "";
          return {
            id: item.path ?? String(i),
            title,
            path: item.path ?? "#",
            description: resolveServiceTag(item.description ?? "", title),
            image: item.image ?? null,
          };
        });

  const displayServices = Array.isArray(services)
    ? services.slice(0, MAX_DISPLAY)
    : [];

  if (!displayServices.length) return null;

  const eyebrow =
    ourServices?.eyebrow ?? ourServices?.subtitle ?? "Our Best Service";
  const title =
    ourServices?.title ?? "Our Professional Chimney Services";

  const titleNode = (service) =>
    service.path && service.path !== "#" ? (
      <Link
        href={service.path}
        className="block w-full text-center text-white font-medium text-sm md:text-base hover:underline"
      >
        {service.title}
      </Link>
    ) : (
      <span className="block w-full text-center text-white font-medium text-sm md:text-base">
        {service.title}
      </span>
    );

  return (
    <FullContainer className="bg-white py-10 md:py-16" id="our_services">
      <Container className="px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="text-center mb-8 md:mb-12">
          
          <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold text-black tracking-tight leading-tight">
            {title}
          </h2>
        </div>

        <div className="flex w-full flex-wrap justify-center gap-6 md:gap-8">
          {displayServices.map((service) => {
            const imageSrc = service.image
              ? buildImageSrc(IMAGE_BASE, service.image)
              : null;

            return (
              <div
                key={service.id}
                className="flex w-full flex-col sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)]"
              >
                <div
                  className="group relative w-full aspect-4/3 overflow-hidden rounded-xl bg-gray-100 shadow-md"
                >
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={service.title || "Service"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                      <span className="text-5xl font-bold max-w-52 text-gray-400">
                        {service.title?.charAt(0) ?? "?"}
                      </span>
                    </div>
                  )}

                  {/* Orange label — default; fades on pointer hover only */}
                  <div
                    className="absolute bottom-0 left-0 z-1 w-[78%] max-w-[85%] bg-[#F97316] py-2.5 md:py-3 px-3 rounded-r-xl shadow-sm transition-opacity duration-300 ease-out group-hover:opacity-0 group-hover:pointer-events-none"
                  >
                    {titleNode(service)}
                  </div>

                  {/* Hover or focused overlay: description + Call Us (anchored bottom) */}
                  <div
                    className="absolute inset-0 z-2 flex flex-col items-center justify-end gap-3 md:gap-4 p-4 pb-5 md:p-6 md:pb-6 bg-black/75 text-center opacity-0 pointer-events-none transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100 focus-within:pointer-events-auto focus-within:opacity-100"
                  >
                    {service.description ? (
                      <div
                        className="prose prose-sm max-w-none w-full text-white [&_p]:my-1 [&_p]:text-white [&_li]:text-white [&_strong]:text-white [&_em]:text-white [&_a]:text-white [&_a]:underline hover:[&_a]:text-white/90"
                        dangerouslySetInnerHTML={{
                          __html: markdownPreview(service.description),
                        }}
                      />
                    ) : (
                      <p className="text-white text-sm md:text-base font-medium">
                        No description provided.
                      </p>
                    )}
                    <a
                      href={phone ? `tel:${phone}` : "#"}
                      className="inline-flex items-center justify-center rounded-lg bg-[#F97316] px-6 py-2.5 text-base font-bold text-white shadow-md transition-colors hover:bg-[#ea580c] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
                    >
                      Call Us
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {services.length > MAX_DISPLAY && (
          <div className="mt-8 md:mt-10 text-center">
            <p className="text-[#002B5B] text-lg font-semibold">
              {services.length - MAX_DISPLAY} more services available –{" "}
              <a
                href={phone ? `tel:${phone}` : "#"}
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
