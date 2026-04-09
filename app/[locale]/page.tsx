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

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Lopes2Tech | Premium Websites & Digital Marketing — Zurich",
    description: "Premium websites, automation, AI, and digital marketing for Swiss SMEs. More leads, less admin — built fast and priced below Zurich market rates.",
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: { "x-default": `${BASE_URL}/en`, en: `${BASE_URL}/en`, de: `${BASE_URL}/de`, pt: `${BASE_URL}/pt`, fr: `${BASE_URL}/fr`, it: `${BASE_URL}/it` },
    },
    openGraph: {
      title: "Lopes2Tech — Premium Websites, Automation & Digital Marketing for Swiss Businesses",
      description: "Premium websites, automation, AI, and digital marketing for Swiss SMEs. More leads, less admin — built fast and priced below Zurich market rates.",
      url: `${BASE_URL}/${locale}`,
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
