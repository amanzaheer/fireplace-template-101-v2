"use client";

import React, { useState, useCallback, memo } from "react";
import Image from "next/image";
import { CheckCircle, Loader } from "lucide-react";
import { Poppins } from "next/font/google";
import toast from "react-hot-toast";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
  validateZipcode,
} from "@/lib/validators";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Form UI tokens — adjust colors / field size here */
const CONTACT27_FORM = {
  submitBackground: "#C1272D",
  overlay: "rgba(0, 22, 51, 0.72)",
  fieldWidth: "535px",
  fieldHeight: "50px",
  fieldBorder: "1.39px",
  fieldPaddingX: "13.89px",
  fieldGap: "13.89px",
};

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

const glassFieldInput = cn(
  "box-border w-full rounded-none border-solid border-white bg-transparent text-base text-white outline-none transition-colors placeholder:text-white focus:border-white focus:ring-0 sm:w-[535px] sm:max-w-[535px]",
);
const glassMessageInput =
  "w-full rounded-none border border-white bg-transparent px-4 py-3 text-base text-white outline-none transition-colors placeholder:text-white focus:border-white focus:ring-0";
const glassInputError = "border-red-400 focus:border-red-400";

const fieldInputStyle = {
  height: CONTACT27_FORM.fieldHeight,
  minHeight: CONTACT27_FORM.fieldHeight,
  borderWidth: CONTACT27_FORM.fieldBorder,
  paddingLeft: CONTACT27_FORM.fieldPaddingX,
  paddingRight: CONTACT27_FORM.fieldPaddingX,
};

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
      className={`${glassFieldInput} ${error ? glassInputError : ""}`}
      style={fieldInputStyle}
      placeholder={placeholder}
      required
      aria-invalid={!!error}
    />
    {error ? <p className="mt-1.5 text-sm text-red-200">{error}</p> : null}
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
      className={`${glassFieldInput} ${error ? glassInputError : ""}`}
      style={fieldInputStyle}
      placeholder={placeholder}
      required
      aria-invalid={!!error}
    />
    {error ? <p className="mt-1.5 text-sm text-red-200">{error}</p> : null}
  </div>
));
EmailInput.displayName = "EmailInput";

const PhoneInput = memo(({ value, onChange, error, placeholder }) => (
  <div>
    <label htmlFor="contact-phone" className="sr-only">
      Phone Number (required)
    </label>
    <input
      id="contact-phone"
      type="tel"
      name="phone"
      value={value}
      onChange={onChange}
      className={`${glassFieldInput} ${error ? glassInputError : ""}`}
      style={fieldInputStyle}
      placeholder={placeholder}
      required
      aria-invalid={!!error}
    />
    {error ? <p className="mt-1.5 text-sm text-red-200">{error}</p> : null}
  </div>
));
PhoneInput.displayName = "PhoneInput";

const ZipcodeInput = memo(({ value, onChange, error, placeholder }) => (
  <div>
    <label htmlFor="contact-zipcode" className="sr-only">
      Zip Code (required)
    </label>
    <input
      id="contact-zipcode"
      type="text"
      name="zipcode"
      value={value}
      onChange={onChange}
      className={`${glassFieldInput} ${error ? glassInputError : ""}`}
      style={fieldInputStyle}
      placeholder={placeholder}
      required
      aria-invalid={!!error}
    />
    {error ? <p className="mt-1.5 text-sm text-red-200">{error}</p> : null}
  </div>
));
ZipcodeInput.displayName = "ZipcodeInput";

const MessageInput = memo(({ value, onChange, error, placeholder }) => (
  <div>
    <label htmlFor="contact-message" className="sr-only">
      How can we help you? (required)
    </label>
    <textarea
      id="contact-message"
      name="message"
      value={value}
      onChange={onChange}
      rows={4}
      className={`${glassMessageInput} min-h-[120px] resize-y ${error ? glassInputError : ""}`}
      placeholder={placeholder}
      required
      aria-invalid={!!error}
    />
    {error ? <p className="mt-1.5 text-sm text-red-200">{error}</p> : null}
  </div>
));
MessageInput.displayName = "MessageInput";

