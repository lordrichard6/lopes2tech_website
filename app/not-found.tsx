import Link from "next/link";
import { cookies } from "next/headers";

const translations = {
    en: {
        title: "Page Not Found",
        message: "The page you're looking for doesn't exist or has been moved.",
        back: "Back to Home",
    },
    de: {
        title: "Seite nicht gefunden",
        message: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
        back: "Zurück zur Startseite",
    },
    pt: {
        title: "Página não encontrada",
        message: "A página que procura não existe ou foi movida.",
        back: "Voltar ao Início",
    },
};

export default async function NotFound() {
    const cookieStore = await cookies();
    const locale = (cookieStore.get("NEXT_LOCALE")?.value ?? "en") as keyof typeof translations;
    const t = translations[locale] ?? translations.en;

    return (
        <html lang={locale}>
            <body className="min-h-screen bg-[#0f172a] flex items-center justify-center">
                <div className="text-center px-6">
                    <div className="inline-block mb-8">
                        <span className="text-[8rem] md:text-[12rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500 leading-none">
                            404
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {t.title}
                    </h1>
                    <p className="text-lg text-slate-400 mb-8 max-w-md mx-auto">
                        {t.message}
                    </p>
                    <Link
                        href={`/${locale}`}
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all"
                    >
                        {t.back}
                    </Link>
                </div>
            </body>
        </html>
    );
}
