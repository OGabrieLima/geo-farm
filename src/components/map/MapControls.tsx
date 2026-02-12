'use client';

import { MapLayer } from '@/types/property';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

interface MapControlsProps {
  layers: MapLayer[];
  activeLayer: string;
  onLayerChange: (layerId: string) => void;
  onToggleSidebar: () => void;
  showSidebar: boolean;
}

const MapControls = ({
  layers,
  activeLayer,
  onLayerChange,
  onToggleSidebar,
  showSidebar
}: MapControlsProps) => {
  return (
    <div className="absolute top-6 left-6 z-10 flex flex-col gap-3">
      {/* Sidebar Toggle */}
      <Button
        onClick={onToggleSidebar}
        className="bg-gray-900/90 backdrop-blur-sm hover:bg-gray-800 text-white border border-gray-700"
        size="icon"
      >
        {showSidebar ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
      </Button>

      {/* Layer Controls */}
      <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-700 p-3">
        <h3 className="text-white font-semibold text-sm mb-3">Camadas</h3>
        <div className="flex flex-col gap-2">
          {layers.map((layer) => (
            <Button
              key={layer.id}
              onClick={() => onLayerChange(layer.id)}
              variant={activeLayer === layer.id ? 'default' : 'outline'}
              className={`
                justify-start text-sm
                ${activeLayer === layer.id
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white'
                }
              `}
              size="sm"
            >
              <span className="mr-2">{layer.icon}</span>
              {layer.name}
            </Button>
          ))}
        </div>
      </Card>

      {/* Info Card */}
      <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-700 p-3 text-white">
        <div className="text-xs space-y-1">
          <p className="font-semibold">Controles:</p>
          <p className="text-gray-400">🖱️ Arrastar: Mover mapa</p>
          <p className="text-gray-400">🔍 Scroll: Zoom</p>
          <p className="text-gray-400">📍 Clique: Ver propriedade</p>
        </div>
      </Card>
    </div>
  );
};

export default MapControls;