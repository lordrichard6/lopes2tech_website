#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const messagesDir = path.join(__dirname, '..', 'messages');

const translations = {
  en: {
    hero: {
      badge: "Done-for-You Cold Outreach",
      title: "Reach your ideal clients.",
      titleHighlight: "While you sleep.",
      description: "We handle everything — finding the right contacts, writing the emails, setting up the infrastructure, and sending the sequences. You only need to do one thing: reply to interested prospects.",
      cta: "Start Your Campaign"
    },
    stats: {
      replyRate: { value: "3–8%", label: "Average reply rate — industry benchmark" },
      launchDays: { value: "3–5", label: "Business days to campaign launch" },
      toolsCost: { value: "CHF 0", label: "Tools to buy — we handle everything" }
    },
    includes: {
      badge: "Every Campaign Includes",
      title: "Everything handled. Nothing to set up.",
      items: [
        { title: "Lead Prospecting", desc: "Fresh, verified leads sourced from Google Maps in real time — not a 2-year-old database. Matched to your exact target profile." },
        { title: "Email Copywriting", desc: "A personalised 3-step sequence crafted for your specific offer and audience. Not a generic template — written for your niche." },
        { title: "Technical Setup", desc: "Domain/subdomain config, SPF, DKIM, DMARC, and email warmup. Your emails reach the inbox — not spam." },
        { title: "Campaign Scheduling", desc: "Sequences sent via Instantly.ai with smart timing and daily limits that protect your domain health." },
        { title: "Deliverability Monitoring", desc: "Bounce rate and spam score tracked throughout the month. We catch problems before they damage your domain." },
        { title: "Monthly Report", desc: "Clear breakdown of sent / opened / replied / bounced — plus what we're adjusting next month and why." }
      ]
    },
    packages: {
      badge: "Pricing",
      title: "Simple, transparent pricing",
      subtitle: "+ CHF 149 one-time setup fee (new clients only) · Minimum 2 months · Cancel anytime after",
      mostPopular: "Most Popular",
      from: "From CHF",
      perMonth: "/mo",
      getStarted: "Get Started",
      leadsOnly: "Need leads only, without campaign management? We provide verified lead lists from CHF 90 per list. Ask via WhatsApp.",
      starter: {
        name: "Campaign Starter",
        contacts: "100 contacts/mo",
        replies: "~3–8 replies/mo",
        features: [
          "100 hyper-local leads/month — sourced live from Google Maps",
          "1 sending inbox — configured & warmed up",
          "1–2 week inbox warmup before launch",
          "3-step personalised email sequence",
          "Instantly.ai campaign setup",
          "Deliverability monitoring",
          "Monthly performance report"
        ]
      },
      growth: {
        name: "Campaign Growth",
        contacts: "250 contacts/mo",
        replies: "~8–20 replies/mo",
        features: [
          "250 hyper-local leads/month — sourced live from Google Maps",
          "Up to 3 sending inboxes — configured & warmed up",
          "1–2 week inbox warmup before launch",
          "3-step personalised email sequence",
          "A/B test on subject lines",
          "Instantly.ai campaign setup",
          "Deliverability monitoring",
          "Monthly performance report + recommendations"
        ]
      },
      pro: {
        name: "Campaign Pro",
        contacts: "500+ contacts/mo",
        replies: "~15–40 replies/mo",
        features: [
          "500+ hyper-local leads/month — sourced live from Google Maps",
          "5+ sending inboxes — configured & warmed up",
          "1–2 week inbox warmup before launch",
          "Multi-segment targeting (industries, cities, or offers)",
          "3-step personalised email sequence per segment",
          "A/B test on subject lines + copy",
          "Priority deliverability monitoring",
          "Monthly strategy call + full performance report",
          "Custom volume available — price scales with contacts"
        ]
      }
    },
    howItWorks: {
      badge: "How It Works",
      title: "From zero to replies in under a week",
      steps: [
        { title: "Define your ideal client", desc: "Tell us who you want to reach: industry, city, and company type. For example: 'dental clinics in Zurich' or 'law firms in Geneva'. The more specific, the better the results." },
        { title: "We build your campaign", desc: "We source the lead list, write the personalised 3-step email sequence, configure the sending infrastructure, and set everything up in Instantly. Typically ready in 3–5 business days." },
        { title: "Campaign goes live", desc: "Emails go out in daily batches with smart delays to maximise deliverability. We monitor open rates, bounces, and replies throughout the month to keep your domain healthy." },
        { title: "Replies come in — we optimise", desc: "Interested prospects reply directly to your inbox. At the end of each month we send a performance report and adjust the next campaign based on what's working." }
      ]
    },
    comparison: {
      badge: "Market Comparison",
      title: "How we compare",
      subtitle: "A full-service cold email agency charges CHF 2,000–8,000/month for the same outcome.",
      headers: { option: "Option", cost: "Cost/mo", effort: "Your effort", tracking: "Tracking" },
      rows: [
        { option: "Manual LinkedIn outreach", cost: "CHF 0–60", effort: "Very high", tracking: "None" },
        { option: "DIY tools (Apollo + Instantly)", cost: "CHF 150–400", effort: "Very high", tracking: "Basic" },
        { option: "Cold email agency (full-service)", cost: "CHF 2,000+", effort: "Low", tracking: "Yes" },
        { option: "Lopes2Tech", cost: "CHF 390–990+", effort: "Very low", tracking: "Yes" }
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know before starting.",
      items: [
        { question: "Will this work for my industry?", answer: "Cold email works in almost any B2B context where there is a clear decision-maker to reach. It works especially well for professional services (lawyers, accountants, clinics), agencies, consultants, software companies, and local businesses targeting other businesses. It is not suitable for B2C or highly regulated industries (finance, pharmaceuticals) without additional compliance steps." },
        { question: "How many replies can I realistically expect?", answer: "Industry benchmark for well-targeted, personalised cold email campaigns is 3–8% reply rate. On 100 contacts that means 3–8 replies per month — not all of which will convert. Results depend heavily on offer clarity, target specificity, and how compelling your value proposition is. We are transparent about this upfront." },
        { question: "What is the setup fee for?", answer: "The one-time CHF 149 setup fee covers: creating and configuring a sending subdomain (to protect your main domain), setting up SPF/DKIM/DMARC DNS records, connecting the inbox to Instantly.ai, and running a 2-week email warmup so your first campaign hits the inbox instead of spam. This is only charged once — never on renewals." },
        { question: "Will my main domain be at risk?", answer: "No. We always use a sending subdomain (e.g., mail.yourdomain.com) — never your main domain. This completely isolates your primary email reputation from the campaign. In the unlikely event of any deliverability issues, your business email is unaffected." },
        { question: "How long before I see results?", answer: "The first 2 weeks are spent on warmup (required for inbox placement). Campaigns typically go live in week 3. First replies usually start coming in within days of launch. Expect the first meaningful data and optimisation recommendations after the first full month." },
        { question: "Can I cancel after the minimum commitment?", answer: "Yes. After the 2-month minimum, the service is month-to-month. Cancel any time with 30 days' notice — no annual contracts, no penalties." },
        { question: "Do I need to buy any tools or software?", answer: "No. We handle Instantly.ai, the lead database, email verification, and all technical infrastructure. You do not need to purchase or set up anything yourself." }
      ]
    },
    cta: {
      badge: "Ready to Start?",
      title: "Build a predictable client pipeline",
      description: "Stop waiting for referrals. Let us build and run your cold outreach — while you focus on delivering for the clients who reply.",
      button: "Get a Free Strategy Call"
    }
  },

  pt: {
    hero: {
      badge: "Outreach por Email Frio — 100% Gerido",
      title: "Alcance os seus clientes ideais.",
      titleHighlight: "Enquanto dorme.",
      description: "Tratamos de tudo — encontramos os contactos certos, escrevemos os emails, configuramos a infraestrutura e enviamos as sequências. Só precisa de fazer uma coisa: responder aos interessados.",
      cta: "Iniciar Campanha"
    },
    stats: {
      replyRate: { value: "3–8%", label: "Taxa média de resposta — benchmark do setor" },
      launchDays: { value: "3–5", label: "Dias úteis até ao lançamento da campanha" },
      toolsCost: { value: "CHF 0", label: "Ferramentas a comprar — tratamos de tudo" }
    },
    includes: {
      badge: "Cada Campanha Inclui",
      title: "Tudo tratado. Nada a configurar.",
      items: [
        { title: "Prospeção de Leads", desc: "Leads frescos e verificados retirados do Google Maps em tempo real — não uma base de dados com 2 anos. Ajustados ao seu perfil de cliente ideal." },
        { title: "Copywriting de Email", desc: "Uma sequência personalizada de 3 etapas criada para a sua oferta e público específicos. Não é um template genérico — escrita para o seu nicho." },
        { title: "Configuração Técnica", desc: "Configuração de domínio/subdomínio, SPF, DKIM, DMARC e aquecimento de email. Os seus emails chegam à caixa de entrada — não ao spam." },
        { title: "Agendamento da Campanha", desc: "Sequências enviadas via Instantly.ai com timing inteligente e limites diários que protegem a saúde do seu domínio." },
        { title: "Monitorização de Entregabilidade", desc: "Taxa de rejeição e pontuação de spam monitorizadas ao longo do mês. Detetamos problemas antes de prejudicarem o seu domínio." },
        { title: "Relatório Mensal", desc: "Resumo claro de enviados / abertos / respondidos / rejeitados — mais o que vamos ajustar no próximo mês e porquê." }
      ]
    },
    packages: {
      badge: "Preços",
      title: "Preços simples e transparentes",
      subtitle: "+ CHF 149 taxa de configuração única (apenas novos clientes) · Mínimo 2 meses · Cancelamento livre após",
      mostPopular: "Mais Popular",
      from: "A partir de CHF",
      perMonth: "/mês",
      getStarted: "Começar",
      leadsOnly: "Precisa apenas de leads, sem gestão de campanha? Fornecemos listas verificadas a partir de CHF 90 por lista. Pergunte via WhatsApp.",
      starter: {
        name: "Campaign Starter",
        contacts: "100 contactos/mês",
        replies: "~3–8 respostas/mês",
        features: [
          "100 leads hiper-locais/mês — recolhidos em tempo real no Google Maps",
          "1 caixa de envio — configurada e aquecida",
          "1–2 semanas de aquecimento antes do lançamento",
          "Sequência de 3 emails personalizada",
          "Configuração no Instantly.ai",
          "Monitorização de entregabilidade",
          "Relatório mensal de desempenho"
        ]
      },
      growth: {
        name: "Campaign Growth",
        contacts: "250 contactos/mês",
        replies: "~8–20 respostas/mês",
        features: [
          "250 leads hiper-locais/mês — recolhidos em tempo real no Google Maps",
          "Até 3 caixas de envio — configuradas e aquecidas",
          "1–2 semanas de aquecimento antes do lançamento",
          "Sequência de 3 emails personalizada",
          "Teste A/B em linhas de assunto",
          "Configuração no Instantly.ai",
          "Monitorização de entregabilidade",
          "Relatório mensal + recomendações"
        ]
      },
      pro: {
        name: "Campaign Pro",
        contacts: "500+ contactos/mês",
        replies: "~15–40 respostas/mês",
        features: [
          "500+ leads hiper-locais/mês — recolhidos em tempo real no Google Maps",
          "5+ caixas de envio — configuradas e aquecidas",
          "1–2 semanas de aquecimento antes do lançamento",
          "Segmentação múltipla (indústrias, cidades ou ofertas)",
          "Sequência de 3 emails personalizada por segmento",
          "Teste A/B em linhas de assunto + corpo",
          "Monitorização de entregabilidade prioritária",
          "Chamada mensal de estratégia + relatório completo",
          "Volume personalizado disponível — preço escala com os contactos"
        ]
      }
    },
    howItWorks: {
      badge: "Como Funciona",
      title: "Do zero às respostas em menos de uma semana",
      steps: [
        { title: "Defina o seu cliente ideal", desc: "Diga-nos quem quer alcançar: setor, cidade e tipo de empresa. Por exemplo: 'clínicas dentárias no Porto' ou 'escritórios de advogados em Lisboa'. Quanto mais específico, melhores os resultados." },
        { title: "Nós construímos a sua campanha", desc: "Fazemos a lista de leads, escrevemos a sequência de 3 emails personalizada, configuramos a infraestrutura de envio e preparamos tudo no Instantly. Normalmente pronto em 3–5 dias úteis." },
        { title: "Campanha entra em produção", desc: "Os emails são enviados em lotes diários com delays inteligentes para maximizar a entregabilidade. Monitorizamos taxas de abertura, rejeições e respostas ao longo do mês para manter o domínio saudável." },
        { title: "Respostas chegam — otimizamos", desc: "Os interessados respondem diretamente para a sua caixa de entrada. No final de cada mês enviamos um relatório e ajustamos a campanha seguinte com base no que está a funcionar." }
      ]
    },
    comparison: {
      badge: "Comparação de Mercado",
      title: "Como nos comparamos",
      subtitle: "Uma agência de cold email completa cobra CHF 2.000–8.000/mês pelo mesmo resultado.",
      headers: { option: "Opção", cost: "Custo/mês", effort: "O seu esforço", tracking: "Tracking" },
      rows: [
        { option: "Outreach manual no LinkedIn", cost: "CHF 0–60", effort: "Muito alto", tracking: "Nenhum" },
        { option: "Ferramentas DIY (Apollo + Instantly)", cost: "CHF 150–400", effort: "Muito alto", tracking: "Básico" },
        { option: "Agência de cold email (serviço completo)", cost: "CHF 2.000+", effort: "Baixo", tracking: "Sim" },
        { option: "Lopes2Tech", cost: "CHF 390–990+", effort: "Muito baixo", tracking: "Sim" }
      ]
    },
    faq: {
      title: "Perguntas Frequentes",
      subtitle: "Tudo o que precisa de saber antes de começar.",
      items: [
        { question: "Funcionará para o meu setor?", answer: "O cold email funciona em quase todos os contextos B2B onde existe um decisor claro a alcançar. Funciona especialmente bem para serviços profissionais (advogados, contabilistas, clínicas), agências, consultores, empresas de software e negócios locais que visam outras empresas. Não é adequado para B2C ou setores altamente regulados (finanças, farmacêuticos) sem etapas adicionais de conformidade." },
        { question: "Quantas respostas posso esperar realisticamente?", answer: "O benchmark do setor para campanhas de cold email bem direcionadas é uma taxa de resposta de 3–8%. Em 100 contactos, isso significa 3–8 respostas por mês — nem todas irão converter. Os resultados dependem muito da clareza da oferta, da especificidade do target e da compelling da sua proposta de valor. Somos transparentes quanto a isto desde o início." },
        { question: "Para que serve a taxa de configuração?", answer: "A taxa única de CHF 149 cobre: criação e configuração de um subdomínio de envio (para proteger o seu domínio principal), configuração de registos DNS SPF/DKIM/DMARC, ligação da caixa ao Instantly.ai, e execução de um aquecimento de email de 2 semanas para que a primeira campanha chegue à caixa de entrada em vez de spam. Só é cobrada uma vez — nunca nas renovações." },
        { question: "O meu domínio principal ficará em risco?", answer: "Não. Usamos sempre um subdomínio de envio (ex.: mail.seudominio.com) — nunca o domínio principal. Isso isola completamente a reputação do seu email principal da campanha. Na improvável eventualidade de problemas de entregabilidade, o seu email de negócios não é afetado." },
        { question: "Quanto tempo até ver resultados?", answer: "As primeiras 2 semanas são dedicadas ao aquecimento (necessário para a colocação na caixa de entrada). As campanhas normalmente entram em produção na semana 3. As primeiras respostas chegam geralmente dias após o lançamento. Espere os primeiros dados significativos e recomendações de otimização após o primeiro mês completo." },
        { question: "Posso cancelar após o compromisso mínimo?", answer: "Sim. Após o mínimo de 2 meses, o serviço é mensal. Cancele a qualquer momento com 30 dias de aviso — sem contratos anuais, sem penalidades." },
        { question: "Preciso de comprar ferramentas ou software?", answer: "Não. Tratamos do Instantly.ai, da base de dados de leads, da verificação de email e de toda a infraestrutura técnica. Não precisa de comprar ou configurar nada." }
      ]
    },
    cta: {
      badge: "Pronto para Começar?",
      title: "Construa um pipeline de clientes previsível",
      description: "Pare de esperar por referências. Deixe-nos construir e gerir o seu outreach — enquanto se foca em entregar valor aos clientes que respondem.",
      button: "Agendar Chamada Gratuita"
    }
  },

  de: {
    hero: {
      badge: "Cold-Outreach — Vollständig verwaltet",
      title: "Erreichen Sie Ihre Wunschkunden.",
      titleHighlight: "Während Sie schlafen.",
      description: "Wir übernehmen alles — die richtigen Kontakte finden, E-Mails schreiben, Infrastruktur einrichten und Sequenzen versenden. Sie müssen nur eines tun: auf interessierte Interessenten antworten.",
      cta: "Kampagne starten"
    },
    stats: {
      replyRate: { value: "3–8%", label: "Durchschnittliche Antwortrate — Branchen-Benchmark" },
      launchDays: { value: "3–5", label: "Werktage bis zum Kampagnenstart" },
      toolsCost: { value: "CHF 0", label: "Zu kaufende Tools — wir kümmern uns um alles" }
    },
    includes: {
      badge: "Jede Kampagne enthält",
      title: "Alles erledigt. Nichts einzurichten.",
      items: [
        { title: "Lead-Prospektion", desc: "Frische, verifizierte Leads von Google Maps in Echtzeit — keine 2 Jahre alte Datenbank. Passend zu Ihrem genauen Zielprofil." },
        { title: "E-Mail-Copywriting", desc: "Eine personalisierte 3-stufige Sequenz, die für Ihr spezifisches Angebot und Ihre Zielgruppe erstellt wurde. Kein generisches Template — für Ihre Nische geschrieben." },
        { title: "Technisches Setup", desc: "Domain/Subdomain-Konfiguration, SPF, DKIM, DMARC und E-Mail-Warmup. Ihre E-Mails landen im Posteingang — nicht im Spam." },
        { title: "Kampagnen-Scheduling", desc: "Sequenzen über Instantly.ai mit intelligentem Timing und täglichen Limits, die Ihre Domain-Gesundheit schützen." },
        { title: "Zustellbarkeits-Monitoring", desc: "Bounce-Rate und Spam-Score werden den ganzen Monat überwacht. Wir erkennen Probleme, bevor sie Ihrer Domain schaden." },
        { title: "Monatsbericht", desc: "Klare Übersicht über gesendet / geöffnet / beantwortet / abgewiesen — plus was wir nächsten Monat anpassen und warum." }
      ]
    },
    packages: {
      badge: "Preise",
      title: "Einfache, transparente Preise",
      subtitle: "+ CHF 149 einmalige Einrichtungsgebühr (nur Neukunden) · Mindestlaufzeit 2 Monate · Danach monatlich kündbar",
      mostPopular: "Am beliebtesten",
      from: "Ab CHF",
      perMonth: "/Mo.",
      getStarted: "Jetzt starten",
      leadsOnly: "Brauchen Sie nur Leads, ohne Kampagnenmanagement? Wir liefern verifizierte Lead-Listen ab CHF 90 pro Liste. Fragen Sie via WhatsApp.",
      starter: {
        name: "Campaign Starter",
        contacts: "100 Kontakte/Mo.",
        replies: "~3–8 Antworten/Mo.",
        features: [
          "100 hyper-lokale Leads/Monat — live von Google Maps",
          "1 Versand-Postfach — konfiguriert & aufgewärmt",
          "1–2 Wochen Postfach-Warmup vor dem Start",
          "3-stufige personalisierte E-Mail-Sequenz",
          "Instantly.ai Kampagnen-Setup",
          "Zustellbarkeits-Monitoring",
          "Monatlicher Leistungsbericht"
        ]
      },
      growth: {
        name: "Campaign Growth",
        contacts: "250 Kontakte/Mo.",
        replies: "~8–20 Antworten/Mo.",
        features: [
          "250 hyper-lokale Leads/Monat — live von Google Maps",
          "Bis zu 3 Versand-Postfächer — konfiguriert & aufgewärmt",
          "1–2 Wochen Postfach-Warmup vor dem Start",
          "3-stufige personalisierte E-Mail-Sequenz",
          "A/B-Test bei Betreffzeilen",
          "Instantly.ai Kampagnen-Setup",
          "Zustellbarkeits-Monitoring",
          "Monatsbericht + Empfehlungen"
        ]
      },
      pro: {
        name: "Campaign Pro",
        contacts: "500+ Kontakte/Mo.",
        replies: "~15–40 Antworten/Mo.",
        features: [
          "500+ hyper-lokale Leads/Monat — live von Google Maps",
          "5+ Versand-Postfächer — konfiguriert & aufgewärmt",
          "1–2 Wochen Postfach-Warmup vor dem Start",
          "Multi-Segment-Targeting (Branchen, Städte oder Angebote)",
          "3-stufige personalisierte E-Mail-Sequenz pro Segment",
          "A/B-Test bei Betreffzeilen + Text",
          "Prioritäts-Zustellbarkeits-Monitoring",
          "Monatliches Strategie-Gespräch + vollständiger Bericht",
          "Individuelles Volumen verfügbar — Preis skaliert mit Kontakten"
        ]
      }
    },
    howItWorks: {
      badge: "So funktioniert es",
      title: "Von null auf Antworten in unter einer Woche",
      steps: [
        { title: "Definieren Sie Ihren Wunschkunden", desc: "Sagen Sie uns, wen Sie erreichen möchten: Branche, Stadt und Unternehmenstyp. Zum Beispiel: 'Zahnarztpraxen in Zürich' oder 'Anwaltskanzleien in Genf'. Je spezifischer, desto besser die Ergebnisse." },
        { title: "Wir bauen Ihre Kampagne", desc: "Wir beschaffen die Lead-Liste, schreiben die personalisierte 3-stufige E-Mail-Sequenz, konfigurieren die Versandinfrastruktur und richten alles in Instantly ein. Typischerweise in 3–5 Werktagen fertig." },
        { title: "Kampagne geht live", desc: "E-Mails werden in täglichen Batches mit smarten Verzögerungen versendet, um die Zustellbarkeit zu maximieren. Wir überwachen Öffnungsraten, Bounces und Antworten den ganzen Monat über." },
        { title: "Antworten kommen — wir optimieren", desc: "Interessierte Interessenten antworten direkt in Ihr Postfach. Am Monatsende senden wir einen Leistungsbericht und passen die nächste Kampagne basierend auf den Erkenntnissen an." }
      ]
    },
    comparison: {
      badge: "Marktvergleich",
      title: "So vergleichen wir uns",
      subtitle: "Eine Full-Service Cold-Email-Agentur berechnet CHF 2.000–8.000/Monat für dasselbe Ergebnis.",
      headers: { option: "Option", cost: "Kosten/Mo.", effort: "Ihr Aufwand", tracking: "Tracking" },
      rows: [
        { option: "Manuelles LinkedIn-Outreach", cost: "CHF 0–60", effort: "Sehr hoch", tracking: "Keins" },
        { option: "DIY-Tools (Apollo + Instantly)", cost: "CHF 150–400", effort: "Sehr hoch", tracking: "Basis" },
        { option: "Cold-Email-Agentur (Full-Service)", cost: "CHF 2.000+", effort: "Niedrig", tracking: "Ja" },
        { option: "Lopes2Tech", cost: "CHF 390–990+", effort: "Sehr niedrig", tracking: "Ja" }
      ]
    },
    faq: {
      title: "Häufig gestellte Fragen",
      subtitle: "Alles, was Sie vor dem Start wissen müssen.",
      items: [
        { question: "Funktioniert das für meine Branche?", answer: "Cold Email funktioniert in fast jedem B2B-Kontext, in dem es einen klaren Entscheidungsträger zu erreichen gibt. Es funktioniert besonders gut für professionelle Dienstleistungen (Anwälte, Buchhalter, Kliniken), Agenturen, Berater, Softwareunternehmen und lokale Unternehmen, die andere Unternehmen ansprechen." },
        { question: "Wie viele Antworten kann ich realistischerweise erwarten?", answer: "Der Branchen-Benchmark für gut gezielte, personalisierte Cold-Email-Kampagnen liegt bei 3–8% Antwortrate. Bei 100 Kontakten bedeutet das 3–8 Antworten pro Monat — nicht alle werden konvertieren. Die Ergebnisse hängen stark von der Angebotsklarheit, der Zielgenauigkeit und der Überzeugungskraft Ihres Wertversprechens ab." },
        { question: "Wofür ist die Einrichtungsgebühr?", answer: "Die einmalige CHF 149 Einrichtungsgebühr deckt: Erstellung und Konfiguration einer Versand-Subdomain, Einrichtung von SPF/DKIM/DMARC-DNS-Einträgen, Verbindung des Postfachs mit Instantly.ai und ein 2-wöchiges E-Mail-Warmup. Diese wird nur einmalig berechnet — nie bei Verlängerungen." },
        { question: "Wird meine Hauptdomain gefährdet?", answer: "Nein. Wir verwenden immer eine Versand-Subdomain (z.B. mail.ihredomain.com) — nie Ihre Hauptdomain. Dies isoliert Ihre primäre E-Mail-Reputation vollständig von der Kampagne." },
        { question: "Wie lange bis ich Ergebnisse sehe?", answer: "Die ersten 2 Wochen werden für den Warmup verwendet. Kampagnen gehen typischerweise in Woche 3 live. Erste Antworten kommen meist wenige Tage nach dem Start. Erwarten Sie die ersten aussagekräftigen Daten nach dem ersten vollen Monat." },
        { question: "Kann ich nach dem Mindestengagement kündigen?", answer: "Ja. Nach dem 2-Monats-Minimum läuft der Service monatlich. Kündigen Sie jederzeit mit 30 Tagen Frist — keine Jahresverträge, keine Strafen." },
        { question: "Muss ich Tools oder Software kaufen?", answer: "Nein. Wir kümmern uns um Instantly.ai, die Lead-Datenbank, E-Mail-Verifizierung und die gesamte technische Infrastruktur. Sie müssen nichts kaufen oder einrichten." }
      ]
    },
    cta: {
      badge: "Bereit anzufangen?",
      title: "Bauen Sie eine planbare Kunden-Pipeline",
      description: "Hören Sie auf, auf Empfehlungen zu warten. Lassen Sie uns Ihr Cold-Outreach aufbauen und verwalten — während Sie sich auf die Kunden konzentrieren, die antworten.",
      button: "Kostenloses Strategiegespräch"
    }
  },

  fr: {
    hero: {
      badge: "Cold Outreach — Entièrement géré",
      title: "Atteignez vos clients idéaux.",
      titleHighlight: "Pendant que vous dormez.",
      description: "Nous gérons tout — trouver les bons contacts, rédiger les emails, configurer l'infrastructure et envoyer les séquences. Vous n'avez qu'une seule chose à faire : répondre aux prospects intéressés.",
      cta: "Lancer ma campagne"
    },
    stats: {
      replyRate: { value: "3–8%", label: "Taux de réponse moyen — benchmark du secteur" },
      launchDays: { value: "3–5", label: "Jours ouvrés jusqu'au lancement de la campagne" },
      toolsCost: { value: "CHF 0", label: "Outils à acheter — nous gérons tout" }
    },
    includes: {
      badge: "Chaque campagne comprend",
      title: "Tout géré. Rien à configurer.",
      items: [
        { title: "Prospection de leads", desc: "Des leads frais et vérifiés sourcés depuis Google Maps en temps réel — pas une base de données vieille de 2 ans. Correspondant exactement à votre profil cible." },
        { title: "Rédaction des emails", desc: "Une séquence personnalisée en 3 étapes créée pour votre offre et votre audience spécifiques. Pas un template générique — écrit pour votre niche." },
        { title: "Configuration technique", desc: "Configuration domaine/sous-domaine, SPF, DKIM, DMARC et réchauffement d'email. Vos emails arrivent en boîte de réception — pas en spam." },
        { title: "Planification de campagne", desc: "Séquences envoyées via Instantly.ai avec un timing intelligent et des limites journalières qui protègent la santé de votre domaine." },
        { title: "Surveillance de la délivrabilité", desc: "Taux de rebond et score spam suivis tout au long du mois. Nous détectons les problèmes avant qu'ils n'endommagent votre domaine." },
        { title: "Rapport mensuel", desc: "Récapitulatif clair des envoyés / ouverts / répondus / rejetés — plus ce que nous ajustons le mois prochain et pourquoi." }
      ]
    },
    packages: {
      badge: "Tarifs",
      title: "Des tarifs simples et transparents",
      subtitle: "+ CHF 149 frais de configuration uniques (nouveaux clients uniquement) · Minimum 2 mois · Résiliation libre ensuite",
      mostPopular: "Le plus populaire",
      from: "À partir de CHF",
      perMonth: "/mois",
      getStarted: "Commencer",
      leadsOnly: "Besoin uniquement de leads, sans gestion de campagne ? Nous fournissons des listes vérifiées à partir de CHF 90 par liste. Demandez via WhatsApp.",
      starter: {
        name: "Campaign Starter",
        contacts: "100 contacts/mois",
        replies: "~3–8 réponses/mois",
        features: [
          "100 leads hyper-locaux/mois — sourcés en direct sur Google Maps",
          "1 boîte d'envoi — configurée & réchauffée",
          "1–2 semaines de réchauffement avant le lancement",
          "Séquence email personnalisée en 3 étapes",
          "Configuration de campagne Instantly.ai",
          "Surveillance de la délivrabilité",
          "Rapport mensuel de performance"
        ]
      },
      growth: {
        name: "Campaign Growth",
        contacts: "250 contacts/mois",
        replies: "~8–20 réponses/mois",
        features: [
          "250 leads hyper-locaux/mois — sourcés en direct sur Google Maps",
          "Jusqu'à 3 boîtes d'envoi — configurées & réchauffées",
          "1–2 semaines de réchauffement avant le lancement",
          "Séquence email personnalisée en 3 étapes",
          "Test A/B sur les lignes d'objet",
          "Configuration de campagne Instantly.ai",
          "Surveillance de la délivrabilité",
          "Rapport mensuel + recommandations"
        ]
      },
      pro: {
        name: "Campaign Pro",
        contacts: "500+ contacts/mois",
        replies: "~15–40 réponses/mois",
        features: [
          "500+ leads hyper-locaux/mois — sourcés en direct sur Google Maps",
          "5+ boîtes d'envoi — configurées & réchauffées",
          "1–2 semaines de réchauffement avant le lancement",
          "Ciblage multi-segment (secteurs, villes ou offres)",
          "Séquence email personnalisée en 3 étapes par segment",
          "Test A/B sur lignes d'objet + contenu",
          "Surveillance prioritaire de la délivrabilité",
          "Appel stratégique mensuel + rapport complet",
          "Volume personnalisé disponible — le prix évolue avec les contacts"
        ]
      }
    },
    howItWorks: {
      badge: "Comment ça fonctionne",
      title: "De zéro aux réponses en moins d'une semaine",
      steps: [
        { title: "Définissez votre client idéal", desc: "Dites-nous qui vous souhaitez atteindre : secteur, ville et type d'entreprise. Par exemple : 'cabinets dentaires à Genève' ou 'cabinets d'avocats à Zurich'. Plus vous êtes précis, meilleurs seront les résultats." },
        { title: "Nous construisons votre campagne", desc: "Nous sourceons la liste de leads, rédigeons la séquence email personnalisée en 3 étapes, configurons l'infrastructure d'envoi et mettons tout en place dans Instantly. Généralement prêt en 3–5 jours ouvrés." },
        { title: "La campagne se lance", desc: "Les emails partent en lots journaliers avec des délais intelligents pour maximiser la délivrabilité. Nous surveillons les taux d'ouverture, les rebonds et les réponses tout au long du mois." },
        { title: "Les réponses arrivent — nous optimisons", desc: "Les prospects intéressés répondent directement dans votre boîte. À la fin de chaque mois, nous envoyons un rapport de performance et ajustons la campagne suivante en fonction de ce qui fonctionne." }
      ]
    },
    comparison: {
      badge: "Comparaison du marché",
      title: "Comment nous nous comparons",
      subtitle: "Une agence d'email froid full-service facture CHF 2 000–8 000/mois pour le même résultat.",
      headers: { option: "Option", cost: "Coût/mois", effort: "Votre effort", tracking: "Suivi" },
      rows: [
        { option: "Outreach manuel sur LinkedIn", cost: "CHF 0–60", effort: "Très élevé", tracking: "Aucun" },
        { option: "Outils DIY (Apollo + Instantly)", cost: "CHF 150–400", effort: "Très élevé", tracking: "Basique" },
        { option: "Agence cold email (full-service)", cost: "CHF 2 000+", effort: "Faible", tracking: "Oui" },
        { option: "Lopes2Tech", cost: "CHF 390–990+", effort: "Très faible", tracking: "Oui" }
      ]
    },
    faq: {
      title: "Questions fréquentes",
      subtitle: "Tout ce que vous devez savoir avant de commencer.",
      items: [
        { question: "Est-ce que ça fonctionnera pour mon secteur ?", answer: "L'email froid fonctionne dans presque tous les contextes B2B où il y a un décideur clair à atteindre. Il fonctionne particulièrement bien pour les services professionnels (avocats, comptables, cliniques), les agences, les consultants, les éditeurs de logiciels et les entreprises locales ciblant d'autres entreprises." },
        { question: "Combien de réponses puis-je réalistement espérer ?", answer: "Le benchmark du secteur pour des campagnes d'email froid bien ciblées et personnalisées est un taux de réponse de 3–8%. Sur 100 contacts, cela représente 3–8 réponses par mois — toutes ne convertiront pas. Les résultats dépendent fortement de la clarté de l'offre, de la précision du ciblage et de la force de votre proposition de valeur." },
        { question: "À quoi servent les frais de configuration ?", answer: "Les CHF 149 uniques couvrent : la création et configuration d'un sous-domaine d'envoi, la mise en place des enregistrements DNS SPF/DKIM/DMARC, la connexion à Instantly.ai, et un réchauffement d'email de 2 semaines. Facturés une seule fois — jamais lors des renouvellements." },
        { question: "Mon domaine principal sera-t-il en danger ?", answer: "Non. Nous utilisons toujours un sous-domaine d'envoi (ex. : mail.votredomaine.com) — jamais votre domaine principal. Cela isole complètement la réputation de votre email principal de la campagne." },
        { question: "Combien de temps avant de voir des résultats ?", answer: "Les 2 premières semaines sont consacrées au réchauffement. Les campagnes se lancent généralement à la semaine 3. Les premières réponses arrivent habituellement quelques jours après le lancement. Attendez les premières données significatives après le premier mois complet." },
        { question: "Puis-je annuler après l'engagement minimum ?", answer: "Oui. Après le minimum de 2 mois, le service est mensuel. Annulez à tout moment avec 30 jours de préavis — pas de contrats annuels, pas de pénalités." },
        { question: "Dois-je acheter des outils ou des logiciels ?", answer: "Non. Nous gérons Instantly.ai, la base de données de leads, la vérification des emails et toute l'infrastructure technique. Vous n'avez rien à acheter ni à configurer." }
      ]
    },
    cta: {
      badge: "Prêt à commencer ?",
      title: "Construisez un pipeline client prévisible",
      description: "Arrêtez d'attendre les recommandations. Laissez-nous construire et gérer votre cold outreach — pendant que vous vous concentrez sur la livraison pour les clients qui répondent.",
      button: "Appel stratégique gratuit"
    }
  },

  it: {
    hero: {
      badge: "Cold Outreach — Completamente gestito",
      title: "Raggiungi i tuoi clienti ideali.",
      titleHighlight: "Mentre dormi.",
      description: "Gestiamo tutto noi — trovare i contatti giusti, scrivere le email, configurare l'infrastruttura e inviare le sequenze. Devi fare una sola cosa: rispondere ai potenziali clienti interessati.",
      cta: "Avvia la campagna"
    },
    stats: {
      replyRate: { value: "3–8%", label: "Tasso di risposta medio — benchmark del settore" },
      launchDays: { value: "3–5", label: "Giorni lavorativi fino al lancio della campagna" },
      toolsCost: { value: "CHF 0", label: "Strumenti da acquistare — pensiamo a tutto noi" }
    },
    includes: {
      badge: "Ogni campagna include",
      title: "Tutto gestito. Niente da configurare.",
      items: [
        { title: "Prospezione di lead", desc: "Lead freschi e verificati estratti da Google Maps in tempo reale — non un database vecchio di 2 anni. Corrispondenti esattamente al tuo profilo target." },
        { title: "Copywriting delle email", desc: "Una sequenza personalizzata in 3 step creata per la tua offerta e il tuo pubblico specifici. Non un template generico — scritta per la tua nicchia." },
        { title: "Configurazione tecnica", desc: "Configurazione dominio/sottodominio, SPF, DKIM, DMARC e riscaldamento email. Le tue email arrivano in casella — non nello spam." },
        { title: "Pianificazione della campagna", desc: "Sequenze inviate tramite Instantly.ai con timing intelligente e limiti giornalieri che proteggono la salute del tuo dominio." },
        { title: "Monitoraggio della deliverability", desc: "Tasso di rimbalzo e spam score tracciati per tutto il mese. Individuiamo i problemi prima che danneggino il tuo dominio." },
        { title: "Report mensile", desc: "Riepilogo chiaro di inviati / aperti / risposte / rimbalzi — più cosa aggiustiamo il mese prossimo e perché." }
      ]
    },
    packages: {
      badge: "Prezzi",
      title: "Prezzi semplici e trasparenti",
      subtitle: "+ CHF 149 fee di configurazione una tantum (solo nuovi clienti) · Minimo 2 mesi · Disdetta libera dopo",
      mostPopular: "Più popolare",
      from: "Da CHF",
      perMonth: "/mese",
      getStarted: "Inizia ora",
      leadsOnly: "Hai bisogno solo di lead, senza gestione della campagna? Forniamo liste verificate a partire da CHF 90 per lista. Chiedi via WhatsApp.",
      starter: {
        name: "Campaign Starter",
        contacts: "100 contatti/mese",
        replies: "~3–8 risposte/mese",
        features: [
          "100 lead iper-locali/mese — estratti in tempo reale da Google Maps",
          "1 casella di invio — configurata e scaldata",
          "1–2 settimane di riscaldamento prima del lancio",
          "Sequenza email personalizzata in 3 step",
          "Configurazione campagna su Instantly.ai",
          "Monitoraggio della deliverability",
          "Report mensile sulle performance"
        ]
      },
      growth: {
        name: "Campaign Growth",
        contacts: "250 contatti/mese",
        replies: "~8–20 risposte/mese",
        features: [
          "250 lead iper-locali/mese — estratti in tempo reale da Google Maps",
          "Fino a 3 caselle di invio — configurate e scaldate",
          "1–2 settimane di riscaldamento prima del lancio",
          "Sequenza email personalizzata in 3 step",
          "A/B test sulle righe dell'oggetto",
          "Configurazione campagna su Instantly.ai",
          "Monitoraggio della deliverability",
          "Report mensile + raccomandazioni"
        ]
      },
      pro: {
        name: "Campaign Pro",
        contacts: "500+ contatti/mese",
        replies: "~15–40 risposte/mese",
        features: [
          "500+ lead iper-locali/mese — estratti in tempo reale da Google Maps",
          "5+ caselle di invio — configurate e scaldate",
          "1–2 settimane di riscaldamento prima del lancio",
          "Targeting multi-segmento (settori, città o offerte)",
          "Sequenza email personalizzata in 3 step per segmento",
          "A/B test su oggetto + testo",
          "Monitoraggio prioritario della deliverability",
          "Chiamata strategica mensile + report completo",
          "Volume personalizzato disponibile — il prezzo scala con i contatti"
        ]
      }
    },
    howItWorks: {
      badge: "Come funziona",
      title: "Da zero alle risposte in meno di una settimana",
      steps: [
        { title: "Definisci il tuo cliente ideale", desc: "Dicci chi vuoi raggiungere: settore, città e tipo di azienda. Per esempio: 'studi dentistici a Milano' o 'studi legali a Zurigo'. Più sei specifico, migliori sono i risultati." },
        { title: "Costruiamo la tua campagna", desc: "Otteniamo la lista di lead, scriviamo la sequenza email personalizzata in 3 step, configuriamo l'infrastruttura di invio e impostiamo tutto su Instantly. Solitamente pronto in 3–5 giorni lavorativi." },
        { title: "La campagna va live", desc: "Le email partono in lotti giornalieri con ritardi intelligenti per massimizzare la deliverability. Monitoriamo i tassi di apertura, i rimbalzi e le risposte per tutto il mese." },
        { title: "Arrivano le risposte — ottimizziamo", desc: "I potenziali clienti interessati rispondono direttamente nella tua casella. A fine mese inviamo un report sulle performance e aggiustiamo la campagna successiva in base a ciò che funziona." }
      ]
    },
    comparison: {
      badge: "Confronto di mercato",
      title: "Come ci confrontiamo",
      subtitle: "Un'agenzia di cold email full-service addebita CHF 2.000–8.000/mese per lo stesso risultato.",
      headers: { option: "Opzione", cost: "Costo/mese", effort: "Il tuo sforzo", tracking: "Tracking" },
      rows: [
        { option: "Outreach manuale su LinkedIn", cost: "CHF 0–60", effort: "Molto alto", tracking: "Nessuno" },
        { option: "Strumenti DIY (Apollo + Instantly)", cost: "CHF 150–400", effort: "Molto alto", tracking: "Base" },
        { option: "Agenzia cold email (full-service)", cost: "CHF 2.000+", effort: "Basso", tracking: "Sì" },
        { option: "Lopes2Tech", cost: "CHF 390–990+", effort: "Molto basso", tracking: "Sì" }
      ]
    },
    faq: {
      title: "Domande frequenti",
      subtitle: "Tutto quello che devi sapere prima di iniziare.",
      items: [
        { question: "Funzionerà per il mio settore?", answer: "Il cold email funziona in quasi tutti i contesti B2B dove c'è un decisore chiaro da raggiungere. Funziona particolarmente bene per i servizi professionali (avvocati, commercialisti, cliniche), agenzie, consulenti, aziende software e attività locali che si rivolgono ad altre aziende." },
        { question: "Quante risposte posso aspettarmi realisticamente?", answer: "Il benchmark del settore per campagne di cold email ben mirate e personalizzate è un tasso di risposta del 3–8%. Su 100 contatti significa 3–8 risposte al mese — non tutte convertiranno. I risultati dipendono molto dalla chiarezza dell'offerta, dalla specificità del target e dalla forza della tua proposta di valore." },
        { question: "A cosa serve la fee di configurazione?", answer: "La fee una tantum di CHF 149 copre: creazione e configurazione di un sottodominio di invio, impostazione dei record DNS SPF/DKIM/DMARC, connessione a Instantly.ai e un riscaldamento email di 2 settimane. Addebitata solo una volta — mai sui rinnovi." },
        { question: "Il mio dominio principale sarà a rischio?", answer: "No. Usiamo sempre un sottodominio di invio (es. mail.tuodominio.com) — mai il dominio principale. Questo isola completamente la reputazione della tua email principale dalla campagna." },
        { question: "Quanto tempo prima di vedere risultati?", answer: "Le prime 2 settimane sono dedicate al riscaldamento. Le campagne vanno solitamente live alla settimana 3. Le prime risposte arrivano tipicamente entro pochi giorni dal lancio. Aspettati i primi dati significativi dopo il primo mese completo." },
        { question: "Posso disdire dopo l'impegno minimo?", answer: "Sì. Dopo il minimo di 2 mesi, il servizio è mensile. Disdici in qualsiasi momento con 30 giorni di preavviso — nessun contratto annuale, nessuna penale." },
        { question: "Devo acquistare strumenti o software?", answer: "No. Gestiamo Instantly.ai, il database di lead, la verifica delle email e tutta l'infrastruttura tecnica. Non devi acquistare né configurare nulla." }
      ]
    },
    cta: {
      badge: "Pronto a iniziare?",
      title: "Costruisci una pipeline clienti prevedibile",
      description: "Smetti di aspettare referral. Lascia che costruiamo e gestiamo il tuo cold outreach — mentre ti concentri sui clienti che rispondono.",
      button: "Chiamata strategica gratuita"
    }
  }
};

const locales = ['en', 'pt', 'de', 'fr', 'it'];

locales.forEach(locale => {
  const filePath = path.join(messagesDir, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  data.ColdEmailPage = translations[locale];
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`✓ ${locale}.json updated`);
});

console.log('Done.');
