// zones.js - Données des pays et zones agricoles

// Liste des zones agricoles avec leurs caractéristiques
export const ZONES = [
  {
    id: 'mediterraneenne',
    name: 'Méditerranéenne',
    color: '#f59e0b',
    description: 'Étés chauds et secs, hivers doux et humides'
  },
  {
    id: 'temperee',
    name: 'Tempérée',
    color: '#10b981',
    description: 'Quatre saisons distinctes, précipitations régulières'
  },
  {
    id: 'tropicale',
    name: 'Tropicale',
    color: '#22c55e',
    description: 'Chaleur constante, saison sèche et saison des pluies'
  },
  {
    id: 'semiAride',
    name: 'Semi-aride',
    color: '#eab308',
    description: 'Précipitations faibles, variabilité importante'
  },
  {
    id: 'aride',
    name: 'Aride',
    color: '#ef4444',
    description: 'Précipitations très faibles, températures extrêmes'
  },
  {
    id: 'subtropicale',
    name: 'Subtropicale',
    color: '#3b82f6',
    description: 'Étés chauds, hivers doux, humidité élevée'
  },
  {
    id: 'continentale',
    name: 'Continentale',
    color: '#6366f1',
    description: 'Grandes variations de température, hivers rigoureux'
  },
  {
    id: 'equatoriale',
    name: 'Équatoriale',
    color: '#16a34a',
    description: 'Chaleur et humidité constantes toute l\'année'
  }
]

// Liste des pays avec leurs zones et régions
export const COUNTRIES = [
  // Afrique
  {
    code: 'MA',
    code3: 'MAR',
    name: 'Maroc',
    nameKey: 'countries.ma',
    zones: ['mediterraneenne', 'semiAride', 'aride'],
    adm1GeoJsonUrl: '/climate/morocco.geojson',
  },

];
// Noms des zones en français
export const ZONE_NAMES = {
  mediterraneenne: 'Méditerranéenne',
  temperee: 'Tempérée',
  tropicale: 'Tropicale',
  semiAride: 'Semi-aride',
  aride: 'Aride',
  subtropicale: 'Subtropicale',
  continentale: 'Continentale',
  equatoriale: 'Équatoriale',
}


// Couleurs pour chaque zone
export const ZONE_COLORS = {
  mediterraneenne: '#f59e0b',
  temperee: '#10b981',
  tropicale: '#22c55e',
  semiAride: '#eab308',
  aride: '#ef4444',
  subtropicale: '#3b82f6',
  continentale: '#6366f1',
  equatoriale: '#16a34a',
}

export const REGION_TO_ZONE = {
  'Tangier-Tetouan-Al Hoceima': 'mediterraneenne',
  'Oriental': 'mediterraneenne',
  'Fès-Meknès': 'mediterraneenne',
  'Rabat-Salé-Kénitra': 'mediterraneenne',
  'Béni Mellal-Khénifra': 'semiAride',
  'Casablanca-Settat': 'semiAride',
  'Marrakech-Safi': 'semiAride',
  'Drâa-Tafilalet': 'aride',
  'Souss-Massa': 'aride',
  'Guelmim-Oued Noun': 'aride',
  'Laâyoune-Sakia El Hamra': 'aride',
  'Dakhla-Oued Ed-Dahab': 'aride'
};

export const ZONE_STATS = {
  mediterraneenne: {
    precipitations: '400-800 mm/an',
    temperature_moy: '15-20°C',
    cultures_principales: 'Céréales, fruits, légumes'
  },
  semiAride: {
    precipitations: '200-400 mm/an',
    temperature_moy: '18-25°C',
    cultures_principales: 'Tomates, pommes de terre, olives'
  },
  aride: {
    precipitations: '<200 mm/an',
    temperature_moy: '20-30°C',
    cultures_principales: 'Dattes, sorgho, irrigation limitée'
  }
};

// Fonction utilitaire pour obtenir une zone par ID
export const getZoneById = (zoneId) => {
  return ZONES.find(z => z.id === zoneId)
}

// Fonction utilitaire pour obtenir un pays par code
export const getCountryByCode = (code) => {
  return COUNTRIES.find(c => c.code === code || c.code3 === code)
}