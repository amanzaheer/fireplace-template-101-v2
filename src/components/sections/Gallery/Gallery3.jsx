  "use client";

  import React from "react";
  import Image from "next/image";
  import { Phone } from "lucide-react";
  import md from "@/lib/markdown";
  import FullContainer from "@/components/common/FullContainer";
  import Container from "@/components/common/Container";
  import { IMAGE_BASE } from "@/lib/constants";
  import { Poppins, Inter, Rubik, Archivo } from "next/font/google";

  const poppins = Poppins({
    subsets: ["latin"],
    style: ["normal", "italic"],
    weight: ["400", "500", "600", "700"],
  });

  const inter = Inter({
    subsets: ["latin"],
    style: ["normal", "italic"],
    weight: ["400", "500", "600", "700"],
  });

  const rubik = Rubik({
    subsets: ["latin"],
    style: ["normal", "italic"],
    weight: ["400", "500", "600", "700"],
  });

  const archivo = Archivo({
    subsets: ["latin", "italian"],
    style: ["normal", "italic"],
    weight: ["400", "500", "600", "700"],
  });

  const prose =
    "prose max-w-none text-[#171717] prose-headings:font-extrabold prose-headings:text-[#171717] prose-p:text-[#212020] prose-li:text-[#212020] prose-strong:text-[#212020] prose-a:text-[#f59403] prose-h1:!text-2xl md:prose-h1:!text-3xl prose-h2:!text-xl md:prose-h2:!text-2xl";

  const BLUR_DATA_URL =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

  function buildImageSrc(base, filePath) {
    if (!filePath || typeof filePath !== "string") return "";
    const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
    const segment = filePath.replace(/^\//, "");
    return `${basePath}/${segment}`;
  }

  export default function Gallery3({ content }) {
    const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
    const block = content?.gallery ?? null;

    if (!block) return null;

    const title = block.title ?? "";
    const html = block.description ? md.render(block.description) : "";
    const files = Array.isArray(block.file_name) ? block.file_name : [];

    if (!title && !html && files.length === 0) return null;

    return (
      <FullContainer id="gallery" className="py-10 md:py-14 bg-[#efefef]">
        <Container>
          <div className="max-w-6xl mx-auto">
            {title ? (
              <h2
                className={`${rubik.className} text-3xl md:text-[44px] font-bold tracking-tight text-[#212020] text-center mb-6 md:mb-8`}
              >
                {title}
              </h2>
            ) : null}

            {html ? (
              <div
                className={`${poppins.className} ${prose} w-full text-center max-w-4xl mx-auto mb-8 md:mb-12 prose-headings:text-center prose-p:text-center prose-li:text-center prose-ul:mx-auto prose-ol:mx-auto`}
                style={{ ["--prose-primary"]: "#212020" }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : null}

            {files.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                {files.map((fileName, index) => {
                  const src = buildImageSrc(IMAGE_BASE, fileName);
                  const label = title
                    ? `${title} - image ${index + 1} of ${files.length}`
                    : `Gallery image ${index + 1} of ${files.length}`;
                  const row = Math.floor(index / 2);
                  const col = index % 2;
                  const isAccent = (row + col) % 2 === 1;
                  return (
                    <div
                      key={index}
                      className={`${inter.className} flex flex-col gap-4 md:gap-5`}
                    >
                      <div
                        className={`w-full overflow-hidden rounded-[24px] border shadow-sm transition-colors duration-200 ${
                          isAccent
                            ? "bg-[#f59403] border-[#e29a00]"
                            : "bg-white border-[#e7e7e7]"
                        }`}
                      >
                        <div className="p-2 md:p-3">
                          <div className="aspect-4/3 relative rounded-[18px] overflow-hidden bg-gray-100">
                            <Image
                              title={label}
                              src={src}
                              alt={label}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL={BLUR_DATA_URL}
                            />
                          </div>
                        </div>
                      </div>
                      {phone ? (
                        <div
                          className={`${rubik.className} flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-stretch sm:items-center`}
                        >
                          <a
                            href={`tel:${phone}`}
                            className={`${archivo.className} inline-flex items-center justify-center gap-2 rounded-full uppercase tracking-wide font-bold px-6 py-3 text-xs md:text-sm transition-colors duration-200 ${
                              isAccent
                                ? "bg-white text-[#f59403] hover:bg-[#f7f7f7]"
                                : "bg-[#f59403] text-white hover:bg-[#e39a00]"
                            }`}
                          >
                            Call Us Today
                            <span aria-hidden="true">→</span>
                          </a>
                          <a
                            href={`tel:${phone}`}
                            className={`${inter.className} inline-flex items-center justify-center gap-2 rounded-full font-semibold px-5 py-3 text-sm md:text-base transition-colors duration-200 shadow-sm min-w-0 ${
                              isAccent
                                ? "bg-[#f59403] text-white border-2 border-white hover:bg-white/15"
                                : "bg-white text-[#212020] border border-[#e7e7e7] hover:bg-[#f7f7f7]"
                            }`}
                          >
                            {isAccent ? (
                              <div className="w-6 h-6 shrink-0 bg-white rounded-full flex items-center justify-center">

                              <Phone className="w-4 h-4 shrink-0 text-[#f59403]" aria-hidden />
                          
                              </div>
                            ) : (
                              <div className={`w-6 h-6 shrink-0 ${isAccent ? "bg-white" : "bg-[#f59403]"} rounded-full flex items-center justify-center`}>

                              <Image
                                src="/st-icons/Temp3/call2.png"
                                alt=""
                                width={18}
                                height={18}
                                className="w-auto h-4 md:h-[12px] shrink-0 text-white"
                              />
                              </div>

                            )}
                            <span className="truncate">{phone}</span>
                          </a>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </Container>
      </FullContainer>
    );
  }
