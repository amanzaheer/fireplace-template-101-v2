"use client";
/**
 * ServiceDescription section: multiple designs, one export.
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
import ServiceDescription10 from "./ServiceDescription10";  
import ServiceDescription14 from "./ServiceDescription14";
import ServiceDescription15 from "./ServiceDescription15";
import ServiceDescription11 from "./ServiceDescription11";
import ServiceDescription12 from "./ServiceDescription12";
import ServiceDescription13 from "./ServiceDescription13";
import ServiceDescription5 from "./ServiceDescription5";
import ServiceDescription17 from "./ServiceDescription17";

const variants = {
  ServiceDescription1,
  ServiceDescription2,
  ServiceDescription3,
  ServiceDescription4,
  ServiceDescription5,
  ServiceDescription6,
  ServiceDescription7,
  ServiceDescription8,
  ServiceDescription9,
  ServiceDescription10,
  ServiceDescription14,
  ServiceDescription15,
  ServiceDescription11,
  ServiceDescription12,
  ServiceDescription13,
  ServiceDescription17,

};

export default function ServiceDescription({ variant, content }) {
  const name = String(variant ?? "").trim() || "ServiceDescription14";
  const Component = variants[name] ?? ServiceDescription14;
  return <Component content={content} />;
}
export { ServiceDescription1, ServiceDescription2, ServiceDescription3, ServiceDescription4, ServiceDescription5, ServiceDescription6, ServiceDescription7, ServiceDescription8, ServiceDescription9, ServiceDescription14, ServiceDescription15, ServiceDescription11, ServiceDescription12, ServiceDescription10, ServiceDescription13,variants };


