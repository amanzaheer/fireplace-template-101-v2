/**
 * Slogan section: multiple designs, one export.
 */
import Slogan1 from "./Slogan1";

const variants = {
  Slogan1,
};

export default function Slogan({ variant, content }) {
  const name = variant ?? "Slogan1";
  const Component = variants[name] ?? Slogan1;
  return <Component content={content} />;
}
export { Slogan1, variants };
