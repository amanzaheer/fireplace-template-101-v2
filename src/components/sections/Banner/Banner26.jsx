"use client";
import Image from "next/image";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import {
    CheckCircle,
    Clock,
    Star,
    Shield,
    Award,
    Trophy,
    ThumbsUp,
    Phone,
    FileText,
    MessageSquare,
} from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import QuoteForm26 from "./QuoteForm/QuoteForm26.jsx";

const ICON_MAP = {
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

export default function Banner26({ content }) {
    const banner = content?.banner ?? {};
    const data = {
        title: banner.title,
        tagline: banner.tagline,
        description: banner.description,
        heading: banner.heading,
        list: banner.list,
        imageTitle: banner.imageTitle,
        altImage: banner.altImage,
    };

    const image =
        buildImageSrc(IMAGE_BASE, banner.file_name) ||
        buildImageSrc(IMAGE_BASE, "hero-banner/banner.webp");

    const defaultCollageImage =
        buildImageSrc(IMAGE_BASE, banner.file_name2) ||
        buildImageSrc(IMAGE_BASE, "hero-banner/banner.webp");

    const leftCollageImage =
        buildImageSrc(IMAGE_BASE, banner.left_collage_image) || defaultCollageImage;
    const rightCollageImage =
        buildImageSrc(IMAGE_BASE, banner.right_collage_image) || defaultCollageImage;
    const bottomCollageImage =
        buildImageSrc(IMAGE_BASE, banner.bottom_collage_image) || defaultCollageImage;

    const form_head = {
        title: content?.banner?.form_title || "Get Your Free Quote",
        sub_title:
            content?.banner?.form_description || "10% Off for Online Booking",
    };

    const features = resolveRefArray(content, banner, "features");

    const phone =
        banner.cta_phone ??
        content?.contact_info?.phone ??
        content?.navbar?.phone ??
        "";

    const baseHeading = (data?.heading || data?.title || "").trim();
    const mentionText = (data?.tagline ?? "").trim();

    const headingWords = baseHeading.split(/\s+/).filter(Boolean);
    const splitIndex = Math.max(1, Math.ceil(headingWords.length / 2));

    const headingTop = headingWords.slice(0, splitIndex).join(" ");
    const headingBottom = headingWords.slice(splitIndex).join(" ");

    return (
        <FullContainer
            id="banner"
            className="relative w-full overflow-hidden bg-gradient-to-br from-[#0484B2] via-[#0484B2] to-[#050505] py-10 md:py-14"
        >
            <Container className="font-barlow">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
                    <div className="max-w-[620px]">

                        {/* ✅ FIXED HEADING STRUCTURE */}
                        <h1 className="text-4xl font-black leading-tight text-[#FFFFFF] md:text-5xl lg:text-[56px]">
                            {headingTop}
                        </h1>

                        {mentionText && (
                            <h2 className="mt-2 text-3xl font-black leading-tight text-[#FFFFFF] md:text-4xl">
                                {mentionText}
                            </h2>
                        )}

                        {headingBottom && (
                            <h1 className="mt-1 text-4xl font-black leading-tight text-[#FFFFFF] md:text-5xl lg:text-[56px]">
                                {headingBottom}
                            </h1>
                        )}

                        {/* Form */}
                        <div className="mt-6 w-full max-w-[500px] ">
                            <QuoteForm26
                                data={data}
                                form_head={form_head}
                                showArrowInButton={false}
                            />
                        </div>
                    </div>

                    {/* Right Images (UNCHANGED) */}
                    <div className="relative mx-auto w-[420px] max-w-full pb-10">
                        <div className="relative h-[480px] w-[350px] max-w-full overflow-hidden rounded-[200px] bg-white">
                            <Image
                                src={image}
                                title={data?.imageTitle || data?.title || "Banner"}
                                alt={data?.altImage || data?.tagline || "Banner"}
                                fill
                                priority
                                className="object-cover"
                                sizes="420px"
                            />
                        </div>
                        <div className="absolute bottom-7 -left-10 h-[120px] w-[130px] overflow-hidden border-2 border-white rounded-[200px] shadow-md">
                            <Image
                                src={bottomCollageImage}
                                alt={data?.altImage || "Banner"}
                                fill
                                className="object-cover"
                                sizes="222px"
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </FullContainer>
    );
}