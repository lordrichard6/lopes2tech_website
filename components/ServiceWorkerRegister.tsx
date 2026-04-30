"use client";

import { useEffect } from "react";

/**
 * Service worker DEREGISTRATION component.
 *
 * The previous /sw.js was half-implemented — cached two assets, raced
 * cache-vs-network, and offered no offline fallback. Removed 2026-04-30.
 *
 * This component now unregisters any leftover SW from older deploys so
 * existing users don't get stuck on cached old JS. Keep mounted until
 * ~2026-08-01, then delete this file and its import in
 * `app/[locale]/layout.tsx`.
 */
export default function ServiceWorkerRegister() {
    useEffect(() => {
        if (!("serviceWorker" in navigator)) return;
        navigator.serviceWorker.getRegistrations?.().then((regs) => {
            regs.forEach((r) => r.unregister());
        });
    }, []);

    return null;
}
