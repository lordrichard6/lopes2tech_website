import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preços Portugal | Lopes2Tech",
  description: "Preços em euros para websites, branding, marketing, IA e automação. Qualidade suíça a preços adaptados para o mercado português.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PricingPortugalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
