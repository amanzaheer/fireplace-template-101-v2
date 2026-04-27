"use client";

import React, { useState, useCallback, memo } from "react";
import { CheckCircle, Loader, TextQuote } from "lucide-react";
import { Poppins } from "next/font/google";
import toast from "react-hot-toast";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";

const contactHeadingFont = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});
import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
  validateZipcode,
} from "@/lib/validators";

const NameInput = memo(({ value, onChange, error }) => (
  <div>
    <label htmlFor="contact-name" className="sr-only">
      Name <span className="text-red-300">*</span>
    </label>
    <input
      id="contact-name"
      type="text"
      name="name"
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border bg-transparent rounded-md outline-none text-white placeholder:text-white/85 border-white/60 focus:border-white ${error ? "border-2 border-red-300" : ""}`}
      placeholder="Your full name"
      required
      aria-invalid={!!error}
    />
    {error && <p className="text-red-300 text-sm mt-1">{error}</p>}
  </div>
));

const EmailInput = memo(({ value, onChange, error }) => (
  <div>
    <label htmlFor="contact-email" className="sr-only">
      Email <span className="text-red-300">*</span>
    </label>
    <input
      id="contact-email"
      type="email"
      name="email"
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border bg-transparent rounded-md outline-none text-white placeholder:text-white/85 border-white/60 focus:border-white ${error ? "border-2 border-red-300" : ""}`}
      placeholder="your@email.com"
      required
      aria-invalid={!!error}
    />
    {error && <p className="text-red-300 text-sm mt-1">{error}</p>}
  </div>
));

const PhoneInput = memo(({ value, onChange, error }) => (
  <div>
    <label htmlFor="contact-phone" className="sr-only">
      Phone Number <span className="text-red-300">*</span>
    </label>
    <input
      id="contact-phone"
      type="tel"
      name="phone"
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border bg-transparent rounded-md outline-none text-white placeholder:text-white/85 border-white/60 focus:border-white ${error ? "border-2 border-red-300" : ""}`}
      placeholder="(123) 456-7890"
      required
      aria-invalid={!!error}
    />
    {error && <p className="text-red-300 text-sm mt-1">{error}</p>}
  </div>
));

const ZipcodeInput = memo(({ value, onChange, error }) => (
  <div>
    <label htmlFor="contact-zipcode" className="sr-only">
      Zip Code <span className="text-red-300">*</span>
    </label>
    <input
      id="contact-zipcode"
      type="text"
      name="zipcode"
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border bg-transparent rounded-md outline-none text-white placeholder:text-white/85 border-white/60 focus:border-white ${error ? "border-2 border-red-300" : ""}`}
      placeholder="12345"
      required
      aria-invalid={!!error}
    />
    {error && <p className="text-red-300 text-sm mt-1">{error}</p>}
  </div>
));

const MessageInput = memo(({ value, onChange, error }) => (
  <div>
    <label htmlFor="contact-message" className="sr-only">
      How can we help you? <span className="text-red-300">*</span>
    </label>
    <textarea
      id="contact-message"
      name="message"
      value={value}
      onChange={onChange}
      rows={4}
      className={`w-full min-h-[128px] px-4 py-3 border bg-transparent rounded-md outline-none text-white placeholder:text-white/85 border-white/60 focus:border-white ${error ? "border-2 border-red-300" : ""}`}
      placeholder="Tell us about your project or request"
      required
      aria-invalid={!!error}
    />
    {error && <p className="text-red-300 text-sm mt-1">{error}</p>}
  </div>
));

