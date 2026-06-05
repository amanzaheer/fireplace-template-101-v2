"use client";
import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

const poppins = Poppins({
    subsets: ["latin"],
    style: ["normal", "italic"],
    weight: ["400", "500", "600", "700"],
});

function buildImageSrc(base, filePath) {
    if (!filePath || typeof filePath !== "string") return "";
    const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
    return `${basePath}/${filePath.replace(/^\//, "")}`;
}

const STEP_ICON_SVGS = [
    `<svg width="46" height="47" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg">//<rect width="45.2509" height="46.9924" rx="5.22148" fill="#F86503"/><path d="M20.8866 8.70251C19.0401 8.70251 17.2693 9.43601 15.9637 10.7416C14.6581 12.0473 13.9246 13.8181 13.9246 15.6645C13.9246 17.5109 14.6581 19.2817 15.9637 20.5873C17.2693 21.893 19.0401 22.6265 20.8866 22.6265C22.733 22.6265 24.5038 21.893 25.8094 20.5873C27.1151 19.2817 27.8485 17.5109 27.8485 15.6645C27.8485 13.8181 27.1151 12.0473 25.8094 10.7416C24.5038 9.43601 22.733 8.70251 20.8866 8.70251ZM12.1998 24.367C11.7413 24.3649 11.287 24.4534 10.8628 24.6274C10.4387 24.8014 10.0531 25.0575 9.72821 25.381C9.40331 25.7044 9.1455 26.0888 8.96959 26.5122C8.79368 26.9356 8.70312 27.3895 8.70313 27.8479C8.70313 30.7911 10.153 33.0102 12.4191 34.4566C14.6504 35.8786 17.658 36.5504 20.8866 36.5504C21.5085 36.5504 22.1212 36.5255 22.7245 36.4756C22.5854 35.8727 22.5944 35.245 22.7508 34.6464C22.9072 34.0477 23.2063 33.4959 23.6226 33.0381L24.5712 31.9816C25.0028 31.5031 25.555 31.1491 26.17 30.9565C26.785 30.764 27.4404 30.7399 28.0679 30.8868L29.4341 31.2106C30.092 30.6675 30.4906 30.027 30.6734 29.2595L29.7718 28.3788C29.3016 27.9191 28.9759 27.3322 28.8346 26.69C28.6933 26.0478 28.7426 25.3783 28.9764 24.7638L29.1261 24.367H12.1998ZM30.6055 25.3799L31.098 24.0745C31.5471 22.8893 32.9465 22.3045 34.1265 22.8075L34.8018 23.0964C35.6251 23.448 36.3056 24.085 36.4501 24.9413C37.2455 29.6842 33.1292 36.4303 28.3916 38.1517C27.5353 38.4615 26.6111 38.2213 25.8766 37.7235L25.2744 37.3145C25.0271 37.1479 24.8189 36.9298 24.6642 36.675C24.5095 36.4202 24.4119 36.1348 24.3781 35.8386C24.3444 35.5425 24.3753 35.2425 24.4687 34.9594C24.5621 34.6763 24.7159 34.4169 24.9193 34.199L25.8679 33.1425C26.0907 32.8971 26.3749 32.7157 26.6913 32.6169C27.0077 32.518 27.3447 32.5054 27.6675 32.5803L29.7996 33.0851C31.4902 32.0292 32.3965 30.544 32.5183 28.6294L30.9901 27.1343C30.7619 26.9113 30.6039 26.6264 30.5355 26.3146C30.4672 26.0029 30.4915 25.678 30.6055 25.3799Z" fill="white"/></svg>`,
    `<svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="46.4131" height="46.4131" rx="8.70247" fill="#F86503"/><path d="M8.70312 37.7108H37.7113M15.23 15.9546H31.1845" stroke="white" stroke-width="1.74049" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.4047 15.9546H29.008L31.9088 37.7108H14.5039L17.4047 15.9546Z" fill="white" stroke="white" stroke-width="1.74049" stroke-linejoin="round"/><path d="M16.6809 23.2067H29.7346M15.2305 30.4587H31.185" stroke="white" stroke-width="1.74049" stroke-linecap="round"/><path d="M29.008 15.9546L31.9088 37.7108M17.4047 15.9546L14.5039 37.7108" stroke="white" stroke-width="1.74049" stroke-linejoin="round"/><path d="M23.207 11.6033L23.8075 11.0029C24.0769 10.7334 24.3967 10.5196 24.7488 10.3738C25.1008 10.228 25.4781 10.1529 25.8591 10.1529H26.3566C26.7376 10.1529 27.1149 10.0779 27.467 9.93205C27.819 9.78621 28.1388 9.57246 28.4082 9.30298L29.0087 8.70251" stroke="white" stroke-width="1.74049" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    `<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="45" height="44.5" rx="5" fill="#F86503"/><path d="M29.3333 27.7333C33.0431 28.7613 36.4653 30.6322 39.3333 33.2L35.1667 38.5L27.6667 34.3333L29.3333 27.7333ZM29.3333 27.7333C27.1618 27.1344 24.9193 26.8316 22.6667 26.8333C20.3583 26.8333 18.1217 27.1467 16 27.7333M16 27.7333C12.2902 28.7613 8.86799 30.6322 6 33.2L10.1667 38.5L17.6667 34.3333L16 27.7333ZM6 26V19.3333H9.75333C10.0683 18.11 10.5533 16.955 11.18 15.8933L8.525 13.2383L13.2383 8.525L15.8933 11.18C16.9676 10.5459 18.1256 10.0656 19.3333 9.75333V6H26V9.75333C27.2233 10.0683 28.3783 10.5533 29.44 11.18L32.095 8.525L36.8083 13.2383L34.1533 15.8933C34.7817 16.955 35.265 18.11 35.58 19.3333H39.3333V26" stroke="white" stroke-width="2.5"/><path d="M27.666 22.6666C27.666 21.3405 27.1392 20.0688 26.2015 19.1311C25.2639 18.1934 23.9921 17.6666 22.666 17.6666C21.3399 17.6666 20.0682 18.1934 19.1305 19.1311C18.1928 20.0688 17.666 21.3405 17.666 22.6666" stroke="white" stroke-width="2.5"/></svg>`,
];

function getInlineStepIcon(index) {
    const svg = STEP_ICON_SVGS[index] ?? STEP_ICON_SVGS[0];
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default function OurWorkingProcess26({ content }) {
    const data = content?.our_process ?? content?.process ?? {};
    const heading = data?.title ?? "Our Reliable Working Process";
    const description =
        data?.description ??
        "We follow a proven fireplace service process—easy booking, on-time arrival, thorough cleaning, and final inspection to ensure consistent, high-quality results you can trust.";

    const steps = Array.isArray(data?.list) ? data.list.slice(0, 3) : [];
    if (!steps.length) return null;
    return (
        <FullContainer
            id="our_process"
            className="bg-[#ffffff] py-8 sm:py-10 md:py-14"
        >
            <Container>
                <div className="mx-auto max-w-[1010px] rounded-[34px] px-5 py-10 sm:px-8 md:px-10 md:py-14">
                    <div className="mx-auto max-w-[760px]  text-center text-black">
                        <p className={`${poppins.className}   font-regular text-[24.07] `}>
                            {heading}
                        </p>
                        <h2
                            className={`${poppins.className} mt-2 text-[39.39px] font-medium  leading-tight md:text-[39px]`}
                        >
                            {description}
                        </h2>
                    </div>
                    <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-3 md:gap-4 md:justify-items-center md:items-stretch">
                        {steps.map((step, idx) => {
                            const stepImage = step?.image
                                ? buildImageSrc(IMAGE_BASE, step.image)
                                : "";
                            const iconSrc = getInlineStepIcon(idx);
                            return (
                                <div
                                    key={`step-${idx}`}
                                    className={`mx-auto w-full max-w-[360px] rounded-[240px] px-8 py-10 min-h-[498px] flex flex-col items-center justify-center text-center ${
                                        idx === 1 ? 'bg-[#CC3333]' : 'bg-[#F5F5F5]'
                                    }`}
                                >
                                    <div className={`mb-6 inline-flex h-[42px] w-[42px] items-center justify-center rounded-[8px] ${
                                        idx === 1 ? 'bg-white' : 'bg-[#ff7a00]'
                                    }`}>
                                        {iconSrc ? (
                                            <img
                                                src={iconSrc}
                                                alt={step?.title || "Step icon"}
                                                className={`h-6 w-6 object-contain ${idx === 1 ? 'brightness-0 sepia-[1] hue-rotate-[-10deg] saturate-[5]' : ''}`}
                                            />
                                        ) : stepImage ? (
                                            <Image
                                                src={stepImage}
                                                alt={step?.title || "Step icon"}
                                                width={24}
                                                height={24}
                                                className={`h-6 w-6 object-contain ${idx === 1 ? 'brightness-0 sepia-[1] hue-rotate-[-10deg] saturate-[5]' : ''}`}
                                                unoptimized
                                            />
                                        ) : (
                                            <span className={`text-lg font-bold ${idx === 1 ? 'text-[#CC3333]' : 'text-white'}`}>
                                                {idx + 1}
                                            </span>
                                        )}
                                    </div>
                                    <h3
                                        className={`${poppins.className} text-[15.04px] font-bold leading-snug md:text-[28px] ${
                                            idx === 1 ? 'text-white' : 'text-black'
                                        }`}
                                    >
                                        {step?.title}
                                    </h3>
                                    {step?.description ? (
                                        <p
                                            className={`${poppins.className} mt-4 text-[13px] leading-relaxed font-normal md:text-[16px] ${
                                                idx === 1 ? 'text-white' : 'text-black'
                                            }`}
                                        >
                                            {step.description}
                                        </p>
                                    ) : null}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </FullContainer>
    );
}