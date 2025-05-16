import { useGetAllFlightsQuery } from '../../Services/Api/liveflight';
import { FLIGHT_LABELS } from '../../Views';
import { Props, Details } from './Types/types';
import './searching.css';

function Searching({ chooseOption }: Readonly<Props>) {
  const { searching } = chooseOption;
  const { searchedData, setSearchingVisible } = searching;
  const place = searchedData.trim().toLowerCase();
  console.log('place is', place);

  const { data: flightData } = useGetAllFlightsQuery(null);
  console.log('flight data is', flightData);

  const matchingFlights = flightData?.states?.filter((details: Details) =>
    details[2]?.toLowerCase().includes(place)
  );

  return (
    <div className="near-by-wrappper">
      <div className="near-by-header">
        <div className="near-by-f1">
          <button onClick={() => setSearchingVisible(false)}>x</button>
        </div>
        <div className="near-by-f2">
          <span>{FLIGHT_LABELS.TITLE}</span>
        </div>
      </div>

      <div className="near-by-list-wrapper">
        {matchingFlights?.map((details: Details) => (
          <div className="nearby" key={details[0]}>
            <div className="n11">
              <h2>{details[2]}</h2>
            </div>

            <div className="n1">
              <div className="n2">
                <span>{FLIGHT_LABELS.ICAO_CODE_LABEL}</span>
              </div>
              <div className="n3">
                <span>{details[0]}</span>
              </div>
            </div>
            <div className="n1">
              <div className="n2">
                <span>{FLIGHT_LABELS.LATITUDE_LABEL}</span>
              </div>
              <div className="n3">
                <span>{details[5]}</span>
              </div>
            </div>
            <div className="n1">
              <div className="n2">
                <span>{FLIGHT_LABELS.LONGITUDE_LABEL}</span>
              </div>
              <div className="n3">
                <span>{details[6]}</span>
              </div>
            </div>
            <div className="n1">
              <div className="n2">
                <span>{FLIGHT_LABELS.VELOCITY}</span>
              </div>
              <div className="n3">
                <span>{details[9]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Searching;
