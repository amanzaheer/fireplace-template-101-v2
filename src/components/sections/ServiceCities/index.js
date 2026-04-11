/**
 * ServiceCities section: areas we serve list with map background.
 */
import ServiceCities1 from "./ServiceCities1";
import ServiceCities2 from "./ServiceCities2";
import ServiceCities3 from "./ServiceCities3";
import ServiceCities4 from "./ServiceCities4";
import ServiceCities6 from "./ServiceCities6";
import ServiceCities8 from "./ServiceCities8";
import ServiceCities5 from "./ServiceCities5";
import ServiceCities7 from "./ServiceCities7";
import ServiceCities9 from "./ServiceCities9";

const variants = {
  ServiceCities1,
  ServiceCities2,
  ServiceCities3,
  ServiceCities4,
  ServiceCities6,
  ServiceCities8,
  ServiceCities5,
  ServiceCities7,
  ServiceCities9,
};

function resolveServiceCitiesVariant(variant) {
  const raw = String(variant ?? "").trim();
  if (!raw) return ServiceCities9;
  if (variants[raw]) return variants[raw];
  const compact = raw.replace(/\s+/g, "").toLowerCase();
  const key = Object.keys(variants).find(
    (k) => k.replace(/\s+/g, "").toLowerCase() === compact,
  );
  return key ? variants[key] : ServiceCities9;
}
export { ServiceCities1, ServiceCities2, ServiceCities3, ServiceCities4, ServiceCities5, ServiceCities6, ServiceCities7, ServiceCities8, ServiceCities9, variants };
