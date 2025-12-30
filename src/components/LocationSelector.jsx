import { useTranslation } from 'react-i18next'
import { COUNTRIES, ZONES } from '../data/zones'

export default function LocationSelector({
  mode,
  setMode,
  manualLocation,
  setManualLocation
}) {
  const { t } = useTranslation()

  const country = COUNTRIES.find(c => c.code === manualLocation.country)

  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-4">

      {/* MODE */}
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={mode === 'auto'}
            onChange={() => setMode('auto')}
          />
          {t('autoDetection')}
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={mode === 'manual'}
            onChange={() => setMode('manual')}
          />
          {t('manualSelection')}
        </label>
      </div>

      {mode === 'manual' && (
        <div className="grid md:grid-cols-2 gap-4">

          {/* PAYS */}
          <div>
            <label className="text-sm font-semibold">
              {t('country')}
            </label>
            <select
              className="w-full mt-1 p-2 border rounded-lg"
              value={manualLocation.country}
              onChange={e =>
                setManualLocation({
                  country: e.target.value,
                  zoneAgricole: ''
                })
              }
            >
              <option value="">—</option>
              {COUNTRIES.map(c => (
                <option key={c.code} value={c.code}>
                  {t(c.nameKey)}
                </option>
              ))}
            </select>
          </div>

          {/* ZONE */}
          <div>
            <label className="text-sm font-semibold">
              {t('agriculturalZone')}
            </label>
            <select
              className="w-full mt-1 p-2 border rounded-lg"
              value={manualLocation.zoneAgricole}
              disabled={!country}
              onChange={e =>
                setManualLocation(prev => ({
                  ...prev,
                  zoneAgricole: e.target.value
                }))
              }
            >
              <option value="">—</option>
              {country?.zones.map(z => (
                <option key={z} value={z}>
                  {t(ZONES[z])}
                </option>
              ))}
            </select>
          </div>

        </div>
      )}
    </div>
  )
}
