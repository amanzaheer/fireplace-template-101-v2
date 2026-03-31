/**
 * Contact section: quote form and contact form.
 */
import Contact1 from "./Contact1";
import Contact2 from "./Contact2";
import Contact3 from "./Contact3";
import Contact4 from "./Contact4";
import Contact6 from "./Contact6";
import Contact8 from "./Contact8";

const variants = {
  Contact1,
  Contact2,
  Contact3,
  Contact4,
  Contact6,
  Contact8,
};

export default function Contact({ variant, content }) {
    const name = variant ?? "Contact8";
  const Component = variants[name] ?? Contact8;
  return <Component content={content} />;
}
export { Contact1, Contact2, Contact3, Contact4, Contact6, Contact8, variants };
