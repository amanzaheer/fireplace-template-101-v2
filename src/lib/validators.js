/**
 * Shared validation functions for forms
 * Used by both client-side (QuoteForm) and server-side (contact API)
 */

export const validateEmail = (email) => {
  if (!email) return false;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  if (!phone) return false;
  return /^\d{10}$/.test(phone.replace(/\D/g, ''));
};

export const validateName = (name) => {
  if (!name) return false;
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  return nameRegex.test(name.trim());
};

export const validateMessage = (message, minLength = 5) => {
  if (!message) return false;
  return message.trim().length >= minLength;
};

export const validateZipcode = (zipcode) => {
  if (!zipcode) return false;
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipcode.trim());
};

export const cleanPhoneNumber = (phone) => {
  if (!phone) return "";
  return phone.replace(/\D/g, "");
};

export const formatPhoneNumber = (value) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

export const sanitizeInput = (input) => {
  if (!input) return "";
  return input
    .trim()
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "");
};
