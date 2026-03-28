import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Lopes2Tech | Transparent Swiss Agency Rates",
  description:
    "Full pricing for websites, branding, marketing, AI & automation. 40–60% below Zurich agency averages. No hidden fees.",
  openGraph: {
    title: "Transparent Pricing — Lopes2Tech",
    description:
      "Every service, every price. 40–60% below Zurich agency averages.",
    url: "https://www.lopes2tech.com/pricing",
    siteName: "Lopes2Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transparent Pricing — Lopes2Tech",
    description: "Every service, every price. No hidden fees.",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
