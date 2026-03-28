"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Zap, CheckCircle, ArrowRight, Users, Repeat, BadgeCheck, Globe, Palette, Settings, Megaphone, Bot, Wrench, ChevronDown, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WHATSAPP_URL } from "@/lib/constants";

const steps = [
  {
    icon: Users,
    title: "Know someone who needs a website or digital help?",
    description: "Think of a friend, colleague, or business owner who could benefit from a professional website, paid ads, or automation. That's your referral.",
  },
  {
    icon: Zap,
    title: "Send them our way",
    description: "Share our website or just send us a WhatsApp with their name and contact. We'll take it from there — no follow-up needed from you.",
  },
  {
    icon: Gift,
    title: "Get paid when they sign",
    description: "Once they sign a contract and pay the deposit, we transfer your reward. Simple, transparent, no paperwork.",
  },
];

type RewardRow = {
  service: string;
  price: string;
  reward: string;
  note?: string;
  pitch: string;
  bullets: string[];
  link?: string;
};

type RewardCategory = {
  title: string;
  type: "one-time" | "recurring";
  color: string;
  icon: React.ElementType;
  rows: RewardRow[];
};

const rewardCategories: RewardCategory[] = [
  {
    title: "Website Packages",
    type: "one-time",
    color: "cyan",
    icon: Globe,
    rows: [
      {
        service: "Starter Website",
        price: "CHF 690",
        reward: "CHF 69",
        note: "Paid on deposit",
        pitch: "Perfect for new businesses, freelancers, or anyone who needs a clean online presence fast. Delivered in 4–5 days — no waiting weeks.",
        bullets: ["One-page custom website", "AI-written copy included", "Booking widget + WhatsApp button", "Mobile responsive", "Delivered in 4–5 days"],
        link: "/services/web-design",
      },
      {
        service: "Professional Website",
        price: "CHF 1,390",
        reward: "CHF 139",
        note: "Paid on deposit",
        pitch: "For established solopreneurs ready to upgrade. Multi-page, multi-language, with SEO baked in from day one.",
        bullets: ["5-page website", "2 languages included", "1 automation included", "SEO foundations", "Delivered in 5–6 days"],
        link: "/services/web-design",
      },
      {
        service: "Business Pro Website",
        price: "CHF 1,990",
        reward: "CHF 199",
        note: "Paid on deposit",
        pitch: "The full package for SMEs. Up to 10 service pages, 3 languages, lead capture system — everything to compete online seriously.",
        bullets: ["5 core pages + up to 10 service pages", "3 languages included", "SEO + lead capture system", "Delivered in 6–7 days"],
        link: "/services/web-design",
      },
      {
        service: "Campaign Landing Page",
        price: "CHF 350",
        reward: "CHF 35",
        note: "Paid on deposit",
        pitch: "A conversion-focused single page for ad campaigns, product launches, or lead magnets. Built to convert traffic into leads.",
        bullets: ["Conversion-optimized design", "Integrated with ads tracking", "CTA + lead capture form", "Fast delivery"],
        link: "/services/web-design",
      },
    ],
  },
  {
    title: "Branding",
    type: "one-time",
    color: "pink",
    icon: Palette,
    rows: [
      {
        service: "Logo Only",
        price: "CHF 299",
        reward: "CHF 30",
        note: "Paid on delivery",
        pitch: "A professional logo in 3 variations. Great for new businesses or rebrands that just need the mark — clean, scalable, and delivered fast.",
        bullets: ["3 logo variations (light, dark, icon)", "Vector files included", "Ready for web + print"],
      },
      {
        service: "Full Brand Kit",
        price: "CHF 549",
        reward: "CHF 55",
        note: "Paid on delivery",
        pitch: "Everything a business needs to look professional everywhere. Logo, colors, fonts, business cards, and a social media kit — all in one package.",
        bullets: ["Logo (3 variations)", "Color palette + typography", "Brand guidelines document", "Business cards design", "Social media kit (profile + cover images)"],
      },
    ],
  },
  {
    title: "Setup & Quick Wins",
    type: "one-time",
    color: "amber",
    icon: Settings,
    rows: [
      {
        service: "Google Business Profile Setup",
        price: "CHF 249",
        reward: "CHF 25",
        pitch: "Local businesses live and die by their GBP. A fully optimized profile with photos, services, and 3 posts — boosts local visibility immediately.",
        bullets: ["Full GBP setup or optimization", "Photos, services, categories set", "3 posts published", "Shows up better in Google Maps"],
      },
      {
        service: "Analytics & Tracking Setup (GA4)",
        price: "CHF 329",
        reward: "CHF 33",
        pitch: "Essential for any business running ads. Without tracking, you're flying blind. We set up GA4 + Meta Pixel so every click is measured.",
        bullets: ["Google Analytics 4 setup", "Meta Pixel installation", "Conversion events configured", "Dashboard + reporting ready"],
      },
      {
        service: "Email Domain Setup",
        price: "CHF 169",
        reward: "CHF 17",
        pitch: "Professional email like paulo@yourbusiness.ch instead of Gmail. Sets up Google Workspace or Microsoft 365 — makes any business look credible.",
        bullets: ["Professional email address setup", "Google Workspace or Microsoft 365", "Email signatures configured", "Mobile + desktop access"],
      },
      {
        service: "Website Audit",
        price: "CHF 99",
        reward: "CHF 10",
        pitch: "The easiest sell — CHF 99 for a 1-page report with 5 specific improvements. Perfect foot-in-the-door for clients who are hesitant to commit.",
        bullets: ["1-page PDF report", "5 specific actionable improvements", "SEO + speed + UX assessed", "Delivered within 48h"],
      },
      {
        service: "Speed Optimization",
        price: "CHF 129",
        reward: "CHF 13",
        pitch: "A slow website loses customers and ranks lower on Google. One-time fix: caching, image compression, and performance boost.",
        bullets: ["Image compression", "Caching setup", "Core Web Vitals improvement", "Better Google rankings"],
      },
      {
        service: "Google Business Boost",
        price: "CHF 69",
        reward: "CHF 7",
        pitch: "Fastest win for any local business. Quick GBP optimization + 3 posts published. Great entry-point service.",
        bullets: ["Quick GBP optimization", "3 posts published", "Category + attributes updated"],
      },
      {
        service: "Automation Assessment",
        price: "CHF 149",
        reward: "CHF 15",
        pitch: "We analyze their workflow and deliver a PDF identifying 3–5 processes they could automate. Sells itself — and often leads to a full automation project.",
        bullets: ["In-depth workflow review", "1-page PDF with 3–5 automation opportunities", "ROI estimate per automation", "Delivered within 48h"],
        link: "/services/business-automation",
      },
    ],
  },
  {
    title: "Website Add-Ons",
    type: "one-time",
    color: "teal",
    icon: Wrench,
    rows: [
      {
        service: "Blog / CMS Setup",
        price: "CHF 350",
        reward: "CHF 35",
        pitch: "Gives the client a blog they can actually edit themselves — no developer needed after setup. Great for SEO and content marketing.",
        bullets: ["Sanity or Notion-powered CMS", "Client can add/edit posts with no code", "SEO-ready blog structure"],
        link: "/services/seo-development",
      },
      {
        service: "Extra Service Page",
        price: "CHF 80/page",
        reward: "CHF 8/page",
        pitch: "Each additional service page targets a new keyword and expands their Google presence. Low cost, high SEO value.",
        bullets: ["SEO-optimized page", "Matches existing design", "Indexed and submitted to Google"],
        link: "/services/seo-development",
      },
      {
        service: "Extra Language",
        price: "From CHF 100",
        reward: "From CHF 10",
        note: "Scales with site size",
        pitch: "Reach more customers in their native language. AI-assisted translation + proper hreflang tags so Google ranks each language correctly.",
        bullets: ["AI-assisted translation", "hreflang tags setup", "Language switcher added", "Price scales with number of pages"],
      },
      {
        service: "Local SEO Boost",
        price: "CHF 199",
        reward: "CHF 20",
        pitch: "Structured data (schema), Search Console setup, sitemap submission — the technical SEO foundation most websites are missing.",
        bullets: ["Schema markup added", "Google Search Console configured", "Sitemap submitted", "Bing Webmaster Tools setup"],
        link: "/services/seo-development",
      },
      {
        service: "Social Proof Widget",
        price: "CHF 99",
        reward: "CHF 10",
        pitch: "Auto-updating Google Reviews feed embedded on the website. Nothing sells better than real client reviews visible right on the homepage.",
        bullets: ["Google Reviews auto-synced", "Embedded widget on website", "Boosts trust and conversions"],
      },
      {
        service: "Newsletter Integration",
        price: "CHF 149",
        reward: "CHF 15",
        pitch: "Email list = owned audience. We set up the signup form + a welcome email automation so every subscriber gets followed up automatically.",
        bullets: ["Brevo or Mailchimp connected", "Signup form embedded on site", "Welcome email automation active"],
      },
      {
        service: "Review Collection Automation",
        price: "CHF 329",
        reward: "CHF 33",
        pitch: "Most businesses have happy clients who never leave reviews. This sends 3 automated emails after a job is done asking for a Google review.",
        bullets: ["3-email automated sequence", "Triggered after job completion", "Direct link to Google Review form", "More 5-star reviews on autopilot"],
        link: "/services/business-automation",
      },
      {
        service: "Appointment Booking System",
        price: "CHF 369",
        reward: "CHF 37",
        pitch: "Replaces back-and-forth scheduling with a professional booking widget. Syncs with Google Calendar and sends reminders automatically.",
        bullets: ["Cal.com or Calendly setup", "Google Calendar sync", "Automated reminders (email + SMS)", "Embedded on website"],
        link: "/services/business-automation",
      },
      {
        service: "Lead Capture System",
        price: "CHF 449",
        reward: "CHF 45",
        pitch: "Turns website visitors into leads — automatically. Form submission triggers a CRM entry, an auto-reply email, and a team notification.",
        bullets: ["Contact form → CRM pipeline", "Auto-reply email to lead", "Team notification (email or WhatsApp)", "Full lead tracking"],
        link: "/services/business-automation",
      },
      {
        service: "AI FAQ Chatbot",
        price: "CHF 699–850",
        reward: "CHF 70–85",
        pitch: "A chatbot trained on the client's own content — answers FAQs, qualifies leads, and works 24/7 without any human involvement.",
        bullets: ["Trained on client's content", "Handles FAQs automatically", "Lead qualification built-in", "Embedded on website", "+ API usage costs"],
        link: "/services/ai-integration",
      },
    ],
  },
  {
    title: "Marketing & Ads (Monthly)",
    type: "recurring",
    color: "purple",
    icon: Megaphone,
    rows: [
      {
        service: "Meta Ads Management",
        price: "CHF 349/mo",
        reward: "CHF 52/mo",
        note: "× 6 months = CHF 314",
        pitch: "Full Meta Ads management — Facebook + Instagram. We handle the strategy, creatives, targeting, retargeting, A/B tests, and monthly reporting. Ad spend is paid separately to Meta.",
        bullets: ["Campaign setup + ongoing management", "Ad creative (copy + visuals)", "Audience targeting + retargeting", "A/B testing", "Monthly performance report"],
        link: "/services/social-media-marketing",
      },
      {
        service: "Google Ads Management",
        price: "CHF 399/mo",
        reward: "CHF 60/mo",
        note: "× 6 months = CHF 359",
        pitch: "Capture high-intent buyers searching on Google. We run Search + Display campaigns with full keyword research, ad copy, and conversion tracking. Ad spend paid separately.",
        bullets: ["Keyword research", "Search + Display campaigns", "Ad copy written and tested", "Conversion tracking setup", "Monthly analytics report"],
        link: "/services/social-media-marketing",
      },
      {
        service: "Meta + Google Bundle",
        price: "CHF 649/mo",
        reward: "CHF 97/mo",
        note: "× 6 months = CHF 584",
        pitch: "Both channels managed together — Meta for awareness + retargeting, Google for intent-driven search. Unified strategy and reporting. Saves CHF 99/mo vs. buying separately.",
        bullets: ["Everything in Meta + Google Ads plans", "Cross-channel strategy", "Unified monthly report", "Save CHF 99/mo vs. separate"],
        link: "/services/social-media-marketing",
      },
      {
        service: "Social Media Management – Starter",
        price: "CHF 299/mo",
        reward: "CHF 45/mo",
        note: "× 6 months = CHF 269",
        pitch: "For businesses that need a consistent social presence but don't have time to post. 8 posts/month on 1 platform, fully handled.",
        bullets: ["8 posts/month", "1 platform (Instagram, Facebook, or LinkedIn)", "Content creation + scheduling", "No client effort needed"],
        link: "/services/social-media-marketing",
      },
      {
        service: "Social Media Management – Growth",
        price: "CHF 399/mo",
        reward: "CHF 60/mo",
        note: "× 6 months = CHF 359",
        pitch: "Scale across 2 platforms with stories and engagement management included. Builds community, not just posts.",
        bullets: ["12 posts/month", "2 platforms", "Stories included", "Engagement management"],
        link: "/services/social-media-marketing",
      },
      {
        service: "Social Media Management – Pro",
        price: "CHF 649/mo",
        reward: "CHF 97/mo",
        note: "× 6 months = CHF 584",
        pitch: "Full social media presence across 3 platforms with Reels and a monthly strategy call. For brands that want to dominate their niche online.",
        bullets: ["16 posts/month", "3 platforms", "Reels included", "Monthly strategy call"],
        link: "/services/social-media-marketing",
      },
    ],
  },
  {
    title: "AI & Automation Setup",
    type: "one-time",
    color: "emerald",
    icon: Bot,
    rows: [
      {
        service: "AI Workflow – Light",
        price: "CHF 600–1,200",
        reward: "CHF 60–120",
        pitch: "Simple automation connecting their existing tools — forms, emails, CRM, Slack, WhatsApp. Built on n8n or Make. Saves hours of manual work every week.",
        bullets: ["App-to-app automation", "Built on n8n or Make", "e.g. Form → CRM → Email → Notification", "Delivered in 1–2 weeks"],
        link: "/services/business-automation",
      },
      {
        service: "AI Workflow – Full",
        price: "CHF 1,500–5,000",
        reward: "CHF 150–500",
        pitch: "Complex multi-step automations with AI decision-making. Think intelligent routing, content generation, scoring, and fully automated pipelines.",
        bullets: ["Multi-step complex automation", "AI decision logic included", "API integrations", "Full documentation + handover"],
        link: "/services/ai-integration",
      },
      {
        service: "AI Customer Support Agent",
        price: "CHF 2,500–9,000",
        reward: "CHF 250–900",
        pitch: "A 24/7 AI agent that handles customer queries, bookings, and escalations — without a human. Huge ROI for businesses with repetitive support load.",
        bullets: ["Handles FAQs, bookings, complaints", "Available 24/7", "Escalates to human when needed", "WhatsApp + website + email channels"],
        link: "/services/ai-integration",
      },
      {
        service: "AI Sales & Outreach Agent",
        price: "CHF 2,500–7,000",
        reward: "CHF 250–700",
        pitch: "Automated lead prospecting, personalized outreach, and follow-up sequences powered by AI. For businesses that want to scale outbound without hiring.",
        bullets: ["Lead sourcing + enrichment", "Personalized outreach emails", "Automated follow-up sequences", "CRM integration"],
        link: "/services/ai-integration",
      },
      {
        service: "AI Voice Agent",
        price: "CHF 4,000–10,000",
        reward: "CHF 400–1,000",
        pitch: "An AI that answers phone calls, qualifies leads, and books appointments — sounds human, works around the clock. Game-changer for service businesses.",
        bullets: ["Answers inbound calls", "Qualifies leads by voice", "Books appointments in real-time", "Per-minute cost billed to client"],
        link: "/services/ai-integration",
      },
      {
        service: "AI Knowledge-Base / RAG",
        price: "CHF 3,500–10,000",
        reward: "CHF 350–1,000",
        pitch: "AI trained on the client's own documents, manuals, and data. Answers complex internal or customer questions instantly — like a company expert available 24/7.",
        bullets: ["Trained on client's own documents", "Answers complex queries instantly", "Internal staff tool or customer-facing", "Continuously updatable"],
        link: "/services/ai-integration",
      },
    ],
  },
];

