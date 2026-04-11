"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone, TextQuote } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { IMAGE_BASE } from "@/lib/constants";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function ServiceBenefits9 ({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.service_benefits ?? {};
  const heading = block.heading ?? "";
  const list = Array.isArray(block.list) ? block.list : [];
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);

  if (list.length === 0) return null;

  const handleQuoteClick = () => {
    const el =
      document.getElementById("quote-form-section") ??
      document.querySelector('.quote-form, [id*="quote"], [class*="quote-form"]');

    if (el) {
      const offset = 80;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <FullContainer id="service_benefits" className="py-0 md:py-8 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:w-[111%] rounded-md relative bg-blue-500 h-full overflow-hidden min-h-[200px] md:min-h-[320px]">
            {imageSrc ? (
              <Image
                title="Service Background"
                src={imageSrc}
                alt="Service Benefits"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 bg-blue-200" />
            )}
          </div>
          <div className="px-4 md:px-10 py-8 flex flex-col gap-4 rounded-2xl shadow-[0_0_5px_rgba(0,0,0,0.5)] bg-white z-10 my-7">
            {heading ? (
              <Heading
                text={heading}
                className="text-center text-[#000000] md:text-start"
              />
            ) : null}
            <div className="flex items-center justify-center md:justify-start">
              <div className="flex flex-col w-fit space-y-[6px]">
                {list.map((benefit, index) => (
                  <div key={index} className="flex px-4 items-start">
                    <ChevronRight className="mt-1 h-5 w-5 shrink-0 stroke-[4] text-[#EFA536]" />
                    <span
                      className={`${poppins.className} ml-2 text-base font-normal leading-normal text-[#000]`}
                    >
                      {typeof benefit === "object" ? benefit?.title : benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full gap-2 justify-start hidden md:flex flex-col lg:flex-row items-start lg:items-center lg:gap-4">
              <Link href={`tel:${phone}`}>
                <button
                  type="button"
                  className="flex min-w-[205px] items-center justify-center gap-2 rounded-none bg-[#EFA536] px-6 py-3 font-barlow text-lg font-semibold text-white shadow transition-colors hover:bg-[#EFA536]/85 sm:justify-start"
                >
                  <Phone className="h-5 w-5 shrink-0 text-white" strokeWidth={2.25} />
                  {phone}
                </button>
              </Link>
              <button
                type="button"
                onClick={handleQuoteClick}
                className="inline-flex min-w-[160px] w-[205px] items-center justify-center gap-2 rounded-none bg-[#EFA536] px-6 py-3 font-barlow text-base font-bold text-white transition-colors hover:bg-[#EFA536]/85 md:text-base"
              >
                <div className="flex items-center gap-2">
                  <TextQuote className="h-6 w-6 shrink-0 text-white" strokeWidth={2.25} />
                  <span className="text-md ml-2 font-thin tracking-widest md:text-xl md:tracking-normal">
                    GET A QUOTE
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
