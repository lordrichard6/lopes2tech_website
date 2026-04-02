"use server";

import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/constants";

const resend = new Resend(process.env.RESEND_API_KEY);

/** Escapes user input for safe use inside HTML email bodies */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function esc(val: string | undefined | null): string {
  if (!val) return "—";
  return escapeHtml(val).replace(/\n/g, "<br/>");
}

export interface WebsiteOnboardingData {
  // Step 1
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  city: string;
  // Step 2
  businessDescription: string;
  idealClients: string;
  differentiator: string;
  primaryAction: string;
  // Step 3
  hasBranding: boolean;
  brandColors: string;
  wantsLogoImprovement: boolean;
  websiteFeeling: string[];
  inspirationUrl1: string;
  inspirationUrl2: string;
  inspirationUrl3: string;
  stylesToAvoid: string;
  // Step 4
  hasDomain: boolean;
  domainName: string;
  contentApproach: string; // "client" | "agency"
  assetsApproach: string;  // "all" | "some" | "agency"
  // Step 5
  desiredLaunchDate: string;
  additionalNotes: string;
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 12px;color:#94a3b8;font-size:13px;white-space:nowrap;vertical-align:top;width:200px;">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;color:#e2e8f0;font-size:13px;vertical-align:top;">${value}</td>
    </tr>
  `;
}

function section(title: string, rows: string): string {
  return `
    <div style="margin-bottom:32px;">
      <h2 style="margin:0 0 12px 0;font-size:15px;font-weight:700;color:#22d3ee;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid #1e3a5f;padding-bottom:8px;">${escapeHtml(title)}</h2>
      <table style="width:100%;border-collapse:collapse;background:#0f2340;border-radius:8px;overflow:hidden;">
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

export async function submitWebsiteOnboarding(
  data: WebsiteOnboardingData
): Promise<{ success: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY environment variable");
    return { success: false, error: "Server configuration error" };
  }

  try {
    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/Zurich",
      dateStyle: "full",
      timeStyle: "short",
    });

    const step1Rows =
      row("Full Name", esc(data.fullName)) +
      row("Business Name", esc(data.businessName)) +
      row("Email", esc(data.email)) +
      row("Phone / WhatsApp", esc(data.phone)) +
      row("City / Location", esc(data.city));

    const step2Rows =
      row("Business Description", esc(data.businessDescription)) +
      row("Ideal Clients", esc(data.idealClients)) +
      row("Differentiator", esc(data.differentiator)) +
      row("#1 Visitor Action", esc(data.primaryAction));

    const step3Rows =
      row("Has Existing Branding", data.hasBranding ? "Yes" : "No") +
      (data.hasBranding ? row("Brand Colors", esc(data.brandColors)) : "") +
      (data.hasBranding ? row("Wants Logo Improvement", data.wantsLogoImprovement ? "Yes" : "No") : "") +
      row(
        "Website Feeling",
        data.websiteFeeling.length > 0
          ? data.websiteFeeling.map((f) => escapeHtml(f)).join(", ")
          : "—"
      ) +
      row("Inspiration Site 1", esc(data.inspirationUrl1)) +
      row("Inspiration Site 2", esc(data.inspirationUrl2)) +
      row("Inspiration Site 3", esc(data.inspirationUrl3)) +
      row("Styles to Avoid", esc(data.stylesToAvoid));

    const step4Rows =
      row("Has Domain", data.hasDomain ? "Yes" : "No") +
      row(data.hasDomain ? "Current Domain" : "Desired Domain", esc(data.domainName)) +
      row(
        "Website Copywriting",
        data.contentApproach === "client"
          ? "Client provides all copy"
          : data.contentApproach === "agency"
          ? "Lopes2Tech creates copy (AI-assisted, SEO-optimised)"
          : "—"
      ) +
      row(
        "Website Assets",
        data.assetsApproach === "all"
          ? "Client provides all images & assets"
          : data.assetsApproach === "some"
          ? "Client provides some assets, Lopes2Tech fills the rest"
          : data.assetsApproach === "agency"
          ? "Lopes2Tech creates all assets"
          : "—"
      );

    const step5Rows =
      row("Desired Launch Date", esc(data.desiredLaunchDate)) +
      row("Additional Notes", esc(data.additionalNotes));

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0a1628;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:680px;margin:0 auto;padding:32px 24px;">

    <div style="margin-bottom:32px;">
      <h1 style="margin:0 0 4px 0;font-size:22px;font-weight:800;color:#ffffff;">
        🌐 New Website Onboarding
      </h1>
      <p style="margin:0;color:#64748b;font-size:14px;">${escapeHtml(data.businessName)} &mdash; ${escapeHtml(data.fullName)}</p>
    </div>

    ${section("Step 1 — Your Details", step1Rows)}
    ${section("Step 2 — Your Business", step2Rows)}
    ${section("Step 3 — Design & Brand", step3Rows)}
    ${section("Step 4 — Domain & Content", step4Rows)}
    ${section("Step 5 — Timeline", step5Rows)}

    <p style="margin:32px 0 0 0;color:#334155;font-size:12px;border-top:1px solid #1e2d3d;padding-top:16px;">
      Submitted via lopes2tech.ch onboarding form &mdash; ${escapeHtml(timestamp)} (Zurich)
    </p>
  </div>
