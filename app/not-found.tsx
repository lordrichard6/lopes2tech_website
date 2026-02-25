import Link from "next/link";

export default function NotFound() {
    return (
        <html lang="en">
            <body className="min-h-screen bg-[#0f172a] flex items-center justify-center">
                <div className="text-center px-6">
                    <div className="inline-block mb-8">
                        <span className="text-[8rem] md:text-[12rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500 leading-none">
                            404
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Page Not Found
                    </h1>
                    <p className="text-lg text-slate-400 mb-8 max-w-md mx-auto">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                    <Link
                        href="/en"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all"
                    >
                        Back to Home
                    </Link>
                </div>
            </body>
        </html>
    );
}
