import { useState } from 'react'
import {
  Calendar,
  Droplets,
  Thermometer,
  Sun,
  Cloud,
  Sprout,
  AlertCircle
} from 'lucide-react'

import { mois } from '../data/mois'
import { meteoMensuelle } from '../data/meteo'
import { categories } from '../data/categories'
import { culturesParMois } from '../data/cultures'
import { getStatutCouleur, getStatutTexte } from '../utils/statut'

export default function CalendrierAgricole() {
  const [moisSelectionne, setMoisSelectionne] = useState(11)
  const [categorieSelectionnee, setCategorieSelectionnee] = useState('tous')

  // ✅ protection anti-crash
  const culturesFiltrees =
    (culturesParMois[moisSelectionne] || [])
      .filter(c =>
        categorieSelectionnee === 'tous' || c.type === categorieSelectionnee
      )
  const meteo = meteoMensuelle[moisSelectionne]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* En-tête */}
        {/* En-tête */}
<div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
  <div className="flex justify-between items-start">
    <div>
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <Calendar className="text-green-600" />
        Calendrier Agricole
      </h1>
      <p className="text-gray-600">
        Région Casablanca-Settat – Maroc
      </p>
    </div>

    <div className="text-right">
      <p className="text-sm text-gray-400">Aujourd’hui</p>
      <p className="text-lg font-semibold">
        {new Date().toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })}
      </p>
    </div>
  </div>

{/* METEO À L’EXTÉRIEUR ✅ */}


        {/* Section Meteo */}
          {meteo && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">

              <div className="bg-orange-50 rounded-xl p-4 flex items-center gap-4">
                <Thermometer className="text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">Température</p>
                  <p className="font-bold text-lg">
                    {meteo.temperature ?? '—'}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-4">
                <Droplets className="text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Précipitations</p>
                  <p className="font-bold text-lg">
                    {meteo.precipitations ?? '—'}
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-4 flex items-center gap-4">
                <Sun className="text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-600">Ensoleillement</p>
                  <p className="font-bold text-lg">
                    {meteo.ensoleillement ?? '—'}
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 flex items-center gap-4">
                <Cloud className="text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Saison</p>
                  <p className="font-bold text-lg">
                    {meteo.saison}
                  </p>
                </div>
              </div>

            </div>
          )}


        </div>

        {/* Sélecteur de mois */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="font-semibold mb-4">Sélectionner un mois</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {mois.map((nom, index) => (
              <button
                key={index}
                onClick={() => setMoisSelectionne(index)}
                className={`py-2 rounded-lg font-medium ${
                  moisSelectionne === index
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100'
                }`}
              >
                {nom}
              </button>
            ))}
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="font-semibold mb-4">Catégories</h2>
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
                {cat.icon} {cat.nom}
              </button>
            ))}
          </div>
        </div>

        {/* Liste cultures */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sprout className="text-green-600" />
            Cultures – {mois[moisSelectionne]}
          </h2>

          {culturesFiltrees.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              <AlertCircle className="mx-auto mb-3" />
              Aucune culture pour cette catégorie
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {culturesFiltrees.map((c, i) => (
                <div
                  key={i}
                  className="border rounded-xl p-4 hover:shadow"
                >
                  <div className="flex justify-between mb-2">
                    <h3 className="font-bold text-lg">
                      {c.icon} {c.nom}
                    </h3>
                    <span
                      className={`w-3 h-3 rounded-full ${getStatutCouleur(c.statut)}`}
                    />
                  </div>

                  <p className="text-sm text-gray-600 mb-2">
                    {c.nomAr}
                  </p>

                  <p className="font-semibold">{c.action}</p>
                  <p className="text-sm mt-1">
                    {getStatutTexte(c.statut)}
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