</body>
</html>
    `;

    // 1. Internal notification → Paulo
    const { error: internalError } = await resend.emails.send({
      from: `Lopes2Tech Onboarding <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
      to: process.env.CONTACT_EMAIL || CONTACT_EMAIL,
      subject: `🌐 New Website Onboarding — ${data.businessName} (${data.fullName})`,
      html,
    });

    if (internalError) {
      console.error("Resend onboarding error (internal):", internalError);
      return { success: false, error: internalError.message };
    }

    // 2. Confirmation email → client
    const clientHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">

    <div style="text-align:center;margin-bottom:32px;">
      <img src="https://lopes2tech.ch/logo_b.svg" alt="Lopes2Tech" width="140" style="display:inline-block;" />
    </div>

    <h1 style="margin:0 0 12px 0;font-size:22px;font-weight:800;color:#0f172a;text-align:center;">
      Thank you, ${escapeHtml(data.fullName.split(" ")[0])}!
    </h1>
    <p style="margin:0 0 24px 0;font-size:15px;color:#475569;text-align:center;line-height:1.6;">
      We received your onboarding information for <strong>${escapeHtml(data.businessName)}</strong>.<br/>
      We'll review everything and get back to you within <strong>24 hours</strong>.
    </p>

    <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:24px;">
      <p style="margin:0 0 16px 0;font-size:13px;font-weight:600;color:#0f172a;text-transform:uppercase;letter-spacing:0.05em;">
        What happens next
      </p>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;align-items:flex-start;gap:12px;">
          <span style="flex-shrink:0;width:24px;height:24px;background:#ecfeff;border:1px solid #a5f3fc;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#0891b2;text-align:center;line-height:24px;">1</span>
          <p style="margin:0;font-size:14px;color:#475569;line-height:1.5;">Paulo reviews your onboarding form and prepares a personalised proposal.</p>
        </div>
        <div style="display:flex;align-items:flex-start;gap:12px;">
          <span style="flex-shrink:0;width:24px;height:24px;background:#ecfeff;border:1px solid #a5f3fc;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#0891b2;text-align:center;line-height:24px;">2</span>
          <p style="margin:0;font-size:14px;color:#475569;line-height:1.5;">You'll receive a reply via email within 24 hours with next steps and pricing.</p>
        </div>
        <div style="display:flex;align-items:flex-start;gap:12px;">
          <span style="flex-shrink:0;width:24px;height:24px;background:#ecfeff;border:1px solid #a5f3fc;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#0891b2;text-align:center;line-height:24px;">3</span>
          <p style="margin:0;font-size:14px;color:#475569;line-height:1.5;">We schedule a short discovery call to align on goals and kick off the project.</p>
        </div>
      </div>
    </div>

    <p style="margin:0 0 8px 0;font-size:14px;color:#475569;text-align:center;">
      Questions in the meantime? Just reply to this email.
    </p>

    <p style="margin:32px 0 0 0;font-size:13px;color:#94a3b8;text-align:center;border-top:1px solid #e2e8f0;padding-top:24px;">
      Lopes2Tech &mdash; Rüschlikon, Switzerland<br/>
      <a href="https://lopes2tech.ch" style="color:#0891b2;text-decoration:none;">lopes2tech.ch</a>
    </p>

  </div>
</body>
</html>
    `;

    const { error: clientError } = await resend.emails.send({
      from: `Paulo @ Lopes2Tech <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
      to: data.email,
      subject: `We received your onboarding — ${data.businessName}`,
      html: clientHtml,
    });

    if (clientError) {
      // Don't fail the whole submission if the confirmation email fails
      console.error("Resend onboarding error (client confirmation):", clientError);
    }

    return { success: true };
  } catch (err) {
    console.error("Failed to send onboarding email:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}
