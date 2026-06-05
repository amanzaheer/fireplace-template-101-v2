"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Poppins, Inter } from "next/font/google";
import {
    Clock,
    Star,
    Shield,
    Award,
    CheckCircle,
    Trophy,
    ThumbsUp,
    Phone,
    FileText,
    MessageSquare,
    TextQuote,
} from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
const ACCENT = "#FF0011";

const accentBtn =
    "inline-flex min-h-[48px] min-w-[205px] items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white shadow-md transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2";

const iconMap = {
    Clock,
    Star,
    Shield,
    Award,
    CheckCircle,
    Trophy,
    ThumbsUp,
    Phone,
    FileText,
    MessageSquare,
};

function buildImageSrc(base, filePath) {
    if (!filePath || typeof filePath !== "string") return "";
    const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
    const segment = filePath.replace(/^\//, "");
    return `${basePath}/${segment}`;
}

export default function WhyChoose27({ content }) {
    const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
    const telHref = phone ? `tel:${String(phone).replace(/\s/g, "")}` : "";

    const scrollToQuote = useCallback(() => {
        const el =
            document.getElementById("quote-form-section") ??
            document.querySelector(
                '.quote-form, [id*="quote"], [class*="quote-form"]',
            );
        if (el) {
            const offset = 80;
            window.scrollTo({
                top: el.getBoundingClientRect().top + window.scrollY - offset,
                behavior: "smooth",
            });
        }
    }, []);
    const block = content?.why_choose ?? {};
    const features = resolveRefArray(content, block, "features");
    const heading = block.heading ?? "We Choose Us";
    const subHeading =
        block?.title ?? block?.sub_heading ?? "Professional Chimney for Home";
    const description =
        block?.description ??
        "Chimney sweep or cleaning is essential for maintaining a safe and efficient fireplace system. Over time, soot, creosote, and debris accumulate in the chimney, creating fire hazards and reducing airflow.";
    const filePath = block.file_name ?? "about/about.webp";
    const imageSrc = buildImageSrc(IMAGE_BASE, filePath);

    if (features.length === 0) return null;

    const leftFeatures = features.slice(0, 2);
    const rightFeatures = features.slice(2);

    return (
        <FullContainer id="whychooseus" className="bg-white py-8 md:py-12 mt-4">
            <Container className="px-4 sm:px-5 md:px-12">
                {(() => {
                    const firstFeatures = leftFeatures.slice(0, -2);
                    const lastFeatures = leftFeatures.slice(-2);

                    return (
                        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_1.2fr_1fr] lg:gap-6 xl:gap-8">
                            {/* LEFT SIDE */}
                            <div className="w-full">
                                <p className={`${poppins.className} text-3xl leading-tight font-semibold text-black  md:text-4.5xl`}>
                                    {heading}
                                </p>

                                <h2 className={`${poppins.className} mt-2 text-4xl leading-[0.95] font-extrabold border-2 rounded-xl p-6 border-black text-black md:text-4.5xl`}>
                                    {subHeading}
                                </h2>

                                <p className={`${poppins.className} mt-4 max-w-[420px] text-base leading-[1.35] text-black border-2 rounded-xl p-6 md:text-xl`}>
                                    {description}
                                </p>

                                {/* FIRST FEATURES ONLY */}
                                <ul className={`${poppins.className} mt-4 space-y-2.5`}>
                                    {firstFeatures.map((feature, idx) => {
                                        const iconName =
                                            typeof feature === "object" ? feature?.icon : null;
                                        const text =
                                            typeof feature === "object"
                                                ? feature?.text
                                                : typeof feature === "string"
                                                    ? feature
                                                    : "";
                                        const IconComponent = iconName
                                            ? iconMap[iconName]
                                            : CheckCircle;

                                        return (
                                            <li
                                                key={idx}
                                                className={`${poppins.className} flex items-start gap-3 text-lg leading-tight text-black md:text-2xl`}
                                            >
                                                {IconComponent && (
                                                    <IconComponent className="mt-0.5 h-6 w-6 shrink-0 text-[#F97316]" />
                                                )}
                                                <span>{text}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                                {phone ? (
                                    <div className={`${poppins.className} mt-5`}>
                                        <Link
                                            href={telHref}
                                            className={accentBtn}
                                            style={{
                                                backgroundColor: ACCENT,
                                                outlineColor: ACCENT,
                                            }}
                                        >
                                            <Phone className="h-5 w-5 shrink-0" aria-hidden />
                                            {phone}
                                        </Link>
                                    </div>
                                ) : null}
                            </div>

                            <div className="w-full">
                                <div className={`${poppins.className} relative h-[420px] w-full overflow-hidden rounded-xl bg-gray-200 sm:h-[480px] lg:h-[560px]`}>
                                    {imageSrc ? (
                                        <Image
                                            src={imageSrc}
                                            alt="Why choose us"
                                            fill
                                            className={`${poppins.className} object-cover`}
                                            sizes="(max-width: 768px) 100vw, 58vw"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className={`${poppins.className} absolute inset-0 flex items-center justify-center text-gray-400 font-large`}>
                                            Why Choose Us
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="w-full">
                                <ul className={`${poppins.className} space-y-4 lg:pt-2 border-2 border-black p-6 rounded-xl`}>
                                    {lastFeatures.map((feature, idx) => {
                                        const iconName =
                                            typeof feature === "object" ? feature?.icon : null;
                                        const text =
                                            typeof feature === "object"
                                                ? feature?.text
                                                : typeof feature === "string"
                                                    ? feature
                                                    : "";
                                        const IconComponent = iconName
                                            ? iconMap[iconName]
                                            : CheckCircle;

                                        return (
                                            <li
                                                key={`moved-${idx}`}
                                                className={`${inter.className} flex items-start gap-2.5 text-lg leading-tight text-black md:text-2xl`}
                                            >
                                                {IconComponent && (
                                                    <IconComponent className="mt-0.5 h-6 w-6 shrink-0 text-[#FF0011]" />
                                                )}
                                                <span>{text}</span>
                                            </li>
                                        );
                                    })}

                                    {rightFeatures.map((feature, idx) => {
                                        const iconName =
                                            typeof feature === "object" ? feature?.icon : null;
                                        const text =
                                            typeof feature === "object"
                                                ? feature?.text
                                                : typeof feature === "string"
                                                    ? feature
                                                    : "";
                                        const IconComponent = iconName
                                            ? iconMap[iconName]
                                            : CheckCircle;

                                        return (
                                            <li
                                                key={`right-${idx}`}
                                                className={` ${inter.className} flex items-start gap-2.5 text-lg leading-tight text-black md:text-2xl`}
                                            >
                                                {IconComponent && (
                                                    <IconComponent className="mt-0.5 h-6 w-6 shrink-0 text-[#FF0011]" />
                                                )}
                                                <span>{text}</span>
                                            </li>
                                        );
                                    })}
                                </ul>

                                <div className={`${poppins.className} mt-5 flex flex-col gap-3 sm:flex-row sm:items-center`}>
                                    <button
                                        type="button"
                                        onClick={scrollToQuote}
                                        className={`${inter.className} ${accentBtn}  font-bold tracking-wide md:text-base`}
                                        style={{
                                            backgroundColor: ACCENT,
                                            outlineColor: ACCENT,
                                        }}
                                    >
                                        <TextQuote className="h-6 w-6 shrink-0" aria-hidden />
                                        GET A QUOTE
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })()}
            </Container>
        </FullContainer>
    );
}
