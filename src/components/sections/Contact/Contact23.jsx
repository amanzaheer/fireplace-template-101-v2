"use client";

import React, { useState, useCallback, memo } from "react";
import { CheckCircle, Loader } from "lucide-react";
import toast from "react-hot-toast";

import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins } from "next/font/google";

import WhyChoose23 from "../WhyChoose/WhyChoose23";

import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
  validateZipcode,
} from "@/lib/validators";

const formFieldFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});

const labelClass =
  "mb-3 block text-[15px] font-semibold text-white";

const inputClass = (error) =>
  [
    formFieldFont.className,
    "w-full h-[54px] rounded-[10px] border bg-[#EAEAEA] px-5",
    "text-[16px] font-medium text-[#222]",
    "outline-none placeholder:text-[#8D8D8D]",
    "transition-all duration-300",
    error
      ? "border-red-500"
      : "border-transparent focus:border-[#EFCD09]",
  ]
    .filter(Boolean)
    .join(" ");

const formCardClass =
  "w-full max-w-[500px] bg-black px-7 py-6 rounded-tl-[12px] rounded-bl-[12px] rounded-tr-none rounded-br-none";

const formColumnClass = "w-full max-w-[500px] lg:ml-auto";

const textareaClass = (error) =>
  [
    formFieldFont.className,
    "w-full min-h-[122px] resize-none rounded-[10px] border bg-[#EAEAEA] px-5 py-4",
    "text-[16px] font-medium text-[#222]",
    "outline-none placeholder:text-[#8D8D8D]",
    "transition-all duration-300",
    error
      ? "border-red-500"
      : "border-transparent focus:border-[#EFCD09]",
  ]
    .filter(Boolean)
    .join(" ");

const NameInput = memo(({ value, onChange, error }) => (
  <div>
    <label htmlFor="contact-name" className={labelClass}>
      Name <span className="text-red-400">*</span>
    </label>

    <input
      id="contact-name"
      type="text"
      name="name"
      value={value}
      onChange={onChange}
      className={inputClass(!!error)}
      placeholder="Enter Your Name"
      required
      aria-invalid={!!error}
    />

    {error && (
      <p className="mt-2 text-sm text-red-400">
        {error}
      </p>
    )}
  </div>
));

const EmailInput = memo(({ value, onChange, error }) => (
  <div>
    <label htmlFor="contact-email" className={labelClass}>
      Email Address <span className="text-red-400">*</span>
    </label>

    <input
      id="contact-email"
      type="email"
      name="email"
      value={value}
      onChange={onChange}
      className={inputClass(!!error)}
      placeholder="Enter Your Email"
      required
      aria-invalid={!!error}
    />

    {error && (
      <p className="mt-2 text-sm text-red-400">
        {error}
      </p>
    )}
  </div>
));

const PhoneInput = memo(({ value, onChange, error }) => (
  <div>
    <label htmlFor="contact-phone" className={labelClass}>
      Phone Number <span className="text-red-400">*</span>
    </label>

    <input
      id="contact-phone"
      type="tel"
      name="phone"
      value={value}
      onChange={onChange}
      className={inputClass(!!error)}
      placeholder="(123) 456-7890"
      required
      aria-invalid={!!error}
    />

    {error && (
      <p className="mt-2 text-sm text-red-400">
        {error}
      </p>
    )}
  </div>
));

const ZipcodeInput = memo(({ value, onChange, error }) => (
  <div>
    <label htmlFor="contact-zipcode" className={labelClass}>
      Zip Code <span className="text-red-400">*</span>
    </label>

    <input
      id="contact-zipcode"
      type="text"
      name="zipcode"
      value={value}
      onChange={onChange}
      className={inputClass(!!error)}
      placeholder="ZIP CODE"
      required
      aria-invalid={!!error}
    />

    {error && (
      <p className="mt-2 text-sm text-red-400">
        {error}
      </p>
    )}
  </div>
));

