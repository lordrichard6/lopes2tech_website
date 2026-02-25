import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/services/social-media-marketing";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "Social Media Marketing for Zurich Businesses | From CHF 249/mo | Lopes2Tech",
    description: "AI-powered social media management for Swiss businesses. Instagram, Facebook, LinkedIn. Professional content creation from CHF 249/month.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}` },
    },
    openGraph: { title: "Social Media Marketing | Lopes2Tech", description: "AI-powered social media management from CHF 249/month for Swiss businesses.", url: canonical },
  };
}

export default function SocialMediaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
