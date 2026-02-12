import { Property } from '@/types/property';

export const mockProperties: Property[] = [
  // Brazil - São Paulo
  {
    id: 'farm-001',
    name: 'Fazenda São João',
    type: 'farm',
    tier: 'large',
    owner: 'João Silva',
    coordinates: [-47.8825, -21.7642],
    status: 'active',
    biome: 'tropical',
    production: {
      current: 'Café',
      capacity: 5000,
      efficiency: 87
    },
    value: 8500000,
    city: 'Ribeirão Preto',
    state: 'São Paulo',
    country: 'Brasil'
  },
  {
    id: 'farm-002',
    name: 'Chácara Bela Vista',
    type: 'farm',
    tier: 'chacara',
    owner: 'Maria Santos',
    coordinates: [-46.6333, -23.5505],
    status: 'active',
    biome: 'tropical',
    production: {
      current: 'Hortaliças',
      capacity: 500,
      efficiency: 92
    },
    value: 180000,
    city: 'São Paulo',
    state: 'São Paulo',
    country: 'Brasil'
  },
  {
    id: 'industry-001',
    name: 'Laticínios Paulista',
    type: 'industry',
    owner: 'Cooperativa ABC',
    coordinates: [-47.0608, -22.9099],
    status: 'active',
    production: {
      current: 'Queijo',
      capacity: 10000,
      efficiency: 78
    },
    value: 12000000,
    city: 'Campinas',
    state: 'São Paulo',
    country: 'Brasil'
  },
  {
    id: 'fuel-001',
    name: 'Posto Bandeirantes',
    type: 'fuel_station',
    owner: 'Pedro Costa',
    coordinates: [-46.6388, -23.5489],
    status: 'active',
    value: 2500000,
    city: 'São Paulo',
    state: 'São Paulo',
    country: 'Brasil'
  },
  
  // Brazil - Minas Gerais
  {
    id: 'farm-003',
    name: 'Fazenda Minas Verde',
    type: 'farm',
    tier: 'medium',
    owner: 'Carlos Oliveira',
    coordinates: [-43.9378, -19.9167],
    status: 'active',
    biome: 'tropical',
    production: {
      current: 'Milho',
      capacity: 3000,
      efficiency: 85
    },
    value: 4200000,
    city: 'Belo Horizonte',
    state: 'Minas Gerais',
    country: 'Brasil'
  },
  {
    id: 'farm-004',
    name: 'Fazenda Café Mineiro',
    type: 'farm',
    tier: 'large',
    owner: 'Ana Paula',
    coordinates: [-45.2353, -21.7644],
    status: 'active',
    biome: 'tropical',
    production: {
      current: 'Café',
      capacity: 6000,
      efficiency: 91
    },
    value: 9800000,
    city: 'Varginha',
    state: 'Minas Gerais',
    country: 'Brasil'
  },

  // Brazil - Mato Grosso
  {
    id: 'farm-005',
    name: 'Agropecuária MT',
    type: 'farm',
    tier: 'mega',
    owner: 'Grupo Agro Brasil',
    coordinates: [-56.0974, -15.5989],
    status: 'active',
    biome: 'tropical',
    production: {
      current: 'Soja',
      capacity: 15000,
      efficiency: 89
    },
    value: 85000000,
    city: 'Cuiabá',
    state: 'Mato Grosso',
    country: 'Brasil'
  },
  {
    id: 'farm-006',
    name: 'Fazenda Pantanal',
    type: 'farm',
    tier: 'large',
    owner: 'Roberto Mendes',
    coordinates: [-57.6525, -15.8697],
    status: 'active',
    biome: 'tropical',
    production: {
      current: 'Gado',
      capacity: 8000,
      efficiency: 82
    },
    value: 12500000,
    city: 'Cáceres',
    state: 'Mato Grosso',
    country: 'Brasil'
  },
  {
    id: 'industry-002',
    name: 'Frigorífico Centro-Oeste',
    type: 'industry',
    owner: 'Frigobrás S.A.',
    coordinates: [-56.0650, -15.6014],
    status: 'active',
    production: {
      current: 'Carne Processada',
      capacity: 20000,
      efficiency: 88
    },
    value: 28000000,
    city: 'Cuiabá',
    state: 'Mato Grosso',
    country: 'Brasil'
  },

  // Brazil - Rio Grande do Sul
  {
    id: 'farm-007',
    name: 'Vinícola Gaúcha',
    type: 'farm',
    tier: 'medium',
    owner: 'Família Rossi',
    coordinates: [-51.2177, -30.0346],
    status: 'active',
    biome: 'temperate',
    production: {
      current: 'Uva',
      capacity: 2500,
      efficiency: 94
    },
    value: 5500000,
    city: 'Porto Alegre',
    state: 'Rio Grande do Sul',
    country: 'Brasil'
  },
  {
    id: 'farm-008',
    name: 'Fazenda Pampa',
    type: 'farm',
    tier: 'large',
    owner: 'Estância Gaúcha Ltda',
    coordinates: [-54.6465, -29.6868],
    status: 'active',
    biome: 'temperate',
    production: {
      current: 'Trigo',
      capacity: 7000,
      efficiency: 86
    },
    value: 11000000,
    city: 'Uruguaiana',
    state: 'Rio Grande do Sul',
    country: 'Brasil'
  },
  {
    id: 'port-001',
    name: 'Porto de Rio Grande',
    type: 'port',
    owner: 'Cooperativa Sul',
    coordinates: [-52.0986, -32.0350],
    status: 'active',
    value: 150000000,
    city: 'Rio Grande',
    state: 'Rio Grande do Sul',
    country: 'Brasil'
  },

  // Brazil - Santos Port
  {
    id: 'port-002',
    name: 'Porto de Santos',
    type: 'port',
    owner: 'Consórcio Portuário',
    coordinates: [-46.3333, -23.9608],
    status: 'active',
    value: 280000000,
    city: 'Santos',
    state: 'São Paulo',
    country: 'Brasil'
  },

  // Argentina
  {
    id: 'farm-009',
    name: 'Estancia La Pampa',
    type: 'farm',
    tier: 'mega',
    owner: 'Grupo Argentino',
    coordinates: [-58.3816, -34.6037],
    status: 'active',
    biome: 'temperate',
    production: {
      current: 'Soja',
      capacity: 18000,
      efficiency: 90
    },
    value: 95000000,
    city: 'Buenos Aires',
    state: 'Buenos Aires',
    country: 'Argentina'
  },
  {
    id: 'farm-010',
    name: 'Viñedo Mendoza',
    type: 'farm',
    tier: 'medium',
    owner: 'Bodega Argentina',
    coordinates: [-68.8272, -32.8895],
    status: 'active',
    biome: 'arid',
    production: {
      current: 'Vinho',
      capacity: 3500,
      efficiency: 93
    },
    value: 6800000,
    city: 'Mendoza',
    state: 'Mendoza',
    country: 'Argentina'
  },
  {
    id: 'industry-003',
    name: 'Molino Argentino',
    type: 'industry',
    owner: 'Industrias SA',
    coordinates: [-58.4173, -34.6131],
    status: 'active',
    production: {
      current: 'Farinha',
      capacity: 12000,
      efficiency: 84
    },
    value: 18000000,
    city: 'Buenos Aires',
    state: 'Buenos Aires',
    country: 'Argentina'
  },
  {
    id: 'fuel-002',
    name: 'YPF Buenos Aires',
    type: 'fuel_station',
    owner: 'YPF Argentina',
    coordinates: [-58.3975, -34.6118],
    status: 'active',
    value: 3200000,
    city: 'Buenos Aires',
    state: 'Buenos Aires',
    country: 'Argentina'
  },

  // Colombia
  {
    id: 'farm-011',
    name: 'Finca Cafetera',
    type: 'farm',
    tier: 'medium',
    owner: 'Café Colombia',
    coordinates: [-74.0721, 4.7110],
    status: 'active',
    biome: 'tropical',
    production: {
      current: 'Café',
      capacity: 4000,
      efficiency: 95
    },
    value: 7200000,
    city: 'Bogotá',
    state: 'Cundinamarca',
    country: 'Colombia'
  },
  {
    id: 'farm-012',
    name: 'Hacienda Bananera',
    type: 'farm',
    tier: 'large',
    owner: 'Frutas Tropicales',
    coordinates: [-75.5636, 6.2518],
    status: 'active',
    biome: 'tropical',
    production: {
      current: 'Banana',
      capacity: 9000,
      efficiency: 88
    },
    value: 13500000,
    city: 'Medellín',
    state: 'Antioquia',
    country: 'Colombia'
  },
  {
    id: 'airport-001',
    name: 'Aeropuerto El Dorado',
    type: 'airport',
    owner: 'Aerocivil Colombia',
    coordinates: [-74.1469, 4.7016],
    status: 'active',
    value: 450000000,
    city: 'Bogotá',
    state: 'Cundinamarca',
    country: 'Colombia'
  },

  // Peru
  {
    id: 'farm-013',
    name: 'Granja Andina',
    type: 'farm',
    tier: 'small',
    owner: 'Comunidad Peruana',
    coordinates: [-77.0428, -12.0464],
    status: 'active',
    biome: 'cold',
    production: {
      current: 'Quinoa',
      capacity: 1500,
      efficiency: 79
    },
    value: 980000,
    city: 'Lima',
    state: 'Lima',
    country: 'Peru'
  },
  {
    id: 'farm-014',
    name: 'Finca Cacao',
    type: 'farm',
    tier: 'medium',
    owner: 'Chocolates Peruanos',
    coordinates: [-73.2516, -3.7437],
    status: 'active',
    biome: 'tropical',
    production: {
      current: 'Cacau',
      capacity: 3200,
      efficiency: 91
    },
    value: 5800000,
    city: 'Iquitos',
    state: 'Loreto',
    country: 'Peru'
  },
  {
    id: 'fuel-003',
    name: 'Petroperu Lima',
    type: 'fuel_station',
    owner: 'Petroperu',
    coordinates: [-77.0282, -12.0432],
    status: 'active',
    value: 2800000,
    city: 'Lima',
    state: 'Lima',
    country: 'Peru'
  },

  // Chile
  {
    id: 'farm-015',
    name: 'Viña Chilena',
    type: 'farm',
    tier: 'large',
    owner: 'Viñedos del Sur',
    coordinates: [-70.6693, -33.4489],
    status: 'active',
    biome: 'temperate',
    production: {
      current: 'Vinho',
      capacity: 8500,
      efficiency: 92
    },
    value: 16000000,
    city: 'Santiago',
    state: 'Región Metropolitana',
    country: 'Chile'
  },
  {
    id: 'farm-016',
    name: 'Frutícola Valle Central',
    type: 'farm',
    tier: 'medium',
    owner: 'Exportadora Chile',
    coordinates: [-71.5430, -35.4264],
    status: 'active',
    biome: 'temperate',
    production: {
      current: 'Maçã',
      capacity: 4500,
      efficiency: 87
    },
    value: 7500000,
    city: 'Talca',
    state: 'Maule',
    country: 'Chile'
  },
  {
    id: 'port-003',
    name: 'Puerto de Valparaíso',
    type: 'port',
    owner: 'Puertos Chile',
    coordinates: [-71.6127, -33.0472],
    status: 'active',
    value: 180000000,
    city: 'Valparaíso',
    state: 'Valparaíso',
    country: 'Chile'
  },
  {
    id: 'industry-004',
    name: 'Procesadora de Frutas',
    type: 'industry',
    owner: 'Agroindustrial Chile',
    coordinates: [-70.6506, -33.4372],
    status: 'active',
    production: {
      current: 'Suco',
      capacity: 15000,
      efficiency: 83
    },
    value: 22000000,
    city: 'Santiago',
    state: 'Región Metropolitana',
    country: 'Chile'
  },

  // Properties in Auction
  {
    id: 'farm-017',
    name: 'Fazenda em Leilão',
    type: 'farm',
    tier: 'small',
    owner: 'Banco Central',
    coordinates: [-48.5482, -27.5954],
    status: 'auction',
    biome: 'temperate',
    value: 1200000,
    city: 'Florianópolis',
    state: 'Santa Catarina',
    country: 'Brasil'
  },
  {
    id: 'industry-005',
    name: 'Indústria Desativada',
    type: 'industry',
    owner: 'Em Leilão',
    coordinates: [-51.9253, -14.8578],
    status: 'auction',
    value: 8500000,
    city: 'Goiânia',
    state: 'Goiás',
    country: 'Brasil'
  }
];