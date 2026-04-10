/**
 * Slogan section: multiple designs, one export.
 */
import Slogan1 from "./Slogan1";
import Slogan2 from "./Slogan2";
import Slogan3 from "./Slogan3";
import Slogan4 from "./Slogan4";
import Slogan5 from "./Slogan5";
import Slogan6 from "./Slogan6";
import Slogan7 from "./Slogan7";
import Slogan9 from "./Slogan9";
import Slogan10 from "./Slogan10";
const variants = {
  Slogan1,
  Slogan2,
  Slogan3,
  Slogan4,  
  Slogan6,
  Slogan5,
  Slogan7,
  Slogan9,
  Slogan10,
};

export default function Slogan({ variant, content }) {
      const name = variant ?? "Slogan5";
  const Component = variants[name] ?? Slogan5;
  return <Component content={content} />;
}
export { Slogan1, Slogan2, Slogan3, Slogan4, Slogan6, Slogan5, Slogan7, Slogan9, Slogan10, variants };

