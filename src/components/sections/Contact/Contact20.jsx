"use client";

import React, { useState, useCallback, memo } from "react";
import { CheckCircle, Loader, TextQuote } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Poppins } from "next/font/google";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
  validateZipcode,
} from "@/lib/validators";

const formFieldFont = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

/** Figma: 557×53, 5px radius, 1px #000, px 10px, gap 10px; Poppins 400 16px / 53px lh, left-aligned */
const inputRowClass = (error) =>
  [
    formFieldFont.className,
    "w-full min-w-0 max-w-[557px] h-[53px] rounded-[5px] border border-black bg-white px-[10px] py-0",
    "text-left text-base font-normal leading-[53px] text-black",
    "outline-none transition-opacity",
    "placeholder:text-black placeholder:text-left placeholder:text-base placeholder:font-normal placeholder:opacity-100",
    "focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-0",
    error ? "!border-red-500" : "",
  ]
    .filter(Boolean)
    .join(" ");

const textareaClass = (error) =>
  [
    formFieldFont.className,
    "w-full min-w-0 max-w-[557px] min-h-[140px] rounded-[5px] border border-black bg-white px-[10px] py-3",
    "text-left text-base font-normal leading-normal text-black",
    "outline-none resize-none",
    "placeholder:text-black placeholder:text-left placeholder:text-base placeholder:font-normal placeholder:opacity-100",
    "focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-0",
    error ? "!border-red-500" : "",
  ]
    .filter(Boolean)
    .join(" ");

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

const NameInput = memo(({ value, onChange, error }) => (
  <div>
    <label htmlFor="contact-name" className="sr-only">
      Name <span className="text-red-300">*</span>
    </label>
    <input
      id="contact-name"
      type="text"
      name="name"
      value={value}
      onChange={onChange}
      className={inputRowClass(!!error)}
      placeholder="Your full name"
      required
      aria-invalid={!!error}
    />
    {error && <p className="text-red-300 text-sm mt-1">{error}</p>}
  </div>
));

const EmailInput = memo(({ value, onChange, error }) => (
  <div>
    <label htmlFor="contact-email" className="sr-only">
      Email <span className="text-red-300">*</span>
    </label>
    <input
      id="contact-email"
      type="email"
      name="email"
      value={value}
      onChange={onChange}
      className={inputRowClass(!!error)}
      placeholder="Your Email ( abc@gmail.com)"
      required
      aria-invalid={!!error}
    />
    {error && <p className="text-red-300 text-sm mt-1">{error}</p>}
  </div>
));

const PhoneInput = memo(({ value, onChange, error }) => (
  <div>
    <label htmlFor="contact-phone" className="sr-only">
      Phone Number <span className="text-red-300">*</span>
    </label>
    <input
      id="contact-phone"
      type="tel"
      name="phone"
      value={value}
      onChange={onChange}
      className={inputRowClass(!!error)}
      placeholder="(123) 456-7890"
      required
      aria-invalid={!!error}
    />
    {error && <p className="text-red-300 text-sm mt-1">{error}</p>}
  </div>
));

const ZipcodeInput = memo(({ value, onChange, error }) => (
  <div>
    <label htmlFor="contact-zipcode" className="sr-only">
      Zip Code <span className="text-red-300">*</span>
    </label>
    <input
      id="contact-zipcode"
      type="text"
      name="zipcode"
      value={value}
      onChange={onChange}
      className={inputRowClass(!!error)}
      placeholder="ZIP CODE"
      required
      aria-invalid={!!error}
    />
    {error && <p className="text-red-300 text-sm mt-1">{error}</p>}
  </div>
));

const MessageInput = memo(({ value, onChange, error }) => (
  <div>
    <label htmlFor="contact-message" className="sr-only">
      How can we help you? <span className="text-red-300">*</span>
    </label>
    <textarea
      id="contact-message"
      name="message"
      value={value}
      onChange={onChange}
      rows={5}
      className={textareaClass(!!error)}
      placeholder="Message"
      required
      aria-invalid={!!error}
    />
    {error && <p className="text-red-300 text-sm mt-1">{error}</p>}
  </div>
));

