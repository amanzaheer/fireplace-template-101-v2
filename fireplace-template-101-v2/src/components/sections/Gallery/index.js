/**
 * Gallery section: multiple designs, one export.
 */
import Gallery1 from "./Gallery1";

const variants = {
  Gallery1,
};

export default function Gallery({ variant, content }) {
  const name = variant ?? "Gallery1";
  const Component = variants[name] ?? Gallery1;
  return <Component content={content} />;
}

export { Gallery1, variants };

