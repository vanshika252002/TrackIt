import { useEffect, memo, useRef } from 'react';
import { useMap } from 'react-leaflet';

interface Props {
  flyToTarget: [number, number];
}

const FlyToTarget = ({ flyToTarget }: Props) => {
  console.log('fl y');
  const map = useMap();
  const prevTargetPosition = useRef<[number, number] | null>(null);
  const tileLoadCount = useRef<number>(0);

  useEffect(() => {
    if (!flyToTarget) return;
    const shouldFly =
      !prevTargetPosition.current ||
      prevTargetPosition.current[0] !== flyToTarget[0] ||
      prevTargetPosition.current[1] !== flyToTarget[1];

    if (!shouldFly) return;

    const handleTileLoadStart = () => {
      tileLoadCount.current += 1;
    };

    const handleTileLoad = () => {
      tileLoadCount.current -= 1;

      if (tileLoadCount.current <= 0) {
        console.log('All tiles loaded, triggering flyTo:', flyToTarget);
        map.flyTo(flyToTarget, 6, { duration: 1 });
        prevTargetPosition.current = flyToTarget;

        map.off('tileloadstart', handleTileLoadStart);
        map.off('tileload', handleTileLoad);
      }
    };

    map.on('tileloadstart', handleTileLoadStart);
    map.on('tileload', handleTileLoad);

    if (flyToTarget[0] != null && flyToTarget[1] != null)
      map.setView(flyToTarget, 6, { animate: false });

    return () => {
      map.off('tileloadstart', handleTileLoadStart);
      map.off('tileload', handleTileLoad);
    };
  }, [flyToTarget, map]);

  return null;
};

export default memo(FlyToTarget);
