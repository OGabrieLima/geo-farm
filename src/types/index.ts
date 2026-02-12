// Core game types for GeoFarm Tycoon

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Biome {
  id: string;
  name: string;
  type: 'tropical' | 'temperate' | 'arid' | 'cold';
  color: string;
  bonuses: {
    [cropType: string]: number; // multiplier (1.0 = normal, 1.5 = 50% bonus)
  };
}

export interface Property {
  id: string;
  name: string;
  type: 'farm' | 'industrial' | 'commercial' | 'fuel_station';
  tier: 1 | 2 | 3 | 4 | 5;
  coordinates: Coordinates;
  biome: Biome;
  owner: string;
  purchasePrice: number;
  purchaseDate: number;
  slots: {
    total: number;
    used: number;
  };
  buildings: Building[];
  storage: Storage;
}

export interface Building {
  id: string;
  type: 'silo' | 'warehouse' | 'garage' | 'processing_plant';
  level: number;
  capacity: number;
  condition: number; // 0-100
}

export interface Storage {
  capacity: number;
  items: StorageItem[];
}

export interface StorageItem {
  productId: string;
  quantity: number;
  quality: number; // 0-100
}

export interface Crop {
  id: string;
  name: string;
  type: 'wheat' | 'corn' | 'soy' | 'coffee' | 'sugarcane';
  growthTime: number; // in game days
  baseYield: number; // kg per hectare
  basePrice: number; // per kg
  icon: string;
}

export interface Production {
  id: string;
  propertyId: string;
  cropId: string;
  startTime: number;
  endTime: number;
  quantity: number;
  status: 'growing' | 'ready' | 'harvested';
}

export interface Vehicle {
  id: string;
  name: string;
  type: 'truck' | 'tractor' | 'plane' | 'ship';
  tier: 1 | 2 | 3 | 4 | 5;
  capacity: number; // kg
  speed: number; // km/h
  fuelCapacity: number; // liters
  currentFuel: number;
  fuelConsumption: number; // liters per km
  condition: number; // 0-100
  location: Coordinates;
  status: 'idle' | 'traveling' | 'loading' | 'unloading';
  currentRoute?: Route;
}

export interface Route {
  id: string;
  from: Coordinates;
  to: Coordinates;
  distance: number; // km
  startTime: number;
  estimatedArrival: number;
  cargoId: string;
}

export interface MarketOrder {
  id: string;
  type: 'buy' | 'sell';
  productId: string;
  quantity: number;
  pricePerUnit: number;
  seller?: string;
  buyer?: string;
  location: Coordinates;
  createdAt: number;
  expiresAt: number;
  status: 'active' | 'filled' | 'cancelled' | 'expired';
}

export interface Player {
  id: string;
  name: string;
  level: number;
  xp: number;
  balance: number;
  debt: number;
  location: Coordinates;
  travelStatus: {
    isMoving: boolean;
    destination?: Coordinates;
    arrivalTime?: number;
    vehicleType?: 'bus' | 'car' | 'plane';
  };
  properties: string[]; // property IDs
  vehicles: string[]; // vehicle IDs
  staff: StaffMember[];
}

export interface StaffMember {
  id: string;
  name: string;
  type: 'broker' | 'manager' | 'driver';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  salary: number; // per week
  location?: Coordinates;
  bonuses: {
    [key: string]: number;
  };
  hiredDate: number;
}

export interface Transaction {
  id: string;
  type: 'purchase' | 'sale' | 'tax' | 'salary' | 'maintenance' | 'fuel';
  amount: number;
  description: string;
  timestamp: number;
  relatedEntity?: string; // property ID, vehicle ID, etc.
}

export interface GameState {
  currentTime: number; // timestamp
  gameSpeed: number; // 1 = normal, 2 = 2x speed
  season: 'spring' | 'summer' | 'fall' | 'winter';
  hemisphere: 'north' | 'south';
}

export interface PriceHistory {
  productId: string;
  prices: Array<{
    timestamp: number;
    price: number;
    volume: number;
  }>;
  average24h: number;
  minAllowed: number; // -20% of average
  maxAllowed: number; // +20% of average
}