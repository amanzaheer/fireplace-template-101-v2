"use client";

import React, { useState, useCallback, memo } from "react";
import Image from "next/image";
import { CheckCircle, Loader, Phone } from "lucide-react";
import toast from "react-hot-toast";
import { Montserrat, Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
  validateZipcode,
} from "@/lib/validators";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const formHeadingClass =
  "max-w-[521px] text-[32px] font-bold leading-[34px] tracking-normal text-white sm:text-[42px] sm:leading-[44px] lg:text-[55px] lg:leading-[57px]";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function firstImageSrc(...paths) {
  for (const path of paths) {
    const src = buildImageSrc(IMAGE_BASE, path);
    if (src) return src;
  }
  return "";
}

/** CTA overlay — flex-centered inside orange bubble on contac26tpic.png (500×500) */
function CallBubbleOverlay({ phone, phoneLink, ctaLabel }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div className="pointer-events-auto absolute inset-[24%_3%_50%_52%] flex items-center justify-center">
        <a
          href={phoneLink}
          className="flex w-full translate-y-[3%] items-center justify-center gap-1.5 no-underline transition-transform duration-200 hover:scale-[1.02] sm:gap-2"
          aria-label={ctaLabel ? `${ctaLabel} — ${phone}` : `Call us at ${phone}`}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#5D3A1A] text-white shadow-[inset_0_-2px_0_rgba(0,0,0,0.28)] sm:size-10 md:size-11">
            <Phone
              className="size-4 shrink-0 -rotate-35 sm:size-[18px] md:size-5"
              strokeWidth={2.5}
              fill="white"
              aria-hidden
            />
          </span>

          <span className="flex min-w-0 flex-col items-center justify-center gap-0.5 text-center sm:gap-1">
            <span className="w-full text-[10px] font-extrabold uppercase leading-none tracking-wide text-white sm:text-[11px] md:text-xs lg:text-sm">
              {ctaLabel}
            </span>
            <span className="inline-flex max-w-full items-center justify-center rounded-full bg-white px-2 py-0.5 sm:px-2.5 sm:py-1">
              <span className="whitespace-nowrap text-[10px] font-extrabold leading-none text-black sm:text-[11px] md:text-xs lg:text-sm">
                {phone}
              </span>
            </span>
          </span>
        </a>
      </div>
    </div>
  );
}

const inputClass = (error) =>
  [
    montserrat.className,
    "w-full h-[44px] rounded-[8px] border bg-transparent px-4",
    "text-[15px] font-medium text-white outline-none",
    "placeholder:text-white/55",
    "transition-colors duration-200",
    error ? "border-red-400" : "border-white/80 focus:border-white",
  ]
    .filter(Boolean)
    .join(" ");

const textareaClass = (error) =>
  [
    montserrat.className,
    "w-full min-h-[96px] resize-none rounded-[8px] border bg-transparent px-4 py-2.5",
    "text-[15px] font-medium text-white outline-none",
    "placeholder:text-white/55",
    "transition-colors duration-200",
    error ? "border-red-400" : "border-white/80 focus:border-white",
  ]
    .filter(Boolean)
    .join(" ");

const NameInput = memo(({ value, onChange, error, placeholder }) => (
  <div>
    <label htmlFor="contact-name" className="sr-only">
      Name
    </label>
    <input
      id="contact-name"
      type="text"
      name="name"
      value={value}
      onChange={onChange}
      className={inputClass(!!error)}
      placeholder={placeholder}
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
  </div>
));

const EmailInput = memo(({ value, onChange, error, placeholder }) => (
  <div>
    <label htmlFor="contact-email" className="sr-only">
      Email
    </label>
    <input
      id="contact-email"
      type="email"
      name="email"
      value={value}
      onChange={onChange}
      className={inputClass(!!error)}
      placeholder={placeholder}
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
  </div>
));

const PhoneInput = memo(({ value, onChange, error, placeholder }) => (
  <div>
    <label htmlFor="contact-phone" className="sr-only">
      Phone Number
    </label>
    <input
      id="contact-phone"
      type="tel"
      name="phone"
      value={value}
      onChange={onChange}
      className={inputClass(!!error)}
      placeholder={placeholder}
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
  </div>
));

