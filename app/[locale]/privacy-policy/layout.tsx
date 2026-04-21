import type { Metadata } from "next";

const BASE_URL = "https://www.lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/privacy-policy";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "Privacy Policy | Lopes2Tech",
    description: "Privacy policy for Lopes2Tech. Learn how we collect, use, and protect your personal data in compliance with Swiss data protection laws and GDPR.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}`, fr: `${BASE_URL}/fr${path}`, it: `${BASE_URL}/it${path}` },
    },
    robots: { index: false, follow: true },
  };
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
