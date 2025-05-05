import { useEffect, useState, useMemo } from 'react';
import { useLazyGetAllFlightsQuery } from '../../Services/Api/liveflight';

import Loading from '../loading';

import { NearbyFlight, Details } from './Types/types';
import { Props } from '../live/Types/types';
import { getDistanceFromLatLonInKm } from './Util/Util';
import { ICONS } from '../../assets';
import './nearby.css';

function Nearby({
  selectedLocation,
  setWeatherInformation,
  setVisible,
  setSelectedLocation,
  setFlight,
  setFly,
  setFlyToTarget,
  setClickedLocation,
}: Readonly<Props>) {
  const selectedFlightId = selectedLocation?.id ?? null;
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [trigger, { data: liveflight, isLoading: flightLoading }] =
    useLazyGetAllFlightsQuery();
  const FlightDetails = liveflight?.states || null;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        setLoading(false);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMsg(
              'Unable to access your location. Please enable location permission.'
            );
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMsg('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setErrorMsg('The request to get your location timed out.');
            break;
        }
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    if (lat !== null && lon !== null) {
      trigger(null);
    }
  }, [lat, lon, trigger]);

  const nearbyFlights = useMemo(() => {
    if (!FlightDetails || lat === null || lon === null) return [];
    return FlightDetails.map((details: Details) => {
      const flightLat = details[6];
      const flightLon = details[5];
      if (!flightLat || !flightLon) return null;
      const distance = getDistanceFromLatLonInKm(
        lat,
        lon,
        flightLat,
        flightLon
      );
      return distance <= 500 ? { details, distance } : null;
    })
      .filter(Boolean)
      .sort((a: NearbyFlight, b: NearbyFlight) => a.distance - b.distance);
  }, [FlightDetails, lat, lon]);

  if (errorMsg) {
    return (
      <div className="near-by-wrappper">
        <div className="near-by-header">
          <div className="near-by-f1">
            <button
              onClick={() => {
                setVisible('searchbar');
                setFlight(false);
                setSelectedLocation(null);
                setClickedLocation(null);
              }}
            >
              x
            </button>
          </div>
          <div className="near-by-f2">
            <span>Nearby</span>
          </div>
        </div>

        {loading && <p>Getting your location...</p>}
      </div>
    );
  }

  return (
    <div className="near-by-wrappper">
      <div className="near-by-header">
        {flightLoading && <Loading />}
        <div className="near-by-f1">
          <button
            onClick={() => {
              setVisible('searchbar');
              setFlight(false);
              setSelectedLocation(null);
              setClickedLocation(null);
            }}
          >
            <img src={ICONS.arrow} alt="" />
          </button>
        </div>
        <div className="near-by-f2">
          <span>Nearby Flights</span>
        </div>

        <div className="near-by-f1">
          <button
            onClick={() => {
              setClickedLocation(null);
              setVisible('');
              setFlight(false);
              setSelectedLocation(null);
            }}
          >
            x
          </button>
        </div>
      </div>

      {liveflight?.states === null && (
        <div className="fi-no-results"> Data is not Available right now </div>
      )}
      {!flightLoading && nearbyFlights.length === 0 && lat && lon && (
        <div className="near-by-lit-wrapper">
          <p>No nearby flights found within 500 km.</p>
        </div>
      )}
      {nearbyFlights.length > 0 && (
        <div className="near-by-list-wrapper">
          {nearbyFlights.map(({ details, distance }: any) => (
            <div
              key={details[0]}
              className={`nearby${
                selectedFlightId === details[0] ? 'selected-flight' : ''
              }`}
            >
              <div className="n11">
                <h2>{details[2]}</h2>
              </div>

              <div className="n1">
                <div className="n2">
                  <span>ICAO Code</span>
                </div>
                <div className="n3">
                  <span>{details[0]}</span>
                </div>
              </div>
              <div className="n1">
                <div className="n2">
                  <span>Latitude</span>
                </div>
                <div className="n3">
                  <span>{details[6]}</span>
                </div>
              </div>
              <div className="n1">
                <div className="n2">
                  <span>Longitude</span>
                </div>
                <div className="n3">
                  <span>{details[5]}</span>
                </div>
              </div>
              <div className="n1">
                <div className="n2">
                  <span>Velocity</span>
                </div>
                <div className="n3">
                  <span>{details[9]}</span>
                </div>
              </div>
              <div className="n1">
                <div className="n2">
                  <span className="n4">Distance (km):</span>
                </div>
                <div className="n3">
                  <span className="n4">{distance.toFixed(2)}</span>
                </div>
              </div>
              <div className="acc-btn">
                <button
                  onClick={() => {
                    const isAlreadySelected = selectedFlightId === details[0];

                    if (isAlreadySelected) {
                      setSelectedLocation(null);
                    } else {
                      setClickedLocation(null);
                      setSelectedLocation({
                        lat: details[6],
                        lon: details[5],
                        id: details[0],
                        angle: details[10],
                        origin: details[2],
                      });
                      setFlight(true);
                      setFly(true);
                      setFlyToTarget([details[6], details[5]]);
                    }
                    setWeatherInformation(false);
                  }}
                >
                  <img src={ICONS.showonmap} alt="" />
                  <span>Show on Map</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Nearby;
