import Cta14 from "./Cta14";
import Cta16 from "./Cta16";

const variants = {
  Cta14,
  Cta16,
};

export default function Cta({ variant, content }) {
  const name = variant ?? "Cta16";
    const Component = variants[name] ?? Cta16;
  return <Component content={content} />;
}

export { Cta14, Cta16, variants };
