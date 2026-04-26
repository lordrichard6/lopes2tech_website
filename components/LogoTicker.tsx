"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const tickerItems = [
  { type: "logo" as const, src: "/logos/clinika_logo.svg",       alt: "ClíniKa OS",         w: 96,  h: 32 },
  { type: "logo" as const, src: "/logos/darkmonkey_logo.webp",   alt: "Dark Monkey",        w: 44,  h: 44 },
  { type: "logo" as const, src: "/logos/menteiq_logo_white.svg", alt: "menteIQ",            w: 88,  h: 28 },
  { type: "logo" as const, src: "/logos/mimesa_logo.png",        alt: "miMesa",             w: 80,  h: 28 },
  { type: "text" as const, label: "Ribeiro Consulting" },
  { type: "text" as const, label: "Safira Reinigung"   },
  { type: "text" as const, label: "Silvio Photo"       },
  { type: "text" as const, label: "Next.js 15"         },
  { type: "text" as const, label: "TypeScript"         },
  { type: "text" as const, label: "Meta Ads"           },
  { type: "text" as const, label: "Google Ads"         },
  { type: "text" as const, label: "Stripe"             },
];

type TickerItemType = typeof tickerItems[0];

function TickerItem({ item }: { item: TickerItemType }) {
  if (item.type === "logo") {
    return (
      <div className="flex items-center justify-center px-8 shrink-0">
        <Image
          src={item.src}
          alt={item.alt}
          width={item.w}
          height={item.h}
          className="object-contain h-6 w-auto opacity-30 brightness-0 invert transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:opacity-60"
        />
      </div>
    );
  }
  return (
    <div className="flex items-center px-8 shrink-0">
      <span className="text-white/25 text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-white/50 select-none">
        {item.label}
      </span>
    </div>
  );
}

/**
 * LogoTicker — CSS transform-based infinite scroll strip.
 * Pure CSS animation (no JS/RAF) keeps it GPU-safe and off the main thread.
 * Items are duplicated for seamless infinite loop.
 */
export default function LogoTicker() {
  const t = useTranslations("LogoTicker");

  return (
    <div className="relative bg-[#080d1a] border-y border-white/[0.06] overflow-hidden">
      <p className="text-center text-[10px] uppercase tracking-[0.25em] text-white/35 font-semibold pt-5 pb-3">
        {t("trustedBy")}
      </p>

      <div className="relative pb-5 overflow-hidden">
      {/* Left fade */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#080d1a] to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#080d1a] to-transparent z-10 pointer-events-none" />

      {/* Scrolling track — duplicated for seamless loop */}
      <div
        className="flex items-center will-change-transform motion-reduce:[animation-play-state:paused]"
        style={{ animation: "logo-ticker 28s linear infinite", width: "max-content" }}
      >
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <TickerItem key={i} item={item} />
        ))}
      </div>

      <style>{`
        @keyframes logo-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
      </div>
    </div>
  );
}
