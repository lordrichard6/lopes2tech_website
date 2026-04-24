import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhoIsLopes2Tech from "@/components/WhoIsLopes2Tech";
import FeaturedProjects from "@/components/FeaturedProjects";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import MultiWaveTransition from "@/components/MultiWaveTransition";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import LogoTicker from "@/components/LogoTicker";

const BASE_URL = "https://www.lopes2tech.ch";

const metaByLocale: Record<string, { title: string; description: string; ogTitle: string; ogDesc: string }> = {
  en: {
    title: "Lopes2Tech | Premium Websites & Digital Marketing — Zurich",
    description: "Premium websites, automation, AI, and digital marketing for Swiss SMEs. More leads, less admin — built fast and priced below Zurich market rates.",
    ogTitle: "Lopes2Tech — Premium Websites, Automation & Digital Marketing for Swiss Businesses",
    ogDesc: "Premium websites, automation, AI, and digital marketing for Swiss SMEs. More leads, less admin — built fast and priced below Zurich market rates.",
  },
  de: {
    title: "Lopes2Tech | Premium Websites & Digitales Marketing — Zürich",
    description: "Premium Websites, Automatisierung, KI und digitales Marketing für Schweizer KMU. Mehr Leads, weniger Verwaltung — schnell umgesetzt, unter Züricher Marktpreisen.",
    ogTitle: "Lopes2Tech — Premium Websites, Automatisierung & Digitales Marketing für Schweizer Unternehmen",
    ogDesc: "Premium Websites, Automatisierung, KI und digitales Marketing für Schweizer KMU. Mehr Leads, weniger Verwaltung — schnell umgesetzt, unter Züricher Marktpreisen.",
  },
  pt: {
    title: "Lopes2Tech | Websites Premium e Marketing Digital — Zurique",
    description: "Websites premium, automação, IA e marketing digital para PMEs suíças. Mais leads, menos burocracia — entregues rápido e abaixo dos preços de mercado de Zurique.",
    ogTitle: "Lopes2Tech — Websites Premium, Automação e Marketing Digital para Empresas Suíças",
    ogDesc: "Websites premium, automação, IA e marketing digital para PMEs suíças. Mais leads, menos burocracia — entregues rápido e abaixo dos preços de mercado de Zurique.",
  },
  fr: {
    title: "Lopes2Tech | Sites Web Premium & Marketing Digital — Zurich",
    description: "Sites web premium, automatisation, IA et marketing digital pour les PME suisses. Plus de leads, moins d'administration — livrés rapidement et en dessous des tarifs du marché zurichois.",
    ogTitle: "Lopes2Tech — Sites Web Premium, Automatisation & Marketing Digital pour les Entreprises Suisses",
    ogDesc: "Sites web premium, automatisation, IA et marketing digital pour les PME suisses. Plus de leads, moins d'administration — livrés rapidement et en dessous des tarifs du marché zurichois.",
  },
  it: {
    title: "Lopes2Tech | Siti Web Premium e Marketing Digitale — Zurigo",
    description: "Siti web premium, automazione, IA e marketing digitale per le PMI svizzere. Più contatti, meno burocrazia — realizzati rapidamente e sotto i prezzi di mercato di Zurigo.",
    ogTitle: "Lopes2Tech — Siti Web Premium, Automazione e Marketing Digitale per le Aziende Svizzere",
    ogDesc: "Siti web premium, automazione, IA e marketing digitale per le PMI svizzere. Più contatti, meno burocrazia — realizzati rapidamente e sotto i prezzi di mercato di Zurigo.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = metaByLocale[locale] ?? metaByLocale.en;
  const canonical = `${BASE_URL}/${locale}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en`, en: `${BASE_URL}/en`, de: `${BASE_URL}/de`, pt: `${BASE_URL}/pt`, fr: `${BASE_URL}/fr`, it: `${BASE_URL}/it` },
    },
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDesc,
      url: canonical,
      siteName: "Lopes2Tech",
      type: "website",
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Lopes2Tech" }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description: meta.ogDesc,
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <LogoTicker />
      <WhoIsLopes2Tech />
      <ErrorBoundary>
        <FeaturedProjects />
      </ErrorBoundary>
      <Services />
      <ErrorBoundary>
        <Portfolio />
      </ErrorBoundary>
      <Process />
      <MultiWaveTransition />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
