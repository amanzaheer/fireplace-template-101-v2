"use client";

import React, { useMemo } from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins, Inter, Rubik, Archivo } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
const rubik = Rubik({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
const archivo = Archivo({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
function MapPinIcon({ className = "w-7 h-7 text-[#d98200]" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12.0001 2C7.58908 2 4.00008 5.589 4.00008 9.995C3.97108 16.44 11.6961 21.784 12.0001 22C12.0001 22 20.0291 16.44 20.0001 10C20.0001 5.589 16.4111 2 12.0001 2ZM12.0001 14C9.79008 14 8.00008 12.21 8.00008 10C8.00008 7.79 9.79008 6 12.0001 6C14.2101 6 16.0001 7.79 16.0001 10C16.0001 12.21 14.2101 14 12.0001 14Z" fill="#BF1309" />
        </svg>
    );
}

function getLocationsList(content, block) {
    const direct = block?.list ?? block?.value?.list;
    if (Array.isArray(direct)) return direct;
    const ref = block?.childrenRef && content?.[block.childrenRef];
    if (Array.isArray(ref)) return ref;
    if (ref && Array.isArray(ref.list)) return ref.list;
    return [];
}

export default function ServiceCities4({ content }) {
    const block = content?.locations ?? {};
    const cities = useMemo(() => getLocationsList(content, block), [content, block]);
    const title = block?.title ?? block?.value?.title ?? "Areas We Serve";

    if (cities.length === 0) return null;

    return (
        <FullContainer className={`py-10 md:py-14 bg-white `} id="locations">
            <Container>
                <div className="max-w-6xl mx-auto">
                    <h2 className={`${poppins.className} text-center text-4xl md:text-[44px] font-bold text-[#2d2d2d] tracking-tight mb-8 md:mb-10`}>
                        {title}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-3 md:gap-x-5 gap-y-3">
                        {cities.map((city, index) => (
                            <div
                                key={index}
                                className="inline-flex items-center gap-0.5 w-fit h-fit px-2.5 py-1"
                            >
                                <MapPinIcon className="w-4.5 h-4.5 text-[#BF1309] shrink-0" />
                                <span className={`${inter.className} text-ink text-sm md:text-base font-normal leading-none drop-shadow-sm`}>
                                    {typeof city === "string" ? city : city?.name ?? city?.title ?? String(city)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </FullContainer>
    );
}
