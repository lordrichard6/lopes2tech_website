import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/services/ecommerce";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "E-Commerce Solutions for Swiss Businesses | Online Shops | Lopes2Tech",
    description: "Custom e-commerce development with Shopify, WooCommerce, and headless commerce. Swiss payment integration. Online stores from CHF 1,500.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}` },
    },
    openGraph: { title: "E-Commerce Solutions for Swiss Businesses | Lopes2Tech", description: "Custom online stores with Swiss payment integration from CHF 1,500.", url: canonical },
  };
}

export default function EcommerceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
