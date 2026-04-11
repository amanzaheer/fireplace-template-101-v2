/**
 * Contact section: quote form and contact form.
 */
import Contact1 from "./Contact1";
import Contact2 from "./Contact2";
import Contact3 from "./Contact3";
import Contact4 from "./Contact4";
import Contact6 from "./Contact6";
import Contact8 from "./Contact8";
import Contact5 from "./Contact5";
import Contact10 from "./Contact10";

import Contact7 from "./Contact7";  
import Contact9 from "./Contact9";
const variants = {
  Contact1,
  Contact2,
  Contact3,
  Contact4,
  Contact6,
  Contact8,
  Contact5,
  Contact7,
  Contact10,
  Contact9,
};

function resolveContactVariant(variant) {
  const raw = String(variant ?? "").trim();
  if (!raw) return Contact9;
  if (variants[raw]) return variants[raw];
  const compact = raw.replace(/\s+/g, "").toLowerCase();
  const key = Object.keys(variants).find(
    (k) => k.replace(/\s+/g, "").toLowerCase() === compact,
  );
  return key ? variants[key] : Contact9;
}


export default function Contact({ variant, content }) {
  const Component = resolveContactVariant(variant);
  return <Component content={content ?? {}} />;
}

export { Contact1, Contact2, Contact3, Contact4,Contact5, Contact6,Contact7,Contact8,Contact9,Contact10, variants };
