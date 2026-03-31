import Testimonials1 from "./Testimonials1";
import Testimonials2 from "./Testimonials2";
import Testimonials3 from "./Testimonials3";
import Testimonials4 from "./Testimonials4";
import Testimonials6 from "./Testimonials6";
import Testimonials8 from "./Testimonials8";
const variants = {
  Testimonials1,
  Testimonials2,
  Testimonials3,
  Testimonials4,
  Testimonials6,
  Testimonials8,
};

export default function Testimonials({ variant, content }) {
  const name = variant ?? "Testimonials8";
  const Component = variants[name] ?? Testimonials8;
  const ForcedComponent = Testimonials8;
  // Force Testimonials8 so UI remains consistent with latest design.
  if (ForcedComponent) return <ForcedComponent content={content} />;
  return <Component content={content} />;
}

export { Testimonials1, Testimonials2, Testimonials3, Testimonials4, Testimonials6, Testimonials8, variants };