const colorMap: Record<string, { badge: string; header: string; icon: string; expand: string }> = {
  cyan:    { badge: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",    header: "bg-cyan-500/10 border-cyan-500/20",    icon: "text-cyan-400",    expand: "bg-cyan-500/5 border-cyan-500/10" },
  pink:    { badge: "bg-pink-500/15 text-pink-400 border-pink-500/20",    header: "bg-pink-500/10 border-pink-500/20",    icon: "text-pink-400",    expand: "bg-pink-500/5 border-pink-500/10" },
  amber:   { badge: "bg-amber-500/15 text-amber-400 border-amber-500/20", header: "bg-amber-500/10 border-amber-500/20", icon: "text-amber-400",   expand: "bg-amber-500/5 border-amber-500/10" },
  teal:    { badge: "bg-teal-500/15 text-teal-400 border-teal-500/20",    header: "bg-teal-500/10 border-teal-500/20",    icon: "text-teal-400",    expand: "bg-teal-500/5 border-teal-500/10" },
  purple:  { badge: "bg-purple-500/15 text-purple-400 border-purple-500/20", header: "bg-purple-500/10 border-purple-500/20", icon: "text-purple-400", expand: "bg-purple-500/5 border-purple-500/10" },
  indigo:  { badge: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20", header: "bg-indigo-500/10 border-indigo-500/20", icon: "text-indigo-400", expand: "bg-indigo-500/5 border-indigo-500/10" },
  emerald: { badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20", header: "bg-emerald-500/10 border-emerald-500/20", icon: "text-emerald-400", expand: "bg-emerald-500/5 border-emerald-500/10" },
};

const perks = [
  "No referral limit — refer 10 clients, earn 10 times",
  "No expiry on your referrals",
  "Paid via bank transfer (IBAN) or Twint",
  "You don't need to be a client yourself to refer",
  "We handle all the sales — you just make the intro",
  "Refer someone AND hire us? You get 20% off one service",
];

export default function ReferralPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (key: string) => setExpanded(prev => prev === key ? null : key);

  return (
    <>
      <Navbar />
      <main className="bg-[#080d1a] min-h-screen text-white">

        {/* Hero */}
        <section className="relative pt-40 pb-24 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />
            <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[100px]" />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`, backgroundSize: "60px 60px", maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)" }} />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-6">
              <Gift className="w-4 h-4" />
              Referral Program
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-[1.1]">
              Refer a client.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Get paid.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
              Know someone who needs a website, paid ads, or automations? Make the intro and earn up to{" "}
              <span className="text-white font-semibold">10% per project</span> or{" "}
              <span className="text-white font-semibold">15% of their monthly retainer</span> for 6 months. No limits. No forms. Just a WhatsApp message.
            </motion.p>
            <motion.a initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-400 text-[#080d1a] font-bold text-lg hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] hover:-translate-y-0.5">
              Send a referral now
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </section>

        {/* How it works */}
        <section className="relative py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">How it works</p>
              <h2 className="text-3xl md:text-4xl font-extrabold">3 steps. That&apos;s it.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5">
                    <step.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="absolute top-6 right-6 text-5xl font-black text-white/5 select-none leading-none">{i + 1}</div>
                  <h3 className="text-lg font-bold text-white mb-3 leading-snug">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dual benefit banner */}
        <section className="py-12 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-amber-500/10 p-8 md:p-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                  <Gift className="w-7 h-7 text-amber-400" />
                </div>
                <div className="flex-1">
                  <p className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-2">Bonus perk for referrers</p>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">
                    Refer someone <span className="text-amber-400">&amp;</span> become a client yourself? Get <span className="text-amber-400">20% off</span> one service.
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                    If you refer a client to us and later decide to hire us yourself, you unlock a <strong className="text-white">20% discount on any single service</strong> — website, ads, automation, branding, whatever you need. No expiry. Just let us know you referred someone and the discount is yours.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Rewards tables */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-3">What you earn</p>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Your rewards, by service</h2>
              <p className="text-slate-400 text-sm">One-time services pay <span className="text-white font-semibold">10%</span> on deposit. Monthly services pay <span className="text-white font-semibold">15% for 6 months</span>. Click any service to see the pitch.</p>
            </div>

            <div className="space-y-10">
              {rewardCategories.map((cat, ci) => {
                const c = colorMap[cat.color];
                return (
                  <motion.div key={ci} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.06 }} className="rounded-2xl border border-white/10 overflow-hidden">

                    {/* Category header */}
                    <div className={`flex items-center gap-3 px-6 py-4 border-b border-white/10 ${c.header}`}>
                      <cat.icon className={`w-5 h-5 ${c.icon}`} />
                      <span className="font-bold text-white text-sm uppercase tracking-wider">{cat.title}</span>
                      <span className={`ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${c.badge}`}>
                        {cat.type === "recurring" && <Repeat className="w-3 h-3" />}
                        {cat.type === "one-time" ? "10% one-time" : "15% × 6 months"}
                      </span>
                    </div>

                    {/* Column headers */}
                    <div className="grid grid-cols-3 px-6 py-2 bg-white/5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <span>Service</span>
                      <span className="text-center">Price</span>
                      <span className="text-right">Your Reward</span>
                    </div>

                    {/* Rows */}
                    {cat.rows.map((row, ri) => {
                      const key = `${ci}-${ri}`;
                      const isOpen = expanded === key;
                      return (
                        <div key={ri} className="border-t border-white/5">
                          {/* Clickable row */}
                          <button
                            onClick={() => toggle(key)}
                            className="w-full grid grid-cols-3 px-6 py-3.5 items-center hover:bg-white/[0.04] transition-colors text-left cursor-pointer"
                          >
                            <span className="flex items-center gap-2 text-sm text-white font-medium pr-4">
                              <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${c.icon}`} />
                              {row.service}
                            </span>
                            <span className="text-center text-sm text-slate-400">{row.price}</span>
                            <span className="text-right">
                              <span className="inline-flex flex-col items-end">
                                <span className={`text-sm font-bold ${c.icon}`}>{row.reward}</span>
                                {row.note && <span className="text-xs text-slate-600">{row.note}</span>}
                              </span>
                            </span>
                          </button>

                          {/* Expanded details */}
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className={`px-6 py-5 border-t border-white/5 ${c.expand}`}>
                                  <p className="text-slate-300 text-sm leading-relaxed mb-4 italic">&ldquo;{row.pitch}&rdquo;</p>
                                  <ul className="space-y-1.5 mb-4">
                                    {row.bullets.map((b, bi) => (
                                      <li key={bi} className="flex items-center gap-2 text-xs text-slate-400">
                                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.icon.replace("text-", "bg-")}`} />
                                        {b}
                                      </li>
                                    ))}
                                  </ul>
                                  {row.link && (
                                    <a href={row.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 text-xs font-semibold ${c.icon} hover:underline`}>
                                      View full service page
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </motion.div>
                );
              })}
            </div>

            <p className="text-center text-xs text-slate-600 mt-6">Rewards are paid after the referred client completes their deposit or first monthly payment. Monthly rewards are transferred at the end of each month.</p>
          </div>
        </section>

        {/* Perks */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">The fine print (it&apos;s not fine print)</p>
              <h2 className="text-3xl md:text-4xl font-extrabold">No catches. Seriously.</h2>
            </div>
            <div className="space-y-4">
              {perks.map((perk, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/5">
                  <BadgeCheck className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-white font-medium">{perk}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="p-10 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
              <CheckCircle className="w-10 h-10 text-cyan-400 mx-auto mb-5" />
              <h2 className="text-3xl font-extrabold mb-4">Ready to make your first referral?</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Just drop us a WhatsApp with the name and contact of who you&apos;re referring. We&apos;ll take it from there and keep you updated on every step.
              </p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-400 text-[#080d1a] font-bold text-lg hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] hover:-translate-y-0.5">
                Send referral on WhatsApp
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
