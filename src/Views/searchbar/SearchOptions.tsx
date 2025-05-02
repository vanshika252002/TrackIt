import { SearchbarProps } from './Types/types';
import './searchoptions.css';
import { ICONS } from '../../assets';

function SearchBar({
  setVisible,
  setSelectedLocation,
  setWeatherInformation,
  setClickedLocation,
}: SearchbarProps) {
  return (
    <div className="searchbar-wrapper">
      <div className="search_shortcuts">
        <div className="search-shortcut-span">
          <span>SHORTCUTS TO FIND</span>
        </div>
        <div className="search-shortcut-btn">
          <button
            onClick={() => {
              setVisible('');
            }}
          >
            x
          </button>
        </div>
      </div>

      <div className="searchbar-options">
        <ul
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <li
            onClick={() => {
              console.log('weather searchbar');
              setVisible('weather');
              setSelectedLocation(null), setClickedLocation(null);
            }}
          >
            <img src={ICONS.weather} />
            Weather
          </li>
          <li
            onClick={() => {
              setVisible('flight-by-route');
              setClickedLocation(null);
            }}
          >
            <img src={ICONS.flightroute} />
            Flight by route
          </li>
          <li
            onClick={() => {
              setVisible('live-flight');
              setClickedLocation(null);
            }}
          >
            <img src={ICONS.liveairplane} />
            LIVE flight by airplane
          </li>
          <li
            onClick={() => {
              setVisible('airports');
              setClickedLocation(null);
              setWeatherInformation(false);
            }}
          >
            <img src={ICONS.airports} /> Airports
          </li>
          <li
            onClick={() => {
              setVisible('nearby');
              setClickedLocation(null);
              setWeatherInformation(false);
            }}
          >
            <img src={ICONS.nearby} /> Nearby Flights
          </li>
        </ul>
      </div>
    </div>
  );
}
export default SearchBar;
