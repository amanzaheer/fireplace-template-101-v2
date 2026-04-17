/**
 * ServiceBenefits section: multiple designs, one export.
 */
import ServiceBenefits1 from "./ServiceBenefits1";
import ServiceBenefits2 from "./ServiceBenefits2";
import ServiceBenefits3 from "./ServiceBenefits3";
import ServiceBenefits4 from "./ServiceBenefits4";
import ServiceBenefits6 from "./ServiceBenefits6";
import ServiceBenefits8 from "./ServiceBenefits8";
import ServiceBenefits5 from "./ServiceBenefits5";
import ServiceBenefits7 from "./ServiceBenefits7";
import ServiceBenefits9 from "./ServiceBenifits9";
import ServiceBenifits14 from "./ServiceBenifits14";
import ServiceBenefits15 from "./ServieBenefits15";
import ServiceBenefits11 from "./ServiceBenefits11";
import ServiceBenefits12 from "./ServiceBenefits12";
const variants = {
  ServiceBenefits1,
  ServiceBenefits2,
  ServiceBenefits3,
  ServiceBenefits4,
  ServiceBenefits6,
  ServiceBenefits8,
  ServiceBenefits5,
  ServiceBenefits7,
  ServiceBenefits9,
  ServiceBenifits14,
  ServiceBenefits15,
  ServiceBenefits11,
  ServiceBenefits12,
};

export default function ServiceBenefits({ variant, content }) {
  const name = String(variant ?? "").trim() || "ServiceBenifits14";
  const Component = variants[name] ?? ServiceBenifits14;
  return <Component content={content} />;
}

export { ServiceBenefits1, ServiceBenefits2, ServiceBenefits3, ServiceBenefits4, ServiceBenefits6, ServiceBenefits8, ServiceBenefits5, ServiceBenefits7, ServiceBenefits9, ServiceBenifits14, ServiceBenefits15, ServiceBenefits11, ServiceBenefits12,variants };
