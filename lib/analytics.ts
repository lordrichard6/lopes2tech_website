declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        gtag: (...args: any[]) => void;
    }
}

export function trackEvent(action: string, category: string, label?: string, value?: number) {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
}

export function trackFormSubmission(formName: string) {
    trackEvent('form_submission', 'engagement', formName);
}

export function trackCTAClick(ctaName: string) {
    trackEvent('cta_click', 'engagement', ctaName);
}

export function trackServiceView(serviceName: string) {
    trackEvent('service_view', 'content', serviceName);
}

export function trackBlogRead(slug: string) {
    trackEvent('blog_read', 'content', slug);
}
