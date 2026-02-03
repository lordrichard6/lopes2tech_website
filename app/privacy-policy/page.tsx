"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-[#0f172a] text-white pt-24 pb-16 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[100px]" />
            </div>

            <div className="relative z-10 container max-w-[800px] mx-auto px-6">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-xl text-slate-400">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-12 text-slate-300 leading-relaxed"
                >
                    {/* 1. General Information */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">1. General Information</h2>
                        <p className="mb-4">
                            At Lopes2Tech, we take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with the statutory data protection regulations—specifically the Swiss Federal Act on Data Protection (nFADP/nDSG) and, where applicable, the EU General Data Protection Regulation (GDPR).
                        </p>
                        <p>
                            This privacy policy explains how we collect, use, and protect your data when you visit our website or use our services.
                        </p>
                    </section>

                    {/* 2. Responsible Person */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">2. Responsible Person (Controller)</h2>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                            <p className="mb-2">The responsible party for data processing on this website is:</p>
                            <p className="font-semibold text-white">Lopes2Tech / Paulo Lopes</p>
                            <p>Email: <a href="mailto:paulo@lopes2tech.ch" className="text-cyan-400 hover:underline">paulo@lopes2tech.ch</a></p>
                            <p>Website: <a href="https://lopes2tech.ch" className="text-cyan-400 hover:underline">www.lopes2tech.ch</a></p>
                        </div>
                    </section>

                    {/* 3. Data Collection */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">3. Data Collection and Processing</h2>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-medium text-white mb-3">3.1 Server Log Files</h3>
                                <p className="mb-3">When you access our website, the provider of the pages automatically collects and stores information in so-called "server log files," including:</p>
                                <ul className="list-disc pl-6 space-y-1 mb-3 text-slate-400">
                                    <li>Browser type and browser version</li>
                                    <li>Operating system used</li>
                                    <li>Referrer URL</li>
                                    <li>Hostname of the accessing computer</li>
                                    <li>Time of the server request</li>
                                    <li>IP address</li>
                                </ul>
                                <p className="text-sm italic text-slate-500">
                                    This data is not merged with other data sources. The processing is based on our legitimate interest in the technically error-free presentation and optimization of our website.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-medium text-white mb-3">3.2 Contact Form and Email</h3>
                                <p>
                                    If you send us inquiries via the contact form or email, your details from the inquiry form, including the contact details you provided there (Name, Email, Phone, Company/Practice), will be stored by us for the purpose of processing the inquiry and in case of follow-up questions. We do not pass on this data without your consent.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-medium text-white mb-3">3.3 Appointment Booking (Cal.com)</h3>
                                <p className="mb-3">
                                    We use the service Cal.com to offer online appointment booking. When you book an appointment, the data you enter (Name, Email, Phone, Reason for Appointment) is processed by Cal.com.
                                </p>
                                <ul className="list-disc pl-6 space-y-1 mb-3 text-slate-400">
                                    <li><strong>Provider:</strong> Cal.com, Inc. (USA/Global)</li>
                                    <li><strong>Purpose:</strong> Scheduling and calendar management</li>
                                </ul>
                                <p className="text-sm italic text-slate-500">
                                    Please check Cal.com's privacy policy for details on how they handle data.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-medium text-white mb-3">3.4 AI Chatbot Assistant</h3>
                                <p className="mb-3">Our website utilizes an AI-powered chatbot to assist with inquiries. When you interact with the chat:</p>
                                <ul className="list-disc pl-6 space-y-1 mb-3 text-slate-400">
                                    <li>The text you input is processed to generate a response.</li>
                                    <li className="text-orange-300/90">Important: Do not enter sensitive health data (patient names, medical conditions) into the public website chatbot.</li>
                                    <li>Data may be processed by third-party AI providers (e.g., OpenAI, Anthropic) solely for the purpose of generating the answer.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 4. Cookies */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">4. Cookies</h2>
                        <p className="mb-4">
                            Our website uses "cookies." These are small text files that are stored on your device.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                <h4 className="font-semibold text-white mb-1">Essential Cookies</h4>
                                <p className="text-sm text-slate-400">Necessary for the technical operation of the website.</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                <h4 className="font-semibold text-white mb-1">Analytical Cookies</h4>
                                <p className="text-sm text-slate-400">Help us understand how visitors use the site.</p>
                            </div>
                        </div>
                        <p className="text-sm italic text-slate-500">
                            You can configure your browser to reject cookies, but this may limit the functionality of the website.
                        </p>
                    </section>

                    {/* 5. Analytics */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">5. Analytics and Third-Party Tools</h2>
                        <p>
                            To improve our service, we may use analytics tools (e.g., Google Analytics or Vercel Analytics). These tools use cookies to analyze user behavior. The IP addresses are typically anonymized before processing. You can opt-out of this tracking via our Cookie Banner or your browser settings.
                        </p>
                    </section>

                    {/* 6. Security */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">6. Data Security (SSL/TLS)</h2>
                        <p>
                            For security reasons and to protect the transmission of confidential content, such as orders or inquiries you send to us, this site uses SSL or TLS encryption. You can recognize an encrypted connection by the fact that the address line of the browser changes from "http://" to "https://" and by the lock symbol in your browser line.
                        </p>
                    </section>

                    {/* 7. Data Transfer */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">7. Data Transfer to Third Parties and Abroad</h2>
                        <p>
                            We only pass on your data to third parties if this is necessary for the fulfillment of the contract (e.g., hosting, scheduling tools) or if you have consented. Some of these service providers may be located outside of Switzerland (e.g., USA). In these cases, we ensure that appropriate data protection safeguards (such as Standard Contractual Clauses) are in place to comply with Swiss nDSG and GDPR standards.
                        </p>
                    </section>

                    {/* 8. Your Rights */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">8. Your Rights</h2>
                        <p className="mb-3">You have the right to:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-300">
                            <li>Request information about your stored personal data at any time.</li>
                            <li>Request the correction of incorrect data.</li>
                            <li>Request the deletion of your data (Right to be forgotten), provided there are no legal retention obligations.</li>
                            <li>Revoke your consent to data processing at any time.</li>
                        </ul>
                        <p>
                            To exercise these rights, please contact us directly at <a href="mailto:paulo@lopes2tech.ch" className="text-cyan-400 hover:underline">paulo@lopes2tech.ch</a>.
                        </p>
                    </section>

                    {/* 9. Changes */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">9. Changes to this Privacy Policy</h2>
                        <p>
                            We reserve the right to adapt this privacy policy so that it always complies with current legal requirements or to implement changes to our services in the privacy policy (e.g., when introducing new services). The new privacy policy will then apply to your next visit.
                        </p>
                    </section>
                </motion.div>
            </div>
        </main>
    );
}
