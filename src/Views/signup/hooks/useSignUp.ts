import {
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { updateAuthTokenRedux } from '../../../Store/Common';
import { db, auth } from '../../../Components/firebase';

const provider = new GoogleAuthProvider();

const useSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          name: user.displayName,
          createdAt: new Date(),
        });
      }

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        await signOut(auth);
        toast.success('Google signup successful! Please verify your email.');
        navigate('/login');
      } else {
        const token = await user.getIdToken();
        dispatch(updateAuthTokenRedux({ token }));

        toast.success('Google signup successful!');
        navigate('/home');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  return { handleGoogleSignIn };
};

export default useSignUp;
