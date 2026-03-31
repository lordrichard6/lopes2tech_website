import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";
const PATH     = "/services/cold-email";

export const metadata: Metadata = {
  title: "Cold Email Outreach — Done-for-You | Lopes2Tech",
  description:
    "Reach your ideal Swiss clients with fully managed cold email campaigns. Lead sourcing, copywriting, technical setup, and sending — all handled. From CHF 390/mo.",
  alternates: {
    canonical: `${BASE_URL}/en${PATH}`,
    languages: {
      "x-default": `${BASE_URL}/en${PATH}`,
      en: `${BASE_URL}/en${PATH}`,
      de: `${BASE_URL}/de${PATH}`,
      pt: `${BASE_URL}/pt${PATH}`,
      fr: `${BASE_URL}/fr${PATH}`,
      it: `${BASE_URL}/it${PATH}`,
    },
  },
  openGraph: {
    title: "Cold Email Outreach — Done-for-You | Lopes2Tech",
    description:
      "Reach your ideal Swiss clients with fully managed cold email campaigns. From CHF 390/mo.",
    url: `${BASE_URL}/en${PATH}`,
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cold Email Outreach — Done-for-You | Lopes2Tech",
    description: "Fully managed cold email campaigns. From CHF 390/mo.",
    images: [`${BASE_URL}/og-image.png`],
  },
};

export default function ColdEmailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
