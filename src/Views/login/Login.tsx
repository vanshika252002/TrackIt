import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../Shared/Constants';
import { Button, FormInput } from '../../Components/Common';
import { validationSchema, onSubmit, initialValues } from '../../Shared/login';

import useLogin from './hooks/useLogin';
import { DATA } from '../index';

import { ICONS } from '../../assets';
import './login.css';

const Login: React.FC = () => {
  const { handleGoogleLogin } = useLogin();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formValues, setFormValues] = useState(initialValues);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail') || '';
    const storedPassword = localStorage.getItem('userPassword') || '';
    const rememberMe = !!(storedEmail && storedPassword);
    setFormValues({
      email: storedEmail,
      password: storedPassword,
      rememberMe,
    });
  }, []);
  return (
    <div className="login-wrapper-component">
      <div className="login-image">
        <img src={ICONS.login} alt="Login" />
      </div>
      <div className="signup-container">
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={(values, formikHelpers) =>
            onSubmit(values, formikHelpers, dispatch)
          }
        >
          {({ values, setFieldValue }) => (
            <Form className={DATA.Form}>
              <h1>Sign in</h1>

              <FormInput
                type={DATA.Email}
                name={DATA.Email}
                label="Email"
                value={values.email}
                onChange={(e) => {
                  const noStartingSpaces = e.target.value.replace(/^\s+/, '');
                  setFieldValue('email', noStartingSpaces);
                }}
              />

              <FormInput
                type="password"
                name={DATA.Password}
                label="Password"
                value={values.password}
                onChange={(e) => {
                  const noStartingSpaces = e.target.value.replace(/^\s+/, '');
                  setFieldValue('password', noStartingSpaces);
                }}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                enableToggle
              />

              <div className="remember-me-container">
                <input
                  type="checkbox"
                  id="remeberMe"
                  name="rememberMe"
                  className="remember-me-checkbox"
                  checked={values.rememberMe}
                  onChange={(e) => {
                    setFieldValue('rememberMe', e.target.checked);
                  }}
                />
                <label className="remember-me-label" htmlFor="remeberMe">
                  Remember Me
                </label>
              </div>

              <Button
                label="Sign in"
                type={DATA.Submit as any}
                showImage={false}
                className="signup-form-btn"
              />

              <div className={DATA.OrDivider}>{DATA.Or}</div>

              <button
                className="signup-form-btn1"
                type="button"
                onClick={handleGoogleLogin}
              >
                <img src={ICONS.google} alt="Google Login" />{' '}
                <span>Sign in with Google</span>
              </button>

              <p>
                {DATA.DontHave}
                <button
                  className="login-signup-btn"
                  type="button"
                  onClick={() => navigate(ROUTES.SIGNUP)}
                  style={{ color: '#007bff' }}
                >
                  {DATA.SignUp}
                </button>
              </p>

              <p>
                <button
                  className="login-signup-btn"
                  type="button"
                  onClick={() => navigate(ROUTES.FORGOT)}
                  style={{ color: '#007bff' }}
                >
                  Forgot Password?
                </button>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
