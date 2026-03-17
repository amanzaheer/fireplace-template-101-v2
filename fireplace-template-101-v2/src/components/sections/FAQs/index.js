/**
 * FAQs section: accordion of questions and answers.
 */
import FAQs1 from "./FAQs1";

const variants = {
  FAQs1,
};

export default function FAQs({ variant, content }) {
  const name = variant ?? "FAQs1";
  const Component = variants[name] ?? FAQs1;
  return <Component content={content} />;
}
export { FAQs1, variants };
