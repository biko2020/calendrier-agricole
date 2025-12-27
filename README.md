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
│   └── index.html
│
├── src/
│   ├── css/
│   │   └── style.css
│   │
│   ├── data/
│   │   ├── mois.js
│   │   ├── meteo.js
│   │   └── cultures.js
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Meteo.jsx
│   │   ├── MonthSelector.jsx
│   │   ├── CategoryFilter.jsx
│   │   └── CultureCard.jsx
│   │
│   ├── utils/
│   │   └── statut.js
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
