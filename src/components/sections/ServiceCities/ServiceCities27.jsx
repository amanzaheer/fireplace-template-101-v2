"use client";

import React, { useState } from "react";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import Link from "next/link";

export default function  ServiceCities27({ content }) {
  const [page, setPage] = useState(0);

  const locationData = content?.locations ?? {};
  const title = locationData?.title ?? "We Proudly Serve Multiple Locations";
  const description = locationData?.description ?? "";
  const ctaLabel = locationData?.cta_label ?? "BOOK YOUR SERVICE";
  const ctaHref = locationData?.cta_href ?? "/#contact-us";
  const list = locationData?.list ?? [];

  const PER_PAGE = 12;
  const totalPages = Math.ceil(list.length / PER_PAGE);
  const start = page * PER_PAGE;
  const currentItems = list.slice(start, start + PER_PAGE);

  return (
    <FullContainer className="py-12 bg-black" id="locations">
      <Container className="px-4">

        {/* Title & Description */}
        <div className="text-center mb-10">
          <Heading text={title} className="text-white mb-4" />
          <p className="text-white text-base max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentItems.map((loc, index) => (
            <div
              key={loc?.name ?? index}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer"
            >
              {/* Image */}
              <Image
                src={`/api/image/${loc.image}`}
                alt={loc?.name ?? "Location"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Name badge */}
              <div className="absolute top-3 left-14 bg-white/90 backdrop-blur-sm text-black text-sm font-semibold px-5 py-2 rounded-md self-center">
                {loc?.name}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between mt-6 gap-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center disabled:opacity-40 hover:bg-white/20 transition"
          >
            &#8592;
          </button>

          {/* Progress bar */}
          <div className="flex-1 h-1 bg-white/20 rounded-full">
            <div
              className="h-full bg-[#818181] rounded-full transition-all duration-300"
              style={{ width: `${((page + 1) / totalPages) * 100}%` }}
            />
          </div>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={page === totalPages - 1}
            className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center disabled:opacity-40 hover:bg-white/20 transition"
          >
            &#8594;
          </button>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-10">
          <Link
            href={ctaHref}
            className="inline-block bg-[#FF0011] hover:bg-red-600 text-white font-bold text-sm tracking-widest px-12 py-4 rounded-md transition"
          >
            {ctaLabel}
          </Link>
        </div>

      </Container>
    </FullContainer>
  );
}