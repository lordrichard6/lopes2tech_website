import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/services/ecommerce";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "E-Commerce Development | Lopes2Tech - Online Stores Built to Sell",
    description: "Custom e-commerce website development for Swiss businesses. Fast, secure, conversion-optimised online stores with Stripe, inventory management, and multilingual support. Based in Zurich.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}` },
    },
    openGraph: {
      title: "E-Commerce Development | Lopes2Tech",
      description: "High-converting online stores for Swiss businesses — fast, secure, and built to grow.",
      url: canonical,
    },
  };
}

export default function EcommerceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
