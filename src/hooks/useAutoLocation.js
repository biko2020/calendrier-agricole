import { useEffect, useState } from "react";

const DEFAULT_LOCATION = {
  country: "Maroc",
  region: "Zone méditerranéenne",
  zoneAgricole: "mediterraneenne",
  temperature: null,
  pluie: null,
  ensoleillement: null,
  saison: null
};

export function useAutoLocation() {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Géolocalisation non supportée");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async position => {
        try {
          const { latitude, longitude } = position.coords;

          /* 🌍 1. Région + Pays (OpenStreetMap) */
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const geoData = await geoRes.json();

          const country = geoData.address.country || "—";
          const region =
            geoData.address.state ||
            geoData.address.region ||
            geoData.address.county ||
            "—";

          /* 🌦️ 2. Données climatiques */
          const meteoRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_mean,precipitation_sum,sunshine_duration&timezone=auto`
          );
          const meteo = await meteoRes.json();

          const temp =
            avg(meteo.daily.temperature_2m_mean);
          const pluie =
            sum(meteo.daily.precipitation_sum);
          const soleil =
            sum(meteo.daily.sunshine_duration) / 3600;

          setLocation({
            country,
            region,
            zoneAgricole: detectZoneAgricole(temp, pluie),
            temperature: Math.round(temp),
            pluie: Math.round(pluie),
            ensoleillement: Math.round(soleil),
            saison: detectSeason()
          });

        } catch (err) {
          setError("Erreur de détection");
          setLocation(DEFAULT_LOCATION);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Permission refusée");
        setLocation(DEFAULT_LOCATION);
        setLoading(false);
      }
    );
  }, []);

  return { location, loading, error };
}

/* 🧠 Helpers */
const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
const sum = arr => arr.reduce((a, b) => a + b, 0);

function detectZoneAgricole(temp, rain) {
  if (rain < 250) return "aride";
  if (rain < 500) return "semiAride";
  if (temp > 15) return "mediterraneenne";
  return "temperee";
}

export function detectSeason() {
  const m = new Date().getMonth() + 1;
  if ([12, 1, 2].includes(m)) return "winter";
  if ([3, 4, 5].includes(m)) return "spring";
  if ([6, 7, 8].includes(m)) return "summer";
  return "autumn";
}
