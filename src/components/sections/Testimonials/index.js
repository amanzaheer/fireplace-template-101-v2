import Testimonials1 from "./Testimonials1";
import Testimonials2 from "./Testimonials2";
import Testimonials3 from "./Testimonials3";
const variants = {
  Testimonials1,
  Testimonials2,
  Testimonials3,
};

export default function Testimonials({ variant, content }) {
  const name = variant ?? "Testimonials2";
  const Component = variants[name] ?? Testimonials1;
  return <Component content={content} />;
}

export { Testimonials1, Testimonials2, Testimonials3, variants };

