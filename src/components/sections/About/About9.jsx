"use client";

import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Phone, ShieldCheck } from "lucide-react";
import { Poppins, Rubik } from "next/font/google";
import { IMAGE_BASE } from "@/lib/constants";

const CLIP_LEFT = "polygon(0% 8%, 100% 0%, 100% 100%, 0% 92%)";
const CLIP_RIGHT = "polygon(0% 0%, 100% 8%, 100% 92%, 0% 100%)";
const clipStyle = (value) => ({
  clipPath: value,
  WebkitClipPath: value,
});
const PANEL_LEFT = "min-h-[280px] flex-1 sm:min-h-[340px] lg:h-[540px] lg:w-[262px] lg:min-h-0 lg:flex-none";
const PANEL_RIGHT = "min-h-[280px] flex-1 sm:min-h-[340px] lg:h-[540px] lg:w-[265px] lg:min-h-0 lg:flex-none";
const PANEL_INNER = "h-full w-full overflow-hidden rounded-[30px]";

const minH = "clamp(280px, 42vw, 460px)";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const rubik = Rubik({
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

function SplitAboutImage({ src, srcRight, alt }) {
  const sameImage = src && (!srcRight || srcRight === src);

  if (!src) {
    return (
      <figure className="m-0 w-full max-w-lg lg:max-w-none" aria-label={alt}>
        <div className="w-full max-w-lg lg:max-w-none" style={{ minHeight: minH }}>
          <div className="flex h-full min-h-[260px] gap-[14px]">
            <div className={PANEL_LEFT}>
              <div className={PANEL_INNER}>
                <div className="h-full w-full bg-neutral-200/70" style={clipStyle(CLIP_LEFT)} />
              </div>
            </div>
            <div className={PANEL_RIGHT}>
              <div className={PANEL_INNER}>
                <div className="h-full w-full bg-neutral-200/70" style={clipStyle(CLIP_RIGHT)} />
              </div>
            </div>
          </div>
        </div>
      </figure>
    );
  }

  if (sameImage) {
    const bg = `url(${src})`;
    return (
      <figure className="m-0 w-full max-w-lg lg:max-w-none" aria-label={alt}>
        <div className="flex gap-[14px]" style={{ minHeight: minH }}>
          <div className={PANEL_LEFT}>
            <div className={PANEL_INNER}>
              <div
                className="h-full w-full bg-no-repeat"
                style={{
                  backgroundImage: bg,
                  backgroundSize: "200% 100%",
                  backgroundPosition: "left center",
                  ...clipStyle(CLIP_LEFT),
                }}
              />
            </div>
          </div>
          <div className={PANEL_RIGHT}>
            <div className={PANEL_INNER}>
              <div
                className="h-full w-full bg-no-repeat"
                style={{
                  backgroundImage: bg,
                  backgroundSize: "200% 100%",
                  backgroundPosition: "right center",
                  ...clipStyle(CLIP_RIGHT),
                }}
              />
            </div>
          </div>
        </div>
      </figure>
    );
  }

  return (
    <figure className="m-0 w-full max-w-lg lg:max-w-none" aria-label={alt}>
      <div className="flex gap-[14px]" style={{ minHeight: minH }}>
        <div className={PANEL_LEFT}>
          <div className={PANEL_INNER}>
            <div
              className="h-full w-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${src})`,
                ...clipStyle(CLIP_LEFT),
              }}
            />
          </div>
        </div>
        <div className={PANEL_RIGHT}>
          <div className={PANEL_INNER}>
            <div
              className="h-full w-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${srcRight})`,
                ...clipStyle(CLIP_RIGHT),
              }}
            />
          </div>
        </div>
      </div>
    </figure>
  );
}

function AboutCheckIcon() {
  return (
    <span
      className="inline-flex h-[29.42px] min-w-[30.25px] shrink-0 items-center justify-center rounded-[5px] bg-[#EFA536] px-2 py-[6px]"
      aria-hidden
    >
      <ShieldCheck className="h-[14px] w-[14px] text-[#FFFFFF]" strokeWidth={2.5} />
    </span>
  );
}

export default function About9({ content }) {
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

  const imageRight =
    typeof about.file_name_2 === "string" && about.file_name_2.trim()
      ? buildImageSrc(IMAGE_BASE, about.file_name_2)
      : image;

  const phoneRaw = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const phone = typeof phoneRaw === "string" ? phoneRaw : "";
  const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#";

  const points = Array.isArray(data.points) ? data.points : [];
  const imageAlt =
    typeof about.alt === "string" && about.alt.trim() ? about.alt.trim() : "About";

  return (
    <FullContainer className="bg-white py-12 md:py-16 lg:py-20" id="about">
      <Container className="max-w-[1270px]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex min-w-0 justify-center lg:justify-start">
            <SplitAboutImage src={image} srcRight={imageRight} alt={imageAlt} />
          </div>

          <div
            className={`${poppins.className} flex min-h-0 w-full max-w-xl flex-col justify-center gap-6 lg:max-w-none lg:justify-center`}
          >
            {data.heading ? (
              <h2
                className="text-[44px] font-bold uppercase leading-[77px] tracking-normal text-[#000000]"
              >
                {data.heading}
              </h2>
            ) : null}

            {(data.description1 || data.description2) ? (
              <div
                className={`${poppins.className} space-y-3 text-[16px] font-normal leading-relaxed text-[#000000]`}
              >
                {data.description1 ? <p>{data.description1}</p> : null}
                {data.description2 ? <p>{data.description2}</p> : null}
              </div>
            ) : null}

            {points.length > 0 ? (
              <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {points.map((point, index) => {
                  const label =
                    typeof point === "string"
                      ? point
                      : point?.text ?? point?.title ?? String(point ?? "");
                  return (
                    <li
                      key={index}
                      className={`${poppins.className} flex items-center gap-[10px] text-[16px] font-medium leading-[100%] tracking-normal text-[#000000]`}
                    >
                      <AboutCheckIcon />
                      <span className="min-w-0 flex-1">{label}</span>
                    </li>
                  );
                })}
              </ul>
            ) : null}

            {phone ? (
              <a
                href={phoneHref}
                className={`${rubik.className} inline-flex h-[47px] w-[217px] shrink-0 items-center justify-center gap-2 rounded-lg bg-[#EFA536] text-[19px] font-semibold text-[#FFFFFF] shadow-md transition-colors hover:bg-[#e49a2a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EFA536]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white`}
              >
                <Phone className="h-5 w-5 shrink-0 text-[#FFFFFF]" strokeWidth={2.25} />
                <span>{phone}</span>
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
