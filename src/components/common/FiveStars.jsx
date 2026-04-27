"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { cn } from "@/lib/utils";

config.autoAddCss = false;

const STAR_KEYS = [1, 2, 3, 4, 5];

/**
 * Renders five solid star icons (e.g. for reviews / testimonials).
 */
export default function FiveStars({ className, starClassName }) {
  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      role="img"
      aria-label="5 out of 5 stars"
    >
      {STAR_KEYS.map((k) => (
        <FontAwesomeIcon key={k} icon={faStar} className={`${starClassName} text-[17px] text-[#EFA536] md:text-[20px]`} />
      ))}
    </div>
  );
}
