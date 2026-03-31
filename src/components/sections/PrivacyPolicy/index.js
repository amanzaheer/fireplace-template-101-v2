/**
 * PrivacyPolicy section: multiple designs, one export.
 * `variant` comes from domain config (layouts.json via SectionLayout).
 */
import PrivacyPolicy1 from "./privacy-policy1";
import PrivacyPolicy2 from "./privacy-policy2";
import PrivacyPolicy3 from "./privacy-policy3";
import PrivacyPolicy4 from "./privacy-policy4";

const variants = {
  "privacy-policy1": PrivacyPolicy1,
  "privacy-policy2": PrivacyPolicy2,
  "privacy-policy3": PrivacyPolicy3,
  "privacy-policy4": PrivacyPolicy4,
};

export default function PrivacyPolicy({ variant, content }) {
  const name = variant ?? "privacy-policy1";
  const Component = variants[name] ?? PrivacyPolicy1;
  return <Component content={content} />;
}

export { PrivacyPolicy1, PrivacyPolicy2, PrivacyPolicy3, PrivacyPolicy4, variants };

