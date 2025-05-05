import { useMemo, useState, useEffect } from 'react';
import { useGetAllFlightsQuery } from '../../Services/Api/liveflight';

import { FlightData, Props } from './Types/types';
import { ICONS } from '../../assets';
import './live.css';

function Live({
  setWeatherInformation,
  setVisible,
  setFlight,
  setSelectedLocation,
  setFly,
  setFlyToTarget,
  setClickedLocation,
  selectedLocation,
}: Props) {
  const selectedFlightId = selectedLocation?.id ?? null;

  const { data: LiveFlights } = useGetAllFlightsQuery(null);
  const [expandedIcao, setExpandedIcao] = useState<string | null>(null);

  const toggleAccordion = (icaoCode: string) => {
    setExpandedIcao((prev) => (prev === icaoCode ? null : icaoCode));
  };

  const flightsByOrigin = useMemo<Record<string, FlightData[]>>(() => {
    if (!LiveFlights?.states) return {};

    const groupedFlights = LiveFlights.states.reduce(
      (acc: Record<string, FlightData[]>, flight: any[]) => {
        const [icao, , originCountry, , , lon, lat, alt, , , angle] = flight;

        if (originCountry && !acc[originCountry]) {
          acc[originCountry] = [];
        }

        if (originCountry) {
          acc[originCountry].push({
            icao,
            lon,
            lat,
            alt,
            angle,
            originCountry,
          });
        }

        return acc;
      },
      {}
    );

    const sortedGroupedFlights: Record<string, FlightData[]> = {};
    Object.keys(groupedFlights)
      .sort()
      .forEach((country) => {
        sortedGroupedFlights[country] = groupedFlights[country];
      });

    return sortedGroupedFlights;
  }, [LiveFlights]);

  useEffect(() => {
    if (!selectedLocation) {
      setExpandedIcao(null);
    } else {
      setExpandedIcao(selectedLocation.id);
    }
  }, [selectedLocation]);

  return (
    <div className="airport-wrappper-l1" onClick={(e) => e.stopPropagation()}>
      <div className="airport-header-l1">
        <div className="airport-f1-l1">
          <button
            onClick={() => {
              setVisible('searchbar');
              setFlight(false);
              setClickedLocation(null);
              setSelectedLocation(null);
            }}
          >
            <img src={ICONS.arrow} alt="" />
          </button>
        </div>
        <div className="airport-f2-l1">
          <span>Live Flights</span>
        </div>
        <div className="near-by-f1">
          <button
            onClick={() => {
              setVisible('');
              setClickedLocation(null);
              setSelectedLocation(null);
              setFlight(false);
            }}
          >
            x
          </button>
        </div>
      </div>

      {LiveFlights?.states == null && (
        <div className="near-by-lit-wrappers">
          <p>Data is not Available right now </p>
        </div>
      )}

      {LiveFlights?.states != null && (
        <div className="f12">
          {Object.entries(flightsByOrigin).map(([country, flights]) => (
            <div key={country} style={{ marginBottom: '20px' }} className="l1">
              <div className="l2">
                <span>{country}</span>{' '}
              </div>

              {flights.map(
                ({ icao, alt, lon, lat, angle, originCountry }: FlightData) => {
                  const isExpanded = expandedIcao === icao;
                  return (
                    <div key={icao} className="l3-wrapper">
                      <button
                        className={`l3${
                          selectedFlightId === icao ? 'open' : ''
                        }`}
                        onClick={() => toggleAccordion(icao)}
                      >
                        <strong> ICAO Code: {icao}</strong>
                        <div className="accordion-toggle-symbol">
                          <img src={ICONS.accordianLogo} alt="" />
                        </div>
                      </button>

                      <div className="acc-content-l1">
                        {isExpanded && !lat && !lon && (
                          <div className="accordion-content-l1">
                            <h2>No Live Flight</h2>
                          </div>
                        )}
                        {isExpanded && lat && lon && (
                          <div className="accordion-content-l1">
                            <div className="acc-btn">
                              <button
                                onClick={() => {
                                  const isAlreadySelected =
                                    selectedFlightId === icao;
                                  if (isAlreadySelected) {
                                    setSelectedLocation(null);
                                  } else {
                                    setClickedLocation(null);
                                    setSelectedLocation({
                                      lat,
                                      lon,
                                      id: icao,
                                      angle,
                                      origin: originCountry,
                                    });
                                    setFlight(true);
                                    setFly(true);
                                    setFlyToTarget([lat, lon]);
                                  }
                                  setWeatherInformation(false);
                                }}
                              >
                                <img src={ICONS.showonmap} alt="" />
                                <span>Show on Map</span>
                              </button>
                            </div>

                            <p>
                              <strong>ICAO Code:</strong> {icao}
                            </p>
                            <p>
                              <strong>Altitude:</strong> {alt}
                            </p>
                            <p>
                              <strong>Longitude:</strong> {lon}
                            </p>
                            <p>
                              <strong>Latitude:</strong> {lat}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Live;
