import Cta18 from "./Cta18";

const variants = {
  Cta18,
};

export default function Cta2({ variant, content }) {
  const name = variant ?? "Cta18";
  const Component = variants[name] ?? Cta18;
  return <Component content={content} />;
}

export { Cta18, variants };
