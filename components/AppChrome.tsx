"use client";

import { usePathname } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppButton from "@/components/WhatsAppButton";
import GrainOverlay from "@/components/GrainOverlay";
import CustomCursor from "@/components/CustomCursor";

/**
 * AppChrome — wraps page content with the cinematic chrome (SmoothScroll,
 * cursor, grain, WhatsApp CTA), but suppresses ALL of it on `/onboarding/*`
 * so that conversion-critical pages stay light and focused.
 *
 * The cookie banner, analytics scripts, etc. stay mounted in the root layout —
 * they're not chrome, they're compliance/measurement.
 */
export default function AppChrome({ children }: { children: React.ReactNode }) {
    const pathname = usePathname() ?? "";
    const isOnboarding = /^\/[a-z]{2}\/onboarding(\/|$)/.test(pathname);

    if (isOnboarding) {
        // Bare: skip lerp scroll, cursor, grain, WhatsApp button.
        return <div id="main-content">{children}</div>;
    }

    return (
        <>
            <SmoothScroll>
                <div id="main-content">{children}</div>
            </SmoothScroll>
            <WhatsAppButton />
            <GrainOverlay />
            <CustomCursor />
        </>
    );
}
