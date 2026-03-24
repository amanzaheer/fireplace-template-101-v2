/**
 * ServiceCities section: areas we serve list with map background.
 */
import ServiceCities1 from "./ServiceCities1";
import ServiceCities2 from "./ServiceCities2";
import ServiceCities3 from "./ServiceCities3";
const variants = {
  ServiceCities1,
  ServiceCities2,
  ServiceCities3,
};

export default function ServiceCities({ variant, content }) {
  const name = variant ?? "ServiceCities1";
  const Component = variants[name] ?? ServiceCities1;
  return <Component content={content} />;
}
export { ServiceCities1, ServiceCities2, ServiceCities3, variants };
