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
    // adm1GeoJsonUrl: 'https://raw.githubusercontent.com/wmgeolab/geoBoundaries/main/releaseData/gbOpen/MAR/ADM1/geoBoundaries-MAR-ADM1.geojson' 
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

// Fonction utilitaire pour obtenir une zone par ID
export const getZoneById = (zoneId) => {
  return ZONES.find(z => z.id === zoneId)
}

// Fonction utilitaire pour obtenir un pays par code
export const getCountryByCode = (code) => {
  return COUNTRIES.find(c => c.code === code || c.code3 === code)
}