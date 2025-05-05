import { useState } from 'react';

import SearchBar from '../../Views/searchbar/SearchOptions';
import Weather from '../../Views/weather/Weather';
import FlightByRoute from '../../Views/flightbyroute';
import FlightInformation from '../../Views/flightinformation';
import Nearby from '../../Views/nearby';
import Airports from '../../Views/airports';
import AirportCountryFlights from '../../Views/airportcountryflights';
import Live from '../../Views/live';

import { Props } from './Types/types';
import { ICONS } from '../../assets';
import './header.css';
import Confirmation from '../../Views/confirmation';

function Header({
  setWeatherInformation,
  clickedLocation,
  setSelectedLocation,
  setFlight,
  setAlert,
  setClickedLocation,
  visible,
  setVisible,
  setFly,
  setFlyToTarget,
  selectedLocation,
}: Readonly<Props>) {
  const [logout, setLogout] = useState<boolean>(false);

  const [origin, setOrigin] = useState('');

  const handleLogout = () => {
    setLogout(true);
  };

  return (
    <div className="h1">
      <div className="h2">
        <img src={ICONS.trackitlive} alt="Header Logo" />
      </div>
      <div className="h5">
        <div className="refrence-to-options">
          <button
            className="h7"
            onClick={() => {
              setVisible('searchbar');
              setAlert(false);
            }}
          >
            {
              <div className="h3">
                <img src={ICONS.searching} alt="Search Icon" />
              </div>
            }
          </button>
          {visible == 'searchbar' && (
            <SearchBar
              setVisible={setVisible}
              setSelectedLocation={setSelectedLocation}
              setFlight={setFlight}
              setClickedLocation={setClickedLocation}
              setWeatherInformation={setWeatherInformation}
            />
          )}
          {visible == 'weather' && (
            <Weather
              setFlight={setFlight}
              clickedLocation={clickedLocation}
              setVisible={setVisible}
              setClickedLocation={setClickedLocation}
              setFly={setFly}
              setFlyToTarget={setFlyToTarget}
              setWeatherInformation={setWeatherInformation}
            />
          )}

          {visible == 'flight-by-route' && (
            <FlightByRoute
              setWeatherInformation={setWeatherInformation}
              setOrigin={setOrigin}
              setVisible={setVisible}
            />
          )}
          {visible == 'flight-details' && (
            <FlightInformation
              setFly={setFly}
              setFlyToTarget={setFlyToTarget}
              origin={origin}
              setVisible={setVisible}
              setFlight={setFlight}
              setSelectedLocation={setSelectedLocation}
              setClickedLocation={setClickedLocation}
              selectedLocation={selectedLocation}
            />
          )}
          {visible == 'nearby' && (
            <Nearby
              setFly={setFly}
              setFlyToTarget={setFlyToTarget}
              setSelectedLocation={setSelectedLocation}
              setClickedLocation={setClickedLocation}
              setFlight={setFlight}
              setVisible={setVisible}
              setWeatherInformation={setWeatherInformation}
              selectedLocation={selectedLocation}
            />
          )}
          {visible == 'airports' && (
            <Airports
              setVisible={setVisible}
              setOrigin={setOrigin}
              setWeatherInformation={setWeatherInformation}
            />
          )}
          {visible == 'airport-by-code' && (
            <AirportCountryFlights
              origin={origin}
              setVisible={setVisible}
              setSelectedLocation={setSelectedLocation}
              setFlight={setFlight}
              setFly={setFly}
              setFlyToTarget={setFlyToTarget}
              setClickedLocation={setClickedLocation}
              selectedLocation={selectedLocation}
            />
          )}

          {visible == 'live-flight' && (
            <Live
              setVisible={setVisible}
              setSelectedLocation={setSelectedLocation}
              setClickedLocation={setClickedLocation}
              setFlight={setFlight}
              setFly={setFly}
              setFlyToTarget={setFlyToTarget}
              setWeatherInformation={setWeatherInformation}
              selectedLocation={selectedLocation}
            />
          )}
        </div>
        <div className="h4">
          <button onClick={handleLogout}>Logout</button>
        </div>
        {logout && <Confirmation setLogout={setLogout} />}
      </div>
    </div>
  );
}

export default Header;
