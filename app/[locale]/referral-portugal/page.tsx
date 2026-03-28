"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gift, Zap, CheckCircle, ArrowRight, Users, Repeat, BadgeCheck,
  Globe, Palette, Settings, Megaphone, Bot, Wrench, ChevronDown, ExternalLink,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WHATSAPP_URL } from "@/lib/constants";

// ── Steps ──────────────────────────────────────────────────────────────────

const steps = [
  {
    icon: Users,
    title: "Conheces alguém que precise de um website ou ajuda digital?",
    description: "Pensa num amigo, colega ou empresário que pudesse beneficiar de um website profissional, anúncios pagos ou automação. Essa é a tua referência.",
  },
  {
    icon: Zap,
    title: "Envia-nos o contacto",
    description: "Partilha o nosso website ou manda-nos uma mensagem WhatsApp com o nome e contacto da pessoa. Nós tratamos do resto — não precisas de fazer mais nada.",
  },
  {
    icon: Gift,
    title: "Recebe o teu prémio quando assinar",
    description: "Assim que o cliente assinar o contrato e pagar o depósito, transferimos o teu prémio. Simples, transparente, sem papelada.",
  },
];

// ── Reward categories ──────────────────────────────────────────────────────

type RewardRow = {
  service: string;
  price: string;
  reward: string;
  note?: string;
  pitch: string;
  bullets: string[];
  link?: string;
};

type RewardCategory = {
  title: string;
  type: "one-time" | "recurring";
  color: string;
  icon: React.ElementType;
  rows: RewardRow[];
};

