import Stripe from "stripe";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

// ─── Stripe client ────────────────────────────────────────────────────────────
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2026-02-25.clover",
});

// Instantiated lazily inside the handler so a missing key never crashes at module load time
let resend: Resend | null = null;
function getResend(): Resend {
    if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
    return resend;
}

// ─── Ebook catalog ─────────────────────────────────────────────────────────────
// Maps every known payment link ID (test + live) → book data.
// Add live link IDs here once you switch to production.
const EBOOK_BY_LINK: Record<string, { key: string; title: string; driveUrl: string }> = {
    // ── TEST payment links ──────────────────────────────────────────────────
    plink_1TEVrXGisvlguHA4pMeVTAPK: {
        key: "freud",
        title: "The Freud They Never Taught You",
        driveUrl: process.env.GDRIVE_FREUD ?? "",
    },
    plink_1TEVrYGisvlguHA4a3fmoRgW: {
        key: "tesla",
        title: "The Tesla They Never Taught You",
        driveUrl: process.env.GDRIVE_TESLA ?? "",
    },
    plink_1TEVraGisvlguHA4cO10K9e4: {
        key: "switzerland",
        title: "100 Things Switzerland",
        driveUrl: process.env.GDRIVE_SWITZERLAND ?? "",
    },
    plink_1TEVrbGisvlguHA4aGjnHFko: {
        key: "portugal",
        title: "100 Things Portugal",
        driveUrl: process.env.GDRIVE_PORTUGAL ?? "",
    },
    // productivity tracker removed from shop — keeping entry so old test links
    // don't cause "unknown payment link" warnings in logs
    plink_1TEVrcGisvlguHA4IjLuBu0V: {
        key: "productivity",
        title: "30-Day Productivity Tracker",
        driveUrl: process.env.GDRIVE_PRODUCTIVITY ?? "",
    },
    // ── LIVE payment links ──────────────────────────────────────────────────
    plink_1TEVURKFYmYe9kBZW19ReLCp: {
        key: "freud",
        title: "The Freud They Never Taught You",
        driveUrl: process.env.GDRIVE_FREUD ?? "",
    },
    plink_1TEVUSKFYmYe9kBZbCH9j0D5: {
        key: "tesla",
        title: "The Tesla They Never Taught You",
        driveUrl: process.env.GDRIVE_TESLA ?? "",
    },
    plink_1TEVUTKFYmYe9kBZ8PdM2hgD: {
        key: "switzerland",
        title: "100 Things Switzerland",
        driveUrl: process.env.GDRIVE_SWITZERLAND ?? "",
    },
    plink_1TEVUUKFYmYe9kBZwxOimYAU: {
        key: "portugal",
        title: "100 Things Portugal",
        driveUrl: process.env.GDRIVE_PORTUGAL ?? "",
    },
    plink_1TEVUVKFYmYe9kBZT7UO2i9P: {
        key: "productivity",
        title: "30-Day Productivity Tracker",
        driveUrl: process.env.GDRIVE_PRODUCTIVITY ?? "",
    },
};

