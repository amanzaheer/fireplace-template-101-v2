/**
 * Contact section: quote form and contact form.
 */
import Contact1 from "./Contact1";
import Contact2 from "./Contact2";

const variants = {
  Contact1,
  Contact2,
};

export default function Contact({ variant, content }) {
  const name = variant ?? "Contact1";
  const Component = variants[name] ?? Contact1;
  return <Component content={content} />;
}
export { Contact1,Contact2, variants };
