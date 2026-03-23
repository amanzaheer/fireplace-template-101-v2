/**
 * ServiceDescription section: multiple designs, one export.
 */
import ServiceDescription1 from "./ServiceDescription1";
import ServiceDescription2 from "./ServiceDescription2";
const variants = {
  ServiceDescription1,
  ServiceDescription2,
};

export default function ServiceDescription({ variant, content }) {
  const name = variant ?? "ServiceDescription1";
  const Component = variants[name] ?? ServiceDescription1;
  return <Component content={content} />;
}

export { ServiceDescription1, ServiceDescription2, variants };

