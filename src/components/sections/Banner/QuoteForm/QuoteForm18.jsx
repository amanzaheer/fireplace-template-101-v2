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

export default function QuoteForm18({
  data: _data,
  form_head,
  showArrowInButton: _showArrowInButton = false,
  fontClassName: _fontClassName = "",
  variant = "banner",
}) {
  const isCardVariant = variant === "card";

  const bannerInputTypography =
    "text-left font-inherit text-[16px] font-normal leading-normal text-[#2c2c2c] outline-none placeholder:text-left placeholder:font-inherit placeholder:text-[18.35px] placeholder:font-normal placeholder:text-[#8d8d8d]";
  const cardInputTypography =
    "text-left font-inherit text-[15px] font-normal leading-normal text-[#2c2c2c] outline-none placeholder:text-left placeholder:font-inherit placeholder:text-[15px] placeholder:font-normal placeholder:text-[#2c2c2c]";

  const bannerQuoteFieldFrame =
    "box-border flex w-full shrink-0 gap-3 rounded-none border border-transparent bg-[#efefef] px-4 shadow-none focus:border-[#5b2d79] focus:outline-none focus:ring-0 focus-visible:border-[#5b2d79]";
  const cardQuoteFieldFrame =
    "box-border flex w-full max-w-[393.43px] shrink-0 flex-row items-center gap-[12.33px] rounded-[14.8px] border-[1.23px] border-black bg-white px-[12.33px] shadow-none focus:border-black focus:outline-none focus:ring-0 focus-visible:border-black";

  const quoteFieldFrame = isCardVariant ? cardQuoteFieldFrame : bannerQuoteFieldFrame;
  const inputTypography = isCardVariant ? cardInputTypography : bannerInputTypography;

  const inputFieldClass = cn(
    quoteFieldFrame,
    isCardVariant ? "h-[66px] min-h-[66px]" : "h-[50px] min-h-[50px] items-center py-2.5",
    !isCardVariant && "items-center py-2.5",
    inputTypography,
  );

  const textareaFieldClass = cn(
    quoteFieldFrame,
    isCardVariant
      ? "min-h-[132px] resize-none items-start py-[12.33px] leading-normal"
      : "h-[130px] min-h-[130px] resize-none items-start py-3 leading-normal",
    inputTypography,
  );

  const inputError = "!border-red-500";

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

    if (!isCardVariant) {
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
          firstName: submittedFormData.firstName.trim(),
          lastName: submittedFormData.lastName.trim(),
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
          if (formattedValue.trim() && validateName(formattedValue)) {
            delete newErrors.firstName;
          }
          break;
        case "lastName":
          if (formattedValue.trim() && validateName(formattedValue)) {
            delete newErrors.lastName;
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

    const first_name = formData.firstName.trim();
    const last_name = isCardVariant
      ? formData.lastName.trim() || first_name
      : formData.lastName.trim();

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

  const title = (form_head?.title || "GET IN TOUCH WITH US").toUpperCase();

  return (
    <div
      className={cn(
        "relative flex min-w-0 flex-col overflow-hidden font-inherit border-2",
        quoteFormPoppins.className,
        isCardVariant
          ? "w-full min-h-[540px] max-w-[393.43px] rounded-2xl bg-white p-7 shadow-[0_10px_28px_rgba(0,0,0,0.14)]"
          : "min-h-[580px] w-[420px] max-w-[420px] rounded-[26px] bg-white p-0 shadow-[0_10px_30px_rgba(0,0,0,0.32)]",
      )}
    >
      {!formSubmitted && (
        <header
          className={cn(
            "flex w-full flex-col items-center text-center",
            isCardVariant
              ? "mb-6 shrink-0 gap-1"
              : "h-[100px] shrink-0 gap-1 bg-[#FF0011] px-4 py-5",
          )}
        >
          <h3
            className={
              isCardVariant
                ? "w-full text-balance font-inherit text-xl font-bold uppercase tracking-wide text-black sm:text-[22px]"
                : "w-full text-balance font-inherit font-bold tracking-tight text-[21px] md:text-[24px]"
            }
            style={
              isCardVariant
                ? undefined
                : {
                    color: "#efefef",
                    textAlign: "center",
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "1.05",
                    whiteSpace: "pre-line",
                  }
            }
          >
            {title}
          </h3>
          {form_head?.sub_title && !isCardVariant ? (
            <p className="">
              {/* {form_head.sub_title} */}
            </p>
          ) : null}
        </header>
      )}

      {formSubmitted ? (
        <div className="flex flex-col items-center justify-center py-6 text-center ">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-800">Thank You!</h3>
          <p className="mb-6 max-w-md text-gray-600">
            Your request has been submitted successfully. We&apos;ll contact you shortly with your personalized quote.
          
          </p>
          <button
            type="button"
            onClick={closeThankYouPopup}
            className="rounded-lg bg-[#FF0011] text-white px-6 py-2 font-normal text-[18px]"
          >
            OK Thanks
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={cn(
            "flex h-auto flex-col font-inherit",
            isCardVariant ? "gap-[12.33px] p-0" : "gap-4 px-5 pb-6 pt-5",
          )}
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
              placeholder="First Name"
              required
              aria-invalid={!!fieldErrors.firstName}
            />
            {fieldErrors.firstName ? (
              <p className="mt-1 text-sm text-red-500">{fieldErrors.firstName}</p>
            ) : null}
          </div>

          {!isCardVariant ? (
            <div>
              <label htmlFor="lastName" className="sr-only">Last name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onFocus={handleFirstInteraction}
                className={cn(inputFieldClass, fieldErrors.lastName && inputError)}
                placeholder="Last Name"
                required
                aria-invalid={!!fieldErrors.lastName}
              />
              {fieldErrors.lastName ? (
                <p className="mt-1 text-sm text-red-500">{fieldErrors.lastName}</p>
              ) : null}
            </div>
          ) : null}

        
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
              placeholder={isCardVariant ? "(123)-456-7890" : "Phone"}
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
              placeholder={isCardVariant ? "your@email.com" : "Email"}
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
              placeholder="Message"
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
            className={cn(
              "flex w-full shrink-0 items-center justify-center font-inherit font-bold uppercase not-italic transition-opacity hover:opacity-95 disabled:opacity-70",
              isCardVariant
                ? "mt-2 h-14 rounded-xl bg-[#FF0011] px-3 text-base text-white"
                : "mt-2 rounded-none bg-black px-3 py-1 font-normal",
            )}
            style={
              isCardVariant
                ? undefined
                : {
                    color: "#FFFFFF",
                    fontSize: "37.7px",
                    fontWeight: 400,
                    lineHeight: "1.3",
                    textAlign: "center",
                  }
            }
          >
            {isSubmitting ? (
              <span className="inline-flex items-center justify-center gap-2 font-inherit font-normal uppercase">
                <Loader
                  className="h-5 w-5 shrink-0 animate-spin text-[#FFFFFF]"
                  aria-hidden
                />
                Sending…
              </span>
            ) : (
              "SUBMIT"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
