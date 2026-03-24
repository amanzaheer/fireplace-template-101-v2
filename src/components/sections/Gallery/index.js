/**
 * Gallery section: multiple designs, one export.
 */
import Gallery1 from "./Gallery1";
import Gallery2 from "./Gallery2";
import Gallery3 from "./Gallery3";

const variants = {
  Gallery1,
  Gallery2,
  Gallery3,
};

export default function Gallery({ variant, content }) {
  const name = variant ?? "Gallery1";
  const Component = variants[name] ?? Gallery1;
  return <Component content={content} />;
}

export { Gallery1, Gallery2, Gallery3, variants };

