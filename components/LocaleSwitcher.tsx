"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";

const LOCALES = ["en", "pt", "de", "fr", "it"] as const;

interface LocaleSwitcherProps {
  /** Visual variant – "dark" for dark/glass pages, "light" for light backgrounds */
  variant?: "dark" | "light";
}

export default function LocaleSwitcher({ variant = "dark" }: LocaleSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const changeLocale = (next: string) => {
    router.replace(pathname, { locale: next });
    setOpen(false);
  };

  const triggerClass =
    variant === "dark"
      ? "text-white/70 hover:text-white"
      : "text-slate-600 hover:text-slate-900";

  const dropdownClass =
    variant === "dark"
      ? "bg-black/90 border-white/10"
      : "bg-white border-slate-200 shadow-lg";

  const itemBase = variant === "dark" ? "text-white/70 hover:bg-white/10" : "text-slate-600 hover:bg-slate-100";
  const itemActive = variant === "dark" ? "text-cyan-400 font-bold" : "text-cyan-600 font-bold";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Change language, current: ${locale.toUpperCase()}`}
        className={`flex items-center gap-1 text-sm uppercase cursor-pointer transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded ${triggerClass}`}
      >
        {locale}
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            role="listbox"
            aria-label="Select language"
            className={`absolute top-full right-0 mt-2 border rounded-lg overflow-hidden min-w-[72px] z-50 ${dropdownClass}`}
          >
            {LOCALES.map((l) => (
              <li key={l} role="option" aria-selected={locale === l}>
                <button
                  type="button"
                  onClick={() => changeLocale(l)}
                  className={`block w-full text-left px-4 py-2 text-sm uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors duration-100 ${
                    locale === l ? itemActive : itemBase
                  }`}
                >
                  {l}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
