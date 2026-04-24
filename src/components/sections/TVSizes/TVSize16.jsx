"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";

/** Label + price line on TV size cards (Figma: Poppins 700, 23.557px, #FFF) */
const cardPriceFont = Poppins({
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal"],
});

function str(v) {
  if (v == null) return "";
  return String(v).trim();
}

/** Builds "Label – $99" from CMS fields only */
function labelPriceLine(label, price, separator) {
  const l = str(label);
  const p = str(price);
  if (l && p) return `${l}${separator}${p}`;
  return l || p;
}
function resolveOptionImageSrc(sizeRaw, opt) {
  const img = str(opt?.image ?? opt?.tv_image);
  if (!img) return "";
  if (/^https?:\/\//i.test(img) || img.startsWith("/")) {
    const rawPath = img.startsWith("//") ? `https:${img}` : img;
    return /^https?:/i.test(rawPath) ? rawPath : encodeURI(rawPath);
  }
  const base =
    str(sizeRaw?.image_base).replace(/\/$/, "") || "/images/contact/tv";
  const prefix = base.startsWith("/") ? base : `/${base}`;
  return encodeURI(`${prefix}/${img.replace(/^\/+/, "")}`);
}


function DiagonalLine({ insetClass = "inset-[9px]" }) {
  const thicknessPx = 5;
  const wrapRef = useRef(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const read = () => {
      const r = el.getBoundingClientRect();
      setBox({ w: r.width, h: r.height });
    };

    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = box;
  const len = w > 0 && h > 0 ? Math.hypot(w, h) : 0;
  const angleDeg = w > 0 && h > 0 ? (Math.atan2(h, w) * 180) / Math.PI : 0;
  const halfT = thicknessPx / 2;

  return (
    <div
      ref={wrapRef}
      className={cn(
        "pointer-events-none absolute z-[1] overflow-hidden rounded-[2px]",
        insetClass,
      )}
    >
      {len > 0 ? (
        <div
          className="absolute left-0 rounded-full bg-[#000000]"
          style={{
            top: -halfT,
            width: len,
            height: thicknessPx,
            transformOrigin: `0 ${halfT}px`,
            transform: `rotate(${angleDeg}deg)`,
          }}
        />
      ) : null}
    </div>
  );
}

function SizeBadge({ sizeDisplay }) {
  const badge = str(sizeDisplay);
  if (!badge) return null;
  return (
    <div
      className={cn(
        "absolute left-1/2 top-1/2 z-[2] box-border flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-black text-center font-bold leading-tight text-white",
        "h-[77px] w-[77px] gap-[12.492px] py-[17.486px] px-[16.415px] text-[11px] tracking-tight",
      )}
    >
      <span className="text-balance text-[25.486px]">{badge}</span>
    </div>
  );
}

function TvScreenBlock({ sizeRaw, sizeDisplay, opt, fallbackAlt }) {
  const perOpt = str(opt?.image);
  const shared = str(sizeRaw?.tv_image ?? sizeRaw?.shared_tv_image);
  const merged = perOpt || shared;
  const src = merged ? resolveOptionImageSrc(sizeRaw, { image: merged }) : "";
  const alt =
    str(opt?.image_alt) ||
    str(sizeRaw?.tv_image_alt) ||
    fallbackAlt ||
    (str(sizeDisplay) ? `TV ${str(sizeDisplay)}` : "TV");
  const badge = str(sizeDisplay);

  if (src) {
    return (
      <div className="mx-auto w-full max-w-[233.428px]">
        <div className="relative aspect-[109/70] w-full overflow-hidden bg-transparent">
          <Image
            src={src}
            alt={alt}
            fill
            className="z-0 object-contain object-center bg-transparent"
            sizes="(max-width: 1024px) 45vw, 233px"
          /> 
          <DiagonalLine insetClass="inset-[9px]" />
          {badge ? <SizeBadge sizeDisplay={badge} /> : null}
        </div>
      </div>
    );
  }

  return <TvGraphic sizeDisplay={sizeDisplay} />;
}

function TvGraphic({ sizeDisplay }) {
  const badge = str(sizeDisplay);
  return (
    <div className="mx-auto flex w-full max-w-[233.428px] flex-col items-center" aria-hidden>
      <div
        className={cn(
          "relative w-full rounded-[3px] border-[5px] border-[#2c3d55] bg-[#2c3d55] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
          "aspect-[109/70]",
        )}
      >
        <div className="absolute inset-[9px] rounded-[2px] border border-neutral-400/50 bg-[#d8dce3] shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]" />
        <DiagonalLine insetClass="inset-[9px]" />
        {badge ? <SizeBadge sizeDisplay={badge} /> : null}
      </div>
      <div className="mx-auto mt-1 flex w-[42%] justify-center gap-2">
        <div className="h-5 w-1.5 rounded-[1px] bg-[#2c3d55]" />
        <div className="h-5 w-1.5 rounded-[1px] bg-[#2c3d55]" />
      </div>
      <div className="mx-auto mt-0.5 h-1.5 w-[58%] rounded-sm bg-[#2c3d55]" />
    </div>
  );
}

export default function TVSize16({ content }) {
  const raw = content?.size ?? {};

  const title = str(raw.title);
  const sectionChoose = str(raw.choose_label) || "Choose";
  const sep = str(raw.label_price_separator) || " – ";
  const emptyMsg = str(raw.empty_message);
  const cardBg = str(raw.card_background) || "#496EB9";
  const buttonTextColor = str(raw.button_text_color) || "#FF4811";

  const options = Array.isArray(raw.options) ? raw.options : [];
  const [selectedId, setSelectedId] = useState(null);

  return (
    <FullContainer className="bg-neutral-50 py-10 md:py-14" id="tv-sizes">
      <Container className="max-w-6xl px-4 sm:px-6">
        {title ? (
          <h2 className="mb-8 text-center text-xl font-semibold tracking-tight text-neutral-900 md:mb-10 md:text-2xl">
            {title}
          </h2>
        ) : null}

        {options.length === 0 ? (
          <p className="text-center text-sm text-neutral-500">
            {emptyMsg ||
              "Add a `size` object with `options` in your page data JSON."}
          </p>
        ) : (
          <ul className="mx-auto grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {options.map((opt, index) => {
              const id =
                opt?.id != null && str(opt.id) !== ""
                  ? str(opt.id)
                  : `opt-${index}`;
              const label = str(opt?.label);
              const price = str(opt?.price);
              const sizeDisplay = str(opt?.size_display) || label;
              const headline = labelPriceLine(label, price, sep);
              const btnText = str(opt?.choose_label) || sectionChoose;
              const selected = selectedId === id;

              return (
                <li key={id} className="list-none">
                  <article
                    className={cn(
                      "flex h-full min-h-[18.5rem] flex-col rounded-lg px-4 pb-5 pt-6 shadow-sm ring-2 ring-transparent transition sm:min-h-[19.5rem] sm:px-5 sm:pb-6 sm:pt-7",
                      selected && "ring-white/95 ring-offset-2 ring-offset-neutral-100",
                    )}
                    style={{ backgroundColor: cardBg }}
                  >
                    {headline ? (
                      <p
                        className={cn(
                          "mb-4 min-h-[2.5rem] self-stretch text-balance text-center text-[23.557px] font-bold leading-normal text-[#FFF] not-italic sm:mb-5",
                          cardPriceFont.className,
                        )}
                      >
                        {headline}
                      </p>
                    ) : (
                      <div className="mb-4 min-h-[2.5rem] sm:mb-5" />
                    )}
                    <div className="flex min-h-0 flex-1 flex-col">
                      <div className="flex flex-1 flex-col items-center justify-center">
                        <TvScreenBlock
                          sizeRaw={raw}
                          sizeDisplay={sizeDisplay}
                          opt={opt}
                          fallbackAlt={headline || label}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedId(id)}
                        className={cn(
                          "mx-auto mt-4 box-border flex h-[51px] w-full max-w-[233px] shrink-0 items-center justify-center rounded-md bg-white font-bold shadow-sm transition hover:bg-neutral-100 sm:mt-5",
                          "gap-[10.708px] p-[12.849px] text-sm leading-none sm:text-base",
                          "focus-visible:outline 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                        )}
                        style={{ color: buttonTextColor }}
                      >
                        {btnText}
                      </button>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </Container>
    </FullContainer>
  );
}
