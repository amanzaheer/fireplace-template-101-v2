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
export default function QuoteForm12({
  data,
  form_head,
  showArrowInButton = false,
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

  const inputClass = (hasError) =>
    `w-full min-w-0 min-h-[42px] rounded-lg border bg-white pl-3 pr-3 text-sm outline-none placeholder:text-sm placeholder:text-black/70 sm:min-h-[38px] sm:text-base sm:placeholder:text-base ${
      hasError ? "border-red-500" : "border-[#bdbdbd]"
    } focus:border-[#da4909]`;

  return (
    <div className="relative mx-auto h-fit w-full max-w-[733px] overflow-hidden rounded-xl bg-white font-barlow shadow-[0_0_10px_rgba(0,0,0,0.4)] sm:rounded-[15px]">
      {!formSubmitted && (
        <>
          <div className="px-4 pb-1 pt-4 sm:px-5 sm:pt-5 md:px-6">
            <h3
              className={`${poppins.className} mb-1 px-1 text-center text-xl font-bold leading-tight text-black sm:text-2xl md:text-[30px] md:leading-[30px]`}
            >
              {form_head?.title}
            </h3>
          </div>
          <div className="px-4 pb-2 sm:px-5 md:px-6">
            <h4
              className={`${inter.className} text-center text-base font-medium text-black sm:text-lg md:text-xl`}
            >
              {form_head?.sub_title}
            </h4>
          </div>
        </>
      )}

      {formSubmitted ? (
        <div className="flex flex-col items-center justify-center px-4 py-8 text-center sm:px-6 sm:py-10 md:px-7">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 sm:h-16 sm:w-16">
            <CheckCircle className="h-7 w-7 text-green-600 sm:h-8 sm:w-8" />
          </div>
          <h3 className="mb-2 text-lg font-bold text-gray-800 sm:text-xl">
            Thank You!
          </h3>
          <p className="mb-6 max-w-md text-sm text-gray-600 sm:text-base">
            Your request has been submitted successfully. We&apos;ll contact you
            shortly with your personalized quote.
          </p>
          <button
            type="button"
            onClick={closeThankYouPopup}
            className="rounded-md bg-[#da4909] px-6 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:cursor-pointer hover:opacity-95 sm:text-base"
          >
            OK Thanks
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="min-w-0 space-y-3 px-3 py-3 text-black sm:space-y-3.5 sm:px-4 sm:py-4 md:px-5 md:py-4"
        >
          <div className="grid grid-cols-1 gap-2.5 sm:gap-3 md:grid-cols-2">
            <div className="min-w-0">
              <label htmlFor="firstName" className="sr-only">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onFocus={handleFirstInteraction}
                className={inputClass(fieldErrors.firstName)}
                placeholder="First name"
                required
                aria-invalid={!!fieldErrors.firstName}
              />
              {fieldErrors.firstName && (
                <div className="text-red-500 text-sm font-medium mt-1">
                  {fieldErrors.firstName}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <label htmlFor="lastName" className="sr-only">Last name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onFocus={handleFirstInteraction}
                className={inputClass(fieldErrors.lastName)}
                placeholder="Last name"
                required
                aria-invalid={!!fieldErrors.lastName}
              />
              {fieldErrors.lastName && (
                <div className="text-red-500 text-sm font-medium mt-1">
                  {fieldErrors.lastName}
                </div>
              )}
            </div>
          

          <div className="min-w-0 md:col-span-2">
          <label htmlFor="phone" className="sr-only">Phone number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onFocus={handleFirstInteraction}
            className={inputClass(fieldErrors.phone)}
            placeholder="(123) 456-7890"
            required
            aria-invalid={!!fieldErrors.phone}
          />
          {fieldErrors.phone && (
            <div className="text-red-500 text-sm font-medium mt-1">{fieldErrors.phone}</div>
          )}
          </div>

          <div className="min-w-0 md:col-span-2">
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={handleFirstInteraction}
            className={inputClass(fieldErrors.email)}
            placeholder="your@email.com"
            required
            aria-invalid={!!fieldErrors.email}
          />
          {fieldErrors.email && (
            <div className="text-red-500 text-sm font-medium mt-1">{fieldErrors.email}</div>
          )}
          </div>
          </div>

          <div className="min-w-0">
          <label htmlFor="message" className="sr-only">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={handleFirstInteraction}
            rows={3}
            className={`w-full min-w-0 min-h-[72px] max-h-[100px] resize-none rounded-lg border bg-white py-2 pl-3 pr-3 text-sm outline-none placeholder:text-sm placeholder:text-black/70 sm:min-h-[64px] sm:max-h-[80px] sm:text-base sm:placeholder:text-base ${
              fieldErrors.message ? "border-red-500" : "border-[#bdbdbd]"
            } focus:border-[#da4909]`}
            placeholder="Message"
            required
            aria-invalid={!!fieldErrors.message}
          />
          {fieldErrors.message && (
            <div className="text-red-500 text-sm font-medium mt-1">{fieldErrors.message}</div>
          )}
          </div>

          <div className="pt-0.5">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex w-full min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-full bg-[#da4909] px-5 py-2.5 text-base font-medium text-white transition-colors duration-200 hover:opacity-95 disabled:opacity-70 sm:min-h-[42px] sm:px-6 sm:py-3 sm:text-lg md:text-xl"
          >
            {isSubmitting ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <span className="inline-flex items-center gap-2 font-normal sm:text-[20px]">
                SUBMIT
                {showArrowInButton && (
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </span>
            )}
          </button>
          </div>
        </form>
      )}
    </div>
  );
}
