# BYGG-KON.ai

Astro-bygget nettside for BYGG-KONs AI-plattform. Lyst byggkon.no-tema, komponentstruktur, egne sider per agent.

## Stack

- **Astro 4** med `@astrojs/node` standalone-adapter
- **Tailwind CSS 3** for styling
- **TypeScript** for type-sikre datafiler
- **Railway** for deploy (eller hvilken som helst Node-host)

## Struktur

```
byggkon-ai-platform/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── nixpacks.toml
├── railway.json
├── README.md
└── src/
    ├── data/
    │   └── agents.ts            # Sentral kilde for alle agentdata
    ├── layouts/
    │   └── Layout.astro         # Felles HTML-skall
    ├── components/
    │   ├── Nav.astro
    │   ├── Hero.astro
    │   ├── AgentCard.astro
    │   ├── AgentGrid.astro
    │   ├── Pipeline.astro
    │   ├── Stack.astro
    │   ├── CTA.astro
    │   └── Footer.astro
    ├── pages/
    │   ├── index.astro          # /
    │   └── agent/[slug].astro   # /agent/loki, /agent/nova, osv.
    └── styles/
        └── global.css           # Tailwind + base styles
```

## Sider

- `/` — landingsside (hero, agentgrid, pipeline-demo, stack, CTA)
- `/agent/loki` — dedikert Loki-side med pipeline + detaljer
- `/agent/nova` — Nova
- `/agent/hilde` — Hilde
- `/agent/tripletex` — Tripletex
- `/agent/epost` — Epostagent
- `/agent/ki-tilbud` — KI Tilbud

Hver agent har en egen, fokusert side med pipeline-diagram, tekniske detaljer og lenker til relaterte agenter.

## Lokal utvikling

```bash
# Klon eller pull endringene
git pull

# Installer (Astro + Tailwind + node-adapter)
npm install

# Dev-server (hot reload)
npm run dev
# → http://localhost:4321

# Bygg
npm run build

# Test prod-build lokalt
npm start
# → http://localhost:3000
```

## Deploy til Railway

Push til GitHub — Railway oppdager automatisk endringene:

```bash
git add .
git commit -m "Rebuild: Astro + Tailwind, component-based, agent pages"
git push
```

Railway leser `nixpacks.toml`:
1. Installerer Node 20 + alle dependencies (inkl. dev for Astro-bygg)
2. Kjører `npm run build` (Astro bygger til `dist/`)
3. Starter med `npm start` (kjører `dist/server/entry.mjs` på `PORT` fra env)

## Migrering fra forrige versjon

Den gamle versjonen brukte:
- `server.js` (Express)
- `public/index.html` (én stor side)
- `public/css/styles.css`
- `public/js/main.js`, `public/js/animations.js`

Disse filene er nå ubrukte. Kan trygt slettes:

```bash
git rm server.js
git rm -r public/
git commit -m "Cleanup: remove legacy single-file setup"
```

## Legge til en ny agent

Rediger `src/data/agents.ts` — legg til en ny entry i `agents`-arrayen. En ny side på `/agent/[slug]` genereres automatisk. Husk å legge til ikon i `src/components/AgentGrid.astro` om du vil ha den i grid-en.

## Endre tema-farger

Rediger `tailwind.config.mjs` → `theme.extend.colors`. Brand-fargene for hver agent ligger som hex-strenger i `src/data/agents.ts`.

## Lisens

© 2026 BYGG-KON AS.
