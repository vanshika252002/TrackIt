import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFlights } from '../../../Store/flight';
import * as L from 'leaflet';
import { Tooltip } from 'react-leaflet';
import FlyToTarget from './FlightToTarget';

import {
  MapContainer,
  useMapEvents,
  TileLayer,
  Popup,
  Marker,
} from 'react-leaflet';

import MarkerClusterGroup from 'react-leaflet-cluster';
import { useLazyGetWeatherByCoordsQuery } from '../../../Services/Api/weather';
import MiniMapControl from '../../../Views/minimapview/MiniMapView';

import { useGetAllFlightsQuery } from '../../../Services/Api/liveflight';
import { ICONS } from '../../../assets';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './body.css';
import Footer from '../../../Views/footer/Footer';
import 'leaflet-rotatedmarker';

import { useLazyGetEarthquakesQuery } from '../../../Services/Api/earthquake';
import CustomZoom from '../../../Views/customZoom/CustomZoom';
import Earthquake from '../../../Views/earthquake/Earthquake';

import { useLazyGetGeolocationByLatLngQuery } from '../../../Services/Api/geolocation';
import {
  EarthquakeFeature,
  Props,
  Details,
  WeatherData,
  GeolocationData,
} from './Types/Types';
import Loading from '../../../Views/loading';

