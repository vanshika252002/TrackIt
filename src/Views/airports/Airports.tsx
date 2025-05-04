import { useGetGeolocationByCoordsQuery } from '../../Services/Api/geolocation';
import Loading from '../loading/Loading';
import { ICONS } from '../../assets';
import { Data, Airport } from './Types/types';
import './airports.css';

function Airports({ setVisible, setOrigin, setWeatherInformation }: Airport) {
  const { data: airports, isLoading } =
    useGetGeolocationByCoordsQuery('airport');

  const uniqueSortedCountries = Array.from(
    new Map(
      airports?.results?.map((item: Data) => [item.components.country, item])
    ).values() as Iterable<Data>
  ).sort((a, b) => a.components.country.localeCompare(b.components.country));

  return (
    <div className="airport-wrappper" onClick={(e) => e.stopPropagation()}>
      {isLoading && <Loading />}
      <div className="airport-header">
        <div className="airport-f1">
          <button
            onClick={() => {
              setVisible('searchbar');
            }}
          >
            <img src={ICONS.arrow} />
          </button>
        </div>
        <div className="airport-f2">
          <span>Airport By Country</span>
        </div>
        <div className="near-by-f1">
          <button onClick={() => setVisible('')}>x</button>
        </div>
      </div>
      <div className="airport-list-wrapper">
        {uniqueSortedCountries.map((item) => (
          <div className="airport" key={item.components.country}>
            <button
              className="airport-n1"
              onClick={() => {
                setOrigin(item.components.country);
                setWeatherInformation(false);
                setVisible('airport-by-code');
              }}
            >
              <div className="flag">
                <span>{item.annotations.flag}</span>
              </div>
              <div className="country">
                <span>{item.components.country}</span>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Airports;
