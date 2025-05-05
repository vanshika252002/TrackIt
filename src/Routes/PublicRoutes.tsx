import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/Constants';

import { CustomRouter } from './RootRoutes';
import SignUp from '../Views/signup/SignUp';
import Login from '../Views/login/Login';
import Forgot from '../Views/forgotpassword/Forgot';
import VerifyEmail from '../Views/signup/VerifyEmail';

export const PUBLIC_ROUTES: Array<CustomRouter> = [
  {
    path: ROUTES_CONFIG.HOMEPAGE.path,
    element: <Login />,
    title: ROUTES_CONFIG.HOMEPAGE.title,
  },
  {
    path: `${ROUTES_CONFIG.LOGIN.path}`,
    title: ROUTES_CONFIG.LOGIN.title,
    element: <Login />,
  },
  {
    path: ROUTES_CONFIG.SIGNUP.path,
    title: ROUTES_CONFIG.SIGNUP.title,
    element: <SignUp />,
  },
  {
    path: ROUTES_CONFIG.VERIFY.path,
    title: ROUTES_CONFIG.VERIFY.title,
    element: <VerifyEmail />,
  },
  {
    path: ROUTES_CONFIG.FORGOT.path,
    title: ROUTES_CONFIG.FORGOT.title,
    element: <Forgot />,
  },
  {
    path: '*',
    element: <Navigate to={WILDCARD_ROUTES.PUBLIC} />,
    title: 'Rendering wildcard',
  },
];
