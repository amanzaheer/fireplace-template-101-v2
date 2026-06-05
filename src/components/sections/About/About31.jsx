"use client";

import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Rubik, Inter, Poppins } from "next/font/google";

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
function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function About31({ content }) {
  const about = content?.about ?? {};
  const heading = about.heading ?? "About Chimney pro";
  const description1 = about.description1 ?? "";
  const description2 = about.description2 ?? "";
  const image =
    buildImageSrc(IMAGE_BASE, about.file_name) ||
    buildImageSrc(IMAGE_BASE, "about/about.webp");
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const banner = content?.banner ?? {};
  const data = {
    heading: banner.heading,
    title: banner.title,
    description: banner.description,
    imageTitle: banner.imageTitle,
    altImage: banner.altImage,
  };
  return (
    <FullContainer className="py-10 md:py-14 bg-[#efefef]" id="about">
      <Container className="max-w-6xl mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 md:gap-10 items-start">
          <div className="relative">
            <div className="relative min-h-[320px] md:min-h-[420px] rounded-[28px] overflow-hidden">
              {image ? (
                <Image
                  title="About Image"
                  src={image}
                  alt="About"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
          </div>

          <div className="pt-2 md:pt-3 min-w-0">
            <h2 className={`${poppins.className} text-4xl md:text-[44px] font-extrabold leading-none text-[#111111] mb-3`}>
              {heading}
            </h2>

            <p className={`${rubik.className} text-sm md:text-base leading-[1.4] text-[#212020]`}>
              {description1}
            </p>

            <div className="mt-4 md:mt-6 lg:mt-16 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-6">
              <div className="h-auto w-full min-w-0 md:min-w-[400px] md:w-[80%] bg-[#f59403] leading-none rounded-[26px] p-5 md:p-6 text-white lg:shrink-0 lg:w-[400px] lg:-ml-[350px] lg:z-10">
                <span className={`${rubik.className} text-black text-[30px] md:text-[38px]`}>
                  {String(data?.heading || data?.title || "").split(" ").slice(0, 1).join(" ")}{" "}
                </span>
                <br />
                <span className={` ${rubik.className} text-white text-[30px] md:text-[38px] font-bold`}>
                  {String(data?.heading || data?.title || "").split(" ").slice(1).join(" ")}{" "}
                </span>
                <a
                  href={phone ? `tel:${phone}` : "#"}
                  className="mt-4 inline-flex items-center gap-2 rounded-full text-white px-4 py-2.5 text-[30px] font-bold"
                >
                  <div className="rounded-full bg-black h-14 w-14 flex shrink-0 items-center justify-center">
                    <Image src="/st-icons/Temp3/call2.png" alt="Phone" width={150} height={150} className="w-auto h-5 md:h-[22px]" />
                  </div>
                  <span className={`${rubik.className} text-white font-bold text-[24px] md:text-[30px] uppercase wrap-break-word`}>
                    {phone}
                  </span>
                </a>
              </div>

              {description2 ? (
                <div className="min-w-0 flex-1 lg:pt-2">
                  <p className={`${rubik.className} text-sm md:text-base leading-[1.4] text-[#212020]`}>
                    {description2}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
