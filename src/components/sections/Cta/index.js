import Cta12 from "./cta12";
import Cta13 from "./Cta13";
import Cta14 from "./Cta14";
import Cta15 from "./Cta15";
import Cta16 from "./Cta16";
import Cta17 from "./cta17";
import Cta19 from "./cta19";
import Cta20 from "./Cta20";
import Cta21 from "./Cta21";
import Cta23 from "./Cta23";

const variants = {
  Cta14,
  Cta16,
  Cta12,
  Cta13,
  Cta15,
  Cta17,
  Cta20,
  Cta19,
  Cta21,
  Cta23,
};

export default function Cta({ variant, content }) {
  const name = variant ?? "Cta23";
  const Component = variants[name] ?? Cta23;
  return <Component content={content} />;
}

export { Cta12, Cta13, Cta14, Cta15, Cta16, Cta17, Cta19, Cta20, Cta21,Cta23, variants };
