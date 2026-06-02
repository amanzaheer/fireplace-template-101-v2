"use client";
import Navbar1 from './Navbar1';
import Navbar2 from './Navbar2';
import Navbar3 from './Navbar3';
import Navbar4 from './Navbar4';
import Navbar5 from './Navbar5';
import Navbar6 from './Navbar6';
import Navbar7 from './Navbar7';
import Navbar8 from './Navbar8';
import Navbar9 from './Navbar9';
import Navbar10 from './Navbar10';
import Navbar11 from './Navbar11';
import Navbar12 from './Navbar12';
import Navbar13 from './Navbar13';
import Navbar14 from './Navbar14';
import Navbar15 from './Navbar15';
import Navbar16 from './Navbar16';
import Navbar17 from './Navbar17';
import Navbar18 from './Navbar18';
import Navbar20 from './Navbar20';
import Navbar19 from './Navbar19';
import Navbar21 from './Navbar21';
import Navbar26 from './Navbar26';
import Navbar27 from './Navbar27';
import Navbar28 from './Navbar28';
import Navbar29 from './Navbar29';
import Navbar30 from './Navbar30';
import Navbar31 from './Navbar31';
import Navbar32 from './Navbar32';
import Navbar33 from './Navbar33';
const variants = {
  Navbar1,
  Navbar2,
  Navbar3,
  Navbar4,
  Navbar5,
  Navbar6,
  Navbar7,
  Navbar8,
  Navbar9,
  Navbar14,
  Navbar15,
  Navbar11,
  Navbar12,
  Navbar10,
  Navbar13,
  Navbar16,
  Navbar17,
  Navbar18,
  Navbar20,
  Navbar19,
  Navbar21,
  Navbar21,
  Navbar26,
  Navbar27,
  Navbar28,
  Navbar29,
  Navbar30,
  Navbar31,
  Navbar32,
  Navbar33,
};
export default function Navbar({ variant, content }) {
  const name = String(variant ?? "").trim() || "Navbar21";
  const Component = variants[name] ?? Navbar21;
  return <Component content={content} />;
}
export { Navbar1, Navbar2, Navbar3, Navbar4, Navbar5, Navbar6, Navbar7, Navbar8, Navbar9, Navbar14, Navbar15, Navbar11, Navbar12, Navbar10, Navbar13, Navbar16, Navbar17, Navbar19, Navbar20, Navbar21, Navbar26, Navbar27, Navbar28,Navbar29, Navbar30, Navbar31,Navbar32,Navbar33, variants };




