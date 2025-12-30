# 🌾 Calendrier Agricole – Maroc

Application React affichant un calendrier agricole mensuel
adapté à la région Casablanca-Settat.

## 🚀 Fonctionnalités
- Sélection du mois
- Affichage des cultures
- Statut agricole (excellent, bon, risqué…)
- Noms français & arabe

## 📁 Structure
- `data/` : données agricoles
- `components/` : composants React
- `css/` : styles
- `utils/` : fonctions utilitaires

## Structure du projet
calendrier-agricole/
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── assets/
│   │   └── flags
│   │
│   ├── components/
│   │   ├── CalendrierAgricole.jsx
│   │   ├── LanguageSwitcher.jsx 
│   │   └── LocationSelector.jsx
│   │
│   ├── data/
│   │   ├── categories.js
│   │   ├── cultures.js
│   │   ├── meteo.js
│   │   └── zones.js
│   │
│   ├── hooks/
│   │   └── useAutoLocation.js
│   │
│   ├── locals/
│   │   ├── ar.json
│   │   ├── en.json
│   │   ├── es.json
│   │   └── fr.json
│   │
│   ├── utils/
│   │   └── statut.js
│   │
│   ├── i18n.js
│   │   
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── postcss.config.js
├── tailwind.config.js
├── package.json
└── README.md


## ▶️ Lancer le projet
```bash
npm install
npm run dev
