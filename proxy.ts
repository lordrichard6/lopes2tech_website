import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
    locales: ['en', 'pt', 'de', 'fr', 'it'],
    defaultLocale: 'en',
    localeDetection: true
});

export default function middleware(request: NextRequest) {
    const response = intlMiddleware(request);

    // Set currency cookie based on visitor country (Vercel injects the header).
    // Only CH (Switzerland) and LI (Liechtenstein) use CHF — everyone else,
    // including local dev and self-hosted (where the header is missing), gets
    // EUR as a neutral default.
    if (!request.cookies.has('currency')) {
        const country = request.headers.get('x-vercel-ip-country');
        const currency = (country === 'CH' || country === 'LI') ? 'CHF' : 'EUR';
        response.cookies.set('currency', currency, {
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
            sameSite: 'lax',
        });
    }

    return response;
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
