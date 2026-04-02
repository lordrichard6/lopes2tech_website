import Image from "next/image";
import Link from "next/link";
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="inline-block">
          <Image
            src="/logo_w.svg"
            alt="Lopes2Tech"
            width={140}
            height={36}
            priority
          />
        </Link>
        <LocaleSwitcher variant="dark" />
      </header>
      {children}
    </>
  );
}
