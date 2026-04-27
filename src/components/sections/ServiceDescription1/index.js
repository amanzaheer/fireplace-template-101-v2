/**
 * ServiceDescription1 section: multiple designs, one export.
 */
import ServiceDescription1 from "./ServiceDescription1";
import ServiceDescription2 from "./ServiceDescription2";
import ServiceDescription3 from "./ServiceDescription3";
import ServiceDescription4 from "./ServiceDescription4";
import ServiceDescription5 from "./ServiceDescription5";
import ServiceDescription6 from "./ServiceDescription6";
import ServiceDescription7 from "./ServiceDescription7";
import ServiceDescription14 from "./ServiceDescription14";
import ServiceDescription11 from "./ServiceDescription11";
import ServiceDescription15 from "./ServiceDescription15";
import ServiceDescription12 from "./ServiceDescription12";
import ServiceDescription10 from "./ServiceDescription10";
import ServiceDescription13 from "./ServiceDescription13";

const variants = {
  ServiceDescription1,
  ServiceDescription2,
  ServiceDescription3,
  ServiceDescription6,
  ServiceDescription4,
  ServiceDescription5,
  ServiceDescription7,
  ServiceDescription14,
  ServiceDescription15,
  ServiceDescription11,
  ServiceDescription12,
  ServiceDescription10,
  ServiceDescription13,
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
  ServiceDescription14,
  ServiceDescription15,
  ServiceDescription11,
  ServiceDescription12,
  ServiceDescription10,
  ServiceDescription13,
  variants,
};
