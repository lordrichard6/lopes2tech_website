import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/about";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "About Lopes2Tech | AI-Powered Web Development in Zurich",
    description: "Meet Paulo Lopes, founder of Lopes2Tech. Specializing in AI-powered web development, SEO, and business automation for Swiss SMEs. Based in Zurich.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}`, fr: `${BASE_URL}/fr${path}`, it: `${BASE_URL}/it${path}` },
    },
    openGraph: {
      title: "About Lopes2Tech | AI-Powered Web Development in Zurich",
      description: "Meet Paulo Lopes, founder of Lopes2Tech. AI-powered web development and business automation for Swiss businesses.",
      url: canonical,
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "About Lopes2Tech" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "About Lopes2Tech | AI-Powered Web Development in Zurich",
      description: "Meet Paulo Lopes, founder of Lopes2Tech. AI-powered web development and business automation for Swiss businesses.",
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
