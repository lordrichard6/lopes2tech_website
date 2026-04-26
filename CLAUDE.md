# lopes2tech_website — Agent Playbook

> Project-specific rules for `projects/Lopes2tech/lopes2tech_website`. The top-level `/Users/paulolopes/Desktop/lopes2tech/CLAUDE.md` still applies; this file adds the stack, idioms, and landmines that are particular to this codebase.

## Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **i18n:** `next-intl` — 5 locales: `['en', 'pt', 'de', 'fr', 'it']`
- **Routing:** `app/[locale]/*`. Every route lives under a locale segment.
- **Styling:** Tailwind CSS, global CSS in `app/globals.css`
- **Analytics:** Vercel Analytics, Google Analytics, Microsoft Clarity
- **Payments:** Stripe (for the in-development store — currently gated)
- **Email:** Resend
- **Bookings:** cal.com embed
- **Deployment:** Vercel (GitHub → `main` branch → auto-deploy)
- **CI:** GitHub Actions builds the project independently of Vercel. Any module-scope code that touches env vars will crash CI even if it's fine on Vercel.

## Preview / verification

- **Never run `preview_start`.** Next.js lock file error — the user runs `npm run dev` on port 3000 themselves.
- **Verification:** `npx tsc --noEmit` + JSON validation (for `messages/*.json`) + structural node checks. That's it. Do not open a browser.

## Domains & SEO — landmines

1. **Primary domain is `https://www.lopes2tech.ch`.** Apex `lopes2tech.ch` 307-redirects to www. Every canonical, `metadataBase`, OpenGraph URL, JSON-LD `@id`, sitemap `BASE_URL`, and RSS feed URL MUST use `www.`. Using the apex puts Google into a redirect/canonical loop that shows up as "Page with redirect" / "Alternative page with proper canonical" in GSC.

2. **The root `app/[locale]/layout.tsx` MUST NOT set `alternates.canonical`.** Next.js inherits that canonical into every child page that lacks its own `generateMetadata` override → every locale claims to be the English homepage → GSC flags them as duplicates. Only the `metadataBase` and `alternates.languages` (if needed) belong at the root. Leave `canonical` to each page.

3. **Every indexable page sets its own locale-aware canonical** via its local layout's `generateMetadata`. Pattern:
   ```ts
   alternates: {
     canonical: `${BASE_URL}/${locale}${path}`,
     languages: { "x-default": `${BASE_URL}/en${path}`, en: `...`, de: `...`, ... },
   }
   ```

4. **Portfolio detail routes don't exist.** `app/[locale]/portfolio/[slug]/` is not built — only the listing page is. `app/sitemap.ts` therefore keeps `void projects` as a breadcrumb; do not re-add per-project URL emission until detail pages ship (otherwise Google records 95 × 404s).

5. **Sitemap URL count** after the April 2026 cleanup: 21 static pages × 5 locales (~105) + ~12 blog posts × 5 locales (~60) = **~165 valid URLs**. If GSC shows ~260, the old sitemap is still cached — deploy hasn't propagated or GSC hasn't re-read.

6. **Resubmit the sitemap in GSC after any sitemap.ts change** (Sitemaps → row → ⋮ → Resubmit). Otherwise dead URLs stay in Google's queue for weeks.

## Build / prerender landmines

7. **Stripe and Resend clients are lazy-initialized** in `app/api/webhooks/stripe/route.ts` and `app/actions/onboarding.ts`. DO NOT refactor to module-scope — CI build (GitHub Actions) crashes with "Neither apiKey nor config.authenticator provided" if env vars are absent at build time.

8. **`/onboarding/*` has a non-locale redirect** in `next.config.ts` → `/en/onboarding/*`. The old standalone `app/onboarding/` layout was deleted because it had no next-intl provider and prerender crashed. Do not re-create it; use the redirect + the existing `app/[locale]/onboarding/` route.

9. **`reactCompiler: true` in `next.config.ts`.** First diagnostic step for any rendering oddity (stale state, re-render loops, hydration mismatches): flip it off temporarily to isolate.

10. **`generateStaticParams` must include all 5 locales** in every `[locale]` layout. Miss one and that locale silently 404s without a build error.

## CSP

- `connect-src` allowlists `www.lopes2tech.ch` + `app.lopes2tech.ch`. Any new API subdomain (analytics vendor, etc.) needs a CSP update in `next.config.ts` or it's silently blocked in the browser.

## i18n mechanics

- Translations live in `messages/*.json` — one file per locale. Keys must match across all 5. A missing key in one locale renders raw key text in production.
- `setRequestLocale(locale)` must be called in every page/layout that uses `getTranslations` to enable static rendering.

## Hygiene

- **Never `git commit` or `git push`** without an explicit user instruction. Verification stops at `tsc --noEmit`.
- **Never `echo VAR_VALUE | vercel env add`** — trailing `\n` corrupts the value (breaks Stripe keys, URLs). Use `printf` or the Vercel REST API.
- **Scope stays tight.** If lint/build breaks something outside the task, stop and ask rather than fanning out fixes.

## Hidden-by-design pages — DO NOT surface

The following routes are intentionally **excluded from the navbar AND from `app/sitemap.ts`**:

- `/ebooks` — store is live with real Stripe links, but kept off public navigation by owner's choice
- `/referral-portugal` — geo-targeted variant of `/referral`, served only via direct link
- `/pricing-portugal` — geo-targeted variant of `/pricing`, served only via direct link

Do NOT add them to the navbar, sitemap, or footer "discover more" sections. If you find yourself "fixing" the missing nav entry, stop — it is intentional.

## Newsletter — no persistent list

`components/NewsletterSignup.tsx` + `app/actions/contact.ts` send a Resend email notification to Paulo on every signup. There is **no Mailchimp / ConvertKit / Resend Audiences integration** — subscribers are not stored anywhere. Treat this as a notification flow, not a mailing list. If the owner wants a real list, that's a build, not a config tweak.

## Ebooks catalog — hardcoded

The book catalog lives directly in `app/[locale]/ebooks/page.tsx` as a `const EBOOKS` array (titles, prices, Stripe links, covers). There is no CMS or data file. Stripe buy links are hardcoded URLs (not env vars) — pointing at live Stripe hosted-payment pages — so a refactor that swaps URLs into env will break the live store.

## cal.com is deprecated

The owner stopped using cal.com. `components/HireMeSection.tsx` previously linked to `cal.com/lopes2tech/initial-consult`; that URL has been replaced with `WHATSAPP_URL`. Do not re-introduce cal.com embeds or links anywhere.

## Update this file

When a new landmine is discovered, add it here with the date and a one-line description of the symptom. The top-level CLAUDE.md calls this "self-anneal on failure" — a bug found once should not bite twice.
