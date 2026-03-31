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

export default function QuoteForm5({
  data,
  form_head,
  showArrowInButton = false,
  /** 'card' = white floating card; 'orangePanel' = image1 style on solid orange (Banner5) */
  variant = "card",
}) {
  const isOrangePanel = variant === "orangePanel";
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

  const inputBase =
    "w-full bg-white text-gray-900 outline-none font-semibold placeholder:font-bold placeholder:text-gray-500 px-4 py-3 border-0 rounded-none shadow-none";
  const inputCard = (err) =>
    `${inputBase} border ${err ? "border-red-500" : "border-gray-200"} rounded-md`;
  const inputOrange = (err) =>
    `${inputBase} ${err ? "ring-2 ring-red-400" : ""}`;

  const wrapClass = isOrangePanel
    ? "relative w-full max-w-[520px] mx-auto font-[family-name:var(--font-inter)]"
    : "bg-white shadow-[0_0_10px_rgba(0,0,0,0.4)] relative font-barlow rounded-[15px] h-fit px-4 md:px-7 py-7 md:w-[370px]";

  return (
    <div className={wrapClass}>
      {!formSubmitted && (
        <>
          <h3
            className={
              isOrangePanel
                ? "text-center text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-2 px-1"
                : "text-3xl md:text-[35px] leading-7 md:leading-[30px] px-2.5 font-bold text-center mb-2 text-primary"
            }
          >
            {form_head?.title}
          </h3>
          {form_head?.sub_title && (
            <h4
              className={
                isOrangePanel
                  ? "text-center text-sm md:text-base font-bold text-white/95 mb-6 md:mb-8"
                  : "text-lg pt-2 font-bold text-center mb-4 text-[#11121A]"
              }
            >
              {form_head.sub_title}
            </h4>
          )}
          {isOrangePanel && !form_head?.sub_title && (
            <div className="mb-6 md:mb-8" aria-hidden />
          )}
        </>
      )}

      {formSubmitted ? (
        <div
          className={`flex flex-col items-center justify-center text-center py-6 ${isOrangePanel ? "text-white" : ""}`}
        >
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3
            className={`text-xl font-bold mb-2 ${isOrangePanel ? "text-white" : "text-gray-800"}`}
          >
            Thank You!
          </h3>
          <p
            className={`max-w-md mb-6 ${isOrangePanel ? "text-white/90" : "text-gray-600"}`}
          >
            Your request has been submitted successfully. We&apos;ll contact you shortly with your personalized quote.
          </p>
          <button
            type="button"
            onClick={closeThankYouPopup}
            className={
              isOrangePanel
                ? "bg-black text-[rgba(255,255,255,0.9)] py-3 px-8 rounded-none font-bold uppercase tracking-wide hover:bg-black/90"
                : "bg-[#6B9FE4] hover:bg-[#5B88C4] text-black py-2 px-6 rounded-md font-medium transition-colors duration-200"
            }
          >
            OK Thanks
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={isOrangePanel ? "space-y-4 text-black" : "space-y-2.5 text-black"}
        >
          <div
            className={
              isOrangePanel
                ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
                : "grid grid-cols-2 gap-[8px]"
            }
          >
            <div>
              <label htmlFor="firstName" className="sr-only">
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onFocus={handleFirstInteraction}
                className={
                  isOrangePanel
                    ? inputOrange(!!fieldErrors.firstName)
                    : inputCard(!!fieldErrors.firstName)
                }
                placeholder="First name"
                required
                aria-invalid={!!fieldErrors.firstName}
              />
              {fieldErrors.firstName && (
                <div
                  className={`text-sm font-medium mt-1 ${isOrangePanel ? "text-red-200" : "text-red-500"}`}
                >
                  {fieldErrors.firstName}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onFocus={handleFirstInteraction}
                className={
                  isOrangePanel
                    ? inputOrange(!!fieldErrors.lastName)
                    : inputCard(!!fieldErrors.lastName)
                }
                placeholder="Last name"
                required
                aria-invalid={!!fieldErrors.lastName}
              />
              {fieldErrors.lastName && (
                <div
                  className={`text-sm font-medium mt-1 ${isOrangePanel ? "text-red-200" : "text-red-500"}`}
                >
                  {fieldErrors.lastName}
                </div>
              )}
            </div>
          </div>

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
            className={
              isOrangePanel
                ? inputOrange(!!fieldErrors.phone)
                : inputCard(!!fieldErrors.phone)
            }
            placeholder="(123) 456-7890"
            required
            aria-invalid={!!fieldErrors.phone}
          />
          {fieldErrors.phone && (
            <div
              className={`text-sm font-medium ${isOrangePanel ? "text-red-200" : "text-red-500"}`}
            >
              {fieldErrors.phone}
            </div>
          )}

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
            className={
              isOrangePanel
                ? inputOrange(!!fieldErrors.email)
                : inputCard(!!fieldErrors.email)
            }
            placeholder="your@email.com"
            required
            aria-invalid={!!fieldErrors.email}
          />
          {fieldErrors.email && (
            <div
              className={`text-sm font-medium ${isOrangePanel ? "text-red-200" : "text-red-500"}`}
            >
              {fieldErrors.email}
            </div>
          )}

          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={handleFirstInteraction}
            rows={isOrangePanel ? 5 : 3}
            className={
              isOrangePanel
                ? `${inputOrange(!!fieldErrors.message)} min-h-[140px] max-h-none resize-y`
                : `w-full pl-3 py-2 max-h-[75px] bg-white border rounded-md outline-none placeholder:text-gray-600 ${
                    fieldErrors.message ? "border-red-500" : "border-gray-200"
                  }`
            }
            placeholder="Message"
            required
            aria-invalid={!!fieldErrors.message}
          />
          {fieldErrors.message && (
            <div
              className={`text-sm font-medium ${isOrangePanel ? "text-red-200" : "text-red-500"}`}
            >
              {fieldErrors.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={
              isOrangePanel
                ? "w-full bg-black text-[rgba(255,255,255,0.9)] uppercase font-bold tracking-wide py-4 px-6 rounded-none hover:bg-black/90 transition-colors duration-200 flex items-center justify-center gap-2 text-base md:text-lg"
                : "w-full bg-[#6B9FE4] hover:bg-[#5B88C4] text-black py-3 px-6 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            }
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin h-5 w-5" />
                Sending...
              </>
            ) : (
              <>
                {!isOrangePanel && <FileText className="w-5 h-5" />}
                {isOrangePanel ? "SUBMIT" : "GET A QUOTE"}
                {!isOrangePanel && showArrowInButton && (
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}