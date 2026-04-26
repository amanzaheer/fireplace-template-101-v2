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
import ServiceCities10 from "./ServiceCities10";
import ServiceCities14 from "./ServiceCities14";
import ServiceCities15 from "./ServiceCities15";
import ServiceCities11 from "./ServiceCities11";
import ServiceCities12 from "./ServiceCities12";
import ServiceCities13 from "./ServiceCities13";
import ServiceCities16 from "./ServiceCities16";

import ServiceCities10 from "./ServiceCities10";
import ServiceCities11 from "./ServiceCities11";
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
  ServiceCities15,
  ServiceCities11,
  ServiceCities12,
  ServiceCities10,
  ServiceCities13,
  ServiceCities16,
  ServiceCities10,
  ServiceCities11,
};

export default function ServiceCities({ variant, content }) {
  const name = variant ?? "ServiceCities16";
  const Component = variants[name] ?? ServiceCities16;
  return <Component content={content} />;
}
export { ServiceCities1, ServiceCities2, ServiceCities3, ServiceCities4, ServiceCities5, ServiceCities6, ServiceCities7, ServiceCities8, ServiceCities9, ServiceCities14, ServiceCities15, ServiceCities16,  variants };

