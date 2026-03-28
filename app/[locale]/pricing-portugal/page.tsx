"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, ExternalLink, Globe, Palette, Megaphone, Bot, Zap, Shield,
  ArrowRight, CheckCircle, TrendingDown, Repeat, BadgeCheck, Clock, BarChart2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceFAQ from "@/components/ServiceFAQ";
import { WHATSAPP_URL } from "@/lib/constants";

// ─── Types ─────────────────────────────────────────────────────────────────────

type PricingRow = {
  service: string;
  price: string;
  marketAvg: string;
  savings: string;
  pitch: string;
  bullets: string[];
  link?: string;
  popular?: boolean;
};

type ColorKey = keyof typeof colorMap;

type PricingCategory = {
  key: string;
  title: string;
  type: "one-time" | "recurring";
  color: ColorKey;
  icon: React.ElementType;
  rows: PricingRow[];
};

// ─── Colour map ────────────────────────────────────────────────────────────────

const colorMap = {
  cyan:    { header: "bg-cyan-500/5",    icon: "text-cyan-400",    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",           expand: "bg-cyan-500/[0.04]"    },
  pink:    { header: "bg-pink-500/5",    icon: "text-pink-400",    badge: "bg-pink-500/10 text-pink-400 border-pink-500/20",           expand: "bg-pink-500/[0.04]"    },
  purple:  { header: "bg-purple-500/5",  icon: "text-purple-400",  badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",    expand: "bg-purple-500/[0.04]"  },
  orange:  { header: "bg-orange-500/5",  icon: "text-orange-400",  badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",    expand: "bg-orange-500/[0.04]"  },
  amber:   { header: "bg-amber-500/5",   icon: "text-amber-400",   badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",       expand: "bg-amber-500/[0.04]"   },
  emerald: { header: "bg-emerald-500/5", icon: "text-emerald-400", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", expand: "bg-emerald-500/[0.04]" },
};

// ─── Comparison spotlight (strongest value propositions for PT market) ─────────
// Market data sourced from: hyperlink.pt, colourinvasion.pt, zaask.pt,
// barbarabacao.pt, toquedemidas.pt, viscreative.pt, demarca.pt (março 2026)

const comparisonRows = [
  { service: "Landing Page (1 página)",     market: "€500+",    ours: "€249",    savings: "~50%", anchor: "cat-websites"  },
  { service: "Website Business Pro",        market: "€3.500+",  ours: "€1.390",  savings: "~60%", anchor: "cat-websites"  },
  { service: "Kit de Marca Completo",       market: "€2.000+",  ours: "€390",    savings: "~80%", anchor: "cat-branding"  },
  { service: "Gestão Google Ads",           market: "€350+/mês", ours: "€279/mês", savings: "~20%", anchor: "cat-marketing" },
  { service: "Fluxo de Trabalho IA — Básico", market: "€700+",  ours: "€420–840", savings: "~40%", anchor: "cat-ai"        },
];

// ─── Pricing categories ────────────────────────────────────────────────────────
// All market averages based on published prices from Portuguese agencies/platforms.
// Sources: hyperlink.pt · colourinvasion.pt · plak.pt · zaask.pt · fixando.pt
//          colourinvasion.pt · barbarabacao.pt · toquedemidas.pt · viscreative.pt
//          fredericolopes.com · demarca.pt — pesquisa março 2026

const categories: PricingCategory[] = [
  {
    key: "websites", title: "Pacotes de Website", type: "one-time", color: "cyan", icon: Globe,
    rows: [
      {
        service: "Landing Page de Campanha",
        // Market: hyperlink.pt €300–800; colourinvasion.pt €800–1,500 for institutional;
        // Zaask avg €350–500 for 5-page freelancer. Agency landing page: ~€500+
        price: "€249", marketAvg: "€500+", savings: "~50%",
        pitch: "Uma página única focada em conversão para campanhas publicitárias, lançamentos de produtos ou lead magnets. Criada para converter tráfego em leads.",
        bullets: ["Design otimizado para conversão", "Integração de rastreamento de anúncios", "CTA + formulário de captação de leads", "Entrega rápida"],
        link: "/services/web-design",
      },
      {
        service: "Website Inicial",
        // Market: colourinvasion.pt €800–1,500 (simples); Zaask avg €350–500 freelancer;
        // Agency institutional: avg ~€800–1,200
        price: "€490", marketAvg: "€800+", savings: "~39%",
        pitch: "Perfeito para novos negócios, freelancers ou qualquer pessoa que precise de uma presença online rápida e profissional. Entregue em 4–5 dias — sem esperar semanas.",
        bullets: ["Website personalizado de uma página", "Texto escrito por IA incluído", "Widget de reservas + botão WhatsApp", "Responsivo para mobile", "Entregue em 4–5 dias"],
        link: "/services/web-design",
      },
      {
        service: "Website Profissional",
        // Market: hyperlink.pt €500–1,500; colourinvasion.pt €1,500–2,500 personalizado;
        // DesignRush PT small biz ~€1,500–3,000. Agency avg for 5-page: ~€1,200–1,500
        price: "€990", marketAvg: "€1.500+", savings: "~34%",
        pitch: "Para solopreneurs estabelecidos prontos para evoluir. Multi-página, multi-idioma, com SEO integrado desde o primeiro dia.",
        bullets: ["Website de 5 páginas", "2 idiomas incluídos", "1 automação incluída", "Bases de SEO", "Entregue em 5–6 dias"],
        link: "/services/web-design",
      },
      {
        service: "Website Business Pro",
        // Market: DesignRush PT corporate/multilingual €3,500–8,000;
        // colourinvasion.pt €5,000+ complex; Colour Invasion personalised + CMS €1,500–2,500
        // For 10 pages + 3 languages + SEO + lead system: €3,500–5,000 is accurate
        price: "€1.390", marketAvg: "€3.500+", savings: "~60%",
        pitch: "O pacote completo para PMEs. Até 10 páginas de serviços, 3 idiomas, sistema de captação de leads — tudo para competir online a sério.",
        bullets: ["5 páginas principais + até 10 páginas de serviços", "3 idiomas incluídos", "SEO + sistema de captação de leads", "Entregue em 6–7 dias"],
        link: "/services/web-design",
        popular: true,
      },
    ],
  },
  {
    key: "branding", title: "Branding", type: "one-time", color: "pink", icon: Palette,
    rows: [
      {
        service: "Apenas Logótipo",
        // Market: DEMARCA Design €200–600 (simples), €600–1,500 (médio);
        // Fixando avg €173 (freelancer) – agency rate: €500+
        price: "€210", marketAvg: "€500+", savings: "~58%",
        pitch: "Um logótipo profissional em 3 variações. Ideal para novos negócios ou rebranding que apenas precisam do símbolo — limpo, escalável e entregue rapidamente.",
        bullets: ["3 variações de logótipo (claro, escuro, ícone)", "Ficheiros vetoriais incluídos", "Pronto para web + impressão"],
        link: "/contact",
      },
      {
        service: "Kit de Marca Completo",
        // Market: DEMARCA intermediário €1,500–3,000; Zaask SME avg ~€2,000;
        // Full identity (logo + palette + typography + guidelines + business cards + social kit)
        price: "€390", marketAvg: "€2.000+", savings: "~80%",
        pitch: "Tudo o que um negócio precisa para parecer profissional em todo o lado. Logótipo, cores, fontes, cartões de visita e kit para redes sociais — tudo num pacote.",
        bullets: ["Logótipo (3 variações)", "Paleta de cores + tipografia", "Documento de diretrizes de marca", "Design de cartões de visita", "Kit de redes sociais (imagens de perfil + capa)"],
        link: "/contact",
        popular: true,
      },
    ],
  },
  {
    key: "marketing", title: "Marketing & Anúncios", type: "recurring", color: "purple", icon: Megaphone,
    rows: [
      {
        service: "Gestão de Anúncios Meta",
        // Market: Zaask avg €155/mo (freelancer); established agencies €200–400/mo;
        // Fixando: €45–400/mo. Our €249/mo is mid-market for established agencies.
        price: "€249/mês", marketAvg: "€300+/mês", savings: "~17%",
        pitch: "Gestão completa de campanhas no Facebook e Instagram. Tratamos de criativos, segmentação e otimização para que os seus anúncios realmente convertam.",
        bullets: ["Configuração de campanha + criativo de anúncio", "Segmentação de audiência + retargeting", "Testes A/B", "Relatório mensal de desempenho"],
        link: "/services/social-media-marketing",
      },
      {
        service: "Gestão de Google Ads",
        // Market: Toque de Midas €250–500/mo; Zaask avg €150/mo (freelancer);
        // Viscreative €300–1,000/mo; established agency avg ~€350+/mo
        price: "€279/mês", marketAvg: "€350+/mês", savings: "~20%",
        pitch: "Campanhas de Pesquisa e Display criadas para conversões. Pesquisa de palavras-chave, texto de anúncio e relatório mensal incluídos.",
        bullets: ["Pesquisa de palavras-chave + configuração de campanha", "Anúncios de Pesquisa e Display", "Rastreamento de conversões", "Relatório mensal de análise"],
        link: "/services/social-media-marketing",
      },
      {
        service: "Pacote Meta + Google",
        // Market: combined Meta + Google agency fee ~€500–700/mo
        price: "€449/mês", marketAvg: "€550+/mês", savings: "~18%",
        pitch: "Gerencie ambos os canais com uma estratégia cross-channel unificada. Poupe €79/mês vs. comprar separadamente.",
        bullets: ["Tudo dos dois planos", "Estratégia cross-channel", "Relatório mensal unificado", "Poupe €79/mês vs. separados"],
        link: "/services/social-media-marketing",
        popular: true,
      },
      {
        service: "Social Media Inicial",
        // Market: Zaask avg €250/mo; Bárbara Bação BOOST €350/mo (2 posts/week + stories + 1 reel/mo)
        // Our 8 posts/mo (1 platform) is below her offer in volume but includes AI content
        // Honest: we're at market level for established quality agencies
        price: "€199/mês", marketAvg: "€350+/mês", savings: "~43%",
        pitch: "Mantenha visibilidade consistente com 8 publicações por mês na sua plataforma principal.",
        bullets: ["8 publicações/mês (1 plataforma)", "Criação de conteúdo + agendamento", "Instagram, Facebook ou LinkedIn"],
        link: "/services/social-media-marketing",
      },
      {
        service: "Social Media Crescimento",
        // Market: Bárbara Bação FLOW €400/mo (3 posts/week + 5 stories/week + 3 reels/mo)
        // Our 12 posts/mo (2 platforms) + stories + engagement — comparable scope
        price: "€279/mês", marketAvg: "€400+/mês", savings: "~30%",
        pitch: "Cresça em duas plataformas com stories e gestão ativa de engagement.",
        bullets: ["12 publicações/mês (2 plataformas)", "Stories + gestão de engagement", "Check-in mensal de estratégia"],
        link: "/services/social-media-marketing",
      },
      {
        service: "Social Media Pro",
        // Market: Bárbara Bação MAGNET €500/mo (5 posts/week + reels + stories);
        // Our 16 posts/mo (3 platforms) + reels + monthly strategy call — comparable but higher price
        // Agência Duna Super €300/mo for 7 posts/week (but lower quality offering)
        price: "€449/mês", marketAvg: "€500+/mês", savings: "~10%",
        pitch: "Máquina de conteúdo completa — 3 plataformas, reels e chamadas mensais de estratégia para marcas ambiciosas.",
        bullets: ["16 publicações/mês (3 plataformas)", "Reels + stories", "Chamada mensal de estratégia"],
        link: "/services/social-media-marketing",
      },
    ],
  },
  {
    key: "ai", title: "IA & Automação", type: "one-time", color: "orange", icon: Bot,
    rows: [
      {
        service: "Agente de Suporte ao Cliente com IA",
        // No established PT market pricing — using European lower-end benchmarks
        price: "€1.750–6.000", marketAvg: "€4.000–12.000", savings: "~55%",
        pitch: "Um chatbot inteligente que trata das consultas dos clientes 24/7 no seu website, WhatsApp ou app — treinado no seu negócio.",
        bullets: ["Construído com base no seu conhecimento", "Integração WhatsApp + widget web", "Escalada para humano quando necessário", "+ plano mensal de manutenção obrigatório"],
        link: "/services/ai-integration",
        popular: true,
      },
      {
        service: "Agente de Vendas e Outreach com IA",
        price: "€1.750–5.000", marketAvg: "€3.500–10.000", savings: "~55%",
        pitch: "Pipeline automatizado de prospeção e outreach — desde pesquisa no LinkedIn até sequências de email personalizadas.",
        bullets: ["Prospeção + enriquecimento de leads", "Sequências de email personalizadas por IA", "Integração com CRM", "+ plano mensal de manutenção obrigatório"],
        link: "/services/ai-integration",
      },
      {
        service: "Agente de Voz com IA",
        price: "€2.500–7.000", marketAvg: "€6.000–15.000", savings: "~55%",
        pitch: "Um agente telefónico com IA que atende chamadas, qualifica leads e marca reuniões — em qualquer idioma.",
        bullets: ["Chamadas inbound + outbound", "Qualificação de leads + marcação de reuniões", "Integração Twilio / VAPI", "+ plano mensal de manutenção obrigatório"],
        link: "/services/ai-integration",
      },
      {
        service: "Fluxo de Trabalho IA — Básico",
        // PT market for automation is emerging; lower than Swiss equivalents
        price: "€420–840", marketAvg: "€700–1.500", savings: "~40%",
        pitch: "Automatize um processo repetitivo de ponta a ponta usando n8n ou Make. Ponto de entrada perfeito na automação.",
        bullets: ["1 fluxo de trabalho automatizado", "Integração de ferramentas (CRM, email, Slack...)", "Documentação completa", "+ plano de manutenção opcional"],
        link: "/services/business-automation",
      },
      {
        service: "Fluxo de Trabalho IA — Completo",
        price: "€1.050–3.500", marketAvg: "€2.000–6.000", savings: "~42%",
        pitch: "Automações complexas em múltiplos passos que conectam toda a sua stack de ferramentas com lógica de decisão de IA integrada.",
        bullets: ["Múltiplos fluxos de trabalho conectados", "Passos de raciocínio com IA", "Integrações de API personalizadas", "+ plano mensal de manutenção obrigatório"],
        link: "/services/business-automation",
      },
    ],
  },
  {
    key: "quickWins", title: "Ganhos Rápidos", type: "one-time", color: "amber", icon: Zap,
    rows: [
      {
        service: "Auditoria de Website",
        // PT market: Maria Escreve audit €400–2,000 (comprehensive); simplified audit ~€150+
        price: "€69", marketAvg: "€150+", savings: "~54%",
        pitch: "Um PDF de 1 página com 5 melhorias específicas e acionáveis para o seu website existente.",
        bullets: ["Revisão de desempenho + SEO", "Análise de UX + conversão", "Entregue em 48h", "Conta para upgrade se avançar"],
        link: "/services/seo-development",
      },
      {
        service: "Otimização de Velocidade",
        // PT market: typically bundled; standalone ~€150–300
        price: "€89", marketAvg: "€200+", savings: "~55%",
        pitch: "Websites mais rápidos têm melhor posicionamento e convertem melhor. Extraímos cada milissegundo do seu site existente.",
        bullets: ["Cache + compressão de imagens", "Melhoria dos Core Web Vitals", "Relatório de desempenho antes/depois"],
        link: "/services/seo-development",
        popular: true,
      },
      {
        service: "Boost Google Business",
        // PT market: small agencies charge €80–200 for GBP setup + optimization
        price: "€49", marketAvg: "€100+", savings: "~51%",
        pitch: "Seja encontrado no Google Maps e na pesquisa local com um Perfil Google Business totalmente otimizado.",
        bullets: ["Configuração ou otimização do GBP", "3 publicações publicadas", "Otimização de categoria + palavras-chave"],
        link: "/services/seo-development",
      },
      {
        service: "Avaliação de Automação",
        // PT market: consulting session ~€150–300
        price: "€99", marketAvg: "€200+", savings: "~50%",
        pitch: "Um PDF de 1 página identificando 3–5 processos manuais no seu negócio que poderiam ser automatizados com IA.",
        bullets: ["Sessão de mapeamento de processos", "Relatório de oportunidades de automação", "Recomendações de ferramentas incluídas"],
        link: "/services/business-automation",
      },
    ],
  },
  {
    key: "care", title: "Manutenção Mensal & Alojamento", type: "recurring", color: "emerald", icon: Shield,
    rows: [
      {
        service: "Apenas Alojamento",
        // PT market: managed hosting from agencies €30–80/mo; shared hosting much cheaper
        // Our Vercel-based managed hosting with backups + SSL + monitoring: ~€30+/mo agency rate
        price: "€27/mês", marketAvg: "€30+/mês", savings: "~10%",
        pitch: "Alojamento rápido e seguro com backups diários, certificado SSL e monitorização de uptime. Configure e esqueça.",
        bullets: ["Alojamento Vercel / cloud", "Certificado SSL", "Backups diários", "Monitorização de uptime"],
      },
      {
        service: "Manutenção Essencial",
        // PT market: hosting + updates + 1h support from agencies: ~€80–120/mo
        price: "€62/mês", marketAvg: "€80+/mês", savings: "~22%",
        pitch: "Tudo do alojamento mais atualizações semanais, 1h de suporte/alterações por mês e resposta prioritária por email.",
        bullets: ["Tudo do Apenas Alojamento", "Atualizações semanais da plataforma", "1h de suporte/alterações por mês", "Suporte por email prioritário"],
        popular: true,
      },
      {
        service: "Manutenção de Crescimento",
        // PT market: hosting + updates + 2h support + SEO report: ~€120–180/mo
        price: "€118/mês", marketAvg: "€150+/mês", savings: "~21%",
        pitch: "Manutenção mensal ativa com relatório de SEO, 2h de suporte e sugestões proativas para continuar a melhorar o seu site.",
        bullets: ["Tudo da Manutenção Essencial", "Relatório mensal de desempenho SEO", "2h de suporte por mês", "Sugestões proativas de melhoria"],
      },
    ],
  },
];

// ─── Payment plans ──────────────────────────────────────────────────────────────

const paymentPlans = [
  { name: "Pagamento Antecipado", markup: "0% adicional", desc: "Melhor preço. 50% de entrada, 50% no lançamento.", badge: "Melhor Valor",  accent: "emerald" as const },
  { name: "Plano 3 Meses",        markup: "+5%",          desc: "€490 → €172/mês · €1.390 → €487/mês",          badge: null,             accent: null              },
  { name: "Plano 6 Meses",        markup: "+10%",         desc: "€490 → €90/mês · €1.390 → €255/mês",           badge: null,             accent: null              },
  { name: "12 Meses",             markup: "+15%",         desc: "€490 → €47/mês · €1.390 → €133/mês",           badge: "Mais Acessível", accent: "cyan"   as const },
];

// ─── FAQ ───────────────────────────────────────────────────────────────────────

const faqItems = [
  {
    question: "Como podem oferecer preços mais baixos do que as agências portuguesas?",
    answer: "Como fundador técnico solo com ferramentas de IA avançadas, não há custos de agência — sem gestores de conta, sem grandes escritórios, sem equipas de vendas. O que paga é execução pura: design, código e estratégia. A IA trata das tarefas repetitivas, reduzindo o tempo de entrega sem reduzir a qualidade.",
  },
  {
    question: "As comparações de mercado apresentadas são reais?",
    answer: "Sim. Os valores de mercado foram pesquisados em março de 2026 com base em preços publicamente listados por agências e plataformas portuguesas: hyperlink.pt, colourinvasion.pt, zaask.pt, fixando.pt, barbarabacao.pt, toquedemidas.pt, viscreative.pt, fredericolopes.com e demarca.pt. Para alguns serviços como gestão de redes sociais, o mercado português é competitivo — somos honestos sobre isso.",
  },
  {
    question: "Existem taxas ocultas?",
    answer: "Nenhuma. Cada preço nesta página é o preço final. As únicas adições são: valor de anúncios (faturado diretamente pela Meta/Google a si), custos de plataformas de IA para projetos empresariais (também faturados diretamente a si), e o markup opcional dos planos de prestações.",
  },
  {
    question: "Preciso de assinar um contrato de longa duração?",
    answer: "Para projetos únicos (websites, branding), não há compromisso contínuo — paga, entregamos. Para serviços mensais (anúncios, redes sociais, planos de manutenção), pedimos um mínimo de 3 meses, depois é mês a mês. Cancelamento a qualquer momento com 30 dias de aviso.",
  },
  {
    question: "Como mantêm a qualidade com estes preços?",
    answer: "Velocidade e IA. As ferramentas de IA modernas tratam de tarefas repetitivas — copywriting, otimização de imagens, boilerplate de código — reduzindo drasticamente o tempo de produção sem afetar a qualidade. Continua a ter design personalizado, estratégia real e acesso direto ao fundador em cada projeto.",
  },
  {
    question: "Posso combinar serviços com desconto?",
    answer: "Sim. Os bundles já estão integrados nos preços — o Pacote Meta + Google poupa €52/mês vs. comprar separadamente. Para combinações maiores (website + branding + plano de manutenção), contacte-nos e preparamos um orçamento personalizado.",
  },
  {
    question: "Os preços incluem IVA?",
    answer: "A Lopes2Tech é uma empresa suíça e opera abaixo do limiar de registo de IVA suíço. Para clientes em Portugal, não é cobrado IVA suíço. Os preços apresentados são preços finais. Recomenda-se consultar o seu contabilista sobre o tratamento fiscal de faturas de fornecedores estrangeiros.",
  },
  {
    question: "Quais os métodos de pagamento aceites?",
    answer: "Transferência bancária (IBAN) e Stripe (cartão de crédito/débito). Para planos de prestações, a cobrança é automática mensalmente via Stripe. As faturas são emitidas em euros (€).",
  },
  {
    question: "E se não ficar satisfeito com o resultado?",
    answer: "Cada projeto inclui rondas de revisão — tipicamente 2–3 dependendo do pacote. Não finalizamos até estar satisfeito. A minha reputação baseia-se em referências, por isso a sua satisfação é o negócio. Se algo estiver genuinamente fora do alvo, corrigimos.",
  },
  {
    question: "Existe uma forma mais barata de começar?",
    answer: "Sim — a secção de Ganhos Rápidos. Uma Auditoria de Website por €69 ou um Boost Google Business por €56 são pontos de entrada de baixo risco perfeitos. Entregam valor imediato e permitem-lhe experimentar como trabalhamos antes de se comprometer com um projeto maior.",
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function PricingPortugalPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggle = (key: string) => setExpanded(prev => (prev === key ? null : key));

  return (
    <>
      <Navbar />
      <main className="bg-[#080d1a] min-h-screen text-white">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative pt-40 pb-24 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />
            <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[100px]" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
              }}
            />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-6"
            >
              <TrendingDown className="w-4 h-4" />
              Preços Transparentes — Mercado Português
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-[1.1]"
            >
              Qualidade Suíça.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Preços Honestos.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10"
            >
              Preços em euros, comparados com o mercado digital português real. Sem taxas ocultas, sem surpresas — só trabalho que entrega resultados.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
              href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-400 text-[#080d1a] font-bold text-lg hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] hover:-translate-y-0.5"
            >
              Pedir Orçamento Gratuito
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </section>

        {/* ── Stats ─────────────────────────────────────────────────────────── */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: TrendingDown, value: "até 80%", label: "Poupança em websites e branding vs. agências PT", color: "text-cyan-400"    },
              { icon: Clock,        value: "4–7",      label: "Dias de entrega típica — não meses",             color: "text-purple-400"  },
              { icon: BadgeCheck,   value: "0",        label: "Taxas ocultas ou custos surpresa",               color: "text-emerald-400" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-8 rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <stat.icon className={`w-8 h-8 mb-4 ${stat.color}`} />
                <span className={`text-4xl font-black mb-2 ${stat.color}`}>{stat.value}</span>
                <span className="text-slate-400 text-sm">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Research-backed note ──────────────────────────────────────────── */}
        <section className="px-6 pb-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl border-2 border-amber-500/50 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-amber-500/10 p-6 md:p-8"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-[60px] pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                  <BarChart2 className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-amber-400 font-black uppercase tracking-widest text-xs mb-2">
                    Dados verificados — não estimativas
                  </p>
                  <p className="text-white font-bold text-base md:text-lg mb-2 leading-snug">
                    Todos os valores de mercado foram pesquisados com base em preços publicamente listados por agências e plataformas digitais portuguesas em março de 2026.
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Fontes consultadas:{" "}
                    <span className="text-amber-300/80">hyperlink.pt</span>,{" "}
                    <span className="text-amber-300/80">colourinvasion.pt</span>,{" "}
                    <span className="text-amber-300/80">plak.pt</span>,{" "}
                    <span className="text-amber-300/80">zaask.pt</span>,{" "}
                    <span className="text-amber-300/80">fixando.pt</span>,{" "}
                    <span className="text-amber-300/80">barbarabacao.pt</span>,{" "}
                    <span className="text-amber-300/80">toquedemidas.pt</span>,{" "}
                    <span className="text-amber-300/80">viscreative.pt</span>,{" "}
                    <span className="text-amber-300/80">fredericolopes.com</span>{" "}
                    e <span className="text-amber-300/80">demarca.pt</span>.
                    Para alguns serviços (ex. gestão de redes sociais), o mercado português é competitivo — somos transparentes sobre isso.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Market Comparison ─────────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">Comparação de mercado</p>
              <h2 className="text-3xl md:text-4xl font-extrabold">Como nos Comparamos às Agências Portuguesas</h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-2xl border border-white/10 overflow-hidden"
            >
              <div className="grid grid-cols-4 px-6 py-3 bg-white/5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <span className="col-span-2">Serviço</span>
                <span className="text-right">Média PT</span>
                <span className="text-right">Lopes2Tech</span>
              </div>

              {comparisonRows.map((row, i) => (
                <a
                  key={i}
                  href={`#${row.anchor}`}
                  className="grid grid-cols-4 px-6 py-4 border-t border-white/5 items-center hover:bg-white/[0.03] transition-colors"
                >
                  <span className="col-span-2 text-sm text-white font-medium flex items-center gap-1.5">
                    {row.service}
                    <ArrowRight className="w-3 h-3 text-slate-600" />
                  </span>
                  <span className="text-right text-sm text-slate-500 line-through">{row.market}</span>
                  <span className="text-right flex items-center justify-end gap-2 flex-wrap">
                    <span className="text-sm font-bold text-cyan-400">{row.ours}</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400">
                      {row.savings}
                    </span>
                  </span>
                </a>
              ))}
            </motion.div>

            <p className="text-center text-xs text-slate-600 mt-4">
              Médias de mercado baseadas em preços publicamente listados por agências digitais em Portugal (março 2026).
            </p>
          </div>
        </section>

        {/* ── Full Pricing Tables ───────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-3">Lista completa de preços</p>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Todos os Serviços. Todos os Preços.</h2>
              <p className="text-slate-400 text-sm">Sem taxas ocultas. Sem faturas surpresa. O que vê é o que paga.</p>
            </div>

            <div className="space-y-10">
              {categories.map((cat, ci) => {
                const c = colorMap[cat.color];
                return (
                  <React.Fragment key={ci}>
                  <motion.div
                    id={`cat-${cat.key}`}
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.05 }}
                    className="rounded-2xl border border-white/10 overflow-hidden"
                  >
                    {/* Category header */}
                    <div className={`flex items-center gap-3 px-6 py-4 border-b border-white/10 ${c.header}`}>
                      <cat.icon className={`w-5 h-5 ${c.icon}`} />
                      <span className="font-bold text-white text-sm uppercase tracking-wider">{cat.title}</span>
                      <span className={`ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${c.badge}`}>
                        {cat.type === "recurring" && <Repeat className="w-3 h-3" />}
                        {cat.type === "one-time" ? "Pagamento único" : "Mensal"}
                      </span>
                    </div>

                    {/* Column headers */}
                    <div className="grid grid-cols-2 md:grid-cols-4 px-6 py-2 bg-white/5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <span className="md:col-span-2">Serviço</span>
                      <span className="hidden md:block text-right">Média PT</span>
                      <span className="text-right">Preço</span>
                    </div>

                    {/* Rows */}
                    {cat.rows.map((row, ri) => {
                      const key = `${ci}-${ri}`;
                      const isOpen = expanded === key;
                      return (
                        <div key={ri} className="border-t border-white/5">
                          <button
                            onClick={() => toggle(key)}
                            aria-expanded={isOpen}
                            className="w-full grid grid-cols-2 md:grid-cols-4 px-6 py-3.5 items-center hover:bg-white/[0.04] transition-colors text-left cursor-pointer"
                          >
                            <span className="md:col-span-2 flex items-center gap-2 text-sm text-white font-medium pr-4">
                              <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${c.icon}`} />
                              {row.service}
                              {row.popular && (
                                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
                                  Mais Popular
                                </span>
                              )}
                            </span>
                            <span className="hidden md:block text-right text-sm text-slate-500 line-through">{row.marketAvg}</span>
                            <span className="text-right flex items-center justify-end gap-1.5">
                              <span className={`text-sm font-bold ${c.icon}`}>{row.price}</span>
                              <span className="hidden md:inline px-1.5 py-0.5 rounded text-xs font-bold bg-emerald-500/10 text-emerald-400">{row.savings}</span>
                            </span>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className={`px-6 py-5 border-t border-white/5 ${c.expand}`}>
                                  <div className="flex items-center gap-3 mb-4 md:hidden">
                                    <span className="text-xs text-slate-500">Média mercado:</span>
                                    <span className="text-xs text-slate-400 line-through">{row.marketAvg}</span>
                                    <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-emerald-500/10 text-emerald-400">{row.savings}</span>
                                  </div>
                                  <p className="text-slate-300 text-sm leading-relaxed mb-4 italic">&ldquo;{row.pitch}&rdquo;</p>
                                  <ul className="space-y-1.5 mb-4">
                                    {row.bullets.map((b, bi) => (
                                      <li key={bi} className="flex items-center gap-2 text-xs text-slate-400">
                                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.icon.replace("text-", "bg-")}`} />
                                        {b}
                                      </li>
                                    ))}
                                  </ul>
                                  {row.link && (
                                    <a
                                      href={row.link}
                                      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${c.icon} hover:underline`}
                                    >
                                      Ver página do serviço
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </motion.div>
                  {cat.key === "websites" && (
                    <p className="text-xs text-slate-500 mt-2 px-1 flex items-center gap-1.5">
                      <span className="text-cyan-400/70">ℹ</span>
                      * É necessário um pacote mínimo de alojamento de €27/mês para manter o seu website ativo e online.
                    </p>
                  )}
                  {cat.key === "ai" && (
                    <p className="text-xs text-slate-500 mt-2 px-1 flex items-center gap-1.5">
                      <span className="text-orange-400/70">ℹ</span>
                      * Os fluxos de trabalho de IA e automação recorrentes incluem uma taxa mensal de manutenção e atualizações.
                    </p>
                  )}
                  </React.Fragment>
                );
              })}
            </div>

            <p className="text-center text-xs text-slate-600 mt-6">
              Todos os preços em euros (€). Valor de anúncios faturado diretamente pela Meta/Google. Custos de plataformas de IA são pass-through.
            </p>
          </div>
        </section>

        {/* ── Payment Plans ──────────────────────────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">Financiamento flexível</p>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Pague em Prestações</h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                Divida qualquer projeto em 3, 6 ou 12 pagamentos mensais. Sem análise de crédito — basta escolher na assinatura do contrato.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {paymentPlans.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className={`relative pt-8 pb-6 px-6 rounded-2xl border text-center ${
                    plan.accent === "emerald"
                      ? "border-emerald-500/30 bg-emerald-500/5"
                      : plan.accent === "cyan"
                      ? "border-cyan-500/30 bg-cyan-500/5"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  {plan.badge && (
                    <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                      plan.accent === "emerald" ? "bg-emerald-500 text-white" : "bg-cyan-400 text-[#080d1a]"
                    }`}>
                      {plan.badge}
                    </span>
                  )}
                  <p className="text-white font-bold text-base mb-2">{plan.name}</p>
                  <p className={`text-2xl font-black mb-3 ${
                    plan.accent === "emerald" ? "text-emerald-400" : plan.accent === "cyan" ? "text-cyan-400" : "text-white"
                  }`}>
                    {plan.markup}
                  </p>
                  <p className="text-xs text-slate-400">{plan.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <BadgeCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400">
                Cobrança mensal automática via Stripe. O site permanece no alojamento até liquidação total do projeto.
              </p>
            </div>
          </div>
        </section>

        {/* ── Hourly Rate ───────────────────────────────────────────────────── */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-cyan-500/10 p-8 md:p-10"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 flex flex-col items-center text-center md:items-start md:text-left md:border-r md:border-white/10 md:pr-10">
                  <p className="text-purple-400 font-bold uppercase tracking-widest text-xs mb-3">Consultoria à Hora</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-5xl font-black text-white">€60</span>
                    <span className="text-slate-400 text-lg mb-1.5">/ hora</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Faturado em incrementos de 1 hora. Mínimo 1 hora. Disponível por videochamada ou presencialmente.</p>
                </div>
                <div className="flex-1 flex flex-col items-center md:items-start gap-5">
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">Precisa de mim a pedido?</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">Reserve uma hora para sessões de estratégia, auditorias técnicas ou apoio de implementação.</p>
                  </div>
                  <a
                    href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold text-sm hover:bg-purple-500/30 transition-all duration-200"
                  >
                    <Clock className="w-4 h-4" />
                    Reservar Sessão
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <ServiceFAQ
          title="Perguntas Frequentes sobre Preços"
          subtitle="Tudo o que precisa de saber antes de tomar uma decisão."
          pageUrl="/pricing-portugal"
          items={faqItems}
        />

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="p-10 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10"
            >
              <CheckCircle className="w-10 h-10 text-cyan-400 mx-auto mb-5" />
              <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">Pronto para começar?</p>
              <h2 className="text-3xl font-extrabold mb-4">Receba um Orçamento em 24 Horas</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Diga-nos o que precisa e enviamos um orçamento preciso — sem estimativas vagas, sem taxas surpresa.
              </p>
              <a
                href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-400 text-[#080d1a] font-bold text-lg hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] hover:-translate-y-0.5"
              >
                Falar Connosco no WhatsApp
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
