export interface Project {
    slug: string;
    image: string;
    type: "web-app" | "website";
    link?: string;
    isInDevelopment?: boolean;
    isOnHold?: boolean;
}

export const projects: Project[] = [
    // Web Apps (live first, then in-development)
    { slug: "clinika-os", image: "/proj/clinika_os_mockup.webp", type: "web-app", link: "https://www.clinika-os.ch/" },
    { slug: "dark-monkey", image: "/proj/dark_monkey_mockup.webp", type: "web-app", link: "https://www.dark-monkey.ch/" },
    { slug: "menteiq", image: "/proj/menteiq_mockup.webp", type: "web-app", link: "https://menteiq.ch/", isInDevelopment: true },
    { slug: "mimesa", image: "/proj/mimesa_mockup.webp", type: "web-app", link: "https://www.mimesa.ch/", isInDevelopment: true },
    { slug: "pali-ai", image: "/proj/pali_mockup.webp", type: "web-app", isInDevelopment: true },
    { slug: "theraflow", image: "/proj/theraflow_mockup.webp", type: "web-app", link: "https://www.theraflow-crm.ch/", isOnHold: true },
    { slug: "finito-pro", image: "/proj/finito_mockup.webp", type: "web-app", link: "https://www.finitopro.ch/" },
    { slug: "noff", image: "/proj/noff_mockup.webp", type: "web-app", link: "https://noff.ch/" },
    { slug: "draftmode", image: "/proj/draftmode_mockup.webp", type: "web-app", isInDevelopment: true },
    // Websites (real clients first, newest → oldest, then mockup projects)
    { slug: "safira-reinigung", image: "/proj/safira_reinigung_mockup.webp", type: "website", link: "https://safirareinigungwebsite.vercel.app/" },
    { slug: "silvio-photography", image: "/proj/silvio_mockup.webp", type: "website", link: "https://www.silviovalentt.pt/" },
    { slug: "ribeiro-consulting", image: "/proj/ribeiro_mockup.webp", type: "website", link: "https://ribeiroconsulting.ch/pt" },
    { slug: "costeleta-dourada", image: "/proj/costeleta_mockup.webp", type: "website", link: "https://costeleta-dourada.vercel.app/" },
    { slug: "forma", image: "/proj/forma_mockup.webp", type: "website", link: "https://forma-architects-fawn.vercel.app/" },
    { slug: "alentseguros", image: "/proj/alentseguros_mockup.webp", type: "website", link: "https://alenteseguros.vercel.app/" },
    { slug: "apex-consulting", image: "/proj/apex_consulting_mockup.webp", type: "website", link: "https://apex-consulting-iota.vercel.app/" },
    { slug: "nexus-accounting", image: "/proj/nexus_accounting_mockup.webp", type: "website", link: "https://nexus-accounting-ten.vercel.app/" },
    { slug: "elite-estates", image: "/proj/elite_estates_mockup.webp", type: "website", link: "https://elite-estates-psi.vercel.app/" },
    { slug: "serene-spa", image: "/proj/serene_spa_mockup.webp", type: "website", link: "https://serene-spa-tawny.vercel.app/" },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find(p => p.slug === slug);
}

export function getAllSlugs(): string[] {
    return projects.map(p => p.slug);
}
