export type PropertyType = 'farm' | 'industry' | 'fuel_station' | 'port' | 'airport';

export type FarmTier = 'chacara' | 'small' | 'medium' | 'large' | 'mega';

export type BiomeType = 'tropical' | 'temperate' | 'arid' | 'cold';

export type PropertyStatus = 'active' | 'inactive' | 'auction' | 'construction';

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  tier?: FarmTier;
  owner: string;
  coordinates: [number, number]; // [longitude, latitude]
  status: PropertyStatus;
  biome?: BiomeType;
  production?: {
    current: string;
    capacity: number;
    efficiency: number;
  };
  value: number;
  city: string;
  state: string;
  country: string;
}

export interface MapLayer {
  id: string;
  name: string;
  icon: string;
  active: boolean;
}

export interface Biome {
  type: BiomeType;
  name: string;
  color: string;
  bonus: string[];
}