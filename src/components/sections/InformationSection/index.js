"use client";
import InformationSection17 from "./InformationSection17";
import InformationSection27 from "./InformationSection27";

const variants = {
  InformationSection17,
  InformationSection27, 

};
export default function InformationSection({ variant, content }) {
  const name = variant ?? "InformationSection27";
  const Component = variants[name] ?? InformationSection27;
  return <Component content={content} />;
}
export { InformationSection17, InformationSection27, variants };
