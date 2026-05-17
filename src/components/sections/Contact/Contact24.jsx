"use client";

import { useState, useCallback, memo } from "react";
import Image from "next/image";
import { CheckCircle, Loader } from "lucide-react";
import { Poppins } from "next/font/google";
import toast from "react-hot-toast";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
} from "@/lib/validators";
import { IMAGE_BASE } from "@/lib/constants";
import Testimonials9 from "@/components/sections/Testimonials/Testimonials9";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

const REVIEWS_CARD_CHEVRON = "text-[#EFA536]";

const glassInput =
  "w-full rounded-none border border-white/90 bg-transparent px-3.5 py-2.5 text-[13.560px] text-white outline-none transition-colors placeholder:text-[#FFFFFF] focus:border-white focus:ring-0";
const glassInputError = "border-red-400 focus:border-red-400 focus:ring-red-400/50";

const NameInput = memo(({ value, onChange, error, placeholder }) => (
  <div>
    <label htmlFor="contact-name" className="sr-only">
      Name (required)
    </label>
    <input
      id="contact-name"
      type="text"
      name="name"
      value={value}
      onChange={onChange}
      className={`${glassInput} ${error ? glassInputError : ""}`}
      placeholder={placeholder}
      required
      aria-invalid={!!error}
    />
    {error ? (
      <p className="mt-1.5 text-sm text-red-200">{error}</p>
    ) : null}
  </div>
));
NameInput.displayName = "NameInput";

const EmailInput = memo(({ value, onChange, error, placeholder }) => (
  <div>
    <label htmlFor="contact-email" className="sr-only">
      Email (required)
    </label>
    <input
      id="contact-email"
      type="email"
      name="email"
      value={value}
      onChange={onChange}
      className={`${glassInput} ${error ? glassInputError : ""}`}
      placeholder={placeholder}
      required
      aria-invalid={!!error}
    />
    {error ? (
      <p className="mt-1.5 text-sm text-red-200">{error}</p>
    ) : null}
  </div>
));
EmailInput.displayName = "EmailInput";

const PhoneInput = memo(({ value, onChange, error, placeholder }) => (
  <div>
    <label htmlFor="contact-phone" className="sr-only">
      Phone number (required)
    </label>
    <input
      id="contact-phone"
      type="tel"
      name="phone"
      value={value}
      onChange={onChange}
      className={`${glassInput} ${error ? glassInputError : ""}`}
      placeholder={placeholder}
      required
      aria-invalid={!!error}
    />
    {error ? (
      <p className="mt-1.5 text-sm text-red-200">{error}</p>
    ) : null}
  </div>
));
PhoneInput.displayName = "PhoneInput";

const MessageInput = memo(({ value, onChange, error, placeholder }) => (
  <div>
    <label htmlFor="contact-message" className="sr-only">
      Message (required)
    </label>
    <textarea
      id="contact-message"
      name="message"
      value={value}
      onChange={onChange}
      rows={4}
      className={`${glassInput} min-h-[100px] resize-y ${error ? glassInputError : ""}`}
      placeholder={placeholder}
      required
      aria-invalid={!!error}
    />
    {error ? (
      <p className="mt-1.5 text-sm text-red-200">{error}</p>
    ) : null}
  </div>
));
MessageInput.displayName = "MessageInput";

