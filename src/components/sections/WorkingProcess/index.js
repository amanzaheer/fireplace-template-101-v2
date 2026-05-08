/**
"use client";

/**
 * WorkingProcess section: multiple designs, one export.
 */
import WorkingProcess12 from "./WorkingProcess12";
import WorkingProcess20 from "./WorkingProcess20";

const variants = {
  WorkingProcess12,
  WorkingProcess20,
};

export default function WorkingProcess({ variant, content }) {
  const name = String(variant ?? "WorkingProcess20").trim();
  const Component = variants[name] ?? WorkingProcess20;

  return <Component content={content} />;
}

export {
  WorkingProcess12,
  WorkingProcess20,
  variants,
};