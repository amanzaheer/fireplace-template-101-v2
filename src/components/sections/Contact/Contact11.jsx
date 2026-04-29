"use client";

import React, { useState, useCallback, memo } from "react";
import { CheckCircle, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { Rubik } from "next/font/google";
import { IMAGE_BASE } from "@/lib/constants";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
} from "@/lib/validators";

const rubik = Rubik({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400", "500", "600", "700"],
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

const inputStyle = {
  width: "100%",
  background: "rgba(26,26,26,0.85)",
  border: "1px solid #555",
  color: "#fff",
  padding: "12px 16px",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const NameInput = memo(({ value, onChange, error }) => (
  <div style={{ width: "100%" }}>
    <input
      type="text"
      name="name"
      value={value}
      onChange={onChange}
      placeholder="First Name"
      required
      style={{ ...inputStyle, borderColor: error ? "#f87171" : "#555" }}
    />
    {error && <p style={{ color: "#fca5a5", fontSize: "12px", marginTop: "4px" }}>{error}</p>}
  </div>
));
NameInput.displayName = "NameInput";

const PhoneInput = memo(({ value, onChange, error }) => (
  <div style={{ width: "100%" }}>
    <input
      type="tel"
      name="phone"
      value={value}
      onChange={onChange}
      placeholder="(123)-456-7890"
      required
      style={{ ...inputStyle, borderColor: error ? "#f87171" : "#555" }}
    />
    {error && <p style={{ color: "#fca5a5", fontSize: "12px", marginTop: "4px" }}>{error}</p>}
  </div>
));
PhoneInput.displayName = "PhoneInput";

const EmailInput = memo(({ value, onChange, error }) => (
  <div style={{ width: "100%" }}>
    <input
      type="email"
      name="email"
      value={value}
      onChange={onChange}
      placeholder="your@email.com"
      required
      style={{ ...inputStyle, borderColor: error ? "#f87171" : "#555" }}
    />
    {error && <p style={{ color: "#fca5a5", fontSize: "12px", marginTop: "4px" }}>{error}</p>}
  </div>
));
EmailInput.displayName = "EmailInput";

const MessageInput = memo(({ value, onChange, error }) => (
  <div style={{ width: "100%" }}>
    <textarea
      name="message"
      value={value}
      onChange={onChange}
      placeholder="Message"
      rows={4}
      required
      style={{
        ...inputStyle,
        resize: "none",
        minHeight: "110px",
        borderColor: error ? "#f87171" : "#555",
      }}
    />
    {error && <p style={{ color: "#fca5a5", fontSize: "12px", marginTop: "4px" }}>{error}</p>}
  </div>
));
MessageInput.displayName = "MessageInput";

export default function Contact11({ content }) {
  const formHead = content?.form_head ?? {};
  const title = formHead.title ?? "GET IN TOUCH WITH US";
  const sectionBgPath = content?.contact?.background_image;
  const sectionBgUrl = buildImageSrc(IMAGE_BASE, sectionBgPath);

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
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (!validateName(formData.name)) newErrors.name = "Name must be 2-50 characters";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email)) newErrors.email = "Please enter a valid email";
    const cleanPhone = formData.phone.replace(/[-()\s]/g, "");
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!validatePhone(cleanPhone)) newErrors.phone = "Must be exactly 10 digits";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (!validateMessage(formData.message, 10)) newErrors.message = "At least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleFirstInteraction();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const nameParts = formData.name.trim().split(" ");
      const payload = {
        first_name: nameParts[0] || "",
        last_name: nameParts.slice(1).join(" ") || "",
        email: formData.email,
        phone: formData.phone.replace(/[-()\s]/g, ""),
        message: formData.message,
      };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Submission failed");
      if (result.success === false) throw new Error(result.message || "Submission failed");
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({ event: "form_submit", url: window.location.href });
      }
      toast.success(result.message || "Submitted! We'll contact you shortly.");
      setFormSubmitted(true);
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeThankYou = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: "leadSubmitted", url: window.location.href });
    }
    setFormSubmitted(false);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setErrors({});
  };

  return (
    /*
     * Outer wrapper: overflow VISIBLE so the form card
     * can bleed 64px below the background section
     */
    <div
      id="contact-us"
      style={{ position: "relative", overflow: "visible", width: "100%" }}
    >
      {/* ── Background section — Figma specs ── */}
      <div
        style={{
          display: "flex",
          padding: "40px clamp(16px, 8vw, 165px) 64px clamp(16px, 8vw, 158px)",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          alignSelf: "stretch",
          minHeight: "540px",
          position: "relative",
          width: "100%",
          overflow: "visible",
          background: sectionBgUrl
            ? `linear-gradient(0deg, rgba(0,0,0,0.57) 0%, rgba(0,0,0,0.57) 100%), url(${sectionBgUrl}) lightgray 0px -0.129px / 100% 230% no-repeat`
            : `linear-gradient(0deg, rgba(0,0,0,0.57) 0%, rgba(0,0,0,0.57) 100%), #1a1a1a`,
        }}
      >
        {/* ── Form Card — Figma: absolute right:190px bottom:-64.167px ── */}
        <div
          className={`${rubik.className} absolute right-[190px] bottom-[-64.167px] z-20 w-[500px] max-sm:!relative max-sm:!right-auto max-sm:!bottom-auto max-sm:!w-full max-sm:mt-8`}
          style={{
            display: "flex",
            padding: "27.778px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "18.056px",
            border: "5.556px solid #EFA536",
            background: "rgba(17, 17, 17, 0.74)",
            boxShadow: "0 5.556px 5.556px 0 rgba(0,0,0,0.25)",
            boxSizing: "border-box",
          }}
        >
          {formSubmitted ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "32px 0",
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "#dcfce7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 24,
                }}
              >
                <CheckCircle style={{ width: 40, height: 40, color: "#16a34a" }} />
              </div>
              <h4 style={{ color: "#fff", fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
                Thank You!
              </h4>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
                Your request has been submitted successfully. We&apos;ll contact you shortly.
              </p>
              <button
                type="button"
                onClick={closeThankYou}
                style={{
                  background: "#efa536",
                  color: "#fff",
                  fontWeight: 700,
                  padding: "10px 32px",
                  fontSize: 14,
                  letterSpacing: "0.05em",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                OK THANKS
              </button>
            </div>
          ) : (
            <>
              {/* Title */}
              <h2
                style={{
                  width: "100%",
                  textAlign: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "22px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  lineHeight: 1.3,
                  margin: 0,
                }}
              >
                {title}
              </h2>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                noValidate
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18.056px",
                  width: "100%",
                }}
              >
                <NameInput value={formData.name} onChange={handleChange} error={errors.name} />
                <PhoneInput value={formData.phone} onChange={handleChange} error={errors.phone} />
                <EmailInput value={formData.email} onChange={handleChange} error={errors.email} />
                <MessageInput value={formData.message} onChange={handleChange} error={errors.message} />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    background: "#efa536",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "16px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "12px 16px",
                    border: "1.389px solid rgba(189, 189, 189, 0.00)",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    opacity: isSubmitting ? 0.7 : 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                    maxWidth: "450px",
                    margin: "0px",            // ❌ remove auto center
                    marginLeft: "20px",     // ✅ shift left
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                >
                  {isSubmitting ? (
                    <Loader style={{ width: 20, height: 20 }} />
                  ) : (
                    "SUBMIT"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/*
       * Spacer: pushes next section down by the same amount
       * the form bleeds below (64.167px), so nothing overlaps
       */}
      <div style={{ height: "64.167px" }} aria-hidden />
    </div>
  );
}