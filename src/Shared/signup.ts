import * as Yup from 'yup';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from 'firebase/auth';
import { FormikHelpers } from 'formik';
import {doc,setDoc} from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {auth,db} from '../Components/firebase';
import { DATA } from '../Views';

interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}
export const initialValues = { email: '', password: '', confirmPassword: '' };
export const validationSchema = Yup.object({
  email: Yup.string()
  .required('Email is required')
  .matches(
   /^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,6}$/,

    'Enter a valid email address'
  ),
  password: Yup.string()
  .required("Password is required")
  .matches(/^\S*$/, "Password cannot contain spaces")
  .min(6, "Password must have at least 6 characters")
  .max(10, 'Password cannot be more than 10 characters')
  .matches(/[A-Z]/, "Must contain at least one uppercase")
  .matches(/[a-z]/, "Must contain at least one lowercase")
  
  .matches(
    /[!@#$%^&*()<>?:"{}]/,
    "Must contain at least one special character"
  )
  .matches(/[0-9]/, "Must contain at least one number"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref(DATA.Password)], DATA.PasswordMatching)
    .required(DATA.ConfirmPasswordRequired),
});

export const handleSignUpSubmit = async (
  values: SignUpFormValues,
  { resetForm }: FormikHelpers<SignUpFormValues>,
  navigate: (path: string) => void
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    const { user } = userCredential;
    await sendEmailVerification(user);

    await setDoc(doc(db, "users", user.uid), {
        email: values.email,

      });




    toast.success('Signup successful. Please verify your email !', {
      position: 'top-right',
    });
    navigate('/verify-email');
  } catch (error: any) {
    console.error(error);
    if (error.code === 'auth/email-already-in-use') {
      toast.error('This email is already registered. Please log in.', {
        position: 'top-right',
      });
    } else {
      toast.error('Something went wrong. Please try again.', {
        position: 'top-right',
      });
    }
  }

  resetForm();
};
