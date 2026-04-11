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
};

export default function ServiceBenefits({ variant, content }) {
  const name = String(variant ?? "").trim() || "ServiceBenefits9";
  const Component = variants[name] ?? ServiceBenefits9;
  return <Component content={content} />;
}

export { ServiceBenefits1, ServiceBenefits2, ServiceBenefits3, ServiceBenefits4, ServiceBenefits6, ServiceBenefits8, ServiceBenefits5, ServiceBenefits7, ServiceBenefits9,  variants };
