<div align="center">

# 🚀 Lopes2Tech Website V2

### Modern, Multi-language Business Website

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)

**Professional IT solutions, process automation, and custom software development**

[🌐 Live Website](https://lopes2tech.ch) • [📧 Contact](https://lopes2tech.ch/en/contact)

</div>

---

## ✨ Features

### 🌍 Multi-Language Support
- **3 Languages**: English, Portuguese, German
- **Auto-detection**: Automatically redirects users to their browser's preferred language
- **SEO Optimized**: Proper hreflang tags for search engines

### 📊 Triple Analytics Stack
- **Vercel Analytics** - Performance metrics & Core Web Vitals
- **Google Analytics 4** - Traffic analysis & conversions
- **Microsoft Clarity** - Session recordings & heatmaps

### 🔍 SEO & Performance
- **Perfect SEO**: Meta tags, Open Graph, Twitter Cards
- **Structured Data**: JSON-LD schema for LocalBusiness
- **Geographic Tags**: Optimized for Zurich/Switzerland
- **Mobile First**: Responsive design with viewport optimization
- **Theme Color**: PWA-ready with theme-color meta tag

### 🍪 Privacy & Compliance
- **GDPR Cookie Consent**: Custom banner with localStorage persistence
- **Consent Mode v2**: Google Analytics consent management
- **Privacy First**: Analytics denied by default until user consent

### 🎨 Modern UI/UX
- **Gradient Animations**: Dynamic, eye-catching design
- **Glassmorphism**: Modern UI effects
- **Framer Motion**: Smooth animations and transitions
- **Dark Mode Ready**: Theme color integration

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16.1.6 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Animations** | Framer Motion 12 |
| **i18n** | next-intl 4.8.2 |
| **Icons** | Lucide React |
| **Deployment** | Vercel |
| **Analytics** | Vercel + GA4 + Clarity |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Vercel account (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/lordrichard6/lopes2tech_website.git
cd lopes2tech_website_v2

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values
```

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Platform V2 API Configuration
NEXT_PUBLIC_PLATFORM_URL=http://localhost:3000
NEXT_PUBLIC_PLATFORM_API_SECRET=your_api_secret_here

# Platform API for contact form integration
NEXT_PUBLIC_PLATFORM_API_URL=https://lopes2tech.ch/api

# Microsoft Clarity Project ID
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_clarity_project_id
```

### Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 📁 Project Structure

```
lopes2tech_website_v2/
├── app/
│   ├── [locale]/          # Internationalized pages
│   │   ├── layout.tsx     # Root layout with analytics
│   │   ├── page.tsx       # Home page
│   │   ├── about/         # About/Founder page
│   │   ├── contact/       # Contact form
│   │   ├── services/      # Services catalog
│   │   ├── portfolio/     # Portfolio showcase
│   │   └── insights/      # Blog/articles
│   └── globals.css        # Global styles
├── components/
│   ├── GoogleAnalytics.tsx    # GA4 integration
│   ├── Clarity.tsx            # Microsoft Clarity
│   ├── CookieConsent.tsx      # GDPR banner
│   ├── JsonLd.tsx             # Structured data
│   └── ...                    # UI components
├── messages/
│   ├── en.json            # English translations
│   ├── pt.json            # Portuguese translations
│   └── de.json            # German translations
├── middleware.ts          # Locale detection & routing
└── i18n.ts               # i18n configuration
```

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Link to Vercel project
vercel link

# Add environment variables
echo "your_clarity_id" | vercel env add NEXT_PUBLIC_CLARITY_PROJECT_ID production

# Deploy to production
vercel --prod
```

### Environment Variables on Vercel

Set these in your Vercel project settings or via CLI:
- `NEXT_PUBLIC_PLATFORM_API_URL`
- `NEXT_PUBLIC_CLARITY_PROJECT_ID`

---

## 📊 Analytics Setup

### Google Analytics 4
The GA4 tracking code is already integrated. The measurement ID is `G-P45F7T7PLH`.

### Microsoft Clarity
1. Sign up at [clarity.microsoft.com](https://clarity.microsoft.com/)
2. Create a new project
3. Copy your project ID
4. Add to `.env.local` and Vercel environment variables

---

## 🌍 Internationalization

### Supported Languages
- 🇬🇧 English (`/en`)
- 🇵🇹 Portuguese (`/pt`)
- 🇩🇪 German (`/de`)

### Adding Translations
1. Add keys to `messages/en.json`
2. Translate to `messages/pt.json`
3. Translate to `messages/de.json`

### Usage in Components
```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('ComponentName');
  return <h1>{t('title')}</h1>;
}
```

---

## 🎯 Key Features Implemented

- ✅ Multi-language routing with auto-detection
- ✅ Google Analytics 4 with consent mode
- ✅ Microsoft Clarity session recordings
- ✅ GDPR-compliant cookie consent
- ✅ SEO optimization (meta tags, JSON-LD, hreflang)
- ✅ Contact form integration with Platform V2
- ✅ Custom package builder with pricing calculator
- ✅ Cal.com integration for booking consultations
- ✅ Blog/insights section
- ✅ Portfolio showcase
- ✅ Responsive design (mobile-first)

---

## 📝 License

Copyright © 2026 Lopes2Tech. All rights reserved.

---

## 👨‍💻 Developer

**Paulo R. Lopes**  
📧 paulo@lopes2tech.ch  
🌐 [lopes2tech.ch](https://lopes2tech.ch)  
💼 [LinkedIn](https://www.linkedin.com/company/lopes2tech/)

---

<div align="center">

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

</div>