export default function Contact23({ content }) {
  const formHead = content?.form_head ?? {};

  const title = formHead.title ?? "Have a question?";

  const subTitle =
    formHead.sub_title ??
    "Fill out this form and one of our team members will be in touch shortly!";

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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!validateName(formData.name)) {
      newErrors.name =
        "Name must be 2-50 characters and contain only letters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email =
        "Please enter a valid email address";
    }

    const cleanPhone =
      formData.phone.replace(/[-()\s]/g, "");

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(cleanPhone)) {
      newErrors.phone =
        "Phone number must be exactly 10 digits";
    }

    if (!formData.zipcode.trim()) {
      newErrors.zipcode = "Zipcode is required";
    } else if (!validateZipcode(formData.zipcode)) {
      newErrors.zipcode =
        "Please enter a valid zipcode";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (
      !validateMessage(formData.message, 10)
    ) {
      newErrors.message =
        "Message must be at least 10 characters long";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const nameParts = formData.name.trim().split(" ");

      const payload = {
        first_name: nameParts[0] || "",
        last_name: nameParts.slice(1).join(" ") || "",
        email: formData.email,
        phone: formData.phone.replace(/[-()\s]/g, ""),
        zipcode: formData.zipcode,
        message: formData.message,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Form submission failed"
        );
      }

      toast.success(
        result.message ||
        "Your request has been submitted successfully!"
      );

      setFormSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);

      toast.error(
        err.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => {
      if (!prev[name]) return prev;

      const newErrors = { ...prev };

      delete newErrors[name];

      return newErrors;
    });
  }, []);

  const closeThankYou = () => {
    setFormSubmitted(false);

    setFormData({
      name: "",
      email: "",
      phone: "",
      zipcode: "",
      message: "",
    });

    setErrors({});
  };

  return (
    <FullContainer
      id="contact-us"
      className={`relative w-full bg-white py-10 md:py-14 lg:py-16 ${formFieldFont.className}`}
    >
      <Container className="relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div
          id="quote-form-section"
          className="mx-auto w-full"
        >
          <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start xl:gap-14">

            {/* LEFT SIDE */}
            <div className="order-2 flex w-full justify-center pt-22 lg:order-1 lg:justify-end lg:pr-6 xl:pr-10">
              <div className="w-full max-w-[480px] lg:max-w-[500px]">
                <WhyChoose23
                  content={content}
                  embedded
                />
              </div>
            </div>
            {/* RIGHT SIDE — form / thank-you card aligned center-right */}
            <div className="relative z-20 order-1 flex w-full flex-col items-start lg:order-2 lg:items-end lg:justify-center lg:pl-2 xl:pl-4">
              <div className={formColumnClass}>
                <div className={formSubmitted ? "invisible" : undefined} aria-hidden={formSubmitted}>
                  <h2 className="mb-2 text-left text-[38px] font-extrabold leading-none text-[#E49B2E]">
                    {title}
                  </h2>

                  <p className="mb-5 max-w-[500px] text-left text-[16px] leading-[1.3] text-black">
                    {subTitle}
                  </p>
                </div>

                <div className={formCardClass}>
                  {formSubmitted ? (
                    <div className="flex min-h-[380px] flex-col items-center justify-center py-4 text-center">
                      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                        <CheckCircle className="h-9 w-9 text-green-600" />
                      </div>

                      <h4 className="mb-3 text-[22px] font-bold text-white sm:text-[24px]">
                        Thank You!
                      </h4>

                      <p className="mb-6 max-w-[340px] text-[15px] leading-relaxed text-white/90">
                        Your request has been submitted successfully.
                        We&apos;ll contact you shortly with your personalized quote.
                      </p>

                      <button
                        type="button"
                        onClick={closeThankYou}
                        className="flex h-[50px] w-full max-w-[280px] items-center justify-center rounded-[8px] bg-[#EFCD09] px-6 text-[17px] font-bold uppercase tracking-wide text-black transition-all duration-300 hover:opacity-90"
                      >
                        OK Thanks
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="flex w-full flex-col gap-3"
                      noValidate
                    >

                      {/* NAME */}
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="mb-1.5 block text-[14px] font-semibold text-white"
                        >
                          Name <span className="text-red-400">*</span>
                        </label>

                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`
          w-full
          h-[46px]
          rounded-[8px]
          bg-white
          px-4
          text-[15px]
          font-medium
          text-[#222]
          outline-none
          placeholder:text-[#8D8D8D]
          border
          ${errors.name
                              ? "border-red-500"
                              : "border-transparent"
                            }
        `}
                          placeholder="Name"
                          required
                        />

                        {errors.name && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* EMAIL */}
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="mb-1.5 block text-[14px] font-semibold text-white"
                        >
                          Email Address{" "}
                          <span className="text-red-400">*</span>
                        </label>

                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`
          w-full
          h-[46px]
          rounded-[8px]
          bg-white
          px-4
          text-[15px]
          font-medium
          text-[#222]
          outline-none
          placeholder:text-[#8D8D8D]
          border
          ${errors.email
                              ? "border-red-500"
                              : "border-transparent"
                            }
        `}
                          placeholder="Email"
                          required
                        />

                        {errors.email && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* PHONE */}
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="mb-1.5 block text-[14px] font-semibold text-white"
                        >
                          Phone Number{" "}
                          <span className="text-red-400">*</span>
                        </label>

                        <input
                          id="contact-phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`
          w-full
          h-[46px]
          rounded-[8px]
          bg-white
          px-4
          text-[15px]
          font-medium
          text-[#222]
          outline-none
          placeholder:text-[#8D8D8D]
          border
          ${errors.phone
                              ? "border-red-500"
                              : "border-transparent"
                            }
        `}
                          placeholder="Phone"
                          required
                        />

                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* ZIPCODE */}
                      <div>
                        <label
                          htmlFor="contact-zipcode"
                          className="mb-1.5 block text-[14px] font-semibold text-white"
                        >
                          Zip Code{" "}
                          <span className="text-red-400">*</span>
                        </label>

                        <input
                          id="contact-zipcode"
                          type="text"
                          name="zipcode"
                          value={formData.zipcode}
                          onChange={handleChange}
                          className={`
          w-full
          h-[46px]
          rounded-[8px]
          bg-white
          px-4
          text-[15px]
          font-medium
          text-[#222]
          outline-none
          placeholder:text-[#8D8D8D]
          border
          ${errors.zipcode
                              ? "border-red-500"
                              : "border-transparent"
                            }
        `}
                          placeholder="ZIP CODE"
                          required
                        />

                        {errors.zipcode && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.zipcode}
                          </p>
                        )}
                      </div>

                      {/* MESSAGE */}
                      <div>
                        <label
                          htmlFor="contact-message"
                          className="mb-1.5 block text-[14px] font-semibold text-white"
                        >
                          How can we help you?{" "}
                          <span className="text-red-400">*</span>
                        </label>

                        <textarea
                          id="contact-message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className={`
          w-full
          min-h-[88px]
          resize-none
          rounded-[8px]
          bg-white
          px-4
          py-3
          text-[15px]
          font-medium
          text-[#222]
          outline-none
          placeholder:text-[#8D8D8D]
          border
          ${errors.message
                              ? "border-red-500"
                              : "border-transparent"
                            }
        `}
                          placeholder="Message"
                          required
                        />

                        {errors.message && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* BUTTON */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="
        mt-0.5
        flex
        h-[50px]
        w-full
        items-center
        justify-center
        rounded-[8px]
        bg-[#EFCD09]
        px-6
        text-[17px]
        font-bold
        uppercase
        tracking-wide
        text-black
        transition-all
        duration-300
        hover:opacity-90
        disabled:cursor-not-allowed
        disabled:opacity-70
      "
                      >
                        {isSubmitting ? (
                          <span className="inline-flex items-center gap-3">
                            <Loader className="h-5 w-5 animate-spin" />
                            Processing...
                          </span>
                        ) : (
                          "SUBMIT REQUEST"
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}