export default function Contact24({ content: contentProp }) {
  const content = contentProp ?? {};
  const formHead = content.form_head ?? {};
  const labels = content.form_labels ?? {};
  const errorLabels = labels.errors ?? {};
  const placeholders = {
    name: labels.placeholder_first_name || "First Name",
    phone: labels.placeholder_phone || "(123)-456-7890",
    email: labels.placeholder_email || "your@email.com",
    message: labels.placeholder_message || "Message",
  };
  const title = formHead.title ?? labels.default_title ?? "GET IN TOUCH WITH US";
  const subTitle = formHead.sub_title ?? "";

  const testimonialsData = content?.testimonials ?? {};
  const testimonialList = Array.isArray(testimonialsData.list)
    ? testimonialsData.list
    : [];

  const sectionBgPath =
    content?.contact?.background_image ??
    testimonialsData.section_bg_image ??
    "";
  const sectionBgUrl = sectionBgPath ? buildImageSrc(IMAGE_BASE, sectionBgPath) : "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formStarted, setFormStarted] = useState(false);

  const handleFirstInteraction = () => {
    if (!formStarted && typeof window !== "undefined") {
      try {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "form start", url: window.location.href });
        setFormStarted(true);
      } catch {
        setFormStarted(true);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim())
      newErrors.name = errorLabels.name_required || "Name is required";
    else if (!validateName(formData.name))
      newErrors.name =
        errorLabels.name_invalid ||
        "Name must be 2-50 characters and contain only letters";
    if (!formData.email.trim())
      newErrors.email = errorLabels.email_required || "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email =
        errorLabels.email_invalid || "Please enter a valid email address";
    const cleanPhone = formData.phone.replace(/[-()\s]/g, "");
    if (!formData.phone.trim())
      newErrors.phone = errorLabels.phone_required || "Phone number is required";
    else if (!validatePhone(cleanPhone))
      newErrors.phone =
        errorLabels.phone_invalid || "Phone number must be exactly 10 digits";
    if (!formData.message.trim())
      newErrors.message = errorLabels.message_required || "Message is required";
    else if (!validateMessage(formData.message, 10))
      newErrors.message =
        errorLabels.message_invalid ||
        "Message must be at least 10 characters long";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleFirstInteraction();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const nameParts = formData.name.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName =
        nameParts.slice(1).join(" ").trim() || firstName || "";
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email: formData.email,
        phone: formData.phone.replace(/[-()\s]/g, ""),
        zipcode: "",
        message: formData.message,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        if (result.errors && Array.isArray(result.errors)) {
          const serverErrors = {};
          result.errors.forEach((err) => {
            const lower = err.toLowerCase();
            if (lower.includes("first name") || lower.includes("name"))
              serverErrors.name = err;
            else if (lower.includes("email")) serverErrors.email = err;
            else if (lower.includes("phone")) serverErrors.phone = err;
            else if (lower.includes("message")) serverErrors.message = err;
          });
          setErrors(serverErrors);
        }
        throw new Error(result.message || "Form submission failed");
      }

      if (result.success === false)
        throw new Error(result.message || "Form submission failed");

      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "form_submit",
          url: window.location.href,
          formData: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            zipcode: "",
          },
        });
      }
      toast.success(
        result.message ||
          labels.toast_success ||
          "Your request has been submitted successfully! We'll contact you shortly.",
      );
      setFormSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error(
        err.message ||
          labels.toast_error ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }, []);

  const closeThankYou = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "leadSubmitted",
        url: window.location.href,
      });
    }
    setFormSubmitted(false);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setErrors({});
  };

  return (
    <section
      id="contact-us"
      className="relative overflow-hidden bg-[#0a0e14] py-12 md:py-16 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        {sectionBgUrl ? (
          <Image
            src={sectionBgUrl}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={false}
          />
        ) : (
          <div className="h-full w-full bg-neutral-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/70 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1270px] px-3 md:px-4">
        <div
          className={
            testimonialList.length > 0
              ? "mx-auto grid w-full max-w-[1154px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,628px)_439px] lg:items-stretch lg:gap-x-[87px] lg:gap-y-0"
              : "mx-auto flex w-full max-w-2xl flex-col items-center gap-10"
          }
        >
          <div
            className={`flex min-h-0 min-w-0 w-full flex-col items-center justify-center lg:h-full ${testimonialList.length === 0 ? "hidden" : ""}`}
          >
            <div className="mx-auto w-full max-w-[628px] min-w-0">
              <Testimonials9
                content={content}
                embedded
                chevronIconClassName={REVIEWS_CARD_CHEVRON}
              />
            </div>
          </div>
          <div
            className={`${poppins.className} mx-auto flex w-full max-w-[439px] min-w-0 flex-col rounded-xl border border-white/15 bg-gradient-to-b from-[#3E299B] to-[#1761A3] p-5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45)] sm:p-6 md:p-7 lg:mx-0 lg:max-w-none lg:w-full`}
          >
            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center sm:py-10">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-lg border border-white/25 bg-white/15">
                  <CheckCircle className="h-11 w-11 text-white" />
                </div>
                <h4 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
                  {labels.thank_you_title || "Thank You!"}
                </h4>
                <p className="mb-8 max-w-md text-base text-white/90 sm:text-lg">
                  {labels.thank_you_message ||
                    "Your request has been submitted successfully. We'll contact you shortly with your personalized quote."}
                </p>
                <button
                  type="button"
                  onClick={closeThankYou}
                  className="rounded-lg border border-neutral-200 bg-white px-8 py-3 text-base font-semibold text-black transition-colors hover:bg-neutral-100"
                >
                  {labels.thank_you_button || "OK Thanks"}
                </button>
              </div>
            ) : (
              <div className="flex flex-col">
                <h2 className="text-center text-[31.398px] font-bold uppercase leading-tight tracking-wide text-[#FFFFFF]">
                  {title}
                </h2>
                {subTitle ? (
                  <p className="mt-2 text-center text-[13.560px] font-medium text-[#FFFFFF]">
                    {subTitle}
                  </p>
                ) : null}

                <form
                  onSubmit={handleSubmit}
                  className="mt-6 flex flex-col"
                  noValidate
                >
                  <div className="space-y-3">
                    <NameInput
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      placeholder={placeholders.name}
                    />
                    <PhoneInput
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      placeholder={placeholders.phone}
                    />
                    <EmailInput
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      placeholder={placeholders.email}
                    />
                    <MessageInput
                      value={formData.message}
                      onChange={handleChange}
                      error={errors.message}
                      placeholder={placeholders.message}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-3 flex w-full shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white py-3 text-[25.119px] font-semibold uppercase tracking-wider text-black shadow-md transition-colors hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#3E299B] disabled:opacity-70 sm:py-3.5"
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="mr-2 h-5 w-5 animate-spin text-black" />
                        {labels.processing_label || "Processing..."}
                      </>
                    ) : (
                      labels.submit_button || "Submit"
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
