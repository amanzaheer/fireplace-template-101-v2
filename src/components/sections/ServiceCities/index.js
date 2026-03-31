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
const variants = {
  ServiceCities1,
  ServiceCities2,
  ServiceCities3,
  ServiceCities4,
  ServiceCities6,
  ServiceCities8,
  ServiceCities5,
};

export default function ServiceCities({ variant, content }) {
  const name = variant ?? "ServiceCities5";
  const Component = variants[name] ?? ServiceCities5;
  return <Component content={content} />;
}
export { ServiceCities1, ServiceCities2, ServiceCities3, ServiceCities4, ServiceCities6, ServiceCities8, ServiceCities5, variants };