const ZipcodeInput = memo(({ value, onChange, error, placeholder }) => (
  <div>
    <label htmlFor="contact-zipcode" className="sr-only">
      Zip Code
    </label>
    <input
      id="contact-zipcode"
      type="text"
      name="zipcode"
      value={value}
      onChange={onChange}
      className={inputClass(!!error)}
      placeholder={placeholder}
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
  </div>
));

const MessageInput = memo(({ value, onChange, error, placeholder }) => (
  <div>
    <label htmlFor="contact-message" className="sr-only">
      Message
    </label>
    <textarea
      id="contact-message"
      name="message"
      value={value}
      onChange={onChange}
      rows={4}
      className={textareaClass(!!error)}
      placeholder={placeholder}
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
  </div>
));

export default function Contact26({ content }) {
  const formHead = content?.form_head ?? {};
  const contactBlock = content?.contact ?? {};
  const labels = content?.form_labels ?? {};
  const errorLabels = labels.errors ?? {};

  const phoneRaw =
    content?.contact_info?.phone?.trim() ||
    content?.navbar?.phone?.trim() ||
    "";
  const phoneLink = phoneRaw
    ? `tel:${phoneRaw.replace(/[^\d+]/g, "")}`
    : "#";

  const title = formHead.title ?? labels.default_title ?? "";
  const subTitle = formHead.sub_title ?? labels.default_sub_title ?? "";

  const placeholders = {
    name: labels.placeholder_name ?? labels.placeholder_first_name ?? "",
    email: labels.placeholder_email ?? "",
    phone: labels.placeholder_phone ?? "",
    zipcode: labels.placeholder_zipcode ?? "",
    message: labels.placeholder_message ?? "",
  };

  const submitLabel = labels.submit_button ?? "";
  const processingLabel =
    labels.processing_label ?? labels.submitting_label ?? "";
  const thankYouTitle = labels.thank_you_title ?? "";
  const thankYouMessage = labels.thank_you_message ?? "";
  const thankYouButton = labels.thank_you_button ?? "";
  const callCtaLabel =
    contactBlock.call_cta_label ?? labels.call_cta_label ?? "";

  const imageSrc = firstImageSrc(
    contactBlock.file_name,
    contactBlock.image,
    contactBlock.main_image,
    contactBlock.background_image,
  );
  const imageAlt =
    contactBlock.image_alt ?? contactBlock.alt ?? labels.image_alt ?? "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    zipcode: "",
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
      newErrors.name = errorLabels.name_required ?? "";
    else if (!validateName(formData.name))
      newErrors.name = errorLabels.name_invalid ?? "";
    if (!formData.email.trim())
      newErrors.email = errorLabels.email_required ?? "";
    else if (!validateEmail(formData.email))
      newErrors.email = errorLabels.email_invalid ?? "";
    const cleanPhone = formData.phone.replace(/[-()\s]/g, "");
    if (!formData.phone.trim())
      newErrors.phone = errorLabels.phone_required ?? "";
    else if (!validatePhone(cleanPhone))
      newErrors.phone = errorLabels.phone_invalid ?? "";
    if (!formData.zipcode.trim())
      newErrors.zipcode = errorLabels.zipcode_required ?? "";
    else if (!validateZipcode(formData.zipcode))
      newErrors.zipcode = errorLabels.zipcode_invalid ?? "";
    if (!formData.message.trim())
      newErrors.message = errorLabels.message_required ?? "";
    else if (!validateMessage(formData.message, 10))
      newErrors.message = errorLabels.message_invalid ?? "";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleFirstInteraction();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email: formData.email,
        phone: formData.phone.replace(/[-()\s]/g, ""),
        zipcode: formData.zipcode,
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
            if (
              err.toLowerCase().includes("first name") ||
              err.toLowerCase().includes("name")
            )
              serverErrors.name = err;
            else if (err.toLowerCase().includes("email")) serverErrors.email = err;
            else if (err.toLowerCase().includes("phone")) serverErrors.phone = err;
            else if (err.toLowerCase().includes("zipcode"))
              serverErrors.zipcode = err;
            else if (err.toLowerCase().includes("message"))
              serverErrors.message = err;
          });
          setErrors(serverErrors);
        }
        throw new Error(result.message ?? "");
      }

      if (result.success === false)
        throw new Error(result.message ?? "");

      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "form_submit",
          url: window.location.href,
          formData: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            zipcode: formData.zipcode,
          },
        });
      }
      toast.success(
        (typeof result.message === "string" && result.message.trim()) ||
          (typeof labels.toast_success === "string" && labels.toast_success.trim()) ||
          "",
      );
      setFormSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error(
        (typeof err?.message === "string" && err.message.trim()) ||
          (typeof labels.toast_error === "string" && labels.toast_error.trim()) ||
          "",
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
      window.dataLayer.push({ event: "leadSubmitted", url: window.location.href });
    }
    setFormSubmitted(false);
    setFormData({ name: "", email: "", phone: "", zipcode: "", message: "" });
    setErrors({});
  };

  return (
    <FullContainer
      id="contact-us"
      className={`${montserrat.className} overflow-x-hidden bg-black pt-12 pb-0 lg:pt-16`}
    >
      <Container className="px-4 sm:px-6 lg:px-8">
        <div id="quote-form-section">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-12 xl:gap-16">
            {imageSrc ? (
              <div className="order-2 flex w-full flex-col justify-end lg:order-1">
                <div className="relative mx-auto aspect-square w-full max-w-[520px] lg:mx-0 lg:ml-auto lg:origin-bottom lg:scale-[1.06]">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    unoptimized
                    className="object-contain object-center"
                    sizes="(max-width: 1024px) 100vw, 520px"
                    loading="lazy"
                  />

                  {phoneRaw && callCtaLabel ? (
                    <CallBubbleOverlay
                      phone={phoneRaw}
                      phoneLink={phoneLink}
                      ctaLabel={callCtaLabel}
                    />
                  ) : null}
                </div>
              </div>
            ) : null}

            <div
              className={`order-1 w-full self-start pb-4 sm:pb-6 lg:pb-10 ${imageSrc ? "lg:order-2" : "lg:col-span-2 lg:mx-auto lg:max-w-[640px]"}`}
            >
              {formSubmitted ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center py-8 text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
                    <CheckCircle className="h-10 w-10 text-green-400" />
                  </div>
                  <h4 className="mb-4 text-[28px] font-extrabold text-white sm:text-[32px]">
                    {thankYouTitle}
                  </h4>
                  <p className="mb-8 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
                    {thankYouMessage}
                  </p>
                  <button
                    type="button"
                    onClick={closeThankYou}
                    className="rounded-[8px] bg-white px-8 py-3 text-base font-bold uppercase tracking-wide text-black transition-colors duration-200 hover:bg-gray-100"
                  >
                    {thankYouButton}
                  </button>
                </div>
              ) : (
                <>
                  {title ? (
                    <h2 className={`${poppins.className} mb-1 ${formHeadingClass}`}>
                      {title}
                    </h2>
                  ) : null}
                  {subTitle ? (
                    <h3 className={`${poppins.className} mb-4 sm:mb-5 ${formHeadingClass}`}>
                      {subTitle}
                    </h3>
                  ) : null}

                  <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <NameInput
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        placeholder={placeholders.name}
                      />
                      <EmailInput
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder={placeholders.email}
                      />
                      <PhoneInput
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                        placeholder={placeholders.phone}
                      />
                      <ZipcodeInput
                        value={formData.zipcode}
                        onChange={handleChange}
                        error={errors.zipcode}
                        placeholder={placeholders.zipcode}
                      />
                    </div>
                    <MessageInput
                      value={formData.message}
                      onChange={handleChange}
                      error={errors.message}
                      placeholder={placeholders.message}
                    />
                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex min-w-[160px] items-center justify-center rounded-[8px] bg-white px-8 py-3 text-[16px] font-extrabold uppercase tracking-wide text-black transition-colors duration-200 hover:bg-gray-100 disabled:opacity-70"
                        aria-busy={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader className="mr-2 h-5 w-5 animate-spin" />
                            {processingLabel}
                          </>
                        ) : (
                          submitLabel
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
