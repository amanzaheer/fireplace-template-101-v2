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
import Slogan8 from "./Slogan8";
import Slogan9 from "./Slogan9";
import Slogan15 from "./Slogan15";
import Slogan11 from "./Slogan11";
import Slogan12 from "./Slogan12";
import Slogan14 from "./Slogan14";
const variants = {
  Slogan1,
  Slogan2,
  Slogan3,
  Slogan4,
  Slogan5,
  Slogan6,
  Slogan7,
  Slogan8,
  Slogan9,
  Slogan15,
  Slogan11,
  Slogan14,
  Slogan12,
};

export default function Slogan({ variant, content }) {
  const name = String(variant ?? "").trim() || "Slogan9";
  const Component = variants[name] ?? Slogan9;
  return <Component content={content} />;
}
export { Slogan1, Slogan2, Slogan3, Slogan4, Slogan6, Slogan5, Slogan8, Slogan7, Slogan9,Slogan15,Slogan11,Slogan12,Slogan14,variants };

