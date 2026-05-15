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

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function QuoteForm10({
  data,
  form_head,
  showArrowInButton = false,
}) {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialState);

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
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form start",
        url: window.location.href,
      });
      setFormStarted(true);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Name is required";
    } else if (!validateName(formData.firstName)) {
      newErrors.firstName =
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
        formattedValue = `(${digits.slice(0, 3)}) ${digits.slice(
          3,
          6
        )}-${digits.slice(6, 10)}`;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.firstName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      toast.success("Submitted successfully!");
      setFormSubmitted(true);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialState);
    setFieldErrors({});
    setFormSubmitted(false);
  };

  const fieldBase =
    "h-[50px] w-full rounded-[12px] border border-black/60 bg-white px-3 text-[19px] text-black outline-none focus:border-black placeholder:text-[13px] placeholder:text-black/60";

  const cardClass =
    "mx-auto mt-8 h-auto min-h-[480px] w-full max-w-[444px] rounded-[14.8px] border border-[#cfcfcf] bg-[#5484a6] p-6 shadow-[0_8px_28px_rgba(0,0,0,0.18)] sm:min-h-[500px] lg:mx-0 lg:mt-15 lg:ml-12 lg:h-[540px]";

  return (
    <div className={`${poppins.className} ${cardClass}`}>
      {!formSubmitted ? (
        <form onSubmit={handleSubmit} className="flex h-full flex-col gap-3">
          <h3 className="text-center text-[30px] font-bold uppercase text-white">
            {form_head?.title || "GET IN TOUCH"}
          </h3>

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onFocus={handleFirstInteraction}
            className={fieldBase}
            placeholder="First Name"
          />

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onFocus={handleFirstInteraction}
            className={fieldBase}
            placeholder="Last Name"
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onFocus={handleFirstInteraction}
            className={fieldBase}
            placeholder="(123) 456-7890"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={handleFirstInteraction}
            className={fieldBase}
            placeholder="your@email.com"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className="w-full min-h-[90px] rounded-[14px] border border-black/60 bg-[#ffffff] px-3 py-2 text-[19px] text-black outline-none resize-none placeholder:text-[13px] placeholder:text-black/60"
            placeholder="Message"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-[55px] w-full rounded-[8px] bg-[#ff4d4d] text-[24px] font-bold uppercase text-white"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader className="animate-spin" />
                Submitting...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      ) : (
        <div className="flex h-full flex-col items-center justify-center text-center text-white px-4">
          <CheckCircle size={60} />

          <h2 className="mt-4 text-2xl font-bold">Thank You!</h2>

          <p className="mt-2 text-sm text-white/80">
            Your request has been submitted successfully.
          </p>

          <p className="mt-1 text-sm text-white/70">
            We will contact you shortly.
          </p>

          <button
            onClick={resetForm}
            className="mt-6 rounded-lg bg-white px-5 py-2 text-sm font-semibold text-black-500 hover:bg-gray-200 transition"
          >
            OK Thanks
          </button>
        </div>
      )}
    </div>
  );
}