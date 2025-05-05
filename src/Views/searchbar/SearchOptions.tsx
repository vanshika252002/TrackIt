import { SearchbarProps } from './Types/types';
import './searchoptions.css';
import { ICONS } from '../../assets';

function SearchBar({
  setVisible,
  setSelectedLocation,

  setClickedLocation,
}: Readonly<SearchbarProps>) {
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

      <button
        className="searchbar-options"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          onClick={() => {
            console.log('weather searchbar');
            setVisible('weather');
            setSelectedLocation(null);
            setClickedLocation(null);
          }}
        >
          <img src={ICONS.weather} alt="weather" />
          <span>Weather</span>
        </button>
        <button
          onClick={() => {
            setVisible('flight-by-route');
            setClickedLocation(null);
          }}
        >
          <img src={ICONS.flightroute} alt="flight by route" />
          <span>Flight by route</span>
        </button>
        <button
          onClick={() => {
            setVisible('live-flight');
            setClickedLocation(null);
          }}
        >
          <img src={ICONS.liveairplane} alt="live" />
          <span>LIVE flight by airplane</span>
        </button>
        <button
          onClick={() => {
            setVisible('airports');
            setClickedLocation(null);
          }}
        >
          <img src={ICONS.airports} alt="Airports" />
          <span>Airports</span>
        </button>
        <button
          onClick={() => {
            setVisible('nearby');
            setClickedLocation(null);
          }}
        >
          <img src={ICONS.nearby} alt="Nearby Flights" />
          <span>Nearby Flights</span>
        </button>
      </button>
    </div>
  );
}
export default SearchBar;
