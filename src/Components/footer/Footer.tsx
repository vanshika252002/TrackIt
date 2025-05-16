import { FooterProps } from './Types/types';
import { ICONS } from '../../assets';
import './footer.css';
import { EARTHQUAKE_UI } from '../../Views';

function Footer({
  setAlert,
  setFlight,
  setVisible,
  setFly,
  setClickedLocation,
  setWeatherInformation,
  setTriggerApi,
}: Readonly<FooterProps>) {
  return (
    <div className="footer">
      <button
        className="mini-map-option2"
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
        <button
          onClick={() => {
            setVisible('earthquake-list');
            setAlert(true);
          }}
        >
          <img src={ICONS.earthquake} alt="" />
          <span>{EARTHQUAKE_UI.TITLE}</span>
        </button>
      </button>
    </div>
  );
}
export default Footer;