export default function Contact27({ content }) {
  const formHead = content?.form_head ?? {};
  const banner = content?.banner ?? {};
  const labels = content?.form_labels ?? {};
  const contactBlock = content?.contact ?? {};

  const title =
    formHead.title ??
    banner.form_title ??
    labels.default_title ??
    "10% Off Total Price for Online Booking";
  const subTitle =
    formHead.sub_title ??
    banner.form_description ??
    "Offer ends in just a few hours!";
  const submitLabel =
    formHead.button_text ??
    formHead.submit_text ??
    formHead.cta_button ??
    labels.submit_button ??
    "SUBMIT";

  const placeholders = {
    name:
      labels.placeholder_first_name ??
      labels.placeholder_name ??
      "Your full name",
    email: labels.placeholder_email ?? "your@email.com",
    phone: labels.placeholder_phone ?? "(123) 456-7890",
    zipcode: labels.placeholder_zipcode ?? "12345",
    message:
      labels.placeholder_message ?? "Tell us about your project or request",
  };

  const sectionBgPath =
    formHead.file_name ??
    formHead.image ??
    contactBlock.background_image ??
    contactBlock.file_name ??
    banner.file_name ??
    content?.footer?.file_name ??
    "";
  const sectionBgUrl = sectionBgPath
    ? buildImageSrc(IMAGE_BASE, sectionBgPath)
    : "";
  const sectionBgAlt =
    formHead.image_alt ??
    contactBlock.background_alt ??
    banner.alt ??
    banner.altImage ??
    "";

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
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (!validateName(formData.name))
      newErrors.name =
        "Name must be 2-50 characters and contain only letters";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Please enter a valid email address";
    const cleanPhone = formData.phone.replace(/[-()\s]/g, "");
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!validatePhone(cleanPhone))
      newErrors.phone = "Phone number must be exactly 10 digits";
    if (!formData.zipcode.trim()) newErrors.zipcode = "Zipcode is required";
    else if (!validateZipcode(formData.zipcode))
      newErrors.zipcode =
        "Please enter a valid zipcode (12345 or 12345-6789)";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (!validateMessage(formData.message, 10))
      newErrors.message = "Message must be at least 10 characters long";
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
            else if (err.toLowerCase().includes("email"))
              serverErrors.email = err;
            else if (err.toLowerCase().includes("phone"))
              serverErrors.phone = err;
            else if (err.toLowerCase().includes("zipcode"))
              serverErrors.zipcode = err;
            else if (err.toLowerCase().includes("message"))
              serverErrors.message = err;
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
            zipcode: formData.zipcode,
          },
        });
      }
      toast.success(
        result.message ||
          "Your request has been submitted successfully! We'll contact you shortly.",
      );
      setFormSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error(err.message || "Something went wrong. Please try again.");
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
    setFormData({ name: "", email: "", phone: "", zipcode: "", message: "" });
    setErrors({});
  };

  return (
    <FullContainer
      id="contact-us"
      className={cn(
        poppins.className,
        "relative min-h-[560px] overflow-hidden py-16 md:min-h-[640px] md:py-20 lg:min-h-[720px] lg:py-24",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 min-h-full"
        aria-hidden
      >
        {sectionBgUrl ? (
          <Image
            src={sectionBgUrl}
            alt={sectionBgAlt}
            fill
            className="object-cover object-center"
            sizes="100vw"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-[#0a0e14]" />
        )}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: CONTACT27_FORM.overlay }}
        />
      </div>

      <Container className="relative z-10 flex min-h-fit flex-col justify-center py-4">
        <div
          id="quote-form-section"
          className="mx-auto w-full max-w-[720px] py-6 sm:max-w-[1084px] md:py-8"
        >
          {formSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white/15">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              <h4 className="mb-4 text-3xl font-bold text-white">Thank You!</h4>
              <p className="mb-6 max-w-md text-lg text-white/90">
                Your request has been submitted successfully. We&apos;ll contact
                you shortly with your personalized quote.
              </p>
              <button
                type="button"
                onClick={closeThankYou}
                className="rounded-none border border-white bg-transparent px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
              >
                OK Thanks
              </button>
            </div>
          ) : (
            <>
              <h2 className="mb-2 text-center text-2xl font-bold uppercase leading-tight tracking-wide text-white md:text-3xl lg:text-4xl">
                {title}
              </h2>
              {subTitle ? (
                <h3 className="mb-8 text-center text-lg font-semibold leading-snug text-white/95 md:text-xl">
                  {subTitle}
                </h3>
              ) : (
                <div className="mb-8" />
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2"
                  style={{ gap: CONTACT27_FORM.fieldGap }}
                >
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
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 flex w-full items-center justify-center py-4 text-lg font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-70"
                  style={{ backgroundColor: CONTACT27_FORM.submitBackground }}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="mr-3 h-5 w-5 animate-spin" />
                      {labels.processing_label ?? "Processing..."}
                    </>
                  ) : (
                    submitLabel
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </Container>
    </FullContainer>
  );
}
