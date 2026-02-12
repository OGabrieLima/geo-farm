'use client';

import { useState } from 'react';
import { Property } from '@/types/property';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, MapPin } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PropertyListProps {
  properties: Property[];
  selectedProperty: Property | null;
  onPropertySelect: (property: Property) => void;
}

const PropertyList = ({ properties, selectedProperty, onPropertySelect }: PropertyListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProperties = properties.filter(property =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPropertyIcon = (type: string): string => {
    const icons: Record<string, string> = {
      farm: '🌾',
      industry: '🏭',
      fuel_station: '⛽',
      port: '🚢',
      airport: '✈️'
    };
    return icons[type] || '📍';
  };

  const getPropertyColor = (property: Property): string => {
    if (property.status === 'auction') return 'bg-red-500/20 border-red-500';
    
    const colors: Record<string, string> = {
      farm: 'bg-green-500/20 border-green-500',
      industry: 'bg-blue-500/20 border-blue-500',
      fuel_station: 'bg-yellow-500/20 border-yellow-500',
      port: 'bg-purple-500/20 border-purple-500',
      airport: 'bg-pink-500/20 border-pink-500'
    };
    return colors[property.type] || 'bg-gray-500/20 border-gray-500';
  };

  const formatCurrency = (value: number): string => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}M`;
    }
    return `R$ ${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div className="absolute left-20 top-6 bottom-6 w-96 z-10">
      <Card className="h-full bg-gray-900/95 backdrop-blur-sm border-gray-700 text-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold mb-3">Propriedades</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar propriedades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {filteredProperties.length} propriedade(s) encontrada(s)
          </p>
        </div>

        {/* Property List */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Nenhuma propriedade encontrada</p>
              </div>
            ) : (
              filteredProperties.map((property) => (
                <button
                  key={property.id}
                  onClick={() => onPropertySelect(property)}
                  className={`
                    w-full text-left p-3 rounded-lg border-2 transition-all
                    ${getPropertyColor(property)}
                    ${selectedProperty?.id === property.id
                      ? 'ring-2 ring-white scale-[1.02]'
                      : 'hover:scale-[1.01]'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getPropertyIcon(property.type)}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">{property.name}</h3>
                      <p className="text-xs text-gray-400 truncate">
                        {property.city}, {property.country}
                      </p>
                      {property.production && (
                        <p className="text-xs text-gray-300 mt-1">
                          {property.production.current}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-medium text-green-400">
                          {formatCurrency(property.value)}
                        </span>
                        {property.status === 'auction' && (
                          <span className="text-xs font-bold text-red-400">
                            EM LEILÃO
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default PropertyList;