import { useEffect, useRef, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { ICONS } from '../../assets';
import './customZoom.css';
import { Props } from './Types/types';
import { BUTTON_TEXT, WEATHER_LABELS } from '../../Views';

function CustomZoom({
  setTriggerApi,
  clickedLocation,
  setVisible,
  chooseOption,
  setClickedLocation,
  setSelectedLocation,
  weatherInformation,
  setWeatherInformation,
}: Readonly<Props>) {
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
    if (clickedLocation) {
      setOpen(false);
    }
  }, [clickedLocation]);
  useEffect(() => {
    if (!weatherInformation) {
      setClickedLocation(null);
    }
    setOpen(true);
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
        {WEATHER_LABELS.ZOOM_IN}
      </button>
      <button
        title="Zoom out"
        className="btn-zoom"
        onClick={() => map.zoomOut()}
      >
        {WEATHER_LABELS.ZOOM_OUT}
      </button>
      <button
        title="Earthquake alert"
        className={`${earthquake.alert ? 'opacity-on' : 'opacity-off'}`}
        onClick={() => {
          earthquake.setAlert(!earthquake.alert);
          flight.setFlight(false);
          setWeatherInformation(false);
          setTriggerApi(true);
        }}
      >
        <img src={ICONS.earthquakealert} alt="earthquake" />
      </button>
      <button
        title="LIVE flight"
        className={`${flight.flight ? 'opacity-on' : 'opacity-off'}`}
        onClick={() => {
          flight.setFlight(!flight.flight);
          earthquake.setAlert(false);
          visibility.setVisible('');
          setWeatherInformation(false);
        }}
      >
        <img src={ICONS.flightLogo} alt="flight" />
      </button>
      <button
        title="Weather"
        className={`${weatherInformation ? 'opacity-on' : 'opacity-off'}`}
        onClick={() => {
          setVisible('');
          setWeatherInformation(!weatherInformation);
          earthquake.setAlert(false);
          flight.setFlight(false);
          setOpen(true);
        }}
      >
        <img src={ICONS.cloudy} alt="weather" />
      </button>
      {weatherInformation && open && (
        <div className="knowtheweather">
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log(open);
              setOpen(false);
              setVisible('');
            }}
          >
            {BUTTON_TEXT.CLOSE}
          </button>
          <img src={ICONS.cloudy} alt="weather" />
          <span>{WEATHER_LABELS.WEATHER_TOOLTIP}</span>
        </div>
      )}
    </div>
  );
}

export default CustomZoom;

/*

*/
