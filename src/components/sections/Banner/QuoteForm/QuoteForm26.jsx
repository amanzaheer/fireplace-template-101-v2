"use client";

import { useState } from "react";
import { CheckCircle, Loader } from "lucide-react";
import toast from "react-hot-toast";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
} from "@/lib/validators";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const FORM_RED = "#D32F2F";

export default function QuoteForm26({
  form_head,
  labels: labelsProp = {},
  phone = "",
}) {
  const labels = labelsProp ?? {};
  const errorLabels = labels.errors ?? {};
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    firstName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formStarted, setFormStarted] = useState(false);

  const phoneDisplay = typeof phone === "string" ? phone.trim() : "";
  const phoneLink = phoneDisplay
    ? `tel:${phoneDisplay.replace(/[^\d+]/g, "")}`
    : "#";

  const headerTitle = (form_head?.title || labels.default_title || "").toUpperCase();
  const placeholderName =
    labels.placeholder_name ?? labels.placeholder_first_name ?? "";
  const placeholderPhone = labels.placeholder_phone ?? "";
  const placeholderEmail = labels.placeholder_email ?? "";
  const placeholderMessage = labels.placeholder_message ?? "";
  const submitLabel = labels.submit_button ?? "";
  const processingLabel =
    labels.processing_label ?? labels.submitting_label ?? "";
  const thankYouTitle = labels.thank_you_title ?? "";
  const thankYouMessage = labels.thank_you_message ?? "";
  const thankYouButton = labels.thank_you_button ?? "";

  const inputClass = (hasError) =>
    cn(
      "w-full rounded-md border bg-white px-4 py-3 text-[15px] text-black outline-none placeholder:text-gray-400",
      hasError ? "border-red-500" : "border-[#d0d0d0]",
    );

  const handleFirstInteraction = () => {
    if (!formStarted) {
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "form start",
          url: window.location.href,
        });
      }
      setFormStarted(true);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = errorLabels.name_required ?? "";
    } else if (!validateName(formData.firstName)) {
      newErrors.firstName = errorLabels.name_invalid ?? "";
    }

    if (!formData.email.trim()) {
      newErrors.email = errorLabels.email_required ?? "";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = errorLabels.email_invalid ?? "";
    }

    const cleanPhone = formData.phone.replace(/[-()\s]/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = errorLabels.phone_required ?? "";
    } else if (!validatePhone(cleanPhone)) {
      newErrors.phone = errorLabels.phone_invalid ?? "";
    }

    if (!formData.message.trim()) {
      newErrors.message = errorLabels.message_required ?? "";
    } else if (!validateMessage(formData.message, 10)) {
      newErrors.message = errorLabels.message_invalid ?? "";
    }

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fireGTMEvent = (submittedFormData) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      const parts = submittedFormData.firstName.trim().split(/\s+/);
      window.dataLayer.push({
        event: "form_submit",
        url: window.location.href,
        formData: {
          firstName: parts[0] || "",
          lastName: parts.slice(1).join(" ").trim() || "",
          email: submittedFormData.email,
          phone: submittedFormData.phone.replace(/[-()\s]/g, ""),
          message: submittedFormData.message,
        },
      });
    }
  };

  const closeThankYouPopup = () => {
    setFormSubmitted(false);
    setFormData({ firstName: "", email: "", phone: "", message: "" });
    setFieldErrors({ firstName: "", email: "", phone: "", message: "" });
    setFormStarted(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digits = value.replace(/\D/g, "");
      if (digits.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: digits }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const nameParts = formData.firstName.trim().split(/\s+/);
      const payload = {
        first_name: nameParts[0] || "",
        last_name: nameParts.slice(1).join(" ") || "",
        email: formData.email,
        phone: formData.phone.replace(/[-()\s]/g, ""),
        message: formData.message,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Form submission failed");
      }

      fireGTMEvent(formData);
      toast.success(result.message || labels.toast_success || "");
      setFormSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error(err.message || labels.toast_error || "");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[400px] overflow-hidden rounded-[16px] bg-[#E8E8E8] shadow-[0_8px_32px_rgba(0,0,0,0.12)] sm:rounded-[20px]",
        formSubmitted && "flex min-h-[520px] flex-col",
        poppins.className,
      )}
    >
      {formSubmitted ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          {thankYouTitle ? (
            <h3 className="mb-2 text-xl font-bold text-gray-800">{thankYouTitle}</h3>
          ) : null}
          {thankYouMessage ? (
            <p className="mb-6 max-w-md text-gray-600">{thankYouMessage}</p>
          ) : null}
          {thankYouButton ? (
            <button
              type="button"
              onClick={closeThankYouPopup}
              className="rounded-lg bg-black px-6 py-2 font-semibold text-white"
            >
              {thankYouButton}
            </button>
          ) : null}
        </div>
      ) : (
        <>
          <div
            className="px-5 py-5 text-center text-white"
            style={{ backgroundColor: FORM_RED }}
          >
            <p className="text-sm font-semibold uppercase tracking-wide">
              {headerTitle}
            </p>
            {phoneDisplay ? (
              <a
                href={phoneLink}
                className="mt-1 block text-[28px] font-extrabold leading-tight hover:opacity-90 sm:text-[32px]"
              >
                {phoneDisplay}
              </a>
            ) : null}
            {form_head?.sub_title ? (
              <p className="mt-2 text-sm font-medium text-white/90">
                {form_head.sub_title}
              </p>
            ) : null}
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-3 px-4 py-4"
            noValidate
          >
            <div>
              <label htmlFor="banner26-name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                id="banner26-name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onFocus={handleFirstInteraction}
                className={inputClass(!!fieldErrors.firstName)}
                placeholder={placeholderName}
                required
                aria-invalid={!!fieldErrors.firstName}
              />
              {fieldErrors.firstName ? (
                <p className="mt-1 text-sm text-red-600">
                  {fieldErrors.firstName}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="banner26-phone" className="sr-only">
                Phone
              </label>
              <input
                type="tel"
                id="banner26-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={handleFirstInteraction}
                className={inputClass(!!fieldErrors.phone)}
                placeholder={placeholderPhone}
                required
                aria-invalid={!!fieldErrors.phone}
              />
              {fieldErrors.phone ? (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.phone}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="banner26-email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="banner26-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={handleFirstInteraction}
                className={inputClass(!!fieldErrors.email)}
                placeholder={placeholderEmail}
                required
                aria-invalid={!!fieldErrors.email}
              />
              {fieldErrors.email ? (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="banner26-message" className="sr-only">
                Message
              </label>
              <textarea
                id="banner26-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={handleFirstInteraction}
                rows={4}
                className={cn(inputClass(!!fieldErrors.message), "resize-none")}
                placeholder={placeholderMessage}
                required
                aria-invalid={!!fieldErrors.message}
              />
              {fieldErrors.message ? (
                <p className="mt-1 text-sm text-red-600">
                  {fieldErrors.message}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center rounded-b-[16px] bg-black py-4 text-lg font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader className="h-5 w-5 animate-spin" aria-hidden />
                  {processingLabel}
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
}
