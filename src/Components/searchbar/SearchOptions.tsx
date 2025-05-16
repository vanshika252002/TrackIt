import { SearchbarProps } from './Types/types';
import './searchoptions.css';
import { ICONS } from '../../assets';
import { BUTTON_TEXT, SEARCHBAR_LABELS, WEATHER_LABELS } from '../../Views';

function SearchBar({
  setVisible,
  setSelectedLocation,

  setClickedLocation,
}: Readonly<SearchbarProps>) {
  return (
    <div className="searchbar-wrapper">
      <div className="search_shortcuts">
        <div className="search-shortcut-span">
          <span>{SEARCHBAR_LABELS.HEADER}</span>
        </div>
        <div className="search-shortcut-btn">
          <button
            onClick={() => {
              setVisible('');
            }}
          >
            {BUTTON_TEXT.CLOSE}
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
          <span>{WEATHER_LABELS.TITLE}</span>
        </button>
        <button
          onClick={() => {
            setVisible('flight-by-route');
            setClickedLocation(null);
          }}
        >
          <img src={ICONS.flightroute} alt="flight by route" />
          <span>{SEARCHBAR_LABELS.FLIGHT_BY_ROUTE}</span>
        </button>
        <button
          onClick={() => {
            setVisible('live-flight');
            setClickedLocation(null);
          }}
        >
          <img src={ICONS.liveairplane} alt="live" />
          <span>{SEARCHBAR_LABELS.LIVE_FLIGHT}</span>
        </button>
        <button
          onClick={() => {
            setVisible('airports');
            setClickedLocation(null);
          }}
        >
          <img src={ICONS.airports} alt="Airports" />
          <span>{SEARCHBAR_LABELS.AIRPORTS}</span>
        </button>
        <button
          onClick={() => {
            setVisible('nearby');
            setClickedLocation(null);
          }}
        >
          <img src={ICONS.nearby} alt="Nearby Flights" />
          <span>{SEARCHBAR_LABELS.NEARBY_FLIGHTS}</span>
        </button>
      </button>
    </div>
  );
}
export default SearchBar;
