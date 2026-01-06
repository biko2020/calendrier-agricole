import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import L from 'leaflet'

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

  useEffect(() => {
    fetch('/world-countries.geojson')
      .then(res => res.json())
      .then(data => {
        console.log('GeoJSON chargé avec succès')
        setGeoData(data)
        setLoading(false)
      })
      .catch(err => console.error('Erreur chargement GeoJSON', err))
  }, [])

  // Fonction ultra-robuste pour trouver le code pays
  const getCountryCode = (props) => {
    // Liste exhaustive des propriétés possibles dans les GeoJSON Natural Earth / datasets
    const candidates = [
      props.iso_a2, props.ISO_A2, props.iso_a3?.slice(0,2), props.ISO_A3?.slice(0,2),
      props.ADMIN?.slice(0,2), props.name?.slice(0,2),
      props.code, props.CODE, props.ID, props.id
    ]

    for (const candidate of candidates) {
      if (candidate && candidate !== '-99' && candidate.length === 2) {
        return candidate.toUpperCase()
      }
    }
    return null
  }

  const getZoneColor = (zone) => ({
    mediterraneenne: '#f59e0b',
    temperee: '#10b981',
    tropicale: '#22c55e',
    semiAride: '#eab308',
    aride: '#ef4444',
    subtropicale: '#3b82f6',
    continentale: '#6366f1',
    equatoriale: '#16a34a',
  }[zone] || '#9ca3af')

  const countryStyle = (feature) => {
    const code = getCountryCode(feature.properties)
    const country = COUNTRIES.find(c => c.code === code)
    const zone = country?.zones[0] || 'unknown'

    return {
      fillColor: getZoneColor(zone),
      weight: 2,
      color: 'white',
      fillOpacity: 0.75,
      interactive: true, // Important pour les clics
    }
  }

  const onEachFeature = (feature, layer) => {
    const props = feature.properties
    const code = getCountryCode(props)
    const name = props.NAME || props.name || props.ADMIN || props.admin || 'Pays inconnu'

    const country = COUNTRIES.find(c => c.code === code)
    if (!country) return

    const zone = country.zones[0]

    layer.on({
      mouseover: (e) => e.target.setStyle({ weight: 5, color: '#000', fillOpacity: 0.9 }),
      mouseout: (e) => layer.resetStyle(e.target),
      click: () => {
        layer.bindPopup(`
          <div style="text-align:center;padding:12px;font-family:system-ui;">
            <strong>${name}</strong><br>
            <span style="color:#16a34a;font-weight:600;">🌱 Zone : ${zone}</span>
          </div>
        `).openPopup()

        onZoneSelect({
          country: code,
          zoneAgricole: zone
        })
      }
    })
  }

  if (loading) return <div className="h-96 bg-gray-100 rounded-2xl flex items-center justify-center"><p>Chargement de la carte...</p></div>

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 my-8">
      <h2 className="text-2xl font-bold text-center mb-4">🗺️ Carte Agricole Mondiale Interactive</h2>
      <p className="text-center text-gray-600 mb-6">Cliquez sur un pays pour voir les cultures adaptées</p>

      <div className="h-96 md:h-[600px] rounded-xl overflow-hidden">
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <GeoJSON data={geoData} style={countryStyle} onEachFeature={onEachFeature} />
        </MapContainer>
      </div>
    </div>
  )
}