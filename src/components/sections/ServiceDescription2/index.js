/**
 * ServiceDescription2 section: multiple designs, one export.
 */
import ServiceDescription1 from "./ServiceDescription1";
import ServiceDescription2 from "./ServiceDescription2";
import ServiceDescription3 from "./ServiceDescription3";
import ServiceDescription4 from "./ServiceDescription4";
import ServiceDescription5 from "./ServiceDescription5";
import ServiceDescription6 from "./ServiceDescription6";
import ServiceDescription7 from "./ServiceDescription7";
import ServiceDescription8 from "./ServiceDescription8";
import ServiceDescription9 from "./ServiceDescription9";
import ServiceDescription15 from "./ServiceDescription15";

export const variants = {
  ServiceDescription1,
  ServiceDescription2,
  ServiceDescription3,
  ServiceDescription4,
  ServiceDescription5,
  ServiceDescription6,
  ServiceDescription7,
  ServiceDescription8,
  ServiceDescription9,
  ServiceDescription15
};

export default function ServiceDescription2Section({ variant, content }) {
      const name = variant ?? "ServiceDescription9";
  const Component = variants[name] ?? ServiceDescription9;
  return <Component content={content} />;
}

export {
  ServiceDescription1,
  ServiceDescription2,
  ServiceDescription3,
  ServiceDescription4,
  ServiceDescription5,
  ServiceDescription6,
  ServiceDescription7,
  ServiceDescription8,
  ServiceDescription9,
  ServiceDescription15,
  variants,
};
