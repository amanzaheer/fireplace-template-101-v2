 "use client";

import Cta14 from "./Cta14";
import Cta16 from "./Cta16";
import Cta12 from "./cta12";
import Cta13 from "./Cta13";
import Cta15 from "./Cta15";
import Cta11 from "./Cta11";

const variants = {
  Cta11,
  Cta12,
  Cta13,
  Cta14,
  Cta15,
  Cta16,
};

export default function Cta({ variant, content }) {
  const name = String(variant ?? "Cta11").trim();
  const Component = variants[name] ?? Cta11;
  return <Component content={content} />;
}

export { Cta11, Cta12, Cta13, Cta14, Cta15, Cta16, variants };
