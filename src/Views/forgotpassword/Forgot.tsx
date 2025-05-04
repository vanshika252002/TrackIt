import { useState } from 'react';
import { toast } from 'react-toastify';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';

// import { forgotPassword } from './Utils/forgot';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../Components/firebase';

import { Button, Input } from '../../Components/Common';
import 'react-toastify/dist/ReactToastify.css';
import './forgot.css';
import { ICONS } from '../../assets';

function Forgot() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const handleForgotPassword = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        toast.error('Email does not exist');
        return;
      }
      const data = await sendPasswordResetEmail(auth, email.toLowerCase());
      console.log('data of the sendpassword email is', data);
      toast.success('password reset link sent to your email');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        toast.error('no account found with this email', {
          position: 'top-right',
        });
      }
      console.log(error);
    }
  };

  console.log('ew');

  return (
    <div className="forgot-page-wrapper">
      <div className="login-image">
        <img src={ICONS.login} />
      </div>
      <div className="forgot-container">
        <div className="forgot-form">
          <h2>Reset your Password</h2>
        </div>
        <div className="forgot-label">
          <label>
            Enter your user account's verified email address and we will send
            you a password reset link.
          </label>
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
