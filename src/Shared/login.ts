import * as Yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { auth } from '../Components/firebase';
import 'react-toastify/dist/ReactToastify.css';
import { DATA } from '../Views';
import { updateAuthTokenRedux } from '../Store/Common';

interface ValuesLogin {
  email: string;
  password: string;
  rememberMe: boolean;
}



export const initialValues = {
  email: localStorage.getItem('userEmail') || '',
  password: localStorage.getItem('userPassword') || '',
  rememberMe: localStorage.getItem('userEmail') && localStorage.getItem('userPassword') ? true : false,
};

export const validationSchema = Yup.object({
  
  email: Yup.string()
        .required('Email is required')
        .matches(
        /^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,6}$/,
          'Enter a valid email address'
        ),
  password: Yup.string()
    .matches(/^\S*$/, "Password cannot contain spaces")
  
    .required(DATA.PasswordRequired),
});

export const onSubmit = async (
  values: ValuesLogin,
  { resetForm }: FormikHelpers<ValuesLogin>,
  dispatch: any
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    const token = await userCredential.user.getIdToken();
    dispatch(updateAuthTokenRedux({ token }));
    toast.success('Login successful! Welcome', { position: 'top-right' });

   
    if (values.rememberMe) {
      localStorage.setItem('userEmail', values.email); 
      localStorage.setItem('userPassword', values.password);  
    } else {
      localStorage.removeItem('userEmail');  
      localStorage.removeItem('userPassword');  
    }

    resetForm();
  } catch (error: any) {
    toast.error("Invalid Credential");

    
  }
};