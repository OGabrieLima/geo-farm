import type { Coordinates, Biome, Crop } from '@/types';

// Haversine formula for calculating distance between two coordinates
export function calculateDistance(from: Coordinates, to: Coordinates): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(to.lat - from.lat);
  const dLng = toRad(to.lng - from.lng);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(from.lat)) *
      Math.cos(toRad(to.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Calculate travel time based on distance and vehicle speed
export function calculateTravelTime(
  distance: number,
  vehicleSpeed: number
): number {
  return (distance / vehicleSpeed) * 3600000; // Convert hours to milliseconds
}

// Calculate fuel consumption for a trip
export function calculateFuelConsumption(
  distance: number,
  fuelConsumptionRate: number
): number {
  return distance * fuelConsumptionRate;
}

// Biome definitions (simplified for demo)
export const BIOMES: Record<string, Biome> = {
  tropical: {
    id: 'tropical',
    name: 'Tropical',
    type: 'tropical',
    color: '#228B22',
    bonuses: {
      coffee: 1.5,
      sugarcane: 1.4,
      corn: 1.2,
      wheat: 0.8,
    },
  },
  temperate: {
    id: 'temperate',
    name: 'Temperate',
    type: 'temperate',
    color: '#90EE90',
    bonuses: {
      wheat: 1.3,
      corn: 1.2,
      soy: 1.3,
      coffee: 0.7,
    },
  },
  arid: {
    id: 'arid',
    name: 'Arid',
    type: 'arid',
    color: '#DEB887',
    bonuses: {
      wheat: 0.6,
      corn: 0.7,
      soy: 0.8,
      coffee: 0.5,
    },
  },
  cold: {
    id: 'cold',
    name: 'Cold',
    type: 'cold',
    color: '#B0E0E6',
    bonuses: {
      wheat: 1.1,
      corn: 0.5,
      soy: 0.6,
      coffee: 0.3,
    },
  },
};

// Crop definitions
export const CROPS: Record<string, Crop> = {
  wheat: {
    id: 'wheat',
    name: 'Wheat',
    type: 'wheat',
    growthTime: 90, // game days
    baseYield: 3000, // kg per hectare
    basePrice: 0.25, // per kg
    icon: 'https://mgx-backend-cdn.metadl.com/generate/images/966344/2026-02-11/c91c3169-4a6a-4bdc-9cb1-cbf1f4fea353.png',
  },
  corn: {
    id: 'corn',
    name: 'Corn',
    type: 'corn',
    growthTime: 120,
    baseYield: 5000,
    basePrice: 0.20,
    icon: 'https://mgx-backend-cdn.metadl.com/generate/images/966344/2026-02-11/c91c3169-4a6a-4bdc-9cb1-cbf1f4fea353.png',
  },
  soy: {
    id: 'soy',
    name: 'Soy',
    type: 'soy',
    growthTime: 100,
    baseYield: 2500,
    basePrice: 0.35,
    icon: 'https://mgx-backend-cdn.metadl.com/generate/images/966344/2026-02-11/c91c3169-4a6a-4bdc-9cb1-cbf1f4fea353.png',
  },
  coffee: {
    id: 'coffee',
    name: 'Coffee',
    type: 'coffee',
    growthTime: 150,
    baseYield: 1500,
    basePrice: 2.50,
    icon: 'https://mgx-backend-cdn.metadl.com/generate/images/966344/2026-02-11/c91c3169-4a6a-4bdc-9cb1-cbf1f4fea353.png',
  },
  sugarcane: {
    id: 'sugarcane',
    name: 'Sugarcane',
    type: 'sugarcane',
    growthTime: 180,
    baseYield: 70000,
    basePrice: 0.08,
    icon: 'https://mgx-backend-cdn.metadl.com/generate/images/966344/2026-02-11/c91c3169-4a6a-4bdc-9cb1-cbf1f4fea353.png',
  },
};

// Determine biome based on coordinates (simplified)
export function getBiomeForLocation(coords: Coordinates): Biome {
  const { lat } = coords;
  
  // Simplified biome determination based on latitude
  if (Math.abs(lat) < 23.5) {
    return BIOMES.tropical;
  } else if (Math.abs(lat) < 45) {
    return BIOMES.temperate;
  } else if (Math.abs(lat) < 60) {
    return BIOMES.cold;
  } else {
    return BIOMES.arid;
  }
}

// Calculate production yield with biome bonus
export function calculateYield(
  crop: Crop,
  biome: Biome,
  hectares: number
): number {
  const biomeMultiplier = biome.bonuses[crop.type] || 1.0;
  return crop.baseYield * hectares * biomeMultiplier;
}

// Calculate production time in real milliseconds (1 hour real = 1 game day)
export function calculateProductionTime(gameDays: number): number {
  const HOUR_IN_MS = 3600000;
  return gameDays * HOUR_IN_MS;
}

// Calculate market price with random fluctuation (±10%)
export function calculateMarketPrice(basePrice: number): number {
  const fluctuation = 0.9 + Math.random() * 0.2; // 0.9 to 1.1
  return basePrice * fluctuation;
}

// Calculate price bands (±20% of average)
export function calculatePriceBands(averagePrice: number): {
  min: number;
  max: number;
} {
  return {
    min: averagePrice * 0.8,
    max: averagePrice * 1.2,
  };
}

// Calculate taxes (progressive based on property count)
export function calculatePropertyTax(propertyCount: number, propertyValue: number): number {
  let taxRate = 0.01; // 1% base
  
  if (propertyCount > 10) taxRate = 0.05;
  else if (propertyCount > 5) taxRate = 0.03;
  else if (propertyCount > 2) taxRate = 0.02;
  
  return propertyValue * taxRate;
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
}

// Format number with thousands separator
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('pt-BR').format(num);
}

// Calculate XP gain from transaction
export function calculateXP(transactionAmount: number): number {
  return Math.floor(transactionAmount / 1000); // 1 XP per R$ 1,000
}

// Calculate level from XP
export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

// Generate random property name
export function generatePropertyName(type: string, location: string): string {
  const prefixes = ['Fazenda', 'Sítio', 'Chácara', 'Estância', 'Granja'];
  const suffixes = ['Verde', 'Boa Vista', 'Santa Rita', 'São José', 'Esperança'];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `${prefix} ${suffix}`;
}