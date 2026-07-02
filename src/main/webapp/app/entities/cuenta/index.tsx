import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Cuenta from './cuenta';
import CuentaDeleteDialog from './cuenta-delete-dialog';
import CuentaDetail from './cuenta-detail';
import CuentaUpdate from './cuenta-update';
import PrivateRoute from 'app/shared/auth/private-route';
import { Authority } from 'app/shared/jhipster/constants';

const CuentaRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Cuenta />} />
    <Route
      path="new"
      element={
        <PrivateRoute hasAnyAuthorities={[Authority.ADMIN]}>
          <CuentaUpdate />
        </PrivateRoute>
      }
    />
    <Route path=":id">
      <Route index element={<CuentaDetail />} />
      <Route
        path="edit"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ORGANIZADOR, Authority.ADMINGRUPO, Authority.USER]}>
            <CuentaUpdate />
          </PrivateRoute>
        }
      />
      <Route
        path="delete"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN]}>
            <CuentaDeleteDialog />
          </PrivateRoute>
        }
      />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CuentaRoutes;
