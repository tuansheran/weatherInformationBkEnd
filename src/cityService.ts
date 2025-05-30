import cities from './cities.json';

const countryMap: Record<string, string> = {
  Colombo: 'lk',
  Tokyo: 'jp',
  Liverpool: 'gb',
  Paris: 'fr',
  Sydney: 'au',
  Boston: 'us',
  Shanghai: 'cn',
  Oslo: 'no'
};

export function getCityQueries(): string[] {
  return cities.List.map(city => {
    const country = countryMap[city.CityName];
    if (!country) {
      throw new Error(`Country code not found for city: ${city.CityName}`);
    }
    return `${city.CityName},${country}`;
  });
}



