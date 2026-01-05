// src/components/WorldMap.jsx
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import L from 'leaflet'

// Correction des icônes Leaflet (obligatoire avec Vite)
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: icon,
  iconUrl: icon,
  shadowUrl: iconShadow
})

import 'leaflet/dist/leaflet.css'
import { COUNTRIES } from '../data/zones'

export default function WorldMap({ onZoneSelect }) {
  const [geoData, setGeoData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/world-countries.geojson')
      .then(response => {
        if (!response.ok) throw new Error(`Erreur ${response.status}`)
        return response.json()
      })
      .then(data => {
        setGeoData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError('Impossible de charger la carte mondiale')
        setLoading(false)
      })
  }, [])

  const getZoneColor = (zone) => {
    const colors = {
      mediterraneenne: '#f59e0b',
      temperee: '#10b981',
      tropicale: '#22c55e',
      semiAride: '#eab308',
      aride: '#ef4444',
      subtropicale: '#3b82f6',
      continentale: '#6366f1',
      equatoriale: '#16a34a',
    }
    return colors[zone] || '#9ca3af'
  }

  const countryStyle = (feature) => {
    const code = feature.properties.ISO_A2 || feature.properties.iso_a2 || feature.properties.ADM0_A3
    const country = COUNTRIES.find(c => c.code === code)
    const zone = country?.zones[0] || 'unknown'

    return {
      fillColor: getZoneColor(zone),
      weight: 1.5,
      color: 'white',
      fillOpacity: 0.7,
    }
  }

  const onEachFeature = (feature, layer) => {
    const code = feature.properties.ISO_A2 || feature.properties.iso_a2 || feature.properties.ADM0_A3
    const country = COUNTRIES.find(c => c.code === code)
    const name = feature.properties.NAME || feature.properties.NAME_EN || 'Pays inconnu'

    if (country && country.zones.length > 0) {
      const zone = country.zones[0]

      layer.on({
        mouseover: (e) => {
          e.target.setStyle({ weight: 4, color: '#000', fillOpacity: 0.9 })
          e.target.bringToFront()
        },
        mouseout: (e) => {
          e.target.resetStyle()
        },
        click: () => {
          layer.bindPopup(`
            <div style="text-align:center;padding:12px;font-family:system-ui;">
              <strong style="font-size:1.2em;">${name}</strong><br>
              <span style="color:#16a34a;font-weight:600;">Zone : ${zone}</span>
            </div>
          `).openPopup()

          onZoneSelect({
            country: country.code,
            zoneAgricole: zone
          })
        }
      })
    }
  }

  if (loading) {
    return (
      <div className="h-96 bg-gray-100 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de la carte mondiale...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-96 bg-red-50 rounded-2xl flex items-center justify-center">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 my-8">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        🗺️ Carte Agricole Mondiale Interactive
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Cliquez sur un pays pour voir les cultures adaptées à sa zone climatique
      </p>

      <div className="h-96 md:h-[600px] rounded-xl overflow-hidden shadow-2xl">
        <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON data={geoData} style={countryStyle} onEachFeature={onEachFeature} />
        </MapContainer>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-sm">
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded bg-amber-500"></div>
          Méditerranéenne
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded bg-emerald-500"></div>
          Tempérée
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded bg-green-500"></div>
          Tropicale
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded bg-yellow-500"></div>
          Semi-aride
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded bg-red-500"></div>
          Aride
        </div>
      </div>
    </div>
  )
}