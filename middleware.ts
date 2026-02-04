import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'pt', 'de'],

    // Used when no locale matches
    defaultLocale: 'en',

    // Enable automatic locale detection from browser's Accept-Language header
    localeDetection: true
});

export const config = {
    // Skip all paths that should not be internationalized
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
