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
import { culturesParZoneEtMois } from '../data/cultures' // ← Import principal mis à jour
import { getStatutCouleur } from '../utils/statut'
import { useAutoLocation } from "../hooks/useAutoLocation"
import LocationSelector from './LocationSelector'
import { detectSeason } from '../hooks/useAutoLocation'

export default function CalendrierAgricole() {
  const { t, i18n } = useTranslation()
  const { location: autoLocation, loading, error } = useAutoLocation()

  const moisTraduits = useMemo(() => {
    const year = new Date().getFullYear()
    return Array.from({ length: 12 }, (_, i) =>
      new Intl.DateTimeFormat(i18n.language, { month: 'long' })
        .format(new Date(year, i, 1))
    )
  }, [i18n.language])

  const [moisSelectionne, setMoisSelectionne] = useState(new Date().getMonth())
  const [categorieSelectionnee, setCategorieSelectionnee] = useState('tous')
  const [mode, setMode] = useState('auto')

  const [manualLocation, setManualLocation] = useState({
    country: 'MA',
    zoneAgricole: 'mediterraneenne'
  })

  // Location finale : auto ou manuel
  const finalLocation = mode === 'auto'
    ? autoLocation
    : {
        country: manualLocation.country,
        region: t(`countries.${manualLocation.country.toLowerCase()}`),
        zoneAgricole: manualLocation.zoneAgricole,
        temperature: null,
        pluie: null,
        ensoleillement: null,
        saison: detectSeason()
      }

  /* ===== RTL pour l'arabe ===== */
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
  }, [i18n.language])

  /* ===== Cultures filtrées par zone et mois ===== */
  const culturesDisponibles = culturesParZoneEtMois[finalLocation.zoneAgricole]?.[moisSelectionne] || []
  
  const culturesFiltrees = culturesDisponibles.filter(
    c => categorieSelectionnee === 'tous' || c.type === categorieSelectionnee
  )

  /* ===== Écran de chargement ===== */
  if (loading && mode === 'auto') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">📍 Détection de la zone agricole...</p>
          <p className="text-sm text-gray-500 mt-2">Veuillez patienter</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Calendar className="text-green-600" />
                {t('title')}
              </h1>

              {/* ===== Localisation ===== */}
              {mode === 'auto' && error ? (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mt-3">
                  <p className="font-semibold text-yellow-800 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {t('locationError')}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {t('defaultZone')} : <strong>{t(`zones.${autoLocation?.zoneAgricole || 'mediterraneenne'}`)}</strong>
                  </p>
                </div>
              ) : (
                <div className="mt-3 bg-green-50 border border-green-200 p-4 rounded-xl">
                  <p className="text-gray-700 font-medium">
                    📍 {finalLocation.region && `${t('regionOf')} ${finalLocation.region}, `}{finalLocation.country}
                  </p>
                  <p className="text-gray-800 mt-1">
                    🌍 {t('agriculturalZone')} :
                    <strong className="text-green-700">
                      {' '}{t(`zones.${finalLocation.zoneAgricole}`)}
                    </strong>
                  </p>
                  {(finalLocation.temperature !== null || mode === 'auto') && (
                    <p className="text-sm text-gray-600 mt-2">
                      🌡️ {t('temperature')} : {finalLocation.temperature ?? '—'}°C {' · '}
                      💧 {t('precipitations')} : {finalLocation.pluie ?? '—'} mm/an
                    </p>
                  )}
                </div>
              )}
            </div>

            <LanguageSwitcher
              lang={i18n.language}
              setLang={lng => i18n.changeLanguage(lng)}
            />

            <div className="text-right">
              <p className="text-sm text-gray-400">{t('today')}</p>
              <p className="text-lg font-semibold">
                {new Date().toLocaleDateString(
                  i18n.language === 'ar' ? 'ar-MA' : i18n.language
                )}
              </p>
            </div>
          </div>

          {/* ================= MÉTÉO CLIMATIQUE (seulement si données disponibles) ================= */}
          {finalLocation.temperature !== null && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
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

        {/* ================= SÉLECTEUR AUTO / MANUEL ================= */}
        <LocationSelector
          mode={mode}
          setMode={setMode}
          manualLocation={manualLocation}
          setManualLocation={setManualLocation}
        />

        {/* ================= SÉLECTION DU MOIS ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-semibold mb-4">{t('selectMonth')}</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {moisTraduits.map((nom, index) => (
              <button
                key={index}
                onClick={() => setMoisSelectionne(index)}
                className={`py-2 rounded-lg font-medium transition ${
                  moisSelectionne === index
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {nom}
              </button>
            ))}
          </div>
        </div>

        {/* ================= FILTRE PAR CATÉGORIE ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-semibold mb-4">{t('filterByCategory')}</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategorieSelectionnee('tous')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                categorieSelectionnee === 'tous'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100'
              }`}
            >
              🌾 {t('categories.tous')}
            </button>
            {categories.filter(cat => cat.id !== 'tous').map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategorieSelectionnee(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                  categorieSelectionnee === cat.id
                    ? 'bg-green-600 text-white'
                    : cat.couleur
                }`}
              >
                <span>{cat.icon}</span>
                <span>{t(`categories.${cat.id}`)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ================= LISTE DES CULTURES ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sprout className="text-green-600" />
            {t('culturesTitle')} – {moisTraduits[moisSelectionne]}
            <span className="text-sm font-normal text-gray-600 ml-2">
              ({t(`zones.${finalLocation.zoneAgricole}`)})
            </span>
          </h2>

          {culturesFiltrees.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              <AlertCircle className="mx-auto mb-3 w-12 h-12" />
              <p className="text-lg">{t('noCulture')}</p>
              <p className="text-sm mt-2">
                Aucune culture recommandée pour ce mois dans la zone {t(`zones.${finalLocation.zoneAgricole}`)}.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {culturesFiltrees.map((culture, i) => (
                <div key={i} className="border rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg">
                      {culture.icon} {t(`${culture.key}`)}
                    </h3>
                    <span className={`w-4 h-4 rounded-full ${getStatutCouleur(culture.statut)}`} />
                  </div>

                  <p className="text-sm text-gray-600 mb-3">
                    {t(`${culture.key}_desc`)} {/* Optionnel : description détaillée */}
                  </p>

                  <div className="space-y-1">
                    <p className="font-semibold text-green-700">
                      {t(`actions.${culture.actionKey}`)}
                    </p>
                    <p className="text-sm text-gray-700">
                      {t(`status.${culture.statut}`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}