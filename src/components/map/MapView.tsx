'use client';

import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Property, MapLayer } from '@/types/property';
import { mockProperties } from '@/data/mockProperties';
import PropertyPopup from './PropertyPopup';
import MapControls from './MapControls';
import PropertyList from './PropertyList';

const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeLayer, setActiveLayer] = useState<string>('all');
  const [showSidebar, setShowSidebar] = useState(true);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  const layers: MapLayer[] = [
    { id: 'all', name: 'Todas', icon: '🌍', active: true },
    { id: 'logistics', name: 'Logística', icon: '🚚', active: false },
    { id: 'agricultural', name: 'Agrícola', icon: '🌾', active: false },
    { id: 'economic', name: 'Econômica', icon: '💰', active: false }
  ];

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map with globe projection
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [-55, -15], // Center on South America
      zoom: 3.5,
      pitch: 0,
      bearing: 0,
      projection: 'globe' as any
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    map.current.addControl(new maplibregl.FullscreenControl(), 'top-right');

    map.current.on('load', () => {
      if (!map.current) return;

      // Add biome layer
      map.current.addSource('biomes', {
        type: 'geojson',
        data: '/biomes.geojson' as any
      });

      map.current.addLayer({
        id: 'biomes-fill',
        type: 'fill',
        source: 'biomes',
        paint: {
          'fill-color': ['get', 'color'],
          'fill-opacity': 0.15
        }
      });

      map.current.addLayer({
        id: 'biomes-outline',
        type: 'line',
        source: 'biomes',
        paint: {
          'line-color': ['get', 'color'],
          'line-width': 2,
          'line-opacity': 0.4
        }
      });

      // Add property markers
      addPropertyMarkers();
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const addPropertyMarkers = () => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    const filteredProperties = filterPropertiesByLayer(mockProperties, activeLayer);

    filteredProperties.forEach((property) => {
      const el = document.createElement('div');
      el.className = 'property-marker';
      el.style.width = '32px';
      el.style.height = '32px';
      el.style.cursor = 'pointer';
      el.style.transition = 'transform 0.2s';
      
      const icon = getPropertyIcon(property);
      const color = getPropertyColor(property);
      
      el.innerHTML = `
        <div style="
          width: 100%;
          height: 100%;
          background: ${color};
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">
          ${icon}
        </div>
      `;

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.2)';
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
      });

      el.addEventListener('click', () => {
        setSelectedProperty(property);
        if (map.current) {
          map.current.flyTo({
            center: property.coordinates,
            zoom: 10,
            duration: 1500
          });
        }
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(property.coordinates)
        .addTo(map.current!);

      markersRef.current.push(marker);
    });
  };

  const getPropertyIcon = (property: Property): string => {
    switch (property.type) {
      case 'farm':
        return '🌾';
      case 'industry':
        return '🏭';
      case 'fuel_station':
        return '⛽';
      case 'port':
        return '🚢';
      case 'airport':
        return '✈️';
      default:
        return '📍';
    }
  };

  const getPropertyColor = (property: Property): string => {
    if (property.status === 'auction') return '#ef4444';
    
    switch (property.type) {
      case 'farm':
        return '#10b981';
      case 'industry':
        return '#3b82f6';
      case 'fuel_station':
        return '#eab308';
      case 'port':
        return '#8b5cf6';
      case 'airport':
        return '#ec4899';
      default:
        return '#6b7280';
    }
  };

  const filterPropertiesByLayer = (properties: Property[], layer: string): Property[] => {
    if (layer === 'all') return properties;
    
    switch (layer) {
      case 'logistics':
        return properties.filter(p => 
          p.type === 'fuel_station' || p.type === 'port' || p.type === 'airport'
        );
      case 'agricultural':
        return properties.filter(p => p.type === 'farm');
      case 'economic':
        return properties.filter(p => 
          p.status === 'auction' || p.type === 'fuel_station'
        );
      default:
        return properties;
    }
  };

  const handleLayerChange = (layerId: string) => {
    setActiveLayer(layerId);
  };

  useEffect(() => {
    if (map.current) {
      addPropertyMarkers();
    }
  }, [activeLayer]);

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
    if (map.current) {
      map.current.flyTo({
        center: property.coordinates,
        zoom: 10,
        duration: 1500
      });
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Map Container */}
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Map Controls */}
      <MapControls
        layers={layers}
        activeLayer={activeLayer}
        onLayerChange={handleLayerChange}
        onToggleSidebar={() => setShowSidebar(!showSidebar)}
        showSidebar={showSidebar}
      />

      {/* Property List Sidebar */}
      {showSidebar && (
        <PropertyList
          properties={filterPropertiesByLayer(mockProperties, activeLayer)}
          selectedProperty={selectedProperty}
          onPropertySelect={handlePropertySelect}
        />
      )}

      {/* Property Popup */}
      {selectedProperty && (
        <PropertyPopup
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      {/* Legend */}
      <div className="absolute bottom-6 left-6 bg-gray-900/90 backdrop-blur-sm text-white p-4 rounded-lg shadow-lg border border-gray-700">
        <h3 className="font-bold mb-3 text-sm">Legenda</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
            <span>Fazendas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
            <span>Indústrias</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-white"></div>
            <span>Postos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-500 border-2 border-white"></div>
            <span>Portos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-pink-500 border-2 border-white"></div>
            <span>Aeroportos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white"></div>
            <span>Em Leilão</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;