import { useGetAllFlightsQuery } from '../../Services/Api/liveflight';
import { Props, Details } from './Types/types';
import './searching.css';

function Searching({ chooseOption }: Props) {
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
          <span>Flights</span>
        </div>
      </div>

      {/* {isLoading  && <div className='near-by-loading'> Loading....</div>} */}

      <div className="near-by-list-wrapper">
        {matchingFlights?.map((details: Details) => (
          <div className="nearby">
            <div className="n11">
              <h2>{details[2]}</h2>
            </div>

            <div className="n1">
              <div className="n2">
                <span>Icao Code :</span>
              </div>
              <div className="n3">
                <span>{details[0]}</span>
              </div>
            </div>
            <div className="n1">
              <div className="n2">
                <span>Latitude :</span>
              </div>
              <div className="n3">
                <span>{details[5]}</span>
              </div>
            </div>
            <div className="n1">
              <div className="n2">
                <span>Longitude :</span>
              </div>
              <div className="n3">
                <span>{details[6]}</span>
              </div>
            </div>
            <div className="n1">
              <div className="n2">
                <span>Velocity :</span>
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
