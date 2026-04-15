/**
 * ServiceCities section: areas we serve list with map background.
 */
import ServiceCities1 from "./ServiceCities1";
import ServiceCities2 from "./ServiceCities2";
import ServiceCities3 from "./ServiceCities3";
import ServiceCities4 from "./ServiceCities4";
import ServiceCities5 from "./ServiceCities5";
import ServiceCities6 from "./ServiceCities6";
import ServiceCities7 from "./ServiceCities7";
import ServiceCities8 from "./ServiceCities8";
import ServiceCities9 from "./ServiceCities9";
import ServiceCities14 from "./ServiceCities14";

const variants = {
  ServiceCities1,
  ServiceCities2,
  ServiceCities3,
  ServiceCities4,
  ServiceCities5,
  ServiceCities6,
  ServiceCities7,
  ServiceCities8,
  ServiceCities9,
  ServiceCities14,
};

export default function ServiceCities({ variant, content }) {
  const name = variant ?? "ServiceCities14";
  const Component = variants[name] ?? ServiceCities14;
  return <Component content={content} />;
}
export { ServiceCities1, ServiceCities2, ServiceCities3, ServiceCities4, ServiceCities5, ServiceCities6, ServiceCities7, ServiceCities8, ServiceCities9, ServiceCities14, variants };
