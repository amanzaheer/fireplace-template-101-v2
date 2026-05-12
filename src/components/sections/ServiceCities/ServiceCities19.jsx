"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Inter, Rubik } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";

const serviceCitiesHeadingFont = Rubik({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const LeafletMap = dynamic(
  async () => {
    const leaflet = await import("react-leaflet");
    // const L = await import("leaflet");

    const mapPin = L.divIcon({
      html: `
        <div style="display:flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:9999px;background:#cc3333;color:#fff;font-size:11px;line-height:1;">•</div>
      `,
      className: "",
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });

    return function ServiceCitiesLeafletMap({ center, markers }) {
      return (
        <leaflet.MapContainer
          center={center}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[270px] w-full"
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

function ServiceCitiesPinIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      style={{ color: "#cc3333" }}
      className={className}
      aria-hidden
    >
      <path
        d="M12.0001 2C7.58908 2 4.00008 5.589 4.00008 9.995C3.97108 16.44 11.6961 21.784 12.0001 22C12.0001 22 20.0291 16.44 20.0001 10C20.0001 5.589 16.4111 2 12.0001 2ZM12.0001 14C9.79008 14 8.00008 12.21 8.00008 10C8.00008 7.79 9.79008 6 12.0001 6C14.2101 6 16.0001 7.79 16.0001 10C16.0001 12.21 14.2101 14 12.0001 14Z"
        fill="#cc3333"
        style={{ fill: "#cc3333" }}
      />
    </svg>
  );
}

function getLocationsList(content, block) {
  const direct = block?.list ?? block?.value?.list;
  if (Array.isArray(direct)) return direct;
  const ref = block?.childrenRef && content?.[block.childrenRef];
  if (Array.isArray(ref)) return ref;
  if (ref && Array.isArray(ref.list)) return ref.list;
  return [];
}

export default function ServiceCities19({ content }) {
  const block = content?.locations ?? {};
  const [showAllCities, setShowAllCities] = useState(false);
  const cities = useMemo(
    () => getLocationsList(content, block),
    [content, block],
  );
  const title =
    block?.heading ?? block?.title ?? block?.value?.heading ?? "Areas We Serve";
  const subtitle =
    block?.subtitle ??
    block?.value?.subtitle ??
    "We're Proud To Serve And Travel To The Following Connecticut Towns:";
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const phoneLink = phone ? `tel:${phone}` : "#";
  const buttonText = block?.buttonText ?? block?.value?.buttonText ?? "More City";
  const bottomText =
    block?.description ??
    block?.value?.description ??
    "If You Need Quality Chimney Repair Or Maintenance Services In There's No Better Team To Rely On Than Us.";

  const cityNames = useMemo(
    () =>
      cities.map((city) =>
        typeof city === "string"
          ? city
          : (city?.name ?? city?.title ?? String(city)),
      ),
    [cities],
  );

  const initialVisibleCount = Number(
    block?.initialVisibleCount ?? block?.value?.initialVisibleCount ?? 12,
  );
  const visibleCityNames = showAllCities
    ? cityNames
    : cityNames.slice(0, initialVisibleCount);
  const hasMoreCities = cityNames.length > initialVisibleCount;
  const moreButtonText =
    block?.moreButtonText ?? block?.value?.moreButtonText ?? buttonText;
  const lessButtonText =
    block?.lessButtonText ?? block?.value?.lessButtonText ?? "Show Less";

  const mapCenter = [
    Number(block?.mapCenter?.lat ?? 41.6032),
    Number(block?.mapCenter?.lng ?? -73.0877),
  ];
  const mapMarkers = useMemo(() => {
    const manualMarkers = Array.isArray(block?.mapMarkers) ? block.mapMarkers : [];
    if (manualMarkers.length) {
      return manualMarkers
        .filter((marker) => marker?.lat && marker?.lng)
        .map((marker) => ({
          lat: Number(marker.lat),
          lng: Number(marker.lng),
          label: marker?.label ?? "Service Area",
        }));
    }

    return cityNames.slice(0, 8).map((name, index) => ({
      lat: mapCenter[0] + (index % 2 === 0 ? 0.12 : -0.12) + index * 0.01,
      lng: mapCenter[1] + (index % 3 === 0 ? 0.14 : -0.09) + index * 0.01,
      label: name,
    }));
  }, [block?.mapMarkers, cityNames, mapCenter]);

  if (cities.length === 0) return null;

  return (
    <FullContainer
      className="overflow-hidden bg-[#efefef] py-12 md:py-16"
      id="locations"
    >
      <Container>
        <div className="mx-auto max-w-[1080px]">
          <h2
            className={cn(
              serviceCitiesHeadingFont.className,
              "text-center text-[clamp(1.9rem,5vw,3.2rem)] font-bold leading-tight text-[#2D2D2D]",
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              inter.className,
              "mt-1 text-center text-sm font-medium text-[#3d3d3d] md:text-lg",
            )}
          >
            {subtitle}
          </p>

          <div className="mt-7 grid grid-cols-1 items-start gap-7 lg:grid-cols-[1.1fr_1fr]">
            <div className="self-start">
              <div className="overflow-hidden border border-[#cfcfcf] bg-white">
                <LeafletMap center={mapCenter} markers={mapMarkers} />
              </div>

              <a
                href={phoneLink}
                className="mt-6 inline-flex w-fit items-center gap-4"
              >
                <span className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#cc3333]">
                  <Image
                    src="/st-icons/Temp17/call17.png"
                    alt="Phone"
                    width={24}
                    height={24}
                    className="h-[24px] w-[24px] shrink-0"
                  />
                </span>
                <span className="flex flex-col leading-none">
                  <span
                    className={cn(
                      inter.className,
                      "text-[20px] font-semibold text-[#2D2D2D]",
                    )}
                  >
                    Need Help?
                  </span>
                  <span
                    className={cn(
                      inter.className,
                      "mt-1 text-[24px] font-extrabold text-[#e55b20]",
                    )}
                  >
                    {phone}
                  </span>
                </span>
              </a>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 lg:grid-cols-3">
                {visibleCityNames.map((city, index) => (
                  <div
                    key={`${city}-${index}`}
                    className="flex min-h-[28px] items-center gap-1.5"
                  >
                    <ServiceCitiesPinIcon className="h-6 w-6 shrink-0" />
                    <span
                      className={cn(
                        inter.className,
                        "text-[16px] font-medium leading-tight text-[#1f1f1f] md:text-[18px]",
                      )}
                    >
                      {city}
                    </span>
                  </div>
                ))}
              </div>

              {hasMoreCities ? (
                <button
                  type="button"
                  onClick={() => setShowAllCities((prev) => !prev)}
                  className={cn(
                    inter.className,
                    "mt-4 bg-[#cc3333] px-9 py-3 text-[22px] font-bold text-white transition hover:opacity-90",
                  )}
                >
                  {showAllCities ? lessButtonText : moreButtonText}
                </button>
              ) : null}
            </div>
          </div>

        </div>
      </Container>
    </FullContainer>
  );
}
