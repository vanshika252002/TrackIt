import { useState } from 'react';
import { toast } from 'react-toastify';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../Components/firebase';

import { Button, Input } from '../../Components/Common';
import 'react-toastify/dist/ReactToastify.css';
import './forgot.css';
import { AUTH_MESSAGES, MESSAGES } from '..';
import { ICONS } from '../../assets';

function Forgot() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const handleForgotPassword = async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        toast.error(MESSAGES.EMAIL);
        return;
      }
      await sendPasswordResetEmail(auth, email.toLowerCase());
      toast.success(MESSAGES.PASSWORD);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        toast.error(MESSAGES.NO_ACCOUNT, {
          position: 'top-right',
        });
      }
    }
  };

  return (
    <div className="forgot-page-wrapper">
      <div className="login-image">
        <img src={ICONS.login} alt="" />
      </div>
      <div className="forgot-container">
        <div className="forgot-form">
          <h2>{AUTH_MESSAGES.PASSWORD_RESET}</h2>
        </div>
        <div className="forgot-label">
          <span>{AUTH_MESSAGES.RESET_PASSWORD_INSTRUCTION}</span>
        </div>
        <div className="forgot-input">
          <Input
            type="text"
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="forgot-button">
          <Button
            label="Login"
            className="b1"
            onClick={() => navigate('/login')}
          />
          <Button label="Send" className="b1" onClick={handleForgotPassword} />
        </div>
      </div>
    </div>
  );
}
export default Forgot;
