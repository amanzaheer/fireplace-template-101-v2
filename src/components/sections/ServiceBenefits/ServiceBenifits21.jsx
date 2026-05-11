"use client";
import Image from "next/image";
import { Phone, ShieldCheck } from "lucide-react";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
const ACCENT = "#F86503";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}
function benefitLabel(item) {
  if (typeof item === "object" && item !== null)
    return item.title ?? item.text ?? item.name ?? "";
  if (typeof item === "string") return item;
  return "";
}
export default function ServiceBenefits21({ content }) {
  const rawPhone =
    content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const phoneDisplay =
    typeof rawPhone === "string"
      ? rawPhone.trim()
      : String(rawPhone ?? "").trim();
  const telHref =
    phoneDisplay.length > 0
      ? `tel:${phoneDisplay.replace(/[^\d+]/g, "")}`
      : "tel:+18882490566";
  const phoneShown = phoneDisplay || "(888)-249-0566";
  const block = content?.service_benefits ?? {};
  const heading = block.heading ?? "";
  const intro =
    block.description ??
    "Chimney One provides top-quality chimney maintenance and repair services with precision and care. From cleaning and inspections to expert repairs, our experienced team ensures safety and long-lasting performance for your chimney.";
  const list = Array.isArray(block.list) ? block.list : [];
  const sectionTitle =
    block.title ?? "Why Our Chimney Services Stand Out";
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);
  if (list.length === 0) return null;
  return (
    <FullContainer
      id="service_benefits"
      className={`overflow-hidden bg-white py-12 md:py-16 lg:py-20 ${poppins.className}`}
    >
      <Container className="max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Image */}
          <div className="order-2 w-full lg:order-1">
            <div
              className="relative mx-auto w-full max-w-[525px] overflow-hidden rounded-[37px] bg-[#eaeaea] shadow-[0_16px_40px_rgba(0,0,0,0.1)] lg:mx-0"
              style={{ aspectRatio: "525 / 478" }}
            >
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={sectionTitle}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) min(100vw, 525px), 525px"
                  loading="lazy"
                  unoptimized
                />
              ) : null}
            </div>
          </div>
          {/* Copy + benefits */}
          <div className="order-1 flex flex-col lg:order-2 lg:pl-2">
            {heading ? (
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#F86503]">
                {heading}
              </p>
            ) : null}

            <h2 className="mt-2 text-left text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-[40px] md:leading-tight">
              {sectionTitle}
            </h2>

            {intro ? (
              <p className="mt-4 max-w-xl text-left text-[15px] leading-[1.75] text-[#4a4a4a] md:text-base">
                {intro}
              </p>
            ) : null}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
              {list.map((benefit, index) => {
                const label = benefitLabel(benefit);
                if (!label) return null;
                return (
                  <div
                    key={`sb-${index}`}
                    className="flex min-h-[37px] w-full items-center gap-2 rounded-lg px-3 py-1"
                    style={{
                      paddingTop: 4,
                      paddingBottom: 4,
                      paddingLeft: 13,
                      paddingRight: 13,
                      gap: 5,
                      backgroundColor: ACCENT,
                    }}
                  >
                    <span className="flex h-[29px] w-[29px] shrink-0 items-center justify-center">
                      <ShieldCheck
                        className="text-white"
                        strokeWidth={2.5}
                        aria-hidden
                        style={{
                          width: 21.75,
                          height: 26.58,
                          marginTop: 1.21,
                          marginLeft: 3.63,
                        }}
                      />
                    </span>
                    <span className="text-left text-[13px] font-semibold leading-snug text-white sm:text-[15px]">
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={telHref}
                className="inline-flex h-[54px] min-w-[220px] items-center justify-center gap-2 rounded-[10px] px-6 text-[15px] font-bold uppercase tracking-wide text-white transition-[filter] hover:brightness-110 md:text-base"
                style={{ backgroundColor: ACCENT }}
              >
                Call us today
                <Phone className="h-5 w-5 shrink-0" strokeWidth={2.5} aria-hidden />
              </a>
              <a
                href={telHref}
                className="inline-flex h-[54px] min-w-[220px] items-center justify-center rounded-[10px] border-2 border-[#082A51] px-6 text-[17px] font-bold text-[#082A51] transition-colors hover:bg-[#082A51]/5"
              >
                {phoneShown}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
