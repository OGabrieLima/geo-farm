import { MapPin, Wallet, TrendingUp, User } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { formatCurrency, formatNumber } from '@/lib/gameEngine';

export default function Header() {
  const { player, getTotalNetWorth } = useGameStore();
  const netWorth = getTotalNetWorth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-green-500">GeoFarm Tycoon</h1>
          
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
            <MapPin className="h-4 w-4" />
            <span>
              {player.location.lat.toFixed(2)}, {player.location.lng.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-yellow-500" />
            <div className="text-right">
              <p className="text-sm font-mono font-semibold text-white">
                {formatCurrency(player.balance)}
              </p>
              <p className="text-xs text-gray-400">Saldo</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <div className="text-right">
              <p className="text-sm font-mono font-semibold text-white">
                {formatCurrency(netWorth)}
              </p>
              <p className="text-xs text-gray-400">Patrimônio</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-500" />
            <div className="text-right">
              <p className="text-sm font-semibold text-white">{player.name}</p>
              <p className="text-xs text-gray-400">
                Nível {player.level} • {formatNumber(player.xp)} XP
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}