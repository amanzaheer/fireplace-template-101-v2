"use client";

import { useState } from "react";
import { CheckCircle, Loader, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { Poppins } from "next/font/google";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
} from "@/lib/validators";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function QuoteForm10({
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
        // API requires last_name; for this landscape design we collect one name field.
        last_name: formData.firstName,
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

  const cardClass =
    "w-full max-w-[444px] h-[558px] rounded-[14.8px] border border-[#cfcfcf] bg-[#5484a6] p-6 shadow-[0_8px_28px_rgba(0,0,0,0.18)]";
  const fieldBase =
    "h-[50px] w-full rounded-[12px] border border-black/60 bg-white px-3 text-[19px] text-black placeholder:text-black/80 outline-none transition-colors focus:border-black";

  return (
    <div className={`${poppins.className} ${cardClass}`}>
      {!formSubmitted && (
        <form
          onSubmit={handleSubmit}
          className="flex h-full w-full flex-col gap-3"
        >
          <h3 className="mb-1 text-center text-[30px] font-extrabold uppercase leading-none text-white">
            {form_head?.title || "GET IN TOUCH WITH US"}
          </h3>

          <div className="w-full">
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
              className={`${fieldBase} ${fieldErrors.firstName ? "border-red-500" : ""}`}
              placeholder="First Name"
              required
              aria-invalid={!!fieldErrors.firstName}
            />
          </div>

          <div className="w-full">
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
              className={`${fieldBase} ${fieldErrors.phone ? "border-red-500" : ""}`}
              placeholder="(123)-456-7890"
              required
              aria-invalid={!!fieldErrors.phone}
            />
          </div>

          <div className="w-full">
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
              className={`${fieldBase} ${fieldErrors.email ? "border-red-500" : ""}`}
              placeholder="your@email.com"
              required
              aria-invalid={!!fieldErrors.email}
            />
          </div>

          <div className="w-full flex-1">
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={handleFirstInteraction}
              rows={3}
              className={`w-full h-full min-h-[80px] resize-none rounded-[14px] border border-black/60 bg-[#ececec] px-3 py-2 text-[19px] text-black placeholder:text-black/80 outline-none ${fieldErrors.message ? "border-red-500" : ""}`}
              placeholder="Message"
              required
              aria-invalid={!!fieldErrors.message}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 flex h-[55px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#ff4d4d] px-6 text-[24px] font-regular uppercase text-white transition-colors duration-200 hover:bg-[#0c5b8f] disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit
                {showArrowInButton ? (
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                ) : null}
              </>
            )}
          </button>
        </form>
      )}

      {formSubmitted ? (
        <div className="flex h-full flex-col items-center justify-center text-center px-6">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#EAA236]/50 bg-[#EAA236]/20">
            <CheckCircle className="h-9 w-9 text-[#EAA236]" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-black">Thank You!</h3>
          <p className="mb-6 max-w-md text-sm text-black/75 md:text-base">
            Your request has been submitted successfully. We&apos;ll contact you shortly with your personalized quote.
          </p>
          <button
            type="button"
            onClick={closeThankYouPopup}
            className="rounded-lg bg-[#EAA236] px-8 py-2.5 font-bold uppercase tracking-wide text-black transition-colors duration-200 hover:bg-[#df9522]"
          >
            OK Thanks
          </button>
        </div>
      ) : null}
    </div>
  );
}