const rewardCategories: RewardCategory[] = [
  {
    title: "Pacotes de Website",
    type: "one-time",
    color: "cyan",
    icon: Globe,
    rows: [
      {
        service: "Website Starter",
        price: "€690",
        reward: "€69",
        note: "Pago no depósito",
        pitch: "Perfeito para novos negócios, freelancers ou quem precisa de uma presença online rápida e cuidada. Entregue em 4–5 dias — sem esperas.",
        bullets: ["Website de uma página personalizado", "Copywriting com IA incluído", "Widget de marcações + botão WhatsApp", "Responsivo para mobile", "Entregue em 4–5 dias"],
        link: "/services/web-design",
      },
      {
        service: "Website Professional",
        price: "€1.390",
        reward: "€139",
        note: "Pago no depósito",
        pitch: "Para empreendedores estabelecidos prontos para crescer. Multi-página, multi-idioma, com SEO integrado desde o primeiro dia.",
        bullets: ["Website de 5 páginas", "2 idiomas incluídos", "1 automação incluída", "Bases de SEO", "Entregue em 5–6 dias"],
        link: "/services/web-design",
      },
      {
        service: "Website Business Pro",
        price: "€1.990",
        reward: "€199",
        note: "Pago no depósito",
        pitch: "O pacote completo para PMEs. Até 10 páginas de serviços, 3 idiomas, sistema de captação de leads — tudo para competir online a sério.",
        bullets: ["5 páginas principais + até 10 páginas de serviços", "3 idiomas incluídos", "SEO + sistema de captação de leads", "Entregue em 6–7 dias"],
        link: "/services/web-design",
      },
      {
        service: "Landing Page de Campanha",
        price: "€350",
        reward: "€35",
        note: "Pago no depósito",
        pitch: "Uma página focada em conversão para campanhas de anúncios, lançamentos de produtos ou iscas digitais. Construída para converter visitas em leads.",
        bullets: ["Design otimizado para conversão", "Integrado com tracking de anúncios", "CTA + formulário de captação de leads", "Entrega rápida"],
        link: "/services/web-design",
      },
    ],
  },
  {
    title: "Branding",
    type: "one-time",
    color: "pink",
    icon: Palette,
    rows: [
      {
        service: "Só Logótipo",
        price: "€299",
        reward: "€30",
        note: "Pago na entrega",
        pitch: "Um logótipo profissional em 3 variações. Ideal para novos negócios ou rebranding que precisam apenas da marca — limpo, escalável e entregue rapidamente.",
        bullets: ["3 variações do logótipo (claro, escuro, ícone)", "Ficheiros vetoriais incluídos", "Pronto para web + impressão"],
      },
      {
        service: "Kit de Marca Completo",
        price: "€549",
        reward: "€55",
        note: "Pago na entrega",
        pitch: "Tudo o que um negócio precisa para ter uma imagem profissional em todo o lado. Logótipo, cores, fontes, cartões de visita e kit de redes sociais — num só pacote.",
        bullets: ["Logótipo (3 variações)", "Paleta de cores + tipografia", "Guia de marca", "Design de cartões de visita", "Kit de redes sociais (fotos de perfil + capas)"],
      },
    ],
  },
  {
    title: "Configuração & Resultados Rápidos",
    type: "one-time",
    color: "amber",
    icon: Settings,
    rows: [
      {
        service: "Configuração do Google Business Profile",
        price: "€249",
        reward: "€25",
        pitch: "Negócios locais vivem e morrem pelo GBP. Um perfil totalmente otimizado com fotos, serviços e 3 publicações — aumenta a visibilidade local imediatamente.",
        bullets: ["Configuração ou otimização completa do GBP", "Fotos, serviços e categorias definidos", "3 publicações publicadas", "Melhor posicionamento no Google Maps"],
      },
      {
        service: "Configuração de Analytics & Tracking (GA4)",
        price: "€329",
        reward: "€33",
        pitch: "Essencial para qualquer negócio que faz anúncios. Sem tracking, estás a voar às cegas. Configuramos GA4 + Meta Pixel para que cada clique seja medido.",
        bullets: ["Configuração do Google Analytics 4", "Instalação do Meta Pixel", "Eventos de conversão configurados", "Dashboard + relatórios prontos"],
      },
      {
        service: "Configuração de Email Profissional",
        price: "€169",
        reward: "€17",
        pitch: "Email profissional como paulo@teunegocio.pt em vez do Gmail. Configuramos Google Workspace ou Microsoft 365 — dá credibilidade imediata a qualquer negócio.",
        bullets: ["Configuração de endereço de email profissional", "Google Workspace ou Microsoft 365", "Assinaturas de email configuradas", "Acesso em mobile + desktop"],
      },
      {
        service: "Auditoria de Website",
        price: "€99",
        reward: "€10",
        pitch: "A venda mais fácil — €99 por um relatório de 1 página com 5 melhorias específicas. Perfeito para entrar pela porta com clientes hesitantes em comprometer.",
        bullets: ["Relatório PDF de 1 página", "5 melhorias específicas e acionáveis", "SEO + velocidade + UX avaliados", "Entregue em 48h"],
      },
      {
        service: "Otimização de Velocidade",
        price: "€129",
        reward: "€13",
        pitch: "Um website lento perde clientes e posiciona-se pior no Google. Correção única: cache, compressão de imagens e melhoria de performance.",
        bullets: ["Compressão de imagens", "Configuração de cache", "Melhoria dos Core Web Vitals", "Melhor posicionamento no Google"],
      },
      {
        service: "Google Business Boost",
        price: "€69",
        reward: "€7",
        pitch: "Ganho mais rápido para qualquer negócio local. Otimização rápida do GBP + 3 publicações. Ótimo serviço de entrada.",
        bullets: ["Otimização rápida do GBP", "3 publicações publicadas", "Categorias + atributos atualizados"],
      },
      {
        service: "Avaliação de Automação",
        price: "€149",
        reward: "€15",
        pitch: "Analisamos o fluxo de trabalho e entregamos um PDF identificando 3–5 processos que podem ser automatizados. Vende-se sozinho — e frequentemente leva a um projeto de automação completo.",
        bullets: ["Revisão aprofundada do fluxo de trabalho", "PDF de 1 página com 3–5 oportunidades de automação", "Estimativa de ROI por automação", "Entregue em 48h"],
        link: "/services/business-automation",
      },
    ],
  },
  {
    title: "Add-Ons para Website",
    type: "one-time",
    color: "teal",
    icon: Wrench,
    rows: [
      {
        service: "Blog / Configuração de CMS",
        price: "€350",
        reward: "€35",
        pitch: "Dá ao cliente um blog que pode editar ele próprio — sem precisar de um programador após a configuração. Ótimo para SEO e marketing de conteúdo.",
        bullets: ["CMS baseado em Sanity ou Notion", "Cliente pode adicionar/editar posts sem código", "Estrutura de blog otimizada para SEO"],
        link: "/services/seo-development",
      },
      {
        service: "Página de Serviço Extra",
        price: "€80/página",
        reward: "€8/página",
        pitch: "Cada página de serviço adicional aponta para uma nova palavra-chave e expande a presença no Google. Baixo custo, alto valor de SEO.",
        bullets: ["Página otimizada para SEO", "Corresponde ao design existente", "Indexada e submetida ao Google"],
        link: "/services/seo-development",
      },
      {
        service: "Idioma Extra",
        price: "A partir de €100",
        reward: "A partir de €10",
        note: "Escala com o tamanho do site",
        pitch: "Alcança mais clientes na sua língua nativa. Tradução assistida por IA + tags hreflang corretas para que o Google posicione cada idioma corretamente.",
        bullets: ["Tradução assistida por IA", "Configuração de tags hreflang", "Seletor de idioma adicionado", "Preço escala com o número de páginas"],
      },
      {
        service: "Local SEO Boost",
        price: "€199",
        reward: "€20",
        pitch: "Dados estruturados (schema), configuração do Search Console, submissão de sitemap — a base técnica de SEO que a maioria dos websites não tem.",
        bullets: ["Schema markup adicionado", "Google Search Console configurado", "Sitemap submetido", "Bing Webmaster Tools configurado"],
        link: "/services/seo-development",
      },
      {
        service: "Widget de Prova Social",
        price: "€99",
        reward: "€10",
        pitch: "Feed de Google Reviews atualizado automaticamente no website. Nada vende melhor do que avaliações reais de clientes visíveis na página inicial.",
        bullets: ["Google Reviews sincronizado automaticamente", "Widget integrado no website", "Aumenta a confiança e as conversões"],
      },
      {
        service: "Integração de Newsletter",
        price: "€149",
        reward: "€15",
        pitch: "Lista de email = audiência própria. Configuramos o formulário de subscrição + uma automação de boas-vindas para que cada subscritor seja seguido automaticamente.",
        bullets: ["Brevo ou Mailchimp ligado", "Formulário de subscrição integrado no site", "Automação de email de boas-vindas ativa"],
      },
      {
        service: "Automação de Recolha de Avaliações",
        price: "€329",
        reward: "€33",
        pitch: "A maioria dos negócios tem clientes satisfeitos que nunca deixam avaliações. Este serviço envia 3 emails automáticos após um trabalho concluído a pedir uma avaliação no Google.",
        bullets: ["Sequência automatizada de 3 emails", "Acionada após conclusão do trabalho", "Link direto para o formulário de Avaliação Google", "Mais avaliações de 5 estrelas em piloto automático"],
        link: "/services/business-automation",
      },
      {
        service: "Sistema de Marcação de Consultas",
        price: "€369",
        reward: "€37",
        pitch: "Substitui a troca de mensagens para agendamentos por um widget de marcação profissional. Sincroniza com o Google Calendar e envia lembretes automaticamente.",
        bullets: ["Configuração de Cal.com ou Calendly", "Sincronização com Google Calendar", "Lembretes automáticos (email + SMS)", "Integrado no website"],
        link: "/services/business-automation",
      },
      {
        service: "Sistema de Captação de Leads",
        price: "€449",
        reward: "€45",
        pitch: "Transforma visitantes do website em leads — automaticamente. O envio de formulário aciona uma entrada no CRM, um email de resposta automática e uma notificação para a equipa.",
        bullets: ["Formulário de contacto → pipeline CRM", "Email de resposta automática ao lead", "Notificação para a equipa (email ou WhatsApp)", "Rastreamento completo de leads"],
        link: "/services/business-automation",
      },
      {
        service: "Chatbot IA para FAQs",
        price: "€699–850",
        reward: "€70–85",
        pitch: "Um chatbot treinado com o conteúdo do próprio cliente — responde a FAQs, qualifica leads e trabalha 24/7 sem qualquer envolvimento humano.",
        bullets: ["Treinado com o conteúdo do cliente", "Lida com FAQs automaticamente", "Qualificação de leads integrada", "Integrado no website", "+ custos de utilização da API"],
        link: "/services/ai-integration",
      },
    ],
  },
  {
    title: "Marketing & Anúncios (Mensal)",
    type: "recurring",
    color: "purple",
    icon: Megaphone,
    rows: [
      {
        service: "Gestão de Meta Ads",
        price: "€349/mês",
        reward: "€52/mês",
        note: "× 6 meses = €314",
        pitch: "Gestão completa de Meta Ads — Facebook + Instagram. Tratamos da estratégia, criativos, segmentação, retargeting, testes A/B e relatório mensal. O investimento em anúncios é pago separadamente à Meta.",
        bullets: ["Configuração + gestão contínua de campanhas", "Criativo de anúncios (copy + visuais)", "Segmentação de audiência + retargeting", "Testes A/B", "Relatório mensal de performance"],
        link: "/services/social-media-marketing",
      },
      {
        service: "Gestão de Google Ads",
        price: "€399/mês",
        reward: "€60/mês",
        note: "× 6 meses = €359",
        pitch: "Capta compradores com intenção alta a pesquisar no Google. Gerimos campanhas de Pesquisa + Display com pesquisa de palavras-chave completa, copy de anúncios e tracking de conversões. Investimento em anúncios pago separadamente.",
        bullets: ["Pesquisa de palavras-chave", "Campanhas de Pesquisa + Display", "Copy de anúncios escrito e testado", "Configuração de tracking de conversões", "Relatório mensal de analytics"],
        link: "/services/social-media-marketing",
      },
      {
        service: "Bundle Meta + Google",
        price: "€649/mês",
        reward: "€97/mês",
        note: "× 6 meses = €584",
        pitch: "Ambos os canais geridos em conjunto — Meta para awareness + retargeting, Google para pesquisa por intenção. Estratégia unificada e relatórios. Poupa €99/mês vs. comprar separado.",
        bullets: ["Tudo nos planos Meta + Google Ads", "Estratégia cross-channel", "Relatório mensal unificado", "Poupar €99/mês vs. separado"],
        link: "/services/social-media-marketing",
      },
      {
        service: "Gestão de Redes Sociais – Starter",
        price: "€299/mês",
        reward: "€45/mês",
        note: "× 6 meses = €269",
        pitch: "Para negócios que precisam de uma presença social consistente mas não têm tempo para publicar. 8 posts/mês numa plataforma, totalmente gerido.",
        bullets: ["8 posts/mês", "1 plataforma (Instagram, Facebook ou LinkedIn)", "Criação de conteúdo + agendamento", "Sem esforço do cliente"],
        link: "/services/social-media-marketing",
      },
      {
        service: "Gestão de Redes Sociais – Growth",
        price: "€399/mês",
        reward: "€60/mês",
        note: "× 6 meses = €359",
        pitch: "Escala para 2 plataformas com stories e gestão de engagement incluídos. Constrói comunidade, não só publica.",
        bullets: ["12 posts/mês", "2 plataformas", "Stories incluídos", "Gestão de engagement"],
        link: "/services/social-media-marketing",
      },
      {
        service: "Gestão de Redes Sociais – Pro",
        price: "€649/mês",
        reward: "€97/mês",
        note: "× 6 meses = €584",
        pitch: "Presença completa nas redes sociais em 3 plataformas com Reels e uma chamada de estratégia mensal. Para marcas que querem dominar o seu nicho online.",
        bullets: ["16 posts/mês", "3 plataformas", "Reels incluídos", "Chamada de estratégia mensal"],
        link: "/services/social-media-marketing",
      },
    ],
  },
  {
    title: "Configuração de IA & Automação",
    type: "one-time",
    color: "emerald",
    icon: Bot,
    rows: [
      {
        service: "Workflow de IA – Light",
        price: "€600–1.200",
        reward: "€60–120",
        pitch: "Automação simples ligando as ferramentas existentes — formulários, emails, CRM, Slack, WhatsApp. Construído em n8n ou Make. Poupa horas de trabalho manual todas as semanas.",
        bullets: ["Automação de app para app", "Construído em n8n ou Make", "ex. Formulário → CRM → Email → Notificação", "Entregue em 1–2 semanas"],
        link: "/services/business-automation",
      },
      {
        service: "Workflow de IA – Full",
        price: "€1.500–5.000",
        reward: "€150–500",
        pitch: "Automações multi-passo complexas com tomada de decisão por IA. Pensa em roteamento inteligente, geração de conteúdo, scoring e pipelines totalmente automatizados.",
        bullets: ["Automação complexa multi-passo", "Lógica de decisão IA incluída", "Integrações de API", "Documentação completa + entrega"],
        link: "/services/ai-integration",
      },
      {
        service: "Agente de Suporte ao Cliente com IA",
        price: "€2.500–9.000",
        reward: "€250–900",
        pitch: "Um agente IA 24/7 que lida com questões de clientes, marcações e escalamentos — sem um humano. ROI enorme para negócios com suporte repetitivo.",
        bullets: ["Lida com FAQs, marcações, reclamações", "Disponível 24/7", "Escalona para humano quando necessário", "Canais: WhatsApp + website + email"],
        link: "/services/ai-integration",
      },
      {
        service: "Agente de Vendas & Outreach com IA",
        price: "€2.500–7.000",
        reward: "€250–700",
        pitch: "Prospeção automatizada de leads, outreach personalizado e sequências de follow-up alimentadas por IA. Para negócios que querem escalar outbound sem contratar.",
        bullets: ["Sourcing + enriquecimento de leads", "Emails de outreach personalizados", "Sequências de follow-up automatizadas", "Integração com CRM"],
        link: "/services/ai-integration",
      },
      {
        service: "Agente de Voz com IA",
        price: "€4.000–10.000",
        reward: "€400–1.000",
        pitch: "Uma IA que atende chamadas telefónicas, qualifica leads e marca consultas — soa humano, trabalha 24/7. Game-changer para negócios de serviços.",
        bullets: ["Atende chamadas recebidas", "Qualifica leads por voz", "Marca consultas em tempo real", "Custo por minuto faturado ao cliente"],
        link: "/services/ai-integration",
      },
      {
        service: "Base de Conhecimento IA / RAG",
        price: "€3.500–10.000",
        reward: "€350–1.000",
        pitch: "IA treinada com os documentos, manuais e dados do próprio cliente. Responde a questões internas ou de clientes instantaneamente — como um especialista da empresa disponível 24/7.",
        bullets: ["Treinada com documentos do próprio cliente", "Responde a questões complexas instantaneamente", "Ferramenta interna ou voltada para clientes", "Continuamente atualizável"],
        link: "/services/ai-integration",
      },
    ],
  },
];

