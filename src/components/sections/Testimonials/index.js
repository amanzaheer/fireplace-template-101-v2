import Testimonials1 from "./Testimonials1";
import Testimonials2 from "./Testimonials2";
import Testimonials3 from "./Testimonials3";
import Testimonials4 from "./Testimonials4";
import Testimonials6 from "./Testimonials6";
import Testimonials8 from "./Testimonials8";
import Testimonials5 from "./Testimonials5";

import Testimonials7 from "./Testimonials7";
const variants = {
  Testimonials1,
  Testimonials2,
  Testimonials3,
  Testimonials4,
  Testimonials6,
  Testimonials8,
  Testimonials5,
  Testimonials7,
};

function pickVariant(name) {
  const key = String(name ?? "").trim();
  const C = variants[key] ?? Testimonials5;
  return typeof C === "function" ? C : Testimonials5;
}

export default function Testimonials({ variant, content }) {
  const Component = pickVariant(variant);
  return <Component content={content} />;
}

export {
  Testimonials1,
  Testimonials2,
  Testimonials3,
  Testimonials4,
  Testimonials6,
  Testimonials8,
  Testimonials5,
  variants,
};
export { Testimonials1, Testimonials2, Testimonials3, Testimonials4, Testimonials6,Testimonials8, Testimonials5,Testimonials7, variants };
