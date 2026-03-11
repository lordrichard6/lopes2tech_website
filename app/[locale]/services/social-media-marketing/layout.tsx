import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/services/social-media-marketing";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "Digital Marketing for Zurich Businesses | From CHF 299/mo | Lopes2Tech",
    description: "AI-powered digital marketing and social media management for Swiss businesses. Meta & Instagram ads, content creation, community management. Packages from CHF 299/mo.",
    alternates: {
      canonical,
      languages: {
        "x-default": `${BASE_URL}/en${path}`,
        en: `${BASE_URL}/en${path}`,
        de: `${BASE_URL}/de${path}`,
        pt: `${BASE_URL}/pt${path}`,
      },
    },
    openGraph: {
      title: "Digital Marketing for Zurich Businesses | Lopes2Tech",
      description: "AI-powered social media and digital marketing from CHF 299/mo. Meta ads, content creation, analytics and community management.",
      url: canonical,
      images: [{ url: `${BASE_URL}/assets/services/marketing.webp`, width: 1200, height: 630, alt: "Digital Marketing Services - Lopes2Tech" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Digital Marketing for Zurich Businesses | Lopes2Tech",
      description: "AI-powered social media and digital marketing from CHF 299/mo.",
      images: [`${BASE_URL}/assets/services/marketing.webp`],
    },
  };
}

export default function DigitalMarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
