import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import {
  ZONE_COLORS,
  ZONE_NAMES,
  getCountryByCode,
} from '../data/zones'

/* ===================== UTILS ===================== */

const getCountryFromFeature = (feature) => {
  const iso = feature.id
  if (!iso) return null
  return getCountryByCode(iso)
}

/* ===================== STYLES ===================== */

const countryStyle = (feature) => {
  const country = getCountryFromFeature(feature)

  return {
    fillColor: country
      ? ZONE_COLORS[country.zones[0]]
      : '#e5e7eb',
    weight: 1,
    color: '#fff',
    fillOpacity: 0.6,
  }
}

const regionStyle = (feature) => ({
  fillColor: ZONE_COLORS[feature.properties.zone] || '#999',
  weight: 2,
  color: '#ffffff',
  fillOpacity: 0.7,
})

const regionHoverStyle = {
  weight: 3,
  color: '#2563eb',
  fillOpacity: 0.85,
}

/* ===================== FIT BOUNDS ===================== */

function FitBounds({ geo }) {
  const map = useMap()

  useEffect(() => {
    if (!geo) return
    const layer = L.geoJSON(geo)
    map.fitBounds(layer.getBounds(), { padding: [20, 20] })
  }, [geo, map])

  return null
}

/* ===================== COMPONENT ===================== */

