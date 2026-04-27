import Cta14 from "./Cta14";
import Cta16 from "./Cta16";
import Cta12 from "./cta12";
import Cta13 from "./Cta13";
import Cta15 from "./Cta15";

const variants = {
  Cta14,
  Cta16,
  Cta12,
  Cta13,
  Cta15,
};

export default function Cta({ variant, content }) {
  const name = variant ?? "Cta12";
    const Component = variants[name] ?? Cta12;
  return <Component content={content} />;
}

export { Cta14, Cta16, Cta12, Cta13, Cta15, variants };
