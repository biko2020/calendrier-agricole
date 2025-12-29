import { useEffect, useState } from "react";

export function useAutoLocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function detectLocation() {
      try {
        // 1️⃣ Détection par IP (sans permission)
        const ipRes = await fetch("https://ipapi.co/json/");
        const ipData = await ipRes.json();

        const baseLocation = {
          country: ipData.country_name,
          region: ipData.region,
          latitude: ipData.latitude,
          longitude: ipData.longitude
        };

        // 2️⃣ Climat (Open-Meteo)
        const climateRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${baseLocation.latitude}&longitude=${baseLocation.longitude}&daily=temperature_2m_mean,precipitation_sum&timezone=auto`
        );
        const climateData = await climateRes.json();

        const avgTemp =
          climateData.daily.temperature_2m_mean.reduce((a, b) => a + b, 0) /
          climateData.daily.temperature_2m_mean.length;

        const totalRain =
          climateData.daily.precipitation_sum.reduce((a, b) => a + b, 0);

        // 3️⃣ Détection zone agricole
        const zoneAgricole = detectZoneAgricole(avgTemp, totalRain);

        setLocation({
          ...baseLocation,
          zoneAgricole,
          avgTemp: Math.round(avgTemp),
          totalRain: Math.round(totalRain)
        });
      } catch (err) {
        setError("Impossible de détecter la localisation");
      } finally {
        setLoading(false);
      }
    }

    detectLocation();
  }, []);

  return { location, loading, error };
}

// 🌱 Classification agricole simple (FAO-like)
function detectZoneAgricole(temp, rain) {
  if (rain < 250) return "aride";
  if (rain < 500) return "semi-aride";
  if (temp > 22) return "tropicale";
  if (temp > 15) return "méditerranéenne";
  return "tempérée";
}
