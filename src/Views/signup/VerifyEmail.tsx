
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../Components/firebase';
import { useDispatch } from 'react-redux';
import { updateAuthTokenRedux} from '../../Store/Common';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkEmailVerification = async () => {
    const user = auth.currentUser;
    if (user) {
      await user.reload();
      if (user.emailVerified) {
        const token = await user.getIdToken();
        dispatch(updateAuthTokenRedux({ token }));
        navigate('/home');
      } else {
        toast.error('Please verify your email first.');
      }
    } else {
      toast.error('Please Sign up .');
      navigate('/signup');
    }
  };

  return (
   <div className='verify'>
     <div className='verification'>
      <h2>Verify Your Email</h2><br/>

      <p>Please check your inbox and click the verification link.</p>

      <button onClick={checkEmailVerification}>Done</button>
      <button onClick={()=>navigate('/login')}>Sign in</button>
    </div>
   </div>
  );
};

export default VerifyEmail;
