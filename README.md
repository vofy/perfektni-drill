# PerFEKTní drill

Vyhledávání a procvičování testových otázek z FEKT VUT.

**Web:** https://vofy.github.io/perfektni-drill/

- **Hledání** – fulltextové (fuzzy) vyhledávání v otázkách a správných odpovědích, volitelně i nesprávné odpovědi
- **Drill** – náhodně zamíchané otázky s výběrem odpovědi a okamžitým vyhodnocením
- LaTeX vzorce (KaTeX), obrázky, světlý / tmavý / systémový motiv

## Technologie

Statický web bez backendu: [Vue 3](https://vuejs.org), [Nuxt UI](https://ui.nuxt.com) (Tailwind CSS), [Vite](https://vite.dev), [Fuse.js](https://fusejs.io), [KaTeX](https://katex.org). Hostováno na GitHub Pages.

## Vývoj

```sh
npm install
npm run dev       # vývojový server na http://localhost:5173
npm run build     # produkční build do dist/
```

## Nasazení

Každý push do `main` se automaticky nasadí přes GitHub Actions (`.github/workflows/deploy.yml`).
V nastavení repozitáře musí být **Settings → Pages → Source: GitHub Actions**.
Patička webu zobrazuje zkrácený hash nasazeného commitu.

## Struktura

```
src/
  data/<program>/<předmět>/…/<test>.json   datasety – cesta k souboru = URL i položka v menu
  memes/                                   obrázky na úvodní stránce
  components/                              Sidebar, Home, Dataset, Search, Quiz, ColorModeButton
  App.vue                                  rozložení: hlavička, menu, patička
  lib.js                                   datasety, menu, nastavení, direktiva v-math
public/images/                             obrázky odkazované z datasetů (src='/images/…')
```

## Přidání testu

Stačí přidat JSON do `src/data/…` – v menu se objeví automaticky:

```json
{
  "title": "Zkouška",
  "description": "volitelný popis, např. zdroj otázek",
  "tasks": [
    {
      "title": "Otázka (HTML, LaTeX přes \\( … \\))",
      "answers": { "correct": ["…"], "incorrect": ["…"] },
      "comment": "volitelná poznámka"
    }
  ]
}
```

- Obrázky patří do `public/images/…` a odkazují se jako `<img src='/images/…'>`.
- Popisky v menu se berou z názvu souboru/složky (`lib.js` → `LABELS`, jinak velkými písmeny).

## Kontakt

Email: [tomas.batelka@email.cz](mailto:tomas.batelka@email.cz)
