type CacheEntry = {
  data: any;
  timestamp: number;
};

const cache: Record<string, CacheEntry> = {};
const TTL = 5 * 60 * 1000; 

export function setCache(key: string, data: any) {
  cache[key] = {
    data,
    timestamp: Date.now()
  };
}

export function getCache(key: string): any | null {
  const entry = cache[key];
  if (entry && (Date.now() - entry.timestamp < TTL)) {
    return entry.data;
  }
  return null;
}
