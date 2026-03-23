/**
 * Slogan section: multiple designs, one export.
 */
import Slogan1 from "./Slogan1";
import Slogan2 from "./Slogan2";

const variants = {
  Slogan1,
  Slogan2,
};

export default function Slogan({ variant, content }) {
  const name = variant ?? "Slogan1";
  const Component = variants[name] ?? Slogan1;
  return <Component content={content} />;
}
export { Slogan1, Slogan2, variants };
