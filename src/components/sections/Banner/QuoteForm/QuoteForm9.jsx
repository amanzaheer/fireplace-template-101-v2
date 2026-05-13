"use client";

import { useState } from "react";
import { CheckCircle, Loader } from "lucide-react";
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

export default function QuoteForm9({
  data: _data,
  form_head,
  form_labels = {},
  showArrowInButton: _showArrowInButton = false,
  fontClassName: _fontClassName = "",
}) {
  const labels = form_labels || {};
  const errorLabels = labels.errors || {};
  const placeholders = {
    firstName: labels.placeholder_first_name || "First Name",
    phone: labels.placeholder_phone || "(123)-456-7890",
    email: labels.placeholder_email || "your@email.com",
    message: labels.placeholder_message || "Message",
  };
  const inputTypography =
    "text-left font-inherit text-base font-normal leading-normal text-[#000] outline-none placeholder:text-left placeholder:font-inherit placeholder:text-base placeholder:font-normal placeholder:text-[#000]";
  const quoteFieldFrame =
    "box-border flex w-full max-w-[393.433px] shrink-0 gap-[12.333px] rounded-[14.8px] border-[1.233px] border-solid border-[#000] bg-white px-[12.333px] shadow-none focus:border-[#000] focus:outline-none focus:ring-0 focus-visible:border-[#000]";

  const inputFieldClass = cn(
    quoteFieldFrame,
    "min-h-[56px] items-center py-0",
    inputTypography,
  );

  const textareaFieldClass = cn(
    quoteFieldFrame,
    "min-h-[112px] resize-none items-start pb-0 pt-[10px] leading-normal",
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
      newErrors.firstName = errorLabels.name_required || "Name is required";
    } else if (!validateName(formData.firstName)) {
      newErrors.firstName =
        errorLabels.name_invalid ||
        "Name must be 2-50 characters and contain only letters";
    }

    if (!formData.email.trim()) {
      newErrors.email = errorLabels.email_required || "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email =
        errorLabels.email_invalid || "Please enter a valid email address";
    }

    const cleanPhone = formData.phone.replace(/[-()\s]/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = errorLabels.phone_required || "Phone number is required";
    } else if (!validatePhone(cleanPhone)) {
      newErrors.phone =
        errorLabels.phone_invalid || "Phone number must be exactly 10 digits";
    }

    if (!formData.message.trim()) {
      newErrors.message = errorLabels.message_required || "Message is required";
    } else if (!validateMessage(formData.message, 10)) {
      newErrors.message =
        errorLabels.message_invalid ||
        "Message must be at least 10 characters long";
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
      email: "",
      phone: "",
      message: "",
    });
    setFieldErrors({
      firstName: "",
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
          if (formattedValue.trim() && validateName(formattedValue)) {
            delete newErrors.firstName;
          }
          break;
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

    const nameParts = formData.firstName.trim().split(/\s+/);
    const first_name = nameParts[0] || "";
    const last_name =
      nameParts.slice(1).join(" ").trim() || first_name || "";

    setIsSubmitting(true);
    try {
      const payload = {
        first_name,
        last_name,
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
            else if (error.includes("Last name")) serverErrors.firstName = error;
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
          labels.toast_success ||
          "Your request has been submitted successfully! We'll contact you shortly."
      );
      setFormSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error(
        err.message ||
          labels.toast_error ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = (
    form_head?.title ||
    labels.default_title ||
    "GET IN TOUCH WITH US"
  ).toUpperCase();

  return (
    <div
      id="quote-form-section"
      className={`relative flex h-fit w-full max-w-[439px] min-w-0 flex-col rounded-[18px] bg-white px-6 py-8 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)] sm:px-8 ${quoteFormPoppins.className}`}
    >
      {!formSubmitted && (
        <header className="mb-5 flex w-full shrink-0 flex-col items-center gap-2 self-stretch text-center sm:gap-2.5">
          <h3
            className="w-full text-balance font-inherit font-bold"
            style={{
              color: "#000",
              textAlign: "center",
              fontSize: "30.833px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "55.5px",
              whiteSpace: "pre-line",
            }}
          >
            {title}
          </h3>
          {form_head?.sub_title ? (
            <p className="w-full max-w-full text-balance text-center text-base font-normal leading-normal text-[#000]">
              {form_head.sub_title}
            </p>
          ) : null}
        </header>
      )}

      {formSubmitted ? (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-800">
            {labels.thank_you_title || "Thank You!"}
          </h3>
          <p className="mb-6 max-w-md text-gray-600">
            {labels.thank_you_message ||
              "Your request has been submitted successfully. We'll contact you shortly with your personalized quote."}
          </p>
          <button
            type="button"
            onClick={closeThankYouPopup}
            className="rounded-lg bg-[#EFA536] px-6 py-2 font-normal text-[24.767px] text-[#000]"
          >
            {labels.thank_you_button || "OK Thanks"}
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[12.333px] font-inherit text-[#000]"
        >
          <div>
            <label htmlFor="firstName" className="sr-only">First name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onFocus={handleFirstInteraction}
              className={cn(inputFieldClass, fieldErrors.firstName && inputError)}
              placeholder={placeholders.firstName}
              required
              aria-invalid={!!fieldErrors.firstName}
            />
            {fieldErrors.firstName ? (
              <p className="mt-1 text-sm text-red-500">{fieldErrors.firstName}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="phone" className="sr-only">Phone number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onFocus={handleFirstInteraction}
              className={cn(inputFieldClass, fieldErrors.phone && inputError)}
              placeholder={placeholders.phone}
              required
              aria-invalid={!!fieldErrors.phone}
            />
            {fieldErrors.phone ? (
              <p className="mt-1 text-sm text-red-500">{fieldErrors.phone}</p>
            ) : null}
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
              className={cn(inputFieldClass, fieldErrors.email && inputError)}
              placeholder={placeholders.email}
              required
              aria-invalid={!!fieldErrors.email}
            />
            {fieldErrors.email ? (
              <p className="mt-1 text-sm text-red-500">{fieldErrors.email}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={handleFirstInteraction}
              className={cn(textareaFieldClass, fieldErrors.message && inputError)}
              placeholder={placeholders.message}
              required
              aria-invalid={!!fieldErrors.message}
            />
            {fieldErrors.message ? (
              <p className="mt-1 text-sm text-red-500">{fieldErrors.message}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full max-w-[393.433px] shrink-0 items-center justify-center rounded-[14.8px] bg-[#EDA33E] px-[12.333px] font-inherit font-normal uppercase not-italic transition-opacity hover:opacity-95 disabled:opacity-70"
            style={{
              color: "#060606",
              fontSize: "24.667px",
              fontWeight: 400,
              lineHeight: "65.367px",
              textAlign: "center",
            }}
          >
            {isSubmitting ? (
              <span className="inline-flex items-center justify-center gap-2 font-inherit font-normal uppercase">
                <Loader
                  className="h-5 w-5 shrink-0 animate-spin text-[#060606]"
                  aria-hidden
                />
                {labels.submitting_label || "Sending…"}
              </span>
            ) : (
              labels.submit_button || "SUBMIT"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
