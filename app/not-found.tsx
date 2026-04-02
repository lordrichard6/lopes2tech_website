import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import Glitch404 from "@/components/Glitch404";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const translations = {
  en: {
    badge: "Error 404",
    title: "Page not found",
    message: "Looks like this page got lost in the digital void. It doesn't exist or has been moved.",
    back: "Back to Home",
  },
  de: {
    badge: "Fehler 404",
    title: "Seite nicht gefunden",
    message: "Diese Seite existiert nicht oder wurde verschoben.",
    back: "Zurück zur Startseite",
  },
  pt: {
    badge: "Erro 404",
    title: "Página não encontrada",
    message: "Esta página não existe ou foi movida.",
    back: "Voltar ao Início",
  },
  fr: {
    badge: "Erreur 404",
    title: "Page introuvable",
    message: "Cette page n'existe pas ou a été déplacée.",
    back: "Retour à l'accueil",
  },
  it: {
    badge: "Errore 404",
    title: "Pagina non trovata",
    message: "Questa pagina non esiste o è stata spostata.",
    back: "Torna alla home",
  },
};

export default async function NotFound() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ?? "en") as keyof typeof translations;
  const t = translations[locale] ?? translations.en;

  return (
    <html lang={locale} className={inter.className} suppressHydrationWarning>
      <body className="min-h-screen bg-[#0f172a] antialiased" suppressHydrationWarning>
        {/* Video background */}
        <div className="fixed inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/vids/dark-poster.jpg"
            className="w-full h-full object-cover"
          >
            <source src="/vids/dark.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#0f172a]/80" />
        </div>

        {/* Logo */}
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5">
          <Link href={`/${locale}`} className="inline-block">
            <Image
              src="/logo_w.svg"
              alt="Lopes2Tech"
              width={130}
              height={34}
              priority
            />
          </Link>
        </header>

        {/* Content */}
        <main className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-xl mx-auto">

            {/* Ambient glows */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/6 rounded-full blur-[80px] pointer-events-none" />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-red-500/10 border border-red-500/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase text-red-400">
                {t.badge}
              </span>
            </div>

            {/* Giant 404 — glitch effect */}
            <div className="mb-4">
              <Glitch404 />
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
              {t.title}
            </h1>

            {/* Message */}
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10 max-w-sm mx-auto">
              {t.message}
            </p>

            {/* CTA */}
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-sm shadow-[0_0_24px_rgba(6,182,212,0.35)] hover:shadow-[0_0_40px_rgba(6,182,212,0.55)] transition-all duration-300 hover:scale-105"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              {t.back}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
