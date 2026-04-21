"use client";

import React, { useState, useCallback, memo } from "react";
import { CheckCircle, Loader } from "lucide-react";
import toast from "react-hot-toast";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
} from "@/lib/validators";

const labelClass = "mb-1.5 block text-[16px] lg:text-[22px] font-medium text-white";

const FirstNameInput = memo(({ id, value, onChange, error }) => (
  <div>
    <label htmlFor={id} className={labelClass} >
      Name <span className="text-orange-200">*</span>
    </label>
    <input
      id={id}
      type="text"
      name="firstName"
      value={value}
      onChange={onChange}
      className={`w-full rounded-lg border border-neutral-300 bg-white px-3 py-[7px] text-lg text-neutral-900 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-[#F39C12]/60 ${error ? "ring-2 ring-red-500" : ""}`}
      placeholder="First name"
      required
      aria-invalid={!!error}
      autoComplete="given-name"
    />
    {error ? <p className="mt-1 text-xs text-orange-200">{error}</p> : null}
  </div>
));

const LastNameInput = memo(({ id, value, onChange, error }) => (
  <div>
    <label htmlFor={id} className={labelClass}>
      Name <span className="text-orange-200">*</span>
    </label>
    <input
      id={id}
      type="text"
      name="lastName"
      value={value}
      onChange={onChange}
      className={`w-full rounded-lg border border-neutral-300 bg-white px-3 py-[7px] text-lg text-neutral-900 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-[#F39C12]/60 ${error ? "ring-2 ring-red-500" : ""}`}
      placeholder="Last name"
      required
      aria-invalid={!!error}
      autoComplete="family-name"
    />
    {error ? <p className="mt-1 text-xs text-orange-200">{error}</p> : null}
  </div>
));

const EmailInput = memo(({ id, value, onChange, error }) => (
  <div>
    <label htmlFor={id} className={labelClass}>
      Email Address <span className="text-orange-200">*</span>
    </label>
    <input
      id={id}
      type="email"
      name="email"
      value={value}
      onChange={onChange}
      className={`w-full rounded-lg border border-neutral-300 bg-white px-3 py-[7px] text-lg text-neutral-900 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-[#F39C12]/60 ${error ? "ring-2 ring-red-500" : ""}`}
      placeholder="Email"
      required
      aria-invalid={!!error}
      autoComplete="email"
    />
    {error ? <p className="mt-1 text-xs text-orange-200">{error}</p> : null}
  </div>
));

const PhoneInput = memo(({ id, value, onChange, error }) => (
  <div>
    <label htmlFor={id} className={labelClass}>
      Phone Number
    </label>
    <input
      id={id}
      type="tel"
      name="phone"
      value={value}
      onChange={onChange}
      className={`w-full rounded-lg border border-neutral-300 bg-white px-3 py-[7px] text-lg text-neutral-900 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-[#F39C12]/60 ${error ? "ring-2 ring-red-500" : ""}`}
      placeholder="Phone"
      aria-invalid={!!error}
      autoComplete="tel"
    />
    {error ? <p className="mt-1 text-xs text-orange-200">{error}</p> : null}
  </div>
));

const MessageInput = memo(({ id, value, onChange, error }) => (
  <div>
    <label htmlFor={id} className={labelClass}>
      How can we help you?
    </label>
    <textarea
      id={id}
      name="message"
      value={value}
      onChange={onChange}
      rows={5}
      className={`min-h-[70px] max-h-[90px] w-full resize-y rounded-lg border border-neutral-300 bg-white px-3 py-[7px] text-lg text-neutral-900 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-[#F39C12]/60 ${error ? "ring-2 ring-red-500" : ""}`}
      placeholder="Message"
      required
      aria-invalid={!!error}
    />
    {error ? <p className="mt-1 text-xs text-orange-200">{error}</p> : null}
  </div>
));

