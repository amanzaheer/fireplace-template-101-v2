"use client";

import React, { useState, useCallback, memo } from "react";
import { CheckCircle, Loader } from "lucide-react";
import toast from "react-hot-toast";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins, Rubik } from "next/font/google";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
  validateZipcode,
} from "@/lib/validators";

const poppins = Poppins({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const rubik = Rubik({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const NameInput = memo(({ value, onChange, error }) => (
  <div>
    <input
      id="contact-name"
      type="text"
      name="name"
      value={value}
      onChange={onChange}
      className={`w-full rounded border border-white/80 bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-white md:text-lg ${error ? "border-red-300" : "border-white/80"} focus:border-white`}
      placeholder="Your Full Name"
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-xs text-red-200">{error}</p>}
  </div>
));

const EmailInput = memo(({ value, onChange, error }) => (
  <div>
    <input
      id="contact-email"
      type="email"
      name="email"
      value={value}
      onChange={onChange}
      className={`w-full rounded border border-white/80 bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-white md:text-lg ${error ? "border-red-300" : "border-white/80"} focus:border-white`}
      placeholder="Your Email ( abc@gmail.com)"
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-xs text-red-200">{error}</p>}
  </div>
));

const PhoneInput = memo(({ value, onChange, error }) => (
  <div>
    <input
      id="contact-phone"
      type="tel"
      name="phone"
      value={value}
      onChange={onChange}
      className={`w-full rounded border border-white/80 bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-white md:text-lg ${error ? "border-red-300" : "border-white/80"} focus:border-white`}
      placeholder="(123) 456-7890"
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-xs text-red-200">{error}</p>}
  </div>
));

const ZipcodeInput = memo(({ value, onChange, error }) => (
  <div>
    <input
      id="contact-zipcode"
      type="text"
      name="zipcode"
      value={value}
      onChange={onChange}
      className={`w-full rounded border border-white/80 bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-white md:text-lg ${error ? "border-red-300" : "border-white/80"} focus:border-white`}
      placeholder="ZIP CODE"
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-xs text-red-200">{error}</p>}
  </div>
));

const MessageInput = memo(({ value, onChange, error }) => (
  <div>
    <textarea
      id="contact-message"
      name="message"
      value={value}
      onChange={onChange}
      rows={4}
      className={`min-h-[40px] max-h-[80px] resize-none w-full rounded border border-white/80 bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-white md:text-lg ${error ? "border-red-300" : "border-white/80"} focus:border-white`}
      placeholder="Message"
      required
      aria-invalid={!!error}
    />
    {error && <p className="mt-1 text-xs text-red-200">{error}</p>}
  </div>
));

export default function Contact12({ content }) {
  const formHead = content?.form_head ?? {};
  const title = formHead.title ?? "10% Off Total Price for Online Booking";
  const subTitle = formHead.sub_title ?? "Ask For A Quote Here";

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
        window.dataLayer.push({
          event: "form start",
          url: window.location.href,
        });
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
      newErrors.name = "Name must be 2-50 characters and contain only letters";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Please enter a valid email address";
    const cleanPhone = formData.phone.replace(/[-()\s]/g, "");
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!validatePhone(cleanPhone))
      newErrors.phone = "Phone number must be exactly 10 digits";
    if (!formData.zipcode.trim()) newErrors.zipcode = "Zipcode is required";
    else if (!validateZipcode(formData.zipcode))
      newErrors.zipcode = "Please enter a valid zipcode (12345 or 12345-6789)";
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
    <FullContainer id="contact-us" className="pb-4 relative mt-9">
      <Container className="relative z-10">
        <div id="quote-form-section">
          <div className="bg-[#da4909] gap-0 overflow-hidden mb-5 h-[560px] w-full max-w-[541px] rounded-xl shadow-lg">
            <div className={`p-5 text-white md:p-6 lg:p-8 ${poppins.className}`}>
              {formSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h4 className="mb-4 text-3xl font-bold text-white">
                    Thank You!
                  </h4>
                  <p className="mb-6 max-w-md text-xl text-white">
                    Your request has been submitted successfully. We&apos;ll
                    contact you shortly with your personalized quote.
                  </p>
                  <button
                    type="button"
                    onClick={closeThankYou}
                    className="rounded-md bg-white py-3 px-6 font-medium text-[#fe4949] transition-colors duration-200 hover:bg-gray-100"
                  >
                    OK Thanks
                  </button>
                </div>
              ) : (
                <>
                  <h2
                    className={`${poppins.className} text-center text-2xl font-bold tracking-tight text-white md:text-[29px]`}
                  >
                    {title}
                  </h2>
                  <h3
                    className={`${poppins.className} mb-4 text-center text-xl font-normal leading-tight text-white md:mb-5 md:text-[20px]`}
                  >
                    {subTitle}
                  </h3>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-1.5 md:space-y-1.5"
                    noValidate
                  >
                    <div
                      className={`${poppins.className} grid md:grid gap-2`}
                    >
                      <NameInput
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                      />
                      <EmailInput
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                      />
                      <PhoneInput
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                      />
                      <ZipcodeInput
                        value={formData.zipcode}
                        onChange={handleChange}
                        error={errors.zipcode}
                      />
                    </div>
                    <MessageInput
                      value={formData.message}
                      onChange={handleChange}
                      error={errors.message}
                    />
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`${poppins.className} flex w-full items-center justify-center text-[20px] rounded-full bg-white border-2 border-white py-2.5 px-8 text-base font-normal text-[#e5170b] transition-all duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#fe4949] disabled:opacity-70`}
                        aria-busy={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader className="mr-3 h-5 w-5 animate-spin text-white" />
                            Processing...
                          </>
                        ) : (
                          "SUBMIT"
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
