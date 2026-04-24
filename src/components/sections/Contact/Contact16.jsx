"use client";

import React, { useState, useCallback, memo } from "react";
import { CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import About16 from "../About/About16";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
  validateZipcode,
} from "@/lib/validators";

/* ================= INPUT STYLE ================= */

const inputStyle =
  "w-full rounded-sm border border-[#7d7d7d] bg-transparent px-4 py-3 text-[16px] text-[#1f1f1f] outline-none transition focus:border-black";

/* ================= INPUT COMPONENTS ================= */

const NameInput = memo(({ value, onChange, error }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      Name <span className="text-red-400">*</span>
    </label>
    <input
      type="text"
      name="name"
      value={value}
      onChange={onChange}
      placeholder="Your full name"
      className={`${inputStyle} ${error ? "border-red-500" : ""}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
));

const EmailInput = memo(({ value, onChange, error }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      Email <span className="text-red-400">*</span>
    </label>
    <input
      type="email"
      name="email"
      value={value}
      onChange={onChange}
      placeholder="your@email.com"
      className={`${inputStyle} ${error ? "border-red-500" : ""}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
));

const PhoneInput = memo(({ value, onChange, error }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      Phone Number <span className="text-red-400">*</span>
    </label>
    <input
      type="tel"
      name="phone"
      value={value}
      onChange={onChange}
      placeholder="(123) 456-7890"
      className={`${inputStyle} ${error ? "border-red-500" : ""}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
));

const ZipcodeInput = memo(({ value, onChange, error }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      Zip Code <span className="text-red-400">*</span>
    </label>
    <input
      type="text"
      name="zipcode"
      value={value}
      onChange={onChange}
      placeholder="12345"
      className={`${inputStyle} ${error ? "border-red-500" : ""}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
));

const MessageInput = memo(({ value, onChange, error }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      How can we help you? <span className="text-red-400">*</span>
    </label>
    <textarea
      name="message"
      value={value}
      onChange={onChange}
      rows={3}
      placeholder="Tell us about your project or request"
      className={`${inputStyle} ${error ? "border-red-500" : ""}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
));

/* ================= MAIN ================= */

export default function Contact16({ content }) {
  const formHead = content?.form_head ?? {};
  const title = formHead.title ?? "10% Off Total Price for Online Booking";
  const subTitle =
    formHead.sub_title ?? "Offer ends in just a few hours!";

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

  const validateForm = () => {
    const newErrors = {};
    if (!validateName(formData.name)) newErrors.name = "Invalid name";
    if (!validateEmail(formData.email)) newErrors.email = "Invalid email";
    if (!validatePhone(formData.phone)) newErrors.phone = "Invalid phone";
    if (!validateZipcode(formData.zipcode)) newErrors.zipcode = "Invalid zip";
    if (!validateMessage(formData.message, 10))
      newErrors.message = "Min 10 chars";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;l

    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      toast.success("Submitted!");
      setFormSubmitted(true);
    } catch {
      toast.error("Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  }, []);

  return (
    <FullContainer id="contact-us" className="bg-[#d9d9d9] py-10 md:py-12">
      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">

          {/* LEFT SIDE */}
          <div className="max-w-[560px]">

            {formSubmitted ? (
              /* ✅ THANK YOU CARD UI */
              <div className="flex items-center justify-center min-h-[420px]">
                <div className="w-full rounded-xl bg-white p-8 md:p-10 shadow-lg text-center border border-gray-200">

                  <CheckCircle
                    className="mx-auto mb-4 text-green-600"
                    size={60}
                  />

                  <h4 className="text-2xl md:text-3xl font-bold text-[#111] mb-2">
                    Thank You!
                  </h4>

                  <p className="text-gray-600 text-sm md:text-base mb-6">
                    Your form has been successfully submitted. Our team will
                    contact you shortly.
                  </p>

                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        zipcode: "",
                        message: "",
                      });
                    }}
                    className="inline-block bg-[#0b2e73] px-6 py-3 text-white font-semibold uppercase tracking-wide transition hover:opacity-90"
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="mb-2 text-3xl md:text-4xl font-extrabold tracking-tight text-[#111111]">
                  {title}
                </h2>

                <h3 className="mb-6 text-sm md:text-base text-[#3c3c3c]">
                  {subTitle}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <NameInput value={formData.name} onChange={handleChange} error={errors.name} />
                  <EmailInput value={formData.email} onChange={handleChange} error={errors.email} />
                  <PhoneInput value={formData.phone} onChange={handleChange} error={errors.phone} />
                  <ZipcodeInput value={formData.zipcode} onChange={handleChange} error={errors.zipcode} />
                  <MessageInput value={formData.message} onChange={handleChange} error={errors.message} />

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        backgroundColor: "#0b2e73",
                        color: "#ffffff",
                        border: "1px solid #0b2e73",
                      }}
               className="inline-flex min-w-[205px] items-center justify-center rounded-none bg-[#0b2e73] px-6 py-3 text-lg font-semibold uppercase tracking-wide text-white shadow transition-all duration-300 hover:bg-[#09245a] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? "Processing..." : "SUBMIT"}
                    </button>
                  </div>
                </form>
              </>
            )}

          </div>

          {/* RIGHT SIDE */}
          <div className="pt-2 lg:pt-6">
            <About16 content={content} isEmbedded />
          </div>

        </div>
      </Container>
    </FullContainer>
  );
}