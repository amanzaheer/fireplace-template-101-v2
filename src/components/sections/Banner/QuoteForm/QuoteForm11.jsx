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

/** Banner11 hero form card (Figma). */
const B11 = {
  width: 332,
  height: 398.76666259765625,
  gap: 11.99,
  borderRadius: 16.6,
  borderWidth: 3.69,
  padding: 18.44,
};

export default function QuoteForm11({
  data,
  phone,
  form_head,
  showArrowInButton = false,
  /** 'card' = white card; 'orangePanel' = on solid orange; 'banner11' = dark + red border (Banner11) */
  variant = "card",
}) {
  const isBanner11 = variant === "banner11";
  const isOrangePanel = variant === "orangePanel";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!validateName(formData.name)) {
      newErrors.name =
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
          name: submittedFormData.name,
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
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setFieldErrors({
      name: "",
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
        case "name":
          if (formattedValue.trim() && validateName(formattedValue)) {
            delete newErrors.name;
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
      const nameParts = formData.name.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      const payload = {
        first_name: firstName,
        last_name: lastName,
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

      if (result.success === false) {
        if (result.errors && Array.isArray(result.errors)) {
          const serverErrors = {};
          result.errors.forEach((error) => {
            const errLower = error.toLowerCase();
            if (
              errLower.includes("first name") ||
              errLower.includes("last name") ||
              errLower.includes("name")
            ) {
              serverErrors.name = error;
            } else if (error.includes("Email") || error.includes("email")) serverErrors.email = error;
            else if (error.includes("Phone") || error.includes("phone")) serverErrors.phone = error;
            else if (error.includes("Message") || error.includes("message")) serverErrors.message = error;
          });
          setFieldErrors((prev) => ({ ...prev, ...serverErrors }));
          throw new Error("Please fix the validation errors above");
        }
        throw new Error(result.message || "Form submission failed");
      }

      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
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
    "w-full bg-white text-gray-900 outline-none font-semibold placeholder:font-normal placeholder:text-gray-500 px-4 py-3 border-0 rounded-none shadow-none";
  const inputCard = (err) =>
    `${inputBase} border ${err ? "border-red-500" : "border-gray-200"} rounded-md`;
  const inputOrange = (err) =>
    `${inputBase} ${err ? "ring-2 ring-red-400" : ""}`;
  const inputBanner11 = (err) =>
    `w-full min-w-0 box-border rounded-[9px] border bg-zinc-900/50 px-3 py-2.5 text-xs font-medium text-white outline-none transition-shadow placeholder:font-normal placeholder:text-white sm:px-3.5 sm:text-sm ${
      err
        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/40"
        : "border-white focus:border-white focus:ring-1 focus:ring-white/35"
    }`;

  const wrapClass = isBanner11
    ? "relative z-0 box-border mx-auto flex w-full min-w-0 max-w-full shrink-0 flex-col overflow-visible bg-[#1a1a1a] shadow-[0_8px_32px_rgba(0,0,0,0.28)] font-[system-ui,Segoe_UI,sans-serif]"
    : isOrangePanel
      ? "relative w-full  mx-auto font-[family-name:var(--font-inter)]"
      : "bg-white shadow-[0_0_10px_rgba(0,0,0,0.4)] relative font-barlow rounded-[15px] h-fit px-4 md:px-7 py-7 md:w-[370px]";

  const wrapStyle = isBanner11
    ? {
        width: `${B11.width}px`,
        maxWidth: "100%",
        minHeight: `${B11.height}px`,
        borderRadius: `${B11.borderRadius}px`,
        border: `${B11.borderWidth}px solid transparent`,
        background:
          "linear-gradient(#1a1a1a, #1a1a1a) padding-box, linear-gradient(180deg, #AF2325 0%, #040404 100%) border-box",
        padding: `${B11.padding}px`,
        boxSizing: "border-box",
        gap: `${B11.gap}px`,
      }
    : undefined;
  return (
    <div className={wrapClass} style={wrapStyle}>
      {!formSubmitted && (
        <>
        
          <h3
            className={
              isBanner11
                ? "text-center text-sm font-extrabold uppercase leading-snug tracking-widest  text-white sm:text-base"
                : isOrangePanel
                  ? "text-center text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#efa536] mb-2 px-1"
                  : "text-3xl md:text-[35px] leading-7 md:leading-[30px] px-2.5 font-bold text-center mb-2 text-primary"
            }
          >
            {isBanner11 ? (
                <span className="block break-words px-1 text-balance">
                  {form_head?.title}
                </span>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div>{form_head?.title}</div>
                {phone ? (
                  <span className="text-sm  text-white">{phone}</span>
                ) : null}
              </div>
            )}
          </h3>
          {form_head?.sub_title && (
            <h4
              className={
                isBanner11
                  ? "text-center text-xs font-medium leading-relaxed text-white sm:text-sm"
                  : isOrangePanel
                    ? "text-center text-sm md:text-base font-bold text-[#efa536] mb-6 md:mb-8"
                    : "text-lg pt-2 font-bold text-center mb-4 text-[#FFFFFF]"
              }
            >
              {form_head.sub_title}
            </h4>
          )}
          {isOrangePanel && !form_head?.sub_title && !isBanner11 && (
            <div className="mb-6 md:mb-8" aria-hidden />
          )}
        </>
      )}

      

      {formSubmitted ? (
        <div
          className={`flex flex-col items-center justify-center text-center ${
            isBanner11
              ? "min-h-0 flex-1 justify-center gap-3 py-2"
              : "py-6"
          } ${isBanner11 || isOrangePanel ? "text-white" : ""}`}
        >
          <div
            className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
              isBanner11 ? "bg-zinc-800" : "bg-green-100"
            }`}
          >
            <CheckCircle
              className={`h-8 w-8 ${
                isBanner11 ? "text-emerald-500" : "text-green-600"
              }`}
            />
          </div>
          <h3
            className={`mb-2 text-xl font-bold ${
              isBanner11 || isOrangePanel ? "text-white" : "text-gray-800"
            }`}
          >
            Thank You!
          </h3>
          <p
            className={`mb-6 max-w-md ${
              isBanner11 || isOrangePanel ? "text-zinc-300" : "text-gray-600"
            }`}
          >
            Your request has been submitted successfully. We&apos;ll contact
            you shortly with your personalized quote.
          </p>
          <button
            type="button"
            onClick={closeThankYouPopup}
            className={
              isBanner11
                ? "rounded-lg bg-red-600 py-2.5 px-8 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-red-700"
                : isOrangePanel
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
          className={
            isBanner11
              ? "flex min-h-0 w-full min-w-0 flex-col gap-[11.99px] text-white"
              : isOrangePanel
                ? "space-y-4 text-black"
                : "space-y-2.5 text-black"
          }
        >
          <div className="min-w-0">
            <label htmlFor="name" className="sr-only ">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={handleFirstInteraction}
              className={
                isBanner11
                  ? inputBanner11(!!fieldErrors.name)
                  : isOrangePanel
                    ? inputOrange(!!fieldErrors.name)
                    : inputCard(!!fieldErrors.name)
              }
              placeholder={isBanner11 ? "First Name" : "Name"}
              required
              aria-invalid={!!fieldErrors.name}
            />
            {fieldErrors.name && (
              <div
                className={`mt-1 text-sm font-medium ${
                  isBanner11 || isOrangePanel ? "text-red-300" : "text-red-500"
                }`}
              >
                {fieldErrors.name}
              </div>
            )}
          </div>

          <div className="min-w-0">
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
                isBanner11
                  ? inputBanner11(!!fieldErrors.phone)
                  : isOrangePanel
                    ? inputOrange(!!fieldErrors.phone)
                    : inputCard(!!fieldErrors.phone)
              }
              placeholder="(123) 456-7890"
              required
              aria-invalid={!!fieldErrors.phone}
            />
            {fieldErrors.phone && (
              <div
                className={`mt-1 text-sm font-medium ${
                  isBanner11 || isOrangePanel ? "text-red-300" : "text-red-500"
                }`}
              >
                {fieldErrors.phone}
              </div>
            )}
          </div>

          <div className="min-w-0">
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
                isBanner11
                  ? inputBanner11(!!fieldErrors.email)
                  : isOrangePanel
                    ? inputOrange(!!fieldErrors.email)
                    : inputCard(!!fieldErrors.email)
              }
              placeholder="your@email.com"
              required
              aria-invalid={!!fieldErrors.email}
            />
            {fieldErrors.email && (
              <div
                className={`mt-1 text-sm font-medium ${
                  isBanner11 || isOrangePanel ? "text-red-300" : "text-red-500"
                }`}
              >
                {fieldErrors.email}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={handleFirstInteraction}
              rows={isBanner11 || isOrangePanel ? 4 : 3}
              className={
                isBanner11
                  ? `${inputBanner11(!!fieldErrors.message)} min-h-[88px] max-h-36 resize-y`
                  : isOrangePanel
                    ? `${inputOrange(!!fieldErrors.message)} min-h-[140px] max-h-none resize-y`
                    : `w-full pl-3 py-2 max-h-[75px] bg-white border rounded-md outline-none placeholder:text-gray-600 ${
                        fieldErrors.message ? "border-linear-to-r from-[#cf1f21] via-[#cf1f21] to-[#541f1f]" : "border-gray-200"
                      }`
              }
              placeholder="Message"
              required
              aria-invalid={!!fieldErrors.message}
            />
            {fieldErrors.message && (
              <div
                className={`mt-1 text-sm font-medium ${
                  isBanner11 || isOrangePanel ? "text-red-300" : "text-red-500"
                }`}
              >
                {fieldErrors.message}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={
              isBanner11
                ? "mx-auto flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-none bg-red-600 px-3 text-xs font-extrabold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:h-11 sm:px-4 sm:text-sm"
                : isOrangePanel
                  ? "mx-auto flex h-[51px] w-full  items-center justify-center gap-2 rounded-none bg-[#efa536] px-6  font-normal uppercase tracking-wide text-[rgba(255,255,255,0.9)] transition-colors duration-200 hover:bg-white hover:text-black md:text-[35px] disabled:cursor-not-allowed disabled:opacity-60"
                  : "w-full bg-[#6B9FE4] hover:bg-[#5B88C4] text-black py-3 px-6 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            }
          >
            {isSubmitting ? (
              <>
                <Loader
                  className={`h-5 w-5 animate-spin ${isBanner11 ? "text-white" : ""}`}
                />
                Sending...
              </>
            ) : (
              <>
                {!isOrangePanel && !isBanner11 && (
                  <FileText className="w-5 h-5" />
                )}
                {isBanner11 || isOrangePanel ? "SUBMIT" : "GET A QUOTE"}
                {!isOrangePanel && !isBanner11 && showArrowInButton && (
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