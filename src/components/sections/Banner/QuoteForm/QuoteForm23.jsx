"use client";

import { useState } from "react";
import { CheckCircle, Loader, Phone } from "lucide-react";
import toast from "react-hot-toast";
import { Poppins } from "next/font/google";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
} from "@/lib/validators";
import { cn } from "@/lib/utils";

const quoteFormPoppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function QuoteForm23({
  data: _data,
  form_head,
  phone = "",
  showArrowInButton: _showArrowInButton = false,
  fontClassName: _fontClassName = "",
}) {
  const inputTypography =
    "text-left font-inherit text-[16px] font-normal leading-normal text-[#2c2c2c] outline-none placeholder:text-left placeholder:font-inherit placeholder:text-[18.35px] placeholder:font-normal placeholder:text-[#8d8d8d]";
  const quoteFieldFrame =
    "box-border flex w-full shrink-0 gap-3 rounded-none border border-transparent bg-[#efefef] px-4 shadow-none focus:border-[#5b2d79] focus:outline-none focus:ring-0 focus-visible:border-[#5b2d79]";

  const inputFieldClass = cn(
    quoteFieldFrame,
    "h-[44px] min-h-[44px] items-center py-2",
    inputTypography,
  );

  const textareaFieldClass = cn(
    quoteFieldFrame,
    "h-[104.6px] min-h-[104.6px] resize-none items-start py-3 leading-normal",
    inputTypography,
  );

  const inputError = "!border-red-500";

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
      newErrors.firstName = "Name is required";
    } else if (!validateName(formData.firstName)) {
      newErrors.firstName =
        "Name must be 2-50 characters and contain only letters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const cleanPhone = formData.phone.replace(/[-()\s]/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(cleanPhone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (!validateMessage(formData.message, 10)) {
      newErrors.message = "Message must be at least 10 characters long";
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
          lastName: parts.slice(1).join(" ").trim() || parts[0] || "",
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
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
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
      toast.success(
        result.message ||
        "Your request has been submitted successfully!",
      );
      setFormSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = (form_head?.title || "GET IN TOUCH WITH US").toUpperCase();

  return (
    <div
      id="banner-quote-form"
      className={`relative flex min-h-[454px] w-full max-w-[399px] min-w-0 flex-col overflow-hidden rounded-[26px] border border-[#d8d8d8] bg-[#CC3333] p-0 shadow-[0_10px_30px_rgba(0,0,0,0.32)] ${quoteFormPoppins.className}`}
    >
      {formSubmitted ? (
        <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-white">Thank You!</h3>
          <p className="mb-6 max-w-md text-white/95">
            Your request has been submitted successfully. We&apos;ll contact
            you shortly with your personalized quote.
          </p>
          <button
            type="button"
            onClick={closeThankYouPopup}
            className="rounded-lg bg-[#EFCD09] px-6 py-2 text-[18px] font-bold text-black"
          >
            OK Thanks
          </button>
        </div>
      ) : (
        <>
          <header className="flex w-full shrink-0 flex-col items-center gap-2 px-4 pb-2 pt-4 text-center">
            {phoneDisplay ? (
              <>
                <div className="inline-flex items-center gap-2 rounded text-[15.24px] font-bold bg-[#CC3333] px-3 py-1.5">
                  <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="27.6312" height="26.6784" fill="#EFCD09" />
                    <path d="M15.7983 7.78615L15.1927 7.62238L14.8646 8.83346L15.4707 8.99786C16.0002 9.14117 16.4828 9.42077 16.8704 9.80877C17.2581 10.1968 17.5373 10.6796 17.6802 11.2092L17.8433 11.8147L19.055 11.4878L18.8919 10.8823C18.6919 10.1408 18.301 9.46471 17.7582 8.92146C17.2153 8.3782 16.5396 7.98675 15.7983 7.78615ZM15.2247 9.90586L14.6192 9.74208L14.291 10.9532L14.8972 11.1176C15.056 11.1606 15.2007 11.2444 15.317 11.3608C15.4332 11.4772 15.517 11.622 15.5598 11.7808L15.723 12.3864L16.9347 12.0601L16.7715 11.4539C16.6715 11.0832 16.4761 10.7451 16.2047 10.4735C15.9333 10.2019 15.5954 10.0062 15.2247 9.90586Z" fill="black" />
                    <path d="M11.3414 9.52798H6.66994V10.0271C6.66636 11.9484 7.27081 13.8294 8.41002 15.4421C9.24959 16.6314 10.3544 17.6441 11.6517 18.4137C13.4111 19.458 15.4631 20.012 17.5591 20.0088H18.1035V15.7266L14.4611 14.9845L13.4484 15.9128C12.5217 15.367 11.7341 14.6447 11.1388 13.7952L12.151 12.8669L11.3414 9.52798Z" fill="black" />
                  </svg>

                  <span className="text-xs font-regular  uppercase tracking-wide text-[15.24px] text-white">
                    <span
                      className={`text-[15.24px] font-normal leading-[100%] tracking-[0%] uppercase text-white ${quoteFormPoppins.className}`}
                    >
                      Contact
                    </span>
                  </span>
                </div>
                <a
                  href={phoneLink}
                  className="text-[26px] font-bold leading-none text-white transition-opacity hover:opacity-90 sm:text-[28px]"
                >
                  {phoneDisplay}
                </a>
              </>
            ) : null}

            <h3 className="w-full text-balance pt-1 font-inherit text-[22px] font-bold leading-tight tracking-tight text-white sm:text-[26px]">
              {title}
            </h3>
          </header>

          <form
            onSubmit={handleSubmit}
            className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-2 font-inherit"
            noValidate
          >
            <div>
              <label htmlFor="firstName" className="sr-only">
                Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onFocus={handleFirstInteraction}
                className={cn(inputFieldClass, fieldErrors.firstName && inputError)}
                placeholder="Name"
                required
                aria-invalid={!!fieldErrors.firstName}
              />
              {fieldErrors.firstName ? (
                <p className="mt-1 text-sm text-red-200">{fieldErrors.firstName}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="phone" className="sr-only">
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={handleFirstInteraction}
                className={cn(inputFieldClass, fieldErrors.phone && inputError)}
                placeholder="Phone"
                required
                aria-invalid={!!fieldErrors.phone}
              />
              {fieldErrors.phone ? (
                <p className="mt-1 text-sm text-red-200">{fieldErrors.phone}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={handleFirstInteraction}
                className={cn(inputFieldClass, fieldErrors.email && inputError)}
                placeholder="Email"
                required
                aria-invalid={!!fieldErrors.email}
              />
              {fieldErrors.email ? (
                <p className="mt-1 text-sm text-red-200">{fieldErrors.email}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={handleFirstInteraction}
                className={cn(textareaFieldClass, fieldErrors.message && inputError)}
                placeholder="Message"
                required
                aria-invalid={!!fieldErrors.message}
              />
              {fieldErrors.message ? (
                <p className="mt-1 text-sm text-red-200">{fieldErrors.message}</p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 flex w-full shrink-0 items-center justify-center rounded-none bg-[#EFCD09] px-3 py-2 font-inherit text-[28px] font-normal uppercase not-italic text-white transition-opacity hover:opacity-95 disabled:opacity-70 sm:text-[32px]"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center justify-center gap-2 font-inherit font-normal uppercase">
                  <Loader className="h-5 w-5 shrink-0 animate-spin" aria-hidden />
                  Sending…
                </span>
              ) : (
                "SUBMIT"
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
