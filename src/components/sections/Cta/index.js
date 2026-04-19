import Cta14 from "./Cta14";
import Cta15 from "./Cta15";

const variants = {
  Cta14,
  Cta15,
};

export default function Cta({ variant, content }) {
  const name = variant ?? "Cta15";
  const Component = variants[name] ?? Cta15;
  return <Component content={content} />;
}

export { Cta14, Cta15, variants };
