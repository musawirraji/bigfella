// Curated metro dataset for the demo — accurate enough lat/lng for lane
// distance, no external geocoder, instant + reliable. `density` drives the
// rural last-mile surcharge in pricing.

export type City = {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  density: "metro" | "rural";
};

export const CITIES: City[] = [
  { id: "hou", name: "Houston", state: "TX", lat: 29.76, lng: -95.37, density: "metro" },
  { id: "dal", name: "Dallas", state: "TX", lat: 32.78, lng: -96.80, density: "metro" },
  { id: "aus", name: "Austin", state: "TX", lat: 30.27, lng: -97.74, density: "metro" },
  { id: "sat", name: "San Antonio", state: "TX", lat: 29.42, lng: -98.49, density: "metro" },
  { id: "elp", name: "El Paso", state: "TX", lat: 31.76, lng: -106.49, density: "metro" },
  { id: "okc", name: "Oklahoma City", state: "OK", lat: 35.47, lng: -97.52, density: "metro" },
  { id: "nola", name: "New Orleans", state: "LA", lat: 29.95, lng: -90.07, density: "metro" },
  { id: "mem", name: "Memphis", state: "TN", lat: 35.15, lng: -90.05, density: "metro" },
  { id: "nsh", name: "Nashville", state: "TN", lat: 36.16, lng: -86.78, density: "metro" },
  { id: "atl", name: "Atlanta", state: "GA", lat: 33.75, lng: -84.39, density: "metro" },
  { id: "mia", name: "Miami", state: "FL", lat: 25.76, lng: -80.19, density: "metro" },
  { id: "orl", name: "Orlando", state: "FL", lat: 28.54, lng: -81.38, density: "metro" },
  { id: "tpa", name: "Tampa", state: "FL", lat: 27.95, lng: -82.46, density: "metro" },
  { id: "jax", name: "Jacksonville", state: "FL", lat: 30.33, lng: -81.66, density: "metro" },
  { id: "clt", name: "Charlotte", state: "NC", lat: 35.23, lng: -80.84, density: "metro" },
  { id: "ral", name: "Raleigh", state: "NC", lat: 35.78, lng: -78.64, density: "metro" },
  { id: "dc", name: "Washington", state: "DC", lat: 38.91, lng: -77.04, density: "metro" },
  { id: "bal", name: "Baltimore", state: "MD", lat: 39.29, lng: -76.61, density: "metro" },
  { id: "phl", name: "Philadelphia", state: "PA", lat: 39.95, lng: -75.17, density: "metro" },
  { id: "nyc", name: "New York", state: "NY", lat: 40.71, lng: -74.01, density: "metro" },
  { id: "bos", name: "Boston", state: "MA", lat: 42.36, lng: -71.06, density: "metro" },
  { id: "pit", name: "Pittsburgh", state: "PA", lat: 40.44, lng: -79.99, density: "metro" },
  { id: "cmh", name: "Columbus", state: "OH", lat: 39.96, lng: -82.99, density: "metro" },
  { id: "cle", name: "Cleveland", state: "OH", lat: 41.50, lng: -81.69, density: "metro" },
  { id: "det", name: "Detroit", state: "MI", lat: 42.33, lng: -83.05, density: "metro" },
  { id: "chi", name: "Chicago", state: "IL", lat: 41.88, lng: -87.63, density: "metro" },
  { id: "ind", name: "Indianapolis", state: "IN", lat: 39.77, lng: -86.16, density: "metro" },
  { id: "mke", name: "Milwaukee", state: "WI", lat: 43.04, lng: -87.91, density: "metro" },
  { id: "msp", name: "Minneapolis", state: "MN", lat: 44.98, lng: -93.27, density: "metro" },
  { id: "stl", name: "St. Louis", state: "MO", lat: 38.63, lng: -90.20, density: "metro" },
  { id: "mci", name: "Kansas City", state: "MO", lat: 39.10, lng: -94.58, density: "metro" },
  { id: "den", name: "Denver", state: "CO", lat: 39.74, lng: -104.99, density: "metro" },
  { id: "slc", name: "Salt Lake City", state: "UT", lat: 40.76, lng: -111.89, density: "metro" },
  { id: "phx", name: "Phoenix", state: "AZ", lat: 33.45, lng: -112.07, density: "metro" },
  { id: "lv", name: "Las Vegas", state: "NV", lat: 36.17, lng: -115.14, density: "metro" },
  { id: "la", name: "Los Angeles", state: "CA", lat: 34.05, lng: -118.24, density: "metro" },
  { id: "sd", name: "San Diego", state: "CA", lat: 32.72, lng: -117.16, density: "metro" },
  { id: "sf", name: "San Francisco", state: "CA", lat: 37.77, lng: -122.42, density: "metro" },
  { id: "sjc", name: "San Jose", state: "CA", lat: 37.34, lng: -121.89, density: "metro" },
  { id: "sac", name: "Sacramento", state: "CA", lat: 38.58, lng: -121.49, density: "metro" },
  { id: "pdx", name: "Portland", state: "OR", lat: 45.52, lng: -122.68, density: "metro" },
  { id: "sea", name: "Seattle", state: "WA", lat: 47.61, lng: -122.33, density: "metro" },
  { id: "abq", name: "Albuquerque", state: "NM", lat: 35.08, lng: -106.65, density: "metro" },
  { id: "ric", name: "Richmond", state: "VA", lat: 37.54, lng: -77.44, density: "metro" },
  { id: "bham", name: "Birmingham", state: "AL", lat: 33.52, lng: -86.81, density: "metro" },
  { id: "sdf", name: "Louisville", state: "KY", lat: 38.25, lng: -85.76, density: "metro" },
  { id: "oma", name: "Omaha", state: "NE", lat: 41.26, lng: -95.93, density: "metro" },
  { id: "boz", name: "Bozeman", state: "MT", lat: 45.68, lng: -111.04, density: "rural" },
  { id: "bgr", name: "Bangor", state: "ME", lat: 44.80, lng: -68.77, density: "rural" },
  { id: "far", name: "Fargo", state: "ND", lat: 46.88, lng: -96.79, density: "rural" },
];

const byId = new Map(CITIES.map((c) => [c.id, c]));
export const getCity = (id: string): City | undefined => byId.get(id);
export const cityLabel = (c: City): string => `${c.name}, ${c.state}`;

const toRad = (d: number) => (d * Math.PI) / 180;

export function haversineMi(a: City, b: City): number {
  const R = 3958.8;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

// Great-circle inflated by a road-detour factor → believable driving miles.
export const roadMiles = (a: City, b: City): number => Math.round(haversineMi(a, b) * 1.18);

// Project a city into a 0..100 x, 0..60 y box over the continental US — for
// the live lane map.
export function project(c: City): { x: number; y: number } {
  const minLng = -125, maxLng = -66, minLat = 24, maxLat = 49.5;
  const x = ((c.lng - minLng) / (maxLng - minLng)) * 100;
  const y = ((maxLat - c.lat) / (maxLat - minLat)) * 60;
  return { x, y };
}
