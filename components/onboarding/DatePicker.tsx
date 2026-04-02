"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { useTranslations } from "next-intl";

interface DatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (v: string) => void;
  label?: string;
}

function toLocalDate(iso: string): Date {
  // Parse YYYY-MM-DD without timezone offset issues
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export default function DatePicker({
  value,
  onChange,
  label,
}: DatePickerProps) {
  const t = useTranslations("Onboarding");
  const months = t.raw("datePicker.months") as string[];
  const weekdays = t.raw("datePicker.weekdays") as string[];
  const resolvedLabel = label ?? t("datePicker.label");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const parsed = value ? toLocalDate(value) : null;

  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(parsed?.getFullYear() ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(parsed?.getMonth() ?? today.getMonth());
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const atCurrentMonth =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const prevMonth = () => {
    if (atCurrentMonth) return;
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  // Build the 6-row (42-cell) grid
  const firstDow = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrev = new Date(viewYear, viewMonth, 0).getDate();

  type Cell = { day: number; month: "prev" | "curr" | "next"; date: Date };
  const cells: Cell[] = [];

  for (let i = firstDow - 1; i >= 0; i--)
    cells.push({ day: daysInPrev - i, month: "prev", date: new Date(viewYear, viewMonth - 1, daysInPrev - i) });
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ day: d, month: "curr", date: new Date(viewYear, viewMonth, d) });
  const rem = 42 - cells.length;
  for (let d = 1; d <= rem; d++)
    cells.push({ day: d, month: "next", date: new Date(viewYear, viewMonth + 1, d) });

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  const isPast = (d: Date) => {
    const copy = new Date(d); copy.setHours(0, 0, 0, 0);
    return copy < today;
  };

  const selectDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    onChange(`${y}-${m}-${d}`);
    setOpen(false);
  };

  const displayValue = parsed
    ? parsed.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "";

  const hasValue = !!displayValue;

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger button styled like a floating-label input */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`peer w-full px-4 py-3.5 bg-white/5 border ${
          open ? "border-cyan-400/70" : "border-white/10"
        } rounded-xl text-left transition-all duration-200 flex items-center justify-between`}
      >
        <span className={`text-sm ${hasValue ? "text-white" : "text-transparent select-none"}`}>
          {displayValue || "placeholder"}
        </span>
        <CalendarDays
          className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${
            open ? "text-cyan-400" : "text-slate-500"
          }`}
        />
      </button>

      {/* Floating label */}
      <label
        className={`absolute left-4 px-1 text-xs pointer-events-none transition-all duration-200 rounded
          ${hasValue || open
            ? `-top-2.5 bg-[#0b1929] ${open ? "text-cyan-400" : "text-slate-400"}`
            : "top-3.5 text-sm text-slate-500 bg-transparent"
          }`}
      >
        {resolvedLabel}
      </label>

      {/* Dropdown calendar */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-50 top-full mt-2 left-0 right-0 bg-[#0a1828] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* Month / Year header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/8">
              <button
                type="button"
                onClick={prevMonth}
                disabled={atCurrentMonth}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-20 disabled:cursor-not-allowed text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="text-center">
                <p className="text-sm font-bold text-white tracking-wide">
                  {months[viewMonth]}
                </p>
                <p className="text-xs text-slate-500 -mt-0.5">{viewYear}</p>
              </div>

              <button
                type="button"
                onClick={nextMonth}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3">
              {/* Weekday headers */}
              <div className="grid grid-cols-7 mb-2">
                {weekdays.map((d) => (
                  <div
                    key={d}
                    className="h-7 flex items-center justify-center text-[10px] font-bold text-slate-600 uppercase tracking-wider"
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-0.5">
                {cells.map((cell, i) => {
                  const past = isPast(cell.date);
                  const sel = parsed ? isSameDay(cell.date, parsed) : false;
                  const tod = isSameDay(cell.date, today);
                  const other = cell.month !== "curr";

                  return (
                    <motion.button
                      key={i}
                      type="button"
                      disabled={past}
                      onClick={() => selectDate(cell.date)}
                      whileHover={!past && !sel ? { scale: 1.1 } : {}}
                      whileTap={!past ? { scale: 0.95 } : {}}
                      className={`
                        relative h-9 w-full rounded-lg text-[13px] font-medium transition-colors duration-100
                        ${sel
                          ? "bg-gradient-to-br from-cyan-400 to-cyan-500 text-[#0a1828] font-bold shadow-[0_0_16px_rgba(6,182,212,0.5)]"
                          : past
                          ? "text-white/10 cursor-not-allowed"
                          : other
                          ? "text-slate-700 hover:text-slate-500 hover:bg-white/4"
                          : tod
                          ? "text-cyan-300 ring-1 ring-cyan-400/40 hover:bg-cyan-400/10"
                          : "text-slate-300 hover:bg-white/10 hover:text-white"
                        }
                      `}
                    >
                      {cell.day}
                      {/* Today dot */}
                      {tod && !sel && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 pb-3.5 flex items-center justify-between border-t border-white/8 pt-2.5">
              <span className="text-xs text-slate-600">
                {parsed
                  ? parsed.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" })
                  : t("datePicker.noDate")}
              </span>
              {value && (
                <button
                  type="button"
                  onClick={() => { onChange(""); setOpen(false); }}
                  className="text-xs text-slate-500 hover:text-red-400 transition-colors"
                >
                  {t("datePicker.clear")}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
