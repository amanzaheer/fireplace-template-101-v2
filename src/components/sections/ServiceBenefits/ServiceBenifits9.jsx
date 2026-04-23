"use client";

import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Montserrat } from "next/font/google";
import { ArrowRight } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
  const heading = block.heading ?? "Committed to Excellence";
 
  const list = Array.isArray(block.list) ? block.list : [];
  const sectionTitle = block.title ?? "Chimney Service CO Benefits";
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
    <FullContainer id="service_benefits" className="py-10 md:py-14 overflow-hidden bg-white">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 md:gap-10 lg:gap-14 items-center">
            <div className="relative flex justify-center lg:justify-end order-2 lg:order-2">
              <div className="relative h-[526px] rounded  w-full max-w-[540px] shrink-0 overflow-hidden bg-gray-100">
                {imageSrc ? (
                  <Image
                    title="Service Background"
                    src={imageSrc}
                    alt="Service Benefits"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 540px"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200" />
                )}
              </div>
            </div>

            <div className={montserrat.className}>
              <p className="mt-6 text-xl font-medium leading-tight text-[#4a4a4a] md:text-3xl">
                {heading}
              </p>
              <h3 className="mb-2 mt-6 h-[106px] w-[433px] text-[35px] font-bold leading-[0.95] text-black">
                {sectionTitle}
              </h3>

              <div className="grid grid-cols-1 gap-x-2">
                {list.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div className="h-7 w-7 shrink-0 whitespace-nowrap">
                      <Image
                        src="/st-icons/Temp12/shield.png"
                        alt="Check"
                        width={28}
                        height={28}
                        className="h-7 w-7 object-contain"
                      />
                    </div>
                    <span className="text-[16px] leading-snug text-[#222222] md:text-[18px]">
                      {typeof benefit === "object" ? benefit?.title : benefit}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-8 sm:flex-row">
                {/* <a
                  href={`tel:${phone}`}
                  className="inline-flex h-[46px] min-w-[219px] items-center justify-center gap-2 bg-[#da4909] px-8 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-yellow-600"
                >
                  Call Us Today
                  <span aria-hidden="true">→</span>
                </a> */}
                
                <a
              href={phone ? `tel:${phone}` : "#"}
              className="inline-flex h-auto min-h-[46px] w-[323px] shrink-0 items-center justify-center gap-2 rounded-full border-3 border-white bg-[#da4909] px-6 py-[11px] font-normal uppercase tracking-wide text-white shadow-lg transition-opacity hover:opacity-95"
            >
              <span className="text-[16px]">CALL NOW:</span>
              <span className="text-[20px] font-bold">
                {phone || "(888)-249-0566"}
              </span>
            </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
