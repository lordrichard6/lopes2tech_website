import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
    locales: ['en', 'pt', 'de'],
    defaultLocale: 'en',
    localeDetection: true
});

export default function middleware(request: NextRequest) {
    const response = intlMiddleware(request);

    // Set currency cookie based on visitor country (provided by Vercel automatically)
    // Only CH (Switzerland) and LI (Liechtenstein) use CHF — everyone else gets EUR
    if (!request.cookies.has('currency')) {
        const country = request.headers.get('x-vercel-ip-country') ?? 'CH';
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
