/**
 * Gallery section: multiple designs, one export.
 */
import Gallery1 from "./Gallery1";
import Gallery2 from "./Gallery2";
import Gallery3 from "./Gallery3";
import Gallery4 from "./Gallery4";
import Gallery5 from "./Gallery5";
import Gallery6 from "./Gallery6";
import Gallery8 from "./Gallery8";  

const variants = {
  Gallery1,
  Gallery2,
  Gallery3,
  Gallery4,
  Gallery5,
  Gallery6,
  Gallery8,
};

export default function Gallery({ variant, content }) {
      const name = variant ?? "Gallery5";
  const Component = variants[name] ?? Gallery5;
  return <Component content={content} />;
}

export { Gallery1, Gallery2, Gallery3, Gallery4, Gallery5,Gallery6, Gallery8,  variants };