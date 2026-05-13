export type AgentStatus = 'live' | 'beta';

export type Agent = {
  slug: string;
  num: string;
  name: string;
  role: string;
  tagline: string;
  description: string;
  status: AgentStatus;
  color: string;     // hex
  colorClass: string; // tailwind name (loki, nova, etc.)
  meta: string;
  pipeline: { i: string; n: string; d: string }[];
  details: { k: string; v: string }[];
  url?: string;
};

export const agents: Agent[] = [
  {
    slug: 'loki',
    num: '01',
    name: 'Loki',
    role: 'Intern kunnskap',
    tagline: '40 år med BYGG-KONs ansattes arbeid — vektorisert, søkbart, levende.',
    description: 'Loki samler all intern fagkunnskap fra prosjekter, notater, tegninger og beste praksis i én vektordatabase. Den er hjertet i hele plattformen.',
    status: 'beta',
    color: '#c8102e',
    colorClass: 'loki',
    meta: 'pgvector · 2,4M embeddings',
    pipeline: [
      { i: '📁', n: 'Råkilde',    d: 'Prosjekter · tegninger · notater' },
      { i: '🔍', n: 'Parser',     d: 'OCR · PDF · DOCX' },
      { i: '🧮', n: 'Embedding',  d: 'text-embedding-3-large' },
      { i: '🗄️', n: 'pgvector',   d: '2,4M vektorer · 1536-dim' },
      { i: '⚡', n: 'loki-mcp',   d: 'Servert til LLM' }
    ],
    details: [
      { k: 'Stack',       v: 'Node.js · Postgres · pgvector' },
      { k: 'Datavolum',   v: '2,4M embeddings · 40 år' },
      { k: 'Oppdatering', v: 'Sanntid via webhooks' },
      { k: 'Tilgang',     v: 'Via Claude · ChatGPT · Gemini' }
    ],
    url: 'https://byggkon-loki-ai-production.up.railway.app/'
  },
  {
    slug: 'nova',
    num: '02',
    name: 'Nova',
    role: 'Offentlig kunnskap',
    tagline: 'Hele det norske byggregelverket — vektorisert, oppdatert, alltid tilgjengelig.',
    description: 'Nova holder hele det offentlige byggregelverket søkbart — TEK17, NS-standarder, BFE og DiBKs publikasjoner.',
    status: 'live',
    color: '#f5b400',
    colorClass: 'nova',
    meta: 'TEK17 · NS · DiBK',
    pipeline: [
      { i: '🏛️', n: 'Kilder',     d: 'DiBK · Lovdata · NS-online' },
      { i: '🤖', n: 'Scraper',    d: 'Daglig sync · diff' },
      { i: '🧮', n: 'Embedding',  d: 'Paragraf-nivå chunking' },
      { i: '🗄️', n: 'pgvector',   d: '890k vektorer' },
      { i: '🚀', n: 'nova-mcp',   d: 'Sitatpresise svar' }
    ],
    details: [
      { k: 'Dekker',      v: 'TEK17 · SAK10 · BFE · NS' },
      { k: 'Oppdatering', v: 'Daglig fra Lovdata + DiBK' },
      { k: 'Sitat',       v: 'Hver påstand med kilde' },
      { k: 'Tilgang',     v: 'Via Claude · ChatGPT · Gemini' }
    ],
    url: 'https://nova-ai-agent-bygg-kon-production.up.railway.app/'
  },
  {
    slug: 'hilde',
    num: '03',
    name: 'Hilde',
    role: 'Eiendom & eiere',
    tagline: 'Fra adresse til komplett eiendomsdossier på sekunder.',
    description: 'Hilde finner eiendommer, identifiserer eiere og henter komplette grunnboksdata fra Kartverket og Brønnøysund.',
    status: 'live',
    color: '#0a6cf0',
    colorClass: 'hilde',
    meta: 'Matrikkel · grunnbok',
    pipeline: [
      { i: '📍', n: 'Input',         d: 'Adresse · gnr/bnr' },
      { i: '🗺️', n: 'Kartverket',    d: 'Matrikkel + grunnbok' },
      { i: '🏢', n: 'Brønnøysund',   d: 'Eier · selskap' },
      { i: '📊', n: 'Aggregator',    d: 'Konsolidert dossier' },
      { i: '🗺️', n: 'hilde-mcp',     d: 'Servert til Claude' }
    ],
    details: [
      { k: 'Kilder',  v: 'Kartverket · Brønnøysund · Geonorge' },
      { k: 'Søk',     v: 'Adresse · matrikkel · område' },
      { k: 'Output',  v: 'Eier · pant · heftelser · kontakt' },
      { k: 'Tilgang', v: 'Via Claude · ChatGPT · Gemini' }
    ]
  },
  {
    slug: 'tripletex',
    num: '04',
    name: 'Tripletex',
    role: 'Økonomi (MCP)',
    tagline: 'Hele økonomisystemet eksponert som verktøy i samtalen.',
    description: 'BYGG-KONs økonomisystem koblet direkte inn via Model Context Protocol. 35+ verktøy for faktura, regnskap, prosjektøkonomi og timeføring.',
    status: 'live',
    color: '#7a3fc8',
    colorClass: 'tt',
    meta: 'OAuth · 35+ MCP-verktøy',
    pipeline: [
      { i: '🔑', n: 'OAuth',       d: 'Sikker autentisering' },
      { i: '🌐', n: 'REST API',    d: 'Tripletex v2' },
      { i: '🧰', n: 'MCP Tools',   d: '35+ verktøy' },
      { i: '🛡️', n: 'Rate-limit',  d: 'Token-bucket + cache' },
      { i: '💼', n: 'tripletex-mcp', d: 'Til LLM' }
    ],
    details: [
      { k: 'Operasjoner', v: 'Faktura · ordre · regnskap · timer' },
      { k: 'Modus',       v: 'Lese + skrive (med bekreftelse)' },
      { k: 'Sanntid',     v: 'Direkte mot Tripletex Live' },
      { k: 'Tilgang',     v: 'Bygd som MCP — Claude-native' }
    ]
  },
  {
    slug: 'epost',
    num: '05',
    name: 'Epostagent',
    role: 'E-post & triage',
    tagline: 'Innboks som tenker selv.',
    description: 'Sortering, prioritering og auto-svar — i ansattes egen stil. Leser tråder, fanger oppgaver, oppsummerer møter.',
    status: 'live',
    color: '#ff6b35',
    colorClass: 'fx',
    meta: 'IMAP · M365',
    pipeline: [
      { i: '📥', n: 'Inbox',          d: 'Microsoft 365 · IMAP' },
      { i: '🏷️', n: 'Klassifisering',d: 'Type · prioritet · prosjekt' },
      { i: '🧠', n: 'Kontekst',       d: 'Tråd + Loki-oppslag' },
      { i: '✍️', n: 'Drafting',      d: 'I ansattes stemme' },
      { i: '📬', n: 'epost-mcp',      d: 'Triage + svar' }
    ],
    details: [
      { k: 'Kobling', v: 'Microsoft 365 · Gmail · IMAP' },
      { k: 'Læring',  v: 'Stil per ansatt — fra historikk' },
      { k: 'Oppgaver',v: 'Konverterer e-post til to-do' },
      { k: 'Møter',   v: 'Oppsummerer & følger opp' }
    ]
  },
  {
    slug: 'ki-tilbud',
    num: '06',
    name: 'KI Tilbud',
    role: 'Anbud & tilbud',
    tagline: 'Fra forespørsel til signaturklart tilbud — i ett gjennomløp.',
    description: 'Spesialagent som kombinerer Loki, Nova og Tripletex for å produsere komplette tilbud etter NS 8400 og NS 3450.',
    status: 'beta',
    color: '#1f8a3a',
    colorClass: 'ki',
    meta: 'NS 8400 · NS 3450',
    pipeline: [
      { i: '📨', n: 'Forespørsel',  d: 'Doseanmodning · BVP' },
      { i: '📚', n: 'Loki + Nova',  d: 'Referanser + krav' },
      { i: '💰', n: 'Tripletex',    d: 'Timepriser + påslag' },
      { i: '📐', n: 'Kalkulasjon',  d: 'NS 3450 · risiko' },
      { i: '📄', n: 'Tilbudsdok',   d: 'PDF · signaturklar' }
    ],
    details: [
      { k: 'Standarder', v: 'NS 8400 · NS 8401 · NS 3450' },
      { k: 'Output',     v: 'Komplett tilbud + vedlegg + risiko' },
      { k: 'Tid',        v: 'Fra dager til timer' },
      { k: 'Kobling',    v: 'Bruker Loki + Nova + Tripletex' }
    ]
  }
];

export function getAgent(slug: string): Agent | undefined {
  return agents.find(a => a.slug === slug);
}
