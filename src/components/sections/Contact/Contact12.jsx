"use client";

import React, { useState, useCallback, memo } from "react";
import { CheckCircle, Loader } from "lucide-react";
import toast from "react-hot-toast";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Testimonials12 from "../Testimonials/Testimonials12";
import { Poppins, Rubik } from "next/font/google";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
  validateZipcode,
} from "@/lib/validators";

const poppins = Poppins({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const rubik = Rubik({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const NameInput = memo(({ value, onChange, error }) => (
  <div>
    <input
      id="contact-name"
      type="text"
      name="name"
      value={value}
      onChange={onChange}
      className={`w-full rounded-none border border-white/80 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/90 sm:px-4 sm:text-base md:text-lg ${error ? "border-red-300" : "border-white/80"} focus:border-white`}
      placeholder="Your Full Name"
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-xs text-red-200">{error}</p>}
  </div>
));

const EmailInput = memo(({ value, onChange, error }) => (
  <div>
    <input
      id="contact-email"
      type="email"
      name="email"
      value={value}
      onChange={onChange}
      className={`w-full rounded-none border border-white/80 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/90 sm:px-4 sm:text-base md:text-lg ${error ? "border-red-300" : "border-white/80"} focus:border-white ${poppins.className}`}
      placeholder="Your Email ( abc@gmail.com)"
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-xs text-red-200">{error}</p>}
  </div>
));

const PhoneInput = memo(({ value, onChange, error }) => (
  <div>
    <input
      id="contact-phone"
      type="tel"
      name="phone"
      value={value}
      onChange={onChange}
      className={`w-full rounded-none border border-white bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/90 sm:px-4 sm:text-base md:text-lg ${error ? "border-red-300" : "border-white"} focus:border-white`}
      placeholder="(123) 456-7890"
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-xs text-red-200">{error}</p>}
  </div>
));

const ZipcodeInput = memo(({ value, onChange, error }) => (
  <div>
    <input
      id="contact-zipcode"
      type="text"
      name="zipcode"
      value={value}
      onChange={onChange}
      className={`w-full rounded-none border border-white/80 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/90 sm:px-4 sm:text-base md:text-lg ${error ? "border-red-300" : "border-white/80"} focus:border-white`}
      placeholder="ZIP CODE"
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-xs text-red-200">{error}</p>}
  </div>
));

const MessageInput = memo(({ value, onChange, error }) => (
  <div>
    <textarea
      id="contact-message"
      name="message"
      value={value}
      onChange={onChange}
      rows={4}
      className={`min-h-[72px] sm:min-h-[80px] max-h-[120px] resize-y w-full rounded-none border border-white/80 bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-white sm:text-base md:text-lg ${error ? "border-red-300" : "border-white/80"} focus:border-white`}
      placeholder="Message"
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-xs text-red-200">{error}</p>}
  </div>
));

export default function Contact12({ content }) {
  const formHead = content?.form_head ?? {};
  const title = formHead.title ?? "10% Off Total Price for Online Booking";
  const subTitle = formHead.sub_title ?? "Ask For A Quote Here";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    zipcode: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formStarted, setFormStarted] = useState(false);

  const handleFirstInteraction = () => {
    if (!formStarted && typeof window !== "undefined") {
      try {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "form start",
          url: window.location.href,
        });
        setFormStarted(true);
      } catch {
        setFormStarted(true);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (!validateName(formData.name))
      newErrors.name = "Name must be 2-50 characters and contain only letters";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Please enter a valid email address";
    const cleanPhone = formData.phone.replace(/[-()\s]/g, "");
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!validatePhone(cleanPhone))
      newErrors.phone = "Phone number must be exactly 10 digits";
    if (!formData.zipcode.trim()) newErrors.zipcode = "Zipcode is required";
    else if (!validateZipcode(formData.zipcode))
      newErrors.zipcode = "Please enter a valid zipcode (12345 or 12345-6789)";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (!validateMessage(formData.message, 10))
      newErrors.message = "Message must be at least 10 characters long";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleFirstInteraction();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      const payload = {
        first_name: firstName,
        last_name: lastName,
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

      if (!response.ok) {
        if (result.errors && Array.isArray(result.errors)) {
          const serverErrors = {};
          result.errors.forEach((err) => {
            if (
              err.toLowerCase().includes("first name") ||
              err.toLowerCase().includes("name")
            )
              serverErrors.name = err;
            else if (err.toLowerCase().includes("email"))
              serverErrors.email = err;
            else if (err.toLowerCase().includes("phone"))
              serverErrors.phone = err;
            else if (err.toLowerCase().includes("zipcode"))
              serverErrors.zipcode = err;
            else if (err.toLowerCase().includes("message"))
              serverErrors.message = err;
          });
          setErrors(serverErrors);
        }
        throw new Error(result.message || "Form submission failed");
      }

      if (result.success === false)
        throw new Error(result.message || "Form submission failed");

      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "form_submit",
          url: window.location.href,
          formData: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            zipcode: formData.zipcode,
          },
        });
      }
      toast.success(
        result.message ||
        "Your request has been submitted successfully! We'll contact you shortly.",
      );
      setFormSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }, []);

  const closeThankYou = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "leadSubmitted",
        url: window.location.href,
      });
    }
    setFormSubmitted(false);
    setFormData({ name: "", email: "", phone: "", zipcode: "", message: "" });
    setErrors({});
  };

  return (
    <FullContainer id="contact-us" className="relative mt-6 pb-6 sm:mt-9 sm:pb-4">
      <Container className="relative z-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-6 lg:gap-10">
          <div
            id="quote-form-section"
            className="flex w-full justify-center md:justify-start"
          >
            <div className="mb-2 w-full max-w-[560px] gap-0 overflow-hidden rounded-xl bg-[#da4909] shadow-lg sm:mb-5 md:max-w-none md:min-h-[560px]">
              <div
                className={`flex min-h-full flex-col p-4 text-white sm:p-5 md:p-6 lg:p-8 ${poppins.className}`}
              >
                {formSubmitted ? (
                  <div className="flex min-h-[320px] flex-col items-center justify-center px-2 py-10 text-center sm:min-h-[400px] sm:py-12 md:min-h-[480px]">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 sm:mb-8 sm:h-24 sm:w-24">
                      <CheckCircle className="h-10 w-10 text-green-600 sm:h-12 sm:w-12" />
                    </div>
                    <h4 className="mb-3 text-2xl font-bold text-white sm:mb-4 sm:text-3xl">
                      Thank You!
                    </h4>
                    <p className="mb-6 max-w-md text-base text-white sm:text-lg md:text-xl">
                      Your request has been submitted successfully. We&apos;ll
                      contact you shortly with your personalized quote.
                    </p>
                    <button
                      type="button"
                      onClick={closeThankYou}
                      className="rounded-md bg-white px-6 py-3 text-sm font-medium text-[#fe4949] transition-colors duration-200 hover:bg-gray-100 sm:text-base"
                    >
                      OK Thanks
                    </button>
                  </div>
                ) : (
                  <>
                    <h2
                      className={`${poppins.className} text-center text-xl font-bold tracking-tight text-white sm:text-2xl md:text-[29px]`}
                    >
                      {title}
                    </h2>
                    <h3
                      className={`${poppins.className} mb-3 text-center text-lg font-normal leading-tight text-white sm:mb-4 sm:text-xl md:mb-5 md:text-[20px]`}
                    >
                      {subTitle}
                    </h3>
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-2 sm:space-y-2.5"
                      noValidate
                    >
                      <div
                        className={`${poppins.className} grid gap-2`}
                      >
                        <NameInput
                          value={formData.name}
                          onChange={handleChange}
                          error={errors.name}
                        />
                        <EmailInput
                          value={formData.email}
                          onChange={handleChange}
                          error={errors.email}
                        />
                        <PhoneInput
                          value={formData.phone}
                          onChange={handleChange}
                          error={errors.phone}
                        />
                        <ZipcodeInput
                          value={formData.zipcode}
                          onChange={handleChange}
                          error={errors.zipcode}
                        />
                      </div>
                      <MessageInput
                        value={formData.message}
                        onChange={handleChange}
                        error={errors.message}
                      />
                      <div className="pt-1 sm:pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`${poppins.className} flex w-full items-center justify-center rounded-full border-2 border-white bg-white px-6 py-2.5 text-base font-normal text-[#e5170b] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#fe4949] disabled:opacity-70 sm:px-8 sm:py-3 sm:text-[20px]`}
                          aria-busy={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader className="mr-2 h-5 w-5 animate-spin text-[#e5170b] sm:mr-3" />
                              Processing...
                            </>
                          ) : (
                            "SUBMIT"
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="min-w-0 w-full overflow-hidden">
            <Testimonials12 content={content} embedded />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
