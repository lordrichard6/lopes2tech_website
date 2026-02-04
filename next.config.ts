import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  reactCompiler: true,
  compress: true, // Enable gzip/brotli compression

  headers: async () => [
    {
      source: '/:path*',
      headers: [
        // Prevent clickjacking
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        // Prevent MIME sniffing
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        // XSS Protection
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        // Referrer Policy
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        // Permissions Policy - restrict features
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
        // Content Security Policy
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.google-analytics.com *.clarity.ms *.vercel-scripts.com *.vercel.app https://va.vercel-scripts.com",
            "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
            "img-src 'self' data: https: blob:",
            "font-src 'self' data: fonts.gstatic.com",
            "connect-src 'self' *.google-analytics.com *.analytics.google.com *.googletagmanager.com *.clarity.ms *.vercel.app vitals.vercel-insights.com lopes2tech.ch",
            "frame-src 'self' https://cal.com",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-ancestors 'none'",
          ].join('; '),
        },
      ],
    },
    {
      // Cache static assets aggressively
      source: '/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      // Cache images and fonts
      source: '/:path*.@(jpg|jpeg|png|gif|ico|svg|webp|woff|woff2|ttf|otf)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};

export default withNextIntl(nextConfig);
