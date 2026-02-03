"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsOfService() {
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
                        General Terms and Conditions (AGB)
                    </h1>
                    <div className="flex gap-6 text-slate-400">
                        <p>Effective Date: December 11, 2025</p>
                        <p>Last updated: {new Date().toLocaleDateString()}</p>
                    </div>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-12 text-slate-300 leading-relaxed"
                >
                    {/* 1. Scope */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">1. Scope of Application</h2>
                        <p>
                            These General Terms and Conditions (hereinafter "GTC") apply to all business relationships between <strong>Lopes2Tech / Paulo Lopes</strong> (hereinafter "Contractor") and its customers (hereinafter "Client"). They apply to all services provided, including but not limited to website development, software engineering, AI automations, and consulting.
                        </p>
                    </section>

                    {/* 2. Subject */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">2. Subject of the Contract</h2>
                        <p className="mb-6">
                            The Contractor provides services in the field of IT and automation. The specific scope of services is defined in the respective individual offer or service contract.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                                <h3 className="font-semibold text-cyan-400 mb-2">Web & Software</h3>
                                <p className="text-sm text-slate-400">Development of websites, applications, and dashboards.</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                                <h3 className="font-semibold text-purple-400 mb-2">AI & Automation</h3>
                                <p className="text-sm text-slate-400">Implementation of chatbots, voice agents, and workflow automations.</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                                <h3 className="font-semibold text-green-400 mb-2">Maintenance</h3>
                                <p className="text-sm text-slate-400">Ongoing support and hosting services.</p>
                            </div>
                        </div>
                    </section>

                    {/* 3. Conclusion */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">3. Conclusion of Contract</h2>
                        <p className="mb-4">
                            Offers made by the Contractor are valid for 30 days unless otherwise stated. The contract is concluded upon:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-300">
                            <li>The written acceptance of the offer by the Client (email is sufficient).</li>
                            <li>The payment of an initial deposit.</li>
                            <li>The commencement of actual service provision by the Contractor with the Client's knowledge.</li>
                        </ul>
                    </section>

                    {/* 4. Client Obligations */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">4. Client Obligations</h2>
                        <p className="mb-4">The Client agrees to:</p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-300">
                            <li>Provide all necessary content (text, images, logos) in a timely manner.</li>
                            <li>Grant the necessary access rights (hosting, API keys, domain registrar) required for the project.</li>
                            <li>Review deliverables and provide feedback within <strong>5 working days</strong>. If no feedback is received within this period, the deliverable is deemed accepted.</li>
                        </ul>
                    </section>

                    {/* 5. Pricing */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">5. Pricing and Payment Terms</h2>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-medium text-white mb-4">5.1 Project Services</h3>
                                <p className="mb-4 text-slate-400">Unless otherwise agreed in the individual offer, the following payment terms apply:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                        <h4 className="font-bold text-white mb-2">Small Projects</h4>
                                        <span className="text-xs uppercase tracking-wider text-slate-500 block mb-3">Up to CHF 2,500</span>
                                        <p className="text-sm">100% of the project fee is due immediately upon conclusion of the contract.</p>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                        <h4 className="font-bold text-white mb-2">Standard & Large Projects</h4>
                                        <span className="text-xs uppercase tracking-wider text-slate-500 block mb-3">Above CHF 2,500</span>
                                        <ul className="text-sm space-y-2">
                                            <li><strong>50% Deposit:</strong> Due immediately to reserve resources.</li>
                                            <li><strong>50% Final Payment:</strong> Due upon completion/delivery.</li>
                                        </ul>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm text-slate-400">Invoices are payable within 20 days net.</p>
                            </div>

                            <div>
                                <h3 className="text-xl font-medium text-white mb-4">5.2 Recurring Services</h3>
                                <p>
                                    Fees for ongoing maintenance or SaaS components (e.g., Chatbot hosting) are billed monthly or annually in advance. The cancellation period for recurring services is 30 days to the end of the month, unless a minimum contract term was agreed upon.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 6. Intellectual Property */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">6. Intellectual Property & Usage Rights</h2>
                        <ul className="list-disc pl-6 space-y-3 text-slate-300">
                            <li>Upon full payment of the agreed fee, the Client receives the usage rights for the created software/website.</li>
                            <li>The Contractor retains the right to reuse generic code modules, libraries, and design patterns developed during the project for other clients (standard software engineering practice).</li>
                            <li>The Client guarantees that all materials provided to the Contractor (images, texts) do not violate third-party rights.</li>
                        </ul>
                    </section>

                    {/* 7. AI Provisions */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">7. Specific Provisions for AI Services</h2>
                        <p className="mb-4">
                            The Client acknowledges that services involving Artificial Intelligence (AI) (e.g., Chatbots, RAG systems, Voice Agents) depend on third-party providers (e.g., OpenAI, Anthropic, Retell AI).
                        </p>
                        <div className="space-y-4">
                            <div className="flex gap-4 items-start">
                                <span className="font-bold text-white min-w-[100px]">Accuracy:</span>
                                <p className="text-slate-400">The Contractor cannot guarantee that AI outputs are 100% accurate. The Client is responsible for verifying critical information generated by AI.</p>
                            </div>
                            <div className="flex gap-4 items-start">
                                <span className="font-bold text-white min-w-[100px]">Availability:</span>
                                <p className="text-slate-400">The Contractor is not liable for service interruptions caused by third-party API failures (e.g., if ChatGPT is down).</p>
                            </div>
                            <div className="flex gap-4 items-start">
                                <span className="font-bold text-white min-w-[100px]">Costs:</span>
                                <p className="text-slate-400">Unless strictly included in a flat fee, variable API usage costs (token usage) may be billed to the Client or paid directly by the Client to the provider.</p>
                            </div>
                        </div>
                    </section>

                    {/* 8. Warranty */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">8. Warranty and Liability</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">8.1 Warranty</h3>
                                <p className="mb-2">The Contractor warrants that the software/website is functional and free of critical defects at the time of acceptance. The warranty period is 3 months from delivery.</p>
                                <p className="text-slate-400 text-sm">The warranty does not cover defects caused by third-party updates (e.g., a WordPress plugin update breaking the site) or unauthorized changes by the Client.</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">8.2 Liability</h3>
                                <p className="mb-2">To the extent permitted by Swiss law, the Contractor's liability is limited to intent and gross negligence. Liability for slight negligence, indirect damages, or consequential damages (e.g., loss of profit, data loss) is excluded.</p>
                                <p className="text-slate-400 text-sm">The Contractor is not liable for data privacy violations caused by the Client's misuse of the provided tools (e.g., entering patient data into a non-secure field).</p>
                            </div>
                        </div>
                    </section>

                    {/* 9. Data Protection */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">9. Data Protection and Confidentiality</h2>
                        <p>
                            Both parties agree to treat all business secrets and confidential information obtained during the business relationship as strictly confidential. The Contractor processes personal data in accordance with the Swiss Federal Act on Data Protection (nDSG).
                        </p>
                    </section>

                    {/* 10. Final Provisions */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">10. Final Provisions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <h4 className="font-medium text-white mb-1">Severability</h4>
                                <p className="text-sm text-slate-400">Should individual provisions of these GTC be invalid, the validity of the remaining provisions shall remain unaffected.</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-white mb-1">Place of Jurisdiction</h4>
                                <p className="text-sm text-slate-400">The exclusive place of jurisdiction for all disputes arising from this contract is Zurich, Switzerland.</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-white mb-1">Applicable Law</h4>
                                <p className="text-sm text-slate-400">Swiss law applies exclusively.</p>
                            </div>
                        </div>
                    </section>
                </motion.div>
            </div>
        </main>
    );
}
