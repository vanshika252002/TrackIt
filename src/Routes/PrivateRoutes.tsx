import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/Constants';
import { CustomRouter } from './RootRoutes';

import Dashboard from '../Views/Dashboard';

export const PRIVATE_ROUTES: Array<CustomRouter> = [
  {
    path: ROUTES_CONFIG.HOMEPAGE.path,
    element: <Dashboard />,
    title: ROUTES_CONFIG.HOMEPAGE.title,
  },
  {
    path: ROUTES_CONFIG.ABOUT.path,
    element: '<ABOUT />',
    title: ROUTES_CONFIG.ABOUT.title,
  },

  {
    path: '*',
    element: <Navigate to={WILDCARD_ROUTES.PRIVATE} />,
    title: 'Rendering wildcard',
  },
];