export default function WorldMap({ onZoneSelect }) {
  const [worldGeo, setWorldGeo] = useState(null)
  const [regionsGeo, setRegionsGeo] = useState(null)
  const [currentCountry, setCurrentCountry] = useState(null)

  useEffect(() => {
    fetch('/world-countries.geojson')
      .then(r => r.json())
      .then(setWorldGeo)
  }, [])

  const loadRegions = async (country) => {
    const res = await fetch(country.adm1GeoJsonUrl)
    const data = await res.json()

    console.log('REGIONS AGRICOLES CHARGÉES:', data)
    setRegionsGeo(data)
  }

  const onEachCountry = (feature, layer) => {
    const country = getCountryFromFeature(feature)
    if (!country) return

    layer.on({
      click: () => {
        setCurrentCountry(country)
        loadRegions(country)
      },
      mouseover: (e) => {
        const layer = e.target
        layer.setStyle({
          weight: 2,
          color: '#2563eb',
          fillOpacity: 0.8
        })
      },
      mouseout: (e) => {
        const layer = e.target
        layer.setStyle(countryStyle(feature))
      }
    })

    layer.bindTooltip(country.name, { sticky: true })
  }

  const onEachRegion = (feature, layer) => {
    const props = feature.properties
    const zone = props.zone || 'mediterraneenne'
    const name = props.name || 'Région agricole'

    // Créer le contenu du popup avec données agricoles détaillées
    const popupContent = `
      <div style="font-family: system-ui; min-width: 280px; max-width: 320px;">
        <div style="background: linear-gradient(135deg, ${ZONE_COLORS[zone]}dd, ${ZONE_COLORS[zone]}); padding: 12px; margin: -12px -12px 12px -12px; border-radius: 8px 8px 0 0;">
          <h3 style="margin: 0; color: white; font-size: 17px; font-weight: bold; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">
            🌾 ${name}
          </h3>
          <p style="margin: 4px 0 0 0; color: rgba(255,255,255,0.95); font-size: 12px; font-weight: 500;">
            Zone ${ZONE_NAMES[zone] || zone}
          </p>
        </div>

        <div style="padding: 0 4px;">
          <!-- Cultures principales -->
          <div style="background: #f0fdf4; border-left: 3px solid #10b981; padding: 8px; margin-bottom: 8px; border-radius: 4px;">
            <p style="margin: 0; color: #065f46; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
              🌱 Cultures principales
            </p>
            <p style="margin: 4px 0 0 0; color: #047857; font-size: 13px; font-weight: 500; line-height: 1.4;">
              ${props.cultures_principales || 'Non spécifié'}
            </p>
          </div>

          <!-- Statistiques agricoles -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 10px;">
            <div style="background: #eff6ff; padding: 6px 8px; border-radius: 6px;">
              <p style="margin: 0; color: #1e40af; font-size: 10px; font-weight: 600;">📏 Superficie</p>
              <p style="margin: 2px 0 0 0; color: #1e3a8a; font-size: 12px; font-weight: bold;">
                ${props.superficie_agricole || 'N/A'}
              </p>
            </div>
            <div style="background: #fef3c7; padding: 6px 8px; border-radius: 6px;">
              <p style="margin: 0; color: #92400e; font-size: 10px; font-weight: 600;">📊 Production</p>
              <p style="margin: 2px 0 0 0; color: #78350f; font-size: 12px; font-weight: bold;">
                ${props.production_annuelle || 'N/A'}
              </p>
            </div>
          </div>

          <!-- Irrigation et précipitations -->
          <div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 8px; border-radius: 6px; margin-bottom: 10px;">
            <div style="margin-bottom: 6px;">
              <p style="margin: 0; color: #0369a1; font-size: 10px; font-weight: 600;">💧 Irrigation</p>
              <p style="margin: 2px 0 0 0; color: #0c4a6e; font-size: 12px;">
                ${props.irrigation || 'Non spécifié'}
              </p>
            </div>
            <div>
              <p style="margin: 0; color: #0369a1; font-size: 10px; font-weight: 600;">🌧️ Précipitations</p>
              <p style="margin: 2px 0 0 0; color: #0c4a6e; font-size: 12px; font-weight: bold;">
                ${props.precipitation || 'N/A'}
              </p>
            </div>
          </div>

          <!-- Bouton de sélection -->
          <button 
            onclick="window.selectAgriZone('${zone}', '${name}')" 
            style="
              background: linear-gradient(135deg, ${ZONE_COLORS[zone]}, ${ZONE_COLORS[zone]}dd);
              color: white; 
              border: none; 
              padding: 10px 16px; 
              border-radius: 8px; 
              cursor: pointer;
              font-size: 13px;
              font-weight: 600;
              width: 100%;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              transition: transform 0.1s;
            "
            onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.15)'"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)'"
          >
            ✓ Sélectionner cette zone agricole
          </button>
        </div>
      </div>
    `

    layer.bindPopup(popupContent, {
      maxWidth: 340,
      className: 'custom-popup'
    })
    
    layer.bindTooltip(`<strong>${name}</strong><br/>${props.cultures_principales || ''}`, { 
      sticky: true,
      className: 'custom-tooltip',
      direction: 'top'
    })

    layer.on({
      click: () => {
        // Fonction globale pour la sélection via le bouton du popup
        window.selectAgriZone = (selectedZone, regionName) => {
          console.log(`Zone agricole sélectionnée: ${regionName} (${selectedZone})`)
          onZoneSelect({
            country: currentCountry.code,
            zoneAgricole: selectedZone,
            regionName: regionName
          })
        }
      },
      mouseover: (e) => {
        const layer = e.target
        layer.setStyle(regionHoverStyle)
        layer.bringToFront()
      },
      mouseout: (e) => {
        const layer = e.target
        layer.setStyle(regionStyle(feature))
      }
    })
  }

  if (!worldGeo) return (
    <div className="flex items-center justify-center h-96 bg-gray-50 rounded-2xl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement de la carte...</p>
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            🗺️ Zones agricoles du Maroc
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {!currentCountry 
              ? "Cliquez sur un pays pour explorer ses zones agricoles"
              : "Cliquez sur une région pour voir ses données agricoles détaillées"
            }
          </p>
        </div>
        {currentCountry && (
          <button
            onClick={() => {
              setRegionsGeo(null)
              setCurrentCountry(null)
            }}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            ← Retour
          </button>
        )}
      </div>

      <MapContainer 
        center={[20, 0]} 
        zoom={2} 
        style={{ height: 600, borderRadius: '12px' }}
        className="shadow-inner"
      >
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {!regionsGeo && (
          <GeoJSON
            data={worldGeo}
            style={countryStyle}
            onEachFeature={onEachCountry}
          />
        )}

        {regionsGeo && (
          <>
            <GeoJSON
              data={regionsGeo}
              style={regionStyle}
              onEachFeature={onEachRegion}
            />
            <FitBounds geo={regionsGeo} />
          </>
        )}
      </MapContainer>

      {/* Légende des zones agricoles */}
      <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
        <h3 className="font-semibold text-sm text-gray-700 mb-3 flex items-center gap-2">
          🌍 Légende des zones climatiques agricoles
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(ZONE_COLORS).map(([key, color]) => (
            <div key={key} className="flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-sm">
              <div 
                className="w-4 h-4 rounded-sm shadow-sm" 
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-gray-700 font-medium">
                {ZONE_NAMES[key]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Indicateurs clés (visible uniquement en vue régionale) */}
      {regionsGeo && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-xs text-green-700 font-semibold">🌾 Régions</p>
            <p className="text-lg font-bold text-green-900">{regionsGeo.features.length}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-700 font-semibold">💧 Irrigation</p>
            <p className="text-lg font-bold text-blue-900">Variable</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs text-amber-700 font-semibold">📊 Production</p>
            <p className="text-lg font-bold text-amber-900">Diversifiée</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <p className="text-xs text-purple-700 font-semibold">🌡️ Climat</p>
            <p className="text-lg font-bold text-purple-900">3 zones</p>
          </div>
        </div>
      )}
    </div>
  )
}