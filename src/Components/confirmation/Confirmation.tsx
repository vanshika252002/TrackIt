import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { updateAuthTokenRedux } from '../../Store/Common';
import { auth } from '../../Components/firebase';
import { CONFIRMATION_LABELS } from '../../Views';
import './confirmation.css';
import { ICONS } from '../../assets';

interface Props {
  setLogout: (value: boolean) => void;
}
function Confirmation({ setLogout }: Readonly<Props>) {
  const dispatch = useDispatch();
  return (
    <div className="place-order-container">
      <div className="place-order">
        <img src={ICONS.powerbtn} alt="powerbtn" />
        <h2>{CONFIRMATION_LABELS.SIGN_OUT_TITLE}</h2>
        <span className="place-order-span">
          {CONFIRMATION_LABELS.SIGN_OUT_DESCRIPTION_LINE1} <br />
          {CONFIRMATION_LABELS.SIGN_OUT_DESCRIPTION_LINE2}
        </span>
        <div className="confirm">
          <button
            onClick={() => {
              signOut(auth);
              dispatch(updateAuthTokenRedux({ token: null }));
            }}
            className="place-order-btn1"
          >
            {CONFIRMATION_LABELS.CONFIRM_BUTTON}
          </button>
          <button className="place-order-btn2" onClick={() => setLogout(false)}>
            {CONFIRMATION_LABELS.CANCEL_BUTTON}
          </button>
        </div>
        <br />
      </div>
    </div>
  );
}
export default Confirmation;