export default function Contact8({ content }) {
  const formHead = content?.form_head ?? {};
  const title = formHead.title ?? "10% Off Total Price for Online Booking";
  const subTitle = formHead.sub_title ?? "Offer ends in just a few hours!";

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
        window.dataLayer.push({ event: "form start", url: window.location.href });
        setFormStarted(true);
      } catch {
        setFormStarted(true);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (!validateName(formData.name)) newErrors.name = "Name must be 2-50 characters and contain only letters";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email)) newErrors.email = "Please enter a valid email address";
    const cleanPhone = formData.phone.replace(/[-()\s]/g, "");
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!validatePhone(cleanPhone)) newErrors.phone = "Phone number must be exactly 10 digits";
    if (!formData.zipcode.trim()) newErrors.zipcode = "Zipcode is required";
    else if (!validateZipcode(formData.zipcode)) newErrors.zipcode = "Please enter a valid zipcode (12345 or 12345-6789)";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (!validateMessage(formData.message, 10)) newErrors.message = "Message must be at least 10 characters long";
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
            if (err.toLowerCase().includes("first name") || err.toLowerCase().includes("name")) serverErrors.name = err;
            else if (err.toLowerCase().includes("email")) serverErrors.email = err;
            else if (err.toLowerCase().includes("phone")) serverErrors.phone = err;
            else if (err.toLowerCase().includes("zipcode")) serverErrors.zipcode = err;
            else if (err.toLowerCase().includes("message")) serverErrors.message = err;
          });
          setErrors(serverErrors);
        }
        throw new Error(result.message || "Form submission failed");
      }

      if (result.success === false) throw new Error(result.message || "Form submission failed");

      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "form_submit",
          url: window.location.href,
          formData: { name: formData.name, email: formData.email, phone: formData.phone, message: formData.message, zipcode: formData.zipcode },
        });
      }
      toast.success(result.message || "Your request has been submitted successfully! We'll contact you shortly.");
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
      window.dataLayer.push({ event: "leadSubmitted", url: window.location.href });
    }
    setFormSubmitted(false);
    setFormData({ name: "", email: "", phone: "", zipcode: "", message: "" });
    setErrors({});
  };

  return (
    <FullContainer id="contact-us" className="pb-4 relative mt-9">
      <Container className="relative z-10">
        <div id="quote-form-section">
          <div className="mb-5 overflow-hidden rounded-[20px] bg-gradient-to-b from-[#051529] to-[#11498F] shadow-lg">
            {formSubmitted ? (
              <div className="p-7 pt-6 font-barlow text-white md:p-10 md:pt-10 lg:p-12">
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h4 className="mb-4 text-3xl font-bold text-white">Thank You!</h4>
                  <p className="mb-6 max-w-md text-xl text-white">
                    Your request has been submitted successfully. We&apos;ll contact you shortly with your personalized quote.
                  </p>
                  <button
                    type="button"
                    onClick={closeThankYou}
                    className="rounded-md bg-white px-6 py-3 font-medium text-black transition-colors duration-200 hover:bg-gray-100"
                  >
                    OK Thanks
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="px-7 pb-7 pt-6 font-barlow text-white md:px-10 md:pb-8 md:pt-10 lg:px-12 lg:pb-8 lg:pt-12">
                  <h2
                    className={cn(
                      contactHeadingFont.className,
                      "mb-4 text-center text-[20px] font-bold leading-tight text-white",
                    )}
                  >
                    {title}
                  </h2>
                  <h3
                    className={cn(
                      contactHeadingFont.className,
                      "text-center text-[42px] font-bold leading-tight text-white",
                    )}
                  >
                    {subTitle}
                  </h3>
                </div>
                <div className="px-7 pb-7 font-barlow text-white md:px-10 md:pb-10 lg:px-12 lg:pb-12">
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="rounded-xl bg-orange-500 p-4 md:p-5">
                      <div className="grid gap-3 md:grid-cols-2">
                        <NameInput value={formData.name} onChange={handleChange} error={errors.name} />
                        <PhoneInput value={formData.phone} onChange={handleChange} error={errors.phone} />
                        <ZipcodeInput value={formData.zipcode} onChange={handleChange} error={errors.zipcode} />
                        <EmailInput value={formData.email} onChange={handleChange} error={errors.email} />
                      </div>
                      <div className="mt-3">
                        <MessageInput value={formData.message} onChange={handleChange} error={errors.message} />
                      </div>
                    </div>
                    <div className="mt-1 flex flex-col items-center justify-center text-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(
                          contactHeadingFont.className,
                          "mx-auto flex w-full items-center justify-center rounded-md bg-orange-500 px-10 py-3.5 text-[25px] font-semibold uppercase tracking-wide text-white shadow-lg transition-all duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:opacity-70",
                        )}
                        aria-busy={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader className="mr-3 h-5 w-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <span className="flex items-center gap-2">
                            <TextQuote className="h-5 w-5" />
                            Get A Quote
                          </span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
