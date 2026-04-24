/*
 * TVSizes section: design variants live in this folder (e.g. TVSize16.jsx).
 * `variant` comes from domain config (layouts.json via SectionLayout).
 */
import TVSize16 from "./TVSize16";

const variants = {
  TVSize16,
};

export default function TVSizes({ variant, content }) {
  const name = String(variant ?? "").trim() || "TVSize16";
  const Component = variants[name] ?? TVSize16;
  return <Component content={content} />;
}

export { TVSize16, variants };
