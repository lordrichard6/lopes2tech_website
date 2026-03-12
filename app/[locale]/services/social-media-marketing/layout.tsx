import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/services/social-media-marketing";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "Social Media Marketing | Lopes2Tech - Digital Marketing for Swiss Businesses",
    description: "Social media marketing and digital advertising for Swiss companies. AI-powered content strategy, Meta ads, LinkedIn campaigns, and landing page optimisation. Based in Zurich.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}` },
    },
    openGraph: {
      title: "Social Media Marketing | Lopes2Tech",
      description: "AI-powered social media and digital marketing campaigns that bring qualified leads to Swiss businesses.",
      url: canonical,
    },
  };
}

export default function SocialMediaMarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
