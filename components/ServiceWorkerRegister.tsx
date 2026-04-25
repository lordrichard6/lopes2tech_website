"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
    useEffect(() => {
        if (!("serviceWorker" in navigator)) return;

        // In dev, localhost:3000 is shared with every other Next.js project we
        // run locally. A SW registered here would intercept requests for
        // sparkd, nexus, dark-monkey, etc. and block them via its baked-in
        // CSP. So: only register in production, and defensively unregister
        // any leftover SW from older dev builds that predate this guard.
        if (process.env.NODE_ENV === "production") {
            navigator.serviceWorker.register("/sw.js").catch(() => {
                // Registration failed silently
            });
        } else {
            navigator.serviceWorker.getRegistrations?.().then((regs) => {
                regs.forEach((r) => r.unregister());
            });
        }
    }, []);

    return null;
}
