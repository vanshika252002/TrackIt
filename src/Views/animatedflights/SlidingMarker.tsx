import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet.marker.slideto';

function SlidingMarker({ position, icon, onClick }: any) {
  const markerRef = useRef<any>(null);
  const map = useMap();

  useEffect(() => {
    if (!markerRef.current) {
      markerRef.current = L.marker(position, { icon }).addTo(map);
      if (onClick) {
        markerRef.current.on('click', onClick);
      }
    } else {
      markerRef.current.slideTo(position, {
        duration: 1000,
        keepAtCenter: false,
      });
    }
  }, [position]);

  return null;
}

export default SlidingMarker;
