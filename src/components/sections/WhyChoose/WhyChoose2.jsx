"use client";

import React from "react";
import Image from "next/image";
import {
    Phone,
    CheckCircle2,
} from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";

function buildImageSrc(base, filePath) {
    if (!filePath || typeof filePath !== "string") return "";
    const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
    const segment = filePath.replace(/^\//, "");
    return `${basePath}/${segment}`;
}

export default function WhyChoose2({ content }) {
    const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
    const block = content?.why_choose ?? {};
    const features = resolveRefArray(content, block, "features");
    const heading = block.heading ?? "WHY CHOOSE US?";
    const subheading = block.subheading ?? "Key Advantages";
    const filePath = block.file_name ?? "about/about.webp";
    const imageSrc = buildImageSrc(IMAGE_BASE, filePath);

    if (features.length === 0) return null;

    return (
        <FullContainer id="whychooseus" className="py-8 md:py-12 ">
            <div className=" w-screen mx-auto">
                <div className="relative min-h-[380px] w-full  md:min-h-[600px] overflow-hidden rounded-none">
                    {imageSrc ? (
                        <Image
                            src={imageSrc}
                            alt="Why choose us"
                            fill
                            className="object-cover"
                            sizes="100vw"
                            loading="lazy"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gray-300" />
                    )}
                    <div className="absolute inset-0 bg-black/20" />
                    <FullContainer className="absolute inset-0"> 
                        <Container className=''> 
                        <div className=" z-10 flex items-center min-h-[380px] md:min-h-[460px]">
                            <div className="w-full max-w-[560px] bg-white rounded-2xl shadow-xl p-5 md:p-8">
                                <h2 className="text-3xl md:text-5xl font-extrabold text-black uppercase tracking-tight leading-none">
                                    {heading}
                                </h2>
                                <p className="text-xl md:text-4xl text-ink font-medium mt-2 mb-5">
                                    {subheading}
                                </p>
                                <ul className="space-y-2.5">
                                    {features.map((feature, idx) => {
                                        const text =
                                            typeof feature === "object"
                                                ? feature?.text
                                                : typeof feature === "string"
                                                    ? feature
                                                    : "";
                                        if (!text) return null;
                                        return (
                                            <li
                                                key={idx}
                                                className="flex items-start gap-2.5 text-ink text-base md:text-lg"
                                            >
                                                <CheckCircle2 className="w-5 h-5 min-w-5 mt-[2px] text-[#cc2936] shrink-0" />
                                                <span>{text}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <div className="mt-6 flex flex-col sm:flex-row gap-3 ">
                                    <a
                                        href={`tel:${phone}`}
                                        className="inline-flex items-center justify-center gap-2 rounded-full bg-black text-white uppercase tracking-wide font-bold px-7 py-3 text-sm hover:bg-[#111827] transition-colors duration-200"
                                    >
                                        Call Us Today
                                        <span aria-hidden="true">→</span>
                                    </a>
                                    <a
                                        href={`tel:${phone}`}
                                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d62828] text-white font-bold px-6 py-3 text-base hover:bg-[#bf1f1f] transition-colors duration-200"
                                    >
                                        <Phone className="w-4 h-4" />
                                        <span>{phone || "(888)-249-0566"}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        </Container>
                    </FullContainer>


                </div>
            </div>
        </FullContainer>
    );
}