const createFlightIcon = (fillColor: string, size = 38) =>
  new L.DivIcon({
    className: 'my-custom-marker-class',
    html: `
      <div>
        <svg xmlns="http://www.w3.org/2000/svg"
          width="${size}" height="${size}"
          viewBox="0 0 24 24">
          <path fill="${fillColor}" d="M21 16v-2l-8-5V3.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V9L3 14v2l8-1.5v3L9.5 19v1l2.5-.5 2.5.5v-1L13 17.5v-3L21 16z"/>
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });

const EarthquakeAlert = new Icon({
  iconUrl: ICONS.earthquakealert,
  iconAnchor: [20, 20],
  iconSize: [38, 38],
});
const MapClickHandler = ({ setClickedLocation }: any) => {
  useMapEvents({
    click(e) {
      setClickedLocation([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};
const Body = ({
  weatherInformation,
  setWeatherInformation,
  selectedLocation,
  setSelectedLocation,
  clickedLocation,
  setClickedLocation,
  flight,
  setFlight,
  alert,
  setAlert,
  visible,
  setVisible,
  setFlyToTarget,
  flyToTarget,

  setFly,
}: Props) => {
  const dispatch = useDispatch();

  const chooseOption = {
    flight: { flight, setFlight },
    earthquake: { alert, setAlert },
    visibility: { setVisible },
  };

  const [loadingMap, setLoadingMap] = useState<boolean>(true);

  const [startTime, setStartTime] = useState<string | null>('2025-03-01'); //forearthquake
  const [endTime, setEndTime] = useState<string | null>('2025-04-01');
  const [clickedLocationEarthquake, setClickedLocationEarthquake] = useState<
    [number, number, string, number] | null
  >(null);

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [geo, setGeo] = useState<GeolocationData | null>(null);

  const [popupLoading, setPopupLoading] = useState(false);

  const [triggerWeather] = useLazyGetWeatherByCoordsQuery();
  const [triggerGeolocation] = useLazyGetGeolocationByLatLngQuery();

  const { data: liveflight, isLoading: loadingFlights } = useGetAllFlightsQuery(
    null,
    { pollingInterval: 60000 }
  );

  const FlightDetails = liveflight?.states || null;

  const [triggerEarthquakeQuery, { data: earthquakeData }] =
    useLazyGetEarthquakesQuery();

  useEffect(() => {
    if (liveflight?.states) {
      dispatch(setFlights(liveflight.states));
    }
  }, [liveflight]);

  useEffect(() => {
    if (startTime && endTime) {
      if (alert || visible === 'earthquake-list') {
        triggerEarthquakeQuery({ startTime, endTime });
        setClickedLocationEarthquake(null);
      }
    }
  }, [startTime, endTime, alert, visible, triggerEarthquakeQuery]);
  //console.log("earthquakeData",earthquakeData);
  // console.log('selected angle is', selectedLocation?.angle);

  useEffect(() => {
    if (clickedLocation) {
      console.log('Clicked at:', clickedLocation);
    }
  }, [clickedLocation]);

  useEffect(() => {
    console.log('times');
    if (clickedLocation) {
      const [lat, lon] = clickedLocation;
      setWeather(null);
      setGeo(null);
      setPopupLoading(true);

      Promise.all([
        triggerWeather({ lat, lon }).unwrap(),
        triggerGeolocation({ lat, lng: lon }).unwrap(),
      ])
        .then(([weatherRes, geoRes]) => {
          setWeather(weatherRes);
          setGeo(geoRes);
        })
        .catch(console.error)
        .finally(() => {
          setPopupLoading(false);
        });
    }
  }, [clickedLocation]);

  useEffect(() => {
    if (selectedLocation && FlightDetails) {
      const updated = FlightDetails.find(
        (details: Details) => details[0] === selectedLocation.id
      );

      if (updated) {
        setSelectedLocation({
          id: updated[0],
          lat: updated[6],
          lon: updated[5],
          angle: updated[10],
          origin: updated[2],
        });
      } else {
        setSelectedLocation(null);
      }
    }
  }, [FlightDetails]);

  return (
    <div className="linear-gradient-body">
      <MapContainer
        className="leaf1"
        center={[20.5937, 78.9629] as [number, number]}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        minZoom={2}
        maxBounds={[
          [85, -180],
          [-85, 180],
        ]}
        maxBoundsViscosity={1.0}
        whenReady={() => {
          setLoadingMap(false);
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {weatherInformation && (
          <MapClickHandler setClickedLocation={setClickedLocation} />
        )}
        {loadingMap && (
          <div className="loading-overlay">
            <Loading />
          </div>
        )}
        <CustomZoom
          setVisible={setVisible}
          clickedLocation={clickedLocation}
          setClickedLocation={setClickedLocation}
          setSelectedLocation={setSelectedLocation}
          chooseOption={chooseOption}
          weatherInformation={weatherInformation}
          setWeatherInformation={setWeatherInformation}
        />
        <MarkerClusterGroup showCoverageOnHover={false}>
          {loadingFlights && <Loading />}
          {flight &&
            FlightDetails?.map((details: Details) => {
              const isSelected = selectedLocation?.id === details[0];

              if (isSelected) return null;

              if (details[5] !== null && details[6] !== null) {
                return (
                  <Marker
                    key={details[0]}
                    position={[details[6], details[5]]}
                    icon={createFlightIcon('green', 42)}
                    rotationAngle={details[10] || 0}
                    rotationOrigin="center center"
                    eventHandlers={{
                      click: () => {
                        setSelectedLocation({
                          id: details[0],
                          lat: details[6],
                          lon: details[5],
                          angle: details[10],
                          origin: details[2],
                        }),
                          setClickedLocation(null);
                      },
                    }}
                  >
                    <Tooltip>
                      <strong>Origin:</strong>
                      {details[2]}
                      <br />
                      <strong>ICAO code:</strong> {details[0]}
                      <br />
                    </Tooltip>
                  </Marker>
                );
              }
              return null;
            })}
        </MarkerClusterGroup>

        {flyToTarget && <FlyToTarget flyToTarget={flyToTarget} />}

        {flight && selectedLocation?.lat && selectedLocation?.lon && (
          <Marker
            key={selectedLocation.id}
            position={[selectedLocation.lat, selectedLocation.lon]}
            icon={createFlightIcon('red', 42)}
            zIndexOffset={1000}
            rotationAngle={selectedLocation.angle || 0}
            rotationOrigin="center center "
          >
            <Tooltip permanent>
              <strong>Origin:</strong> {selectedLocation.origin} <br />
              <strong>ICAO code:</strong> {selectedLocation.id} <br />
            </Tooltip>
          </Marker>
        )}

        {alert && earthquakeData?.features && (
          <>
            <MarkerClusterGroup showCoverageOnHover={false}>
              {earthquakeData.features
                .filter(
                  (quake: EarthquakeFeature) =>
                    !clickedLocationEarthquake ||
                    quake.geometry.coordinates[1] !==
                      clickedLocationEarthquake[0] ||
                    quake.geometry.coordinates[0] !==
                      clickedLocationEarthquake[1]
                )
                .map((quake: EarthquakeFeature) => (
                  <Marker
                    key={quake.id}
                    position={[
                      quake.geometry.coordinates[1],
                      quake.geometry.coordinates[0],
                    ]}
                    icon={EarthquakeAlert}
                  >
                    <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                      <div className="earthquake-tooltip">
                        <strong>{quake.properties.place}</strong>

                        <p>Magnitude: {quake.properties.mag}</p>
                      </div>
                    </Tooltip>
                  </Marker>
                ))}
            </MarkerClusterGroup>

            {clickedLocationEarthquake && (
              <Marker
                position={[
                  clickedLocationEarthquake[0],
                  clickedLocationEarthquake[1],
                ]}
                icon={EarthquakeAlert}
              >
                <Tooltip
                  direction="top"
                  offset={[0, -10]}
                  opacity={1}
                  permanent
                >
                  <div className="earthquake-tooltip">
                    <strong>{clickedLocationEarthquake[2]}</strong>

                    <p>Magnitude: {clickedLocationEarthquake[3]}</p>
                  </div>
                </Tooltip>
              </Marker>
            )}
          </>
        )}
        {/* {fly && flyToTarget && <FlyToTarget flyToTarget={flyToTarget} />}  */}

        {weatherInformation && clickedLocation && (
          <Popup position={clickedLocation}>
            <div>
              {popupLoading ? (
                <div className="popup1">
                  <h2>Loading..</h2>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : weather && geo ? (
                <div className="popup">
                  <h2>
                    {geo?.results[0]?.annotations?.flag}{' '}
                    {geo?.results[0]?.components?.state}
                  </h2>
                  <br />
                  <span>
                    <strong>Weather:</strong> {weather.weather[0].description}
                  </span>
                  <br />
                  <span>
                    <strong>Temperature:</strong> {weather.main.temp}°C
                  </span>
                  <br />
                  <span>
                    <strong>Humidity:</strong> {weather.main.humidity}%
                  </span>
                  <br />
                  <span>
                    <strong>Wind Speed:</strong> {weather.wind.speed} m/s
                  </span>
                </div>
              ) : (
                <span>No data available.</span>
              )}
            </div>
          </Popup>
        )}

        <MiniMapControl />
      </MapContainer>

      <Footer
        setFly={setFly}
        setAlert={setAlert}
        setFlight={setFlight}
        setVisible={setVisible}
        setClickedLocation={setClickedLocation}
      />

      {visible === 'earthquake-list' && (
        <Earthquake
          setFly={setFly}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          startTime={startTime}
          endTime={endTime}
          setAlert={setAlert}
          setClickedLocationEarthquake={setClickedLocationEarthquake}
          setClickedLocation={setClickedLocation}
          setVisible={setVisible}
          setFlyToTarget={setFlyToTarget}
          visible={visible}
        />
      )}
    </div>
  );
};

export default Body;