// ── Color map ──────────────────────────────────────────────────────────────

const colorMap: Record<string, { badge: string; header: string; icon: string; expand: string }> = {
  cyan:    { badge: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",       header: "bg-cyan-500/10 border-cyan-500/20",       icon: "text-cyan-400",    expand: "bg-cyan-500/5 border-cyan-500/10" },
  pink:    { badge: "bg-pink-500/15 text-pink-400 border-pink-500/20",       header: "bg-pink-500/10 border-pink-500/20",       icon: "text-pink-400",    expand: "bg-pink-500/5 border-pink-500/10" },
  amber:   { badge: "bg-amber-500/15 text-amber-400 border-amber-500/20",    header: "bg-amber-500/10 border-amber-500/20",    icon: "text-amber-400",   expand: "bg-amber-500/5 border-amber-500/10" },
  teal:    { badge: "bg-teal-500/15 text-teal-400 border-teal-500/20",       header: "bg-teal-500/10 border-teal-500/20",       icon: "text-teal-400",    expand: "bg-teal-500/5 border-teal-500/10" },
  purple:  { badge: "bg-purple-500/15 text-purple-400 border-purple-500/20", header: "bg-purple-500/10 border-purple-500/20", icon: "text-purple-400",  expand: "bg-purple-500/5 border-purple-500/10" },
  emerald: { badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20", header: "bg-emerald-500/10 border-emerald-500/20", icon: "text-emerald-400", expand: "bg-emerald-500/5 border-emerald-500/10" },
};

// ── Perks ──────────────────────────────────────────────────────────────────

const perks = [
  "Sem limite de referências — indica 10 clientes, ganha 10 vezes",
  "Sem prazo de validade nas tuas referências",
  "Pago por transferência bancária (IBAN) ou MB Way",
  "Não precisas de ser cliente para indicar",
  "Nós tratamos de toda a venda — tu só fazes a apresentação",
  "Indica alguém E contratas-nos? Tens 20% de desconto num serviço",
];

// ── Component ──────────────────────────────────────────────────────────────

export default function ReferralPortugalPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggle = (key: string) => setExpanded(prev => (prev === key ? null : key));

  return (
    <>
      <Navbar />
      <main className="bg-[#080d1a] min-h-screen text-white">

        {/* Hero */}
        <section className="relative pt-40 pb-24 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />
            <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[100px]" />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`, backgroundSize: "60px 60px", maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)" }} />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-6">
              <Gift className="w-4 h-4" />
              Programa de Referência
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-[1.1]">
              Indica um cliente.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Recebe o teu prémio.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
              Conheces alguém que precise de um website, anúncios pagos ou automações? Faz a apresentação e ganha até{" "}
              <span className="text-white font-semibold">10% por projeto</span>{" "}ou{" "}
              <span className="text-white font-semibold">15% do valor mensal</span>{" "}
              durante 6 meses. Sem limites. Sem formulários. Só uma mensagem WhatsApp.
            </motion.p>
            <motion.a initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-400 text-[#080d1a] font-bold text-lg hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] hover:-translate-y-0.5">
              Enviar uma referência agora
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </section>

        {/* How it works */}
        <section className="relative py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">Como funciona</p>
              <h2 className="text-3xl md:text-4xl font-extrabold">3 passos. É tudo.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5">
                    <step.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="absolute top-6 right-6 text-5xl font-black text-white/5 select-none leading-none">{i + 1}</div>
                  <h3 className="text-lg font-bold text-white mb-3 leading-snug">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dual benefit banner */}
        <section className="py-12 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-amber-500/10 p-8 md:p-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                  <Gift className="w-7 h-7 text-amber-400" />
                </div>
                <div className="flex-1">
                  <p className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-2">Bónus para quem indica</p>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">
                    Indica alguém <span className="text-amber-400">&amp;</span> tornas-te cliente? Tens <span className="text-amber-400">20% de desconto</span> num serviço.
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                    Se indicares um cliente e mais tarde decidires contratar-nos, tens direito a um <strong className="text-white">desconto de 20% em qualquer serviço à escolha</strong> — website, anúncios, automação, branding, o que precisares. Sem prazo de validade. Só nos diz que indicaste alguém e o desconto é teu.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Rewards tables */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-3">O que ganhas</p>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Os teus prémios, por serviço</h2>
              <p className="text-slate-400 text-sm">Serviços únicos pagam <span className="text-white font-semibold">10%</span> no depósito. Serviços mensais pagam <span className="text-white font-semibold">15% durante 6 meses</span>. Clica em qualquer serviço para ver o pitch.</p>
            </div>

            <div className="space-y-10">
              {rewardCategories.map((cat, ci) => {
                const c = colorMap[cat.color];
                return (
                  <motion.div key={ci} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.06 }} className="rounded-2xl border border-white/10 overflow-hidden">

                    <div className={`flex items-center gap-3 px-6 py-4 border-b border-white/10 ${c.header}`}>
                      <cat.icon className={`w-5 h-5 ${c.icon}`} />
                      <span className="font-bold text-white text-sm uppercase tracking-wider">{cat.title}</span>
                      <span className={`ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${c.badge}`}>
                        {cat.type === "recurring" && <Repeat className="w-3 h-3" />}
                        {cat.type === "one-time" ? "10% único" : "15% × 6 meses"}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 px-6 py-2 bg-white/5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <span>Serviço</span>
                      <span className="text-center">Preço</span>
                      <span className="text-right">O teu prémio</span>
                    </div>

                    {cat.rows.map((row, ri) => {
                      const key = `${ci}-${ri}`;
                      const isOpen = expanded === key;
                      return (
                        <div key={ri} className="border-t border-white/5">
                          <button
                            onClick={() => toggle(key)}
                            className="w-full grid grid-cols-3 px-6 py-3.5 items-center hover:bg-white/[0.04] transition-colors text-left cursor-pointer"
                          >
                            <span className="flex items-center gap-2 text-sm text-white font-medium pr-4">
                              <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${c.icon}`} />
                              {row.service}
                            </span>
                            <span className="text-center text-sm text-slate-400">{row.price}</span>
                            <span className="text-right">
                              <span className="inline-flex flex-col items-end">
                                <span className={`text-sm font-bold ${c.icon}`}>{row.reward}</span>
                                {row.note && <span className="text-xs text-slate-600">{row.note}</span>}
                              </span>
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
                                    <a href={row.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 text-xs font-semibold ${c.icon} hover:underline`}>
                                      Ver página completa do serviço
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
                );
              })}
            </div>

            <p className="text-center text-xs text-slate-600 mt-6">Os prémios são pagos após o cliente indicado completar o depósito ou o primeiro pagamento mensal. Os prémios mensais são transferidos no final de cada mês.</p>
          </div>
        </section>

        {/* Perks */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">As letras pequenas (não são letras pequenas)</p>
              <h2 className="text-3xl md:text-4xl font-extrabold">Sem armadilhas. A sério.</h2>
            </div>
            <div className="space-y-4">
              {perks.map((perk, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/5">
                  <BadgeCheck className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-white font-medium">{perk}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="p-10 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
              <CheckCircle className="w-10 h-10 text-cyan-400 mx-auto mb-5" />
              <h2 className="text-3xl font-extrabold mb-4">Pronto para fazer a tua primeira referência?</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Manda-nos uma mensagem WhatsApp com o nome e contacto de quem estás a indicar. Nós tratamos do resto e mantemos-te informado em cada etapa.
              </p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-400 text-[#080d1a] font-bold text-lg hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] hover:-translate-y-0.5">
                Enviar referência no WhatsApp
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
