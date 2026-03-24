import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Lopes2Tech - AI & Automations: Tech-Accelerated Growth for Modern Business",
    description: "We help Swiss SMEs get more leads, automate admin, and scale without complexity. Web development, SEO, AI integration, and business automation in Zurich.",
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: { "x-default": `${BASE_URL}/en`, en: `${BASE_URL}/en`, de: `${BASE_URL}/de`, pt: `${BASE_URL}/pt`, fr: `${BASE_URL}/fr`, it: `${BASE_URL}/it` },
    },
    openGraph: {
      title: "Lopes2Tech - Websites & Automations for Service Businesses",
      description: "We help small and medium companies get more leads, automate admin, and scale without complexity.",
      url: `${BASE_URL}/${locale}`,
    },
  };
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ErrorBoundary>
        <FeaturedProjects />
      </ErrorBoundary>
      <Services />
      <ErrorBoundary>
        <Portfolio />
      </ErrorBoundary>
      <Process />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
