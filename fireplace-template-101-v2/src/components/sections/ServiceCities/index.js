/**
 * ServiceCities section: areas we serve list with map background.
 */
import ServiceCities1 from "./ServiceCities1";

const variants = {
  ServiceCities1,
};

export default function ServiceCities({ variant, content }) {
  const name = variant ?? "ServiceCities1";
  const Component = variants[name] ?? ServiceCities1;
  return <Component content={content} />;
}
export { ServiceCities1, variants };
