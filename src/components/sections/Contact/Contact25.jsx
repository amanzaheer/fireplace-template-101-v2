"use client";
import React, { useState, useCallback, memo } from "react";
import Image from "next/image";
import { CheckCircle, Loader, Phone } from "lucide-react";
import toast from "react-hot-toast";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Poppins, Inter, Rubik } from "next/font/google";
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
const rubik = Rubik({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
import {
    validateEmail,
    validatePhone,
    validateName,
    validateMessage,
    validateZipcode,
} from "@/lib/validators";

const inputBase =
    "w-full border border-white bg-transparent px-3 py-2.5 md:py-3 text-white placeholder:text-white/95 outline-none transition-[box-shadow] focus:ring-2 focus:ring-white/60";
const inputError = "ring-2 ring-red-300 border-red-200";

function buildImageSrc(base, filePath) {
    if (!filePath || typeof filePath !== "string") return "";
    const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
    const segment = filePath.replace(/^\//, "");
    return `${basePath}/${segment}`;
}

const NameInput = memo(({ value, onChange, error }) => (
    <div>
        <label htmlFor="contact6-name" className="sr-only">
            Full name (required)
        </label>
        <input
            id="contact6-name"
            type="text"
            name="name"
            value={value}
            onChange={onChange}
            className={`${inputBase} ${error ? inputError : ""}`}
            placeholder="Your Full Name"
            required
            aria-invalid={!!error}
        />
        {error && <p className="text-red-200 text-sm mt-1">{error}</p>}
    </div>
));

const EmailInput = memo(({ value, onChange, error }) => (
    <div>
        <label htmlFor="contact6-email" className="sr-only">
            Email (required)
        </label>
        <input
            id="contact6-email"
            type="email"
            name="email"
            value={value}
            onChange={onChange}
            className={`${inputBase} ${error ? inputError : ""}`}
            placeholder="Your Email ( abc@gmail.com)"
            required
            aria-invalid={!!error}
        />
        {error && <p className="text-red-200 text-sm mt-1">{error}</p>}
    </div>
));

const PhoneInput = memo(({ value, onChange, error }) => (
    <div>
        <label htmlFor="contact6-phone" className="sr-only">
            Phone (required)
        </label>
        <input
            id="contact6-phone"
            type="tel"
            name="phone"
            value={value}
            onChange={onChange}
            className={`${inputBase} ${error ? inputError : ""}`}
            placeholder="(123)-456-7890"
            required
            aria-invalid={!!error}
        />
        {error && <p className="text-red-200 text-sm mt-1">{error}</p>}
    </div>
));

const ZipcodeInput = memo(({ value, onChange, error }) => (
    <div>
        <label htmlFor="contact6-zipcode" className="sr-only">
            ZIP code (required)
        </label>
        <input
            id="contact6-zipcode"
            type="text"
            name="zipcode"
            value={value}
            onChange={onChange}
            className={`${inputBase} uppercase ${error ? inputError : ""}`}
            placeholder="ZIP CODE"
            required
            aria-invalid={!!error}
        />
        {error && <p className="text-red-200 text-sm mt-1">{error}</p>}
    </div>
));

const MessageInput = memo(({ value, onChange, error }) => (
    <div>
        <label htmlFor="contact6-message" className="sr-only">
            Message (required)
        </label>
        <textarea
            id="contact6-message"
            name="message"
            value={value}
            onChange={onChange}
            rows={5}
            className={`${inputBase} min-h-[120px] resize-y ${error ? inputError : ""}`}
            placeholder="Message"
            required
            aria-invalid={!!error}
        />
        {error && <p className="text-red-200 text-sm mt-1">{error}</p>}
    </div>
));

export default function Contact6({ content }) {
    const formHead = content?.form_head ?? {};
    const phoneRaw =
        content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
    const phoneLink = phoneRaw ? `tel:${phoneRaw.replace(/[^\d+]/g, "")}` : "#";

    let line1 = formHead.line1;
    let line2 = formHead.line2;
    let line3 = formHead.line3 ?? formHead.sub_title;
    if (!line1 && formHead.title) {
        const t = String(formHead.title);
        const idx = t.toLowerCase().indexOf("online booking");
        if (idx >= 0) {
            line1 = t.slice(0, idx).trim() || "10% Off Total Price For";
            line2 = t.slice(idx).trim() || "Online Booking";
        } else {
            line1 = t;
            line2 = line2 ?? "Online Booking";
        }
    }
    line1 = line1 ?? "10% Off Total Price For";
    line2 = line2 ?? "Online Booking";
    line3 = line3 ?? "Ask For A Quote Here";

    const contactImage =
        formHead.image ??
        formHead.file_name ??
        content?.banner?.file_name ??
        "about/about.webp";
    const imageSrc = buildImageSrc(IMAGE_BASE, contactImage);

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
        <FullContainer
            id="contact-us"
            className="relative width-full mt-9 bg-transparent pb-6 md:pb-10 font-barlow"
        >
            <Container className="relative z-10 max-w-8xl px-5  sm:px-6 md:px-8">
                <div id="quote-form-section">
                    <div className="overflow-hidden w-full bg-[#000000] shadow-lg">
                        {formSubmitted ? (
                            <div className="flex min-h-[320px] flex-col items-center  justify-center px-6 py-14 text-center text-white">
                                <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white/20">
                                    <CheckCircle className="h-12 w-12 text-white" />
                                </div>
                                <h4 className="mb-4 text-3xl font-bold">Thank You!</h4>
                                <p className="mb-8 max-w-md text-xl text-white/95">
                                    Your request has been submitted successfully. We&apos;ll
                                    contact you shortly with your personalized quote.
                                </p>
                                <button
                                    type="button"
                                    onClick={closeThankYou}
                                    className="rounded-md bg-white px-8 py-3 font-bold text-black transition-colors hover:bg-gray-100"
                                >
                                    OK Thanks
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col lg:flex-row lg:items-stretch lg:gap-0">
                                {/* Left: technician image + callout */}
                                <div className="relative order-2 flex min-h-[280px] w-full shrink-0 flex-col items-center justify-end px-4 pb-8 pt-6 lg:order-1 lg:w-[40%] lg:max-w-[480px] lg:justify-center lg:px-6 lg:pb-10">
                                    <div className="relative h-[260px] w-full max-w-[400px] lg:h-[420px] lg:max-w-none">
                                        {imageSrc ? (
                                            <Image
                                                src={imageSrc}
                                                alt="Our technician — call us today"
                                                fill
                                                className="object-contain object-bottom"
                                                sizes="(max-width: 1024px) 100vw, 40vw"
                                                priority={false}
                                            />
                                        ) : (
                                            <div className="flex h-full items-end justify-center text-white/40">
                                                <Phone className="h-24 w-24" aria-hidden />
                                            </div>
                                        )}
                                    </div>

                                    <div className="relative z-10 -mt-4 w-full max-w-[340px] lg:absolute lg:bottom-8 lg:left-4 lg:right-auto lg:mt-0 lg:max-w-[300px] xl:left-6">
                                        <div className="flex items-center gap-3 rounded-2xl bg-[#F5E500] px-4 py-3 shadow-md">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#6B3D2E]">
                                                <Phone className="h-6 w-6 text-white" aria-hidden />
                                            </div>
                                            <div className="min-w-0 flex-1 text-left">
                                                <p className="text-sm font-extrabold uppercase tracking-wide text-black md:text-base">
                                                    Call Us Today!
                                                </p>
                                                <a
                                                    href={phoneLink}
                                                    className={` ${poppins.className} mt-1 inline-block w-full max-w-full truncate rounded-full bg-white px-3 py-1.5 text-center text-sm font-regular text-black hover:bg-gray-100`}
                                                >
                                                    {phoneRaw || "(123) 456-7890"}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: headings + form */}
                                <div className="order-1 w-full flex-1 px-5 py-8 text-white md:px-8 md:py-10 lg:order-2 lg:pl-4 lg:pr-10 xl:pr-14">
                                    <h2 className={` ${rubik.className} text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-extrabold leading-tight text-white`}>
                                        {line1}
                                    </h2>

                                    <h2 className={` ${rubik.className} mt-1 text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-extrabold leading-tight text-white`}>
                                        {line2}
                                    </h2>

                                    <h2 className={` ${rubik.className} mt-1 text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-extrabold leading-tight text-white`}>
                                        {line3}
                                    </h2>

                                    <form
                                        onSubmit={handleSubmit}
                                        className="mt-8 space-y-4"
                                        noValidate
                                    >
                                        <div className={` ${poppins.className} grid grid-cols-1 gap-4 sm:grid-cols-2`}>
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
                                        <div className={` ${poppins.className} mt-3`}>
                                            <MessageInput
                                                value={formData.message}
                                                onChange={handleChange}
                                                error={errors.message}
                                            />
                                        </div>
                                        <div className="flex justify-center pt-2 md:justify-start">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={` ${poppins.className} min-w-[200px] bg-white px-10 py-3 text-base font-regular uppercase tracking-wide text-black shadow-md transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#FF6611] disabled:opacity-70`}
                                                aria-busy={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <span className="flex items-center   justify-center gap-2">
                                                        <Loader className="h-5 w-5 animate-spin" />
                                                        Processing…
                                                    </span>
                                                ) : (
                                                    "Submit"
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </FullContainer>
    );
}
