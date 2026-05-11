"use client";
/**
 * ServiceBenefits section: multiple designs, one export.
 */
import ServiceBenefits1 from "./ServiceBenefits1";
import ServiceBenefits2 from "./ServiceBenefits2";
import ServiceBenefits3 from "./ServiceBenefits3";
import ServiceBenefits4 from "./ServiceBenefits4";
import ServiceBenefits6 from "./ServiceBenefits6";
import ServiceBenefits8 from "./ServiceBenefits8";
import ServiceBenefits5 from "./ServiceBenefits5";
import ServiceBenefits7 from "./ServiceBenefits7";
import ServiceBenefits9 from "./ServiceBenifits9";
import ServiceBenefits10 from "./ServiceBenefits10";
import ServiceBenifits14 from "./ServiceBenifits14";
import ServiceBenefits15 from "./ServieBenefits15";
import ServiceBenefits11 from "./ServiceBenefits11";
import ServiceBenefits12 from "./ServiceBenefits12";
import ServiceBenefits13 from "./ServiceBenefits13";
import ServiceBenefits17 from "./ServiceBenefits17";
import ServiceBenefits20 from "./ServiceBenifits20";
import ServiceBenefits19 from "./ServiceBenefits19";
import ServiceBenefits21 from "./ServiceBenifits21";
const variants = {
  ServiceBenefits1,
  ServiceBenefits2,
  ServiceBenefits3,
  ServiceBenefits4,
  ServiceBenefits6,
  ServiceBenefits8,
  ServiceBenefits5,
  ServiceBenefits7,
  ServiceBenefits9,
  ServiceBenifits14,
  ServiceBenefits15,
  ServiceBenefits11,
  ServiceBenefits12,
  ServiceBenefits10,
  ServiceBenefits13,
  ServiceBenefits17,
  ServiceBenefits20,
  ServiceBenefits19,
  ServiceBenefits21,
};

export default function ServiceBenefits({ variant, content }) {
  const name = String(variant ?? "").trim() || "ServiceBenefits21";
  const Component = variants[name] ?? ServiceBenefits21;
  return <Component content={content} />;
}

export {
  ServiceBenefits1,
  ServiceBenefits2,
  ServiceBenefits3,
  ServiceBenefits4,
  ServiceBenefits5,
  ServiceBenefits6,
  ServiceBenefits7,
  ServiceBenefits8,
  ServiceBenefits9,
  ServiceBenefits10,
  ServiceBenefits11,
  ServiceBenefits12,
  ServiceBenefits13,
  ServiceBenifits14,
  ServiceBenefits15,
  ServiceBenefits17,
  ServiceBenefits19,
  ServiceBenefits20,
  ServiceBenefits21,
  variants,
};
