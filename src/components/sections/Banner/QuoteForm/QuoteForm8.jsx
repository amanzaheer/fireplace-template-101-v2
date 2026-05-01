"use client";

import { useState } from "react";
import { CheckCircle, Loader, FileText, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
} from "@/lib/validators";
import {Poppins, Inter } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function isFieldEmpty(value) {
  return !String(value ?? "").trim();
}

/** Top-left hint; hides when user types. Input is transparent on top so caret stays visible. */
function TopLeftPlaceholderInput({
  id,
  name,
  value,
  onChange,
  onFocus,
  placeholder,
  compact,
  hasError,
  inputClassName,
  type = "text",
  ...rest
}) {
  const hintClass = compact
    ? "left-2 top-0.5 text-[8px] text-gray-400"
    : "left-2 top-1.5 text-[8px] text-gray-400";
  return (
    <div
      className={`relative bg-white border ${
        hasError ? "border-red-500" : "border-[#bdbdbd]"
      }`}
    >
      {isFieldEmpty(value) && (
        <span
          className={`pointer-events-none absolute z-0 select-none ${hintClass}`}
          aria-hidden
        >
          {placeholder}
        </span>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder=""
        className={`relative z-10 md:max-h-[24px] w-full border-0 bg-transparent outline-none ring-0 focus:ring-0 ${inputClassName}`}
        {...rest}
      />
    </div>
  );
}

function TopLeftPlaceholderTextarea({
  id,
  name,
  value,
  onChange,
  onFocus,
  placeholder,
  compact,
  hasError,
  rows,
  className,
  ...rest
}) {
  const hintClass = compact
    ? "left-2 top-1 text-[8px] text-gray-400"
    : "left-2 top-1.5 text-[8px] text-gray-400";
  return (
    <div
      className={`relative bg-white border ${
        hasError ? "border-red-500" : "border-[#bdbdbd]"
      }`}
    >
      {isFieldEmpty(value) && (
        <span
          className={`pointer-events-none absolute z-0 select-none ${hintClass}`}
          aria-hidden
        >
          {placeholder}
        </span>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        rows={rows}
        placeholder=""
        className={`relative z-10 w-full border-0 bg-transparent outline-none ring-0 focus:ring-0 ${className}`}
        {...rest}
      />
    </div>
  );
}

export default function QuoteForm8({
  data,
  form_head,
  showArrowInButton = false,
  compact = false,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formStarted, setFormStarted] = useState(false);

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
      newErrors.firstName = "First name is required";
    } else if (!validateName(formData.firstName)) {
      newErrors.firstName =
        "First name must be 2-50 characters and contain only letters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!validateName(formData.lastName)) {
      newErrors.lastName =
        "Last name must be 2-50 characters and contain only letters";
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
      window.dataLayer.push({
        event: "form_submit",
        url: window.location.href,
        formData: {
          firstName: submittedFormData.firstName,
          lastName: submittedFormData.lastName,
          email: submittedFormData.email,
          phone: submittedFormData.phone.replace(/[-()\s]/g, ""),
          message: submittedFormData.message,
        },
      });
    }
  };

  const fireLeadSubmittedEvent = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "leadSubmitted",
        url: window.location.href,
      });
    }
  };

  const closeThankYouPopup = () => {
    fireLeadSubmittedEvent();
    setFormSubmitted(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
    setFieldErrors({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "phone") {
      const digits = value.replace(/\D/g, "");
      if (digits.length <= 3) {
        formattedValue = digits;
      } else if (digits.length <= 6) {
        formattedValue = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      } else {
        formattedValue = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));

    if (fieldErrors[name]) {
      const newErrors = { ...fieldErrors };
      switch (name) {
        case "firstName":
        case "lastName":
          if (formattedValue.trim() && validateName(formattedValue)) {
            delete newErrors[name];
          }
          break;
        case "email":
          if (formattedValue.trim() && validateEmail(formattedValue)) {
            delete newErrors.email;
          }
          break;
        case "phone":
          const cleanPhone = formattedValue.replace(/[-()\s]/g, "");
          if (cleanPhone && validatePhone(cleanPhone)) {
            delete newErrors.phone;
          }
          break;
        case "message":
          if (formattedValue.trim() && validateMessage(formattedValue, 10)) {
            delete newErrors.message;
          }
          break;
      }
      setFieldErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      if (result.success === false) {
        if (result.errors && Array.isArray(result.errors)) {
          const serverErrors = {};
          result.errors.forEach((error) => {
            if (error.includes("First name")) serverErrors.firstName = error;
            else if (error.includes("Last name")) serverErrors.lastName = error;
            else if (error.includes("Email") || error.includes("email")) serverErrors.email = error;
            else if (error.includes("Phone") || error.includes("phone")) serverErrors.phone = error;
            else if (error.includes("Message") || error.includes("message")) serverErrors.message = error;
          });
          setFieldErrors((prev) => ({ ...prev, ...serverErrors }));
          throw new Error("Please fix the validation errors above");
        }
        throw new Error(result.message || "Form submission failed");
      }

      fireGTMEvent(formData);
      toast.success(
        result.message ||
          "Your request has been submitted successfully! We'll contact you shortly."
      );
      setFormSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`relative h-fit font-barlow ${
        compact
          ? "rounded-none bg-transparent shadow-none"
          : "rounded-[15px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.4)]"
      }`}
    >
      {!formSubmitted && (
        <>
        {!compact ? (
          <>
            <div className="bg-[#FF0504] px-2 py-1.5">
              <h3 className={`${poppins.className} text-xl md:text-2xl text-white leading-6 px-1.5 font-bold text-center mb-0.5`}>
                {form_head?.title}
              </h3>
            </div>
            <div>
              <h4 className={`${inter.className} text-sm md:text-base font-medium text-black pt-1 text-center text-ink`}>
                {form_head?.sub_title}
              </h4>
            </div>
          </>
        ) : null}
        </>
      )}

      {formSubmitted ? (
        <div className="flex flex-col items-center justify-center text-center py-6  px-4 md:px-7 ">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h3>
          <p className="text-gray-600 max-w-md mb-6">
            Your request has been submitted successfully. We&apos;ll contact you shortly with your personalized quote.
          </p>
          <button
            type="button"
            onClick={closeThankYouPopup}
            className="rounded-md bg-[#FF0504] px-6 py-2 font-medium text-white transition-colors duration-200 hover:bg-[#FF0504]"
          >
            OK Thanks
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={`${compact ? "space-y-1 text-black text-[11px] px-0 py-0" : "space-y-1.5 text-black text-sm md:text-base px-1.5 py-1.5"}`}>
          <div className="grid grid-cols-2 gap-[4px]">
            <div>
              <label htmlFor="firstName" className="sr-only">First name</label>
              {compact ? (
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onFocus={handleFirstInteraction}
                  placeholder="First Name"
                  className={`w-full rounded-md bg-gray-50 px-3 py-1.5 text-[11px] text-black outline-none ${fieldErrors.firstName ? "border-2 border-red-500" : "border border-[#bdbdbd]"}`}
                  required
                  aria-invalid={!!fieldErrors.firstName}
                />
              ) : (
                <TopLeftPlaceholderInput
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onFocus={handleFirstInteraction}
                  compact={false}
                  hasError={!!fieldErrors.firstName}
                  placeholder="First name"
                  inputClassName="pl-2 py-1.5"
                  required
                  aria-invalid={!!fieldErrors.firstName}
                />
              )}
              {fieldErrors.firstName && (
                <div className="text-red-500 text-sm font-medium mt-1">
                  {fieldErrors.firstName}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">Last name</label>
              {compact ? (
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onFocus={handleFirstInteraction}
                  placeholder="Last Name"
                  className={`w-full rounded-md bg-gray-50 px-3 py-1.5 text-[11px] text-black outline-none ${fieldErrors.lastName ? "border-2 border-red-500" : "border border-[#bdbdbd]"}`}
                  required
                  aria-invalid={!!fieldErrors.lastName}
                />
              ) : (
                <TopLeftPlaceholderInput
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onFocus={handleFirstInteraction}
                  compact={false}
                  hasError={!!fieldErrors.lastName}
                  placeholder="Last name"
                  inputClassName="pl-2 py-1.5"
                  required
                  aria-invalid={!!fieldErrors.lastName}
                />
              )}
              {fieldErrors.lastName && (
                <div className="text-red-500 text-sm font-medium mt-1">
                  {fieldErrors.lastName}
                </div>
              )}
            </div>
          </div>

          {compact ? (
            <div className="grid grid-cols-2 gap-[4px]">
              <div>
                <label htmlFor="phone" className="sr-only">Phone number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={handleFirstInteraction}
                  placeholder="Phone Number"
                  className={`w-full rounded-md bg-gray-50 px-3 py-1.5 text-[11px] text-black outline-none ${fieldErrors.phone ? "border-2 border-red-500" : "border border-[#bdbdbd]"}`}
                  required
                  aria-invalid={!!fieldErrors.phone}
                />
                {fieldErrors.phone && (
                  <div className="text-red-500 text-sm font-medium">{fieldErrors.phone}</div>
                )}
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleFirstInteraction}
                  placeholder="Email"
                  className={`w-full rounded-md bg-gray-50 px-3 py-1.5 text-[11px] text-black outline-none ${fieldErrors.email ? "border-2 border-red-500" : "border border-[#bdbdbd]"}`}
                  required
                  aria-invalid={!!fieldErrors.email}
                />
                {fieldErrors.email && (
                  <div className="text-red-500 text-sm font-medium">{fieldErrors.email}</div>
                )}
              </div>
            </div>
          ) : (
            <>
              <label htmlFor="phone" className="sr-only">Phone number</label>
              <TopLeftPlaceholderInput
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={handleFirstInteraction}
                compact={false}
                hasError={!!fieldErrors.phone}
                placeholder="(123) 456-7890"
                inputClassName="pl-2 py-1.5"
                required
                aria-invalid={!!fieldErrors.phone}
              />
              {fieldErrors.phone && (
                <div className="text-red-500 text-sm font-medium">{fieldErrors.phone}</div>
              )}

              <label htmlFor="email" className="sr-only">Email</label>
              <TopLeftPlaceholderInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={handleFirstInteraction}
                compact={false}
                hasError={!!fieldErrors.email}
                placeholder="your@email.com"
                inputClassName="pl-2 py-1.5"
                required
                aria-invalid={!!fieldErrors.email}
              />
              {fieldErrors.email && (
                <div className="text-red-500 text-sm font-medium">{fieldErrors.email}</div>
              )}
            </>
          )}

          <label htmlFor="message" className="sr-only">Message</label>
          {compact ? (
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={handleFirstInteraction}
              rows={2}
              placeholder="Message"
              className={`w-full resize-none rounded-md bg-gray-50 px-3 py-1.5 text-[11px] text-black outline-none max-h-[44px] ${fieldErrors.message ? "border-2 border-red-500" : "border border-[#bdbdbd]"}`}
              required
              aria-invalid={!!fieldErrors.message}
            />
          ) : (
            <TopLeftPlaceholderTextarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={handleFirstInteraction}
              rows={2}
              compact={false}
              hasError={!!fieldErrors.message}
              placeholder="Message"
              className="pl-2 py-1.5 max-h-[52px] resize-none"
              required
              aria-invalid={!!fieldErrors.message}
            />
          )}
          {fieldErrors.message && (
            <div className="text-red-500 text-sm font-medium">{fieldErrors.message}</div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-[114.50px] bg-[#FF0504] ${compact ? "text-sm  py-1 uppercase tracking-wide" : "text-base md:text-lg py-2"} flex cursor-pointer items-center justify-center gap-2 px-10 font-medium text-white transition-colors duration-200 hover:bg-[#FF0504] disabled:cursor-not-allowed disabled:opacity-70`}
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin mr-2 h-4 w-4" />
                Submitting...
              </>
            ) : (
              <div className={`${poppins.className} font-thin ${compact ? "text-xs" : "text-xs"}`}>
                Submit
                {showArrowInButton && (
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </div>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
