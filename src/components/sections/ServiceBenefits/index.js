/**
 * ServiceBenefits section: multiple designs, one export.
 */
import ServiceBenefits1 from "./ServiceBenefits1";
import ServiceBenefits2 from "./ServiceBenefits2";
import ServiceBenefits3 from "./ServiceBenefits3";
import ServiceBenefits4 from "./ServiceBenefits4";
import ServiceBenefits6 from "./ServiceBenefits6";
import ServiceBenefits8 from "./ServiceBenefits8";
const variants = {
  ServiceBenefits1,
  ServiceBenefits2,
  ServiceBenefits3,
  ServiceBenefits4,
  ServiceBenefits6,          
  ServiceBenefits8,
};

export default function ServiceBenefits({ variant, content }) {
  const name = variant ?? "ServiceBenefits8";
    const Component = variants[name] ?? ServiceBenefits8;
  return <Component content={content} />;
}
export { ServiceBenefits1, ServiceBenefits2, ServiceBenefits3, ServiceBenefits4, ServiceBenefits6, ServiceBenefits8, variants };
