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
export default function QuoteForm4({
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

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
      ...(name === "firstName" ? { lastName: formattedValue } : {}),
    }));

    if (fieldErrors[name]) {
      const newErrors = { ...fieldErrors };
      switch (name) {
        case "firstName":
        case "lastName":
          if (formattedValue.trim() && validateName(formattedValue)) {
            delete newErrors[name];
            if (name === "firstName") delete newErrors.lastName;
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
    <div className="relative font-barlow h-fit">
      {!formSubmitted && (
        <>
        <div className="px-4 md:px-6 pt-2 md:pt-3 pb-2">
          <h3 className="text-[30px] md:text-[38px] text-[#0f2962] leading-[0.98] font-extrabold text-start mb-1 uppercase tracking-tight">
            {form_head?.title}
          </h3>
        </div>
        <div className="hidden">
        <h4 className="text-lg md:text-2xl font-medium pt-2 text-start text-[#212020]">
            {form_head?.sub_title}
          </h4>
        </div>
        </>
      )}

      {formSubmitted ? (
        <div className="flex flex-col items-center justify-center text-center py-6 px-4 md:px-7">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-[#212020] mb-2">Thank You!</h3>
          <p className="text-[#212020] max-w-md mb-6 bg-white">
            Your request has been submitted successfully. We&apos;ll contact you shortly with your personalized quote.
          </p>
          <button
            type="button"
            onClick={closeThankYouPopup}
            className="bg-[#0f1115] hover:bg-black text-white py-2 px-6 rounded-md font-medium transition-colors duration-200"
          >
            OK Thanks
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-black px-4 md:px-6 pb-4 md:pb-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <div>
              <label htmlFor="firstName" className="sr-only">Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onFocus={handleFirstInteraction}
                className={`w-full h-[40px] md:h-[45px] px-3 md:px-4 bg-[#ffffff] border outline-none text-[#000000] ${poppins.className} placeholder:text-[#8e8e8e] text-sm md:text-[17px] leading-none ${
                  fieldErrors.firstName ? "border-red-500" : "border-[#efefef]"
                }`}
                placeholder="Name"
                required
                aria-invalid={!!fieldErrors.firstName}
              />
              {fieldErrors.firstName && (
                <div className="text-red-600 text-sm font-medium mt-1">
                  {fieldErrors.firstName}
                </div>
              )}
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
                className={`w-full h-[40px] md:h-[45px] px-3 md:px-4 bg-[#ffffff] border outline-none text-[#000000] ${poppins.className} placeholder:text-[#8e8e8e] text-sm md:text-[17px] leading-none ${
                  fieldErrors.phone ? "border-red-500" : "border-[#ffffff]"
                }`}
                placeholder="Phone"
                required
                aria-invalid={!!fieldErrors.phone}
              />
              {fieldErrors.phone && (
                <div className="text-red-600 text-sm font-medium mt-1">
                  {fieldErrors.phone}
                </div>
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
                className={`w-full h-[40px] md:h-[45px] px-3 md:px-4 bg-[#ffffff] border outline-none text-[#000000] ${poppins.className} placeholder:text-[#8e8e8e] text-sm md:text-[17px] leading-none ${
                  fieldErrors.email ? "border-red-500" : "border-[#ffffff]"
                }`}
                placeholder="Email"
                required
                aria-invalid={!!fieldErrors.email}
              />
              {fieldErrors.email && (
                <div className="text-red-600 text-sm font-medium mt-1">{fieldErrors.email}</div>
              )}
            </div>
          </div>

          <input type="hidden" name="lastName" value={formData.lastName} readOnly />

          <label htmlFor="message" className="sr-only">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={handleFirstInteraction}
            rows={5}
            className={`w-full min-h-[100px] md:min-h-[130px] px-3 md:px-4 py-3 bg-[#ffffff] border outline-none text-[#000000] ${poppins.className} placeholder:text-[#8e8e8e] text-sm md:text-[17px] leading-none resize-none ${
              fieldErrors.message ? "border-red-500" : "border-[#ffffff]"
            }`}
            placeholder="Message"
            required
            aria-invalid={!!fieldErrors.message}
          />
          {fieldErrors.message && (
            <div className="text-red-600 text-sm font-medium">{fieldErrors.message}</div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={` ${poppins.className} bg-[#efa536] text-black text-sm md:text-[17px] hover:bg-[#e5a81f] cursor-pointer p-2 md:p-2.5 font-medium transition-colors duration-200 inline-flex items-center justify-center gap-2 uppercase ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-[#e5a81f]"
            }`}  >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin mr-2 h-4 w-4" />
                Submitting...
              </>
            ) : (
              <div className={`${poppins.className} text-sm md:text-[17px]`}>
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
