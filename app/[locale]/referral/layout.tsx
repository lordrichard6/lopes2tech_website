import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/referral";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "Referral Program | Earn by Referring Clients to Lopes2Tech",
    description: "Refer a client to Lopes2Tech and earn up to 10% per project or 15% of monthly retainers. No limits, no expiry. Simple, transparent, rewarding.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}`, fr: `${BASE_URL}/fr${path}`, it: `${BASE_URL}/it${path}` },
    },
    openGraph: {
      title: "Referral Program | Earn by Referring Clients to Lopes2Tech",
      description: "Refer a client and earn cash. Up to 10% per project or 15% of monthly retainers. No limits, no expiry.",
      url: canonical,
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Lopes2Tech Referral Program" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Referral Program | Earn by Referring Clients to Lopes2Tech",
      description: "Refer a client and earn cash. Up to 10% per project or 15% of monthly retainers.",
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export default function ReferralLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
