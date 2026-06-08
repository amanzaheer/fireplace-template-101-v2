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
import { Poppins, Inter } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export default function QuoteForm27({
  data,
  form_head,
  form_labels = {},
  showArrowInButton = false,
  layout = "default",
}) {
  const isBanner27 = layout === "banner27";
  const labels = form_labels ?? {};
  const placeholderName =
    labels.placeholder_first_name || labels.placeholder_name || "Your Name";
  const placeholderPhone =
    labels.placeholder_phone || "Phone Number";
  const placeholderEmail =
    labels.placeholder_email || "Email";
  const placeholderMessage =
    labels.placeholder_message || "Message";
  const submitLabel = labels.submit_button || "SUBMIT";

  const banner27FieldClass = (hasError, roundedClass = "rounded-md") =>
    `box-border h-[35px] w-full min-w-0 ${roundedClass} border bg-white px-3 py-0 text-[14px] outline-none placeholder:text-black ${
      hasError ? "border-red-500" : "border-black"
    }`;
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

    if (!isBanner27) {
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      } else if (!validateName(formData.lastName)) {
        newErrors.lastName =
          "Last name must be 2-50 characters and contain only letters";
      }
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
        last_name: isBanner27
          ? formData.lastName.trim() || formData.firstName
          : formData.lastName,
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

  const formShellClass = isBanner27
    ? "relative h-fit w-full max-w-[544px]  bg-white px-4 py-5 md:px-5 md:py-6"
    : "relative h-fit  bg-white font-barlow shadow-[0_0_10px_rgba(0,0,0,0.4)]";

  return (
    <div className={formShellClass}>
      {!formSubmitted && !isBanner27 && (
        <div className="bg-[#c92028] px-2 py-3 md:px-2.5">
          <h3
            className={`${poppins.className} mb-2 px-2.5 text-center text-3xl font-bold leading-7 text-white md:text-[34px] md:leading-[30px]`}
          >
            {form_head?.title}
          </h3>
        </div>
      )}
      {!formSubmitted && isBanner27 && (
        <h3
          className={`${poppins.className} mb-4 text-center text-[22px] font-bold uppercase leading-tight text-black md:text-[24px]`}
        >
          {form_head?.title}
        </h3>
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
            className="bg-[#cf1f21] hover:bg-red-700 text-white py-2 px-6 rounded-md font-medium transition-colors duration-200"
          >
            OK Thanks
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={
            isBanner27
              ? "flex w-full max-w-[540px] flex-col gap-3 text-base text-black"
              : "space-y-2.5 px-2 py-2 text-base text-black md:px-2.5 md:py-3 md:text-lg"
          }
        >
          {isBanner27 ? (
            <div className="flex w-full flex-row items-start  gap-1">
              <div className="min-w-0 flex-1">
                <label htmlFor="firstName" className="sr-only">
                  {placeholderName}
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onFocus={handleFirstInteraction}
                  className={banner27FieldClass(!!fieldErrors.firstName, "rounded-md")}
                  placeholder={placeholderName}
                  required
                  aria-invalid={!!fieldErrors.firstName}
                />
                {fieldErrors.firstName ? (
                  <div className="mt-1 text-xs font-medium text-red-500">
                    {fieldErrors.firstName}
                  </div>
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <label htmlFor="phone" className="sr-only">
                  {placeholderPhone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={handleFirstInteraction}
                  className={banner27FieldClass(!!fieldErrors.phone, "rounded-md")}
                  placeholder={placeholderPhone}
                  required
                  aria-invalid={!!fieldErrors.phone}
                />
                {fieldErrors.phone ? (
                  <div className="mt-1 text-xs font-medium text-red-500">
                    {fieldErrors.phone}
                  </div>
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <label htmlFor="email" className="sr-only">
                  {placeholderEmail}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleFirstInteraction}
                  className={banner27FieldClass(!!fieldErrors.email, "rounded-md")}
                  placeholder={placeholderEmail}
                  required
                  aria-invalid={!!fieldErrors.email}
                />
                {fieldErrors.email ? (
                  <div className="mt-1 text-xs font-medium text-red-500">
                    {fieldErrors.email}
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-[8px] lg:grid-cols-3">
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
                    className={`w-full rounded-lg border bg-white py-3 pl-3 outline-none placeholder:text-black md:rounded-xl ${
                      fieldErrors.firstName
                        ? "border-red-500"
                        : "border-black"
                    }`}
                    placeholder="First name"
                    required
                    aria-invalid={!!fieldErrors.firstName}
                  />
                  {fieldErrors.firstName ? (
                    <div className="mt-1 text-sm font-medium text-red-500">
                      {fieldErrors.firstName}
                    </div>
                  ) : null}
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
                    className={`w-full rounded-lg border bg-white py-3 pl-3 outline-none placeholder:text-black md:rounded-xl ${
                      fieldErrors.lastName
                        ? "border-red-500"
                        : "border-black"
                    }`}
                    placeholder="Last name"
                    required
                    aria-invalid={!!fieldErrors.lastName}
                  />
                  {fieldErrors.lastName ? (
                    <div className="mt-1 text-sm font-medium text-red-500">
                      {fieldErrors.lastName}
                    </div>
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
                    className={`w-full rounded-lg border bg-white py-3 pl-3 outline-none placeholder:text-black md:rounded-xl ${
                      fieldErrors.phone ? "border-red-500" : "border-black"
                    }`}
                    placeholder="(123) 456-7890"
                    required
                    aria-invalid={!!fieldErrors.phone}
                  />
                  {fieldErrors.phone ? (
                    <div className="text-sm font-medium text-red-500">
                      {fieldErrors.phone}
                    </div>
                  ) : null}
                </div>
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
                  className={`w-full rounded-lg border bg-white py-3 pl-3 outline-none placeholder:text-black md:rounded-xl ${
                    fieldErrors.email ? "border-red-500" : "border-black"
                  }`}
                  placeholder="your@email.com"
                  required
                  aria-invalid={!!fieldErrors.email}
                />
                {fieldErrors.email ? (
                  <div className="text-sm font-medium text-red-500">
                    {fieldErrors.email}
                  </div>
                ) : null}
              </div>
            </>
          )}

          <label htmlFor="message" className="sr-only">
            {placeholderMessage}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={handleFirstInteraction}
            rows={isBanner27 ? 4 : 3}
            className={`w-full resize-none border bg-white py-3 pl-3 outline-none placeholder:text-black ${
              isBanner27
                ? "rounded-md text-[14px]"
                : "max-h-[65px] rounded-lg md:rounded-xl placeholder:text-black"
            } ${fieldErrors.message ? "border-red-500" : "border-black"}`}
            placeholder={placeholderMessage}
            required
            aria-invalid={!!fieldErrors.message}
          />
          {fieldErrors.message ? (
            <div className="text-sm font-medium text-red-500">
              {fieldErrors.message}
            </div>
          ) : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className={
              isBanner27
                ? "flex w-full items-center justify-center bg-[#d90808] py-3.5 text-[18px] font-bold uppercase tracking-wide text-white transition hover:bg-[#bf0707] disabled:opacity-70"
                : "flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#cf1f21] px-6 py-3 text-lg font-medium text-white transition-colors duration-200 hover:bg-[#c92028]/90 md:text-xl"
            }
          >
            {isSubmitting ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                {labels.submitting_label || "Submitting..."}
              </>
            ) : (
              <span className={isBanner27 ? "" : "text-xl md:text-2xl"}>
                {isBanner27 ? submitLabel : "Submit"}
                {!isBanner27 && showArrowInButton ? (
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                ) : null}
              </span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
