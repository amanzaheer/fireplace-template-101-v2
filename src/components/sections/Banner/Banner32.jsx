"use client";

import dynamic from "next/dynamic";
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
import { Rubik, Inter, Poppins } from "next/font/google";
import QuoteForm31 from "./QuoteForm/QuoteForm31";

const rubik = Rubik({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

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

export default function Banner32({ content }) {
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
        buildImageSrc(IMAGE_BASE, "hero/hero.webp");
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

    return (
        <FullContainer
            id="banner"
            className="relative bg-white overflow-hidden w-full min-h-[560px] md:min-h-[600px] lg:min-h-[640px]"
        >
            <div className="absolute right-0 top-0 w-[500px] h-2/2 mt-5 rounded-l-full overflow-hidden">
                <Image
                    src={image}
                    title={data?.imageTitle || data?.title || "Banner"}
                    alt={data?.altImage || data?.tagline || "No Banner Found"}
                    priority
                    fill
                    sizes="500px"
                    style={{
                        objectFit: "cover",
                        objectPosition: "center",
                    }}
                />
            </div>

            <Container className="relative z-10 font-barlow py-10 md:py-12 lg:py-16">
                <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12 text-white">
                    <div className="w-full max-w-[700px]">
                        <div className="w-fit flex flex-col items-start justify-center">
                            <div
                                className={`${poppins.className} font-black max-w-[620px]  inline-block uppercase text-[60px] md:text-[74px] leading-[0.95] text-left text-shadow-lg`}
                            >
                                
                                    <span className="text-black text-[32px] md:text-[44px]">
                                        {String(data?.heading || data?.title || "")
                                            .split(" ")
                                            .slice(0, 1)
                                            .join(" ")}{" "}
                                    </span>
                                  
                               
                                <br />

                                <span className="text-[#f59403]">
                                    {String(data?.heading || data?.title || "")
                                        .split(" ")
                                        .slice(1, 4)
                                        .join(" ")}
                                </span>
                                <br />
                                <span className="text-black text-[60px] md:text-[74px]">
                                    {String(data?.heading || data?.title || "")
                                        .split(" ")
                                        .slice(4)
                                        .join(" ")}{" "}
                                </span>
                            </div>
                            {data?.tagline ? (
                                <h2 className="text-lg md:text-2xl font-semibold leading-tight text-white/90 text-left mt-2">
                                    {data?.tagline}
                                </h2>
                            ) : null}

                            <p className="text-base md:text-xl text-left  mb-1 bg-[#F59402] p-4 rounded-3xl text-white/90 max-w-[560px]">
                                {data?.description}
                            </p>
                            {features?.length > 0 ? (
                                <ul className="mb-6 w-fit grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 md:gap-y-4">
                                    {features?.map((feature, idx) => {
                                        const IconComponent = ICON_MAP[feature.icon];
                                        return (
                                            <li
                                                key={idx}
                                                className="flex items-center gap-2.5 leading-none text-black font-semibold text-[30px] md:text-[34px]"
                                            >
                                                {IconComponent ? (
                                                    <IconComponent className="w-5 h-5 text-[#000000] shrink-0" />
                                                ) : (
                                                    <CheckCircle className="w-5 h-5 text-[#000000] shrink-0" />
                                                )}
                                                <span
                                                    className={`${inter.className} text-black font-medium text-[20px] md:text-[24px]`}
                                                >
                                                    {feature.text}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : null}

                            <div className="w-fit">
                                <a
                                    href={phone ? `tel:${phone}` : "#"}
                                    className="inline-flex items-center gap-3 rounded-full bg-[#efa536] px-3 text-black text-[40px] md:text-[54px] font-extrabold leading-none"
                                >
                                    <div className="w-11 h-11 md:w-[71px] md:h-[71px] rounded-full bg-[#efa536] flex items-center justify-center">
                                        <Image
                                            src="/st-icons/Temp3/call2.png"
                                            alt="Phone"
                                            width={150}
                                            height={150}
                                            className="w-auto h-5 md:h-[22px]"
                                        />
                                    </div>
                                    <span
                                        className={`${rubik.className} text-white font-bold text-[15px] md:text-[20px] uppercase`}
                                    >
                                        {phone}
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-fit max-w-[370px] relative ">

                        <div className="rounded-tl-[20px] rounded-br-[20px] shadow-[0_18px_50px_rgba(0,0,0,0.45)] overflow-hidden">
                            <QuoteForm31
                                data={data}
                                form_head={form_head}
                                showArrowInButton={false}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </FullContainer>
    );
}
