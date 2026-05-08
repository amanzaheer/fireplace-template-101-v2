"use client";

import { useState } from "react";
import { CheckCircle, Loader, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
} from "@/lib/validators";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function parseFullName(fullName) {
  const trimmed = fullName.trim();
  const parts = trimmed.split(/\s+/).filter(Boolean);
  const firstName = parts[0] || "";
  const lastName = parts.length > 1 ? parts.slice(1).join(" ") : "";
  return { firstName, lastName };
}

const cardShellClass =
  "w-[320px] h-[370px] rounded-[14.8px] p-[16.44px] flex flex-col min-h-0 " +
  "bg-gradient-to-br from-white/95 via-white/90 to-sky-100/88 " +
  "shadow-[0_8px_28px_rgba(0,0,0,0.18)] border border-white/40";

const fieldClass =
  "w-full shrink-0 rounded-xl border border-black bg-white px-3 py-2 text-sm text-black " +
  "outline-none placeholder:text-black";

const fieldErrorClass = (hasError) =>
  `${fieldClass} ${hasError ? "border-red-500" : ""}`;

export default function QuoteForm7({
  data,
  form_head,
  showArrowInButton = false,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    fullName: "",
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
    const { firstName, lastName } = parseFullName(formData.fullName);
    const nameParts = formData.fullName.trim().split(/\s+/).filter(Boolean);

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (nameParts.length < 2) {
      newErrors.fullName = "Please enter first and last name";
    } else if (!validateName(firstName) || !validateName(lastName)) {
      newErrors.fullName =
        "Use 2–50 letters per name (e.g. Jane Smith)";
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
    const { firstName, lastName } = parseFullName(submittedFormData.fullName);
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "form_submit",
        url: window.location.href,
        formData: {
          firstName,
          lastName,
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
      fullName: "",
      email: "",
      phone: "",
      message: "",
    });
    setFieldErrors({
      fullName: "",
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
        case "fullName": {
          const { firstName, lastName } = parseFullName(formattedValue);
          const parts = formattedValue.trim().split(/\s+/).filter(Boolean);
          if (
            parts.length >= 2 &&
            validateName(firstName) &&
            validateName(lastName)
          ) {
            delete newErrors.fullName;
          }
          break;
        }
        case "email":
          if (formattedValue.trim() && validateEmail(formattedValue)) {
            delete newErrors.email;
          }
          break;
        case "phone": {
          const cleanPhone = formattedValue.replace(/[-()\s]/g, "");
          if (cleanPhone && validatePhone(cleanPhone)) {
            delete newErrors.phone;
          }
          break;
        }
        case "message":
          if (formattedValue.trim() && validateMessage(formattedValue, 10)) {
            delete newErrors.message;
          }
          break;
        default:
          break;
      }
      setFieldErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { firstName, lastName } = parseFullName(formData.fullName);

    setIsSubmitting(true);
    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
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
            if (error.includes("First name") || error.includes("Last name")) {
              serverErrors.fullName = error;
            } else if (error.includes("Email") || error.includes("email")) {
              serverErrors.email = error;
            } else if (error.includes("Phone") || error.includes("phone")) {
              serverErrors.phone = error;
            } else if (error.includes("Message") || error.includes("message")) {
              serverErrors.message = error;
            }
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
    <div className={`${poppins.className} ${cardShellClass}`}>
      {formSubmitted ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-[10.69px] text-center min-h-0 px-1">
          <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-base font-bold text-[#1565c0] uppercase tracking-wide">
            Thank You!
          </h3>
          <p className="text-xs text-black leading-snug">
            Your request has been submitted successfully. We&apos;ll contact you
            shortly with your personalized quote.
          </p>
          <button
            type="button"
            onClick={closeThankYouPopup}
            className="mt-1 rounded-full border border-black bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-black hover:text-white transition-colors duration-200"
          >
            OK Thanks
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-[10.69px] flex-1 min-h-0 min-w-0">
          <header className="shrink-0 flex flex-col gap-1 text-center">
            <h3 className="text-[13px] sm:text-[13px] font-bold uppercase tracking-wide  text-[#1976d2] leading-tight">
              {form_head?.title || "GET IN TOUCH WITH US"}
            </h3>
            <p className="text-[11px] font-normal text-black leading-snug">
              {form_head?.sub_title ||
                form_head?.subtitle ||
                "Fast response within 30 minutes"}
            </p>
          </header>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[10.69px] flex-1 min-h-0 min-w-0"
          >
            <div className="shrink-0 min-w-0">
              <label htmlFor="fullName" className="sr-only">
                Full name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onFocus={handleFirstInteraction}
                className={`${poppins.className} ${fieldErrorClass(!!fieldErrors.fullName)}`}
                placeholder="Full Name"
                required
                aria-invalid={!!fieldErrors.fullName}
              />
              {fieldErrors.fullName && (
                <div className="text-[10px] text-red-600 font-medium mt-0.5 leading-tight">
                  {fieldErrors.fullName}
                </div>
              )}
            </div>

            <div className="shrink-0 min-w-0">
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
                className={`${poppins.className} ${fieldErrorClass(!!fieldErrors.phone)}`}
                placeholder="Phone Number"
                required
                aria-invalid={!!fieldErrors.phone}
              />
              {fieldErrors.phone && (
                <div className="text-[10px] text-red-600 font-medium mt-0.5 leading-tight">
                  {fieldErrors.phone}
                </div>
              )}
            </div>

            <div className="shrink-0 min-w-0">
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
                className={`${poppins.className} ${fieldErrorClass(!!fieldErrors.email)}`}
                placeholder="Email Address"
                required
                aria-invalid={!!fieldErrors.email}
              />
              {fieldErrors.email && (
                <div className="text-[10px] text-red-600 font-medium mt-0.5 leading-tight">
                  {fieldErrors.email}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-0.5 min-h-0 flex-1 min-w-0">
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={handleFirstInteraction}
                rows={2}
                className={`${poppins.className} w-full min-h-[72px] flex-1 resize-none rounded-[22px] border border-black bg-white px-3 py-2 text-sm text-black outline-none placeholder:text-neutral-500 ${
                  fieldErrors.message ? "border-red-500" : ""
                }`}
                placeholder="Message"
                required
                aria-invalid={!!fieldErrors.message}
              />
              {fieldErrors.message && (
                <div className="text-[10px] text-red-600 font-medium leading-tight shrink-0">
                  {fieldErrors.message}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${poppins.className} shrink-0 w-full rounded bg-[#ff4d4d] py-2.5 px-4 text-normal font-normal uppercase tracking-wide text-white transition hover:bg-[#c91d15] disabled:opacity-70 flex items-center justify-center gap-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.10),_inset_0_-6px_10px_rgba(0,0,0,0.2)]`}            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin h-4 w-4 shrink-0" />
                  <span className="text-xs">Submitting...</span>
                </>
              ) : (
                <>
                  <span>SUBMIT</span>
                  {showArrowInButton && (
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  )}
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
