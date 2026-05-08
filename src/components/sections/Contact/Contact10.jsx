"use client";

import React, { useState, useCallback, memo } from "react";
import { CheckCircle, Loader } from "lucide-react";
import toast from "react-hot-toast";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins } from "next/font/google";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
} from "@/lib/validators";

const poppins = Poppins({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const NameInput = memo(({ value, onChange, error, inputId = "contact-name" }) => (
  <div>
    <input
      id={inputId}
      type="text"
      name="name"
      value={value}
      onChange={onChange}
      className={`w-full rounded-[10px] border border-white bg-transparent px-5 py-3 text-base text-white outline-none placeholder:text-white ${error ? "border-red-300" : "border-white"} focus:border-white`}
      placeholder="First Name"
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-xs text-red-200">{error}</p>}
  </div>
));

const EmailInput = memo(({ value, onChange, error, inputId = "contact-email" }) => (
  <div>
    <input
      id={inputId}
      type="email"
      name="email"
      value={value}
      onChange={onChange}
      className={`w-full rounded-[10px] border border-white bg-transparent px-5 py-3 text-base text-white outline-none placeholder:text-white ${error ? "border-red-300" : "border-white"} focus:border-white`}
      placeholder="your@email.com"
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-xs text-red-200">{error}</p>}
  </div>
));

const PhoneInput = memo(({ value, onChange, error, inputId = "contact-phone" }) => (
  <div>
    <input
      id={inputId}
      type="tel"
      name="phone"
      value={value}
      onChange={onChange}
      className={`w-full rounded-[10px] border border-white bg-transparent px-5 py-3 text-base text-white outline-none placeholder:text-white ${error ? "border-red-300" : "border-white"} focus:border-white`}
      placeholder="(123)-456-7890"
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-xs text-red-200">{error}</p>}
  </div>
));

const MessageInput = memo(({ value, onChange, error, inputId = "contact-message" }) => (
  <div>
    <textarea
      id={inputId}
      name="message"
      value={value}
      onChange={onChange}
      rows={4}
      className={`min-h-[100px] w-full rounded-[10px] border border-white bg-transparent px-5 py-3 text-base text-white outline-none placeholder:text-white ${error ? "border-red-300" : "border-white"} focus:border-white`}
      placeholder="Message"
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-xs text-red-200">{error}</p>}
  </div>
));

export default function Contact10({ content, embedded = false }) {
  const formHead = content?.form_head ?? {};
  const title =
    formHead.title ?? "GET IN TOUCH WITH US";
  const fieldId = (suffix) =>
    embedded ? `t10-contact-${suffix}` : `contact-${suffix}`;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
      const nameParts = formData.name.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName =
        nameParts.slice(1).join(" ").trim() || firstName || "";
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email: formData.email,
        phone: formData.phone.replace(/[-()\s]/g, ""),
        zipcode: "",
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
    setFormData({ name: "", email: "", phone: "", message: "" });
    setErrors({});
  };

  const formCard = (
    <div
      id={embedded ? "quote-form-section-t10" : "quote-form-section"}
      className={`flex h-[565px] w-full max-w-[439px] flex-col gap-[16.33px] overflow-y-auto rounded-[10px] bg-[#e70a0d] p-[25.12px] text-white shadow-lg ${poppins.className}`}
    >
      {formSubmitted ? (
        <div className="flex h-full min-h-0 flex-col items-center justify-center gap-[16.33px] text-center">
          <div className="mb-2 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h4 className="text-3xl font-bold text-white">Thank You!</h4>
          <p className="max-w-[320px] text-lg text-white">
            Your request has been submitted successfully. We&apos;ll contact you
            shortly with your personalized quote.
          </p>
          <button
            type="button"
            onClick={closeThankYou}
            className="mt-2 rounded-[10px] bg-white px-6 py-3 font-medium text-[#e70a0d] transition-colors duration-200 hover:bg-gray-100"
          >
            OK Thanks
          </button>
        </div>
      ) : (
        <>
          <h2
            className={`text-center text-[31.4px] font-bold leading-[56.52px] tracking-normal text-white ${poppins.className}`}
          >
            {title}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex min-h-0 flex-1 flex-col gap-[16.33px]"
            noValidate
          >
            <NameInput
              inputId={fieldId("name")}
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <PhoneInput
              inputId={fieldId("phone")}
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
            <EmailInput
              inputId={fieldId("email")}
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <MessageInput
              inputId={fieldId("message")}
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${poppins.className} mt-auto flex h-[55px] w-full shrink-0 items-center justify-center gap-[23.86px] rounded-[5px] bg-white text-center text-[25px] font-normal uppercase tracking-normal text-black transition-opacity duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#e70a0d] disabled:opacity-70`}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader
                    className="h-5 w-5 shrink-0 animate-spin text-black"
                    aria-hidden
                  />
                  <span>Processing...</span>
                </>
              ) : (
                "SUBMIT"
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );

  if (embedded) {
    return formCard;
  }

  return (
    <FullContainer id="contact-us" className="relative mt-9 pb-4">
      <Container className="relative z-10">
        <div className="mb-5 flex justify-center">{formCard}</div>
      </Container>
    </FullContainer>
  );
}
