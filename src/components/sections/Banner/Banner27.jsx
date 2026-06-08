"use client";

import Image from "next/image";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { Poppins } from "next/font/google";
import { IMAGE_BASE } from "@/lib/constants";
import QuoteForm27 from "./QuoteForm/QuoteForm27";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

function Banner27PhoneIcon({ className }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M28.3344 17.0897C27.909 16.6643 27.6963 16.1377 27.6963 15.5099C27.6963 14.8822 27.909 14.3563 28.3344 13.9324C28.7598 13.5084 29.2857 13.2957 29.912 13.2942C30.5383 13.2928 31.0649 13.5055 31.4918 13.9324C31.9187 14.3592 32.1307 14.8851 32.1277 15.5099C32.1248 16.1348 31.9121 16.6614 31.4896 17.0897C31.0671 17.5181 30.5413 17.7301 29.912 17.7256C29.2828 17.7212 28.7569 17.5085 28.3344 17.0875M24.3728 12.2972L22.0463 9.97067C23.1172 8.89975 24.327 8.07846 25.6756 7.50681C27.0242 6.93516 28.4364 6.64859 29.912 6.64711C31.3877 6.64564 32.8006 6.9322 34.1507 7.50681C35.5008 8.08141 36.7098 8.9027 37.7778 9.97067L35.4513 12.2972C34.7127 11.5586 33.873 10.9862 32.932 10.58C31.9911 10.1738 30.9844 9.97067 29.912 9.97067C28.8396 9.97067 27.8337 10.1738 26.8942 10.58C25.9548 10.9862 25.1143 11.5586 24.3728 12.2972ZM37.5562 39.8827C32.9401 39.8827 28.3795 38.8768 23.8742 36.8649C19.369 34.853 15.2699 31.9999 11.5771 28.3056C7.88422 24.6113 5.03187 20.5123 3.02001 16.0085C1.00815 11.5047 0.00147714 6.94402 0 2.32649C0 1.66178 0.22157 1.10785 0.664711 0.664711C1.10785 0.22157 1.66178 0 2.32649 0H11.3001C11.8171 0 12.2787 0.175779 12.6849 0.527338C13.0911 0.878896 13.3312 1.29397 13.405 1.77256L14.8452 9.52753C14.9191 10.1184 14.9006 10.6169 14.7898 11.0231C14.679 11.4293 14.4759 11.7802 14.1805 12.0756L8.80743 17.5041C9.54599 18.8704 10.4227 20.1902 11.4375 21.4635C12.4523 22.7368 13.5697 23.9651 14.7898 25.1483C15.9346 26.293 17.1348 27.3551 18.3904 28.3344C19.6459 29.3138 20.9753 30.2089 22.3786 31.0199L27.5855 25.813C27.9179 25.4806 28.3522 25.2317 28.8884 25.0663C29.4246 24.9008 29.9504 24.8543 30.4659 24.9267L38.1101 26.4777C38.6271 26.6254 39.0518 26.8935 39.3842 27.282C39.7165 27.6705 39.8827 28.104 39.8827 28.5826V37.5562C39.8827 38.2209 39.6611 38.7748 39.218 39.218C38.7748 39.6611 38.2209 39.8827 37.5562 39.8827Z"
        fill="white"
      />
    </svg>
  );
}

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Banner27({ content }) {
  const banner = content?.banner ?? {};
  const data = {
    title: banner.title,
    tagline: banner.tagline,
    heading: banner.heading,
    list: banner.list,
    imageTitle: banner.imageTitle,
    altImage: banner.altImage,
  };
  const image =
    buildImageSrc(IMAGE_BASE, banner.file_name) ||
    buildImageSrc(IMAGE_BASE, "hero/hero.webp");
  const form_head = {
    title: banner.form_title || "GET IN TOUCH WITH US",
    sub_title: banner.form_description || "",
  };
  const form_labels = content?.form_labels ?? {};
  const phone =
    banner.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";
  const phoneDisplay = typeof phone === "string" ? phone.trim() : "";
  const phoneHref = phoneDisplay
    ? `tel:${phoneDisplay.replace(/[^\d+]/g, "")}`
    : "#";
  const callNowLabel =
    banner.cta_strip?.phone_label?.replace(/:$/, "") || "CALL NOW";

  const headingText = (data?.heading || data?.title || "").trim();

  return (
    <FullContainer
      id="banner"
      className="relative min-h-[620px] w-full overflow-hidden bg-[#1a1a1a] md:min-h-[680px]"
    >
      <div className="absolute inset-0">
        {image ? (
          <Image
            src={image}
            title={data?.imageTitle || data?.title || "Banner"}
            alt={data?.altImage || data?.tagline || "Banner"}
            priority
            fill
            sizes="100vw"
            className="object-cover object-center md:object-right"
            unoptimized
          />
        ) : null}
        {/* Left 50% solid dark — right 50% unchanged (no gradient) */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-black/60" />
      </div>

      <Container className={`relative z-10 py-10 md:py-14 ${poppins.className}`}>
        <div className="grid grid-cols-1 items-stretch lg:grid-cols-2 lg:gap-12">
          <div className="flex max-w-[560px] flex-col justify-center text-white md:max-w-none">
            {headingText ? (
              <h1 className="text-[36px] font-bold leading-[1.1] text-white md:text-[48px] lg:text-[52px]">
                {headingText}
              </h1>
            ) : null}

            {data?.tagline ? (
              <p className="mt-3 text-[18px] font-medium leading-snug text-white/95 md:text-[22px]">
                {data.tagline}
              </p>
            ) : null}

            {phoneDisplay ? (
              <a
                href={phoneHref}
                className="mx-auto mt-6 flex w-full max-w-[280px] items-center justify-center gap-4 bg-[#BF1309] px-5 py-3 text-white transition hover:bg-[#bf0707]"
                >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Banner27PhoneIcon className="h-10 w-10" />
                </span>
                <span className="flex flex-col leading-none">
                  <span className="text-[14px] font-semibold uppercase tracking-wide md:text-[13px]">
                    {callNowLabel}
                  </span>
                  <span className="mt-1 text-[16px] font-bold md:text-[17px]">
                    {phoneDisplay}
                  </span>
                </span>
              </a>
            ) : null}

            <div className="mt-8 w-full max-w-[540px]">
              <QuoteForm27
                data={data}
                form_head={form_head}
                form_labels={form_labels}
                showArrowInButton={false}
                layout="banner27"
              />
            </div>
          </div>

          <div className="hidden min-h-[200px] md:block" aria-hidden />
        </div>
      </Container>
    </FullContainer>
  );
}
