"use client";

import Image from "next/image";
import { Poppins, Rubik } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** Design asset: 46×46 rounded square #F59402 + black checkmark */
function StepCheckIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 46 46"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M0 10.9474C0 4.9013 4.9013 0 10.9474 0H36.4211C41.7114 0 46 4.28864 46 9.57895V36.4211C46 41.7114 41.7114 46 36.4211 46H9.57895C4.28864 46 0 41.7114 0 36.4211V10.9474Z"
        fill="#ffffff"
      />
      <path
        d="M32.5286 11.9808C32.0885 11.7362 31.6046 11.5807 31.1044 11.5232C30.6042 11.4656 30.0976 11.5072 29.6134 11.6455C29.1293 11.7838 28.6772 12.0161 28.2829 12.3292C27.8885 12.6422 27.5597 13.0299 27.3153 13.47L20.1987 26.2772L16.1258 22.2043C15.7721 21.8382 15.3492 21.5461 14.8815 21.3452C14.4138 21.1443 13.9108 21.0386 13.4018 21.0342C12.8928 21.0297 12.388 21.1267 11.9169 21.3195C11.4458 21.5122 11.0178 21.7968 10.6579 22.1568C10.298 22.5167 10.0134 22.9447 9.82061 23.4158C9.62787 23.8869 9.53088 24.3917 9.5353 24.9007C9.53972 25.4096 9.64547 25.9127 9.84637 26.3803C10.0473 26.848 10.3393 27.271 10.7054 27.6246L18.3721 35.2913C19.0966 36.0177 20.0741 36.4164 21.0823 36.4164L21.6132 36.378C22.2007 36.2958 22.7612 36.0784 23.2504 35.7428C23.7397 35.4072 24.1443 34.9627 24.4326 34.4441L34.0159 17.1941C34.2606 16.7541 34.4162 16.2703 34.4739 15.7702C34.5315 15.2701 34.4901 14.7635 34.352 14.2794C34.2139 13.7953 33.9818 13.3431 33.6689 12.9487C33.3561 12.5543 32.9686 12.2254 32.5286 11.9808Z"
        fill="black"
      />
    </svg>
  );
}

/** Shown when CMS has no list (same idea as Banner14 default features). */
const DEFAULT_STEPS = [
  {
    title: "Tell us what you need",
    description:
      "Share a few details online or by phone so we can understand your fireplace issue.",
  },
  {
    title: "Get a clear plan",
    description:
      "We explain options and pricing before any work begins—no surprises.",
  },
  {
    title: "Expert on-site service",
    description:
      "Licensed technicians arrive on time with the right tools and parts.",
  },
  {
    title: "Safe, reliable results",
    description:
      "We test everything, leave the area tidy, and you get dependable warmth again.",
  },
];

function firstNonEmptyArray(...candidates) {
  for (const a of candidates) {
    if (Array.isArray(a) && a.length > 0) return a;
  }
  return null;
}

function pickFeatureList(block, content) {
  const resolved = resolveRefArray(content, block, "features");
  return (
    firstNonEmptyArray(
      resolved,
      block.features,
      block.items,
      block.points,
      block.steps,
      block.list,
    ) ?? DEFAULT_STEPS
  );
}
function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

/** Support `{ title, description|text }`, `{ text }` only, or string. */
function getStepParts(feature, index) {
  if (typeof feature === "string") {
    return { title: "", description: feature };
  }
  const obj = feature ?? {};
  const title = obj.title ?? obj.heading ?? "";
  const rawText = typeof obj.text === "string" ? obj.text : "";
  const description =
    (typeof obj.description === "string" && obj.description) ||
    (typeof obj.subtitle === "string" && obj.subtitle) ||
    "";

  if (title) {
    return {
      title,
      description: description || rawText || "",
    };
  }
  if (rawText) {
    const lines = rawText
      .split(/\n+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (lines.length >= 2) {
      return { title: lines[0], description: lines.slice(1).join(" ") };
    }
    const colon = rawText.indexOf(":");
    if (colon > 0 && colon < 48) {
      return {
        title: rawText.slice(0, colon).trim(),
        description: rawText.slice(colon + 1).trim(),
      };
    }
    return { title: rawText, description: "" };
  }

  return { title: "", description: "" };
}

export default function WhyChoose22({ content }) {
  const block = content?.why_choose ?? {};
  const features = pickFeatureList(block, content);
  const heading = (block.heading ?? "How We Can Help").trim();
  const subheading = (
    block.description ??
    block.subheading ??
    block.tagline ??
    ""
  )
    .toString()
    .trim();
  const imagePath =
    block.main_image ?? block.file_name ?? block.image ?? block.file_name2;
  const imageSrc = buildImageSrc(IMAGE_BASE, imagePath);
  const imageAlt = block.alt ?? block.image_alt ?? heading ?? "";
  const useUnoptimized =
    imageSrc.startsWith("/api/") ||
    imageSrc.startsWith("http://") ||
    imageSrc.startsWith("https://");

  return (
    <FullContainer id="whychooseus" className="bg-[#f0520e] py-14 md:py-10 lg:py-24">
      <Container className="max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex w-full min-w-0 flex-col items-center gap-10 md:gap-12 lg:gap-14">
          <header className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
            <h2
              className={`${poppins.className} w-full self-stretch text-center  text-3xl md:text-[40px]  font-bold text-white tracking-tight`}
            >
              {heading}
            </h2>

            {subheading ? (
              <p
              className={`${poppins.className} mt-3 text-xs font-normal leading-relaxed text-white sm:text-[13px] md:mt-4 md:text-[16px]`}
            >
                {subheading}
              </p>
            ) : null}
          </header>

          <div className="grid w-full min-w-0 grid-cols-1 items-center gap-8  lg:grid-cols-[minmax(260px,380px)_1fr] lg:gap-10 xl:grid-cols-[minmax(300px,420px)_1fr] xl:gap-20">
            {imageSrc ? (
              <div className="relative mx-auto hidden w-full max-w-[380px] lg:mx-0 lg:block lg:max-w-none">
                <div className="relative scale-90 md:scale-130 w-[573px] h-[630px]">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-contain object-bottom"
                    sizes="(max-width: 1024px) 90vw, 420px"
                    unoptimized={useUnoptimized}
                  />
                </div>
              </div>
            ) : null}

            <ul className="grid w-full min-w-0 list-none grid-cols-1 gap-12 sm:grid-cols-2">
              {features.map((feature, idx) => {
                const { title, description } = getStepParts(feature, idx);
                if (!title && !description) return null;
                return (
                  <li
                    key={idx} 
                    className="flex items-start gap-3.5 sm:gap-4"
                  >
                    <StepCheckIcon className="h-9 w-9 shrink-0 md:h-10 md:w-10" />
                    <div className="flex min-w-0 flex-1 flex-col items-stretch text-left">
                      {title ? (
                        <h3
                          className={`${rubik.className} text-base font-bold text-white text-[19px] md:text-[19.2px]`}
                        >
                          {title}
                        </h3>
                      ) : null}
                      {feature.description ? (
                        <p
                          className={`${rubik.className} mt-1 text-sm font-normal leading-relaxed text-white text-[12px]`}
                        >
                        {feature.description}

                        </p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div> 
          </div>
      </Container>
    </FullContainer>
  );
}