export default function Contact20({ content }) {
  const formHead = content?.form_head ?? {};
  const title = formHead.title ?? "10% Off Total Price for Online Booking";
  const subTitle = formHead.sub_title ?? "Offer ends in just a few hours!";
  const contactImagePath =
    formHead.image ?? formHead.file_name ?? "about/about.webp";
  const contactImage = buildImageSrc(IMAGE_BASE, contactImagePath);

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
    else if (!validateName(formData.name)) newErrors.name = "Name must be 2-50 characters and contain only letters";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email)) newErrors.email = "Please enter a valid email address";
    const cleanPhone = formData.phone.replace(/[-()\s]/g, "");
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!validatePhone(cleanPhone)) newErrors.phone = "Phone number must be exactly 10 digits";
    if (!formData.zipcode.trim()) newErrors.zipcode = "Zipcode is required";
    else if (!validateZipcode(formData.zipcode)) newErrors.zipcode = "Please enter a valid zipcode (12345 or 12345-6789)";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (!validateMessage(formData.message, 10)) newErrors.message = "Message must be at least 10 characters long";
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
            if (err.toLowerCase().includes("first name") || err.toLowerCase().includes("name")) serverErrors.name = err;
            else if (err.toLowerCase().includes("email")) serverErrors.email = err;
            else if (err.toLowerCase().includes("phone")) serverErrors.phone = err;
            else if (err.toLowerCase().includes("zipcode")) serverErrors.zipcode = err;
            else if (err.toLowerCase().includes("message")) serverErrors.message = err;
          });
          setErrors(serverErrors);
        }
        throw new Error(result.message || "Form submission failed");
      }

      if (result.success === false) throw new Error(result.message || "Form submission failed");

      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "form_submit",
          url: window.location.href,
          formData: { name: formData.name, email: formData.email, phone: formData.phone, message: formData.message, zipcode: formData.zipcode },
        });
      }
      toast.success(result.message || "Your request has been submitted successfully! We'll contact you shortly.");
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
      window.dataLayer.push({ event: "leadSubmitted", url: window.location.href });
    }
    setFormSubmitted(false);
    setFormData({ name: "", email: "", phone: "", zipcode: "", message: "" });
    setErrors({});
  };
  return (
    <FullContainer id="contact-us" className="relative mt-9 bg-white py-8 md:py-12">
      <Container className="relative z-10">
        <div id="quote-form-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch rounded-[24px] overflow-hidden mb-5">
            {/* lg+: original Figma layout. Below lg (stacked): fluid blob + min-height so rounds are not clipped. */}
            <div className="relative min-w-0 overflow-hidden max-lg:min-h-161 lg:min-h-[644px]">
              <div className="absolute inset-0 bg-white" />
              {/* Desktop / two-column: fixed pill + fixed decoration (unchanged from design reference) */}
              <div
                className="absolute left-1/2 top-1/2 z-0 hidden h-[500px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-[260px] bg-[#CC3333] sm:h-[580px] sm:w-[470px] lg:block lg:h-[644px] lg:w-[520px]"
                aria-hidden
              />
              <div
                className="absolute left-6 top-24 z-20 hidden h-36 w-36 rounded-full bg-white lg:block"
                aria-hidden
              />
              <div
                className="absolute left-10 top-28 z-20 hidden h-30 w-30 rounded-full bg-[#4C63B6] lg:block"
                aria-hidden
              />
              <div
                className="absolute right-20 bottom-80 z-20 hidden h-16 w-16 rounded-full bg-white lg:block"
                aria-hidden
              />
              {/* Stacked layout (below lg): width-bound pill + proportional accents */}
              <div
                className="absolute left-1/2 top-1/2 z-0 w-[min(92%,520px)] max-w-full aspect-520/644 -translate-x-1/2 -translate-y-1/2 rounded-[999px] bg-[#CC3333] lg:hidden"
                aria-hidden
              />
              <div
                className="absolute left-[4%] top-[14%] z-20 aspect-square w-[clamp(4.5rem,30vmin,9rem)] max-w-36 rounded-full bg-white lg:hidden"
                aria-hidden
              />
              <div
                className="absolute left-[6.5%] top-[16.5%] z-21 aspect-square w-[clamp(3.75rem,24vmin,7.5rem)] max-w-30 rounded-full bg-[#4C63B6] lg:hidden"
                aria-hidden
              />
              <div
                className="absolute right-[8%] top-[36%] z-20 aspect-square w-[clamp(2.5rem,10vmin,4rem)] max-w-16 rounded-full bg-white lg:hidden"
                aria-hidden
              />
              {contactImage ? (
                <Image
                  src={contactImage}
                  alt="Contact illustration"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain object-bottom z-10 scale-[0.8]"
                  priority={false}
                />
              ) : null}
            </div>

            <div className="rounded-[24px] min-w-0 bg-white text-black font-barlow px-5 py-6 md:px-8 md:py-8 lg:px-10 lg:py-10">
              {formSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h4 className="text-3xl font-bold text-black mb-4">Thank You!</h4>
                  <p className="text-black text-xl max-w-md mb-6">
                    Your request has been submitted successfully. We&apos;ll contact you shortly with your personalized quote.
                  </p>
                  <button
                    type="button"
                    onClick={closeThankYou}
                    className="bg-white text-black py-3 px-6 rounded-md font-medium transition-colors duration-200 hover:bg-gray-100"
                  >
                    OK Thanks
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-3 text-black leading-tight wrap-break-word">
                    {title}
                  </h2>
                  <h3 className="text-lg md:text-xl font-medium mb-6 text-black">
                    {subTitle}
                  </h3>
                  <form onSubmit={handleSubmit} className="flex w-full max-w-[557px] flex-col gap-[10px]" noValidate>
                    <div className="grid grid-cols-1 gap-[10px]">
                      <NameInput value={formData.name} onChange={handleChange} error={errors.name} />
                      <EmailInput value={formData.email} onChange={handleChange} error={errors.email} />
                      <PhoneInput value={formData.phone} onChange={handleChange} error={errors.phone} />
                      <ZipcodeInput value={formData.zipcode} onChange={handleChange} error={errors.zipcode} />
                    </div>
                    <MessageInput value={formData.message} onChange={handleChange} error={errors.message} />
                    <div className="flex flex-col text-left  justify-start items-start mt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-fit bg-[#d53133] text-white py-3 px-10 rounded-full transition-all duration-300 font-extrabold tracking-wide uppercase flex text-xl items-center justify-center shadow-md hover:bg-[#b9282a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d53133] disabled:opacity-70"
                        aria-busy={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader className="animate-spin mr-3 h-5 w-5" />
                            Processing...
                          </>
                        ) : (
                          <span className="flex items-center gap-2">
                            <TextQuote className="w-6 h-6" />
                            Get A Quote
                          </span>
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
