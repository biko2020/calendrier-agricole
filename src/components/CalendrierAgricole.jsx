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

export default function CalendrierAgricole() {
  const { t, i18n } = useTranslation()

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

  /* ===== RTL pour l’arabe ===== */
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
  }, [i18n.language])

  /* ===== Données ===== */
  const culturesFiltrees =
    (culturesParMois[moisSelectionne] || []).filter(
      c => categorieSelectionnee === 'tous' || c.type === categorieSelectionnee
    )

  const meteo = meteoMensuelle[moisSelectionne]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">

            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Calendar className="text-green-600" />
                {t('title')}
              </h1>
              <p className="text-gray-600">{t('region')}</p>
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
          {meteo && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

              <div className="bg-orange-50 rounded-xl p-4 flex items-center gap-4">
                <Thermometer className="text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">
                    {t('temperature')}
                  </p>
                  <p className="font-bold text-lg">
                    {meteo.temperature ?? '—'}
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
                    {meteo.precipitations ?? '—'}
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
                    {meteo.ensoleillement ?? '—'}
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 flex items-center gap-4">
                <Cloud className="text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">
                    {t('season')}
                  </p>
                  <p className="font-bold text-lg">
                    {meteo.saison}
                  </p>
                </div>
              </div>

            </div>
          )}
        </div>

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
            {t('categories')}
          </h2>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategorieSelectionnee(cat.id)}
                className={`px-4 py-2 rounded-xl ${
                  categorieSelectionnee === cat.id
                    ? 'bg-green-600 text-white'
                    : cat.couleur
                }`}
              >
                {cat.icon} {t(`${cat.id}`)}

              </button>
            ))}
          </div>
        </div>

        {/* ================= CULTURES ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sprout className="text-green-600" />
            {t('cultures')} – {moisTraduits[moisSelectionne]}
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
