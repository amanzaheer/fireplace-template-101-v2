"use client";

/**
 * WorkingProcess section: multiple designs, one export.
 */
import WorkingProcess12 from "./WorkingProcess12";
import WorkingProcess20 from "./WorkingProcess20";
import WorkingProcess21 from "./WorkingProcess21";
import WorkingProcess26 from "./WorkingProcess26";
import WorkingProcess18 from "./WorkingProcess18";
import WorkingProcess33 from "./WorkingProcess33";
const variants = {
  WorkingProcess12,
  WorkingProcess20,
  WorkingProcess21,
  WorkingProcess26,
  WorkingProcess18,
  WorkingProcess33,
};

export default function WorkingProcess({ variant, content }) {
  const name = String(variant ?? "").trim() || "WorkingProcess21";
  const Component = variants[name] ?? WorkingProcess21;
  return <Component content={content} />;
}

export {
  WorkingProcess12,
  WorkingProcess20,
  WorkingProcess21,
  WorkingProcess26,
  WorkingProcess18,
  WorkingProcess33,
  variants,
};
