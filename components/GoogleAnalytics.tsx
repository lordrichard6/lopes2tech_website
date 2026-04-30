import Script from "next/script";

const GA_MEASUREMENT_ID = "G-P45F7T7PLH";

export default function GoogleAnalytics() {
    return (
        <>
            {/* Consent Mode v2 defaults — must run BEFORE gtag.js loads (EU mandate). */}
            <Script
                id="ga-consent-default"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'functionality_storage': 'denied',
              'personalization_storage': 'denied',
              'security_storage': 'granted',
              'wait_for_update': 500
            });
          `,
                }}
            />
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
          `,
                }}
            />
        </>
    );
}
