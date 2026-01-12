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
  weight: 1,
  color: '#333',
  fillOpacity: 0.75,
})

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

    console.log('REGIONS LOADED:', data)
    console.log('FIRST COORD:', data.features[0].geometry.coordinates[0][0])

    setRegionsGeo(data)
  }

  const onEachCountry = (feature, layer) => {
    const country = getCountryFromFeature(feature)
    if (!country) return

    console.log('CLICK PAYS:', country.code)

    layer.on({
      click: () => {
        setCurrentCountry(country)
        loadRegions(country)
      },
    })

    layer.bindTooltip(country.name, { sticky: true })
  }

const onEachRegion = (feature, layer) => {
    const zone =
      feature.properties.zone ||
      feature.properties.ZONE ||
      feature.properties.zone_agricole ||
      'mediterraneenne' // fallback sûr

    layer.on({
      click: () => {
        onZoneSelect({
          country: currentCountry.code,
          zoneAgricole: zone,
        })
      },
    })
  }



  if (!worldGeo) return <p>Chargement…</p>

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: 600 }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

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
  )
}
