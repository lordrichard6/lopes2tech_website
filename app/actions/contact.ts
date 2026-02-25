"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: {
    name: string;
    email: string;
    company: string;
    phone: string;
    message: string;
}) {
    if (!process.env.RESEND_API_KEY) {
        console.error("Missing RESEND_API_KEY environment variable");
        return { success: false, error: "Server configuration error" };
    }

    try {
        const { name, email, company, phone, message } = formData;

        const { data, error } = await resend.emails.send({
            from: `Lopes2Tech Contact Form <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
            to: process.env.CONTACT_EMAIL || "paulo@lopes2tech.ch",
            subject: `New Contact Request from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Company: ${company || "N/A"}
Phone: ${phone || "N/A"}

Message:
${message}
            `,
            html: `
<h3>New Contact Request from Lopes2Tech Website</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company || "N/A"}</p>
<p><strong>Phone:</strong> ${phone || "N/A"}</p>
<br/>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br/>')}</p>
            `,
        });

        if (error) {
            console.error("Resend error:", error);
            return { success: false, error: error.message };
        }


        return { success: true, data };
    } catch (error) {
        console.error("Failed to send email:", error);
        return { success: false, error: "An unexpected error occurred." };
    }
}

export async function sendServiceRequestEmail(formData: {
    name: string;
    email: string;
    company: string;
    message: string;
    context: string;
}) {
    if (!process.env.RESEND_API_KEY) {
        console.error("Missing RESEND_API_KEY environment variable");
        return { success: false, error: "Server configuration error" };
    }

    try {
        const { name, email, company, message, context } = formData;

        const { data, error } = await resend.emails.send({
            from: `Lopes2Tech Service Request <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
            to: process.env.CONTACT_EMAIL || "paulo@lopes2tech.ch",
            subject: `New Service Request: ${context} from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Company: ${company || "N/A"}
Requested Package/Service: ${context}

Message:
${message}
            `,
            html: `
<h3>New Service package Request</h3>
<p><strong>Package/Service Context:</strong> ${context}</p>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company || "N/A"}</p>
<br/>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br/>')}</p>
            `,
        });

        if (error) {
            console.error("Resend error:", error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        console.error("Failed to send service request email:", error);
        return { success: false, error: "An unexpected error occurred." };
    }
}
