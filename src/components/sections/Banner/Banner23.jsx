"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { CheckCircle } from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { cn, sanitizeUrl } from "@/lib/utils";
import { Poppins } from "next/font/google";
import QuoteForm23 from "./QuoteForm/QuoteForm23";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const BANNER_YELLOW = "#FFD700";
const HOME_TRUST_HEADING = "TRUSTED EXPERTS IN FIREPLACE SERVICES";
const BANNER_TRUST_EVENT = "banner-trust-select";

const trustHeadingClass =
  "text-center text-[26px] font-extrabold uppercase tracking-wide lg:text-[42px]";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const trimmed = filePath.trim();
  if (!trimmed || trimmed.includes("...")) return "";

  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = trimmed.replace(/^\//, "");

  return `${basePath}/${segment}`;
}

function firstImageSrc(...paths) {
  for (const path of paths) {
    const src = buildImageSrc(IMAGE_BASE, path);
    if (src) return src;
  }
  return "";
}

function isServicesDropdown(item) {
  return (
    item?.link === "#" && (item?.childrenRef || Array.isArray(item?.services))
  );
}

function defaultTrustHeading(title) {
  const label = (title ?? "").trim();
  if (!label) return "";
  return `TRUSTED EXPERTS IN ${label.toUpperCase()}`;
}

