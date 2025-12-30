export const COUNTRIES = [
  {
    code: 'MA',
    nameKey: 'countries.ma',
    zones: ['mediterraneenne', 'semiAride', 'aride']
  },
  {
    code: 'FR',
    nameKey: 'countries.fr',
    zones: ['temperee', 'mediterraneenne']
  }
]

export const ZONES = {
  mediterraneenne: 'zones.mediterraneenne',
  semiAride: 'zones.semiAride',
  aride: 'zones.aride',
  temperee: 'zones.temperee'
}

// Fonction helper pour obtenir le nom traduit d'une zone
export function getZoneName(zoneKey, t) {
  return ZONES[zoneKey] ? t(ZONES[zoneKey]) : zoneKey
}

// Fonction helper pour obtenir les zones d'un pays
export function getCountryZones(countryCode) {
  const country = COUNTRIES.find(c => c.code === countryCode)
  return country ? country.zones : []
}