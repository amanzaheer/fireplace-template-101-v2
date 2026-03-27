import Testimonials1 from "./Testimonials1";
import Testimonials2 from "./Testimonials2";
import Testimonials3 from "./Testimonials3";
import Testimonials6 from "./Testimonials6";
const variants = {
  Testimonials1,
  Testimonials2,
  Testimonials3,
  Testimonials6,
};

export default function Testimonials({ variant, content }) {
  const name = variant ?? "Testimonials1";
  const Component = variants[name] ?? Testimonials1;
  return <Component content={content} />;
}

export { Testimonials1, Testimonials2, Testimonials3, Testimonials6, variants };

