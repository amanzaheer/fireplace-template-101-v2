"use client";

import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import {
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import { IMAGE_BASE } from "@/lib/constants";
import { cn, sanitizeUrl } from "@/lib/utils";
import { resolveRefArray } from "@/lib/content-helpers";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const LA_MAP_CENTER = { lat: 34.0522, lng: -118.2437 };

const LeafletMap = dynamic(
  async () => {
    const leaflet = await import("react-leaflet");
    const L = await import("leaflet");

    const mapPin = L.divIcon({
      html: `
        <div style="display:flex;align-items:center;justify-content:center;width:18px;height:18px;
        border-radius:9999px;background:#D32F2F;color:#fff;font-size:11px;line-height:1;">•</div>
      `,
      className: "",
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });
    return function FooterLeafletMap({ center, markers, zoom = 11 }) {
      return (
        <leaflet.MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          className="h-[300px] w-full"
        >
          <leaflet.TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((marker, index) => (
            <leaflet.Marker
              key={`${marker.label}-${index}`}
              position={[marker.lat, marker.lng]}
              icon={mapPin}
            >
              <leaflet.Popup>{marker.label}</leaflet.Popup>
            </leaflet.Marker>
          ))}
        </leaflet.MapContainer>
      );
    };
  },
  { ssr: false },
);

const SOCIAL_ICON_MAP = {
  facebook: Facebook,
  twitter: Twitter,
  x: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
};

const iconAccent = "text-[#D32F2F]";
const navLinkClass =
  "text-sm font-medium text-white/95 transition-colors hover:text-[#ff6b6b] md:text-[15px]";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function telHref(phone) {
  if (!phone || typeof phone !== "string") return "#";
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "#";
}

