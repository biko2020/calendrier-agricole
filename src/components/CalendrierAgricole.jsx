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
import { meteoMensuelle } from '../data/meteo'
import { categories } from '../data/categories'
import { culturesParMois } from '../data/cultures'
import { getStatutCouleur, getStatutTexte } from '../utils/statut'
import { useAutoLocation } from "../hooks/useAutoLocation"
import LocationSelector from './LocationSelector'
import { detectSeason } from '../hooks/useAutoLocation'


export default function CalendrierAgricole() {
  const { t, i18n } = useTranslation()
  const { location, loading, error } = useAutoLocation()

  const currentYear = new Date().getFullYear()

  const moisTraduits = useMemo(() => {
    const year = new Date().getFullYear()
    return Array.from({ length: 12 }, (_, i) =>
      new Intl.DateTimeFormat(i18n.language, { month: 'long' })
        .format(new Date(year, i, 1))
    )
  }, [i18n.language])

  const [moisSelectionne, setMoisSelectionne] = useState(11)
  const [categorieSelectionnee, setCategorieSelectionnee] = useState('tous')

  const [mode, setMode] = useState('auto')

const [manualLocation, setManualLocation] = useState({
  country: 'MA',
  zoneAgricole: 'mediterraneenne'
})

    const finalLocation =
      mode === 'auto'
        ? location
        : {
            country: manualLocation.country,
            region: t(`countries.${manualLocation.country}`),
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

  /* ===== Données ===== */
  const culturesFiltrees =
    (culturesParMois[moisSelectionne] || []).filter(
      c => categorieSelectionnee === 'tous' || c.type === categorieSelectionnee
    )

  const meteo = meteoMensuelle[moisSelectionne]

  /* ===== ZONE AUTO-DÉTECTÉE ===== */
  if (loading) {
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
              
              {/* ===== HEADER : localisation corrigée ===== */}
              {error ? (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mt-3">
                  <p className="font-semibold text-yellow-800 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {t('locationError')}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {t('defaultZone')} :
                    <strong> {t(`zones.${location?.zoneAgricole || 'mediterraneenne'}`)}</strong>
                  </p>
                </div>
              ) : (
                <div className="mt-3 bg-green-50 border border-green-200 p-4 rounded-xl">
                  <p className="text-gray-700 font-medium">
                    📍 {t('regionOf')} {location.region}, {location.country}
                  </p>

                  <p className="text-gray-800 mt-1">
                    🌱 {t('agriculturalZone')} :
                    <strong className="text-green-700">
                      {' '}{t(`zones.${location.zoneAgricole}`)}
                    </strong>
                  </p>

                  <p className="text-sm text-gray-600 mt-2">
                    🌡️ {t('temperature')} : {location.temperature ?? '—'}°C ·
                    💧 {t('precipitations')} : {location.pluie ?? '—'} mm/an

                  </p>
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

          {/* ================= METEO ================= */}
          {location && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">


              <div className="bg-orange-50 rounded-xl p-4 flex items-center gap-4">
                <Thermometer className="text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">
                    {t('temperature')}
                  </p>
                  <p className="font-bold text-lg">
                    {location.temperature ?? '—'}°C
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-4">
                <Droplets className="text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">
                    {t('precipitations')}
                  </p>
                  <p className="font-bold text-lg">
                    {location.pluie ?? '—'} mm/an
              
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-4 flex items-center gap-4">
                <Sun className="text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-600">
                    {t('sun')}
                  </p>
                  <p className="font-bold text-lg">
                    {location.ensoleillement ?? '—'}
                  </p>
                </div>
              </div>

              {/* ===== Section MÉTÉO : Saison traduite ===== */}
              <div className="bg-purple-50 rounded-xl p-4 flex items-center gap-4">
                <Cloud className="text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">
                    {t('seasons.title')}
                  </p>
                  <p className="font-bold text-lg">
                    {t(`seasons.${location.saison}`)}

                  </p>
                </div>
              </div>

            </div>
          )}
        </div>

        <LocationSelector
          mode={mode}
          setMode={setMode}
          manualLocation={manualLocation}
          setManualLocation={setManualLocation}
        />

        {/* ================= MOIS ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-semibold mb-4">
            {t('selectMonth')}
          </h2>

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

        {/* ================= CATEGORIES ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-semibold mb-4">
            {t('filterByCategory')}
          </h2>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategorieSelectionnee(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl
                  ${categorieSelectionnee === cat.id
                    ? 'bg-green-600 text-white'
                    : cat.couleur}
                `}
              >
                <span>{cat.icon}</span>
                <span>{t(`categories.${cat.id}`)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ================= CULTURES ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sprout className="text-green-600" />
            {t('culturesTitle')} – {moisTraduits[moisSelectionne]}
          </h2>

          {culturesFiltrees.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              <AlertCircle className="mx-auto mb-3" />
              {t('noCulture')}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {culturesFiltrees.map((c, i) => (
                <div key={i} className="border rounded-xl p-4 hover:shadow">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-bold text-lg">
                      {c.icon} {t(`cultures.${c.key}`)}
                    </h3>
                    <span
                      className={`w-3 h-3 rounded-full ${getStatutCouleur(c.statut)}`}
                    />
                  </div>

                  <p className="text-sm text-gray-600 mb-2">
                     {t(`cultures.${c.key}`)}
                  </p>

                  <p className="font-semibold">
                    {t(`actions.${c.actionKey}`)}
                  </p>
                  <p className="text-sm mt-1">
                    {t(`status.${c.statut}`)}
                  </p>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}