function headingFromServiceWhy(content, title) {
  const slug = sanitizeUrl(title);
  if (!slug) return null;

  const raw = content?.[`service-why-${slug}`];
  if (typeof raw !== "string") return null;

  const match = raw.match(/^##\s+(.+?)\s*$/m);
  return match?.[1]?.trim() ?? null;
}

function buildServiceTrustMap(content, banner = {}) {
  const defaultFeatures = resolveRefArray(content, banner, "features");
  const defaultHeading =
    banner.features_heading ??
    banner.trust_heading ??
    banner.list_title ??
    "";

  const menuItems = Array.isArray(content?.navbar?.menu_items)
    ? content.navbar.menu_items
    : [];

  const servicesNav = menuItems.find(
    (item) =>
      isServicesDropdown(item) &&
      /service/i.test(String(item.title ?? "")),
  );

  let sources = [];
  if (servicesNav) {
    sources = resolveRefArray(content, servicesNav, "children");
  }
  if (!sources.length && Array.isArray(content?.services)) {
    sources = content.services;
  }

  return sources.map((item, index) => {
    const title = item.title ?? item.name ?? "";
    const slug = sanitizeUrl(title);
    const path = item.path ?? (slug ? `/${slug}` : "#");
    const childFeatures = resolveRefArray(content, item, "features");
    const features =
      childFeatures.length > 0 ? childFeatures : defaultFeatures;

    const heading =
      item.trust_heading ??
      item.features_heading ??
      item.list_title ??
      headingFromServiceWhy(content, title) ??
      (defaultTrustHeading(title) || defaultHeading);

    return {
      key: slug || String(index),
      path,
      title,
      heading,
      features,
    };
  });
}

function findTrustByPath(map, pathname) {
  const normalized = (pathname ?? "").replace(/\/$/, "") || "/";

  return (
    map.find((entry) => {
      const href = (entry.path ?? "").replace(/\/$/, "") || "/";
      return href !== "#" && normalized === href;
    }) ?? null
  );
}

function findTrustByDetail(map, detail) {
  if (!detail || !Array.isArray(map)) return null;

  const { path, title, key } = detail;

  if (path) {
    const normalized = String(path).replace(/\/$/, "") || "/";
    const byPath = map.find(
      (entry) => (entry.path ?? "").replace(/\/$/, "") === normalized,
    );
    if (byPath) return byPath;
  }

  if (key) {
    const byKey = map.find((entry) => entry.key === key);
    if (byKey) return byKey;
  }

  if (title) {
    const slug = sanitizeUrl(title);
    return (
      map.find((entry) => entry.key === slug) ??
      map.find((entry) => entry.title === title) ??
      null
    );
  }

  return null;
}

export default function Banner23({ content }) {
  const pathname = usePathname() ?? "";
  const banner = content?.banner ?? {};

  const data = {
    heading: banner.heading ?? banner.title,
    tagline: banner.tagline,
    imageTitle: banner.imageTitle,
    altImage: banner.altImage,
  };

  const mainImage =
    firstImageSrc(banner.file_name) ||
    buildImageSrc(IMAGE_BASE, "hero/hero.webp");

  const circleImage = firstImageSrc(
    banner.file_name2,
    banner.file_name3,
    banner.overlay_image,
  );

  const form_head = {
    title: banner.form_title ?? "Get In Touch With Us",
    sub_title: banner.form_description ?? "",
  };

  const features = resolveRefArray(content, banner, "features");

  const featuresHeading =
    banner.features_heading ??
    banner.trust_heading ??
    banner.list_title ??
    "";

  const serviceTrustMap = useMemo(
    () => buildServiceTrustMap(content, banner),
    [content, banner],
  );

  const [activeTrust, setActiveTrust] = useState(null);

  useEffect(() => {
    const fromPath = findTrustByPath(serviceTrustMap, pathname);
    if (fromPath) {
      setActiveTrust({
        heading: fromPath.heading,
        features: fromPath.features,
      });
      return;
    }

    if (pathname === "/" || pathname === "") {
      setActiveTrust(null);
    }
  }, [pathname, serviceTrustMap]);

  useEffect(() => {
    const onServiceSelect = (event) => {
      const match = findTrustByDetail(serviceTrustMap, event.detail);
      if (match) {
        setActiveTrust({
          heading: match.heading,
          features: match.features,
        });
      }
    };

    window.addEventListener(BANNER_TRUST_EVENT, onServiceSelect);
    return () =>
      window.removeEventListener(BANNER_TRUST_EVENT, onServiceSelect);
  }, [serviceTrustMap]);

  const isHome = pathname === "/" || pathname === "";

  const displayHeading =
    activeTrust?.heading ??
    (featuresHeading || (isHome ? HOME_TRUST_HEADING : ""));

  const displayFeatures = activeTrust?.features ?? features;
  const showTrustStrip = Boolean(displayHeading || displayFeatures.length > 0);

  const phone =
    banner.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";

  return (
    <FullContainer
      id="banner"
      className={cn(
        "relative min-h-[860px] h-full w-full overflow-hidden",
        "pt-[72px] lg:pt-[120px]",
        poppins.className
      )}
    >
      <div className="bg-[#0483B2] h-full w-full absolute top-0 left-0">

      </div>
      <div className="bg-black h-full max-h-[50%] -rotate-[5deg] w-[calc(100%+100px)] absolute bottom-0 translate-y-[15%] left-[-50px]">

      </div>
      <div className="bg-black h-full max-h-[40%] w-full max-w-[50%] absolute bottom-0 right-0">

      </div>


      {/* WHITE DOT */}
      <span
        className="
    absolute
    right-[18%]
    top-[46%]
    z-[5]
    hidden
    h-10
    w-10
    rounded-full
    bg-white
    md:block
  "
        aria-hidden
      />

      <Container className="relative z-10 px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-1 lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <div
            className="
    order-2
    mt-[20px]
    flex
    flex-col
    items-center
    text-center
    lg:order-1
    lg:mt-[40px]
    lg:items-start
    lg:text-left
  "
          >
            {/* HEADING */}
            <h1
              className={cn(
                "max-w-[95%] text-[34px] font-bold leading-[40px] text-center text-white sm:max-w-[520px] sm:text-[42px] sm:leading-[48px] lg:max-w-[473.9px] lg:text-left lg:text-[49.37px] lg:leading-[51px]",
                poppins.className
              )}
            >
              {data.heading}
            </h1>

            {/* TAGLINE */}
            {data.tagline ? (
              <p
                className={cn(
                  "mt-4 max-w-[95%] text-center text-[16px] leading-[28px] text-white sm:max-w-lg sm:text-lg lg:text-left lg:text-xl",
                  poppins.className
                )}
              >
                {data.tagline}
              </p>
            ) : null}

            {/* FORM */}
            <div className="mt-6 w-full max-w-[430px]">
              <QuoteForm23
                form_head={form_head}
                phone={phone}
                showArrowInButton={false}
              />
            </div>
          </div>
          {/* RIGHT IMAGE SECTION */}
          <div className="relative order-1 mx-auto flex w-full items-center justify-center lg:order-2">

            {/* MAIN OVAL IMAGE */}
            <div className="relative">

              {/* IMAGE */}
              <div
                className="
        relative
        w-[220px]
        h-[260px]
        overflow-hidden

        sm:w-[320px]
        sm:h-[460px]

        md:w-[380px]
        md:h-[560px]

        lg:w-[468px]
        lg:h-[686px]
      "
                style={{
                  borderRadius: "293px",
                }}
              >
                <Image
                  src={mainImage}
                  alt={data.altImage || "Chimney Service"}
                  fill
                  priority
                  className="object-cover object-[center_25%]"
                  sizes="(max-width:768px) 320px, 468px"
                />
              </div>

              {/* CUSTOM SVG CURVED BORDER */}
              <svg
  className="
    absolute
    left-1/2
    -translate-x-1/2

    z-10
    pointer-events-none

    w-[105%]
    max-w-[250px]

    sm:w-[108%]
    sm:max-w-[340px]

    md:max-w-[400px]

    lg:w-[471px]
    lg:max-w-none

    bottom-[-2px]
    sm:bottom-[-6px]
    md:bottom-[-10px]
    lg:bottom-[-14px]
  "
  viewBox="0 0 486 301"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M9.63017 0.89257C0.631032 70.8926 10.0658 185.287 111.631 250.393C228.63 325.393 326.63 285.893 372.63 257.893C401.63 236.893 459.63 194.893 478.631 108.893"
    stroke="white"
    strokeWidth="18"
    strokeLinecap="round"
  />
</svg>
            </div>

            {/* SMALL CIRCLE IMAGE */}
            {circleImage ? (
              <div
                className="
         absolute
         bottom-[0%]
         left-[6%]
         z-20

          h-[80px]
          w-[80px]

          overflow-hidden
          rounded-full
          border-[4px]
         border-white
          shadow-2xl

           sm:h-[110px]
           sm:w-[110px]

           lg:h-[145px]
           lg:w-[145px]
           lg:border-[3px]
             "
              >
                <Image
                  src={circleImage}
                  alt={data.altImage || "Fireplace"}
                  fill
                  className="object-cover object-[center_35%]"
                  sizes="145px"
                />
              </div>
            ) : null}

          </div>
        </div>
        {/* FEATURES SECTION */}
        {showTrustStrip ? (
          <div className="relative z-10 pb-4 pt-10">

            {/* FEATURES HEADING */}
            {displayHeading ? (
              <h2
                className={trustHeadingClass}
                style={{ color: BANNER_YELLOW }}
              >
                {displayHeading}
              </h2>
            ) : null}

            {/* FEATURES LIST */}
            {displayFeatures.length > 0 ? (
              <ul
                className={cn(
                  "mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3",
                  !displayHeading && "mt-0",
                )}
              >
                {displayFeatures.map((feature, idx) => {
                  const text =
                    typeof feature === "object"
                      ? feature?.text
                      : feature;

                  if (!text) return null;

                  return (
                    <li
                      key={idx}
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        text-sm
                        font-medium
                        text-[#FFFFFF]
                        sm:text-[16px]
                         border-white/10
                      "
                    >
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                          <path d="M16.625 8.70832C16.625 13.1021 13.585 17.2108 9.5 18.2083C5.415 17.2108 2.375 13.1021 2.375 8.70832V3.95832L9.5 0.791656L16.625 3.95832V8.70832ZM9.5 16.625C12.4688 15.8333 15.0417 12.3025 15.0417 8.88249V4.98749L9.5 2.51749L3.95833 4.98749V8.88249C3.95833 12.3025 6.53125 15.8333 9.5 16.625ZM7.91667 13.4583L4.75 10.2917L5.86625 9.17541L7.91667 11.2179L13.1337 6.00082L14.25 7.12499" fill="white" />
                        </svg>
                      </>

                      <span>{text}</span>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        ) : null}
      </Container>
    </FullContainer>
  );
}