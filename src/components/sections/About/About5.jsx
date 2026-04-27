"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

const CTA_ORANGE = "#E65100";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function About5(props) {
  const pageContent = props?.content ?? {};
  const about = pageContent?.about ?? {};
  const points = Array.isArray(about.points) ? about.points : [];
  const data = {
    heading: about.heading,
    description1: about.description1,
    description2: about.description2,
    points,
  };

  const image =
    buildImageSrc(IMAGE_BASE, about.file_name) ||
    buildImageSrc(IMAGE_BASE, "about/about.webp");

  const phone =
    pageContent?.contact_info?.phone ?? pageContent?.navbar?.phone ?? "";

  return (
    <FullContainer className="bg-white py-12 md:py-16" id="about">
      <Container className="mx-auto max-w-7xl">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 md:gap-8">
          <div className="relative w-full overflow-hidden rounded-[28px] shadow-sm">
            <div className="relative aspect-21/10 min-h-[180px] w-full md:aspect-2/1 md:min-h-[240px]">
              {image ? (
                <Image
                  title="About Image"
                  src={image}
                  alt={about.altImage ?? about.heading ?? "About"}
                  width={1200}
                  height={560}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              ) : (
                <div className="h-full w-full bg-neutral-200" />
              )}
            </div>
          </div>

          <div className="flex w-full flex-col items-center text-center">
            <h2 className=" font-extrabold leading-tight text-black md:text-5xl  lg:text-5xl">
              {data.heading ?? "About Us"}
            </h2>

            <div className="mt-4 w-full space-y-4 text-sm font-semibold leading-relaxed text-black md:text-base">
              {data.description1 ? <p>{data.description1}</p> : null}
              {data.description2 ? <p>{data.description2}</p> : null}
            </div>

            {data.points.length > 0 ? (
              <ul className="mt-6 flex w-full max-w-xl flex-col items-center gap-2">
                {data.points.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm font-semibold text-black"
                  >
                    <Check
                      className="h-4 w-4 shrink-0"
                      style={{ color: CTA_ORANGE }}
                      strokeWidth={2.5}
                      aria-hidden={true}
                    />
                    {String(point)}
                  </li>
                ))}
              </ul>
            ) : null}

            {phone ? (
              <Link
                href={`tel:${String(phone).replace(/\s/g, "")}`}
                className="mt-6 flex items-center justify-center gap-3 bg-black py-4 px-5 transition-opacity hover:opacity-90 w-fit "
              >
                <span
                  className="h-8 w-8 shrink-0 rounded-full"
                  style={{ backgroundColor: CTA_ORANGE }}
                  aria-hidden
                />
                <span
                  className="text-base font-bold tracking-wide md:text-xl"
                  style={{ color: CTA_ORANGE }}
                >
                  {phone}
                </span>
              </Link>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
