"use client";

import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function About13({ content }) {
  const about = content?.about ?? {};
  const banner = content?.banner ?? {};
  const heading = about.heading ?? "About Chimney pro";
  const description1 = about.description1 ?? "";
  const description2 = about.description2 ?? "";
  const label = about.label ?? "ABOUT US";
  const primaryImage =
    buildImageSrc(IMAGE_BASE, about.file_name) ||
    buildImageSrc(IMAGE_BASE, "about/about.webp");
  const secondaryImage =
    buildImageSrc(IMAGE_BASE, banner.file_name) || primaryImage;
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const featuresResolved = resolveRefArray(content, banner, "features");
  const featureTexts = (Array.isArray(featuresResolved) ? featuresResolved : [])
    .map((item) =>
      typeof item === "string" ? item : (item?.text ?? item?.title ?? ""),
    )
    .filter(Boolean);

  const topHighlight = featureTexts[0] ?? "Customer Satisfaction";
  const bottomHighlight = featureTexts[1] ?? "Projects Completed";
  const chips = (featureTexts.length > 0 ? featureTexts : [topHighlight, bottomHighlight]).slice(0, 4);

  return (
    <FullContainer className="mt-0 bg-[#f2f2f2] py-10 md:py-14" id="about">
      <Container className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.02fr_1fr] lg:gap-12">
          <div className="order-2 lg:order-1">
          <div className="flex gap-4">
  {/* Left Column */}
  <div className="flex flex-1 flex-col gap-4">
    <div className="relative h-[230px] overflow-hidden rounded-[20px] md:h-[250px]">
      {primaryImage ? (
        <Image
          title="About Image"
          src={primaryImage}
          alt="About"
          fill
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 1024px) 50vw, 260px"
        />
      ) : (
        <div className="h-full w-full bg-gray-200" />
      )}
    </div>

    <div className="flex h-[100px] flex-col items-center justify-center rounded-[20px]  bg-[#542387] px-4 text-center md:h-[128px]">
      <p
        className={`${poppins.className} break-words text-[30px] font-bold leading-tight text-white md:text-[47px]`}
      >
        850+
      </p>
      <p
        className={`${poppins.className} mt-2 text-[14px] font-medium leading-tight text-white md:text-[18px]`}
      >
        Projects Completed
      </p>
    </div>
  </div>

  {/* Right Column */}
  <div className="flex flex-1 flex-col gap-4">
    <div className="flex h-[100px] flex-col items-center justify-center rounded-[20px] bg-[#CCDE1F] px-4 text-center md:h-[128px]">
      <p
        className={`${poppins.className} break-words text-[30px] font-bold leading-tight text-black md:text-[47px]`}
      >
        850+
      </p>
      <p
        className={`${poppins.className} mt-2 text-[14px] font-medium leading-tight text-black md:text-[18px]`}
      >
        Customer Satisfication
      </p>
    </div>

    <div className="relative h-[230px] overflow-hidden rounded-[20px] md:h-[250px]">
      {secondaryImage ? (
        <Image
          title="About Overlay Image"
          src={secondaryImage}
          alt="About detail"
          fill
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 1024px) 50vw, 260px"
        />
      ) : (
        <div className="h-full w-full bg-gray-200" />
      )}
    </div>
  </div>
</div>
          </div>

          <div className="order-1 lg:order-2">
            <h2
              className={`${poppins.className} mb-4 text-[36px] font-bold leading-[1.05] text-black md:text-[48px]`}
            >
              {heading}
            </h2>

            <p
              className={`${poppins.className} text-sm leading-normal text-black md:text-[18px]`}
            >
              {description1}
            </p>
            {description2 ? (
              <p
                className={`${poppins.className} mt-3 text-sm leading-normal text-black md:text-[18px]`}
              >
                {description2}
              </p>
            ) : null}

            {chips.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

                {chips.map((feature, index) => (
                  <div
                    key={`${feature}-${index}`}
                    className={`${poppins.className} flex min-h-[40px] items-center rounded-[2px]  bg-[#542387] px-4 text-[14px] font-medium text-white md:text-[16px]`}
                  >
                    <div>
                        <Image src="/st-icons/Temp13/shield.png" alt="Check" width={25} height={25} />
                        </div>
                    {feature}
                  </div>
                ))}
              </div>
            ) : null}

            {phone ? (
              <div className="flex w-full shrink-0 items-center pt-5">
                <a
                  href={`tel:${phone}`}
                  className="inline-flex h-[73.33px] w-[258px] shrink-0 flex-col items-center justify-center rounded-[12px] bg-[#CDE02E] pt-[2.72px] pr-[1.36px] pb-[2.72px] pl-[1.36px] text-center shadow-md transition hover:bg-[#c2d52a]"
                >
                  <p
                    className={`${poppins.className} text-[21px] font-medium leading-none text-black`}
                  >
                    CALL NOW:
                  </p>
                  <p
                    className={`${poppins.className} mt-2 text-[27px] font-bold leading-none text-black`}
                  >
                    {phone}
                  </p>
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
