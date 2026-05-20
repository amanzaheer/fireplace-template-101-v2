"use client";

import ProfessionalBanner22 from "./ProfessionalBanner22";

const variants = {
  ProfessionalBanner22,

  };

export default function professionalBanner({ variant, content }) {
  const name = String(variant ?? "").trim() || "ProfessionalBanner22";
  const Component = variants[name] ?? ProfessionalBanner22;
  return <Component content={content} />;
}
export {
    ProfessionalBanner22, 
  variants,
};


