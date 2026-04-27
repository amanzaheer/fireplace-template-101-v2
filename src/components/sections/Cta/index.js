import Cta14 from "./Cta14";
import Cta15 from "./Cta15";
import Cta13 from "./Cta13";

const variants = {
  Cta14,
  Cta15,
  Cta13,
};

export default function Cta({ variant, content }) {
  const name = variant ?? "Cta15";
  const Component = variants[name] ?? Cta15;
  return <Component content={content} />;
}

export { Cta14, Cta15, Cta13, variants };




