/**
 * ServiceDescription1 section: multiple designs, one export.
 */
import ServiceDescription1 from "./ServiceDescription1";
import ServiceDescription2 from "./ServiceDescription2";
import ServiceDescription3 from "./ServiceDescription3";
import ServiceDescription6 from "./ServiceDescription6";
import ServiceDescription4 from "./ServiceDescription4";
import ServiceDescription5 from "./ServiceDescription5";
import ServiceDescription7 from "./ServiceDescription7";
import ServiceDescription15 from "./ServiceDescription15";
const variants = {
  ServiceDescription1,
  ServiceDescription2,
  ServiceDescription3,
  ServiceDescription6,
  ServiceDescription4,
  ServiceDescription5,
  ServiceDescription7,
  ServiceDescription15,
};

export default function ServiceDescription1Section({ variant, content }) {
  const name = variant ?? "ServiceDescription5";
  const Component = variants[name] ?? ServiceDescription5;
  return <Component content={content} />;
}

export {
  ServiceDescription1,
  ServiceDescription2,
  ServiceDescription3,
  ServiceDescription6,
  ServiceDescription4,
  ServiceDescription5,
  ServiceDescription7,
  ServiceDescription15,
  variants,
};
