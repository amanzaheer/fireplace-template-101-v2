"use client";

import React from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function fileNameList(block) {
  if (!block || typeof block !== "object") return [];
  const raw = block.file_name;

  if (Array.isArray(raw)) {
    return raw.filter((x) => typeof x === "string" && x.trim());
  }

  if (typeof raw === "string" && raw.trim()) {
    return [raw.trim()];
  }

  return [];
}

/* ================= ORIGINAL SPREAD ================= */
function spreadFirstThree(files) {
  if (!Array.isArray(files) || files.length < 3) return files;

  const result = new Array(files.length).fill(null);

  const anchors = [
    0,
    Math.min(5, files.length - 1),
    Math.min(10, files.length - 1),
  ];

  result[anchors[0]] = files[0];
  result[anchors[1]] = files[1];
  result[anchors[2]] = files[2];

  let restIndex = 3;

  for (let i = 0; i < result.length; i++) {
    if (result[i] === null && restIndex < files.length) {
      result[i] = files[restIndex];
      restIndex++;
    }
  }

  return result;
}

/* ================= ROW ADJUST ================= */
function adjustRowStarts(files) {
  if (!Array.isArray(files)) return files;

  const result = [...files];

  // Row 2 swap
  if (result.length >= 10) {
    [result[5], result[9]] = [result[9], result[5]];
  }

  // Row 3 swap
  if (result.length >= 13) {
    [result[10], result[12]] = [result[12], result[10]];
  }

  return result;
}

export default function WorkPortfolio16({ content }) {
  const block = content?.work_portfolio ?? null;
  if (!block) return null;

  const heading = block.title ?? "";

  const spreadFiles = spreadFirstThree(fileNameList(block));
  const files = adjustRowStarts(spreadFiles);

  if (files.length === 0) return null;

  return (
    <FullContainer
      id="work-portfolio"
      className="w-full flex items-center justify-center bg-white py-6 md:py-10"
    >
      <Container className="w-full max-w-[1370px] px-4 md:px-6">

        {/* ✅ RESPONSIVE GRID */}
        <ul
          className="
            grid w-full gap-3
            grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-4 
            lg:grid-cols-5
          "
        >
          {files.map((fileName, index) => {
            const src = buildImageSrc(IMAGE_BASE, fileName);
            if (!src) return null;

            const alt = heading
              ? `${heading} — ${index + 1} of ${files.length}`
              : `Portfolio — image ${index + 1} of ${files.length}`;

            return (
              <li
                key={`${fileName}-${index}`}
                className="overflow-hidden rounded-[10px]"
              >
                {/* ✅ ASPECT RATIO (approx 262x199) */}
                <div className="relative w-full aspect-[4/3]">
                  <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                </div>
              </li>
            );
          })}
        </ul>

      </Container>
    </FullContainer>
  );
}