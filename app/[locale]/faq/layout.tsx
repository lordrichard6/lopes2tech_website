import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/faq";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "FAQ | Lopes2Tech - Web Design, SEO & Social Media Pricing",
    description: "Frequently asked questions about web design, SEO, social media marketing, and business automation services. Pricing, timelines, and packages explained.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}`, fr: `${BASE_URL}/fr${path}`, it: `${BASE_URL}/it${path}` },
    },
    openGraph: {
      title: "FAQ | Lopes2Tech",
      description: "Answers to common questions about our web design, SEO, and automation services in Zurich.",
      url: canonical,
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Lopes2Tech FAQ" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "FAQ | Lopes2Tech - Web Design, SEO & Social Media Pricing",
      description: "Frequently asked questions about web design, SEO, social media marketing, and business automation services. Pricing, timelines, and packages explained.",
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
