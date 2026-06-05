"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    style: ["normal"],
});

function str(v) {
    if (v == null) return "";
    return String(v).trim();
}

function telHref(phone) {
    if (!phone || typeof phone !== "string") return "#";
    const digits = phone.replace(/[^\d+]/g, "");
    return digits ? `tel:${digits}` : "#";
}

function scrollToQuote() {
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
}

export default function Cta27({ content }) {
    const block = content?.cta ?? {};
    const title = str(block.title ?? block.value?.title);
    const description = str(block.description ?? block.value?.description);
    const primaryCta = str(
        block.button_label ??
        block.value?.button_label ??
        block.cta_button ??
        block.value?.cta_button,
    );
    const phoneCaption = str(block.phone_caption ?? block.value?.phone_caption ?? "Call Us");

    const phone =
        content?.banner?.cta_phone ??
        content?.contact_info?.phone ??
        content?.navbar?.phone ??
        "";
    const phoneDisplay = typeof phone === "string" ? phone.trim() : "";
    const phoneLine = phoneCaption || "Call Us";
    const phoneHref = telHref(phoneDisplay);
    const secondaryCta = primaryCta || "Book Your Service";
    if (!title && !description && !secondaryCta && !phoneLine) return null;
    return (
        <FullContainer id="cta" className="bg-[#FFFFFF] py-8 md:py-10">
            <Container>
                <div className={`mx-auto w-full max-w-[1280px] rounded-[28px] bg-[#FF0011] px-6 py-8 text-center md:px-10 md:py-10 ${poppins.className}`}>
                    {title ? (
                        <h2 className="mx-auto max-w-[980px] text-balance text-[42px] font-bold leading-[1.1]  text-white md:text-[44px]">
                            {title}
                        </h2>
                    ) : null}

                    {description ? (
                        <p className="mx-auto mt-3 max-w-[900px] text-balance leading-relaxedtext-sm font-normal text-white md:text-[16px]">
                            {description}
                        </p>
                    ) : null}

                    <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:gap-4">
                        <Link
                            href={phoneHref}
                            className="inline-flex h-[56px] min-w-[170px] items-center justify-center gap-2 rounded-xl border-2 border-white bg-[#FF0011] px-7 text-[30px] font-semibold leading-none text-white transition-colors "
                        >
                            <Phone className="h-5 w-5" aria-hidden />
                            <span>{phoneLine}</span>
                        </Link>
                        <button
                            type="button"
                            onClick={scrollToQuote}
                            className="inline-flex h-[56px] min-w-[220px] items-center justify-center rounded-xl bg-white px-8 text-[30px] font-semibold leading-none text-[#FF0011] transition-colors hover:bg-[#f6f6f6]"
                        >
                            {secondaryCta}
                        </button>
                    </div>
                </div>
            </Container>
        </FullContainer>
    );
}
