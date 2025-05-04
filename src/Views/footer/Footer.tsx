import { FooterProps } from './Types/types';
import { ICONS } from '../../assets';
import './footer.css';

function Footer({
  setAlert,
  setFlight,
  setVisible,
  setFly,
  setClickedLocation,
  setWeatherInformation,
  setTriggerApi,
}: FooterProps) {
  return (
    <div
      className="footer"
      onClick={(e) => {
        e.stopPropagation();
        setTriggerApi(true);
        setFlight(false);
        setFly(false);
        setClickedLocation(null);
        setWeatherInformation(false);
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div
        className="mini-map-option2"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            setAlert(true);
            setVisible('earthquake-list');
          }}
        >
          <img src={ICONS.earthquake} />
          <span>Earthquake</span>
        </button>
      </div>
    </div>
  );
}
export default Footer;
