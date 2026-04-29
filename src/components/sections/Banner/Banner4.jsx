"use client";

import Image from "next/image";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import {
  CheckSquare,
  PhoneCall as PhoneCallIcon,
  ShieldCheck,
} from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { Poppins, Inter } from "next/font/google";
import QuoteForm4 from "./QuoteForm/QuoteForm4";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function ToolIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M7.08431 7.08504L3.12598 3.12671" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.33425 4.31421L4.31342 2.33504L1.93842 1.14754L1.14675 1.93921L2.33425 4.31421ZM14.1895 5.48192C14.5695 5.10217 14.831 4.62011 14.9421 4.09442C15.0531 3.56874 15.0089 3.02211 14.8149 2.52108L13.6891 3.64683H12.1058V2.0635L13.2315 0.937751C12.7305 0.743271 12.1837 0.698716 11.6578 0.809515C11.1318 0.920313 10.6495 1.18168 10.2695 1.56178C9.88944 1.94187 9.62818 2.42428 9.5175 2.95024C9.40682 3.47619 9.45149 4.02299 9.64609 4.524L4.524 9.64688C4.02299 9.45229 3.47619 9.40761 2.95024 9.51829C2.42428 9.62897 1.94187 9.89024 1.56178 10.2702C1.18168 10.6503 0.920313 11.1326 0.809515 11.6585C0.698716 12.1845 0.743271 12.7313 0.937751 13.2323L2.06271 12.1066H3.64604V13.6899L2.52029 14.8157C3.02122 15.0101 3.5679 15.0548 4.09373 14.9441C4.61957 14.8334 5.10189 14.5723 5.48194 14.1924C5.86199 13.8125 6.12339 13.3303 6.23428 12.8045C6.34518 12.2787 6.3008 11.732 6.10654 11.231L11.2302 6.10734C11.731 6.30104 12.2773 6.34505 12.8027 6.23402C13.3281 6.12299 13.8098 5.8617 14.1895 5.48192Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7.71533 9.85588L12.1518 14.2924C12.2511 14.3918 12.369 14.4707 12.4988 14.5246C12.6286 14.5784 12.7677 14.6061 12.9083 14.6061C13.0488 14.6061 13.1879 14.5784 13.3177 14.5246C13.4475 14.4707 13.5654 14.3918 13.6647 14.2924L14.2917 13.6654C14.3912 13.5661 14.4701 13.4482 14.5239 13.3184C14.5777 13.1886 14.6055 13.0495 14.6055 12.9089C14.6055 12.7684 14.5777 12.6293 14.5239 12.4995C14.4701 12.3697 14.3912 12.2518 14.2917 12.1525L9.85521 7.716" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M7.32489 18.923L8.56489 13.61L4.44189 10.038L9.87289 9.56801L11.9999 4.55701L14.1269 9.56701L19.5569 10.037L15.4339 13.609L16.6749 18.922L11.9999 16.102L7.32489 18.923Z" fill="currentColor" />
    </svg>
  );
}

function ClockIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M7.25 13.75C10.8399 13.75 13.75 10.8399 13.75 7.25C13.75 3.66015 10.8399 0.75 7.25 0.75C3.66015 0.75 0.75 3.66015 0.75 7.25C0.75 10.8399 3.66015 13.75 7.25 13.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.52783 4.36111V7.97223H10.1389" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FileUserIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M6.86685 0V6.50462C6.86685 7.63895 7.40183 8.17964 8.54333 8.17964H15V16.2262C15 18.0695 14.0815 19 12.2353 19H2.7647C0.927655 19 0 18.0785 0 16.2262V2.78251C0 0.939224 0.927655 0 2.7647 0H6.86685ZM7.50228 13.5087C5.50315 13.5087 4.2593 14.871 4.2593 15.8583C4.2593 16.1952 4.47504 16.3672 5.08346 16.3672H9.92035C10.525 16.3672 10.7407 16.1952 10.7407 15.8583C10.7407 14.8714 9.49686 13.5087 7.50228 13.5087ZM7.5019 9.48677C6.67736 9.48677 5.96089 10.2025 5.96089 11.1402C5.96089 12.0893 6.67736 12.824 7.5019 12.824C8.32949 12.824 9.04178 12.0889 9.04178 11.1323C9.04178 10.187 8.32606 9.48677 7.5019 9.48677ZM8.07874 0.0975522C8.45353 0.159562 8.82832 0.416677 9.23812 0.841672L14.1618 5.81343C14.5807 6.2475 14.8394 6.60217 14.9018 6.96553H8.57034C8.2492 6.96553 8.0795 6.80597 8.0795 6.48685L8.07874 0.0975522Z" fill="currentColor" />
    </svg>
  );
}

