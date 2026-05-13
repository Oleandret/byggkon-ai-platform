# BYGG-KON.ai

Astro-bygget nettside for BYGG-KONs AI-plattform. Design speilet etter [byggkon.no](https://www.byggkon.no) — ren, profesjonell, lyst tema.

## Stack

- **Astro 4** + `@astrojs/node` standalone-adapter
- **Tailwind CSS 3**
- **TypeScript**
- **Railway** for deploy

## Sider

- `/` &mdash; Landing (Hero, Tjenester, Eksempler, Om, CTA)
- `/agent/loki`, `/agent/nova`, `/agent/hilde`, `/agent/tripletex`, `/agent/epost`, `/agent/ki-tilbud` &mdash; agent-detaljsider med pipeline og tekniske detaljer

## Lokalt

```bash
npm install
npm run dev          # http://localhost:4321
npm run build
npm start            # http://localhost:3000
```

## Deploy

```bash
git add .
git commit -m "Rebuild: byggkon.no-inspired design"
git push
```

Railway leser `nixpacks.toml` og bygger automatisk.

## Struktur

```
src/
├── data/agents.ts            # Sentral kilde for alle 6 agenter
├── layouts/Layout.astro      # HTML-skall + Inter-font + nav/footer
├── components/
│   ├── Nav.astro             # Sticky header
│   ├── Hero.astro            # Split-screen hero med arkitektur-illustrasjon
│   ├── Tjenester.astro       # 6-kort agent-grid (byggkon.no Tjenester-style)
│   ├── Eksempler.astro       # 4 case-cards med mock-dokumenter (Referanser-style)
│   ├── Om.astro              # Om plattformen med mini-arkitektur
│   ├── CTA.astro             # Kontakt-blokk
│   └── Footer.astro          # 4-kol footer matchet til byggkon.no
├── pages/
│   ├── index.astro           # /
│   └── agent/[slug].astro    # /agent/[loki|nova|...]
└── styles/global.css         # Tailwind + base
```

## Designvalg

- **Typografi**: Inter (samme som byggkon.no's modern editorial look)
- **Farger**: Hvit base, sort tekst, BYGG-KONs ikonpalett (grønn/rød/gul/blå/lilla/oransje) som aksenter
- **Layout**: Generøs padding, 3-col grids, runde hjørner (2xl)
- **Komponenter**: Hovers løfter kort, link-arrows på CTA-er, ingen distraherende animasjoner

## Endre tema-farger

Tailwind-config: `tailwind.config.mjs` → `theme.extend.colors`. Per-agent hex-fargen ligger i `src/data/agents.ts`.

## Legge til en agent

Rediger `src/data/agents.ts`. Ny side på `/agent/[slug]` genereres automatisk. Legg til ikon-SVG i `src/components/Tjenester.astro`.

## Gamle filer fra forrige iterasjon

Disse er ikke lenger i bruk og kan slettes:
- `server.js`
- `public/index.html`, `public/css/`, `public/js/`
- `src/components/AgentCard.astro`, `AgentGrid.astro`, `Pipeline.astro`, `Stack.astro` (erstattet av nye komponenter)

```bash
git rm server.js
git rm -r public/
git rm src/components/AgentCard.astro src/components/AgentGrid.astro src/components/Pipeline.astro src/components/Stack.astro
git commit -m "Cleanup: remove legacy components"
```

## Lisens

© 2026 BYGG-KON AS.
