"use client";

import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Rubik, Inter, Poppins } from "next/font/google";
import PrimaryPhone from "@/components/common/PrimaryPhone";
import { IMAGE_BASE } from "@/lib/constants";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function About6({ content }) {
  const about = content?.about ?? {};
  const data = {
    heading: about.heading,
    description1: about.description1,
    description2: about.description2,
    points: about.points,
  };
  const image =
    buildImageSrc(IMAGE_BASE, about.file_name) ||
    buildImageSrc(IMAGE_BASE, "about/about.webp");
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  // All [key] values are resolved by resolveAllTags in page-data.js
  return (
    <FullContainer className="bg-white py-8 md:py-12" id="about">
      <Container className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-md bg-transparent shadow-[0_10px_28px_rgba(0,0,0,0.18)]">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="order-2 flex flex-col justify-center bg-[#111214] px-6 py-8 text-white md:order-1 md:col-span-3 md:px-7 md:py-9">
              {data?.heading ? (
                <h2 className="mb-3 text-xl font-bold leading-tight md:text-2xl">
                  {data.heading}
                </h2>
              ) : null}

              <div className="space-y-2 text-[17px] leading-[1.45] text-white/95 md:text-[18px]">
                {data?.description1 ? <p>{data.description1}</p> : null}
                {data?.description2 ? <p>{data.description2}</p> : null}
              </div>

              {data?.points && data.points.length > 0 && (
                <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-white/90 md:grid-cols-2">
                  {data.points.map((point, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a00]" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6">
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#ff5a00] px-5 py-2.5 text-lg font-bold leading-none text-white transition-colors hover:bg-[#e35000] "
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                  >
                    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.56 3.58.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.19 2.46.56 3.58a1 1 0 0 1-.24 1.02l-2.2 2.19Z" />
                  </svg>
                  {phone}
                </a>
              </div>
            </div>

            <div className="relative order-1 min-h-[220px] md:order-2 md:col-span-2 md:min-h-[280px]">
              {image ? (
                <Image
                  title="About Image"
                  src={image}
                  alt="About"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              ) : (
                <div className="h-full w-full bg-gray-200" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