const FEATURE_ICONS = [ToolIcon, StarIcon, ClockIcon, CheckSquare];

function getFeatureIcon(text, index, total) {
  const label = String(text || "").toLowerCase();

  // Swap only these two icons, keep text unchanged.
  if (label.includes("licensed") || label.includes("insured")) return FileUserIcon;
  if (label.includes("satisfaction") || label.includes("guaranteed")) return StarIcon;

  const isLastItem = index === total - 1;
  if (isLastItem) return FileUserIcon;
  return FEATURE_ICONS[index] || CheckSquare;
}

function buildImageSrc(base, filePath) {
  if (!filePath) return `${IMAGE_BASE}/hero/hero.webp`;
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  return `${basePath}/${filePath.replace(/^\//, "")}`;
}

function normText(s) {
  return String(s ?? "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export default function Banner4({ content }) {
  const banner = content?.banner ?? {};

  const data = {
    title: banner.title,
    tagline: banner.tagline,
    description: banner.description,
    heading: banner.heading,
    imageTitle: banner.imageTitle,
    altImage: banner.altImage,
  };

  const image = buildImageSrc(IMAGE_BASE, banner.file_name);

  const form_head = {
    title: banner.form_title || "Get Your Free Quote",
    sub_title: banner.form_description || "10% Off for Online Booking",
  };

  const features = resolveRefArray(content, banner, "features") || [];

  const phone =
    banner.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";

  const mainHeadingSource = String(data?.heading || data?.title || "").trim();
  const words = mainHeadingSource.split(/\s+/).filter(Boolean);
  // First word outside orange box, rest inside — each word on its own line
  const firstWord = words[0] || "";
  const restWords = words.slice(1);
  const showTaglineBlock =
    Boolean(String(data?.tagline ?? "").trim()) &&
    normText(data.tagline) !== normText(mainHeadingSource);

  return (
    <>
      <FullContainer className="relative bg-white h-150 overflow-hidden">
      <Container className="relative py-10 md:py-14">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

          {/* LEFT SIDE */}
          <div className="w-full max-w-[650px] z-10 lg:pr-4 lg:-ml-3">

            {/* HEADING + PHONE */}
            <div className={`${poppins.className} font-black uppercase leading-none`}>
              {/* First word — dark, outside box */}
              <span
                className={`${poppins.className} block text-[#000000] font-normal text-[27.42px] leading-none tracking-[0%]`}
              >
                {firstWord}
              </span>

              <div className="mt-2 relative inline-block">
                {/* Rest of words — inside one orange box */}
                <span className="inline-block bg-[#f59403] text-white px-4 py-4 rounded-[14px] text-[28px] md:text-[38px] leading-[1.1] max-w-[620px] w-full md:w-auto">
                  {restWords.join(" ")}
                </span>

                {/* 🔥 PHONE BUTTON (POSITIONED ABOVE ORANGE BOX — LIKE "HERE") */}
                <a
                  href={phone ? `tel:${phone}` : "#"}
                  className="hidden md:flex items-center gap-2 pt-2 rounded-full px-[17px] py-[10px] bg-[#F59402] absolute left-[160px] -top-[55px] z-20"
                  style={{ height: "42px" }}
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#f59402] text-black ">
                    <PhoneCallIcon className="w-3.5 h-3.5" />
                  </span>
                  <span
                    className={`${poppins.className} text-[#0f2962] font-normal uppercase  text-sm md:text-base`}
                  >
                    Contact
                  </span>
                </a>
                <a
                  href={phone ? `tel:${phone}` : "#"}
                  className={`mt-1 text-[24px] md:text-[30px] font-bold leading-none text-[#0f2962] ${poppins.className}`}
                >
                  {phone}
                </a>
                <div className="mt-8 font-black max-w-[400px] inline-block uppercase text-[26px] sm:text-[32px] md:text-[44px] leading-none ">
                  <span className="text-[#0f2962] leading-none">
                    {String(data?.heading || data?.title || "")
                      .split(" ")
                      .slice(0, 1)
                      .join(" ")}{" "}
                  </span>
                  <br />
                  <span className="text-[#f59402] md:text-[55px] leading-none">
                    {String(data?.heading || data?.title || "")
                      .split(" ")
                      .slice(1, 4)
                      .join(" ")}
                  </span>
                  <br />
                  <span className="text-[#0f2962] md:text-[55px] leading-none">
                    {String(data?.heading || data?.title || "")
                      .split(" ")
                      .slice(4)
                      .join(" ")}
                  </span>
                </div>
                {data?.tagline ? (
                  <h2
                    className={`text-base md:text-xl font-semibold leading-tight text-white/90 text-left mt-2 ${inter.className}`}
                  >
                    {data?.tagline}
                  </h2>
                ) : null}

                <p
                  className={`text-sm md:text-base text-left mt-3 mb-1 text-white/80 max-w-[560px] ${inter.className}`}
                >
                  {data?.description}
                </p>
                {features?.length > 0 ? (
                  <ul className="mt-2 pt-3 mb-6 w-fit grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[3px] before:bg-[linear-gradient(to_left,#ffffff_50%,#f59402_50%)]">
                    {features?.map((feature, idx) => {
                      const IconComponent = ICON_MAP[feature.icon];
                      return (
                        <li
                          key={idx}
                          className="flex items-center gap-2.5 leading-none text-white/75 font-medium text-[22px] md:text-[26px]"
                        >
                          {IconComponent ? (
                            <IconComponent className="w-5 h-5 text-[#f2a51f] shrink-0" />
                          ) : (
                            <ShieldCheck className="w-5 h-5 text-[#f2a51f] shrink-0" />
                          )}
                          <span
                            className={`${inter.className} text-white font-medium text-[18px] md:text-[20px]`}
                          >
                            {feature.text}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}

                <div className="w-fit">
                  <a
                    href={phone ? `tel:${phone}` : "#"}
                    className="inline-flex items-center gap-3 rounded-full bg-transparent text-white text-[28px] md:text-[38px] font-extrabold leading-none md:hidden"
                  >
                    <span className="inline-flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full bg-[#f2a51f] text-black">
                      <PhoneCallIcon className="w-3 h-3 md:w-3 md:h-3" />
                    </span>
                    {phone}
                </a>
              </div>
            </div>

            {/* TAGLINE (hidden when it repeats the same line as the main heading) */}
            {showTaglineBlock ? (
              <h2 className="text-lg md:text-[26px] mt-3 text-[#242424]">
                {data.tagline}
              </h2>
            ) : null}

            {/* DESCRIPTION */}
            <p className="mt-3 text-[#2f2f2f] text-[16px] md:text-[18px] max-w-[520px]">
              {data?.description}
            </p>

            {/* FEATURES */}
            {features.length > 0 && (
              <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((f, i) => {
                  const Icon = getFeatureIcon(f?.text, i, features.length);
                  return (
                    <li key={i} className="flex items-center gap-2 text-[18px]">
                      <Icon className="w-5 h-5" />
                      {f.text}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative w-full lg:w-[46%] h-[395px] lg:h-[456px] flex items-center justify-end">
            <div className="relative w-full h-full hidden lg:block">
              <div
                className="absolute z-10 overflow-hidden rounded-l-[72px] bg-[#F59402]"
                style={{
                  width: "560px",
                  height: "450px",
                  top: "0px",
                  left: "190px",
                  transform: "rotate(0deg)",
                  opacity: 1,
                }}
              >
                <div className="relative ml-[25px] h-full w-[calc(100%-25px)] overflow-hidden rounded-l-[64px]">
                  <Image
                    src={image}
                    alt="banner"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* FORM — left side like reference */}
              <div
                className="absolute top-[16px] -left-[10px] z-30 origin-top"
                style={{ transform: "scaleY(0.84)" }}
              >
                <QuoteForm4
                  data={data}
                  form_head={form_head}
                  showArrowInButton={false}
                />
              </div>
            </div>

          </div>
        </div>
      </Container>
      </FullContainer>
      <div className="w-full h-5 relative">
        <div className="bg-[#f59403] h-[13px] absolute top-0 left-0 w-full"></div>
        <div className="bg-[#f59403] h-6 rotate-1 absolute top-0 left-0 w-full"></div>
      </div>
    </>
  );
}