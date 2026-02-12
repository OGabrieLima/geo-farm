import { Home, Map, Building2, ShoppingCart, Truck, Users, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Mapa', href: '/map', icon: Map },
  { name: 'Propriedades', href: '/properties', icon: Building2 },
  { name: 'Mercado', href: '/market', icon: ShoppingCart },
  { name: 'Frota', href: '/fleet', icon: Truck },
  { name: 'Staff', href: '/staff', icon: Users },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-gray-800 bg-black/95">
      <nav className="flex flex-col gap-1 p-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-green-900/20 text-green-500'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
        <p className="text-xs text-gray-400 mb-2">💡 Dica do Jogo</p>
        <p className="text-xs text-gray-300">
          Propriedades em biomas tropicais produzem mais café e cana-de-açúcar!
        </p>
      </div>
    </aside>
  );
}