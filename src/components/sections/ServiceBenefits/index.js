/**
 * ServiceBenefits section: multiple designs, one export.
 */
import ServiceBenefits1 from "./ServiceBenefits1";
import ServiceBenefits2 from "./ServiceBenefits2";
import ServiceBenefits3 from "./ServiceBenefits3";
import ServiceBenefits6 from "./ServiceBenefits6";
const variants = {
  ServiceBenefits1,
  ServiceBenefits2,
  ServiceBenefits3,
  ServiceBenefits6,
};

export default function ServiceBenefits({ variant, content }) {
  const name = variant ?? "ServiceBenefits1";
  const Component = variants[name] ?? ServiceBenefits1;
  return <Component content={content} />;
}
export { ServiceBenefits1, ServiceBenefits2, ServiceBenefits3, ServiceBenefits6, variants };
