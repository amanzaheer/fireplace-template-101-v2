import React from "react";
import { MapPin } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins, Inter,  } from "next/font/google"; 

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

    
function getLocationsList(content, block) {
  const direct = block?.list ?? block?.value?.list;
  if (Array.isArray(direct)) return direct;
  const ref = block?.childrenRef && content?.[block.childrenRef];
  if (Array.isArray(ref)) return ref;
  if (ref && Array.isArray(ref.list)) return ref.list;
  return [];
}

/** Pin + label color — golden orange like the reference */
const PIN_CLASS = "text-[#EA580C]";
const TEXT_CLASS = "text-gray-800";

export default function ServiceCities6({ content }) {
  const block = content?.locations ?? {};
  const cities = getLocationsList(content, block);
  const title = block?.title ?? block?.value?.title ?? "Areas We Serve";

  if (cities.length === 0) return null;

  return (
    <FullContainer className="bg-white py-10 md:py-14 lg:py-16" id="locations">
      <Container className="px-4 sm:px-5 md:px-15">
        <h2 className={` ${poppins.className} mb-8 text-center text-3xl font-bold tracking-tight text-gray-800 md:mb-10 md:text-5xl`}>
          {title}
        </h2>

        <div
          className="grid grid-cols-2 gap-x-4 gap-y-3  sm:grid-cols-3 sm:gap-x-5 sm:gap-y-3.5 md:grid-cols-4 md:gap-x-6 lg:grid-cols-6 lg:gap-y-4"
          role="list"
        >
          {cities.map((city, index) => {
            const label =
              typeof city === "string"
                ? city
                : city?.name ?? city?.title ?? String(city);
            return (
              <div
                key={`${label}-${index}`}
                className="flex min-w-0 items-start gap-2"
                role="listitem"
              >
                <MapPin
                  className={`${inter.className} mt-0.5 h-4 w-4 shrink-0 md:h-[18px] md:w-[18px] ${PIN_CLASS}`}
                  strokeWidth={4}
                  aria-hidden
                />
                <span
                  className={`${inter.className}  font-barlow text-[13px] font-medium leading-snug md:text-base ${TEXT_CLASS}`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </Container>
    </FullContainer>
  );
}
