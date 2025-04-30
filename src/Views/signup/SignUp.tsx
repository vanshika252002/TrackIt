import React,{useState} from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../Shared/Constants';
import {
  validationSchema,
  handleSignUpSubmit,
  initialValues,
} from '../../Shared/signup';
import { Button, FormInput } from '../../Components/Common';
import useSignUp from './hooks/useSignUp';
import { ICONS } from '../../assets';
import { DATA } from '../index';
import './signup.css';

const SignUp: React.FC = () => {
  const { handleGoogleSignIn } = useSignUp();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); 

  return (
    <div className="signup-wrapper-component">
      <div className="login-image">
        <img src={ICONS.login} alt="Login" />
      </div>

      <div className={DATA.FormContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) =>
            handleSignUpSubmit(values, actions, navigate)
          }
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className={DATA.Form}>
              <h1>{DATA.SignUp}</h1>

              <FormInput
                name={DATA.Email}
                type="email"
                label="Email"
                value={values.email}
                onChange={(e) => {
                  const trimmedValue = e.target.value.trim();
                  console.log('trimmed', trimmedValue);
                  setFieldValue('email', trimmedValue);
                }}
              />

             
              <FormInput
              name={DATA.Password}
              type="password"
              label="Password"
              value={values.password}
              onChange={(e) => {
                const noStartingSpaces = e.target.value.replace(/^\s+/, '');
                setFieldValue('password', noStartingSpaces);
              }}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              enableToggle={true} 
            />

              <FormInput
                name={DATA.ConfirmPassword}
                type="password"
                label="Confirm Password"
                value={values.confirmPassword}
                onChange={(e) => {
                  const noStartingSpaces = e.target.value.replace(/^\s+/, '');
                  setFieldValue('confirmPassword', noStartingSpaces);
                }}
              />

              <Button
                label={DATA.SignUp}
                type="submit"
                showImage={false}
                className="signup-form-btn"
                disabled={isSubmitting}
              />

              <div className={DATA.OrDivider}>{DATA.Or}</div>

              <button
                type="button"
                className="signup-form-btn1"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
              >
                <img src={ICONS.google} alt="Google Icon" />
                <span>Sign up with Google</span>
              </button>

              <p>
                {DATA.AlreadyHave}
                <button
                  type="button"
                  className="login-signup-btn"
                  onClick={() => navigate(ROUTES.LOGIN)}
                  style={{ color: '#007bff' }}
                >
                  Sign in
                </button>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;