// ─── Email builder ─────────────────────────────────────────────────────────────
function buildEbookEmail(params: {
    buyerName: string;
    bookTitle: string;
    driveUrl: string;
}): { subject: string; html: string; text: string } {
    const { buyerName, bookTitle, driveUrl } = params;

    const subject = `Your download is ready — ${bookTitle}`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Logo / brand -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                Lopes2Tech
              </span>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#1e293b;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:40px 36px;">

              <!-- Checkmark -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    <div style="width:64px;height:64px;background:linear-gradient(135deg,#06b6d4,#a855f7);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:30px;line-height:64px;text-align:center;">
                      ✓
                    </div>
                  </td>
                </tr>

                <!-- Heading -->
                <tr>
                  <td align="center" style="padding-bottom:8px;">
                    <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;line-height:1.2;">
                      Your book is ready!
                    </h1>
                  </td>
                </tr>

                <!-- Subheading -->
                <tr>
                  <td align="center" style="padding-bottom:32px;">
                    <p style="margin:0;font-size:15px;color:#94a3b8;line-height:1.5;">
                      Hi ${buyerName ? `<strong style="color:#e2e8f0;">${buyerName}</strong>, thank` : "Thank"} you for your purchase.<br/>
                      Your copy of <strong style="color:#e2e8f0;">${bookTitle}</strong> is waiting for you.
                    </p>
                  </td>
                </tr>

                <!-- Download button -->
                <tr>
                  <td align="center" style="padding-bottom:32px;">
                    <a href="${driveUrl}"
                       style="display:inline-block;background:linear-gradient(135deg,#06b6d4,#a855f7);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:10px;letter-spacing:0.3px;">
                      Download your ebook →
                    </a>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="border-top:1px solid rgba(255,255,255,0.08);padding-top:28px;padding-bottom:20px;">
                    <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:#e2e8f0;">
                      📌 Quick tips
                    </p>
                    <p style="margin:0 0 8px;font-size:13px;color:#94a3b8;">
                      • The file opens in any PDF reader — phone, tablet, or computer.
                    </p>
                    <p style="margin:0 0 8px;font-size:13px;color:#94a3b8;">
                      • On mobile: tap the link → tap the three-dot menu → <em>Open in…</em> → choose your PDF app.
                    </p>
                    <p style="margin:0;font-size:13px;color:#94a3b8;">
                      • Save a copy to your device so you can read offline anytime.
                    </p>
                  </td>
                </tr>

                <!-- Support line -->
                <tr>
                  <td style="padding-top:8px;">
                    <p style="margin:0;font-size:12px;color:#64748b;line-height:1.6;">
                      Questions or issues with your download? Reply to this email or contact
                      <a href="mailto:paulo@lopes2tech.ch" style="color:#06b6d4;text-decoration:none;">paulo@lopes2tech.ch</a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:28px;">
              <p style="margin:0;font-size:11px;color:#475569;">
                © ${new Date().getFullYear()} Lopes2Tech · Zurich, Switzerland ·
                <a href="https://lopes2tech.ch/en/ebooks" style="color:#475569;text-decoration:none;">Browse more books</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

    const text = `
Hi ${buyerName || "there"},

Thank you for your purchase! Your copy of "${bookTitle}" is ready to download.

Download link:
${driveUrl}

The file opens in any PDF reader. Save it to your device to read offline.

Questions? Contact paulo@lopes2tech.ch

— Lopes2Tech
`.trim();

    return { subject, html, text };
}

// ─── Webhook handler ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    const body = await req.text();
    const sig  = req.headers.get("stripe-signature") ?? "";

    const webhookSecret =
        process.env.NODE_ENV === "production"
            ? process.env.STRIPE_WEBHOOK_SECRET
            : process.env.STRIPE_WEBHOOK_SECRET_TEST;

    if (!webhookSecret) {
        console.error("Missing STRIPE_WEBHOOK_SECRET env var");
        return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    // ── Verify signature ──────────────────────────────────────────────────────
    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // ── Handle checkout.session.completed ─────────────────────────────────────
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        // Skip if payment wasn't successful
        if (session.payment_status !== "paid") {
            return NextResponse.json({ received: true, skipped: "not paid" });
        }

        const paymentLinkId = session.payment_link as string | null;

        if (!paymentLinkId) {
            console.warn("No payment_link on session:", session.id);
            return NextResponse.json({ received: true, skipped: "no payment link" });
        }

        const book = EBOOK_BY_LINK[paymentLinkId];

        if (!book) {
            console.warn("Unknown payment link:", paymentLinkId);
            return NextResponse.json({ received: true, skipped: "unknown payment link" });
        }

        if (!book.driveUrl) {
            console.error(`Google Drive URL not configured for book: ${book.key}`);
            return NextResponse.json({ error: "Drive URL not configured" }, { status: 500 });
        }

        // ── Get buyer info ──────────────────────────────────────────────────────
        const buyerEmail = session.customer_details?.email ?? "";
        const buyerName  = session.customer_details?.name  ?? "";

        if (!buyerEmail) {
            console.error("No buyer email in session:", session.id);
            return NextResponse.json({ error: "No customer email" }, { status: 400 });
        }

        // ── Send email ──────────────────────────────────────────────────────────
        const { subject, html, text } = buildEbookEmail({
            buyerName,
            bookTitle: book.title,
            driveUrl:  book.driveUrl,
        });

        const { error } = await getResend().emails.send({
            from: `Lopes2Tech Books <${process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}>`,
            to: buyerEmail,
            subject,
            html,
            text,
        });

        if (error) {
            // Return 200 so Stripe does NOT retry — the payment is complete and a retry
            // would trigger a duplicate email on the next attempt.
            // The missing email is logged; handle manually if needed.
            console.error(`❌ Email delivery failed for ${book.key} → ${buyerEmail}:`, error);
        } else {
            console.log(`✅ Ebook email sent: ${book.key} → ${buyerEmail}`);
        }
    }

    return NextResponse.json({ received: true });
}
