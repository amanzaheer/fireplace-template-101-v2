import Testimonials1 from "./Testimonials1";

const variants = {
  Testimonials1,
};

export default function Testimonials({ variant, content }) {
  const name = variant ?? "Testimonials1";
  const Component = variants[name] ?? Testimonials1;
  return <Component content={content} />;
}

export { Testimonials1, variants };

