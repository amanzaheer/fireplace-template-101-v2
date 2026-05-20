"use client";

import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function normalizeImagePath(pathValue) {
  if (!pathValue || typeof pathValue !== "string") return "";
  return pathValue.trim().replace(/\\/g, "/").replace(/^\/+/, "");
}

const DEFAULT_STEP_IMAGES = [
  "workingprocess/message.png",
  "workingprocess/person.png",
  "workingprocess/verified.png",
];

export default function WorkingProcess12({ content }) {
  const section =
    content?.our_process ??
    content?.working_process ??
    content?.workingprocess ??
    {};
  const data = {
    heading: section?.heading ?? section?.title,
    description: section?.description,
    list: section?.list,
  };

  const heading = data?.heading ?? "Our Working Process";
  const steps = Array.isArray(data?.list)
    ? data.list
    : Array.isArray(data?.description)
      ? data.description
      : [];
  const phone =
    section?.cta_phone ?? content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const phoneLabel = phone || "(888)-249-0566";
  const phoneHref = phone ? `tel:${phone}` : "#";

  if (steps.length === 0) return null;

  return (
    <FullContainer
      id="working_process"
      className={`bg-[#da4909] py-12 md:py-16 ${poppins.className}`}
    >
      <Container>
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-white md:text-[36px]">
            {heading}
          </h2>

          {steps?.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-8">
              {steps?.map((step, index) => {
                const imagePath = normalizeImagePath(
                  step?.file_name ??
                    step?.image ??
                    DEFAULT_STEP_IMAGES[index],
                );
                const imageSrc = buildImageSrc(IMAGE_BASE, imagePath);
                return (
                  <div
                    key={`${step?.title ?? "step"}-${index}`}
                    className="mx-auto flex w-full max-w-[320px] flex-col items-center text-center text-white"
                  >
                    <div className="flex h-[115px] w-[115px] items-center justify-center">
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt={step?.title || `Step ${index + 1}`}
                          width={115}
                          height={115}
                          loading="lazy"
                          unoptimized
                          className="h-[115px] w-[115px] object-contain"
                        />
                      ) : (
                        <div className="h-full w-full rounded border-2 border-white/60" />
                      )}
                    </div>

                    <h3 className="mt-4 text-[20px] font-semibold leading-tight text-white md:text-[30px]">
                      {step?.title || `Step ${index + 1}`}
                    </h3>
                    <p className="mt-3 text-[16px] font-medium leading-normal text-white">
                      {step?.description || ""}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : null}

          <div className="mt-10 flex justify-center lg:mt-20">
            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold uppercase tracking-wide text-[#da4909] shadow-lg transition-opacity hover:opacity-95 md:text-[25px] h-[72px]"
            >
              <span>CALL NOW:</span>
              <span className=" font-bold text-sm md:text-[31px] text-black">{phoneLabel}</span>
            </a>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