function normalizeMenuHref(link, label) {
  if (!link || typeof link !== "string") return "#";
  const normalizedLink = link.trim().toLowerCase();
  const normalizedLabel = String(label ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  if (
    normalizedLabel === "services" ||
    normalizedLink === "services" ||
    normalizedLink === "/services" ||
    normalizedLink === "#services" ||
    normalizedLink === "/#services"
  ) {
    return "/#our_services";
  }

  if (link.startsWith("/") || link.startsWith("#")) return link;
  return `/#${link}`;
}

function isDropdownItem(item) {
  return (
    item?.link === "#" && (item?.childrenRef || Array.isArray(item?.services))
  );
}

function getChildHref(child) {
  if (child?.path) return child.path;
  const slug = sanitizeUrl(child?.title);
  return slug ? `/${slug}` : "#";
}

function getLocationsList(content, block) {
  const direct = block?.list ?? block?.value?.list;
  if (Array.isArray(direct)) return direct;
  const ref = block?.childrenRef && content?.[block.childrenRef];
  if (Array.isArray(ref)) return ref;
  if (ref && Array.isArray(ref.list)) return ref.list;
  return [];
}

const footerDropdownPanelClass =
  "fixed z-[9999] flex max-h-[min(70vh,400px)] flex-col overflow-y-auto overscroll-contain rounded-md border border-white/15 bg-zinc-950 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.65)]";

function FooterDropdownPanel({
  open,
  anchorEl,
  children,
  onMouseEnter,
  onMouseLeave,
}) {
  const [coords, setCoords] = useState(null);

  useLayoutEffect(() => {
    if (!open || !anchorEl) {
      setCoords(null);
      return;
    }

    const updatePosition = () => {
      const rect = anchorEl.getBoundingClientRect();
      const minWidth = Math.max(260, rect.width);
      let left = rect.left;

      if (left + minWidth > window.innerWidth - 8) {
        left = Math.max(8, window.innerWidth - minWidth - 8);
      }

      setCoords({
        left,
        bottom: window.innerHeight - rect.top + 8,
        minWidth,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, anchorEl]);

  if (!open || !coords || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="menu"
      className={footerDropdownPanelClass}
      style={{
        left: coords.left,
        bottom: coords.bottom,
        minWidth: coords.minWidth,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>,
    document.body,
  );
}

export default function Footer23({ content }) {
  const pathname = usePathname() ?? "";
  const [openDropdownKey, setOpenDropdownKey] = useState(null);
  const dropdownTriggerRefs = useRef({});
  const dropdownCloseTimerRef = useRef(null);

  const cancelDropdownClose = useCallback(() => {
    if (dropdownCloseTimerRef.current) {
      clearTimeout(dropdownCloseTimerRef.current);
      dropdownCloseTimerRef.current = null;
    }
  }, []);

  const scheduleDropdownClose = useCallback(() => {
    cancelDropdownClose();
    dropdownCloseTimerRef.current = setTimeout(() => {
      setOpenDropdownKey(null);
    }, 180);
  }, [cancelDropdownClose]);

  const footer = content?.footer ?? {};
  const contactInfo = content?.contact_info ?? {};
  const navbar = content?.navbar ?? {};
  const menuItems = Array.isArray(navbar?.menu_items) ? navbar.menu_items : [];

  const getDropdownChildren = useCallback(
    (item) => resolveRefArray(content, item, "children"),
    [content],
  );

  const phone =
    typeof contactInfo.phone === "string" && contactInfo.phone.trim()
      ? contactInfo.phone.trim()
      : typeof navbar.phone === "string" && navbar.phone.trim()
        ? navbar.phone.trim()
        : "";

  const email =
    typeof contactInfo.email === "string" ? contactInfo.email.trim() : "";

  const address =
    (typeof contactInfo.address === "string" && contactInfo.address.trim()
      ? contactInfo.address.trim()
      : "") ||
    (typeof footer.address === "string" && footer.address.trim()
      ? footer.address.trim()
      : "");

  const mapAddress =
    (typeof footer.map_address === "string" && footer.map_address.trim()
      ? footer.map_address.trim()
      : "") || address;

  const description =
    typeof footer.value === "string" && footer.value.trim()
      ? footer.value.trim()
      : typeof footer.statement === "string" && footer.statement.trim()
        ? footer.statement.trim()
        : "";

  const locationsBlock = content?.locations ?? {};

  const serviceCityNames = useMemo(() => {
    const cities = getLocationsList(content, locationsBlock);
    return cities.map((city) =>
      typeof city === "string"
        ? city
        : (city?.name ?? city?.title ?? String(city)),
    );
  }, [content, locationsBlock]);

  const mapCenter = useMemo(
    () => [
      Number(
        footer?.mapCenter?.lat ??
          locationsBlock?.mapCenter?.lat ??
          LA_MAP_CENTER.lat,
      ),
      Number(
        footer?.mapCenter?.lng ??
          locationsBlock?.mapCenter?.lng ??
          LA_MAP_CENTER.lng,
      ),
    ],
    [footer?.mapCenter, locationsBlock?.mapCenter],
  );

  const mapMarkers = useMemo(() => {
    const manualMarkers = Array.isArray(footer?.mapMarkers)
      ? footer.mapMarkers
      : Array.isArray(locationsBlock?.mapMarkers)
        ? locationsBlock.mapMarkers
        : [];

    if (manualMarkers.length) {
      return manualMarkers
        .filter((marker) => marker?.lat && marker?.lng)
        .map((marker) => ({
          lat: Number(marker.lat),
          lng: Number(marker.lng),
          label: marker?.label ?? mapAddress ?? "Our Location",
        }));
    }

    if (serviceCityNames.length > 0) {
      return serviceCityNames.slice(0, 8).map((name, index) => ({
        lat: mapCenter[0] + (index % 2 === 0 ? 0.04 : -0.04) + index * 0.008,
        lng: mapCenter[1] + (index % 3 === 0 ? 0.05 : -0.04) + index * 0.006,
        label: name,
      }));
    }

    const locationLabel = mapAddress || "Los Angeles, CA";

    return [
      {
        lat: mapCenter[0],
        lng: mapCenter[1],
        label: locationLabel,
      },
    ];
  }, [
    footer?.mapMarkers,
    locationsBlock?.mapMarkers,
    mapAddress,
    mapCenter,
    serviceCityNames,
  ]);

  const callNowIconRaw =
    typeof footer.call_now_icon === "string" && footer.call_now_icon.trim()
      ? footer.call_now_icon.trim()
      : "/st-icons/Temp13/call1.png";
  const callNowIconSrc =
    callNowIconRaw.startsWith("/") || callNowIconRaw.startsWith("http")
      ? callNowIconRaw
      : buildImageSrc(IMAGE_BASE, callNowIconRaw);

  const trustBadgeSrcs = (
    Array.isArray(footer.badge_images) && footer.badge_images.length > 0
      ? footer.badge_images
      : [1, 2, 3, 4, 5].map((n) => `footer/footer${n}.webp`)
  )
    .map((path) => buildImageSrc(IMAGE_BASE, path))
    .filter(Boolean);

  const socialLinks = Array.isArray(footer.social_links)
    ? footer.social_links
        .map((item) => {
          const type = String(item?.type ?? item?.label ?? "").toLowerCase();
          const Icon = SOCIAL_ICON_MAP[type];
          const href = typeof item?.href === "string" ? item.href.trim() : "";
          if (!Icon || !href || href === "#") return null;
          return { label: item?.label ?? type, href, Icon };
        })
        .filter(Boolean)
    : [];

  const contactHeading =
    typeof footer.contact_heading === "string" && footer.contact_heading.trim()
      ? footer.contact_heading.trim()
      : "Stay Tuned With Us";

  const openDropdownAnchor =
    openDropdownKey != null
      ? dropdownTriggerRefs.current[openDropdownKey] ?? null
      : null;

  const openDropdownChildren = useMemo(() => {
    if (openDropdownKey == null) return [];

    for (let navIndex = 0; navIndex < menuItems.length; navIndex += 1) {
      const item = menuItems[navIndex];
      const key = item?.childrenRef ?? item?.title ?? String(navIndex);

      if (key === openDropdownKey && isDropdownItem(item)) {
        return getDropdownChildren(item);
      }
    }

    return [];
  }, [openDropdownKey, menuItems, getDropdownChildren]);

  return (
    <footer
      className={`${montserrat.className} relative overflow-visible text-[#1a1a1a] antialiased`}
    >
      {/* Top — light grey, 3 columns */}
      <FullContainer className="relative z-0 overflow-visible bg-[#EAEAEA] py-10 md:py-12 lg:py-14">
        <Container className="px-4 sm:px-6">
          <div className="mx-auto grid w-full  grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr_0.95fr] lg:gap-8 xl:gap-12">
            {/* Column 1 — brand, badges, CTA */}
            <div className="flex flex-col gap-5 items-start">
              {navbar?.logo ? (
                <Logo
                  logo={navbar.logo}
                  imagePath={navbar.imagePath ?? IMAGE_BASE}
                  className="max-w-[280px] text-start"
                />
              ) : null}

              {description ? (
                <p className="max-w-[360px] text-sm leading-relaxed text-[#333] md:text-[15px]">
                  {description}
                </p>
              ) : null}

              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {trustBadgeSrcs.map((src, index) =>
                  src ? (
                    <div
                      key={index}
                      className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white sm:h-12 sm:w-12"
                    >
                      <Image
                        src={src}
                        alt=""
                        width={48}
                        height={48}
                        className="h-[82%] w-[82%] object-contain"
                      />
                    </div>
                  ) : null,
                )}
              </div>

              {phone ? (
                <Link
                  href={telHref(phone)}
                  title="Call now"
                  className="inline-flex w-full max-w-[340px] items-center gap-4 rounded-full bg-[#D32F2F] px-5 py-3.5 text-white shadow-md transition hover:brightness-95 sm:max-w-[360px] sm:px-6 sm:py-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 sm:h-12 sm:w-12">
                    <Image
                      src={callNowIconSrc}
                      alt=""
                      width={44}
                      height={44}
                      className="h-9 w-9 object-contain sm:h-10 sm:w-10"
                      aria-hidden
                    />
                  </span>
                  <span className="flex min-w-0 flex-col text-left leading-tight">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/95 sm:text-xs">
                      Call now
                    </span>
                    <span className="text-lg font-bold tracking-tight sm:text-xl">
                      {phone}
                    </span>
                  </span>
                </Link>
              ) : null}
            </div>

            {/* Column 2 — contact + social */}
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-black md:text-2xl">
                {contactHeading}
              </h3>
              <ul className="mt-5 space-y-4 text-sm text-[#333] md:mt-6 md:text-[15px]">
                {address ? (
                  <li className="flex items-start gap-3">
                    <MapPin
                      className={cn("mt-0.5 h-5 w-5 shrink-0", iconAccent)}
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span className="leading-relaxed">{address}</span>
                  </li>
                ) : null}
                {email ? (
                  <li className="flex items-center gap-3">
                    <Mail
                      className={cn("h-5 w-5 shrink-0", iconAccent)}
                      strokeWidth={2}
                      aria-hidden
                    />
                    <Link
                      href={`mailto:${email}`}
                      className="break-all transition-colors hover:text-black"
                    >
                      {email}
                    </Link>
                  </li>
                ) : null}
                {phone ? (
                  <li className="flex items-center gap-3">
                    <Phone
                      className={cn("h-5 w-5 shrink-0", iconAccent)}
                      strokeWidth={2}
                      aria-hidden
                    />
                    <Link
                      href={telHref(phone)}
                      className="transition-colors hover:text-black"
                    >
                      {phone}
                    </Link>
                  </li>
                ) : null}
              </ul>

              {socialLinks.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-3 md:mt-8">
                  {socialLinks.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex  h-9 w-9 items-center justify-center rounded-full bg-[#D32F2F] text-white transition hover:brightness-110 sm:h-10 sm:w-10"
                    >
                      <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2} />
                    </a>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Column 3 — live map */}
            <div className="flex flex-col lg:items-end">
              <div className="h-[300px] w-full max-w-[320px] overflow-hidden rounded-md border border-[#cfcfcf] bg-white shadow-sm lg:max-w-[300px] xl:max-w-[320px]">
                <LeafletMap
                  center={mapCenter}
                  markers={mapMarkers}
                  zoom={serviceCityNames.length > 1 ? 9 : 11}
                />
              </div>
              {mapAddress ? (
                <p className="mt-4 flex max-w-[320px] items-start gap-2.5 text-sm leading-relaxed text-[#333] md:text-[15px] lg:max-w-[300px] xl:max-w-[320px]">
                  <MapPin
                    className={cn("mt-0.5 h-5 w-5 shrink-0", iconAccent)}
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span>{mapAddress}</span>
                </p>
              ) : null}
            </div>
          </div>
        </Container>
      </FullContainer>

      {/* Bottom — black bar: logo + nav */}
      <FullContainer
        id="footer"
        className="relative z-20 w-full overflow-visible bg-black py-5 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] md:py-6"
      >
        <Container className="overflow-visible px-4 sm:px-6">
          <div className="mx-auto flex w-full flex-col gap-6 overflow-visible md:flex-row md:items-center md:justify-between md:gap-8">
            <div className="shrink-0">
              {navbar?.logo ? (
                <div className="footer23-dark-logo">
                  <Logo
                    logo={navbar.logo}
                    imagePath={navbar.imagePath ?? IMAGE_BASE}
                    taglineClassName="!text-white/85"
                    className="!text-white"
                  />
                </div>
              ) : null}
            </div>
            {menuItems.length > 0 ? (
              <nav
                className="flex w-full flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2 md:ml-auto md:w-auto md:justify-end md:gap-x-7"
                aria-label="Footer navigation"
              >
                {menuItems.map((item, navIndex) => {
                  const navKey =
                    item?.title ?? item?.link ?? `footer-nav-${navIndex}`;
                  if (!item?.title) return null;

                  if (isDropdownItem(item)) {
                    const children = getDropdownChildren(item);
                    const dropdownKey =
                      item.childrenRef ?? item.title ?? String(navIndex);
                    const open = openDropdownKey === dropdownKey;

                    if (!children.length) {
                      const href = normalizeMenuHref(
                        item?.link ?? "#",
                        item?.title,
                      );
                      return (
                        <Link key={navKey} href={href} className={navLinkClass}>
                          {item.title}
                        </Link>
                      );
                    }

                    return (
                      <div
                        key={dropdownKey}
                        ref={(node) => {
                          if (node) {
                            dropdownTriggerRefs.current[dropdownKey] = node;
                          } else {
                            delete dropdownTriggerRefs.current[dropdownKey];
                          }
                        }}
                        className="relative z-10 w-full sm:w-auto md:inline-flex"
                        onMouseEnter={() => {
                          if (
                            typeof window !== "undefined" &&
                            window.matchMedia("(min-width: 768px)").matches
                          ) {
                            cancelDropdownClose();
                            setOpenDropdownKey(dropdownKey);
                          }
                        }}
                        onMouseLeave={() => {
                          if (
                            typeof window !== "undefined" &&
                            window.matchMedia("(min-width: 768px)").matches
                          ) {
                            scheduleDropdownClose();
                          }
                        }}
                      >
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-haspopup="true"
                          className={cn(
                            "flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0",
                            navLinkClass,
                            open && "text-[#ff6b6b]",
                          )}
                          onClick={() =>
                            setOpenDropdownKey((prev) =>
                              prev === dropdownKey ? null : dropdownKey,
                            )
                          }
                        >
                          {item.title}
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 shrink-0 transition-transform",
                              open && "rotate-180",
                            )}
                            aria-hidden
                          />
                        </button>
                      </div>
                    );
                  }
                  const href = normalizeMenuHref(item?.link ?? "#", item?.title);
                  return (
                    <Link key={navKey} href={href} className={navLinkClass}>
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            ) : null}
          </div>
        </Container>
      </FullContainer>

      <FooterDropdownPanel
        open={Boolean(
          openDropdownKey && openDropdownAnchor && openDropdownChildren.length > 0,
        )}
        anchorEl={openDropdownAnchor}
        onMouseEnter={cancelDropdownClose}
        onMouseLeave={scheduleDropdownClose}
      >
        {openDropdownChildren.map((child, index) => {
          const href = getChildHref(child);
          const isActive =
            pathname === href || pathname === (child?.path ?? "");

          return (
            <Link
              key={child?.title ?? child?.path ?? index}
              role="menuitem"
              href={href}
              onClick={() => setOpenDropdownKey(null)}
              className={cn(
                "block px-4 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-[#D32F2F] text-white"
                  : "text-white/90 hover:bg-[#D32F2F] hover:text-white",
              )}
            >
              {child?.title}
            </Link>
          );
        })}
      </FooterDropdownPanel>
    </footer>
  );
}
