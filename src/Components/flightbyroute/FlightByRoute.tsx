import { useState } from 'react';

import { RouteProps } from './Types/types';
import { ICONS } from '../../assets';
import './flightbyroute.css';
import { BUTTON_TEXT, FLIGHT_LABELS } from '../../Views';

function FlightByRoute({
  setWeatherInformation,
  setVisible,
  setOrigin,
}: Readonly<RouteProps>) {
  const [originInput, setOriginInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setOriginInput(value);
    setOrigin(value);
    setWeatherInformation(false);
  };

  const handleSearch = () => {
    if (originInput.trim() !== '') {
      setVisible('flight-details');
    }
  };

  return (
    <div className="flight-by-route-wrappper">
      <div className="flight-by-route-header">
        <div className="f1">
          <button
            aria-label="Close Flight By Route"
            onClick={() => {
              setVisible('searchbar');
            }}
          >
            <img src={ICONS.arrow} alt={BUTTON_TEXT.BACK} />
          </button>
        </div>
        <div className="f2">
          <span>{FLIGHT_LABELS.FLIGHT_BY_ROUTE}</span>
        </div>
        <div className="near-by-f1">
          <button onClick={() => setVisible('')}>{BUTTON_TEXT.CLOSE}</button>
        </div>
      </div>
      <div className="flight-by-route">
        <div className="flight-by-route-origin">
          <span>{FLIGHT_LABELS.ORIGIN}</span>
        </div>
      </div>
      <div className="flight-by-route-search">
        <input
          type="text"
          value={originInput}
          onChange={handleInputChange}
          placeholder="Enter country"
        />
      </div>
      <div className="flight-by-route-search">
        <button onClick={handleSearch} disabled={!originInput.trim()}>
          {FLIGHT_LABELS.SEARCH}
        </button>
      </div>
    </div>
  );
}

export default FlightByRoute;
