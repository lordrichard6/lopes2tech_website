import type { Metadata } from "next";
import { blogPostsByLocale } from "@/lib/blog";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>;
}): Promise<Metadata> {
  const { locale, tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const canonical = `${BASE_URL}/${locale}/insights/tag/${tag}`;

  const title = `${decodedTag} Articles | Lopes2Tech Insights`;
  const description = `Read all Lopes2Tech articles tagged "${decodedTag}". Expert insights on AI, web development, SEO, and business automation for Swiss businesses.`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "x-default": `${BASE_URL}/en/insights/tag/${tag}`,
        en: `${BASE_URL}/en/insights/tag/${tag}`,
        de: `${BASE_URL}/de/insights/tag/${tag}`,
        fr: `${BASE_URL}/fr/insights/tag/${tag}`,
        pt: `${BASE_URL}/pt/insights/tag/${tag}`,
        it: `${BASE_URL}/it/insights/tag/${tag}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export async function generateStaticParams() {
  const allTags = [
    ...new Set(
      Object.values(blogPostsByLocale).flatMap((posts) =>
        posts.flatMap((p) => p.tags)
      )
    ),
  ];
  const locales = ["en", "de", "fr", "pt", "it"];
  return locales.flatMap((locale) =>
    allTags.map((tag) => ({ locale, tag: encodeURIComponent(tag) }))
  );
}

export default function TagLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
