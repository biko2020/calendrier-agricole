export const culturesParZoneEtMois = {
  mediterraneenne: { // Ex: Maroc (Casablanca-Settat), Italie du Sud, Californie, Chili central – Hivers doux/pluvieux, étés chauds/secs
    0: [ // Janvier
      { key: 'orge', type: 'cereales', actionKey: 'croissance', statut: 'excellent', icon: '🌾' },
      { key: 'ble', type: 'cereales', actionKey: 'croissance', statut: 'excellent', icon: '🌾' },
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
      { key: 'pasteque', type: 'fruits', actionKey: 'recolte', statut: 'excellent', icon: '🍉' }
    ],
    8: [ // Septembre
      { key: 'ble', type: 'cereales', actionKey: 'preparation_sol', statut: 'bon', icon: '🌾' },
      { key: 'orge', type: 'cereales', actionKey: 'preparation_sol', statut: 'bon', icon: '🌾' }
    ],
    9: [ // Octobre
      { key: 'ble', type: 'cereales', actionKey: 'semis', statut: 'excellent', icon: '🌱' },
      { key: 'orge', type: 'cereales', actionKey: 'semis', statut: 'excellent', icon: '🌱' },
      { key: 'feves', type: 'legumineuses', actionKey: 'semis', statut: 'excellent', icon: '🌱' }
    ],
    10: [ // Novembre
      { key: 'pois_chiches', type: 'legumineuses', actionKey: 'plantation', statut: 'bon', icon: '🌱' },
      { key: 'epinards', type: 'legumes', actionKey: 'plantation', statut: 'excellent', icon: '🥬' }
    ],
    11: [ // Décembre
      { key: 'ble', type: 'cereales', actionKey: 'croissance', statut: 'excellent', icon: '🌿' },
      { key: 'orge', type: 'cereales', actionKey: 'croissance', statut: 'excellent', icon: '🌿' },
      { key: 'laitue', type: 'legumes', actionKey: 'plantation', statut: 'excellent', icon: '🥬' }
    ]
  },
  temperee: { // Ex: France, Europe centrale, USA Midwest – Saisons marquées, hivers froids
    0: [ // Janvier - Repos hivernal
      { key: 'ail', type: 'legumes', actionKey: 'plantation', statut: 'bon', icon: '🧄' }
    ],
    1: [ // Février
      { key: 'oignons', type: 'legumes', actionKey: 'semis', statut: 'bon', icon: '🧅' },
      { key: 'echalotes', type: 'legumes', actionKey: 'plantation', statut: 'excellent', icon: '🧅' }
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
      { key: 'haricots', type: 'legumes', actionKey: 'recolte', statut: 'excellent', icon: '🌱' }
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
    10: [ // Novembre - Préparation hiver
      { key: 'feves', type: 'legumineuses', actionKey: 'semis', statut: 'bon', icon: '🌱' }
    ],
    11: [ // Décembre - Repos
      // Peu d'activités, protection des cultures persistantes
    ]
  },
  tropicale: { // Ex: Brésil, Inde, Afrique centrale – Culture presque toute l'année, saisons humides/sèches
    0: [ // Janvier (saison humide dans beaucoup de zones)
      { key: 'riz', type: 'cereales', actionKey: 'plantation', statut: 'excellent', icon: '🌾' },
      { key: 'manioc', type: 'legumes', actionKey: 'plantation', statut: 'excellent', icon: '🥔' },
      { key: 'banane', type: 'fruits', actionKey: 'croissance', statut: 'excellent', icon: '🍌' },
      { key: 'mais', type: 'cereales', actionKey: 'plantation', statut: 'bon', icon: '🌽' }
    ],
    1: [
      { key: 'riz', type: 'cereales', actionKey: 'croissance', statut: 'excellent', icon: '🌾' },
      { key: 'soja', type: 'legumineuses', actionKey: 'croissance', statut: 'bon', icon: '🌱' }
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
      { key: 'cafe', type: 'fruits', actionKey: 'recolte', statut: 'bon', icon: '☕' }
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
  semiAride: { // Ex: Zones intérieures Maroc, Sahel – Irrigation essentielle, cultures résistantes
    0: [ // Janvier - Saison fraîche
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
    6: [ // Juillet - Chaud/sec
      { key: 'sorgho', type: 'cereales', actionKey: 'croissance', statut: 'risque', icon: '🌾' }
    ],
    7: [],
    8: [
      { key: 'ble', type: 'cereales', actionKey: 'preparation_sol', statut: 'bon', icon: '🌾' }
    ],
    9: [
      { key: 'ble', type: 'cereales', actionKey: 'semis', statut: 'excellent', icon: '🌱' }
    ],
    10: [],
    11: [
      { key: 'pois_chiches', type: 'legumineuses', actionKey: 'semis', statut: 'bon', icon: '🌱' }
    ]
  },
  aride: { // Ex: Sahara, oasis – Très limité, dépendant de l'irrigation (oasis)
    0: [ // Croissance palmier toute l'année
      { key: 'dattes', type: 'fruits', actionKey: 'croissance', statut: 'bon', icon: '🌴' },
      { key: 'grenadier', type: 'fruits', actionKey: 'croissance', statut: 'bon', icon: '🍈' }
    ],
    1: [
      { key: 'dattes', type: 'fruits', actionKey: 'croissance', statut: 'bon', icon: '🌴' }
    ],
    2: [
      { key: 'dattes', type: 'fruits', actionKey: 'pollinisation', statut: 'excellent', icon: '🌴' }
    ],
    3: [
      { key: 'dattes', type: 'fruits', actionKey: 'developpement', statut: 'excellent', icon: '🌴' }
    ],
    4: [
      { key: 'dattes', type: 'fruits', actionKey: 'maturite', statut: 'excellent', icon: '🌴' }
    ],
    5: [
      { key: 'dattes', type: 'fruits', actionKey: 'maturite', statut: 'excellent', icon: '🌴' }
    ],
    6: [
      { key: 'dattes', type: 'fruits', actionKey: 'recolte_debut', statut: 'bon', icon: '🌴' }
    ],
    7: [
      { key: 'dattes', type: 'fruits', actionKey: 'recolte', statut: 'excellent', icon: '🌴' }
    ],
    8: [
      { key: 'dattes', type: 'fruits', actionKey: 'recolte', statut: 'excellent', icon: '🌴' }
    ],
    9: [
      { key: 'dattes', type: 'fruits', actionKey: 'recolte_fin', statut: 'excellent', icon: '🌴' }
    ],
    10: [
      { key: 'dattes', type: 'fruits', actionKey: 'entretien', statut: 'bon', icon: '🌴' }
    ],
    11: [
      { key: 'dattes', type: 'fruits', actionKey: 'croissance', statut: 'bon', icon: '🌴' }
    ]
  }
};

// Fallback : si la zone n'est pas définie ou inconnue, on utilise la zone méditerranéenne par défaut
export const getCulturesForZone = (zone, mois) => {
  return culturesParZoneEtMois[zone]?.[mois] || culturesParZoneEtMois.mediterraneenne[mois] || [];
};