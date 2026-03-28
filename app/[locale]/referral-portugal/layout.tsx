import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programa de Referência Portugal | Lopes2Tech",
  description: "Indica um cliente à Lopes2Tech e ganha até 10% por projeto ou 15% do valor mensal durante 6 meses. Sem limites, sem prazo de validade.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function ReferralPortugalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
