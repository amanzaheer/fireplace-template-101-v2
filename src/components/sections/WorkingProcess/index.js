"use client";

/**
 * WorkingProcess section: multiple designs, one export.
 */
import WorkingProcess12 from "./WorkingProcess12";
import WorkingProcess20 from "./WorkingProcess20";
import WorkingProcess21 from "./WorkingProcess21";
import WorkingProcess23 from "./WorkingProcess23";

const variants = {
  WorkingProcess12,
  WorkingProcess20,
  WorkingProcess21,
  WorkingProcess23,
};

export default function WorkingProcess({ variant, content }) {
  const name = String(variant ?? "").trim() || "WorkingProcess23";
  const Component = variants[name] ?? WorkingProcess23;
  return <Component content={content} />;
}

export { WorkingProcess12, WorkingProcess20, WorkingProcess21, WorkingProcess23, variants };
