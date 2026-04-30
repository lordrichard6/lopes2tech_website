"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Loader2,
  User,
  Briefcase,
  Palette,
  Globe,
  Package,
  ClipboardList,
  Check,
  AlertCircle,
  Pencil,
  Mail,
} from "lucide-react";
import { useTranslations, useMessages } from "next-intl";
import {
  submitWebsiteOnboarding,
  type WebsiteOnboardingData,
} from "@/app/actions/onboarding";
import DatePicker from "@/components/onboarding/DatePicker";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type FormData = WebsiteOnboardingData;
type FieldErrors = Partial<Record<keyof FormData, string>>;

const STORAGE_KEY = "onboarding_website_draft";
const TOTAL_STEPS = 6;

const EMPTY_FORM: FormData = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  city: "",
  businessDescription: "",
  idealClients: "",
  differentiator: "",
  primaryAction: "",
  hasBranding: false,
  brandColors: "",
  wantsLogoImprovement: false,
  websiteFeeling: [],
  inspirationUrl1: "",
  inspirationUrl2: "",
  inspirationUrl3: "",
  stylesToAvoid: "",
  hasDomain: false,
  domainName: "",
  contentApproach: "",
  assetsApproach: "",
  desiredLaunchDate: "",
  additionalNotes: "",
};

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validateStep(step: number, data: FormData, t: (key: string) => string): FieldErrors {
  const errors: FieldErrors = {};
  if (step === 0) {
    if (!data.fullName.trim()) errors.fullName = t("validation.fullNameRequired");
    if (!data.businessName.trim()) errors.businessName = t("validation.businessNameRequired");
    if (!data.email.trim()) {
      errors.email = t("validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = t("validation.emailInvalid");
    }
    if (!data.phone.trim()) errors.phone = t("validation.phoneRequired");
    if (!data.city.trim()) errors.city = t("validation.cityRequired");
  }
  if (step === 1) {
    if (!data.businessDescription.trim())
      errors.businessDescription = t("validation.businessDescRequired");
    if (!data.idealClients.trim())
      errors.idealClients = t("validation.idealClientsRequired");
    if (!data.primaryAction)
      errors.primaryAction = t("validation.primaryActionRequired");
  }
  if (step === 2) {
    if (data.websiteFeeling.length === 0)
      errors.websiteFeeling = t("validation.websiteFeelingRequired");
  }
  if (step === 3) {
    if (!data.contentApproach)
      errors.contentApproach = t("validation.contentApproachRequired");
    if (!data.assetsApproach)
      errors.assetsApproach = t("validation.assetsApproachRequired");
  }
  return errors;
}

// ---------------------------------------------------------------------------
// Step metadata — built inside the component using t()
// ---------------------------------------------------------------------------

type StepMeta = {
  icon: React.ElementType;
  label: string;
  tagline: string;
  description: string;
  tips: string[];
};

// ---------------------------------------------------------------------------
// Floating input — matches contact page style
// ---------------------------------------------------------------------------

interface FloatingInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete?: string;
}

