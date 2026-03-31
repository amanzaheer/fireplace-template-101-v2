        "use client";

        import React from "react";
        import Image from "next/image";
        import QuoteButton from "@/components/common/QuoteButton";
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
        } from "lucide-react";
        import FullContainer from "@/components/common/FullContainer";
        import Container from "@/components/common/Container";
        import PrimaryPhone from "@/components/common/PrimaryPhone";
        import { IMAGE_BASE } from "@/lib/constants";
        import { resolveRefArray } from "@/lib/content-helpers";

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

        export default function WhyChoose8({ content }) {
        const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
        const block = content?.why_choose ?? {};
        const featuresResolved = resolveRefArray(content, block, "features");
        const features = Array.isArray(featuresResolved)
        ? featuresResolved
        : Array.isArray(content?.features)
        ? content.features
        : [];
        const heading = block.heading ?? "Why Choose Us";
        const subHeading = block?.title ?? "Why Choose Us";
        const description = block?.description ?? "";
        const filePath = block.file_name ?? "about/about.webp";
        const imageSrc = buildImageSrc(IMAGE_BASE, filePath);

        return (
            <FullContainer id="whychooseus" className="py-10 md:py-14 bg-[#f3f3f3]">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
                <div className="w-full">
                    <p className="text-[#5a5d63] text-2xl md:text-3xl font-medium mb-2">
                    {subHeading}
                    </p>
                    <h2 className="text-[42px] md:text-[56px] font-extrabold text-black leading-[1.08] mb-4">
                    {heading}
                    </h2>
                    {description ? (
                    <p className="text-[#2f3237] text-lg md:text-[20px] leading-[1.55] max-w-[620px] mb-6">
                        {description}
                    </p>
                    ) : null}
                    <ul className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                    {features.map((feature, idx) => {
                        const iconName =
                        typeof feature === "object" ? feature?.icon : null;
                        const text =
                        typeof feature === "object"
                            ? feature?.text
                            : typeof feature === "string"
                            ? feature
                            : "";
                        const IconComponent = iconName ? iconMap[iconName] : CheckCircle;
                        return (
                        <li
                            key={idx}
                            className="flex items-center gap-3 text-[#252930] font-medium text-[18px] md:text-[20px]"
                        >
                            {IconComponent && (
                            <IconComponent className="min-w-5 w-5 h-5 text-[#e97a16] shrink-0" />
                            )}
                            {text}
                        </li>
                        );
                    })}
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-4 w-full mt-2 [&_button]:!bg-[#f07a13] [&_button]:!text-white [&_button]:hover:!bg-[#df6208] [&_button_svg]:!text-white">
                    <PrimaryPhone phone={phone} />
                    <QuoteButton phone={phone} />
                    </div>
                </div>
                <div className="w-full flex justify-center lg:justify-end relative mt-4 lg:mt-0">
                    <div className="relative w-full max-w-[780px] h-[330px] md:h-[420px]">
                    <div className="absolute left-0 top-0 rounded-xl overflow-hidden w-[64%] h-[92%] bg-gray-200 shadow-[0_10px_25px_rgba(0,0,0,0.15)]">
                    {imageSrc ? (
                        <Image
                        src={imageSrc}
                        alt="Why choose us"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 34vw"
                        loading="lazy"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                        Why Choose Us
                        </div>
                    )}
                    </div>
                    <div className="absolute right-0 bottom-0 rounded-xl overflow-hidden w-[44%] h-[92%] bg-gray-200 shadow-[0_10px_25px_rgba(0,0,0,0.15)]">
                    {imageSrc ? (
                        <Image
                        src={imageSrc}
                        alt="Why choose us second image"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 24vw"
                        loading="lazy"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                        Why Choose Us
                        </div>
                    )}
                    </div>
                    </div>
                </div>
                </div>
            </Container>
            </FullContainer>
        );
        }
