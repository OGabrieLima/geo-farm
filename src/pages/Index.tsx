import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Building2, 
  Truck, 
  Sprout,
  DollarSign,
  Clock,
  AlertCircle
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/gameEngine';

export default function Dashboard() {
  const { 
    player, 
    properties, 
    vehicles, 
    productions,
    transactions,
    updateGameTime,
    getTotalNetWorth
  } = useGameStore();

  // Update game time every second
  useEffect(() => {
    const interval = setInterval(() => {
      updateGameTime();
    }, 1000);
    return () => clearInterval(interval);
  }, [updateGameTime]);

  const netWorth = getTotalNetWorth();
  const activeProductions = productions.filter(p => p.status === 'growing').length;
  const readyHarvests = productions.filter(p => p.status === 'ready').length;
  const recentTransactions = transactions.slice(-5).reverse();

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div 
        className="relative h-64 rounded-lg overflow-hidden"
        style={{
          backgroundImage: 'url(https://mgx-backend-cdn.metadl.com/generate/images/966344/2026-02-11/239f9b90-f9ac-4eea-8bf0-c218e37fe790.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        <div className="relative h-full flex flex-col justify-center px-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Bem-vindo de volta, {player.name}!
          </h1>
          <p className="text-xl text-gray-300">
            Nível {player.level} • {formatNumber(player.xp)} XP
          </p>
          <Progress value={(player.xp % 1000) / 10} className="w-64 mt-4" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Patrimônio Líquido
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white font-mono">
              {formatCurrency(netWorth)}
            </div>
            <p className="text-xs text-green-500 mt-1">
              +12.5% este mês
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Propriedades
            </CardTitle>
            <Building2 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {properties.length}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {properties.filter(p => p.type === 'farm').length} fazendas ativas
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Frota
            </CardTitle>
            <Truck className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {vehicles.length}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {vehicles.filter(v => v.status === 'idle').length} veículos disponíveis
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Produções Ativas
            </CardTitle>
            <Sprout className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {activeProductions}
            </div>
            <p className="text-xs text-yellow-500 mt-1">
              {readyHarvests} prontas para colheita
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Active Productions */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-500" />
              Produções em Andamento
            </CardTitle>
            <CardDescription>
              Acompanhe o progresso das suas culturas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {productions.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Sprout className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Nenhuma produção ativa</p>
                <Button className="mt-4 bg-green-600 hover:bg-green-700">
                  Iniciar Plantio
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {productions.slice(0, 3).map((prod) => {
                  const progress = prod.status === 'ready' 
                    ? 100 
                    : ((Date.now() - prod.startTime) / (prod.endTime - prod.startTime)) * 100;
                  
                  return (
                    <div key={prod.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">Cultura #{prod.id.slice(-4)}</span>
                        <Badge 
                          variant={prod.status === 'ready' ? 'default' : 'secondary'}
                          className={prod.status === 'ready' ? 'bg-green-600' : ''}
                        >
                          {prod.status === 'ready' ? 'Pronta!' : 'Crescendo'}
                        </Badge>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <p className="text-xs text-gray-400">
                        {prod.status === 'ready' 
                          ? 'Colheita disponível'
                          : `${Math.round(progress)}% completo`
                        }
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-yellow-500" />
              Transações Recentes
            </CardTitle>
            <CardDescription>
              Últimas movimentações financeiras
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentTransactions.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Nenhuma transação ainda</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentTransactions.map((tx) => (
                  <div 
                    key={tx.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50"
                  >
                    <div className="flex items-center gap-3">
                      {tx.amount > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <div>
                        <p className="text-sm text-white">{tx.description}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(tx.timestamp).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <span 
                      className={`text-sm font-mono font-semibold ${
                        tx.amount > 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {formatCurrency(tx.amount)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Ações Rápidas</CardTitle>
          <CardDescription>
            Acesse rapidamente as principais funcionalidades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button className="h-24 flex-col gap-2 bg-green-600 hover:bg-green-700">
              <Building2 className="h-6 w-6" />
              Comprar Propriedade
            </Button>
            <Button className="h-24 flex-col gap-2 bg-blue-600 hover:bg-blue-700">
              <Sprout className="h-6 w-6" />
              Iniciar Plantio
            </Button>
            <Button className="h-24 flex-col gap-2 bg-yellow-600 hover:bg-yellow-700">
              <Truck className="h-6 w-6" />
              Contratar Frete
            </Button>
            <Button className="h-24 flex-col gap-2 bg-purple-600 hover:bg-purple-700">
              <DollarSign className="h-6 w-6" />
              Acessar Mercado
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}