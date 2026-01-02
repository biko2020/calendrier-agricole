
// src/data/cultures.js

export const culturesParZoneEtMois = {
  mediterraneenne: {
    // Maroc (Casablanca-Settat), Italie du Sud, Californie, Espagne, Chili
    0: [ // Janvier
      { key: 'ble', type: 'cereales', actionKey: 'croissance', statut: 'excellent', icon: '🌾' },
      { key: 'orge', type: 'cereales', actionKey: 'croissance', statut: 'excellent', icon: '🌾' },
      { key: 'feves', type: 'legumineuses', actionKey: 'plantation', statut: 'excellent', icon: '🌱' },
      { key: 'epinards', type: 'legumes', actionKey: 'plantation', statut: 'excellent', icon: '🥬' },
      { key: 'navets', type: 'legumes', actionKey: 'plantation', statut: 'excellent', icon: '🥕' },
      { key: 'laitue', type: 'legumes', actionKey: 'plantation', statut: 'excellent', icon: '🥬' }
    ],
    1: [ // Février
      { key: 'pommes_de_terre', type: 'legumes', actionKey: 'plantation', statut: 'bon', icon: '🥔' },
      { key: 'carottes', type: 'legumes', actionKey: 'plantation', statut: 'excellent', icon: '🥕' },
      { key: 'laitue', type: 'legumes', actionKey: 'plantation', statut: 'excellent', icon: '🥬' },
      { key: 'coriandre', type: 'aromatiques', actionKey: 'plantation', statut: 'excellent', icon: '🌿' }
    ],
    2: [ // Mars
      { key: 'tomates', type: 'legumes', actionKey: 'semis', statut: 'excellent', icon: '🍅' },
      { key: 'piments', type: 'legumes', actionKey: 'semis', statut: 'bon', icon: '🌶️' },
      { key: 'mais', type: 'cereales', actionKey: 'plantation', statut: 'bon', icon: '🌽' },
      { key: 'persil', type: 'aromatiques', actionKey: 'plantation', statut: 'excellent', icon: '🌿' }
    ],
    3: [ // Avril
      { key: 'courgettes', type: 'legumes', actionKey: 'plantation', statut: 'excellent', icon: '🥒' },
      { key: 'aubergines', type: 'legumes', actionKey: 'plantation', statut: 'bon', icon: '🍆' },
      { key: 'haricots', type: 'legumineuses', actionKey: 'plantation', statut: 'excellent', icon: '🌱' }
    ],
    4: [ // Mai
      { key: 'tomates', type: 'legumes', actionKey: 'transplantation', statut: 'excellent', icon: '🍅' },
      { key: 'poivrons', type: 'legumes', actionKey: 'transplantation', statut: 'bon', icon: '🫑' },
      { key: 'basilic', type: 'aromatiques', actionKey: 'plantation', statut: 'excellent', icon: '🌿' }
    ],
    5: [ // Juin
      { key: 'mais', type: 'cereales', actionKey: 'croissance', statut: 'bon', icon: '🌽' },
      { key: 'pasteque', type: 'fruits', actionKey: 'plantation', statut: 'bon', icon: '🍉' },
      { key: 'melon', type: 'fruits', actionKey: 'plantation', statut: 'bon', icon: '🍈' }
    ],
    6: [ // Juillet
      { key: 'tomates', type: 'legumes', actionKey: 'recolte', statut: 'excellent', icon: '🍅' },
      { key: 'courgettes', type: 'legumes', actionKey: 'recolte', statut: 'excellent', icon: '🥒' }
    ],
    7: [ // Août
      { key: 'mais', type: 'cereales', actionKey: 'recolte', statut: 'bon', icon: '🌽' },
      { key: 'pasteque', type: 'fruits', actionKey: 'recolte', statut: 'excellent', icon: '🍉' },
      { key: 'melon', type: 'fruits', actionKey: 'recolte', statut: 'excellent', icon: '🍈' }
    ],
    8: [ // Septembre
      { key: 'ble', type: 'cereales', actionKey: 'preparation_sol', statut: 'bon', icon: '🌾' },
      { key: 'orge', type: 'cereales', actionKey: 'preparation_sol', statut: 'bon', icon: '🌾' }
    ],
    9: [ // Octobre
      { key: 'ble', type: 'cereales', actionKey: 'semis', statut: 'excellent', icon: '🌾' },
      { key: 'orge', type: 'cereales', actionKey: 'semis', statut: 'excellent', icon: '🌾' },
      { key: 'feves', type: 'legumineuses', actionKey: 'semis', statut: 'excellent', icon: '🌱' }
    ],
    10: [ // Novembre
      { key: 'pois_chiches', type: 'legumineuses', actionKey: 'plantation', statut: 'bon', icon: '🌱' },
      { key: 'epinards', type: 'legumes', actionKey: 'plantation', statut: 'excellent', icon: '🥬' }
    ],
    11: [ // Décembre
      { key: 'ble', type: 'cereales', actionKey: 'croissance', statut: 'excellent', icon: '🌾' },
      { key: 'orge', type: 'cereales', actionKey: 'croissance', statut: 'excellent', icon: '🌾' },
      { key: 'laitue', type: 'legumes', actionKey: 'plantation', statut: 'excellent', icon: '🥬' }
    ]
  },

  temperee: {
    // France, Allemagne, USA Midwest, Canada – Hivers froids, étés chauds
    0: [ // Janvier
      { key: 'ail', type: 'legumes', actionKey: 'plantation', statut: 'bon', icon: '🧄' }
    ],
    1: [ // Février
      { key: 'oignons', type: 'legumes', actionKey: 'semis', statut: 'bon', icon: '🧅' }
    ],
    2: [ // Mars
      { key: 'pommes_de_terre', type: 'legumes', actionKey: 'plantation', statut: 'excellent', icon: '🥔' },
      { key: 'carottes', type: 'legumes', actionKey: 'semis', statut: 'excellent', icon: '🥕' },
      { key: 'pois', type: 'legumineuses', actionKey: 'semis', statut: 'excellent', icon: '🌱' }
    ],
    3: [ // Avril
      { key: 'tomates', type: 'legumes', actionKey: 'semis_sous_abri', statut: 'excellent', icon: '🍅' },
      { key: 'haricots', type: 'legumineuses', actionKey: 'semis', statut: 'bon', icon: '🌱' },
      { key: 'mais', type: 'cereales', actionKey: 'semis', statut: 'bon', icon: '🌽' }
    ],
    4: [ // Mai
      { key: 'tomates', type: 'legumes', actionKey: 'transplantation', statut: 'excellent', icon: '🍅' },
      { key: 'courgettes', type: 'legumes', actionKey: 'plantation', statut: 'excellent', icon: '🥒' },
      { key: 'salades', type: 'legumes', actionKey: 'plantation', statut: 'excellent', icon: '🥬' }
    ],
    5: [ // Juin
      { key: 'mais', type: 'cereales', actionKey: 'croissance', statut: 'excellent', icon: '🌽' },
      { key: 'pommes_de_terre', type: 'legumes', actionKey: 'recolte_primeur', statut: 'bon', icon: '🥔' }
    ],
    6: [ // Juillet
      { key: 'tomates', type: 'legumes', actionKey: 'recolte', statut: 'excellent', icon: '🍅' },
      { key: 'haricots', type: 'legumineuses', actionKey: 'recolte', statut: 'excellent', icon: '🌱' }
    ],
    7: [ // Août
      { key: 'mais', type: 'cereales', actionKey: 'recolte', statut: 'excellent', icon: '🌽' }
    ],
    8: [ // Septembre
      { key: 'ble', type: 'cereales', actionKey: 'semis', statut: 'excellent', icon: '🌾' },
      { key: 'epinards', type: 'legumes', actionKey: 'semis', statut: 'bon', icon: '🥬' }
    ],
    9: [ // Octobre
      { key: 'ail', type: 'legumes', actionKey: 'plantation', statut: 'excellent', icon: '🧄' },
      { key: 'oignons', type: 'legumes', actionKey: 'plantation', statut: 'bon', icon: '🧅' }
    ],
    10: [ // Novembre
      { key: 'feves', type: 'legumineuses', actionKey: 'semis', statut: 'bon', icon: '🌱' }
    ],
    11: [] // Décembre - Repos hivernal
  },

  tropicale: {
    // Brésil, Inde, Indonésie, Nigeria – Saisons humides/sèches
    0: [
      { key: 'riz', type: 'cereales', actionKey: 'plantation', statut: 'excellent', icon: '🌾' },
      { key: 'manioc', type: 'legumes', actionKey: 'plantation', statut: 'excellent', icon: '🥔' },
      { key: 'banane', type: 'fruits', actionKey: 'croissance', statut: 'excellent', icon: '🍌' },
      { key: 'mais', type: 'cereales', actionKey: 'plantation', statut: 'bon', icon: '🌽' }
    ],
    1: [
      { key: 'riz', type: 'cereales', actionKey: 'croissance', statut: 'excellent', icon: '🌾' },
      { key: 'soja', type: 'legumineuses', actionKey: 'croissance', statut: 'excellent', icon: '🌱' }
    ],
    2: [
      { key: 'mais', type: 'cereales', actionKey: 'croissance', statut: 'excellent', icon: '🌽' },
      { key: 'cafe', type: 'fruits', actionKey: 'croissance', statut: 'bon', icon: '☕' }
    ],
    3: [
      { key: 'riz', type: 'cereales', actionKey: 'recolte', statut: 'excellent', icon: '🌾' },
      { key: 'canne_a_sucre', type: 'fruits', actionKey: 'croissance', statut: 'excellent', icon: '🌿' }
    ],
    4: [
      { key: 'soja', type: 'legumineuses', actionKey: 'plantation', statut: 'excellent', icon: '🌱' },
      { key: 'banane', type: 'fruits', actionKey: 'recolte', statut: 'excellent', icon: '🍌' }
    ],
    5: [
      { key: 'mais', type: 'cereales', actionKey: 'recolte', statut: 'excellent', icon: '🌽' }
    ],
    6: [
      { key: 'riz', type: 'cereales', actionKey: 'plantation', statut: 'bon', icon: '🌾' },
      { key: 'manioc', type: 'legumes', actionKey: 'recolte', statut: 'excellent', icon: '🥔' }
    ],
    7: [
      { key: 'soja', type: 'legumineuses', actionKey: 'recolte', statut: 'excellent', icon: '🌱' }
    ],
    8: [
      { key: 'cafe', type: 'fruits', actionKey: 'recolte', statut: 'excellent', icon: '☕' }
    ],
    9: [
      { key: 'riz', type: 'cereales', actionKey: 'croissance', statut: 'excellent', icon: '🌾' }
    ],
    10: [
      { key: 'canne_a_sucre', type: 'fruits', actionKey: 'recolte', statut: 'excellent', icon: '🌿' }
    ],
    11: [
      { key: 'banane', type: 'fruits', actionKey: 'croissance', statut: 'excellent', icon: '🍌' }
    ]
  },

  semiAride: {
    // Sahel, intérieur Maroc, Australie centrale – Cultures résistantes à la sécheresse
    0: [
      { key: 'ble', type: 'cereales', actionKey: 'croissance', statut: 'bon', icon: '🌾' },
      { key: 'pois_chiches', type: 'legumineuses', actionKey: 'croissance', statut: 'bon', icon: '🌱' }
    ],
    1: [],
    2: [
      { key: 'sorgho', type: 'cereales', actionKey: 'semis', statut: 'risque', icon: '🌾' },
      { key: 'mil', type: 'cereales', actionKey: 'semis', statut: 'bon', icon: '🌾' }
    ],
    3: [],
    4: [
      { key: 'arachides', type: 'legumineuses', actionKey: 'plantation', statut: 'bon', icon: '🥜' }
    ],
    5: [
      { key: 'sorgho', type: 'cereales', actionKey: 'croissance', statut: 'bon', icon: '🌾' }
    ],
    6: [
      { key: 'sorgho', type: 'cereales', actionKey: 'croissance', statut: 'risque', icon: '🌾' }
    ],
    7: [],
    8: [
      { key: 'ble', type: 'cereales', actionKey: 'preparation_sol', statut: 'bon', icon: '🌾' }
    ],
    9: [
      { key: 'ble', type: 'cereales', actionKey: 'semis', statut: 'excellent', icon: '🌾' }
    ],
    10: [],
    11: [
      { key: 'pois_chiches', type: 'legumineuses', actionKey: 'semis', statut: 'bon', icon: '🌱' }
    ]
  },

  aride: {
  // Déserts (Sahara, Arabie, Namibie) – Oasis uniquement
  // Cultures emblématiques : Dattes (palmier), Grenades (fruit), Figue de barbarie
  0: [ // Janvier
      { key: 'dattes', type: 'fruits', actionKey: 'croissance', statut: 'bon', icon: '🌴' },
      { key: 'grenades', type: 'fruits', actionKey: 'croissance', statut: 'bon', icon: '🥭' } 
  ],
  1: [  // Février
    { key: 'dattes', type: 'fruits', actionKey: 'croissance', statut: 'bon', icon: '🌴' },
    { key: 'figue_barbarie', type: 'fruits', actionKey: 'croissance', statut: 'excellent', icon: '🌵' }
  ],
  2: [  // Mars - Pollination
    { key: 'dattes', type: 'fruits', actionKey: 'pollinisation', statut: 'excellent', icon: '🌴' }
  ],
  3: [  // Avril
    { key: 'dattes', type: 'fruits', actionKey: 'developpement', statut: 'excellent', icon: '🌴' },
    { key: 'grenades', type: 'fruits', actionKey: 'developpement', statut: 'bon', icon: '🥭' }
  ],
  4: [  // Mai
    { key: 'dattes', type: 'fruits', actionKey: 'maturite', statut: 'excellent', icon: '🌴' }
  ],
  5: [  // Juin
    { key: 'dattes', type: 'fruits', actionKey: 'maturite', statut: 'excellent', icon: '🌴' },
    { key: 'figue_barbarie', type: 'fruits', actionKey: 'maturite', statut: 'bon', icon: '🌵' }
  ],
  6: [  // Juillet - Début récolte dattes
    { key: 'dattes', type: 'fruits', actionKey: 'recolte_debut', statut: 'excellent', icon: '🌴' }
  ],
  7: [  // Août - Pleine récolte dattes
    { key: 'dattes', type: 'fruits', actionKey: 'recolte', statut: 'excellent', icon: '🌴' },
    { key: 'grenades', type: 'fruits', actionKey: 'recolte', statut: 'excellent', icon: '🥭' }
  ],
  8: [  // Septembre
    { key: 'dattes', type: 'fruits', actionKey: 'recolte', statut: 'excellent', icon: '🌴' }
  ],
  9: [  // Octobre - Fin récolte dattes
    { key: 'dattes', type: 'fruits', actionKey: 'recolte_fin', statut: 'excellent', icon: '🌴' },
    { key: 'figue_barbarie', type: 'fruits', actionKey: 'recolte', statut: 'bon', icon: '🌵' }
  ],
  10: [ // Novembre
    { key: 'dattes', type: 'fruits', actionKey: 'entretien', statut: 'bon', icon: '🌴' },
    { key: 'grenades', type: 'fruits', actionKey: 'entretien', statut: 'bon', icon: '🥭' }
  ],
  11: [ // Décembre
    { key: 'dattes', type: 'fruits', actionKey: 'croissance', statut: 'bon', icon: '🌴' }
  ]
  }
};

// Fallback sécurisé
export const getCulturesForZone = (zone, mois) => {
  const cultures = culturesParZoneEtMois[zone]?.[mois];
  if (cultures && cultures.length > 0) return cultures;
  // Fallback vers méditerranéenne si zone inconnue ou mois vide
  return culturesParZoneEtMois.mediterraneenne?.[mois] || [];
};