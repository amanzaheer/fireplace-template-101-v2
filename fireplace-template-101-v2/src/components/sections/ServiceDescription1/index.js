/**
 * ServiceDescription1 section: multiple designs, one export.
 */
import ServiceDescription1 from "./ServiceDescription1";

const variants = {
  ServiceDescription1,
};

export default function ServiceDescription1Section({ variant, content }) {
  const name = variant ?? "ServiceDescription1";
  const Component = variants[name] ?? ServiceDescription1;
  return <Component content={content} />;
}

export { ServiceDescription1, variants };

