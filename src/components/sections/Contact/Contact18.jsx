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
      className={`w-full rounded-[4px] border bg-white px-3 py-2.5 text-[18px] text-[#1f1f1f] outline-none placeholder:text-[#000000] ${error ? "border-red-400" : "border-[#7e7e7e]"} focus:border-[#5f5f5f]`}
      placeholder="Your Full Name"
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
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
      className={`w-full rounded-[4px] border bg-white px-3 py-2.5 text-[18px] text-[#1f1f1f] outline-none placeholder:text-[#000000] ${error ? "border-red-400" : "border-[#7e7e7e]"} focus:border-[#5f5f5f]`}
      placeholder="Your Email ( abc@gmail.com)"
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
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
      className={`w-full rounded-[4px] border bg-white px-3 py-2.5 text-[18px] text-[#1f1f1f] outline-none placeholder:text-[#000000] ${error ? "border-red-400" : "border-[#7e7e7e]"} focus:border-[#5f5f5f]`}
      placeholder="(123)-456-7890"
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
));

const ZipInput = memo(({ value, onChange, error, inputId = "contact-zipcode" }) => (
  <div>
    <input
      id={inputId}
      type="text"
      name="zipcode"
      value={value}
      onChange={onChange}
      className={`w-full rounded-[4px] border bg-white px-3 py-2.5 text-[18px] text-[#1f1f1f] outline-none placeholder:text-[#000000] ${error ? "border-red-400" : "border-[#7e7e7e]"} focus:border-[#5f5f5f]`}
      placeholder="ZIP CODE"
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
));

const MessageInput = memo(({ value, onChange, error, inputId = "contact-message" }) => (
  <div>
    <textarea
      id={inputId}
      name="message"
      value={value}
      onChange={onChange}
      rows={5}
      className={`min-h-[125px] w-full rounded-[4px] border bg-white px-3 py-2.5 text-[18px] text-[#1f1f1f] outline-none placeholder:text-[#000000] ${error ? "border-red-400" : "border-[#7e7e7e]"} focus:border-[#5f5f5f]`}
      placeholder="Message"
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
));

export default function Contact18({ content, embedded = false }) {
  const formHead = content?.form_head ?? {};
  const title =
    formHead.title ?? "Send a message - we'll answer!";
  const subtitle =
    formHead.sub_title ??
    "Tell us your chimney problems, ask any chimney or fireplace question - we'll make it our priority!";
  const submitLabel =
    formHead.button_text ??
    formHead.submit_text ??
    formHead.cta_button ??
    "SUBMIT";
  const fieldId = (suffix) =>
    embedded ? `t10-contact-${suffix}` : `contact-${suffix}`;

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
        zipcode: formData.zipcode?.trim() || "",
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
    setFormData({ name: "", email: "", phone: "", zipcode: "", message: "" });
    setErrors({});
  };

  const formCard = (
    <div
      id={embedded ? "quote-form-section-t10" : "quote-form-section"}
      className={`w-full max-w-[980px] rounded-[10px] bg-transparent p-0 border text-[#121212] ${poppins.className}`}
    >
      {formSubmitted ? (
        <div className="flex min-h-[340px] flex-col items-center justify-center gap-4 rounded-[10px] bg-white text-center">
          <div className="mb-2 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h4 className="text-3xl font-bold text-black">Thank You!</h4>
          <p className="max-w-[500px] text-lg text-black/80">
            Your request has been submitted successfully. We&apos;ll contact you
            shortly with your personalized quote.
          </p>
          <button
            type="button"
            onClick={closeThankYou}
            className="mt-2 rounded-[10px] bg-[#FF0011] px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-red-400"
          >
            OK Thanks
          </button>
        </div>
      ) : (
        <>
          <h2
            className={`text-center text-[40px] font-bold not-italic leading-normal text-white ${poppins.className}`}
          >
            {title}
          </h2>
          <p className="mt-2 text-center text-[18px] text-white/90">
            {subtitle}
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-5 flex min-h-0 flex-1 flex-col gap-3"
            noValidate
          >
            <div className="grid grid-cols-1 gap-2.5  md:grid-cols-2">
              <NameInput
                inputId={fieldId("name")}
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />
              <EmailInput
                inputId={fieldId("email")}
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <PhoneInput
                inputId={fieldId("phone")}
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}for
              />
              <ZipInput
                inputId={fieldId("zipcode")}
                value={formData.zipcode}
                onChange={handleChange}
                error={errors.zipcode}
              />
            </div>
            <MessageInput
              inputId={fieldId("message")}
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${poppins.className} mt-3 inline-flex min-h-[52px] min-w-[200px] items-center justify-center self-center rounded-lg bg-white px-8 py-3 text-lg font-bold uppercase tracking-wide text-black transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#FF0011] focus:ring-offset-2 disabled:opacity-70`}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <Loader
                    className="h-5 w-5 shrink-0 animate-spin text-black"
                    aria-hidden
                  />
                  Processing...
                </span>
              ) : (
                submitLabel
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
    <FullContainer id="contact-us" className="relative bg-black py-10 md:py-12">
      <Container className="relative z-10">
        <div className="mb-5 flex justify-center">{formCard}</div>
      </Container>
    </FullContainer>
  );
}
