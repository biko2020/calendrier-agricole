import { useState, useEffect, useMemo } from 'react'
import {
  Calendar,
  Droplets,
  Thermometer,
  Sun,
  Cloud,
  Sprout,
  AlertCircle
} from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from 'react-i18next'
import { categories } from '../data/categories'
import { culturesParZoneEtMois } from '../data/cultures'
import { getStatutCouleur } from '../utils/statut'
import { useAutoLocation } from "../hooks/useAutoLocation"
import LocationSelector from './LocationSelector'
import { detectSeason } from '../hooks/useAutoLocation'
import WorldMap from './WorldMap'

export default function CalendrierAgricole() {
  const { t, i18n } = useTranslation()
  const { location: autoLocation, loading, error } = useAutoLocation()

  // Mois traduits (ex: janvier, février...)
  const moisTraduits = useMemo(() => {
    const year = new Date().getFullYear()
    return Array.from({ length: 12 }, (_, i) =>
      new Intl.DateTimeFormat(i18n.language, { month: 'long' }).format(new Date(year, i, 1))
    )
  }, [i18n.language])

  const [moisSelectionne, setMoisSelectionne] = useState(new Date().getMonth())
  const [categorieSelectionnee, setCategorieSelectionnee] = useState('tous')
  const [mode, setMode] = useState('auto')
  const [manualLocation, setManualLocation] = useState({
    country: 'MA',
    zoneAgricole: 'mediterraneenne'
  })

  // Location finale (auto ou manuel)
  const finalLocation = mode === 'auto'
    ? autoLocation
    : {
      country: manualLocation.country || 'MA',
      region: manualLocation.country ? t(`countries.${manualLocation.country.toLowerCase()}`, { defaultValue: '' }) : '',
      zoneAgricole: manualLocation.zoneAgricole || 'mediterraneenne',
      temperature: null,
      pluie: null,
      ensoleillement: null,
      saison: detectSeason()
    }

  // RTL pour arabe
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  // Cultures du mois et zone actuels
  const culturesDisponibles = culturesParZoneEtMois[finalLocation.zoneAgricole]?.[moisSelectionne] || []
  const culturesFiltrees = culturesDisponibles.filter(
    c => categorieSelectionnee === 'tous' || c.type === categorieSelectionnee
  )

  // Fonction sécurisée pour traduire les zones (évite "zones.semiAride")
  const getZoneTraduite = (zoneKey) => {
    const traduction = t(`zones.${zoneKey}`)
    return traduction.startsWith('zones.') ? zoneKey : traduction
  }

  // Chargement auto
  if (loading && mode === 'auto') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">📍 {t('detectingLocation')}</p>
          <p className="text-sm text-gray-500 mt-2">{t('pleaseWait')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold flex items-center gap-3 mb-4">
                <Calendar className="text-green-600" />
                {t('title')}
              </h1>

              {/* Message d'erreur ou info localisation */}
              {mode === 'auto' && error ? (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
                  <p className="font-semibold text-yellow-800 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {t('locationError')}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {t('defaultZone')} : <strong>{getZoneTraduite(autoLocation?.zoneAgricole || 'mediterraneenne')}</strong>
                  </p>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
                  <p className="text-gray-700 font-medium">
                    📍 {finalLocation.region ? `${t('regionOf')} ${finalLocation.region}, ` : ''}{finalLocation.country}
                  </p>
                  <p className="text-gray-800 mt-1">
                    🌍 {t('agriculturalZone')} :
                    <strong className="text-green-700"> {getZoneTraduite(finalLocation.zoneAgricole)}</strong>
                  </p>

                </div>
              )}
            </div>

            <div className="flex flex-col items-end gap-4">
              <LanguageSwitcher
                lang={i18n.language}
                setLang={(lng) => i18n.changeLanguage(lng)}
              />
              <div className="text-right">
                <p className="text-sm text-gray-500">{t('today')}</p>
                <p className="text-lg font-semibold">
                  {new Date().toLocaleDateString(i18n.language === 'ar' ? 'ar-MA' : i18n.language)}
                </p>
              </div>
            </div>
          </div>

          {/* Cartes météo */}
          {finalLocation.temperature !== null && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="bg-orange-50 rounded-xl p-4 flex items-center gap-4">
                <Thermometer className="text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">{t('temperature')}</p>
                  <p className="font-bold text-lg">{finalLocation.temperature}°C</p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-4">
                <Droplets className="text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">{t('precipitations')}</p>
                  <p className="font-bold text-lg">{finalLocation.pluie} mm/an</p>
                </div>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 flex items-center gap-4">
                <Sun className="text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-600">{t('sun')}</p>
                  <p className="font-bold text-lg">{finalLocation.ensoleillement ?? '—'} h/jour</p>
                </div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 flex items-center gap-4">
                <Cloud className="text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">{t('seasons.title')}</p>
                  <p className="font-bold text-lg">{t(`seasons.${finalLocation.saison}`)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sélecteur Auto / Manuel */}
        <LocationSelector
          mode={mode}
          setMode={setMode}
          manualLocation={manualLocation}
          setManualLocation={setManualLocation}
        />

        {/* Sélecteur carte countries geolocalisation */}

        <WorldMap
          onZoneSelect={(data) => {
            console.log('ZONE SELECTED:', data)

            setManualLocation({
              country: data.country,
              zoneAgricole: data.zoneAgricole
            })

            setMode('manual')
          }}
        />


        {/* Sélection du mois */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-semibold mb-4">{t('selectMonth')}</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {moisTraduits.map((nom, index) => (
              <button
                key={index}
                onClick={() => setMoisSelectionne(index)}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${moisSelectionne === index
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200'
                  }`}
              >
                {nom}
              </button>
            ))}
          </div>
        </div>

        {/* Filtre par catégorie */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-semibold mb-4">{t('filterByCategory')}</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setCategorieSelectionnee('tous')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${categorieSelectionnee === 'tous'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-100 hover:bg-gray-200'
                }`}
            >
              🌾 {t('categories.tous')}
            </button>
            {categories.filter(cat => cat.id !== 'tous').map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategorieSelectionnee(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${categorieSelectionnee === cat.id
                    ? 'bg-green-600 text-white shadow-md'
                    : cat.couleur + ' hover:opacity-80'
                  }`}
              >
                <span>{cat.icon}</span>
                <span>{t(`categories.${cat.id}`)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Liste des cultures */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Sprout className="text-green-600" />
            {t('culturesTitle')} – {moisTraduits[moisSelectionne]}
            <span className="text-lg font-normal text-gray-600">
              ({getZoneTraduite(finalLocation.zoneAgricole)})
            </span>
          </h2>

          {culturesFiltrees.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="mx-auto mb-4 w-16 h-16 text-gray-400" />
              <p className="text-xl text-gray-600">{t('noCulture')}</p>
              <p className="text-md text-gray-500 mt-2">
                Aucune culture recommandée ce mois-ci dans la zone {getZoneTraduite(finalLocation.zoneAgricole)}.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {culturesFiltrees.map((culture, i) => {
                const desc = t(`cultures.${culture.key}_desc`, { defaultValue: '' })
                return (
                  <div key={i} className="border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-green-50">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-800">
                        {culture.icon} {t(`cultures.${culture.key}`)}
                      </h3>
                      <span className={`w-5 h-5 rounded-full ${getStatutCouleur(culture.statut)}`} />
                    </div>

                    {desc && (
                      <p className="text-sm text-gray-600 mb-4 italic">
                        {desc}
                      </p>
                    )}

                    <div className="mt-4 space-y-2">
                      <p className="font-semibold text-green-700 text-lg">
                        {t(`actions.${culture.actionKey}`)}
                      </p>
                      <p className="text-sm text-gray-700 bg-gray-100 inline-block px-3 py-1 rounded-full">
                        {t(`status.${culture.statut}`)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}