const DEFAULT_TITLE = "Have Questions Or Need Fireplace Service?";
const DEFAULT_SUBTITLE =
  "Fill Out The Form Below And Our Experts Will Get Back To You Quickly With The Best Solution For Your Needs.";

export default function Contact14({ content, embedded = false }) {
  const formHead = content?.form_head ?? {};
  const title =
    typeof formHead.title === "string" && formHead.title.trim()
      ? formHead.title.trim()
      : DEFAULT_TITLE;
  const subTitle =
    typeof formHead.sub_title === "string" && formHead.sub_title.trim()
      ? formHead.sub_title.trim()
      : DEFAULT_SUBTITLE;

  const id = (suffix) => (embedded ? `faq-contact-${suffix}` : `contact-${suffix}`);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
        window.dataLayer.push({ event: "form start", url: window.location.href });
        setFormStarted(true);
      } catch {
        setFormStarted(true);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    else if (!validateName(formData.firstName)) {
      newErrors.firstName = "Use 2–50 letters only";
    }
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    else if (!validateName(formData.lastName)) {
      newErrors.lastName = "Use 2–50 letters only";
    }
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email)) newErrors.email = "Enter a valid email";
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!validatePhone(cleanPhone)) newErrors.phone = "Enter a valid 10-digit US phone";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (!validateMessage(formData.message, 10)) {
      newErrors.message = "Message must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleFirstInteraction();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.replace(/\D/g, ""),
        zipcode: "",
        message: formData.message.trim(),
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
            const low = err.toLowerCase();
            if (low.includes("first name")) serverErrors.firstName = err;
            else if (low.includes("last name")) serverErrors.lastName = err;
            else if (low.includes("email")) serverErrors.email = err;
            else if (low.includes("phone")) serverErrors.phone = err;
            else if (low.includes("message")) serverErrors.message = err;
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
          formData: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          },
        });
      }
      toast.success(
        result.message || "Your request has been submitted successfully! We'll contact you shortly.",
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
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const closeThankYou = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: "leadSubmitted", url: window.location.href });
    }
    setFormSubmitted(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
    setErrors({});
  };

  const card = (
    <div className="overflow-hidden rounded-lg bg-transparent ">
      <div className="rounded-t-lg bg-[#F39C12] p-5 mb-0.5">
        {formSubmitted ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
              <CheckCircle className="h-9 w-9 text-green-600" aria-hidden />
            </div>
            <h4 className="font-montserrat text-xl font-bold text-neutral-900 md:text-2xl">Thank you!</h4>
            <p className="mt-2 max-w-md text-sm text-neutral-900/90">
              Your request has been submitted. We&apos;ll get back to you shortly.
            </p>
            <button
              type="button"
              onClick={closeThankYou}
              className="mt-6 rounded-lg bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              OK, thanks
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-montserrat text-lg font-bold leading-snug text-neutral-900 md:text-[25px">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-900/90 md:text-[16px]">{subTitle}</p>
          </>
        )}
      </div>
      <div className="bg-black rounded-b-lg ">

        {!formSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 px-5 pb-4 pt-2 md:px-6 md:pb-5" noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FirstNameInput
                id={id("first-name")}
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
              <LastNameInput
                id={id("last-name")}
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
            </div>
            <EmailInput
              id={id("email")}
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <PhoneInput
              id={id("phone")}
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
            <MessageInput
              id={id("message")}
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-[#F39C12] py-3  font-montserrat text-lg lg:text-2xl font-extrabold uppercase tracking-wide text-neutral-900 transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 disabled:opacity-70"
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <Loader className="h-5 w-5 animate-spin" aria-hidden />
                  Processing…
                </span>
              ) : (
                "SUBMIT"
              )}
            </button>
          </form>
        ) : null}
      </div>

    </div>
  );

  if (embedded) {
    return card;
  }

  return (
    <FullContainer id="contact-us" className="relative mt-9 pb-4">
      <Container className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div id="quote-form-section">{card}</div>
      </Container>
    </FullContainer>
  );
}
