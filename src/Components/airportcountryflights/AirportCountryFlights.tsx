import { useState, useEffect } from 'react';
import { useGetAllFlightsQuery } from '../../Services/Api/liveflight';
import Loading from '../loading/Loading';

import { AirportCountryFlightsProps, Details } from './Types/types';
import { BUTTON_TEXT, FLIGHT_LABELS } from '../../Views/index';
import { ICONS } from '../../assets';
import './airportCountryFlights.css';

function AirportCountryFlights({
  selectedLocation,
  setClickedLocation,
  origin,
  setVisible,
  setSelectedLocation,
  setFlight,
  setFly,
  setFlyToTarget,
}: Readonly<AirportCountryFlightsProps>) {
  const [expandedIcao, setExpandedIcao] = useState<string | null>(null);
  const selectedFlightId = selectedLocation?.id ?? null;
  const toggleAccordion = (icaoCode: string) => {
    setExpandedIcao((prev) => (prev === icaoCode ? null : icaoCode));
  };

  const { data: flightData, isLoading } = useGetAllFlightsQuery(null);

  const filteredFlights = flightData?.states?.filter(
    (detail: Details) => origin.toLowerCase() === detail[2]?.toLowerCase()
  );
  useEffect(() => {
    if (!selectedLocation) {
      setExpandedIcao(null);
    } else {
      setExpandedIcao(selectedLocation.id);
    }
  }, [selectedLocation]);

  return (
    <div className="country-flight-wrappper">
      {isLoading && <Loading />}

      <div className="country-flight-header">
        <div className="country-flight-f1">
          <button
            onClick={() => {
              setVisible('airports');
              setFlight(false);
              setSelectedLocation(null);
              setClickedLocation(null);
            }}
          >
            <img src={ICONS.arrow} alt={BUTTON_TEXT.BACK} />
          </button>
        </div>
        <div className="country-flight-f2">
          <span>{FLIGHT_LABELS.COUNTRY_FLIGHTS}</span>
        </div>
        <div className="near-by-f1">
          <button
            onClick={() => {
              setVisible('');
              setFlight(false);
              setSelectedLocation(null);
              setClickedLocation(null);
            }}
          >
            {BUTTON_TEXT.CLOSE}
          </button>
        </div>
      </div>
      {filteredFlights?.length > 0 && (
        <div className="origin-name">
          <span>{origin}</span>
        </div>
      )}
      {flightData?.states == null && (
        <div className="near-by-lit-wrappers">
          <p>{FLIGHT_LABELS.DATA_NOT_AVAILABLE} </p>{' '}
        </div>
      )}

      {!isLoading && filteredFlights?.length === 0 && (
        <div className="no-flights-found">
          <p>
            {FLIGHT_LABELS.NO_FLIGHT_FOUND} <strong>{origin}</strong>.
          </p>
        </div>
      )}

      {filteredFlights?.length > 0 && (
        <div className="country-flight-list-wrapper">
          {filteredFlights?.map((detail: Details) => {
            const icaoCode = detail[0];
            const flightCountry = detail[2];
            const longitude = detail[5];
            const latitude = detail[6];
            const angle = detail[10];

            const isExpanded = expandedIcao === icaoCode;

            return (
              <div
                className={`airports${
                  selectedFlightId === icaoCode ? 'selected-flight' : ''
                }`}
                key={icaoCode}
              >
                <button
                  className={`airport-country-n1${
                    selectedFlightId === icaoCode ? 'selected-flight' : ''
                  }`}
                  onClick={() => {
                    toggleAccordion(icaoCode);
                  }}
                >
                  <div className="logo">
                    <img src={ICONS.airports} alt="airport icon" />
                  </div>
                  <div className="formatted">
                    <span>
                      {FLIGHT_LABELS.ICAO_CODE_LABEL} {icaoCode}
                    </span>
                  </div>
                  <div
                    className={`accordion-toggle-symbol ${isExpanded ? 'open' : ''}`}
                  >
                    <img src={ICONS.accordianLogo} alt="Expand" />
                  </div>
                </button>

                {isExpanded && (
                  <div>
                    <div className="accordion-content">
                      <div className="acc-btn">
                        <button
                          onClick={() => {
                            const isAlreadySelected =
                              selectedFlightId === icaoCode;

                            if (isAlreadySelected) {
                              setSelectedLocation(null);
                            } else {
                              setClickedLocation(null);
                              if (latitude !== null && longitude !== null) {
                                setSelectedLocation({
                                  lat: latitude,
                                  lon: longitude,
                                  id: icaoCode,
                                  angle: angle || 0,
                                  origin: flightCountry,
                                });
                                setFlight(true);
                                setFly(true);
                                setFlyToTarget([latitude, longitude]);
                              }
                            }
                          }}
                        >
                          <img src={ICONS.showonmap} alt="showOnMap" />
                          <span>{FLIGHT_LABELS.SHOW_ON_MAP}</span>
                        </button>
                      </div>
                      <div className="data-flight">
                        <p>
                          <strong>{FLIGHT_LABELS.ICAO_CODE_LABEL}</strong>
                          {icaoCode}
                        </p>
                        <p>
                          <strong>{FLIGHT_LABELS.COUNTRY_LABEL}</strong>
                          {flightCountry}
                        </p>
                        <p>
                          <strong>{FLIGHT_LABELS.LATITUDE_LABEL}</strong>
                          {latitude}
                        </p>
                        <p>
                          <strong>{FLIGHT_LABELS.LONGITUDE_LABEL}</strong>
                          {longitude}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}{' '}
        </div>
      )}
    </div>
  );
}

export default AirportCountryFlights;
