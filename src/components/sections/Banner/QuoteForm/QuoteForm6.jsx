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
  weight: ["400", "500", "600", "700"],
});

export default function QuoteForm6({
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

  const fieldBase =
    "w-full px-4 py-2.5 rounded-xl bg-black/45 border border-white/90 bg-transparent text-white placeholder:text-white/55 outline-none transition-colors focus:ring-2 focus:ring-[#FF6611]/35 focus:border-white";

  return (
    <div
      className="rounded-[16px] border-4 border-[#FF6611]/50"
    >
      <div
        className="relative w-full max-w-sm rounded-[12px] to-10% bg-zinc-950/75 opacity-90 backdrop-blur-md shadow-2xl font-poppins h-fit"
      >
      {!formSubmitted && (
        <div className="px-4 pt-4 pb-2 md:px-5 md:pt-5">
                <h3 className={` ${poppins.className} font-bold text-white text-center uppercase tracking-wide text-lg md:text-xl leading-tight`}>
            {form_head?.title}
          </h3>
          {form_head?.sub_title ? (
            <p className={` ${poppins.className} mt-2 text-center text-sm md:text-base text-white/65 font-medium`}>
              {form_head.sub_title}
            </p>
          ) : null}
        </div>
      )}

      {formSubmitted ? (
        <div className={` ${poppins.className} flex flex-col items-center justify-center text-center py-10 px-6 md:px-8`}>
          <div className={` ${poppins.className} h-16 w-16 rounded-full bg-[#FF6611]/20 border border-[#FF6611]/50 flex items-center justify-center mb-4`}>
            <CheckCircle className="h-9 w-9 text-[#FF6611]" />
          </div>
          <h3 className={` ${poppins.className} text-xl font-bold text-white mb-2`}>Thank You!</h3>
          <p className={` ${poppins.className} text-white/75 max-w-md mb-6 text-sm md:text-base`}>
            Your request has been submitted successfully. We&apos;ll contact you shortly with your personalized quote.
          </p>
          <button
            type="button"
            onClick={closeThankYouPopup}
            className={` ${poppins.className} bg-[#FF6611] hover:bg-[#FF6611]/90 text-white py-2.5 px-8 rounded-lg font-bold uppercase tracking-wide transition-colors duration-200`}
          >
            OK Thanks
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={` ${poppins.className} space-y-3 text-base md:text-lg px-4 py-4 pt-2 md:px-4`}
        >
          <div className={` ${poppins.className} grid grid-cols-2 gap-2`}>

          <div className={` ${poppins.className}`}>
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
              className={`${poppins.className} ${ fieldBase} ${fieldErrors.firstName ? "border-red-400" : "border-white/35"}`}
              placeholder="First name"
              required
              aria-invalid={!!fieldErrors.firstName}
            />
            {fieldErrors.firstName && (
              <div className="text-red-300 text-sm font-medium mt-1">{fieldErrors.firstName}</div>
            )}
          </div>
          <div className={` ${poppins.className}`}>
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
              className={`${poppins.className} ${poppins.className} ${fieldBase} ${fieldErrors.lastName ? "border-red-400" : "border-white/35"}`}
              placeholder="Last name"
              required
              aria-invalid={!!fieldErrors.lastName}
            />
            {fieldErrors.lastName && (
              <div className="text-red-300 text-sm font-medium mt-1">{fieldErrors.lastName}</div>
            )}
          </div>
          </div>


          <label htmlFor="phone" className={` ${poppins.className} sr-only`}>
            Phone number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onFocus={handleFirstInteraction}
            className={`${poppins.className} ${fieldBase} ${fieldErrors.phone ? "border-red-400" : "border-white/35"}`}
            placeholder="(123)-456-7890"
            required
            aria-invalid={!!fieldErrors.phone}
          />
          {fieldErrors.phone && (
            <div className="text-red-300 text-sm font-medium">{fieldErrors.phone}</div>
          )}

          <label htmlFor="email" className={` ${poppins.className} sr-only`}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={handleFirstInteraction}
            className={`${poppins.className} ${fieldBase} ${fieldErrors.email ? "border-red-400" : "border-white/35"}`}
            placeholder="your@email.com"
            required
            aria-invalid={!!fieldErrors.email}
          />
          {fieldErrors.email && (
            <div className="text-red-300 text-sm font-medium">{fieldErrors.email}</div>
          )}

          <label htmlFor="message" className={` ${poppins.className} sr-only`}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={handleFirstInteraction}
            rows={5}
            className={`${poppins.className} ${fieldBase} min-h-[50px] max-h-[70px] resize-y ${fieldErrors.message ? "border-red-400" : "border-white/35"}`}
            placeholder="Message"
            required
            aria-invalid={!!fieldErrors.message}
          />
          {fieldErrors.message && (
            <div className="text-red-300 text-sm font-medium">{fieldErrors.message}</div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
                className={` ${poppins.className} w-full mt-0 bg-[#FF6611] hover:bg-[#FF6611]/90 disabled:opacity-70 text-lg md:text-xl font-thin cursor-pointer rounded-lg py-3.5 px-6 text-white uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-2`}
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin h-5 w-5" />
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
    </div>
    </div>
  );
}
