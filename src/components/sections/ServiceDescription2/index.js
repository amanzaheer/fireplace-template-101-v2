/**
 * ServiceDescription2 section: multiple designs, one export.
 */
import ServiceDescription2 from "./ServiceDescription2";

const variants = {
  ServiceDescription2,
};

export default function ServiceDescription2Section({ variant, content }) {
  const name = variant ?? "ServiceDescription2";
  const Component = variants[name] ?? ServiceDescription2;
  return <Component content={content} />;
}

export { ServiceDescription2, variants };

