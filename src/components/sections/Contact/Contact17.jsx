"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Contact6({ content }) {
  const formHead = content?.form_head ?? {};
  const contactImage = formHead.image || "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, contactImage);

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", zipcode: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Submitted!");
    setIsSubmitting(false);
  };

  return (
    <FullContainer id="contact-us" className="relative w-full bg-white p-0 overflow-hidden font-barlow">
      
      {/* BACKGROUND LAYER: Image with Gradient Fade */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {imageSrc && (
          <div className="relative w-full h-full">
            <Image
              src={imageSrc}
              alt="Fireplace background"
              fill
              className="object-cover object-left"
              priority
            />
            {/* The Gradient: Fades from transparent on the left to solid white on the right */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-white lg:via-white/10 lg:to-white lg:to-70%" 
            />
          </div>
        )}
      </div>

      {/* CONTENT LAYER */}
      <Container className="relative z-10 py-16 md:py-24">
        <div className="flex justify-center lg:justify-end">
          <div className="w-full lg:w-[55%] xl:w-[50%]">
            
            <h2 className="text-3xl md:text-5xl font-black text-[#C90100] leading-tight uppercase">
              {formHead.line1 || "10% Off Total Price For"}
            </h2>
            <h2 className="text-3xl md:text-5xl font-black text-[#C90100] leading-tight uppercase mt-1">
              {formHead.line2 || "Online Booking"}
            </h2>
            <h2 className="text-3xl md:text-4xl font-black text-black leading-tight mt-2 mb-8">
              {formHead.line3 || "Ask For A Quote Here"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  name="name"
                  placeholder="Your Full Name"
                  className="w-full bg-[#0A1D37] text-white rounded-md placeholder:text-white p-3 outline-none border border-transparent focus:border-white"
                  onChange={handleChange}
                />
                <input
                  name="email"
                  placeholder="Your Email ( abc@gmail.com)"
                  className="w-full bg-[#0A1D37] text-white rounded-md placeholder:text-white p-3 outline-none border border-transparent focus:border-white/30"
                  onChange={handleChange}
                />
                <input
                  name="phone"
                  placeholder="(123)-456-7890"
                  className="w-full bg-[#0A1D37] text-white rounded-md placeholder:text-white p-3 outline-none border border-transparent focus:border-white/30"
                  onChange={handleChange}
                />
                <input
                  name="zipcode"
                  placeholder="ZIP CODE"
                  className="w-full bg-[#0A1D37] text-white rounded-md placeholder:text-white p-3 outline-none border border-transparent focus:border-white/30"
                  onChange={handleChange}
                />
              </div>
              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                className="w-full bg-[#0A1D37] text-white rounded-md placeholder:text-white p-3 outline-none border border-transparent focus:border-white/30"
                onChange={handleChange}
              />
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#C90100] text-white rounded-md font-bold uppercase py-3 px-16 text-lg hover:brightness-110 transition-all"
                >
                  {isSubmitting ? "Processing..." : "Submit"}
                </button>
              </div>
            </form>

          </div>
        </div>
      </Container>
    </FullContainer>
  );
}