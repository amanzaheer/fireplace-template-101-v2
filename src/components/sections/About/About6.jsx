"use client";

import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

export default function About6({ content }) {
  const about = content?.about ?? {};
  const points = Array.isArray(about.points) ? about.points : [];
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  return (
    <FullContainer className="bg-white py-8 md:py-12" id="about">
      <Container className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-md bg-transparent shadow-[0_10px_28px_rgba(0,0,0,0.18)]">
          <div className="grid grid-cols-1">
            <div className="mx-auto flex w-full max-w-4xl flex-col justify-center bg-[#111214] px-6 py-8 text-white md:px-7 md:py-9">
              {about?.heading ? (
                <h2 className="mb-3 text-xl font-bold leading-tight md:text-2xl">
                  {about.heading}
                </h2>
              ) : null}

              <div className="space-y-2 text-[17px] leading-[1.45] text-white/95 md:text-[18px]">
                {about?.description1 ? <p>{about.description1}</p> : null}
                {about?.description2 ? <p>{about.description2}</p> : null}
              </div>

              {points.length > 0 && (
                <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-white/90 md:grid-cols-2">
                  {points.map((point, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a00]" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {phone ? (
                <div className="mt-6">
                  <a
                    href={`tel:${phone}`}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-[#ff5a00] px-5 py-2.5 text-lg font-bold leading-none text-white transition-colors hover:bg-[#e35000]"
                  >
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-current"
                    >
                      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.56 3.58.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.19 2.46.56 3.58a1 1 0 0 1-.24 1.02l-2.2 2.19Z" />
                    </svg>
                    {phone}
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
