import { create } from 'zustand';
import type { 
  Player, 
  Property, 
  Vehicle, 
  MarketOrder, 
  Production, 
  Transaction,
  GameState,
  PriceHistory,
  Coordinates
} from '@/types';

interface GameStore {
  // Player state
  player: Player;
  
  // Game entities
  properties: Property[];
  vehicles: Vehicle[];
  marketOrders: MarketOrder[];
  productions: Production[];
  transactions: Transaction[];
  priceHistory: Record<string, PriceHistory>;
  
  // Game state
  gameState: GameState;
  
  // UI state
  selectedProperty: string | null;
  selectedVehicle: string | null;
  mapCenter: Coordinates;
  mapZoom: number;
  
  // Actions
  setPlayer: (player: Partial<Player>) => void;
  addProperty: (property: Property) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  addVehicle: (vehicle: Vehicle) => void;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  createMarketOrder: (order: MarketOrder) => void;
  fillMarketOrder: (orderId: string) => void;
  startProduction: (production: Production) => void;
  harvestProduction: (productionId: string) => void;
  addTransaction: (transaction: Transaction) => void;
  updateGameTime: () => void;
  setSelectedProperty: (id: string | null) => void;
  setSelectedVehicle: (id: string | null) => void;
  setMapView: (center: Coordinates, zoom: number) => void;
  
  // Computed
  getPropertyById: (id: string) => Property | undefined;
  getVehicleById: (id: string) => Vehicle | undefined;
  getActiveMarketOrders: () => MarketOrder[];
  getTotalNetWorth: () => number;
}

// Initial player state
const initialPlayer: Player = {
  id: 'player-1',
  name: 'CEO Fazendeiro',
  level: 1,
  xp: 0,
  balance: 50000, // Starting capital
  debt: 0,
  location: { lat: -23.5505, lng: -46.6333 }, // São Paulo, Brazil
  travelStatus: {
    isMoving: false,
  },
  properties: [],
  vehicles: [],
  staff: [],
};

// Initial game state
const initialGameState: GameState = {
  currentTime: Date.now(),
  gameSpeed: 1,
  season: 'spring',
  hemisphere: 'south',
};

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  player: initialPlayer,
  properties: [],
  vehicles: [],
  marketOrders: [],
  productions: [],
  transactions: [],
  priceHistory: {},
  gameState: initialGameState,
  selectedProperty: null,
  selectedVehicle: null,
  mapCenter: { lat: -23.5505, lng: -46.6333 },
  mapZoom: 10,
  
  // Actions
  setPlayer: (updates) => 
    set((state) => ({ 
      player: { ...state.player, ...updates } 
    })),
  
  addProperty: (property) =>
    set((state) => ({
      properties: [...state.properties, property],
      player: {
        ...state.player,
        properties: [...state.player.properties, property.id],
        balance: state.player.balance - property.purchasePrice,
      },
      transactions: [
        ...state.transactions,
        {
          id: `tx-${Date.now()}`,
          type: 'purchase',
          amount: -property.purchasePrice,
          description: `Purchased ${property.name}`,
          timestamp: Date.now(),
          relatedEntity: property.id,
        },
      ],
    })),
  
  updateProperty: (id, updates) =>
    set((state) => ({
      properties: state.properties.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    })),
  
  addVehicle: (vehicle) =>
    set((state) => ({
      vehicles: [...state.vehicles, vehicle],
      player: {
        ...state.player,
        vehicles: [...state.player.vehicles, vehicle.id],
      },
    })),
  
  updateVehicle: (id, updates) =>
    set((state) => ({
      vehicles: state.vehicles.map((v) =>
        v.id === id ? { ...v, ...updates } : v
      ),
    })),
  
  createMarketOrder: (order) =>
    set((state) => ({
      marketOrders: [...state.marketOrders, order],
    })),
  
  fillMarketOrder: (orderId) =>
    set((state) => {
      const order = state.marketOrders.find((o) => o.id === orderId);
      if (!order) return state;
      
      const totalAmount = order.quantity * order.pricePerUnit;
      const newBalance = order.type === 'sell' 
        ? state.player.balance + totalAmount
        : state.player.balance - totalAmount;
      
      return {
        marketOrders: state.marketOrders.map((o) =>
          o.id === orderId ? { ...o, status: 'filled' as const } : o
        ),
        player: {
          ...state.player,
          balance: newBalance,
        },
        transactions: [
          ...state.transactions,
          {
            id: `tx-${Date.now()}`,
            type: order.type === 'sell' ? 'sale' : 'purchase',
            amount: order.type === 'sell' ? totalAmount : -totalAmount,
            description: `${order.type === 'sell' ? 'Sold' : 'Bought'} ${order.quantity}kg`,
            timestamp: Date.now(),
            relatedEntity: orderId,
          },
        ],
      };
    }),
  
  startProduction: (production) =>
    set((state) => ({
      productions: [...state.productions, production],
    })),
  
  harvestProduction: (productionId) =>
    set((state) => ({
      productions: state.productions.map((p) =>
        p.id === productionId ? { ...p, status: 'harvested' as const } : p
      ),
    })),
  
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
    })),
  
  updateGameTime: () =>
    set((state) => {
      const now = Date.now();
      const timeDelta = now - state.gameState.currentTime;
      
      // Update productions
      const updatedProductions = state.productions.map((prod) => {
        if (prod.status === 'growing' && now >= prod.endTime) {
          return { ...prod, status: 'ready' as const };
        }
        return prod;
      });
      
      // Update vehicles in transit
      const updatedVehicles = state.vehicles.map((vehicle) => {
        if (vehicle.status === 'traveling' && vehicle.currentRoute) {
          if (now >= vehicle.currentRoute.estimatedArrival) {
            return {
              ...vehicle,
              status: 'idle' as const,
              location: vehicle.currentRoute.to,
              currentRoute: undefined,
            };
          }
        }
        return vehicle;
      });
      
      return {
        gameState: {
          ...state.gameState,
          currentTime: now,
        },
        productions: updatedProductions,
        vehicles: updatedVehicles,
      };
    }),
  
  setSelectedProperty: (id) =>
    set({ selectedProperty: id }),
  
  setSelectedVehicle: (id) =>
    set({ selectedVehicle: id }),
  
  setMapView: (center, zoom) =>
    set({ mapCenter: center, mapZoom: zoom }),
  
  // Computed getters
  getPropertyById: (id) =>
    get().properties.find((p) => p.id === id),
  
  getVehicleById: (id) =>
    get().vehicles.find((v) => v.id === id),
  
  getActiveMarketOrders: () =>
    get().marketOrders.filter((o) => o.status === 'active'),
  
  getTotalNetWorth: () => {
    const state = get();
    const propertyValue = state.properties.reduce(
      (sum, p) => sum + p.purchasePrice * 1.2, // Assume 20% appreciation
      0
    );
    const vehicleValue = state.vehicles.reduce(
      (sum, v) => sum + (v.tier * 10000 * (v.condition / 100)),
      0
    );
    return state.player.balance + propertyValue + vehicleValue - state.player.debt;
  },
}));