/**
 * PrivacyPolicy section: multiple designs, one export.
 * `variant` comes from domain config (layouts.json via SectionLayout).
 */
import PrivacyPolicy1 from "./privacy-policy1";
import PrivacyPolicy2 from "./privacy-policy2";

const variants = {
  "privacy-policy1": PrivacyPolicy1,
  "privacy-policy2": PrivacyPolicy2,
};

export default function PrivacyPolicy({ variant, content }) {
  const name = variant ?? "privacy-policy1";
  const Component = variants[name] ?? PrivacyPolicy1;
  return <Component content={content} />;
}

export { PrivacyPolicy1, PrivacyPolicy2, variants };

