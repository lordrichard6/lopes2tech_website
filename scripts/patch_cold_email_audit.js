#!/usr/bin/env node
// Adds 4th stat + locale-aware metadata descriptions to ColdEmailPage in all 5 locales
const fs = require('fs');
const path = require('path');
const messagesDir = path.join(__dirname, '..', 'messages');

const patches = {
  en: {
    stat4: { value: "CHF 149", label: "One-time setup · Never charged again" },
    metaDesc: "Reach your ideal Swiss clients with fully managed cold email campaigns. Lead sourcing, copywriting, technical setup, and sending — all handled. From CHF 390/mo.",
  },
  pt: {
    stat4: { value: "CHF 149", label: "Configuração única · Nunca mais cobrada" },
    metaDesc: "Alcance os seus clientes ideais com campanhas de email frio totalmente geridas. Prospeção de leads, copywriting, configuração técnica e envios — tudo tratado. A partir de CHF 390/mês.",
  },
  de: {
    stat4: { value: "CHF 149", label: "Einmalige Einrichtung · Nie wieder berechnet" },
    metaDesc: "Erreichen Sie Ihre Wunschkunden mit vollständig verwalteten Cold-Email-Kampagnen. Lead-Prospektion, Texterstellung, technisches Setup und Versand — alles erledigt. Ab CHF 390/Mo.",
  },
  fr: {
    stat4: { value: "CHF 149", label: "Configuration unique · Jamais rechargée" },
    metaDesc: "Atteignez vos clients idéaux avec des campagnes d'email froid entièrement gérées. Prospection, rédaction, configuration technique et envoi — tout géré. À partir de CHF 390/mois.",
  },
  it: {
    stat4: { value: "CHF 149", label: "Configurazione unica · Mai più addebitata" },
    metaDesc: "Raggiungi i tuoi clienti ideali con campagne di cold email completamente gestite. Prospezione, copywriting, configurazione tecnica e invio — tutto gestito. Da CHF 390/mese.",
  },
};

['en','pt','de','fr','it'].forEach(locale => {
  const filePath = path.join(messagesDir, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const ce = data.ColdEmailPage;

  // Add 4th stat
  ce.stats.setupFee = patches[locale].stat4;

  // Add metadata description for generateMetadata in layout
  ce.metadata = { description: patches[locale].metaDesc };

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`✓ ${locale}.json patched`);
});

console.log('Done.');
