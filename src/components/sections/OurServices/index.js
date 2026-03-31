/**
 * OurServices section: multiple designs, one export.
 */
import OurServices1 from "./OurServices1";
import OurServices2 from "./OurServices2";
import OurServices3 from "./OurServices3";
import OurServices4 from "./OurServices4";
import OurServices6 from "./OurServices6";
import OurServices8 from "./OurServices8";
const variants = {
  OurServices1,
  OurServices2,
  OurServices3,
  OurServices4,
  OurServices6,
  OurServices8,
};

export default function OurServices({ variant, content }) {
          const name = variant ?? "OurServices8";
  const Component = variants[name] ?? OurServices8;
  return <Component content={content} />;
}
export { OurServices1, OurServices2, OurServices3, OurServices4, OurServices6, OurServices8, variants };
