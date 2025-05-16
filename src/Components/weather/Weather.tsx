import { useEffect, useState } from 'react';
import { useLazyGetGeolocationByCoordsQuery } from '../../Services/Api/geolocation';

import Loading from '../loading';
import { useDebounce } from '../../Shared/Utils';
import { Input } from '../../Components/Common';

import { Weatherprops } from './Types/types';
import { ICONS } from '../../assets';
import './weather.css';
import { BUTTON_TEXT, WEATHER_LABELS } from '../../Views';
interface Location {
  formatted: string;
  geometry: {
    lat: number;
    lng: number;
  };
}

function Weather({
  setFlight,
  setWeatherInformation,
  setVisible,
  setClickedLocation,
  setFly,
  setFlyToTarget,
  clickedLocation,
}: Readonly<Weatherprops>) {
  const [city, setCity] = useState('');
  const [locations, setLocations] = useState([]);
  const debouncedCity = useDebounce(city, 400);
  const [selectedWeather, setSelectedWeather] = useState<Location | null>(null);
  const [triggerGeolocationQuery, { data, isLoading }] =
    useLazyGetGeolocationByCoordsQuery();
  useEffect(() => {
    const trimmedCity = debouncedCity.trim();
    if (trimmedCity.length >= 3) {
      triggerGeolocationQuery(trimmedCity);
    } else {
      setLocations([]);
    }
  }, [debouncedCity, triggerGeolocationQuery]);

  useEffect(() => {
    if (data?.results) {
      setLocations(data.results);
    } else {
      setLocations([]);
    }
    setClickedLocation(null);
    setSelectedWeather(null);
  }, [data]);

  useEffect(() => {
    if (clickedLocation) {
      console.log('workin fine', clickedLocation);
      setFlyToTarget([clickedLocation[0], clickedLocation[1]]);
    }
  }, [clickedLocation]);

  console.log('location', locations);
  const handleLocationClick = (location: any) => {
    if (
      selectedWeather &&
      selectedWeather.geometry.lat === location.geometry.lat &&
      selectedWeather.geometry.lng === location.geometry.lng
    ) {
      setSelectedWeather(null);
      setClickedLocation(null);
      setFly(false);
    } else {
      setSelectedWeather(location);
      setClickedLocation([location.geometry.lat, location.geometry.lng]);
      setFly(true);
    }
  };

  return (
    <div className="weather-container-wrapper">
      <div className="weather-btn">
        <button
          onClick={() => {
            setVisible('searchbar');
            setClickedLocation(null);
            setWeatherInformation(false);
          }}
        >
          {' '}
          <img src={ICONS.arrow} alt={BUTTON_TEXT.BACK} />
        </button>
        <div className="w1">
          <span>{WEATHER_LABELS.TITLE}</span>
        </div>
        <div className="near-by-f1">
          <button
            onClick={() => {
              setVisible('');
              setClickedLocation(null);
              setWeatherInformation(false);
            }}
          >
            {BUTTON_TEXT.CLOSE}
          </button>
        </div>
      </div>

      <div className="w2">
        <Input
          placeholder="Enter a place"
          onChange={(e) => {
            setFlight(false);
            setCity(e.target.value);
            console.log('g');
            setWeatherInformation(true);
          }}
        />
      </div>
      {isLoading && <Loading />}

      {!isLoading && debouncedCity && locations.length === 0 && (
        <div>{WEATHER_LABELS.LOCATION_NOT_FOUND}</div>
      )}

      <div className="locations-list">
        {locations.length > 0 && (
          <div>
            <h3>{WEATHER_LABELS.LOCATION_NOT_FOUND}</h3>{' '}
          </div>
        )}
        <div className="scroll-weather">
          {locations.map((location: any) => (
            <button
              key={`${location.geometry.lat}-${location.geometry.lng}`}
              className={`custom-item${selectedWeather && selectedWeather.geometry.lat === location.geometry.lat && selectedWeather.geometry.lng === location.geometry.lng ? 'selected' : ''}`}
              onClick={() => handleLocationClick(location)}
            >
              <div className="Location">
                <strong>{location.formatted}</strong>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Weather;
