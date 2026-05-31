"use client";

import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

function PhoneCallIcon({ className = "h-[40px] w-[40px]" }) {
  return (
    <svg
      className={className}
      width="47"
      height="47"
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M33.0357 19.9253C32.5397 19.4293 32.2917 18.8153 32.2917 18.0833C32.2917 17.3514 32.5397 16.7383 33.0357 16.244C33.5317 15.7497 34.1448 15.5017 34.875 15.5C35.6052 15.4983 36.2192 15.7463 36.7169 16.244C37.2146 16.7417 37.4618 17.3548 37.4583 18.0833C37.4549 18.8118 37.2069 19.4258 36.7143 19.9253C36.2218 20.4247 35.6087 20.6718 34.875 20.6667C34.1413 20.6615 33.5282 20.4135 33.0357 19.9227M28.4167 14.3375L25.7042 11.625C26.9528 10.3764 28.3633 9.41883 29.9357 8.75233C31.5081 8.08583 33.1545 7.75172 34.875 7.75C36.5955 7.74828 38.2428 8.08239 39.8169 8.75233C41.391 9.42228 42.8007 10.3798 44.0458 11.625L41.3333 14.3375C40.4722 13.4764 39.4931 12.809 38.3961 12.3354C37.299 11.8618 36.1253 11.625 34.875 11.625C33.6247 11.625 32.4518 11.8618 31.3565 12.3354C30.2612 12.809 29.2812 13.4764 28.4167 14.3375ZM43.7875 46.5C38.4056 46.5 33.0882 45.3272 27.8354 42.9815C22.5826 40.6358 17.8035 37.3094 13.4979 33.0021C9.19236 28.6948 5.86675 23.9156 3.52108 18.6646C1.17542 13.4135 0.00172222 8.09617 0 2.7125C0 1.9375 0.258333 1.29167 0.775 0.775C1.29167 0.258333 1.9375 0 2.7125 0H13.175C13.7778 0 14.316 0.204944 14.7896 0.614833C15.2632 1.02472 15.5431 1.50867 15.6292 2.06667L17.3083 11.1083C17.3944 11.7972 17.3729 12.3785 17.2437 12.8521C17.1146 13.3257 16.8778 13.7347 16.5333 14.0792L10.2687 20.4083C11.1299 22.0014 12.152 23.5402 13.3352 25.0247C14.5183 26.5093 15.8212 27.9413 17.2437 29.3208C18.5785 30.6556 19.9778 31.8938 21.4417 33.0357C22.9056 34.1775 24.4556 35.2212 26.0917 36.1667L32.1625 30.0958C32.55 29.7083 33.0563 29.4181 33.6815 29.2252C34.3067 29.0324 34.9198 28.9781 35.5208 29.0625L44.4333 30.8708C45.0361 31.0431 45.5312 31.3556 45.9187 31.8086C46.3062 32.2615 46.5 32.767 46.5 33.325V43.7875C46.5 44.5625 46.2417 45.2083 45.725 45.725C45.2083 46.2417 44.5625 46.5 43.7875 46.5Z"
        fill="white"
      />
    </svg>
  );
}

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

export default function AboutSection({ content }) {
  const about = content?.about ?? {};
  const heading = about.heading ?? "About Chimney pro";
  const description1 = about.description1 ?? "";
  const description2 = about.description2 ?? "";
  const image =
    buildImageSrc(IMAGE_BASE, about.file_name) ||
    buildImageSrc(IMAGE_BASE, "about/about.webp");
  const phone =
    content?.contact_info?.phone?.trim() ||
    content?.navbar?.phone?.trim() ||
    "";

  return (
    <FullContainer className="relative overflow-hidden bg-[#0483B2] py-14 md:py-20 text-white" id="about">
      {/* Dynamic Background Accents */}
      <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full " />
      <div className="absolute -bottom-40 right-10 h-96 w-96 rounded-full bg-sky-300/15 blur-3xl pointer-events-none" />

      <Container className="relative z-10 mx-auto">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Content Text & Call Action */}
          <div className="flex flex-col space-y-5 lg:col-span-7">
            <div>
              <h2 className={`${poppins.className} text-[32px] sm:text-[40px] md:text-[46px] font-bold leading-[1.15] tracking-tight`}>
                {heading}
              </h2>
            </div>

            <div className="space-y-4 max-w-[620px]">
              <p className={`${poppins.className} text-[15px] md:text-base leading-relaxed text-white/90`}>
                {description1}
              </p>
              {description2 && (
                <p className={`${poppins.className} text-[15px] md:text-base leading-relaxed text-white/90`}>
                  {description2}
                </p>
              )}
            </div>

            {phone ? (
              <div className="pt-4">
                <Link
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className={`${poppins.className} inline-flex h-[62px] w-[294px] items-center gap-3 rounded-[100px] bg-[#D32F2F] px-[28px] text-white shadow-lg transition-colors hover:bg-[#b71c1c]`}
                >
                  <span
                    className="flex shrink-0 items-center justify-center text-white"
                    aria-hidden
                  >
                    <PhoneCallIcon />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col items-center justify-center text-center leading-none">
                    <span
                      className={`${poppins.className} text-[16px] font-medium leading-none tracking-normal text-white`}
                    >
                      Call Now
                    </span>
                    <span
                      className={`${poppins.className} mt-0.5 max-w-full truncate text-center text-[20px] font-bold leading-none tracking-normal text-white`}
                    >
                      {phone}
                    </span>
                  </span>
                </Link>
              </div>
            ) : null}
          </div>

          {/* Right Column: Custom Hexagon/Octagon Framed Image Wrapper */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative w-full max-w-[440px] aspect-[4/5]' sm:aspect-square lg:aspect-auto lg:h-[450px] p-2.5 bg-gradient-to-tr from-cyan-300 via-transparent to-cyan-400 rounded-[42px] shadow-2xl">
              <div 
                className="relative w-full h-full overflow-hidden bg-[#0483B2]"
                style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }}
              >
                {image ? (
                  <Image
                    title="About Image" 
                    src={image}
                    alt="About Us"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 35vw"
                  />
                ) : (
                  <div className="w-full h-full bg-white/10 animate-pulse" />
                )}
              </div>
            </div>
          </div>

        </div>
      </Container>
    </FullContainer>
  );
} 