"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Check, Clock, Zap, Shield } from "lucide-react";

const planIcons = [Shield, Zap, Clock];
const planColors = [
  { border: "border-white/10",          bg: "bg-slate-900/50",                         badge: "bg-white/10 text-slate-300",          check: "bg-cyan-500/20",    checkIcon: "text-cyan-400"    },
  { border: "border-purple-500/30",     bg: "bg-gradient-to-br from-purple-500/20 to-cyan-500/20", badge: "bg-purple-500/20 text-purple-300", check: "bg-purple-500",     checkIcon: "text-white"       },
  { border: "border-cyan-500/20",       bg: "bg-slate-900/50",                         badge: "bg-cyan-500/10 text-cyan-300",         check: "bg-cyan-500/20",    checkIcon: "text-cyan-400"    },
];

type Plan = {
  name: string;
  price: string;
  hours: string;
  response: string;
  overage: string;
  features: string[];
};

export default function AICareSection() {
  const t = useTranslations("AICare");
  const plans = t.raw("plans") as Plan[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="mt-16"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-3">
          {t("label")}
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          {t("title")}
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {plans.map((plan, i) => {
          const c = planColors[i];
          const Icon = planIcons[i];
          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.4 }}
              className={`relative rounded-3xl p-7 border transition-all duration-500 ${c.border} ${c.bg}`}
            >
              {/* Plan name badge */}
              <div className="flex items-center justify-between mb-5">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${c.badge}`}>
                  <Icon className="w-3.5 h-3.5" />
                  {plan.name}
                </span>
              </div>

              {/* Price */}
              <div className="mb-1">
                <span className="text-3xl font-extrabold text-white">{plan.price}</span>
                <span className="text-slate-400 text-sm ml-1">{t("perMonth")}</span>
              </div>
              <p className="text-xs text-slate-500 mb-5">{plan.hours}</p>

              {/* Meta row */}
              <div className="flex flex-wrap gap-3 mb-6 text-xs">
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3 h-3" />
                  {plan.response}
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  {t("overage")} {plan.overage}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-2.5">
                {plan.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-2.5">
                    <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${c.check}`}>
                      <Check className={`w-2.5 h-2.5 ${c.checkIcon}`} />
                    </div>
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="text-center text-xs text-slate-600">{t("note")}</p>
    </motion.div>
  );
}
