/**
 * Slogan section: multiple designs, one export.
 */
import Slogan1 from "./Slogan1";
import Slogan2 from "./Slogan2";
import Slogan3 from "./Slogan3";
import Slogan4 from "./Slogan4";
import Slogan6 from "./Slogan6";
const variants = {
  Slogan1,
  Slogan2,
  Slogan3,
  Slogan4,  
  Slogan6,
};

export default function Slogan({ variant, content }) {
  const name = variant ?? "Slogan1";
  const Component = variants[name] ?? Slogan1;
  return <Component content={content} />;
}
export { Slogan1, Slogan2, Slogan3, Slogan4, Slogan6, variants };
