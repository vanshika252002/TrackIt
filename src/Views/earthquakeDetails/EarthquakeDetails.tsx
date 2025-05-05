import { Earthquake } from './Types/types';
import './EarthquakeDetails.css';

function EarthquakeDetails({
  place,
  time,
  lat,
  lon,
  setSelectedEarthquake,
  depth,
}: Readonly<Earthquake>) {
  console.log('displayed');
  return (
    <div className="earthquake-details-wrapper">
      <div className="earthquake-content-header">{place}</div>
      <div className="details-in-body">
        <div className="time-detail">
          <div className="time">
            <h5>Time</h5>
          </div>
          <div className="time-content">
            <h5>{time}</h5>
          </div>
        </div>
        <div className="location-detail">
          <div className="location">
            <h5>Location</h5>
          </div>
          <div className="location-content">
            <h5>{`${lat} ${lon}`}</h5>
          </div>
        </div>
        <div className="depth-detail">
          <div className="depth">
            <h5>Depth</h5>
          </div>
          <div className="depth-content">
            <h5>{depth}</h5>
          </div>
        </div>
        <div className="close">
          <button
            onClick={() => {
              setSelectedEarthquake(null);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
export default EarthquakeDetails;
