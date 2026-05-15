"use client";

import Image from "next/image";
import { Montserrat } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
    display: "swap",
});

function buildImageSrc(base, filePath) {
    if (!filePath || typeof filePath !== "string") return "";
    const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
    const segment = filePath.replace(/^\//, "");
    return `${basePath}/${segment}`;
}

function getBadgeSources(footer) {
    const extra = footer?.badge_images;
    if (Array.isArray(extra) && extra.length > 0) {
        return extra
            .map((p) => (typeof p === "string" ? buildImageSrc(IMAGE_BASE, p) : ""))
            .filter(Boolean);
    }
    return [];
}

export default function Slogan24({ content }) {
    const block = content?.slogan ?? {};
    const title = block.title ?? "";
    const description = block.description ?? "";
    const footer = content?.footer ?? {};
    const badgeSources = getBadgeSources(footer);

    if (!title && !description && badgeSources.length === 0) return null;

    return (
        <FullContainer
            id="slogan"
            className="flex flex-col items-center justify-center bg-white pb-12 pt-8 md:pb-16 md:pt-14"
        >
            <Container
                className={`flex flex-col items-center justify-center text-center ${montserrat.className}`}
            >
                {title ? (
                    <h2
                        className="w-full max-w-4xl"
                        style={{
                            color: "#111",
                            fontSize: "30px",
                            fontWeight: 700,
                            lineHeight: "1.25",
                            letterSpacing: "-0.01em",
                        }}
                    >
                        {title}
                    </h2>
                ) : null}

                {description ? (
                    <p
                        className="mt-4 w-full max-w-3xl"
                        style={{
                            color: "#000000",
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "26px",
                        }}
                    >
                        {description}
                    </p>
                ) : null}

                {badgeSources.length > 0 ? (
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 md:mt-10 md:gap-x-12">
                        {badgeSources.map((src, index) => (
                            <div
                                key={src + index}
                                className="relative flex h-14 w-auto shrink-0 items-center justify-center sm:h-16 md:h-[70px]"
                            >
                                <Image
                                    src={src}
                                    alt=""
                                    width={140}
                                    height={70}
                                    className="h-full w-auto max-w-[110px] object-contain sm:max-w-[130px] md:max-w-[140px]"
                                />
                            </div>
                        ))}
                    </div>
                ) : null}
            </Container>
        </FullContainer>
    );
}
