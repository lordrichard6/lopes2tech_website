import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter to match Angular project
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lopes2Tech - Websites & Automations for Service Businesses",
  description: "We help small and medium companies get more leads, automate admin, and scale without complexity.",
  metadataBase: new URL("https://lopes2tech.ch"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Lopes2Tech - Websites & Automations for Service Businesses",
    description: "We help small and medium companies get more leads, automate admin, and scale without complexity.",
    url: "https://lopes2tech.ch",
    siteName: "Lopes2Tech",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lopes2Tech - Swiss IT Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lopes2Tech - Websites & Automations for Service Businesses",
    description: "We help small and medium companies get more leads, automate admin, and scale without complexity.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo_w.svg",
    shortcut: "/logo_w.svg",
    apple: "/logo_w.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
