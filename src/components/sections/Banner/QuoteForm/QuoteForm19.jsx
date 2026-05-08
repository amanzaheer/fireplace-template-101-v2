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
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inputClass =
  "w-full border border-black bg-white px-3 py-3 text-base outline-none placeholder:text-black rounded-2xl";

export default function QuoteForm19({
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
      className={cn(
        "relative h-fit overflow-hidden  border-[1px] bg-white shadow-xl"
      )}
    >
      {formSubmitted ? (
        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-8 text-center md:px-7 h-full">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-800">Thank You!</h3>
          <p className="mb-6 max-w-md text-gray-600">
            Your request has been submitted successfully. We&apos;ll contact you
            shortly with your personalized quote.
          </p>
          <button
            type="button"
            onClick={closeThankYouPopup}
            className="rounded-md bg-[#cc3333] px-6 py-2 font-medium text-white transition-colors duration-200 hover:bg-[#c92028]"
          >
            OK Thanks
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={cn(
            "relative z-10 flex flex-col gap-3 px-4 py-5  text-black sm:px-5 sm:py-6",
            poppins.className
          )}
        >
          <h3 className="text-center text-lg font-bold  uppercase tracking-wide text-black md:text-[30px]">
            {form_head?.title}
          </h3>

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
              className={cn(
                inputClass,
                fieldErrors.firstName ? "border-red-500" : ""
              )}
              placeholder="First Name"
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
              className={cn(
                inputClass,
                fieldErrors.lastName ? "border-red-500" : ""
              )}
              placeholder="Last Name"
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
              className={cn(
                inputClass,
                fieldErrors.phone ? "border-red-500" : ""
              )}
              placeholder="(123) 456-7890"
              required
              aria-invalid={!!fieldErrors.phone}
            />
            {fieldErrors.phone ? (
              <div className="mt-1 text-sm font-medium text-red-500">
                {fieldErrors.phone}
              </div>
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
              className={cn(
                inputClass,
                fieldErrors.email ? "border-red-500" : ""
              )}
              placeholder="your@email.com"
              required
              aria-invalid={!!fieldErrors.email}
            />
            {fieldErrors.email ? (
              <div className="mt-1 text-sm font-medium text-red-500">
                {fieldErrors.email}
              </div>
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
              rows={4}
              className={cn(
                inputClass,
                "min-h-[120px] resize-none",
                fieldErrors.message ? "border-red-500" : ""
              )}
              placeholder="Message"
              required
              aria-invalid={!!fieldErrors.message}
            />
            {fieldErrors.message ? (
              <div className="mt-1 text-sm font-medium text-red-500">
                {fieldErrors.message}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#e31b23] px-6 py-3.5 text-lg font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#c92028] disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit
                {showArrowInButton ? (
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                ) : null}
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
