import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/contact";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "Contact Lopes2Tech | Free Consultation for Your Digital Project",
    description: "Get in touch for a free consultation. Web development, SEO, AI integration, and business automation services in Zurich, Switzerland. EN/DE/PT.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}` },
    },
    openGraph: { title: "Contact Lopes2Tech | Free Consultation", description: "Get in touch for a free consultation. Web development, SEO, AI, and automation in Zurich.", url: canonical },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
