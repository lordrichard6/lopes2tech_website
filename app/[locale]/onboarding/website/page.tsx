import type { Metadata } from "next";
import WebsiteOnboardingForm from "@/components/onboarding/WebsiteOnboardingForm";

export const metadata: Metadata = {
  title: "Website Project Onboarding — Lopes2Tech",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WebsiteOnboardingPage() {
  return <WebsiteOnboardingForm />;
}
