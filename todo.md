# GeoFarm Tycoon - Protótipo Web (Demo Funcional)

## Design Guidelines

### Design References
- **Farming Simulator UI**: Clean dashboards, earth tones
- **Stardew Valley**: Friendly, approachable interface
- **Style**: Modern Agricultural + Dark Mode + Data-Rich Dashboards

### Color Palette
- Primary: #2D5016 (Forest Green - agriculture theme)
- Secondary: #8B4513 (Saddle Brown - earth tones)
- Accent: #FFD700 (Gold - currency/success)
- Background: #0A0A0A (Deep Black)
- Cards: #1A1A1A (Charcoal)
- Text: #FFFFFF (White), #A0A0A0 (Gray - secondary)

### Typography
- Heading1: Inter font-weight 700 (48px)
- Heading2: Inter font-weight 600 (36px)
- Heading3: Inter font-weight 600 (24px)
- Body: Inter font-weight 400 (14px)
- Monospace (Numbers): JetBrains Mono font-weight 500 (14px)

### Key Component Styles
- **Buttons**: Green primary (#2D5016), gold accent for actions
- **Cards**: Dark with subtle borders, hover lift effect
- **Map**: Full-screen with overlay controls
- **Data Displays**: Monospace fonts for numbers/currency

### Images to Generate
1. **hero-farm-aerial.jpg** - Aerial view of farmland with crops, realistic style
2. **icon-wheat.png** - Wheat icon for crop type, flat design
3. **icon-truck.png** - Delivery truck icon, flat design
4. **icon-tractor.png** - Tractor icon for farming operations, flat design

---

## Development Tasks

### FASE 1: Estrutura Base
1. **Setup do Projeto** ✓
   - Template shadcn-ui inicializado
   - Dependências instaladas (MapLibre GL, Zustand)

2. **Tipos e Interfaces TypeScript**
   - Definir tipos: Property, Crop, Vehicle, Market, Player
   - Criar store Zustand para estado global

3. **Layout Principal**
   - Sidebar com navegação
   - Header com status do CEO
   - Área de conteúdo principal

### FASE 2: Sistema de Mapa
4. **Componente de Mapa (MapLibre GL)**
   - Mapa interativo com controles
   - Marcadores de propriedades
   - Sistema de biomas (overlay colorido)
   - Click para selecionar terreno

5. **Sistema de Biomas**
   - Definir regiões geográficas (GeoJSON simplificado)
   - Calcular bônus de produção por bioma
   - Visualização de zonas climáticas

### FASE 3: Gestão de Propriedades
6. **Dashboard de Propriedades**
   - Lista de fazendas do jogador
   - Status de produção em tempo real
   - Capacidade de armazenamento

7. **Sistema de Produção (Tick System)**
   - Simulação de crescimento de culturas
   - Cálculo baseado em tempo (1h real = 1 dia jogo)
   - Sistema de colheita automática

### FASE 4: Economia e Marketplace
8. **Marketplace P2P Simulado**
   - Lista de ordens de compra/venda
   - Sistema de price bands (±20%)
   - NPC buyers (preço base)
   - Histórico de transações

9. **Sistema Financeiro**
   - Wallet do jogador
   - Cálculo de impostos
   - Custos operacionais (combustível, manutenção)

### FASE 5: Logística
10. **Sistema de Veículos**
    - Frota do jogador
    - Status de combustível
    - Rotas ativas no mapa

11. **Simulação de Fretes**
    - Matching de carga-transportadora
    - Animação de movimento no mapa
    - Cálculo de custos por distância

### FASE 6: Features Avançadas
12. **Sistema de Staff (Cartões)**
    - Corretores e gerentes
    - Sistema de contratação
    - Bônus aplicados

13. **Dashboard do CEO**
    - Localização atual
    - Sistema de viagem
    - Estatísticas gerais

### FASE 7: Polish e UX
14. **Animações e Transições**
    - Smooth scrolling
    - Hover effects
    - Loading states

15. **Responsive Design**
    - Mobile-friendly
    - Tablet optimization

---

## Arquivos a Criar

### Core
- `src/types/index.ts` - Todas as interfaces TypeScript
- `src/store/gameStore.ts` - Zustand store principal
- `src/lib/gameEngine.ts` - Lógica de simulação

### Components
- `src/components/Map/WorldMap.tsx` - Mapa principal
- `src/components/Map/BiomeOverlay.tsx` - Camada de biomas
- `src/components/Dashboard/CEODashboard.tsx` - Dashboard do CEO
- `src/components/Properties/PropertyCard.tsx` - Card de propriedade
- `src/components/Properties/PropertyList.tsx` - Lista de propriedades
- `src/components/Market/MarketOrders.tsx` - Ordens do mercado
- `src/components/Market/PriceChart.tsx` - Gráfico de preços
- `src/components/Vehicles/VehicleCard.tsx` - Card de veículo
- `src/components/Vehicles/FleetManager.tsx` - Gerenciador de frota
- `src/components/Layout/Sidebar.tsx` - Navegação lateral
- `src/components/Layout/Header.tsx` - Cabeçalho

### Pages
- `src/pages/Index.tsx` - Homepage/Dashboard principal
- `src/pages/Map.tsx` - Página do mapa
- `src/pages/Properties.tsx` - Gestão de propriedades
- `src/pages/Market.tsx` - Marketplace
- `src/pages/Fleet.tsx` - Gestão de frota

---

## Limitações do Protótipo

Este é um **demo frontend-only**. Simulações incluem:
- ✅ Tick system calculado no cliente
- ✅ Marketplace com dados mockados
- ✅ Movimento de veículos animado
- ✅ Sistema de biomas estático
- ❌ Sem backend real (Node.js/Elixir)
- ❌ Sem banco de dados (PostgreSQL)
- ❌ Sem WebSocket real-time
- ❌ Sem autenticação multiplayer

**Objetivo**: Validar UX/UI e mecânicas de gameplay antes do desenvolvimento full-stack.