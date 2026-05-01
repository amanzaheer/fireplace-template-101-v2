"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
  validateZipcode,
} from "@/lib/validators";

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
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = "Name is required";
    else if (!validateName(formData.name)) nextErrors.name = "Enter a valid name";

    if (!formData.email.trim()) nextErrors.email = "Email is required";
    else if (!validateEmail(formData.email)) nextErrors.email = "Enter a valid email";

    const cleanPhone = formData.phone.replace(/[-()\s]/g, "");
    if (!formData.phone.trim()) nextErrors.phone = "Phone is required";
    else if (!validatePhone(cleanPhone)) nextErrors.phone = "Phone must be 10 digits";

    if (!formData.zipcode.trim()) nextErrors.zipcode = "Zip code is required";
    else if (!validateZipcode(formData.zipcode)) nextErrors.zipcode = "Enter a valid zip code";

    if (!formData.message.trim()) nextErrors.message = "Message is required";
    else if (!validateMessage(formData.message, 10)) nextErrors.message = "Message must be at least 10 characters";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const nameParts = formData.name.trim().split(" ");
      const payload = {
        first_name: nameParts[0] || "",
        last_name: nameParts.slice(1).join(" ") || "",
        email: formData.email,
        phone: formData.phone.replace(/[-()\s]/g, ""),
        zipcode: formData.zipcode,
        message: formData.message,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Form submission failed");
      }

      toast.success(result.message || "Your request has been submitted successfully! We'll contact you shortly.");
      setFormSubmitted(true);
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeThankYou = () => {
    setFormSubmitted(false);
    setFormData({ name: "", email: "", phone: "", zipcode: "", message: "" });
    setErrors({});
  };

  return (
    <FullContainer id="contact-us" className="relative w-full bg-white p-0 overflow-hidden font-barlow mb-0">
      
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
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-white lg:via-white/10 lg:to-white lg:to-55%" 
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

            {formSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h4 className="text-3xl font-bold text-black mb-4">Thank You!</h4>
                <p className="text-black text-xl max-w-md mb-6">
                  Your request has been submitted successfully. We&apos;ll contact you shortly with your personalized quote.
                </p>
                <button
                  type="button"
                  onClick={closeThankYou}
                  className="bg-white text-black py-3 px-6 rounded-md font-medium transition-colors duration-200 hover:bg-gray-100"
                >
                  OK Thanks
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    name="name"
                    placeholder="Your Full Name"
                    className={`w-full bg-[#0A1D37] text-white rounded-md placeholder:text-white p-3 outline-none border focus:border-white ${
                      errors.name ? "border-red-500" : "border-transparent"
                    }`}
                    onChange={handleChange}
                    value={formData.name}
                  />
                  <input
                    name="email"
                    placeholder="Your Email ( abc@gmail.com)"
                    className={`w-full bg-[#0A1D37] text-white rounded-md placeholder:text-white p-3 outline-none border focus:border-white/30 ${
                      errors.email ? "border-red-500" : "border-transparent"
                    }`}
                    onChange={handleChange}
                    value={formData.email}
                  />
                  <input
                    name="phone"
                    placeholder="(123)-456-7890"
                    className={`w-full bg-[#0A1D37] text-white rounded-md placeholder:text-white p-3 outline-none border focus:border-white/30 ${
                      errors.phone ? "border-red-500" : "border-transparent"
                    }`}
                    onChange={handleChange}
                    value={formData.phone}
                  />
                  <input
                    name="zipcode"
                    placeholder="ZIP CODE"
                    className={`w-full bg-[#0A1D37] text-white rounded-md placeholder:text-white p-3 outline-none border focus:border-white/30 ${
                      errors.zipcode ? "border-red-500" : "border-transparent"
                    }`}
                    onChange={handleChange}
                    value={formData.zipcode}
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={4}
                  className={`w-full bg-[#0A1D37] text-white rounded-md placeholder:text-white p-3 outline-none border focus:border-white/30 ${
                    errors.message ? "border-red-500" : "border-transparent"
                  }`}
                  onChange={handleChange}
                  value={formData.message}
                />

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#C90100] text-white rounded-md font-bold uppercase  h-[54px] w-[235px] items-center gap-2  text-lg hover:brightness-110 transition-all"
                  >
                    {isSubmitting ? "Processing..." : "Submit"}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </Container>
    </FullContainer>
  );
}