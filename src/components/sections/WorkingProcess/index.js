"use client";

/**
 * WorkingProcess section: multiple designs, one export.
 */

import WorkingProcess12 from "./WorkingProcess12";
import WorkingProcess18 from "./WorkingProcess18";
import WorkingProcess20 from "./WorkingProcess20";
import WorkingProcess21 from "./WorkingProcess21";
import WorkingProcess26 from "./WorkingProcess26";

const variants = {
  WorkingProcess12,
  WorkingProcess20,
  WorkingProcess21,
  WorkingProcess26,
  WorkingProcess18,
};

export default function WorkingProcess({ variant, content }) {
  const name = String(variant ?? "").trim() || "WorkingProcess26";
  const Component = variants[name] ?? WorkingProcess26;
  return <Component content={content} />;
}

export {
  WorkingProcess12,
  WorkingProcess20,
  WorkingProcess21,
  WorkingProcess26,
  WorkingProcess18,
  variants,
};
