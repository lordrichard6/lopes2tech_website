#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const messagesDir = path.join(__dirname, '..', 'messages');

const patches = {
  en: { name: "Cold Email Outreach", description: "Reach prospects directly in their inbox" },
  pt: { name: "Outreach por Email Frio", description: "Alcance prospects diretamente na caixa de entrada" },
  de: { name: "Cold-Email-Outreach", description: "Interessenten direkt im Posteingang erreichen" },
  fr: { name: "Outreach par Email Froid", description: "Atteignez vos prospects directement dans leur boîte mail" },
  it: { name: "Cold Email Outreach", description: "Raggiungi i prospect direttamente nella loro casella" },
};

['en','pt','de','fr','it'].forEach(locale => {
  const filePath = path.join(messagesDir, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  data.ServiceLinks.services.coldEmail = patches[locale];
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`✓ ${locale}.json — ServiceLinks.coldEmail added`);
});

console.log('Done.');
