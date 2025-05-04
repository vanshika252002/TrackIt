import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { updateAuthTokenRedux } from '../../Store/Common';
import { auth } from '../../Components/firebase';
import './confirmation.css';
import { ICONS } from '../../assets';

interface Props {
  setLogout: (value: boolean) => void;
}
function Confirmation({ setLogout }: Props) {
  const dispatch = useDispatch();
  console.log('confirmation');
  return (
    <div className="place-order-container">
      <div className="place-order">
        <img src={ICONS.powerbtn} />
        <h2> Sign out </h2>
        <span className="place-order-span">
          Signing out will end your session <br />
          Are you sure you want to sign out?
        </span>
        <div className="confirm">
          <button
            onClick={() => {
              signOut(auth);
              dispatch(updateAuthTokenRedux({ token: null }));
            }}
            className="place-order-btn1"
          >
            Confirm
          </button>
          <button className="place-order-btn2" onClick={() => setLogout(false)}>
            Cancel
          </button>
        </div>
        <br />
      </div>
    </div>
  );
}
export default Confirmation;
