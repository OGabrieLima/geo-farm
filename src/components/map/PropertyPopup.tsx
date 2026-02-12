'use client';

import { Property } from '@/types/property';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PropertyPopupProps {
  property: Property;
  onClose: () => void;
}

const PropertyPopup = ({ property, onClose }: PropertyPopupProps) => {
  const getPropertyTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      farm: 'Fazenda',
      industry: 'Indústria',
      fuel_station: 'Posto de Combustível',
      port: 'Porto',
      airport: 'Aeroporto'
    };
    return labels[type] || type;
  };

  const getTierLabel = (tier?: string): string => {
    if (!tier) return '';
    const labels: Record<string, string> = {
      chacara: 'Chácara',
      small: 'Pequena',
      medium: 'Média',
      large: 'Grande',
      mega: 'Mega Fazenda'
    };
    return labels[tier] || tier;
  };

  const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
      active: 'Ativa',
      inactive: 'Inativa',
      auction: 'Em Leilão',
      construction: 'Em Construção'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      active: 'text-green-500',
      inactive: 'text-gray-500',
      auction: 'text-red-500',
      construction: 'text-yellow-500'
    };
    return colors[status] || 'text-gray-500';
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="absolute top-6 right-6 z-10 w-96">
      <Card className="bg-gray-900/95 backdrop-blur-sm border-gray-700 text-white shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold mb-1">{property.name}</h2>
              <p className="text-sm text-gray-400">
                {getPropertyTypeLabel(property.type)}
                {property.tier && ` - ${getTierLabel(property.tier)}`}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Status */}
          <div className="mb-4">
            <span className={`text-sm font-semibold ${getStatusColor(property.status)}`}>
              ● {getStatusLabel(property.status)}
            </span>
          </div>

          {/* Details */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-sm text-gray-400">Proprietário</span>
              <span className="text-sm font-medium">{property.owner}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-sm text-gray-400">Localização</span>
              <span className="text-sm font-medium text-right">
                {property.city}, {property.state}<br />
                {property.country}
              </span>
            </div>

            {property.biome && (
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-sm text-gray-400">Bioma</span>
                <span className="text-sm font-medium capitalize">{property.biome}</span>
              </div>
            )}

            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-sm text-gray-400">Valor</span>
              <span className="text-sm font-bold text-green-500">
                {formatCurrency(property.value)}
              </span>
            </div>
          </div>

          {/* Production Info */}
          {property.production && (
            <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-semibold mb-3">Produção</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Produto Atual</span>
                  <span className="text-sm font-medium">{property.production.current}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Capacidade</span>
                  <span className="text-sm font-medium">
                    {property.production.capacity.toLocaleString('pt-BR')} un/mês
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Eficiência</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${property.production.efficiency}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{property.production.efficiency}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            {property.status === 'auction' ? (
              <Button className="flex-1 bg-red-600 hover:bg-red-700">
                Fazer Lance
              </Button>
            ) : (
              <>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Ver Detalhes
                </Button>
                <Button variant="outline" className="flex-1 border-gray-600 hover:bg-gray-800">
                  Contatar
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PropertyPopup;