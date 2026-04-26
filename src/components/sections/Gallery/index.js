"use client";
/**
 * Gallery section: multiple designs, one export.
 */
import Gallery1 from "./Gallery1";
import Gallery2 from "./Gallery2";
import Gallery3 from "./Gallery3";
import Gallery4 from "./Gallery4";
import Gallery5 from "./Gallery5";
import Gallery6 from "./Gallery6";
import Gallery8 from "./Gallery8";
import Gallery7 from "./Gallery7";
import Gallery9 from "./Gallery9";
import Gallery14 from "./Gallery14";
import Gallery15 from "./Gallery15";
import Gallery11 from "./Gallery11";
import Gallery12 from "./Gallery12";
import Gallery10 from "./Gallery10";
import Gallery13 from "./Gallery13";
import Gallery16 from "./Gallery16";
import Gallery8 from "./Gallery8";  
import Gallery7 from "./Gallery7";
import Gallery17 from "./Gallery17";
const variants = {
  Gallery1,
  Gallery2,
  Gallery3,
  Gallery4,
  Gallery5,
  Gallery6,
  Gallery8,
  Gallery7,
  Gallery9,
  Gallery14,
  Gallery11,
  Gallery12,
  Gallery10,
  Gallery13,
  Gallery16,
  Gallery17,
   
};
 const name = variants ?? "Gallery16";
  const Component = variants[name] ?? Gallery16;
  return <Component content={content} />;



export { Gallery1, Gallery2, Gallery3, Gallery4, Gallery5, Gallery6, Gallery8, Gallery7, Gallery9, Gallery14, Gallery15, Gallery16, variants };