function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
}: FloatingInputProps) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        autoComplete={autoComplete}
        className={`peer w-full px-4 py-3.5 bg-white/5 border ${
          error ? "border-red-500/60" : "border-white/10"
        } rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400/70 transition-all duration-200 text-sm`}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 -top-2.5 px-1 text-xs transition-all duration-200
          bg-[#0b1929] peer-placeholder-shown:bg-transparent rounded
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-500
          peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-cyan-400 peer-focus:bg-[#0b1929]
          ${error ? "text-red-400" : "text-slate-400"}`}
      >
        {label}
      </label>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 flex items-center gap-1 text-xs text-red-400"
        >
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </motion.p>
      )}
    </div>
  );
}

interface FloatingTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  rows?: number;
  maxLength?: number;
}

function FloatingTextarea({
  id,
  label,
  value,
  onChange,
  error,
  rows = 3,
  maxLength,
}: FloatingTextareaProps) {
  const nearLimit = maxLength && value.length > maxLength * 0.8;
  const overLimit = maxLength && value.length > maxLength;

  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        rows={rows}
        maxLength={maxLength}
        className={`peer w-full px-4 py-3.5 bg-white/5 border ${
          error ? "border-red-500/60" : "border-white/10"
        } rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400/70 transition-all duration-200 resize-none text-sm`}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 -top-2.5 px-1 text-xs transition-all duration-200
          bg-[#0b1929] peer-placeholder-shown:bg-transparent rounded
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-500
          peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-cyan-400 peer-focus:bg-[#0b1929]
          ${error ? "text-red-400" : "text-slate-400"}`}
      >
        {label}
      </label>
      <div className="mt-1.5 flex items-start justify-between gap-2">
        {error ? (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1 text-xs text-red-400"
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            {error}
          </motion.p>
        ) : (
          <span />
        )}
        {maxLength && (
          <span
            className={`text-[11px] tabular-nums flex-shrink-0 transition-colors ${
              overLimit
                ? "text-red-400"
                : nearLimit
                ? "text-amber-400"
                : "text-slate-600"
            }`}
          >
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}

// Soft URL validator — returns true if empty or looks like a URL
function looksLikeUrl(v: string): boolean {
  if (!v.trim()) return true;
  return /^https?:\/\/.+\..+/.test(v) || /^www\..+\..+/.test(v);
}

// ---------------------------------------------------------------------------
// Chip group
// ---------------------------------------------------------------------------

function ChipGroup({
  label,
  options,
  value,
  onChange,
  error,
  single,
}: {
  label: string;
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  error?: string;
  single?: boolean;
}) {
  const toggle = (opt: string) => {
    if (single) {
      onChange(value[0] === opt ? [] : [opt]);
    } else {
      onChange(
        value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]
      );
    }
  };

  return (
    <div>
      <p className="text-xs font-medium text-slate-400 mb-3 uppercase tracking-wide">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value.includes(opt);
          return (
            <motion.button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              whileTap={{ scale: 0.96 }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 ${
                active
                  ? "bg-cyan-500/15 border-cyan-400/50 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                  : "bg-white/5 border-white/10 text-slate-400 hover:border-white/25 hover:text-slate-300"
              }`}
            >
              {active && <Check className="w-3 h-3 inline mr-1.5 -mt-0.5" />}
              {opt}
            </motion.button>
          );
        })}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex items-center gap-1 text-xs text-red-400"
        >
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </motion.p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Toggle switch
// ---------------------------------------------------------------------------

function Toggle({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description?: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`w-full flex items-center justify-between gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${
        value
          ? "bg-cyan-500/10 border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.07)]"
          : "bg-white/5 border-white/10 hover:border-white/20"
      }`}
    >
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        {description && (
          <p className="text-xs text-slate-500 mt-0.5">{description}</p>
        )}
      </div>
      <div
        className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-300 ${
          value ? "bg-cyan-500" : "bg-white/15"
        }`}
      >
        <motion.div
          animate={{ x: value ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 600, damping: 32 }}
          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
        />
      </div>
    </button>
  );
}


// ---------------------------------------------------------------------------
// Step content
// ---------------------------------------------------------------------------

function Step1({
  data,
  errors,
  update,
  t,
}: {
  data: FormData;
  errors: FieldErrors;
  update: (k: keyof FormData, v: unknown) => void;
  t: (key: string) => string;
}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FloatingInput
          id="fullName"
          label={t("fields.fullName")}
          value={data.fullName}
          onChange={(v) => update("fullName", v)}
          error={errors.fullName}
          autoComplete="name"
        />
        <FloatingInput
          id="businessName"
          label={t("fields.businessName")}
          value={data.businessName}
          onChange={(v) => update("businessName", v)}
          error={errors.businessName}
          autoComplete="organization"
        />
      </div>
      <FloatingInput
        id="email"
        type="email"
        label={t("fields.email")}
        value={data.email}
        onChange={(v) => update("email", v)}
        error={errors.email}
        autoComplete="email"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FloatingInput
          id="phone"
          type="tel"
          label={t("fields.phone")}
          value={data.phone}
          onChange={(v) => update("phone", v)}
          error={errors.phone}
          autoComplete="tel"
        />
        <FloatingInput
          id="city"
          label={t("fields.city")}
          value={data.city}
          onChange={(v) => update("city", v)}
          error={errors.city}
          autoComplete="address-level2"
        />
      </div>
    </div>
  );
}

function Step2({
  data,
  errors,
  update,
  t,
  primaryOptions,
}: {
  data: FormData;
  errors: FieldErrors;
  update: (k: keyof FormData, v: unknown) => void;
  t: (key: string) => string;
  primaryOptions: string[];
}) {
  return (
    <div className="space-y-5">
      <FloatingTextarea
        id="businessDescription"
        label={t("fields.businessDesc")}
        value={data.businessDescription}
        onChange={(v) => update("businessDescription", v)}
        error={errors.businessDescription}
        rows={3}
        maxLength={500}
      />
      <FloatingTextarea
        id="idealClients"
        label={t("fields.idealClients")}
        value={data.idealClients}
        onChange={(v) => update("idealClients", v)}
        error={errors.idealClients}
        rows={2}
        maxLength={300}
      />
      <FloatingTextarea
        id="differentiator"
        label={t("fields.differentiator")}
        value={data.differentiator}
        onChange={(v) => update("differentiator", v)}
        rows={2}
        maxLength={300}
      />
      <ChipGroup
        label={t("fields.primaryActionLbl")}
        options={primaryOptions}
        value={data.primaryAction ? [data.primaryAction] : []}
        onChange={(arr) => update("primaryAction", arr[arr.length - 1] ?? "")}
        error={errors.primaryAction as string}
        single
      />
    </div>
  );
}

function Step3({
  data,
  errors,
  update,
  t,
  feelingOptions,
}: {
  data: FormData;
  errors: FieldErrors;
  update: (k: keyof FormData, v: unknown) => void;
  t: (key: string) => string;
  feelingOptions: string[];
}) {
  return (
    <div className="space-y-5">
      <Toggle
        label={t("hasBrandingLabel")}
        description={t("hasBrandingDesc")}
        value={data.hasBranding}
        onChange={(v) => {
          update("hasBranding", v);
          if (!v) update("wantsLogoImprovement", false);
        }}
      />
      <AnimatePresence>
        {data.hasBranding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 overflow-hidden"
          >
            {/* Upload note */}
            <div className="flex items-start gap-2.5 px-4 py-3 bg-cyan-500/8 border border-cyan-400/20 rounded-xl">
              <span className="text-cyan-400 mt-0.5 flex-shrink-0">ℹ️</span>
              <p className="text-xs text-cyan-300 leading-relaxed">
                {t("brandUploadNote")}
              </p>
            </div>
            <FloatingInput
              id="brandColors"
              label={t("fields.brandColors")}
              value={data.brandColors}
              onChange={(v) => update("brandColors", v)}
            />
            <Toggle
              label={t("logoImprovementLabel")}
              description={t("logoImprovementDesc")}
              value={data.wantsLogoImprovement}
              onChange={(v) => update("wantsLogoImprovement", v)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <ChipGroup
        label={t("websiteFeelingLabel")}
        options={feelingOptions}
        value={data.websiteFeeling}
        onChange={(v) => update("websiteFeeling", v)}
        error={errors.websiteFeeling as string}
      />
      <div className="space-y-3">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
          {t("inspirationLabel")}
        </p>
        {(
          [
            { id: "inspirationUrl1", key: "inspirationUrl1" as keyof FormData, label: "Website 1", value: data.inspirationUrl1 },
            { id: "inspirationUrl2", key: "inspirationUrl2" as keyof FormData, label: "Website 2", value: data.inspirationUrl2 },
            { id: "inspirationUrl3", key: "inspirationUrl3" as keyof FormData, label: "Website 3", value: data.inspirationUrl3 },
          ] as { id: string; key: keyof FormData; label: string; value: string }[]
        ).map(({ id, key, label, value: urlVal }) => (
          <div key={id}>
            <FloatingInput
              id={id}
              label={label}
              value={urlVal}
              onChange={(v) => update(key, v)}
            />
            {!looksLikeUrl(urlVal) && urlVal.trim() && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 flex items-center gap-1 text-xs text-amber-400"
              >
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                {t("urlWarning")}
              </motion.p>
            )}
          </div>
        ))}
      </div>
      <FloatingInput
        id="stylesToAvoid"
        label={t("fields.stylesToAvoid")}
        value={data.stylesToAvoid}
        onChange={(v) => update("stylesToAvoid", v)}
      />
    </div>
  );
}

function Step4({
  data,
  errors,
  update,
  t,
}: {
  data: FormData;
  errors: FieldErrors;
  update: (k: keyof FormData, v: unknown) => void;
  t: (key: string) => string;
}) {
  return (
    <div className="space-y-5">
      {/* Domain toggle */}
      <Toggle
        label={t("hasDomainLabel")}
        description={t("hasDomainDesc")}
        value={data.hasDomain}
        onChange={(v) => update("hasDomain", v)}
      />

      {/* Domain note — only when hasDomain is true */}
      <AnimatePresence>
        {data.hasDomain && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-start gap-2.5 px-4 py-3 bg-amber-500/8 border border-amber-400/20 rounded-xl">
              <span className="text-amber-400 mt-0.5 flex-shrink-0">🔐</span>
              <p className="text-xs text-amber-300 leading-relaxed">
                {t("domainAuthNote")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Domain input — always visible, label changes. key forces remount on toggle to avoid label flicker */}
      <FloatingInput
        key={data.hasDomain ? "domain-existing" : "domain-desired"}
        id="domainName"
        label={data.hasDomain ? t("fields.domainExisting") : t("fields.domainDesired")}
        value={data.domainName}
        onChange={(v) => update("domainName", v)}
        autoComplete="off"
      />

      {/* ── Website Copywriting ─────────────────────────────────── */}
      <ContentOptionGroup
        label={t("copywritingLabel")}
        selected={data.contentApproach}
        onSelect={(v) => update("contentApproach", v)}
        error={errors.contentApproach as string}
        options={[
          {
            value: "client",
            title: t("copyClientTitle"),
            description: t("copyClientDesc"),
          },
          {
            value: "agency",
            title: t("copyAgencyTitle"),
            description: t("copyAgencyDesc"),
            expandedNote: {
              icon: "✨",
              color: "purple",
              text: t("copyAgencyNote"),
            },
          },
        ]}
      />

      {/* ── Website Assets ──────────────────────────────────────── */}
      <ContentOptionGroup
        label={t("assetsLabel")}
        selected={data.assetsApproach}
        onSelect={(v) => update("assetsApproach", v)}
        error={errors.assetsApproach as string}
        options={[
          {
            value: "all",
            title: t("assetsAllTitle"),
            description: t("assetsAllDesc"),
          },
          {
            value: "some",
            title: t("assetsSomeTitle"),
            description: t("assetsSomeDesc"),
          },
          {
            value: "agency",
            title: t("assetsAgencyTitle"),
            description: t("assetsAgencyDesc"),
          },
        ]}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Reusable option group used in Step 4
// ---------------------------------------------------------------------------

interface ContentOption {
  value: string;
  title: string;
  description: string;
  expandedNote?: { icon: string; color: "purple" | "cyan"; text: string };
}

function ContentOptionGroup({
  label,
  selected,
  onSelect,
  error,
  options,
}: {
  label: string;
  selected: string;
  onSelect: (v: string) => void;
  error?: string;
  options: ContentOption[];
}) {
  const noteColors = {
    purple: {
      wrap: "bg-purple-500/10 border-purple-400/20",
      icon: "text-purple-400",
      text: "text-purple-300",
    },
    cyan: {
      wrap: "bg-cyan-500/10 border-cyan-400/20",
      icon: "text-cyan-400",
      text: "text-cyan-300",
    },
  };

  return (
    <div>
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">
        {label}
      </p>
      <div className="space-y-2">
        {options.map((opt) => {
          const active = selected === opt.value;
          return (
            <motion.button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              whileTap={{ scale: 0.99 }}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                active
                  ? "bg-cyan-500/10 border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.08)]"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{opt.title}</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {opt.description}
                  </p>
                  {opt.expandedNote && (
                    <AnimatePresence>
                      {active && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div
                            className={`mt-3 flex items-start gap-2 px-3 py-2.5 border rounded-lg ${
                              noteColors[opt.expandedNote.color].wrap
                            }`}
                          >
                            <span
                              className={`text-sm flex-shrink-0 ${
                                noteColors[opt.expandedNote.color].icon
                              }`}
                            >
                              {opt.expandedNote.icon}
                            </span>
                            <p
                              className={`text-xs leading-relaxed ${
                                noteColors[opt.expandedNote.color].text
                              }`}
                            >
                              {opt.expandedNote.text}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
                <div
                  className={`flex-shrink-0 w-4 h-4 mt-0.5 rounded-full border-2 flex items-center justify-center transition-all ${
                    active ? "border-cyan-400 bg-cyan-400" : "border-white/25"
                  }`}
                >
                  {active && (
                    <Check className="w-2.5 h-2.5 text-[#0b1929]" strokeWidth={3} />
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex items-center gap-1 text-xs text-red-400"
        >
          <AlertCircle className="w-3 h-3" />
          {error}
        </motion.p>
      )}
    </div>
  );
}

function Step5({
  data,
  errors,
  update,
  t,
}: {
  data: FormData;
  errors: FieldErrors;
  update: (k: keyof FormData, v: unknown) => void;
  t: (key: string) => string;
}) {
  return (
    <div className="space-y-5">
      <DatePicker
        value={data.desiredLaunchDate}
        onChange={(v) => update("desiredLaunchDate", v)}
        label={t("fields.launchDate")}
      />
      <FloatingTextarea
        id="additionalNotes"
        label={t("fields.additionalNotes")}
        value={data.additionalNotes}
        onChange={(v) => update("additionalNotes", v)}
        rows={5}
        maxLength={600}
      />
    </div>
  );
}

function Step6Review({
  data,
  goToStep,
  t,
}: {
  data: FormData;
  goToStep: (step: number) => void;
  t: (key: string) => string;
}) {
  const Section = ({
    title,
    step,
    rows,
  }: {
    title: string;
    step: number;
    rows: [string, string | string[] | boolean][];
  }) => (
    <div className="p-4 bg-white/4 rounded-xl border border-white/8 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </p>
        <button
          type="button"
          onClick={() => goToStep(step)}
          className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <Pencil className="w-3 h-3" />
          {t("editBtn")}
        </button>
      </div>
      <div className="space-y-2">
        {rows.map(([label, val]) => {
          const display = Array.isArray(val)
            ? val.length > 0
              ? val.join(", ")
              : "—"
            : typeof val === "boolean"
            ? val
              ? t("yes")
              : t("no")
            : (val as string) || "—";
          return (
            <div key={label} className="flex gap-3">
              <span className="text-xs text-slate-600 w-28 flex-shrink-0 pt-0.5 leading-snug">
                {label}
              </span>
              <span className="text-xs text-slate-300 flex-1 leading-snug">
                {display}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-3">
      <Section
        title={t("steps.details.label")}
        step={0}
        rows={[
          [t("reviewRows.fullName"), data.fullName],
          [t("reviewRows.business"), data.businessName],
          [t("reviewRows.email"), data.email],
          [t("reviewRows.phone"), data.phone],
          [t("reviewRows.city"), data.city],
        ]}
      />
      <Section
        title={t("steps.business.label")}
        step={1}
        rows={[
          [t("reviewRows.description"), data.businessDescription],
          [t("reviewRows.idealClients"), data.idealClients],
          [t("reviewRows.differentiator"), data.differentiator],
          [t("reviewRows.primaryAction"), data.primaryAction],
        ]}
      />
      <Section
        title={t("steps.design.label")}
        step={2}
        rows={[
          [t("reviewRows.hasBranding"), data.hasBranding],
          ...(data.hasBranding
            ? ([
                [t("reviewRows.brandColors"), data.brandColors || "—"],
                [t("reviewRows.logoRedesign"), data.wantsLogoImprovement ? t("logoYes") : t("no")],
              ] as [string, string][])
            : []),
          [t("reviewRows.feeling"), data.websiteFeeling],
          [t("reviewRows.stylesToAvoid"), data.stylesToAvoid],
        ]}
      />
      <Section
        title={t("steps.domain.label")}
        step={3}
        rows={[
          [data.hasDomain ? t("reviewRows.currentDomain") : t("reviewRows.desiredDomain"), data.domainName],
          [
            t("reviewRows.copywriting"),
            data.contentApproach === "client"
              ? t("copyClientShort")
              : data.contentApproach === "agency"
              ? t("copyAgencyShort")
              : "—",
          ],
          [
            t("reviewRows.assets"),
            data.assetsApproach === "all"
              ? t("assetsAllShort")
              : data.assetsApproach === "some"
              ? t("assetsSomeShort")
              : data.assetsApproach === "agency"
              ? t("assetsAgencyShort")
              : "—",
          ],
        ]}
      />
      <Section
        title={t("steps.timeline.label")}
        step={4}
        rows={[
          [t("reviewRows.launchDate"), data.desiredLaunchDate],
          [t("reviewRows.notes"), data.additionalNotes],
        ]}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Progress indicator
// ---------------------------------------------------------------------------

function StepProgress({ step, steps }: { step: number; steps: StepMeta[] }) {
  return (
    <div className="max-w-2xl mx-auto mb-8 px-2">
      <div className="flex items-center">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            {/* Dot */}
            <div className="relative flex-shrink-0">
              <motion.div
                animate={{
                  backgroundColor:
                    i < step
                      ? "rgba(6,182,212,1)"
                      : "transparent",
                  borderColor:
                    i <= step
                      ? "rgba(6,182,212,0.8)"
                      : "rgba(255,255,255,0.12)",
                  scale: i === step ? 1.2 : 1,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
              >
                {i < step ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Check className="w-3.5 h-3.5 text-[#0b1929]" strokeWidth={3} />
                  </motion.div>
                ) : i === step ? (
                  <>
                    {/* Pulse ring */}
                    <motion.div
                      animate={{ scale: [1, 1.7, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 rounded-full bg-cyan-400/25"
                    />
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  </>
                ) : (
                  <span className="text-[11px] text-slate-600 font-medium">
                    {i + 1}
                  </span>
                )}
              </motion.div>
            </div>

            {/* Connector line */}
            {i < TOTAL_STEPS - 1 && (
              <div className="flex-1 h-px bg-white/8 mx-1.5 relative overflow-hidden">
                <motion.div
                  animate={{ scaleX: i < step ? 1 : 0 }}
                  initial={{ scaleX: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ transformOrigin: "left" }}
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-300/70"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Label row */}
      <div className="flex mt-2">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`flex-1 last:flex-none text-center transition-all duration-300 ${
              i === TOTAL_STEPS - 1 ? "text-right" : ""
            } ${i === 0 ? "text-left" : ""}`}
          >
            <span
              className={`text-[10px] font-medium transition-colors duration-300 ${
                i === step
                  ? "text-cyan-400"
                  : i < step
                  ? "text-slate-500"
                  : "text-slate-700"
              } hidden sm:inline`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export default function WebsiteOnboardingForm() {
  const t = useTranslations("Onboarding");
  const messages = useMessages();

  // Resolve arrays from messages
  const primaryOptions = ((messages.Onboarding as Record<string, unknown>)?.primaryActions as string[]) ?? [];
  const feelingOptions = ((messages.Onboarding as Record<string, unknown>)?.feelings as string[]) ?? [];

  // Build STEPS inside the component so labels are translated
  const STEPS: StepMeta[] = [
    { icon: User,         label: t("steps.details.label"),  tagline: t("steps.details.tagline"),  description: t("steps.details.description"),  tips: [t("steps.details.tip1"),  t("steps.details.tip2")]  },
    { icon: Briefcase,    label: t("steps.business.label"), tagline: t("steps.business.tagline"), description: t("steps.business.description"), tips: [t("steps.business.tip1"), t("steps.business.tip2")] },
    { icon: Palette,      label: t("steps.design.label"),   tagline: t("steps.design.tagline"),   description: t("steps.design.description"),   tips: [t("steps.design.tip1"),   t("steps.design.tip2")]   },
    { icon: Globe,        label: t("steps.domain.label"),   tagline: t("steps.domain.tagline"),   description: t("steps.domain.description"),   tips: [t("steps.domain.tip1"),   t("steps.domain.tip2")]   },
    { icon: Package,      label: t("steps.timeline.label"), tagline: t("steps.timeline.tagline"), description: t("steps.timeline.description"), tips: [t("steps.timeline.tip1"), t("steps.timeline.tip2")] },
    { icon: ClipboardList,label: t("steps.review.label"),   tagline: t("steps.review.tagline"),   description: t("steps.review.description"),   tips: [t("steps.review.tip1"),   t("steps.review.tip2")]   },
  ];

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showResumeBanner, setShowResumeBanner] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const formLoadedAtRef = useRef<number>(0);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track form mount time so server can reject sub-5s submissions.
  useEffect(() => { formLoadedAtRef.current = Date.now(); }, []);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Restore draft
  useEffect(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as FormData;
        if (parsed.fullName || parsed.email) {
          setFormData(parsed);
          setShowResumeBanner(true);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Auto-save on change
  const update = useCallback((key: keyof FormData, value: unknown) => {
    setFormData((prev) => {
      const next = { ...prev, [key]: value };
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
      }, 500);
      return next;
    });
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  const goToStep = useCallback(
    (target: number) => {
      setDirection(target > step ? 1 : -1);
      setErrors({});
      setStep(target);
      // Scroll right panel back to top
      requestAnimationFrame(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
      });
    },
    [step]
  );

  const next = useCallback(() => {
    const errs = validateStep(step, formData, t);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    if (step < TOTAL_STEPS - 1) goToStep(step + 1);
  }, [step, formData, goToStep, t]);

  const prev = useCallback(() => {
    if (step > 0) goToStep(step - 1);
  }, [step, goToStep]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const result = await submitWebsiteOnboarding(formData, {
        website,
        formLoadedAt: formLoadedAtRef.current,
      });
      if (!result.success) {
        setErrorMessage(result.error ?? "An unexpected error occurred.");
        setStatus("error");
      } else {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          // ignore
        }
        setStatus("success");
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  // Slide + blur transition variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 52 : -52,
      opacity: 0,
      filter: "blur(8px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 52 : -52,
      opacity: 0,
      filter: "blur(8px)",
    }),
  };

  const transition = {
    duration: 0.35,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  };

  const cfg = STEPS[step];
  const StepIcon = cfg.icon;

  // ── Success screen ──────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
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

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-lg mx-auto"
        >
          {/* Checkmark circle */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 220,
              damping: 18,
            }}
            className="w-28 h-28 mx-auto mb-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(6,182,212,0.45)]"
          >
            <Check className="w-14 h-14 text-white" strokeWidth={2.5} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-4xl font-extrabold text-white mb-3"
          >
            {t("successTitle")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              {formData.fullName.split(" ")[0]}!
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="text-slate-400 text-lg mb-10 leading-relaxed"
          >
            {t("successSubtitle")}
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-[0_0_35px_rgba(6,182,212,0.45)] transition-all duration-300 hover:scale-105"
          >
            {t("backToSite")}
          </motion.a>
        </motion.div>
      </div>
    );
  }

  // ── Main form ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen relative">
      {/* Honeypot — hidden from humans, bots fill it. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden", opacity: 0 }}>
        <label htmlFor="onboarding-website">Website</label>
        <input
          type="text"
          id="onboarding-website"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
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
        <div className="absolute inset-0 bg-[#0f172a]/82" />
      </div>

      {/* Resume banner */}
      <AnimatePresence>
        {showResumeBanner && (
          <motion.div
            initial={{ opacity: 0, y: -48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -48 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 flex justify-center px-4"
          >
            <div className="flex items-center gap-4 px-5 py-3 bg-cyan-500/15 border border-cyan-400/25 rounded-2xl backdrop-blur-md shadow-lg">
              <span className="text-sm text-cyan-200">
                <span className="font-semibold">{t("draftRestored")}</span> —
                {t("draftRestoredDesc")}
              </span>
              <button
                onClick={() => {
                  setShowResumeBanner(false);
                  setFormData(EMPTY_FORM);
                  try {
                    localStorage.removeItem(STORAGE_KEY);
                  } catch {
                    // ignore
                  }
                }}
                className="text-xs text-slate-400 hover:text-white transition-colors underline underline-offset-2"
              >
                {t("startFresh")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <div className="relative z-10 min-h-screen flex flex-col pt-24 pb-12 px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-400/10 border border-cyan-400/20 rounded-full text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">
            {t("badge")}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            {t("headline")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              {t("headlineAccent")}
            </span>
          </h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Step progress dots */}
        <StepProgress step={step} steps={STEPS} />

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl w-full mx-auto flex-1"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">

              {/* ── LEFT: context panel ─────────────────────────────────── */}
              <div className="relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/8">
                {/* Static ambient glow — always visible */}
                <div className="absolute -left-10 -top-10 w-40 h-40 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`ctx-${step}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={transition}
                    className="relative z-10 p-7 lg:p-8 flex flex-row lg:flex-col gap-5 lg:gap-0 lg:min-h-[460px]"
                  >
                    {/* Big decorative step number */}
                    <div
                      className="absolute right-3 bottom-2 text-[7rem] lg:text-[9rem] font-black leading-none pointer-events-none select-none"
                      style={{ color: "rgba(6,182,212,0.04)" }}
                    >
                      {step + 1}
                    </div>

                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.08, type: "spring", stiffness: 300 }}
                      className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/20 flex items-center justify-center shadow-[0_0_24px_rgba(6,182,212,0.18)] lg:mb-6"
                    >
                      <StepIcon className="w-5 h-5 text-cyan-400" />
                    </motion.div>

                    <div className="flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-400 mb-2">
                        {t("stepCounter", { current: step + 1, total: TOTAL_STEPS })}
                      </p>
                      <h2 className="text-xl lg:text-2xl font-bold text-white mb-2 leading-tight">
                        {cfg.tagline}
                      </h2>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {cfg.description}
                      </p>

                      {/* Tips — hidden on mobile */}
                      <div className="hidden lg:block mt-8 space-y-2.5">
                        {cfg.tips.map((tip) => (
                          <div
                            key={tip}
                            className="flex items-center gap-2.5 text-xs text-slate-500"
                          >
                            <div className="w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                            {tip}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── RIGHT: form fields ──────────────────────────────────── */}
              <div
                className="flex flex-col"
                style={{ background: "rgba(11,25,41,0.6)" }}
              >
                {/* Fields area with scroll */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-7 lg:p-8">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={`fields-${step}`}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={transition}
                    >
                      {step === 0 && (
                        <Step1 data={formData} errors={errors} update={update} t={t} />
                      )}
                      {step === 1 && (
                        <Step2 data={formData} errors={errors} update={update} t={t} primaryOptions={primaryOptions} />
                      )}
                      {step === 2 && (
                        <Step3 data={formData} errors={errors} update={update} t={t} feelingOptions={feelingOptions} />
                      )}
                      {step === 3 && (
                        <Step4 data={formData} errors={errors} update={update} t={t} />
                      )}
                      {step === 4 && (
                        <Step5 data={formData} errors={errors} update={update} t={t} />
                      )}
                      {step === 5 && (
                        <Step6Review data={formData} goToStep={goToStep} t={t} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation bar */}
                <div className="px-7 lg:px-8 py-5 border-t border-white/8 flex items-center justify-between gap-4">
                  {/* Back */}
                  <motion.button
                    type="button"
                    onClick={prev}
                    disabled={step === 0}
                    whileHover={{ scale: step > 0 ? 1.03 : 1 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-sm font-medium hover:bg-white/10 hover:text-white transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {t("back")}
                  </motion.button>

                  {/* Continue / Submit */}
                  {step < TOTAL_STEPS - 1 ? (
                    <motion.button
                      type="button"
                      onClick={next}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="relative flex items-center gap-2 px-7 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-semibold rounded-xl overflow-hidden group hover:shadow-[0_0_28px_rgba(6,182,212,0.45)] transition-shadow duration-300"
                    >
                      <span className="relative z-10">{t("continue")}</span>
                      <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform duration-200" />
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="relative flex items-center gap-2 px-7 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-semibold rounded-xl overflow-hidden group hover:shadow-[0_0_28px_rgba(6,182,212,0.45)] transition-shadow duration-300 disabled:opacity-60 disabled:pointer-events-none"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin relative z-10" />
                          <span className="relative z-10">{t("sending")}</span>
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 relative z-10" />
                          <span className="relative z-10">{t("submit")}</span>
                        </>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  )}
                </div>

                {/* Error state */}
                <AnimatePresence>
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-7 lg:px-8 pb-5"
                    >
                      <div className="p-4 bg-red-500/8 border border-red-500/20 rounded-xl flex items-start gap-3">
                        <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-red-300 font-medium">
                            {t("errorTitle")}
                          </p>
                          <p className="text-xs text-red-400/70 mt-0.5">
                            {errorMessage}
                          </p>
                          <p className="text-xs text-slate-500 mt-2">
                            {t("errorContact")}{" "}
                            <a
                              href="mailto:hello@lopes2tech.ch"
                              className="text-cyan-400 hover:underline"
                            >
                              hello@lopes2tech.ch
                            </a>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-slate-700 mt-5">
            {t("footer")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
