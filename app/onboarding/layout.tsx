import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-[#0f172a] min-h-screen`}
        suppressHydrationWarning
      >
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
          <Link href="/" className="inline-block">
            <Image
              src="/logo_w.svg"
              alt="Lopes2Tech"
              width={140}
              height={36}
              priority
            />
          </Link>
        </header>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
