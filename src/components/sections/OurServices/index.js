"use client";
import React from "react";
/*
  OurServices section: multiple designs, one export.
 */
import OurServices1 from "./OurServices1";
import OurServices2 from "./OurServices2";
import OurServices3 from "./OurServices3";
import OurServices4 from "./OurServices4";
import OurServices5 from "./OurServices5";
import OurServices6 from "./OurServices6";
import OurServices7 from "./OurServices7";
import OurServices8 from "./OurServices8";
import OurServices9 from "./OurServices9";
import OurServices10 from "./OurServices10";
import OurServices11 from "./OurServices11";
import OurServices12 from "./OurServices12";
import OurServices13 from "./OurServices13";
import OurServices14 from "./OurServices14";
import OurServices15 from "./OurServices15";
import OurServices16 from "./OurServices16";
import OurServices17 from "./OurServices17";
import OurServices18 from "./OurServices18";
import OurServices20 from "./OurServices20";
import OurServices19 from "./OurServices19";
import OurServices21 from "./OurServices21";
import OurServices27 from "./OurServices27";
import OurServices28 from "./OurServices28";
import OurServices29 from "./OurServices29";
import OurServices30 from "./OurServices30";
import OurServices31 from "./OurServices31";
import OurServices32 from "./OurServices32";
import OurServices33 from "./OurServices33";
const variants = {
  OurServices1,
  OurServices2,
  OurServices3,
  OurServices4,
  OurServices5,
  OurServices6,
  OurServices7,
  OurServices8,
  OurServices9,
  OurServices10,
  OurServices11,
  OurServices12,
  OurServices13,
  OurServices14,
  OurServices15,
  OurServices16,
  OurServices17,
  OurServices18,
  OurServices20,
  OurServices19,
  OurServices21,
  OurServices27,
  OurServices28,
  OurServices29,
  OurServices30,
  OurServices31,
  OurServices32,
  OurServices33,
};

export default function OurServices({ variant, content }) {
  const name = String(variant ?? "").trim() || "OurServices32";
  let Component = variants[name] ?? OurServices32;

  // Defensive: if the imported value is a module namespace (object) try its default
  if (Component && typeof Component === "object" && Component.default) {
    Component = Component.default;
  }

  if (!Component || (typeof Component !== "function" && typeof Component !== "object")) {
    // Helpful console output for debugging invalid element type errors at runtime
    // eslint-disable-next-line no-console
    console.error(
      "OurServices: invalid component for variant=",
      name,
      "resolved to:",
      Component,
    );
    return null;
  }

  // Error boundary to catch render-time errors inside the chosen variant
  class OurServicesErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
      return { hasError: true };
    }
    componentDidCatch(error, info) {
      // eslint-disable-next-line no-console
      console.error("OurServices render error for variant=", name, error, info);
    }
    render() {
      if (this.state.hasError) return null;
      return this.props.children;
    }
  }

  return (
    <OurServicesErrorBoundary>
      <Component content={content} />
    </OurServicesErrorBoundary>
  );
}

export { OurServices1, OurServices2, OurServices3, OurServices4, OurServices6, OurServices8, OurServices5, OurServices7, OurServices9, OurServices10, OurServices11, OurServices12, OurServices13, OurServices14, OurServices15, OurServices16, OurServices17, OurServices19, OurServices20, OurServices21, OurServices27, OurServices28, OurServices29, OurServices30, OurServices31, OurServices32, OurServices33, variants };

