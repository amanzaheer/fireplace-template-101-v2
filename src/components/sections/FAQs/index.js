/**
 * FAQs section: accordion of questions and answers.
 */
import FAQs1 from "./FAQs1";
import FAQs2 from "./FAQs2";
import FAQs3 from "./FAQs3";
const variants = {
  FAQs1,
  FAQs2,
  FAQs3,
};

export default function FAQs({ variant, content }) {
  const name = variant ?? "FAQs1";
  const Component = variants[name] ?? FAQs1;
  return <Component content={content} />;
}
export { FAQs1, FAQs2, FAQs3, variants };
