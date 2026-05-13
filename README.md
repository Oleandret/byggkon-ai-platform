# BYGG-KON AI Platform

Interaktiv landingsside som viser hvordan BYGG-KONs AI-økosystem henger sammen:
**byggkon.no**, **Loki AI**, **Nova AI Agent**, **byggkon.ai**, **Tripletex (via MCP)** og **Fyxer AI** — orkestrert av **Claude**.

Bygd som en statisk nettside servert av en lett Express-server. Klar for deploy på Railway.

---

## Hva er inkludert

- **Hero** i BYGG-KON-stil med subtil partikkel-animasjon
- **Stort flytdiagram** — 6 kilder → Claude → leveranser, med animerte datastrømmer
- **Systemkort** for alle 6 AI-systemer
- **byggkon.ai featured section** med live tomte-visualisering (kart, ping-animasjoner)
- **Arbeidsflyt** i 4 steg
- **CTA** og full footer
- Responsivt design (desktop / tablet / mobil)
- Healthcheck-endepunkt for Railway (`/healthz`)

---

## Lokalt utvikling

```bash
# Klon prosjektet
git clone https://github.com/<din-bruker>/byggkon-ai-platform.git
cd byggkon-ai-platform

# Installer
npm install

# Start
npm start
# → http://localhost:3000
```

---

## Deploy til Railway

### Alternativ A — via Railway-dashboard (enklest)

1. Push prosjektet til GitHub (se under).
2. Logg inn på [railway.app](https://railway.app).
3. Klikk **New Project → Deploy from GitHub repo**.
4. Velg `byggkon-ai-platform`-repoet.
5. Railway oppdager automatisk Node.js via `nixpacks.toml` og kjører `npm start`.
6. Når deploy er ferdig: klikk **Settings → Generate Domain** for en `*.up.railway.app`-URL.

Railway plukker opp `PORT` fra miljøvariabler automatisk — du trenger ikke konfigurere noe.

### Alternativ B — via Railway CLI

```bash
npm i -g @railway/cli
railway login
railway init
railway up
railway domain   # genererer offentlig URL
```

---

## Push til GitHub

```bash
# Initier repo
git init
git add .
git commit -m "Initial commit: BYGG-KON AI Platform"

# Opprett tomt repo på github.com først, deretter:
git branch -M main
git remote add origin https://github.com/<din-bruker>/byggkon-ai-platform.git
git push -u origin main
```

---

## Struktur

```
byggkon-ai-platform/
├── public/
│   ├── index.html        # Hele siden
│   ├── css/styles.css    # Stilark — BYGG-KON tema
│   └── js/main.js        # Animasjoner, tellere, partikler
├── server.js             # Express static-server
├── package.json
├── nixpacks.toml         # Railway build-config
├── railway.json          # Railway deploy-config
├── .gitignore
└── README.md
```

---

## Tilpasning

- **Farger**: rediger CSS-variabler øverst i `public/css/styles.css` (`--brand-green`, `--brand-red`, `--brand-yellow`, `--brand-blue`).
- **Innhold**: alt tekstinnhold ligger i `public/index.html`.
- **Lenker til AI-systemer**: oppdater URLene i `index.html` for Loki, Nova, Tripletex, Fyxer.
- **Tripletex MCP**: dette prosjektet er ren visualisering. Selve MCP-koblingen skjer i Claude-klienten din.

---

## Tekniske valg

- **Node 20** via Nixpacks
- **Express 4** for static serving + healthcheck
- **Compression** for raskere respons
- Cache-Control: HTML uten cache, assets med 1-års immutable cache
- Sikkerhetsheadere: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`

---

## Lisens

© 2026 BYGG-KON AS. Alle rettigheter reservert.
