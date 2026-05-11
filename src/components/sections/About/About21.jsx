"use client";

import Image from "next/image";
import { CheckCheck, PhoneCall } from "lucide-react";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

function buildImageSrc(base, filePath) {
    if (!filePath || typeof filePath !== "string") return "";
    const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
    const segment = filePath.replace(/^\//, "");
    return `${basePath}/${segment}`;
}

export default function About21({ content }) {
    const about = content?.about ?? {};
    const heading = about.heading ?? "About Chimney pro";
    const description1 = about.description1 ?? "";
    const description2 = about.description2 ?? "";
    const label = about.label ?? "ABOUT US";
    const leftImage =
        buildImageSrc(
            IMAGE_BASE,
            about.file_name ?? about.left_image ?? about.image_left,
        ) ||
        buildImageSrc(IMAGE_BASE, "about/about.webp");
    const rightImage =
        buildImageSrc(
            IMAGE_BASE,
            about.file_name2 ??
            about.file_name_2 ??
            about.right_image ??
            about.image_right ??
            "about/about2.png",
        ) ||
        leftImage;
    const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
    const points = Array.isArray(about?.points)
        ? about.points.filter(Boolean).slice(0, 4)
        : [];

    return (
        <FullContainer
            className="bg-[#ffffff] py-12 md:py-16 mt-8 md:mt-12"
            id="about"
        >
            <Container className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-center">
                    <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start">
                        <div className="relative w-full max-w-[480px] h-[420px] sm:h-[470px]">
                            <div className="absolute left-0 top-0 w-[47%] h-full overflow-hidden rounded-[18px] [clip-path:polygon(0_10%,100%_0,100%_100%,0_90%)] shadow-[0_12px_24px_rgba(0,0,0,0.14)]">
                                {leftImage ? (
                                    <Image
                                        title="About Left Image"
                                        src={leftImage}
                                        alt="About"
                                        fill
                                        className="object-cover"
                                        loading="lazy"
                                        sizes="(max-width: 1024px) 100vw, 30vw"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200" />
                                )}
                            </div>

                            <div className="absolute right-0 top-0 w-[47%] h-full overflow-hidden rounded-[18px] [clip-path:polygon(0_0,100%_10%,100%_90%,0_100%)] shadow-[0_12px_24px_rgba(0,0,0,0.14)]">
                                {rightImage ? (
                                    <Image
                                        title="About Right Image"
                                        src={rightImage}
                                        alt="About"
                                        fill
                                        className="object-cover object-center"
                                        loading="lazy"
                                        sizes="(max-width: 1024px) 100vw, 30vw"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200" />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-4">
                        <p
                            className={`${poppins.className} text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-[#ff6f00] leading-tight mb-3`}
                        >
                            {label}
                        </p>
                        <h2
                            className={`${poppins.className} text-[34px] sm:text-[42px] md:text-[52px] font-bold uppercase leading-[1.03] text-black mb-5`}
                        >
                            {heading}
                        </h2>

                        <p
                            className={`${poppins.className} text-[15px] md:text-lg leading-[1.7] text-[#222]`}
                        >
                            {description1}
                        </p>
                        {description2 ? (
                            <p
                                className={`${poppins.className} mt-3 text-[15px] md:text-lg leading-[1.7] text-[#222]`}
                            >
                                {description2}
                            </p>
                        ) : null}

                        {points.length > 0 ? (
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                                {points.map((point, index) => (
                                    <div
                                        key={index}
                                        className={`${poppins.className} inline-flex items-start gap-3 text-[15px] md:text-base text-[#1b1b1b]`}
                                    >
                                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] bg-[#ff6f00] text-white">
                                            <CheckCheck className="h-3.5 w-3.5" />
                                        </span>
                                        <span>{point}</span>
                                    </div>
                                ))}
                            </div>
                        ) : null}

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <a
                                href={phone ? `tel:${phone}` : "#"}
                                className={`${poppins.className} inline-flex items-center justify-center gap-2 bg-[#ff6f00] text-white h-[50px] px-5 rounded-md font-semibold text-[21px] leading-none`}
                            >
                                <PhoneCall className="h-5 w-5" />
                                {phone || "(888)-249-0566"}
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </FullContainer>
    );
}
