"use client";
import InformationSection17 from "./InformationSection17";

const variants = {
  InformationSection17,


};


export default function InformationSection({ variant, content }) {
  const name = variant ?? "InformationSection17";
  const Component = variants[name] ?? InformationSection17;
  return <Component content={content} />;
}
export { InformationSection17, variants };

