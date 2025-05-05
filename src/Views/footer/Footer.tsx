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
        setVisible('earthquake-list');
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div
        className="mini-map-option2"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            setVisible('earthquake-list');
            setAlert(true);
          }}
        >
          <img src={ICONS.earthquake} alt="" />
          <span>Earthquake</span>
        </button>
      </div>
    </div>
  );
}
export default Footer;
