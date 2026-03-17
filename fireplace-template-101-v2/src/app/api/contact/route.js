import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
  validateZipcode,
  cleanPhoneNumber,
  sanitizeInput,
} from "@/lib/validators";
import { createRateLimiter } from "@/lib/rate-limit";
import { getPageData } from "@/lib/page-data";

const limiter = createRateLimiter({ windowMs: 60_000, max: 5 });

export async function POST(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const { allowed, retryAfter } = limiter.check(ip);
  if (!allowed) {
    return Response.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  try {
    const body = await request.json();
    const firstName = sanitizeInput(body.first_name ?? "");
    const lastName = sanitizeInput(body.last_name ?? "");
    const email = sanitizeInput(body.email ?? "");
    const phone = cleanPhoneNumber(body.phone ?? "");
    const zipcode = sanitizeInput(body.zipcode ?? "");
    const message = sanitizeInput(body.message ?? "");

    const errors = [];

    if (!firstName.trim()) errors.push("First name is required");
    else if (!validateName(firstName)) errors.push("First name must be 2-50 characters and contain only letters");

    if (!lastName.trim()) errors.push("Last name is required");
    else if (!validateName(lastName)) errors.push("Last name must be 2-50 characters and contain only letters");

    if (!email.trim()) errors.push("Email is required");
    else if (!validateEmail(email)) errors.push("Please enter a valid email address");

    if (!phone) errors.push("Phone number is required");
    else if (!validatePhone(phone)) errors.push("Phone number must be exactly 10 digits");

    if (zipcode && !validateZipcode(zipcode)) errors.push("Please enter a valid zipcode (12345 or 12345-6789)");

    if (!message.trim()) errors.push("Message is required");
    else if (!validateMessage(message, 10)) errors.push("Message must be at least 10 characters long");

    if (errors.length > 0) {
      return Response.json(
        { success: false, message: "Validation failed", errors },
        { status: 400 }
      );
    }

    // Extract domain from Host header
    const host = request.headers.get("host") || "";
    const domain = host.replace(/^www\./, "").split(":")[0];

    // Per-domain CRM config from datastore, fall back to env vars
    let crmUrl = process.env.CRM_URL && process.env.CRM_FORM_PATH
      ? process.env.CRM_URL + process.env.CRM_FORM_PATH
      : process.env.CRM_URL || null;
    let crmToken = process.env.CRM_TOKEN;
    let industryCode = process.env.CRM_INDUSTRY_CODE;

    try {
      const config = await getPageData(host, null, { domainDataOnly: true });
      if (config?.domainData) {
        const d = config.domainData;
        if (d.crm_url) {
          crmUrl = d.crm_form_path ? d.crm_url + d.crm_form_path : d.crm_url;
        }
        if (d.crm_token) crmToken = d.crm_token;
        if (d.crm_industry_code) industryCode = d.crm_industry_code;
      }
    } catch (configErr) {
      console.error("[CRM] Failed to fetch domain config:", configErr.message);
    }

    if (crmUrl && crmToken) {
      try {
        const crmPayload = {
          industry_code: industryCode || "103",
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          message: zipcode ? `${message} | Zipcode: ${zipcode}` : message,
          domain,
        };
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const crmRes = await fetch(crmUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: crmToken,
          },
          body: JSON.stringify(crmPayload),
          signal: controller.signal,
        });
        clearTimeout(timeout);
        if (!crmRes.ok) {
          console.error(`[CRM] LogicalCRM ${crmRes.status}: ${await crmRes.text().catch(() => "")}`);
        }
      } catch (crmErr) {
        console.error("[CRM] Failed to send to LogicalCRM:", crmErr.message);
      }
    }

    return Response.json({
      success: true,
      message: "Your request has been submitted successfully! We'll contact you shortly.",
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return Response.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
