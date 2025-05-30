import axios from 'axios';
import { getCityQueries } from './cityService';
import { getCache, setCache } from './cache';

const API_KEY = '044c42ae8853c446133a237259bb5c70';

export async function getWeatherData() {
  const queries = getCityQueries(); 
  const cacheKey = `weather-${queries.join(',')}`;

  const cached = getCache(cacheKey);
  if (cached) {
    console.log('Returning cached weather data');
    return cached;
  }

  const weatherPromises = queries.map(async (query: string) => {
    const url = `http://api.openweathermap.org/data/2.5/weather`;

    try {
      const response = await axios.get(url, {
        params: {
          q: query,
          units: 'metric',
          APPID: API_KEY 
        }
      });

      const city = response.data;
      return {
        CityCode: city.id,
        CityName: city.name,
        Temp: city.main.temp,
        Status: city.weather[0].main
      };
    } catch (error: any) {
      console.error(`Error fetching weather for ${query}: ${error.message}`);
      return null;
    }
  });

  const results = (await Promise.all(weatherPromises)).filter(Boolean);

  setCache(cacheKey, results);
  return results;
}







