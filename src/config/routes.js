import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { CatalogPage } from '../components/organisms/CatalogPage/CatalogPage';
import { UserPage } from '../components/organisms/UserPage/UserPage';
import { HomePage } from '../components/organisms/HomePage/HomePage';
import { PrivateRoute } from '../components/PrivateRoute';
import { routesConst } from './consts';
import { AuthRoute } from '../components/AuthRoute';

export const router = createBrowserRouter([
  {
    path: routesConst.HOME,
    element: (
      <AuthRoute>
        <HomePage />
      </AuthRoute>
    ),
  },
  {
    path: routesConst.CATALOG,
    element: (
      <PrivateRoute>
        <CatalogPage />
      </PrivateRoute>
    ),
  },
  {
    path: routesConst.USER,
    element: (
      <PrivateRoute>
        <UserPage />
      </PrivateRoute>
    ),
  },
]);
