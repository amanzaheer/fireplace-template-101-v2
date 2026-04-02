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
export default function QuoteForm7({
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

  return (
    <div className="relative h-fit bg-[#003f8c] font-barlow">
      {!formSubmitted && (
        <div className="px-4 md:px-6 pt-5 pb-4">
          <h3
            className={`${poppins.className} text-2xl md:text-3xl font-bold text-white text-center tracking-wide`}
          >
            {form_head?.title || "GET IN TOUCH WITH US"}
          </h3>
        </div>
      )}

      {formSubmitted ? (
        <div className="flex flex-col items-center justify-center text-center py-6 px-4 md:px-7">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
          <p className="text-white max-w-md mb-6">
            Your request has been submitted successfully. We&apos;ll contact you shortly with your personalized quote.
          </p>
          <button
            type="button"
            onClick={closeThankYouPopup}
            className="bg-white text-black hover:bg-black hover:text-white py-2 px-6 rounded-md font-medium transition-colors duration-200"
          >
            OK Thanks
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-3 text-base md:text-lg px-4 md:px-6 pb-5 pt-5"
        >
          <div className="grid gap-3">
            <div>
              <label htmlFor="firstName" className="sr-only">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onFocus={handleFirstInteraction}
                className={`w-full px-3 py-3 bg-white rounded-md outline-none placeholder:text-black text-black ${
                  fieldErrors.firstName ? "border border-red-500" : "border border-transparent"
                } ${poppins.className} placeholder:font-normal`}
                placeholder="Name"
                required
                aria-invalid={!!fieldErrors.firstName}
              />
              {fieldErrors.firstName && (
                <div className="text-red-500 text-sm font-medium mt-1">
                  {fieldErrors.firstName}
                </div>
              )}
            </div>
            {/* <div>
              <label htmlFor="lastName" className="sr-only">Last name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onFocus={handleFirstInteraction}
                className={`w-full px-3 py-3 bg-white rounded-md outline-none placeholder:text-black text-black ${
                  fieldErrors.lastName ? "border border-red-500" : "border border-transparent"
                }`}
                placeholder="Last name"
                required
                aria-invalid={!!fieldErrors.lastName}
              />
              {fieldErrors.lastName && (
                <div className="text-red-500 text-sm font-medium mt-1">
                  {fieldErrors.lastName}
                </div>
              )}
            </div> */}
          </div>

          <label htmlFor="phone" className="sr-only">Phone number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onFocus={handleFirstInteraction}
            className={`w-full px-3 py-3 bg-white rounded-md outline-none placeholder:text-black text-black ${
              fieldErrors.phone ? "border border-red-500" : "border border-transparent"
            } ${poppins.className} placeholder:font-normal`}
            placeholder="Phone"
            required
            aria-invalid={!!fieldErrors.phone}
          />
          {fieldErrors.phone && (
            <div className="text-red-500 text-sm font-medium">{fieldErrors.phone}</div>
          )}

          <label htmlFor="email" className="sr-only">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={handleFirstInteraction}
            className={`w-full px-3 py-3 bg-white rounded-md outline-none placeholder:text-black text-black ${
              fieldErrors.email ? "border border-red-500" : "border border-transparent"
            } ${poppins.className} placeholder:font-normal`}
            placeholder="Email"
            required
            aria-invalid={!!fieldErrors.email}
          />
          {fieldErrors.email && (
            <div className="text-red-500 text-sm font-medium">{fieldErrors.email}</div>
          )}

          <label htmlFor="message" className="sr-only">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={handleFirstInteraction}
            rows={4}
            className={`w-full px-3 py-3 resize-none bg-white rounded-md outline-none placeholder:text-black text-black ${
              fieldErrors.message ? "border border-red-500" : "border border-transparent"
            } ${poppins.className} placeholder:normal-case`}
            placeholder="Message"
            required
            aria-invalid={!!fieldErrors.message}
          />
          {fieldErrors.message && (
            <div className="text-red-500 text-sm font-medium">{fieldErrors.message}</div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#3a8ffb] text-lg md:text-xl hover:bg-[#2f7be0] cursor-pointer rounded-md py-3 px-6 text-white font-semibold transition-colors duration-200 flex items-center justify-center gap-2 uppercase"
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin mr-2 h-4 w-4" />
                Submitting...
              </>
            ) : (
              <div className="text-xl md:text-2xl">
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
