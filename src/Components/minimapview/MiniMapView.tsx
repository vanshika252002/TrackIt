import { useMap } from 'react-leaflet';
import * as L from 'leaflet';
import { useEffect } from 'react';
import 'leaflet-minimap';

import 'leaflet-minimap/dist/Control.MiniMap.min.css';
import './minimapview.css';

function MiniMapControl() {
  const map = useMap();

  useEffect(() => {
    const miniMapLayer = new L.TileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        minZoom: 1,
        maxZoom: 13,
        attribution: '',
      }
    );

    const miniMap = new L.Control.MiniMap(miniMapLayer, {
      toggleDisplay: true,
      minimized: false,
      position: 'bottomright',
      width: 300,
      height: 300,
      zoomLevelOffset: -3,
      zoomAnimation: true,
      aimingRectOptions: { color: '#ff7800', weight: 1, clickable: false },
      shadowRectOptions: {
        color: '#000000',
        weight: 1,
        clickable: false,
        opacity: 0,
        fillOpacity: 0,
      },
      mapOptions: {
        maxBounds: [
          [85, -180],
          [-85, 180],
        ],
        maxBoundsViscosity: 1.0,
      },
    });

    miniMap.addTo(map);

    return () => {
      miniMap.remove();
    };
  }, [map]);

  return null;
}
export default MiniMapControl;
