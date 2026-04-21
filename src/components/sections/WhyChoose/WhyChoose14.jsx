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
      width={46}
      height={46}
      viewBox="0 0 46 46"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M0 10.9474C0 4.9013 4.9013 0 10.9474 0H36.4211C41.7114 0 46 4.28864 46 9.57895V36.4211C46 41.7114 41.7114 46 36.4211 46H9.57895C4.28864 46 0 41.7114 0 36.4211V10.9474Z"
        fill="#F59402"
      />
      <path
        d="M32.5286 11.9808C32.0885 11.7362 31.6046 11.5807 31.1044 11.5232C30.6042 11.4656 30.0976 11.5072 29.6134 11.6455C29.1293 11.7838 28.6772 12.0161 28.2829 12.3292C27.8885 12.6422 27.5597 13.0299 27.3153 13.47L20.1987 26.2772L16.1258 22.2043C15.7721 21.8382 15.3492 21.5461 14.8815 21.3452C14.4138 21.1443 13.9108 21.0386 13.4018 21.0342C12.8928 21.0297 12.388 21.1267 11.9169 21.3195C11.4458 21.5122 11.0178 21.7968 10.6579 22.1568C10.298 22.5167 10.0134 22.9447 9.82061 23.4158C9.62787 23.8869 9.53088 24.3917 9.5353 24.9007C9.53972 25.4096 9.64547 25.9127 9.84637 26.3803C10.0473 26.848 10.3393 27.271 10.7054 27.6246L18.3721 35.2913C19.0966 36.0177 20.0741 36.4164 21.0823 36.4164L21.6132 36.378C22.2007 36.2958 22.7612 36.0784 23.2504 35.7428C23.7397 35.4072 24.1443 34.9627 24.4326 34.4441L34.0159 17.1941C34.2606 16.7541 34.4162 16.2703 34.4739 15.7702C34.5315 15.2701 34.4901 14.7635 34.352 14.2794C34.2139 13.7953 33.9818 13.3431 33.6689 12.9487C33.3561 12.5543 32.9686 12.2254 32.5286 11.9808Z"
        fill="black"
      />
    </svg>
  );
}

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
    ) ?? []
  );
}

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  if (
    filePath.startsWith("/") ||
    filePath.startsWith("http://") ||
    filePath.startsWith("https://")
  ) {
    return filePath;
  }
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
    return { title: "", description: rawText };
  }

  return { title: "", description: "" };
}

export default function WhyChoose14({ content }) {
  const block = content?.why_choose ?? {};
  const features = pickFeatureList(block, content);
  const heading = typeof block.heading === "string" ? block.heading.trim() : "";
  const subheading = (
    block.description ??
    block.subheading ??
    block.tagline 
  )
    .toString()
    .trim();
  const filePath =
    typeof block.file_name === "string" ? block.file_name.trim() : "";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);
  const useUnoptimized =
    imageSrc.startsWith("/api/") ||
    imageSrc.startsWith("http://") ||
    imageSrc.startsWith("https://");
  const normalizedFeatures = features
    .map((feature, idx) => getStepParts(feature, idx))
    .filter((item) => item.title || item.description);

  if (!heading && !subheading && normalizedFeatures.length === 0 && !imageSrc)
    return null;

  return (
    <FullContainer
      id="whychooseus"
      className="bg-white py-14 md:py-20 lg:py-24"
    >
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="inline-flex w-full min-w-0 flex-col items-center gap-[53px]">
        <header className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
            <h2
              className={`${poppins.className} w-full self-stretch text-center text-[28px] font-medium leading-[34px] text-black sm:text-[36px] sm:leading-[44px] md:text-[44px] md:leading-[53px]`}
            >
              {heading}
            </h2>
            {subheading ? (
              <p
                className={`${rubik.className} mt-3 text-base font-normal leading-tight text-black sm:text-lg md:text-lg`}
              >
                {subheading}
              </p>
            ) : null}
          </header>

          <div className="mx-auto grid w-full min-w-0 max-w-[1080px] self-stretch gap-8 md:grid-cols-2 md:items-center md:gap-3 lg:gap-4">
            <ul className="relative flex w-full min-w-0 list-none flex-col gap-5 self-stretch p-0 md:gap-5 md:pl-4 lg:gap-6 lg:pl-12">
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-[18px] left-[19px] top-[18px] hidden w-[4px] rounded-full bg-[#50207E] md:block lg:left-[27px]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-[18px] left-[19px] hidden h-[30%] w-[4px] rounded-full bg-[#F59402] md:block lg:left-[27px]"
              />
              {normalizedFeatures.map(({ title, description }, idx) => {
                return (
                  <li key={idx} className="flex items-center gap-3 sm:gap-3.5">
                    <StepCheckIcon className="h-[46px] w-[46px] shrink-0 aspect-square" />
                    <div className="flex min-w-0 flex-1 flex-col items-stretch text-left">
                      {title ? (
                        <h3
                          className={`${rubik.className} text-lg font-bold text-black sm:text-xl`}
                        >
                          {title}
                        </h3>
                      ) : null}
                      {description ? (
                        <p
                          className={`${rubik.className} mt-1 text-base font-normal leading-relaxed text-neutral-600 sm:text-[17px] ${
                            title
                              ? ""
                              : "mt-0 text-base font-medium leading-relaxed text-[#333] sm:text-lg"
                          }`}
                        >
                          {description}
                        </p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="relative min-h-[280px] w-full min-w-0 md:min-h-0">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-neutral-200 shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:rounded-[32px] md:aspect-auto md:h-[clamp(320px,46vh,460px)] md:rounded-[36px] lg:h-[clamp(340px,48vh,500px)] lg:rounded-[40px]">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={heading || "How we can help"}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    unoptimized={useUnoptimized}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
