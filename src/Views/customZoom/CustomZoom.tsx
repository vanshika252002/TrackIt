import { useEffect, useRef, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { ICONS } from '../../assets';
import './customZoom.css';
import { Props } from './Types/types';

const CustomZoom = ({
  chooseOption,
  setClickedLocation,
  setSelectedLocation,
  weatherInformation,
  setWeatherInformation,
}: Props) => {
  const map = useMap();
  const [open, setOpen] = useState(true);
  const zoomControlRef = useRef<HTMLDivElement>(null);

  const { earthquake, flight, visibility } = chooseOption;

  useEffect(() => {
    const el = zoomControlRef.current;
    if (!el) return;
    L.DomEvent.disableClickPropagation(el);
    L.DomEvent.disableScrollPropagation(el);
  }, []);

  useEffect(() => {
    if (!weatherInformation) {
      setClickedLocation(null);
    }
  }, [weatherInformation]);
  useEffect(() => {
    if (!flight.flight) {
      setSelectedLocation(null);
    }
  });
  console.log(open);
  return (
    <div className="custom-zoom" ref={zoomControlRef}>
      <button title="Zoom In" className="btn-zoom" onClick={() => map.zoomIn()}>
        +
      </button>
      <button
        title="Zoom out"
        className="btn-zoom"
        onClick={() => map.zoomOut()}
      >
        −
      </button>
      <button
        title="Earthquake alert"
        className={`${earthquake.alert ? 'opacity-on' : 'opacity-off'}`}
        onClick={() => {
          earthquake.setAlert(!earthquake.alert),
            flight.setFlight(false),
            setWeatherInformation(false);
        }}
      >
        <img src={ICONS.earthquakealert} />
      </button>
      <button
        title="LIVE flight"
        className={`${flight.flight ? 'opacity-on' : 'opacity-off'}`}
        onClick={() => {
          flight.setFlight(!flight.flight),
            earthquake.setAlert(false),
            visibility.setVisible(''),
            setWeatherInformation(false);
        }}
      >
        <img src={ICONS.flightLogo} />
      </button>
      <button
        title="Weather"
        className={`${weatherInformation ? 'opacity-on' : 'opacity-off'}`}
        onClick={() => {
          setWeatherInformation(!weatherInformation),
            earthquake.setAlert(false),
            console.log('GONE');
          flight.setFlight(false);
          setOpen(true);
        }}
      >
        <img src={ICONS.cloudy} />
      </button>
      {weatherInformation && open && (
        <div className="knowtheweather">
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log(open);
              setOpen(false);
            }}
          >
            x
          </button>
          <span>
            You can click on the map to know the weather of particular location
          </span>
        </div>
      )}
    </div>
  );
};

export default CustomZoom;

/*

*/
