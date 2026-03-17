/**
 * ServiceBenefits section: multiple designs, one export.
 */
import ServiceBenefits1 from "./ServiceBenefits1";

const variants = {
  ServiceBenefits1,
};

export default function ServiceBenefits({ variant, content }) {
  const name = variant ?? "ServiceBenefits1";
  const Component = variants[name] ?? ServiceBenefits1;
  return <Component content={content} />;
}
export { ServiceBenefits1, variants };
