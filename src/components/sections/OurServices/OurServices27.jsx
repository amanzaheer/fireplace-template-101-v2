"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import md from "@/lib/markdown";
import { Rubik, Archivo } from "next/font/google";

const rubik = Rubik({
    subsets: ["latin"],
    style: ["normal", "italic"],
    weight: ["400", "500", "600", "700"],
});

const archivo = Archivo({
    subsets: ["latin"],
    style: ["normal", "italic"],
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

export default function OurServices27({ content }) {
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

    const title = ourServices?.title ?? "We Offers Best Plumbing Services";

    return (
        <FullContainer id="our_services" className="bg-[#0A0909] py-12 md:py-16">
            <Container>
                <div className="mb-8 flex  justify-center gap-4">
                    <h2 className={`${rubik.className} text-3xl md:text-[44px] font-bold text-white text-ink tracking-tight`}>
                        {title}
                    </h2>
                  
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {displayServices.map((service) => {
                        const imageSrc = service.image
                            ? buildImageSrc(IMAGE_BASE, service.image)
                            : null;
                        return (
                            <div
                                key={service.id}
                                className="bg-white rounded-[30px] p-5 md:p-12 lg:py-16 text-center shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
                            >
                                <div className="flex flex-col flex-1 pt-6">
                                    <h3 className={`${archivo.className} text-[18px] md:text-[22px] leading-tight font-medium text-ink mb-3 `}>
                                        {service.title}
                                    </h3>
                                    {service.description ? (
                                        <div
                                            className={`${rubik.className} text-[14px] md:text-[16px] leading-relaxed text-[#6e6e6e] mb-5 max-w-none prose-p:my-0 prose-headings:my-1`}
                                            dangerouslySetInnerHTML={{
                                                __html: markdownPreview(service.description),
                                            }}
                                        />
                                    ) : (
                                        <p className="text-[#4b5563] text-sm md:text-base mb-5">
                                            No description provided.
                                        </p>
                                    )}
                                    <a
                                        href={`tel:${phone}`}
                                        className={`${archivo.className} text-xs md:text-[14px] self-center mt-auto w-fit justify-items-center gap-2 bg-[#FF0011] text-white uppercase tracking-wide font-bold py-3 px-7 md:py-4 md:px-8 rounded-xl hover:bg-[#bf1f1f] transition-colors duration-200`}
                                    >
                                        Call Us Today
                                        <span aria-hidden="true">→</span>
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {services.length > MAX_DISPLAY && (
                    <div className="mt-6 text-center">
                        <p className={`${rubik.className} text-[14px] md:text-[16px] leading-tight text-[#6e6e6e] font-medium`}>
                            {services.length - MAX_DISPLAY} more services available –{" "}
                            <a
                                href={`tel:${phone}`}
                                className={`${archivo.className} text-[12px] md:text-[14px] underline hover:text-[#d62828]`}
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
