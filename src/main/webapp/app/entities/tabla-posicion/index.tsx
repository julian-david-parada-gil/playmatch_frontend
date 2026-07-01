import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import TablaPosicion from './tabla-posicion';
import TablaPosicionDeleteDialog from './tabla-posicion-delete-dialog';
import TablaPosicionDetail from './tabla-posicion-detail';
import TablaPosicionUpdate from './tabla-posicion-update';
import PrivateRoute from 'app/shared/auth/private-route';
import { Authority } from 'app/shared/jhipster/constants';

const TablaPosicionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<TablaPosicion />} />
    <Route
      path="new"
      element={
        <PrivateRoute hasAnyAuthorities={[Authority.ADMIN]}>
          <TablaPosicionUpdate />
        </PrivateRoute>
      }
    />
    <Route path=":id">
      <Route index element={<TablaPosicionDetail />} />
      <Route
        path="edit"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ORGANIZADOR]}>
            <TablaPosicionUpdate />
          </PrivateRoute>
        }
      />
      <Route
        path="delete"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN]}>
            <TablaPosicionDeleteDialog />
          </PrivateRoute>
        }
      />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TablaPosicionRoutes;
